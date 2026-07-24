#!/usr/bin/env python3
"""
Paper-trading "follow-along" bot.

Watches real-time market data, makes its own trade decisions, tracks a
SIMULATED account, and prints a loud alert every time it enters or exits a
position so you can mirror the trade in your real account by hand.

IMPORTANT — read this before you run it:
  * This trades a FAKE account. It never connects to, logs into, or places
    orders on any real brokerage (Lucid, NinjaTrader, or anything else).
  * You are always the human in the loop. When it alerts, YOU decide whether
    to place the same trade in your real account.
  * No trading strategy is guaranteed to make money. This one has no proven
    edge. Treat it as an experiment. Watch it on paper for a long time before
    you ever risk a real dollar, and never risk money you can't lose.

Runs on plain Python 3.9+ with no third-party packages.

Usage:
    python3 bot.py                      # BTC-USD, 1-minute bars, built-in engine
    python3 bot.py --symbol ETH-USD --granularity 300
    python3 bot.py --engine llm         # let Claude make each decision (needs API key)

Stop it any time with Ctrl+C.
"""

import argparse
import csv
import json
import os
import sys
import time
import urllib.request
import urllib.error
from datetime import datetime, timezone

# --------------------------------------------------------------------------
# Market data feed (Coinbase public API — free, real-time, no key required)
# --------------------------------------------------------------------------

COINBASE_CANDLES = "https://api.exchange.coinbase.com/products/{symbol}/candles?granularity={sec}"


def fetch_candles(symbol, granularity_sec):
    """Return a list of closed candles, oldest first.

    Each candle is a dict: time (unix sec), open, high, low, close, volume.
    Coinbase returns up to 300 candles, newest first, as
    [time, low, high, open, close, volume].
    """
    url = COINBASE_CANDLES.format(symbol=symbol, sec=granularity_sec)
    req = urllib.request.Request(url, headers={"User-Agent": "paper-bot/1.0"})
    with urllib.request.urlopen(req, timeout=15) as resp:
        raw = json.loads(resp.read().decode())
    candles = [
        {
            "time": row[0],
            "low": row[1],
            "high": row[2],
            "open": row[3],
            "close": row[4],
            "volume": row[5],
        }
        for row in raw
    ]
    candles.sort(key=lambda c: c["time"])  # oldest first
    return candles


# --------------------------------------------------------------------------
# Indicators (pure Python, no numpy)
# --------------------------------------------------------------------------

def ema(values, period):
    """Exponential moving average. Returns a list aligned with `values`."""
    if not values:
        return []
    k = 2.0 / (period + 1)
    out = [values[0]]
    for v in values[1:]:
        out.append(v * k + out[-1] * (1 - k))
    return out


def rsi(closes, period=14):
    """Classic Wilder RSI. Returns a list aligned with `closes` (None until warm)."""
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
        if avg_loss == 0:
            out.append(100.0)
        else:
            rs = avg_gain / avg_loss
            out.append(100.0 - (100.0 / (1 + rs)))
    # pad to len(closes)
    while len(out) < len(closes):
        out.append(out[-1])
    return out


def atr(candles, period=14):
    """Average True Range. Returns a list aligned with `candles` (None until warm)."""
    if len(candles) <= period:
        return [None] * len(candles)
    trs = [candles[0]["high"] - candles[0]["low"]]
    for i in range(1, len(candles)):
        h, l = candles[i]["high"], candles[i]["low"]
        prev_close = candles[i - 1]["close"]
        trs.append(max(h - l, abs(h - prev_close), abs(l - prev_close)))
    out = [None] * (period - 1)
    first = sum(trs[:period]) / period
    out.append(first)
    prev = first
    for i in range(period, len(trs)):
        prev = (prev * (period - 1) + trs[i]) / period
        out.append(prev)
    return out


# --------------------------------------------------------------------------
# Decision engines — each returns one of: "LONG", "SHORT", "FLAT"
# --------------------------------------------------------------------------

