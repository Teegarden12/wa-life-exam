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

import indicators as ind
import instruments
import notify
import strategies


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
# Decision engines
#
# Rule-based strategies live in strategies.py (a registry you can extend). The
# only engine defined here is the optional LLM one, since it needs API plumbing.
# All engines expose decide(candles) -> ("LONG"|"SHORT"|"FLAT", reason, atr).
# --------------------------------------------------------------------------

class LLMEngine:
    """Optional: let Claude decide each bar. Needs ANTHROPIC_API_KEY."""
    key = "llm"
    label = "Claude decides"
    API_URL = "https://api.anthropic.com/v1/messages"

    def __init__(self, model="claude-haiku-4-5-20251001", atr_period=14):
        self.model, self.atr_period = model, atr_period
        self.api_key = os.environ.get("ANTHROPIC_API_KEY")
        if not self.api_key:
            sys.exit("ERROR: --engine llm needs ANTHROPIC_API_KEY set. "
                     "Get one at https://console.anthropic.com/")

    def decide(self, candles):
        aa_list = ind.atr(candles, self.atr_period)
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
          stop=None, target=None, reason="", pnl=None, notifier=None):
    """Print a boxed alert and push it to any enabled notification channels."""
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
        title = f"{side} {contracts}x {symbol} @ {price:,.4f}"
        body = (f"stop {stop:,.4f} ({risk_ticks}t/-${risk_usd:,.0f}) | "
                f"target {target:,.4f} ({reward_ticks}t/+${reward_usd:,.0f})\n{reason}")
        urgent = True
    else:
        tag = "PROFIT" if pnl >= 0 else "LOSS"
        print(f"  <<< CLOSE {side} {contracts}x {symbol} @ {price:,.4f}   [{ts}]  ({tag} {pnl:+,.2f} USD)")
        print(f"      why: {reason}")
        print(f"      ACTION: close your real {symbol} position in Lucid now.")
        title = f"CLOSE {side} {contracts}x {symbol} ({tag} {pnl:+,.2f})"
        body = f"exit @ {price:,.4f} — {reason}. Close your Lucid position."
        urgent = True
    print(line)
    if notifier and notifier.any_enabled:
        notifier.send(title, body, urgent=urgent)


# --------------------------------------------------------------------------
# Shared per-bar processing (used by both live loop and backtest)
# --------------------------------------------------------------------------

def process_bar(acct, engine, closed, symbol, spec, contracts, halted,
                max_daily_loss, emit):
    """Run one bar's worth of decision + trade management.

    `emit(kind, side, price, **kw)` is the callback that surfaces ENTRY/EXIT
    events (alerts+notifications live; nothing in backtest). Returns
    (decision, why, halted).
    """
    newest = closed[-1]

    # 1) manage an open position against this freshly closed bar
    if acct.position:
        ex = acct.check_exit(newest)
        if ex:
            price, reason = ex
            side = acct.position["side"]
            pnl = acct.close(price, reason)
            emit("EXIT", side, price, reason=reason, pnl=pnl)
            if max_daily_loss > 0 and acct.realized <= -abs(max_daily_loss):
                halted = True

    # 2) ask the engine and act
    decision, why, atr_val = engine.decide(closed)
    price = newest["close"]

    if acct.position:
        if (acct.position["side"] == "LONG" and decision == "SHORT") or \
           (acct.position["side"] == "SHORT" and decision == "LONG"):
            side = acct.position["side"]
            pnl = acct.close(price, "engine reversed")
            emit("EXIT", side, price, reason="signal reversed", pnl=pnl)
    if not acct.position and not halted and decision in ("LONG", "SHORT"):
        pos = acct.open(decision, price, atr_val, why)
        if pos:
            emit("ENTRY", decision, price, stop=pos["stop"],
                 target=pos["target"], reason=why)

    return decision, why, halted


# --------------------------------------------------------------------------
# Backtest — run the strategy over a saved bar file, print stats
# --------------------------------------------------------------------------

