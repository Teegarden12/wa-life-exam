#!/usr/bin/env python3
"""
Paper-trading "follow-along" bot — Lucid-instrument edition.

Watches real-time market data, makes its own trade decisions, tracks a
SIMULATED account, and prints a loud alert every time it enters or exits a
position so you can mirror the trade in your real Lucid account by hand.

It will ONLY trade instruments listed in instruments.ALLOWED (edit that file to
match what your Lucid account permits). Every stop and target is reported in
ticks and dollars — the units you use in Lucid.

IMPORTANT — read this before you run it:
  * This trades a FAKE account. It never connects to, logs into, or places
    orders on any real brokerage (Lucid, NinjaTrader, or anything else).
  * You are always the human in the loop. When it alerts, YOU decide whether
    to place the same trade in your real account.
  * No trading strategy is guaranteed to make money. This one has no proven
    edge. Watch it on paper for a long time before risking a real dollar.

Data sources:
  * csv       — reads real futures bars your NinjaTrader writes (see
                ninjatrader/BarLogger.cs). This is the real, Lucid-tradable path.
  * coinbase  — free crypto feed, DEMO ONLY (requires --demo), to watch the
                mechanics run 24/7. You cannot mirror crypto in Lucid.

Usage:
    # Real path: watch MES bars your NinjaTrader is logging to a CSV
    python3 bot.py --data-source csv --symbol MES --csv-file bars.csv

    # Just watch the mechanics run right now (not Lucid-tradable):
    python3 bot.py --demo --data-source coinbase --symbol BTC-USD

Runs on plain Python 3.9+ with no third-party packages.
Stop it any time with Ctrl+C.
"""

import argparse
import csv as csvmod
import json
import os
import sys
import time
import urllib.request
import urllib.error
from datetime import datetime, timezone

import instruments


# --------------------------------------------------------------------------
# Data feeds — each returns candles oldest-first:
#   {time, open, high, low, close, volume}
# --------------------------------------------------------------------------

COINBASE_CANDLES = "https://api.exchange.coinbase.com/products/{symbol}/candles?granularity={sec}"


def fetch_coinbase(symbol, granularity_sec):
    """Free crypto candles from Coinbase's public API. DEMO use only."""
    url = COINBASE_CANDLES.format(symbol=symbol, sec=granularity_sec)
    req = urllib.request.Request(url, headers={"User-Agent": "paper-bot/1.0"})
    with urllib.request.urlopen(req, timeout=15) as resp:
        raw = json.loads(resp.read().decode())
    candles = [
        {"time": r[0], "low": r[1], "high": r[2],
         "open": r[3], "close": r[4], "volume": r[5]}
        for r in raw
    ]
    candles.sort(key=lambda c: c["time"])
    return candles


def read_csv_bars(path):
    """Read bars a NinjaTrader logger appended to a CSV.

    Expected columns (header required):
        time,open,high,low,close,volume
    `time` may be a unix second or any sortable timestamp string. We only use it
    to detect new bars, so exact format doesn't matter as long as it's unique
    and increasing per bar.
    """
    if not os.path.exists(path):
        return []
    out = []
    with open(path, newline="") as f:
        reader = csvmod.DictReader(f)
        for row in reader:
            try:
                out.append({
                    "time": row["time"],
                    "open": float(row["open"]),
                    "high": float(row["high"]),
                    "low": float(row["low"]),
                    "close": float(row["close"]),
                    "volume": float(row.get("volume", 0) or 0),
                })
            except (KeyError, ValueError):
                continue  # skip malformed / partial lines
    return out


# --------------------------------------------------------------------------
# Indicators (pure Python, no numpy)
# --------------------------------------------------------------------------

def ema(values, period):
    if not values:
        return []
    k = 2.0 / (period + 1)
    out = [values[0]]
    for v in values[1:]:
        out.append(v * k + out[-1] * (1 - k))
    return out


