#!/usr/bin/env python3
"""
Compare strategies across many saved days.

Runs every strategy in strategies.REGISTRY over a folder of daily bar files
(one CSV per day, e.g. from `bot.py --record` or NinjaTrader export) and reports,
per strategy:

  * trades, win rate WITH a 95% confidence interval (Wilson)
  * net P&L, profit factor, expectancy per trade
  * max drawdown, and % of days that finished green

Then it does a WALK-FORWARD test: it picks the best strategy using only the
OLDER days, and reports how that choice did on the NEWER days it never saw. That
out-of-sample result is the most honest proxy you can get for "what might happen
next" — and it is still not a guarantee.

Usage:
    python3 compare.py --data-dir data --symbol MES
    python3 compare.py --data-dir data --symbol MES --contracts 2 --stop-atr 2

Read the honesty note the tool prints at the end. A backtest describes the past.
"""

import argparse
import glob
import math
import os

import bot
import instruments
import strategies


def wilson_ci(k, n, z=1.96):
    """95% Wilson confidence interval for a win rate k/n. Returns (lo, hi) in %."""
    if n == 0:
        return (0.0, 0.0)
    p = k / n
    denom = 1 + z * z / n
    center = (p + z * z / (2 * n)) / denom
    margin = z * math.sqrt(p * (1 - p) / n + z * z / (4 * n * n)) / denom
    return (max(0.0, center - margin) * 100, min(1.0, center + margin) * 100)


def run_day(candles, engine_key, spec, contracts, stop_atr, target_atr):
    """Backtest one day. Returns the list of per-trade P&L for that day."""
    engine = strategies.build(engine_key)
    acct = bot.PaperAccount(spec, contracts, stop_atr, target_atr, os.devnull)
    pnls = []

    def collect(kind, side, price, **kw):
        if kind == "EXIT":
            pnls.append(kw["pnl"])

    for i in range(2, len(candles) + 1):
        bot.process_bar(acct, engine, candles[:i], "", spec, contracts,
                        halted=False, max_daily_loss=0, emit=collect)
    if acct.position:
        acct.close(candles[-1]["close"], "day end")
        pnls.append(acct.realized - sum(pnls))
    return pnls


def stats_for(all_trades, day_nets):
    n = len(all_trades)
    wins = [p for p in all_trades if p >= 0]
    losses = [p for p in all_trades if p < 0]
    gross_win = sum(wins)
    gross_loss = -sum(losses)
    net = sum(all_trades)
    pf = (gross_win / gross_loss) if gross_loss > 0 else (float("inf") if gross_win > 0 else 0.0)
    win_rate = (len(wins) / n * 100) if n else 0.0
    lo, hi = wilson_ci(len(wins), n)
    equity = peak = max_dd = 0.0
    for p in all_trades:
        equity += p
        peak = max(peak, equity)
        max_dd = max(max_dd, peak - equity)
    days_green = sum(1 for d in day_nets if d > 0)
    return {
        "trades": n, "wins": len(wins), "losses": len(losses),
        "win_rate": win_rate, "ci_lo": lo, "ci_hi": hi, "net": net,
        "pf": pf, "expectancy": (net / n) if n else 0.0, "max_dd": max_dd,
        "days_green": days_green, "days": len(day_nets),
    }


def evaluate(days, engine_key, spec, contracts, stop_atr, target_atr):
    all_trades, day_nets = [], []
    for candles in days:
        day_pnls = run_day(candles, engine_key, spec, contracts, stop_atr, target_atr)
        all_trades += day_pnls
        day_nets.append(sum(day_pnls))
    return stats_for(all_trades, day_nets)