def backtest(candles, engine, spec, contracts, symbol, stop_atr, target_atr,
             log_path):
    if len(candles) < 30:
        sys.exit(f"Need at least ~30 bars to backtest; got {len(candles)}.")
    acct = PaperAccount(spec, contracts, stop_atr, target_atr, log_path)
    pnls = []

    def collect(kind, side, price, **kw):
        if kind == "EXIT":
            pnls.append(kw["pnl"])

    # Feed bars one at a time, exactly like the live loop sees them grow.
    for i in range(2, len(candles) + 1):
        window = candles[:i]
        process_bar(acct, engine, window, symbol, spec, contracts,
                    halted=False, max_daily_loss=0, emit=collect)

    # Close any still-open position at the last price so P&L is complete.
    if acct.position:
        acct.close(candles[-1]["close"], "backtest end")
        pnls.append(acct.realized - sum(pnls))

    # --- stats ---
    n = len(pnls)
    wins = [p for p in pnls if p >= 0]
    losses = [p for p in pnls if p < 0]
    gross_win = sum(wins)
    gross_loss = -sum(losses)
    net = sum(pnls)
    pf = (gross_win / gross_loss) if gross_loss > 0 else float("inf")
    win_rate = (len(wins) / n * 100) if n else 0.0

    # max drawdown on the equity curve
    equity, peak, max_dd = 0.0, 0.0, 0.0
    for p in pnls:
        equity += p
        peak = max(peak, equity)
        max_dd = max(max_dd, peak - equity)

    # worst losing streak
    streak = worst_streak = 0
    for p in pnls:
        streak = streak + 1 if p < 0 else 0
        worst_streak = max(worst_streak, streak)

    line = "=" * 64
    print(f"\n{line}")
    print(f"  BACKTEST — {symbol} ({spec['name']})  x{contracts}  engine={engine.label}")
    print(f"  {len(candles)} bars, stop={stop_atr}xATR target={target_atr}xATR")
    print(line)
    print(f"  Trades taken        : {n}")
    print(f"  Wins / Losses       : {len(wins)} / {len(losses)}  ({win_rate:.1f}% win rate)")
    print(f"  Net P&L             : ${net:+,.2f}")
    print(f"  Gross win / loss    : ${gross_win:,.2f} / -${gross_loss:,.2f}")
    print(f"  Profit factor       : {pf:.2f}"
          + ("  (>1 = profitable on this data)" if pf != float("inf") else ""))
    print(f"  Avg win / avg loss  : ${(gross_win/len(wins)) if wins else 0:,.2f}"
          f" / -${(gross_loss/len(losses)) if losses else 0:,.2f}")
    print(f"  Max drawdown        : -${max_dd:,.2f}")
    print(f"  Worst losing streak : {worst_streak}")
    print(line)
    print("  Reminder: good backtest numbers do NOT mean future profit. A short")
    print("  sample overfits easily. This is a sanity check, not a guarantee.")
    print(line)
    print(f"  Full trade log written to {log_path}")


# --------------------------------------------------------------------------
# Config file + record mode
# --------------------------------------------------------------------------

def load_config(path):
    """Load default settings from a JSON file. Keys use the flag names with
    hyphens or underscores, e.g. {"symbol":"MNQ","stop-atr":2.0}."""
    if not path or not os.path.exists(path):
        return {}
    try:
        with open(path) as f:
            raw = json.load(f)
    except (OSError, ValueError) as e:
        print(f"(config '{path}' ignored: {e})")
        return {}
    return {str(k).replace("-", "_"): v for k, v in raw.items()}