def rsi(closes, period=14):
    if len(closes) <= period:
        return [None] * len(closes)
    gains, losses = [], []
    for i in range(1, len(closes)):
        change = closes[i] - closes[i - 1]
        gains.append(max(change, 0.0))
        losses.append(max(-change, 0.0))
    avg_gain = sum(gains[:period]) / period
    avg_loss = sum(losses[:period]) / period
    out = [None] * (period + 1)
    for i in range(period, len(gains)):
        if i > period:
            avg_gain = (avg_gain * (period - 1) + gains[i]) / period
            avg_loss = (avg_loss * (period - 1) + losses[i]) / period
        out.append(100.0 if avg_loss == 0 else 100.0 - (100.0 / (1 + avg_gain / avg_loss)))
    while len(out) < len(closes):
        out.append(out[-1])
    return out


def atr(candles, period=14):
    if len(candles) <= period:
        return [None] * len(candles)
    trs = [candles[0]["high"] - candles[0]["low"]]
    for i in range(1, len(candles)):
        h, l = candles[i]["high"], candles[i]["low"]
        pc = candles[i - 1]["close"]
        trs.append(max(h - l, abs(h - pc), abs(l - pc)))
    out = [None] * (period - 1)
    prev = sum(trs[:period]) / period
    out.append(prev)
    for i in range(period, len(trs)):
        prev = (prev * (period - 1) + trs[i]) / period
        out.append(prev)
    return out


# --------------------------------------------------------------------------
# Decision engines — return ("LONG"|"SHORT"|"FLAT", reason, atr_value)
# --------------------------------------------------------------------------

class RuleEngine:
    name = "rule"

    def __init__(self, ema_fast=9, ema_slow=21, rsi_period=14, atr_period=14):
        self.ema_fast, self.ema_slow = ema_fast, ema_slow
        self.rsi_period, self.atr_period = rsi_period, atr_period

    def decide(self, candles):
        closes = [c["close"] for c in candles]
        need = max(self.ema_slow, self.rsi_period, self.atr_period) + 2
        if len(closes) < need:
            return "FLAT", "warming up", None
        f = ema(closes, self.ema_fast)[-1]
        s = ema(closes, self.ema_slow)[-1]
        rr = rsi(closes, self.rsi_period)[-1]
        aa = atr(candles, self.atr_period)[-1]
        if rr is None or aa is None:
            return "FLAT", "warming up", None
        if f > s and rr < 68:
            return "LONG", f"EMA{self.ema_fast}>{self.ema_slow}, RSI {rr:.0f}", aa
        if f < s and rr > 32:
            return "SHORT", f"EMA{self.ema_fast}<{self.ema_slow}, RSI {rr:.0f}", aa
        return "FLAT", f"no clear edge (RSI {rr:.0f})", aa


class LLMEngine:
    """Optional: let Claude decide each bar. Needs ANTHROPIC_API_KEY."""
    name = "llm"
    API_URL = "https://api.anthropic.com/v1/messages"

    def __init__(self, model="claude-haiku-4-5-20251001", atr_period=14):
        self.model, self.atr_period = model, atr_period
        self.api_key = os.environ.get("ANTHROPIC_API_KEY")
        if not self.api_key:
            sys.exit("ERROR: --engine llm needs ANTHROPIC_API_KEY set. "
                     "Get one at https://console.anthropic.com/")

    def decide(self, candles):
        aa_list = atr(candles, self.atr_period)
        aa = aa_list[-1] if aa_list and aa_list[-1] is not None else None
        bars = [{"o": round(c["open"], 2), "h": round(c["high"], 2),
                 "l": round(c["low"], 2), "c": round(c["close"], 2)}
                for c in candles[-30:]]
        prompt = (
            "You are a disciplined intraday futures trader. Based ONLY on the "
            "recent OHLC bars below (oldest first), decide your directional bias "
            "for the next few bars. You have no other information and no "
            "guaranteed edge; when unsure, choose FLAT.\n\n"
            f"Bars: {json.dumps(bars)}\n\n"
            'Reply with ONLY JSON: {"decision":"LONG|SHORT|FLAT","reason":"<=12 words"}'
        )
        body = json.dumps({"model": self.model, "max_tokens": 100,
                           "messages": [{"role": "user", "content": prompt}]}).encode()
        req = urllib.request.Request(self.API_URL, data=body, method="POST", headers={
            "content-type": "application/json", "x-api-key": self.api_key,
            "anthropic-version": "2023-06-01"})
        try:
            with urllib.request.urlopen(req, timeout=30) as resp:
                data = json.loads(resp.read().decode())
            text = data["content"][0]["text"].strip()
            obj = json.loads(text[text.find("{"): text.rfind("}") + 1])
            d = obj.get("decision", "FLAT").upper()
            return (d if d in ("LONG", "SHORT", "FLAT") else "FLAT",
                    obj.get("reason", ""), aa)
        except (urllib.error.URLError, KeyError, ValueError, IndexError) as e:
            return "FLAT", f"llm error: {e}", aa