class RuleEngine:
    """Built-in decision engine. No API key, runs anywhere.

    Combines trend (EMA fast vs slow) with momentum (RSI) to decide a
    directional bias each bar. It's a transparent, well-known approach — not a
    secret edge. Tune the numbers or replace this class with your own idea.
    """

    name = "rule"

    def __init__(self, ema_fast=9, ema_slow=21, rsi_period=14, atr_period=14):
        self.ema_fast = ema_fast
        self.ema_slow = ema_slow
        self.rsi_period = rsi_period
        self.atr_period = atr_period

    def decide(self, candles):
        closes = [c["close"] for c in candles]
        if len(closes) < max(self.ema_slow, self.rsi_period, self.atr_period) + 2:
            return "FLAT", "warming up", None

        ef = ema(closes, self.ema_fast)
        es = ema(closes, self.ema_slow)
        r = rsi(closes, self.rsi_period)
        a = atr(candles, self.atr_period)

        f, s, rr, aa = ef[-1], es[-1], r[-1], a[-1]
        if rr is None or aa is None:
            return "FLAT", "warming up", None

        # Trend up + not already overbought -> long bias.
        if f > s and rr < 68:
            return "LONG", f"EMA{self.ema_fast}>{self.ema_slow}, RSI {rr:.0f}", aa
        # Trend down + not already oversold -> short bias.
        if f < s and rr > 32:
            return "SHORT", f"EMA{self.ema_fast}<{self.ema_slow}, RSI {rr:.0f}", aa
        return "FLAT", f"no clear edge (RSI {rr:.0f})", aa


class LLMEngine:
    """Optional: let Claude make each decision.

    Requires an Anthropic API key in the ANTHROPIC_API_KEY environment
    variable. Each decision costs a small amount (fractions of a cent to a few
    cents depending on model). The key stays on YOUR machine — it is read from
    your environment and sent only to Anthropic's API.
    """

    name = "llm"
    API_URL = "https://api.anthropic.com/v1/messages"

    def __init__(self, model="claude-haiku-4-5-20251001", atr_period=14):
        self.model = model
        self.atr_period = atr_period
        self.api_key = os.environ.get("ANTHROPIC_API_KEY")
        if not self.api_key:
            sys.exit(
                "ERROR: --engine llm needs an API key.\n"
                "  Set it first, e.g.:  export ANTHROPIC_API_KEY=sk-ant-...\n"
                "  Get one at https://console.anthropic.com/"
            )

    def decide(self, candles):
        closes = [c["close"] for c in candles]
        a = atr(candles, self.atr_period)
        aa = a[-1] if a and a[-1] is not None else None
        recent = candles[-30:]
        bars = [
            {"o": round(c["open"], 2), "h": round(c["high"], 2),
             "l": round(c["low"], 2), "c": round(c["close"], 2)}
            for c in recent
        ]
        prompt = (
            "You are a disciplined intraday trader. Based ONLY on the recent "
            "price bars below (oldest first, OHLC), decide your directional "
            "bias for the next few bars. You have no other information and no "
            "guaranteed edge; when unsure, choose FLAT.\n\n"
            f"Bars: {json.dumps(bars)}\n\n"
            'Reply with ONLY a JSON object: {"decision": "LONG|SHORT|FLAT", '
            '"reason": "<=12 words"}'
        )
        body = json.dumps({
            "model": self.model,
            "max_tokens": 100,
            "messages": [{"role": "user", "content": prompt}],
        }).encode()
        req = urllib.request.Request(
            self.API_URL, data=body, method="POST",
            headers={
                "content-type": "application/json",
                "x-api-key": self.api_key,
                "anthropic-version": "2023-06-01",
            },
        )
        try:
            with urllib.request.urlopen(req, timeout=30) as resp:
                data = json.loads(resp.read().decode())
            text = data["content"][0]["text"].strip()
            # strip code fences if present
            if text.startswith("```"):
                text = text.strip("`").split("\n", 1)[-1]
            obj = json.loads(text[text.find("{"): text.rfind("}") + 1])
            decision = obj.get("decision", "FLAT").upper()
            if decision not in ("LONG", "SHORT", "FLAT"):
                decision = "FLAT"
            return decision, obj.get("reason", ""), aa
        except (urllib.error.URLError, KeyError, ValueError, IndexError) as e:
            return "FLAT", f"llm error: {e}", aa