def record_mode(args, spec):
    """Capture closed bars to data/<symbol>_<UTC-date>.csv without trading.

    Great for building a history of days to backtest with compare.py. Leave it
    running through a session; it rolls to a new file each UTC day.
    """
    os.makedirs(args.data_dir, exist_ok=True)
    poll = max(args.granularity, 15) if args.data_source == "coinbase" else max(args.poll, 1)
    print("=" * 64)
    print(f"  RECORD MODE — capturing {args.symbol} bars to {args.data_dir}/ (no trading)")
    print("  Leave running to build a day of history. Ctrl+C to stop.")
    print("=" * 64)
    last = None
    while True:
        try:
            if args.data_source == "coinbase":
                candles = fetch_coinbase(args.symbol, args.granularity)[:-1]
            else:
                candles = read_csv_bars(args.csv_file)
        except (urllib.error.URLError, ValueError, TimeoutError, OSError) as e:
            print(f"[{datetime.now():%H:%M:%S}] feed error: {e} — retrying")
            time.sleep(poll)
            continue
        if not candles:
            time.sleep(poll)
            continue
        newest = candles[-1]
        if newest["time"] != last:
            last = newest["time"]
            date = datetime.now(timezone.utc).strftime("%Y-%m-%d")
            path = os.path.join(args.data_dir, f"{args.symbol}_{date}.csv")
            newfile = not os.path.exists(path)
            with open(path, "a", newline="") as fh:
                w = csvmod.writer(fh)
                if newfile:
                    w.writerow(["time", "open", "high", "low", "close", "volume"])
                w.writerow([newest["time"], newest["open"], newest["high"],
                            newest["low"], newest["close"], newest["volume"]])
            print(f"[{datetime.now():%H:%M:%S}] saved bar -> {path}  "
                  f"close {newest['close']:,.4f}")
        time.sleep(poll)


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
    ap.add_argument("--engine", choices=list(strategies.REGISTRY) + ["llm"],
                    default="ema_rsi", help="strategy to trade")
    ap.add_argument("--model", default="claude-haiku-4-5-20251001")
    ap.add_argument("--config", default="config.json",
                    help="JSON file of default settings (CLI flags override it)")
    ap.add_argument("--contracts", type=int, default=1, help="paper position size in contracts")
    ap.add_argument("--stop-atr", type=float, default=1.5, help="stop = N x ATR")
    ap.add_argument("--target-atr", type=float, default=2.0, help="target = N x ATR")
    ap.add_argument("--max-daily-loss", type=float, default=0.0,
                    help="halt new trades after this paper $ loss/day (0 = off)")
    ap.add_argument("--poll", type=float, default=5.0, help="seconds between checks (csv)")
    ap.add_argument("--log", default="trades.csv", help="trade-log CSV path")
    # notifications (all optional)
    ap.add_argument("--desktop", action="store_true", help="pop a desktop notification on each alert")
    ap.add_argument("--ntfy-topic", default=None,
                    help="push alerts to your phone via ntfy.sh/<topic> (install the ntfy app)")
    ap.add_argument("--webhook-url", default=None,
                    help="POST alerts as JSON to a URL (Discord/Slack/custom)")
    # backtest / record
    ap.add_argument("--backtest", action="store_true",
                    help="run over a saved bar file (--csv-file) and print stats, then exit")
    ap.add_argument("--record", action="store_true",
                    help="capture bars to data/<symbol>_<date>.csv (no trading); build history")
    ap.add_argument("--data-dir", default="data",
                    help="folder for captured daily bar files (used by --record and compare.py)")

    # Load defaults from a config file first, so CLI flags still override them.
    pre, _ = ap.parse_known_args()
    cfg = load_config(pre.config)
    if cfg:
        ap.set_defaults(**cfg)
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

    if args.record:
        record_mode(args, spec)
        return

    engine = LLMEngine(model=args.model) if args.engine == "llm" else strategies.build(args.engine)

    # --- backtest mode: run over the saved file and exit ---
    if args.backtest:
        candles = read_csv_bars(args.csv_file)
        if not candles:
            sys.exit(f"No bars found in {args.csv_file}. Point --csv-file at a saved "
                     f"bar file (time,open,high,low,close,volume).")
        backtest(candles, engine, spec, args.contracts, args.symbol,
                 args.stop_atr, args.target_atr, args.log)
        return

    acct = PaperAccount(spec, args.contracts, args.stop_atr, args.target_atr, args.log)
    notifier = notify.Notifier(use_desktop=args.desktop, ntfy_topic=args.ntfy_topic,
                               webhook_url=args.webhook_url)
    poll = max(args.granularity, 15) if args.data_source == "coinbase" else max(args.poll, 1)

    print("=" * 64)
    print("  PAPER TRADING BOT — simulated account, real prices")
    print(f"  {args.symbol} ({spec['name']})  x{args.contracts} contracts")
    print(f"  source={args.data_source}  engine={engine.label}  "
          f"stop={args.stop_atr}xATR  target={args.target_atr}xATR")
    if args.demo:
        print("  *** DEMO instrument — NOT tradable in Lucid. For watching only. ***")
    channels = [c for c, on in [("desktop", args.desktop), ("ntfy", args.ntfy_topic),
                                 ("webhook", args.webhook_url)] if on]
    if channels:
        print(f"  notifications: {', '.join(channels)}")
    print("  FAKE money. Mirror in your real Lucid account manually, at your own")
    print("  risk. Ctrl+C to stop.")
    print("=" * 64)

    def emit(kind, side, price, **kw):
        alert(kind, args.symbol, spec, args.contracts, side, price,
              notifier=notifier, **kw)

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
            was_halted = halted
            decision, why, halted = process_bar(
                acct, engine, closed, args.symbol, spec, args.contracts,
                halted, args.max_daily_loss, emit)
            price = newest["close"]
            if halted and not was_halted:
                print(f"\n*** Daily loss limit hit ({acct.realized:+.2f}). "
                      f"No new trades until tomorrow (UTC). ***")

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
