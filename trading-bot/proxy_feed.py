#!/usr/bin/env python3
"""
Free proxy market-data feed -> bars.csv

A $0, no-account way to run the bot PC-free TODAY, before you sort out Tradovate
API access. It pulls 1-minute bars for an index ETF (SPY tracks the S&P 500 /
ES/MES; QQQ tracks the Nasdaq / NQ/MNQ) from Yahoo Finance's free endpoint and
writes them to bars.csv — the same file the app reads.

    python3 proxy_feed.py --proxy-symbol SPY        # for MES/ES
    python3 proxy_feed.py --proxy-symbol QQQ        # for MNQ/NQ

Standard library only — nothing to pip install.

HONEST LIMITS (please read):
  * It's a PROXY. SPY is not the ES contract; it just tracks the same index. The
    DIRECTION transfers well, exact tick levels don't. Prices are scaled up
    (SPY×10 ≈ ES, QQQ×41 ≈ NQ) so stops/targets land in roughly the right
    magnitude for the futures contract — "roughly" being the key word.
  * Yahoo's free data is typically DELAYED ~15 minutes. Fine for testing the
    whole cloud setup end to end; NOT good enough to trade real money on timing.
  * Use this to prove the plumbing (cloud server -> bars.csv -> app -> phone
    alerts) works. Switch to the Tradovate feed for real, real-time data.
"""

import argparse
import json
import sys
import time
import urllib.error
import urllib.request
from datetime import datetime

from tradovate_feed import BarWriter  # reuse the tested writer/dedup

YAHOO = "https://query1.finance.yahoo.com/v8/finance/chart/{sym}?interval=1m&range=1d"

# rough price-scale from ETF to futures contract, so levels are in the right ballpark
DEFAULT_SCALE = {"SPY": 10.0, "QQQ": 41.0, "DIA": 100.0, "IWM": 10.0}


def fetch_yahoo(symbol):
    url = YAHOO.format(sym=symbol)
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 paper-bot"})
    with urllib.request.urlopen(req, timeout=15) as resp:
        return json.loads(resp.read().decode())


def parse_yahoo(data, scale):
    """Turn a Yahoo chart payload into scaled bar dicts (timestamp/o/h/l/c/volume)."""
    result = data.get("chart", {}).get("result")
    if not result:
        return []
    res = result[0]
    ts = res.get("timestamp") or []
    q = (res.get("indicators", {}).get("quote") or [{}])[0]
    opens, highs = q.get("open", []), q.get("high", [])
    lows, closes = q.get("low", []), q.get("close", [])
    vols = q.get("volume", [])
    out = []
    for i, t in enumerate(ts):
        o, h, l, c = opens[i], highs[i], lows[i], closes[i]
        if None in (o, h, l, c):
            continue  # Yahoo leaves gaps as nulls
        out.append({
            "timestamp": t,
            "open": round(o * scale, 2), "high": round(h * scale, 2),
            "low": round(l * scale, 2), "close": round(c * scale, 2),
            "volume": (vols[i] if i < len(vols) and vols[i] else 0),
        })
    return out


def run(symbol, scale, out_path, poll):
    writer = BarWriter(out_path)
    print("=" * 64)
    print(f"  PROXY FEED — {symbol} x{scale} -> {out_path}  (free, ~15m delayed)")
    print("  Approximate proxy for testing the cloud setup. Ctrl+C to stop.")
    print("=" * 64)
    while True:
        try:
            data = fetch_yahoo(symbol)
            bars = parse_yahoo(data, scale)
            n = writer.add_bars(bars)
            if n:
                print(f"[{datetime.now():%H:%M:%S}] wrote {n} closed bar(s) -> {out_path}")
        except (urllib.error.URLError, ValueError, KeyError, IndexError, TimeoutError) as e:
            print(f"[{datetime.now():%H:%M:%S}] fetch error: {e} — retrying")
        time.sleep(poll)


def selftest():
    sample = {"chart": {"result": [{
        "timestamp": [1690000000, 1690000060, 1690000120],
        "indicators": {"quote": [{
            "open": [600.0, 600.5, None],
            "high": [600.8, 601.0, None],
            "low": [599.9, 600.2, None],
            "close": [600.5, 600.9, None],
            "volume": [1000, 1200, None],
        }]},
    }]}}
    bars = parse_yahoo(sample, 10.0)
    assert len(bars) == 2 and bars[0]["close"] == 6005.0, bars  # scaled, null skipped
    import os
    tmp = "/tmp/_proxy_selftest.csv"
    if os.path.exists(tmp):
        os.remove(tmp)
    w = BarWriter(tmp)
    assert w.add_bars(bars) == 1  # 2 bars in, 1 closed written (last held back)
    print("selftest OK: parsed 2 bars, scaled x10, skipped null, wrote 1 closed bar")


def main():
    ap = argparse.ArgumentParser(description="Free ETF proxy bars -> bars.csv")
    ap.add_argument("--proxy-symbol", default="SPY", help="ETF to pull: SPY, QQQ, DIA, IWM")
    ap.add_argument("--scale", type=float, default=None,
                    help="price scale ETF->futures (default: SPY 10, QQQ 41)")
    ap.add_argument("--out", default="bars.csv")
    ap.add_argument("--poll", type=float, default=30, help="seconds between fetches")
    ap.add_argument("--selftest", action="store_true")
    args = ap.parse_args()
    if args.selftest:
        return selftest()
    scale = args.scale if args.scale is not None else DEFAULT_SCALE.get(args.proxy_symbol.upper(), 1.0)
    run(args.proxy_symbol.upper(), scale, args.out, args.poll)


if __name__ == "__main__":
    main()
