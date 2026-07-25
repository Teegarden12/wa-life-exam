#!/usr/bin/env python3
"""
Tradovate market-data feed -> bars.csv

This is the piece that makes the bot PC-free: instead of NinjaTrader on your PC,
it pulls your REAL futures bars straight from Tradovate's API and writes them to
the same bars.csv the app already reads. Run this on a small always-on cloud
server (or a Raspberry Pi) next to app.py, and your PC never has to be on.

    python3 tradovate_feed.py --contract MESM5 --out bars.csv

┌───────────────────────────────────────────────────────────────────────────┐
│ READ FIRST — two things decide whether this works, and you must check them: │
│                                                                             │
│ 1. API ACCESS: your Lucid/prop account must PERMIT API access. Many         │
│    eval/funded accounts block it, and connecting against the rules can fail │
│    the account. Confirm with Lucid support before you use this.             │
│ 2. REAL-TIME DATA: you need a real-time market-data subscription on         │
│    Tradovate (a monthly CME fee). Without it you'll get delayed data.       │
│                                                                             │
│ Also: this connects to Tradovate's live API, which could not be tested from │
│ the environment where it was written. Expect to validate/adjust it with     │
│ your own credentials. It ONLY reads market data — it places no orders.      │
└───────────────────────────────────────────────────────────────────────────┘

Credentials come from environment variables (never hard-code them):
    TRADOVATE_USERNAME     your Tradovate username
    TRADOVATE_PASSWORD     your password
    TRADOVATE_APP_ID       app name you register (any label, e.g. "paperbot")
    TRADOVATE_CID          API key id (from Tradovate API access)
    TRADOVATE_SECRET       API secret
    TRADOVATE_ENV          "demo" (default) or "live"

Requires two packages on the server (fine to pip install there):
    pip install requests websocket-client
"""

import argparse
import csv
import json
import os
import sys
import threading
import time
from datetime import datetime, timezone

REST = {
    "demo": "https://demo.tradovateapi.com/v1",
    "live": "https://live.tradovateapi.com/v1",
}
MD_WS = "wss://md.tradovateapi.com/v1/websocket"


def _secret_fallback(name):
    """Read a credential saved via the app's Connect page (secrets.json),
    e.g. TRADOVATE_USERNAME -> "tradovate_username"."""
    try:
        with open(os.path.join(os.path.dirname(os.path.abspath(__file__)), "secrets.json")) as f:
            return json.load(f).get(name.lower())
    except (OSError, ValueError):
        return None


def _need(name):
    v = os.environ.get(name) or _secret_fallback(name)
    if not v:
        sys.exit(f"Missing {name}. Set it in the app's Connect page or as an "
                 f"environment variable. See the header of this file.")
    return v


def get_access_token(env):
    """Authenticate over REST and return (accessToken, mdAccessToken)."""
    import requests  # imported here so --selftest works without the package
    body = {
        "name": _need("TRADOVATE_USERNAME"),
        "password": _need("TRADOVATE_PASSWORD"),
        "appId": os.environ.get("TRADOVATE_APP_ID", "paperbot"),
        "appVersion": "1.0",
        "cid": _need("TRADOVATE_CID"),
        "sec": _need("TRADOVATE_SECRET"),
    }
    r = requests.post(f"{REST[env]}/auth/accessTokenRequest", json=body, timeout=20)
    r.raise_for_status()
    data = r.json()
    if "accessToken" not in data:
        raise RuntimeError(f"auth failed: {data}")
    # mdAccessToken is used for the market-data socket; fall back to accessToken
    return data["accessToken"], data.get("mdAccessToken", data["accessToken"])


# --------------------------------------------------------------------------
# Bar assembly (pure logic — unit-testable without a network)
# --------------------------------------------------------------------------

class BarWriter:
    """Turns Tradovate chart bar packets into rows in bars.csv, de-duplicated."""

    def __init__(self, out_path):
        self.out_path = out_path
        self.seen = set()
        if not os.path.exists(out_path):
            with open(out_path, "w", newline="") as f:
                csv.writer(f).writerow(["time", "open", "high", "low", "close", "volume"])

    def add_bars(self, bars):
        """bars: list of dicts with keys timestamp/open/high/low/close/volume.

        Tradovate sends the still-forming bar repeatedly; we only write a bar
        once its timestamp is superseded by a newer one (i.e. it has closed).
        Returns the number of newly written (closed) bars.
        """
        written = 0
        # sort by time, keep all but the last (last is still forming)
        bars = sorted(bars, key=lambda b: b["timestamp"])
        for b in bars[:-1] if len(bars) > 1 else []:
            ts = b["timestamp"]
            if ts in self.seen:
                continue
            self.seen.add(ts)
            with open(self.out_path, "a", newline="") as f:
                csv.writer(f).writerow([
                    ts, b["open"], b["high"], b["low"], b["close"],
                    b.get("volume", b.get("upVolume", 0) or 0)])
            written += 1
        return written


def normalize_chart_packet(packet):
    """Extract a list of {timestamp,open,high,low,close,volume} from a Tradovate
    chart data packet. Kept separate so it can be unit-tested with sample data.

    Tradovate chart 'bars' look like:
      {"timestamp":"2026-07-24T13:30:00Z","open":5043.0,"high":5044.5,
       "low":5042.75,"close":5043.5,"upVolume":120,"downVolume":80}
    """
    out = []
    for bar in packet.get("bars", []):
        if bar.get("timestamp") is None or bar.get("close") is None:
            continue
        vol = bar.get("volume")
        if vol is None:
            vol = (bar.get("upVolume", 0) or 0) + (bar.get("downVolume", 0) or 0)
        out.append({
            "timestamp": bar["timestamp"],
            "open": bar.get("open", bar["close"]),
            "high": bar.get("high", bar["close"]),
            "low": bar.get("low", bar["close"]),
            "close": bar["close"],
            "volume": vol,
        })
    return out