# --------------------------------------------------------------------------
# Paper account + trade management
# --------------------------------------------------------------------------

class PaperAccount:
    def __init__(self, unit_size, atr_stop_mult, atr_target_mult, log_path):
        self.unit_size = unit_size            # units traded per position (e.g. 0.1 BTC)
        self.atr_stop_mult = atr_stop_mult
        self.atr_target_mult = atr_target_mult
        self.log_path = log_path
        self.position = None                  # dict or None
        self.realized = 0.0
        self.wins = 0
        self.losses = 0
        self._init_log()

    def _init_log(self):
        new = not os.path.exists(self.log_path)
        self._log_f = open(self.log_path, "a", newline="")
        self._log = csv.writer(self._log_f)
        if new:
            self._log.writerow(
                ["timestamp", "event", "side", "price", "stop", "target",
                 "reason", "pnl", "realized_total"]
            )

    def _write(self, event, side, price, stop, target, reason, pnl=""):
        self._log.writerow([
            datetime.now(timezone.utc).isoformat(timespec="seconds"),
            event, side, f"{price:.2f}", f"{stop:.2f}" if stop else "",
            f"{target:.2f}" if target else "", reason,
            f"{pnl:.2f}" if pnl != "" else "", f"{self.realized:.2f}",
        ])
        self._log_f.flush()

    def open(self, side, price, atr_val, reason):
        if atr_val is None or atr_val <= 0:
            return None
        if side == "LONG":
            stop = price - self.atr_stop_mult * atr_val
            target = price + self.atr_target_mult * atr_val
        else:
            stop = price + self.atr_stop_mult * atr_val
            target = price - self.atr_target_mult * atr_val
        self.position = {"side": side, "entry": price, "stop": stop,
                         "target": target, "reason": reason}
        self._write("ENTRY", side, price, stop, target, reason)
        return self.position

    def _pnl(self, exit_price):
        p = self.position
        diff = exit_price - p["entry"]
        if p["side"] == "SHORT":
            diff = -diff
        return diff * self.unit_size

    def close(self, exit_price, reason):
        p = self.position
        pnl = self._pnl(exit_price)
        self.realized += pnl
        if pnl >= 0:
            self.wins += 1
        else:
            self.losses += 1
        self._write("EXIT", p["side"], exit_price, p["stop"], p["target"], reason, pnl)
        self.position = None
        return pnl

    def check_exit(self, candle):
        """Return (exit_price, reason) if stop/target hit on this candle, else None."""
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
# Alerts
# --------------------------------------------------------------------------

def alert(kind, symbol, side, price, stop=None, target=None, reason="", pnl=None):
    """Loud, human-readable alert to the terminal (with a bell)."""
    bell = "\a"
    ts = datetime.now().strftime("%H:%M:%S")
    line = "=" * 60
    print(f"\n{bell}{line}")
    if kind == "ENTRY":
        print(f"  >>> {side} {symbol}   @ {price:,.2f}   [{ts}]")
        print(f"      stop {stop:,.2f}   target {target:,.2f}")
        print(f"      why: {reason}")
        print(f"      ACTION: mirror this {side} in your real account if you agree.")
    elif kind == "EXIT":
        tag = "PROFIT" if pnl >= 0 else "LOSS"
        print(f"  <<< CLOSE {side} {symbol} @ {price:,.2f}   [{ts}]  ({tag} {pnl:+,.2f})")
        print(f"      why: {reason}")
        print(f"      ACTION: close your real {side} position now.")
    print(line)


# --------------------------------------------------------------------------
# Main loop
# --------------------------------------------------------------------------