def main():
    ap = argparse.ArgumentParser(description="Compare strategies across saved days.")
    ap.add_argument("--data-dir", default="data", help="folder of daily bar CSVs")
    ap.add_argument("--symbol", default="MES", help="instrument (also filters files by name)")
    ap.add_argument("--contracts", type=int, default=1)
    ap.add_argument("--stop-atr", type=float, default=1.5)
    ap.add_argument("--target-atr", type=float, default=2.0)
    ap.add_argument("--demo", action="store_true", help="allow a demo (crypto) instrument")
    args = ap.parse_args()

    spec = instruments.get_spec(args.symbol, demo=args.demo)
    if spec is None:
        raise SystemExit(f"Unknown symbol '{args.symbol}'.")

    # gather daily files (prefer ones named for the symbol; else take all)
    files = sorted(glob.glob(os.path.join(args.data_dir, f"{args.symbol}_*.csv")))
    if not files:
        files = sorted(glob.glob(os.path.join(args.data_dir, "*.csv")))
    if not files:
        raise SystemExit(
            f"No bar files in {args.data_dir}/. Build some with:\n"
            f"  python3 bot.py --record --symbol {args.symbol} ...\n"
            f"or drop one CSV per day (time,open,high,low,close,volume) in there.")

    days = []
    for path in files:
        candles = bot.read_csv_bars(path)
        if len(candles) >= 30:
            days.append(candles)
    if not days:
        raise SystemExit("Found files but none had >=30 usable bars.")

    line = "=" * 78
    print(line)
    print(f"  STRATEGY COMPARISON — {args.symbol} ({spec['name']})  x{args.contracts}")
    print(f"  {len(days)} day(s), {len(files)} file(s), "
          f"stop={args.stop_atr}xATR target={args.target_atr}xATR")
    print(line)
    print(f"  {'strategy':<18}{'trades':>7}{'win% (95% CI)':>20}"
          f"{'net $':>11}{'PF':>7}{'exp$':>8}{'maxDD':>9}{'days+':>8}")
    print("  " + "-" * 76)

    results = {}
    for key in strategies.REGISTRY:
        s = evaluate(days, key, spec, args.contracts, args.stop_atr, args.target_atr)
        results[key] = s
        pf = "inf" if s["pf"] == float("inf") else f"{s['pf']:.2f}"
        ci = f"{s['win_rate']:.0f}% ({s['ci_lo']:.0f}-{s['ci_hi']:.0f})"
        green = f"{s['days_green']}/{s['days']}"
        print(f"  {key:<18}{s['trades']:>7}{ci:>20}{s['net']:>+11.0f}"
              f"{pf:>7}{s['expectancy']:>+8.1f}{-s['max_dd']:>9.0f}{green:>8}")

    # ---- walk-forward / out-of-sample ----
    print("\n" + line)
    print("  WALK-FORWARD (out-of-sample) — the honest forward read")
    print(line)
    if len(days) < 3:
        print(f"  Only {len(days)} day(s) of data — too few to split into train/test.")
        print("  Capture more days (aim for many) before trusting any of this.")
    else:
        cut = max(1, round(len(days) * 0.7))
        train, test = days[:cut], days[cut:]
        # choose the best strategy on TRAIN by expectancy (avoids overfitting to
        # one lucky big day)
        train_stats = {k: evaluate(train, k, spec, args.contracts,
                                   args.stop_atr, args.target_atr)
                       for k in strategies.REGISTRY}
        best = max(train_stats, key=lambda k: train_stats[k]["expectancy"])
        te = evaluate(test, best, spec, args.contracts, args.stop_atr, args.target_atr)
        print(f"  Trained on the first {len(train)} day(s), tested on the last {len(test)}.")
        print(f"  Best strategy on training data : {best} ({strategies.REGISTRY[best].label})")
        print(f"  On UNSEEN test days it produced :")
        print(f"     trades         : {te['trades']}")
        print(f"     win rate       : {te['win_rate']:.0f}%  "
              f"(95% CI {te['ci_lo']:.0f}-{te['ci_hi']:.0f}%)")
        print(f"     net P&L        : ${te['net']:+,.0f}")
        print(f"     days finished green : {te['days_green']} of {te['days']} "
              f"({(te['days_green']/te['days']*100) if te['days'] else 0:.0f}%)")
        print(f"     expectancy/trade    : ${te['expectancy']:+.2f}")

    print("\n" + line)
    print("  HOW TO READ THIS — please don't skip")
    print(line)
    print("  * The win% CONFIDENCE INTERVAL is the real story. A wide range (e.g.")
    print("    40-70%) means you don't have enough trades to know anything yet.")
    print("  * The walk-forward number is the closest honest estimate of forward")
    print("    odds, because it's measured on days the strategy never trained on.")
    print("  * It is STILL not a prediction. Markets regime-shift; a strategy can")
    print("    look great out-of-sample and then lose next week. No percentage here")
    print("    is a promise about the next day or the next month.")
    print("  * More days = more trustworthy. A handful of days tells you almost")
    print("    nothing. Keep recording and re-running this.")
    print(line)


if __name__ == "__main__":
    main()