# --------------------------------------------------------------------------
# Paper account (contract-aware) + trade management
# --------------------------------------------------------------------------

class PaperAccount:
    def __init__(self, spec, contracts, atr_stop_mult, atr_target_mult, log_path):
        self.spec = spec
        self.contracts = contracts
        self.atr_stop_mult = atr_stop_mult
        self.atr_target_mult = atr_target_mult
        self.log_path = log_path
        self.position = None
        self.realized = 0.0
        self.wins = self.losses = 0
        self._init_log()

    def _init_log(self):
        new = not os.path.exists(self.log_path)
        self._f = open(self.log_path, "a", newline="")
        self._w = csvmod.writer(self._f)
        if new:
            self._w.writerow(["timestamp", "event", "side", "price", "stop",
                              "target", "ticks_risk", "reason", "pnl_usd",
                              "realized_usd"])
        self._f.flush()

    def _log(self, event, side, price, stop, target, ticks_risk, reason, pnl=""):
        self._w.writerow([
            datetime.now(timezone.utc).isoformat(timespec="seconds"), event, side,
            f"{price:.4f}", f"{stop:.4f}" if stop else "",
            f"{target:.4f}" if target else "", ticks_risk if ticks_risk else "",
            reason, f"{pnl:.2f}" if pnl != "" else "", f"{self.realized:.2f}"])
        self._f.flush()

    def open(self, side, price, atr_val, reason):
        if atr_val is None or atr_val <= 0:
            return None
        stop_dist = self.atr_stop_mult * atr_val
        tgt_dist = self.atr_target_mult * atr_val
        if side == "LONG":
            stop, target = price - stop_dist, price + tgt_dist
        else:
            stop, target = price + stop_dist, price - tgt_dist
        stop = instruments.snap(self.spec, stop)
        target = instruments.snap(self.spec, target)
        ticks_risk = instruments.ticks_between(self.spec, price, stop)
        self.position = {"side": side, "entry": price, "stop": stop,
                         "target": target, "reason": reason, "ticks_risk": ticks_risk}
        self._log("ENTRY", side, price, stop, target, ticks_risk, reason)
        return self.position

    def _pnl(self, exit_price):
        p = self.position
        diff = exit_price - p["entry"]
        if p["side"] == "SHORT":
            diff = -diff
        return instruments.dollars(self.spec, diff, self.contracts)

    def close(self, exit_price, reason):
        p = self.position
        pnl = self._pnl(exit_price)
        self.realized += pnl
        if pnl >= 0:
            self.wins += 1
        else:
            self.losses += 1
        self._log("EXIT", p["side"], exit_price, p["stop"], p["target"],
                  p["ticks_risk"], reason, pnl)
        self.position = None
        return pnl

    def check_exit(self, candle):
        if not self.position:
            return None
        p = self.position
        hi, lo = candle["high"], candle["low"]
        if p["side"] == "LONG":
            if lo <= p["stop"]:
                return p["stop"], "stop hit"
            if hi >= p["target"]:
                return p["target"], "target hit"
        else:
            if hi >= p["stop"]:
                return p["stop"], "stop hit"
            if lo <= p["target"]:
                return p["target"], "target hit"
        return None