def main():
    ap = argparse.ArgumentParser(description="Paper follow-along trading bot.")
    ap.add_argument("--symbol", default="BTC-USD", help="Coinbase product, e.g. BTC-USD, ETH-USD")
    ap.add_argument("--granularity", type=int, default=60,
                    help="bar size in seconds (60, 300, 900, 3600). Default 60.")
    ap.add_argument("--engine", choices=["rule", "llm"], default="rule",
                    help="decision engine: 'rule' (built-in, no key) or 'llm' (Claude).")
    ap.add_argument("--model", default="claude-haiku-4-5-20251001",
                    help="model for --engine llm.")
    ap.add_argument("--unit-size", type=float, default=0.1,
                    help="paper position size in units of the asset (for P&L scoring).")
    ap.add_argument("--stop-atr", type=float, default=1.5, help="stop = N x ATR.")
    ap.add_argument("--target-atr", type=float, default=2.0, help="target = N x ATR.")
    ap.add_argument("--max-daily-loss", type=float, default=0.0,
                    help="stop trading for the day after losing this much paper $ (0 = off).")
    ap.add_argument("--log", default="trades.csv", help="CSV trade log path.")
    args = ap.parse_args()

    engine = RuleEngine() if args.engine == "rule" else LLMEngine(model=args.model)
    acct = PaperAccount(args.unit_size, args.stop_atr, args.target_atr, args.log)

    poll = max(args.granularity, 15)
    print("=" * 60)
    print("  PAPER TRADING BOT — simulated account, real prices")
    print(f"  symbol={args.symbol}  bar={args.granularity}s  engine={engine.name}")
    print(f"  stop={args.stop_atr}xATR  target={args.target_atr}xATR  size={args.unit_size}")
    print("  This is FAKE money. Mirror trades in your real account manually,")
    print("  at your own risk. Ctrl+C to stop.")
    print("=" * 60)

    last_bar_time = None
    day = datetime.now(timezone.utc).date()
    halted = False

    while True:
        try:
            candles = fetch_candles(args.symbol, args.granularity)
        except (urllib.error.URLError, ValueError, TimeoutError) as e:
            print(f"[{datetime.now():%H:%M:%S}] data feed error: {e} — retrying")
            time.sleep(poll)
            continue

        if len(candles) < 2:
            time.sleep(poll)
            continue

        # Use the most recent CLOSED candle (second to last; last is still forming).
        closed = candles[:-1]
        newest = closed[-1]

        # reset daily loss halt at UTC date change
        today = datetime.now(timezone.utc).date()
        if today != day:
            day, halted = today, False

        if newest["time"] != last_bar_time:
            last_bar_time = newest["time"]

            # 1) manage an open position against this freshly closed bar
            if acct.position:
                ex = acct.check_exit(newest)
                if ex:
                    price, reason = ex
                    side = acct.position["side"]
                    pnl = acct.close(price, reason)
                    alert("EXIT", args.symbol, side, price, reason=reason, pnl=pnl)
                    if args.max_daily_loss > 0 and acct.realized <= -abs(args.max_daily_loss):
                        halted = True
                        print(f"\n*** Daily loss limit hit ({acct.realized:+.2f}). "
                              f"No new trades until tomorrow (UTC). ***")

            # 2) ask the engine for a decision and act on it
            decision, why, atr_val = engine.decide(closed)
            price = newest["close"]

            if acct.position:
                # exit if the engine flips against us
                if (acct.position["side"] == "LONG" and decision == "SHORT") or \
                   (acct.position["side"] == "SHORT" and decision == "LONG"):
                    side = acct.position["side"]
                    pnl = acct.close(price, "engine reversed")
                    alert("EXIT", args.symbol, side, price, reason="signal reversed", pnl=pnl)
            if not acct.position and not halted and decision in ("LONG", "SHORT"):
                pos = acct.open(decision, price, atr_val, why)
                if pos:
                    alert("ENTRY", args.symbol, decision, price,
                          stop=pos["stop"], target=pos["target"], reason=why)

            # heartbeat / scoreboard
            total = acct.wins + acct.losses
            wr = (acct.wins / total * 100) if total else 0.0
            state = acct.position["side"] if acct.position else "flat"
            print(f"[{datetime.now():%H:%M:%S}] {args.symbol} {price:,.2f} "
                  f"| {decision:5} ({why}) | pos={state} "
                  f"| P&L {acct.realized:+.2f} | {acct.wins}W/{acct.losses}L ({wr:.0f}%)")

        time.sleep(poll)


if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\nStopped. Your trade log is saved. Nothing was traded for real.")