# --------------------------------------------------------------------------
# Live WebSocket client (needs `websocket-client`; validate with your creds)
# --------------------------------------------------------------------------

def run_live(contract, out_path, env, minutes=1):
    try:
        import websocket  # from the websocket-client package
    except ImportError:
        sys.exit("Missing package. On the server run:  pip install requests websocket-client")

    _, md_token = get_access_token(env)
    writer = BarWriter(out_path)
    req_id = {"n": 0}

    def frame(endpoint, body=""):
        req_id["n"] += 1
        return f"{endpoint}\n{req_id['n']}\n\n{body}"

    def on_open(ws):
        # Tradovate WS handshake: authorize, then request the chart stream.
        ws.send(frame("authorize", md_token))
        chart_req = json.dumps({
            "symbol": contract,
            "chartDescription": {
                "underlyingType": "MinuteBar",
                "elementSize": minutes,
                "elementSizeUnit": "UnderlyingUnits",
            },
            "timeRange": {"asMuchAsElements": 60},
        })
        ws.send(frame("md/getChart", chart_req))
        print(f"[{datetime.now():%H:%M:%S}] subscribed to {contract} {minutes}m bars")

    def on_message(ws, message):
        if not message:
            return
        kind, payload = message[0], message[1:]
        if kind == "h":                 # heartbeat from server
            ws.send("[]")               # keep-alive
            return
        if kind == "o":                 # socket opened
            return
        if kind == "a":                 # array of events
            try:
                events = json.loads(payload)
            except ValueError:
                return
            for ev in events:
                data = ev.get("d", ev)
                if isinstance(data, dict) and "charts" in data:
                    for packet in data["charts"]:
                        n = writer.add_bars(normalize_chart_packet(packet))
                        if n:
                            print(f"[{datetime.now():%H:%M:%S}] wrote {n} closed bar(s) -> {out_path}")

    def on_error(ws, err):
        print(f"[{datetime.now():%H:%M:%S}] ws error: {err}")

    def on_close(ws, *a):
        print(f"[{datetime.now():%H:%M:%S}] socket closed")

    # keep-alive pinger (Tradovate expects periodic client frames)
    def pinger(ws):
        while True:
            time.sleep(2.5)
            try:
                ws.send("[]")
            except Exception:
                return

    while True:  # reconnect loop
        try:
            ws = websocket.WebSocketApp(MD_WS, on_open=on_open, on_message=on_message,
                                        on_error=on_error, on_close=on_close)
            threading.Thread(target=lambda: pinger(ws), daemon=True).start()
            ws.run_forever(ping_interval=10)
        except Exception as e:
            print(f"[{datetime.now():%H:%M:%S}] connection dropped: {e}")
        print("reconnecting in 5s...")
        time.sleep(5)


def selftest():
    """Verify the pure bar logic without any network."""
    sample = {"bars": [
        {"timestamp": "2026-07-24T13:30:00Z", "open": 5043.0, "high": 5044.5, "low": 5042.75, "close": 5043.5, "upVolume": 120, "downVolume": 80},
        {"timestamp": "2026-07-24T13:31:00Z", "open": 5043.5, "high": 5045.0, "low": 5043.0, "close": 5044.75, "upVolume": 90, "downVolume": 60},
        {"timestamp": "2026-07-24T13:32:00Z", "open": 5044.75, "high": 5045.5, "low": 5044.0, "close": 5044.25, "upVolume": 70, "downVolume": 50},
    ]}
    bars = normalize_chart_packet(sample)
    assert len(bars) == 3 and bars[0]["volume"] == 200, bars
    tmp = "/tmp/_tv_selftest.csv"
    if os.path.exists(tmp):
        os.remove(tmp)
    w = BarWriter(tmp)
    n1 = w.add_bars(bars)          # writes the 2 closed bars, holds the forming one
    n2 = w.add_bars(bars)          # nothing new (dedup)
    with open(tmp) as f:
        rows = list(csv.reader(f))
    assert n1 == 2 and n2 == 0 and len(rows) == 3, (n1, n2, rows)  # header + 2 bars
    print("selftest OK: parsed 3 bars, wrote 2 closed bars, dedup works")


def main():
    ap = argparse.ArgumentParser(description="Stream Tradovate bars to bars.csv.")
    ap.add_argument("--contract", help="exact contract symbol, e.g. MESM5, MNQU5")
    ap.add_argument("--out", default="bars.csv", help="CSV the app reads")
    ap.add_argument("--minutes", type=int, default=1, help="bar size in minutes")
    ap.add_argument("--env", default=os.environ.get("TRADOVATE_ENV", "demo"),
                    choices=["demo", "live"])
    ap.add_argument("--selftest", action="store_true", help="test the parsing logic offline")
    args = ap.parse_args()
    if args.selftest:
        return selftest()
    if not args.contract:
        sys.exit("Pass --contract (e.g. MESM5). Find the current front-month symbol in Tradovate.")
    run_live(args.contract, args.out, args.env, args.minutes)


if __name__ == "__main__":
    main()