# --------------------------------------------------------------------------
# Alerts (contract-aware: show ticks and dollars)
# --------------------------------------------------------------------------

def alert(kind, symbol, spec, contracts, side, price,
          stop=None, target=None, reason="", pnl=None):
    ts = datetime.now().strftime("%H:%M:%S")
    line = "=" * 64
    print(f"\n\a{line}")
    if kind == "ENTRY":
        risk_ticks = instruments.ticks_between(spec, price, stop)
        reward_ticks = instruments.ticks_between(spec, price, target)
        risk_usd = instruments.dollars(spec, abs(price - stop), contracts)
        reward_usd = instruments.dollars(spec, abs(price - target), contracts)
        print(f"  >>> {side} {contracts}x {symbol}  @ {price:,.4f}   [{ts}]")
        print(f"      stop   {stop:,.4f}   ({risk_ticks} ticks, -${risk_usd:,.2f})")
        print(f"      target {target:,.4f}   ({reward_ticks} ticks, +${reward_usd:,.2f})")
        print(f"      why: {reason}")
        print(f"      ACTION: mirror this {side} of {contracts} {symbol} in Lucid if you agree.")
    else:
        tag = "PROFIT" if pnl >= 0 else "LOSS"
        print(f"  <<< CLOSE {side} {contracts}x {symbol} @ {price:,.4f}   [{ts}]  ({tag} {pnl:+,.2f} USD)")
        print(f"      why: {reason}")
        print(f"      ACTION: close your real {symbol} position in Lucid now.")
    print(line)


# --------------------------------------------------------------------------
# Main loop
# --------------------------------------------------------------------------

def main():
    ap = argparse.ArgumentParser(description="Paper follow-along bot (Lucid instruments).")
    ap.add_argument("--symbol", default="MES", help="instrument, e.g. MES, MNQ, ES, NQ")
    ap.add_argument("--data-source", choices=["csv", "coinbase"], default="csv",
                    help="csv = NinjaTrader bar file (real futures); coinbase = demo crypto")
    ap.add_argument("--csv-file", default="bars.csv", help="path NinjaTrader logs bars to")
    ap.add_argument("--granularity", type=int, default=60,
                    help="coinbase bar size in seconds (demo only)")
    ap.add_argument("--demo", action="store_true",
                    help="allow a non-Lucid demo instrument (required for coinbase)")
    ap.add_argument("--engine", choices=["rule", "llm"], default="rule")
    ap.add_argument("--model", default="claude-haiku-4-5-20251001")
    ap.add_argument("--contracts", type=int, default=1, help="paper position size in contracts")
    ap.add_argument("--stop-atr", type=float, default=1.5, help="stop = N x ATR")
    ap.add_argument("--target-atr", type=float, default=2.0, help="target = N x ATR")
    ap.add_argument("--max-daily-loss", type=float, default=0.0,
                    help="halt new trades after this paper $ loss/day (0 = off)")
    ap.add_argument("--poll", type=float, default=5.0, help="seconds between checks (csv)")
    ap.add_argument("--log", default="trades.csv", help="trade-log CSV path")
    args = ap.parse_args()

    # --- enforce "only what Lucid allows" ---
    spec = instruments.get_spec(args.symbol, demo=args.demo)
    if spec is None:
        if not args.demo and args.symbol in instruments.DEMO:
            sys.exit(f"'{args.symbol}' is a crypto DEMO instrument, not tradable in Lucid. "
                     f"Add --demo to watch it, or pick a futures symbol.")
        sys.exit(f"ERROR: unknown symbol '{args.symbol}'. "
                 f"Known futures: {', '.join(sorted(instruments.FUTURES))}.")
    if not instruments.is_allowed(args.symbol, demo=args.demo):
        sys.exit(
            f"REFUSING to trade '{args.symbol}': it is not in your allowed list.\n"
            f"  Allowed right now: {', '.join(sorted(instruments.ALLOWED))}\n"
            f"  If Lucid lets you trade {args.symbol}, add it to ALLOWED in instruments.py.\n"
            f"  (Crypto/demo instruments require the --demo flag and are NOT Lucid-tradable.)")
    if args.data_source == "coinbase" and not args.demo:
        sys.exit("ERROR: the coinbase feed is crypto (DEMO ONLY). Add --demo to use it, "
                 "or use --data-source csv with a Lucid instrument.")

    engine = RuleEngine() if args.engine == "rule" else LLMEngine(model=args.model)
    acct = PaperAccount(spec, args.contracts, args.stop_atr, args.target_atr, args.log)
    poll = max(args.granularity, 15) if args.data_source == "coinbase" else max(args.poll, 1)

    print("=" * 64)
    print("  PAPER TRADING BOT — simulated account, real prices")
    print(f"  {args.symbol} ({spec['name']})  x{args.contracts} contracts")
    print(f"  source={args.data_source}  engine={engine.name}  "
          f"stop={args.stop_atr}xATR  target={args.target_atr}xATR")
    if args.demo:
        print("  *** DEMO instrument — NOT tradable in Lucid. For watching only. ***")
    print("  FAKE money. Mirror in your real Lucid account manually, at your own")
    print("  risk. Ctrl+C to stop.")
    print("=" * 64)

    last_bar = None
    day = datetime.now(timezone.utc).date()
    halted = False

    while True:
        try:
            if args.data_source == "coinbase":
                candles = fetch_coinbase(args.symbol, args.granularity)
            else:
                candles = read_csv_bars(args.csv_file)
        except (urllib.error.URLError, ValueError, TimeoutError, OSError) as e:
            print(f"[{datetime.now():%H:%M:%S}] feed error: {e} — retrying")
            time.sleep(poll)
            continue

        if len(candles) < 2:
            if args.data_source == "csv":
                print(f"[{datetime.now():%H:%M:%S}] waiting for bars in {args.csv_file} ...")
            time.sleep(poll)
            continue

        # Most recent CLOSED bar. Coinbase's last bar is still forming, so drop it.
        closed = candles[:-1] if args.data_source == "coinbase" else candles
        newest = closed[-1]

        today = datetime.now(timezone.utc).date()
        if today != day:
            day, halted = today, False

        if newest["time"] != last_bar:
            last_bar = newest["time"]

            if acct.position:
                ex = acct.check_exit(newest)
                if ex:
                    price, reason = ex
                    side = acct.position["side"]
                    pnl = acct.close(price, reason)
                    alert("EXIT", args.symbol, spec, args.contracts, side, price,
                          reason=reason, pnl=pnl)
                    if args.max_daily_loss > 0 and acct.realized <= -abs(args.max_daily_loss):
                        halted = True
                        print(f"\n*** Daily loss limit hit ({acct.realized:+.2f}). "
                              f"No new trades until tomorrow (UTC). ***")

            decision, why, atr_val = engine.decide(closed)
            price = newest["close"]

            if acct.position:
                if (acct.position["side"] == "LONG" and decision == "SHORT") or \
                   (acct.position["side"] == "SHORT" and decision == "LONG"):
                    side = acct.position["side"]
                    pnl = acct.close(price, "engine reversed")
                    alert("EXIT", args.symbol, spec, args.contracts, side, price,
                          reason="signal reversed", pnl=pnl)
            if not acct.position and not halted and decision in ("LONG", "SHORT"):
                pos = acct.open(decision, price, atr_val, why)
                if pos:
                    alert("ENTRY", args.symbol, spec, args.contracts, decision, price,
                          stop=pos["stop"], target=pos["target"], reason=why)

            total = acct.wins + acct.losses
            wr = (acct.wins / total * 100) if total else 0.0
            state = acct.position["side"] if acct.position else "flat"
            print(f"[{datetime.now():%H:%M:%S}] {args.symbol} {price:,.4f} "
                  f"| {decision:5} ({why}) | pos={state} "
                  f"| P&L ${acct.realized:+.2f} | {acct.wins}W/{acct.losses}L ({wr:.0f}%)")

        time.sleep(poll)


if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\nStopped. Trade log saved. Nothing was traded for real.")
