#!/usr/bin/env python3
"""
Compare strategies across many saved days.

Runs every strategy in strategies.REGISTRY over a folder of daily bar files
(one CSV per day, e.g. from `bot.py --record` or NinjaTrader export), ranks them
over the recorded period, and RECOMMENDS the one that worked best.

Per strategy it reports: trades, win rate with a 95% confidence interval, net
P&L, profit factor, expectancy per trade, max drawdown, and % of days green.

Usage:
    python3 compare.py --data-dir data --symbol MES
    python3 compare.py --data-dir data --symbol MES --last-days 5   # past week
    python3 compare.py --data-dir data --symbol MES --contracts 2 --stop-atr 2
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
    ap.add_argument("--last-days", type=int, default=0,
                    help="only use the most recent N day-files (e.g. 5 = past week); 0 = all")
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

    if args.last_days and args.last_days > 0:
        files = files[-args.last_days:]

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

    # ---- recommendation: what worked best over the recorded period ----
    ranked = sorted(results.items(), key=lambda kv: kv[1]["net"], reverse=True)
    best_key, best = ranked[0]
    runner_key, runner = ranked[1] if len(ranked) > 1 else (None, None)

    print("\n" + line)
    print(f"  RECOMMENDATION — best over the last {len(days)} recorded day(s)")
    print(line)
    if best["net"] <= 0:
        print("  Nothing was net-profitable on this sample. No strategy to recommend —")
        print("  don't trade any of these live yet. Record more days and re-run.")
    else:
        label = strategies.REGISTRY[best_key].label
        print(f"  >>> Trade: {best_key}  ({label})")
        print(f"      net ${best['net']:+,.0f} over {best['days']} days | "
              f"green {best['days_green']}/{best['days']} days | "
              f"win {best['win_rate']:.0f}% ({best['ci_lo']:.0f}-{best['ci_hi']:.0f}) | "
              f"exp ${best['expectancy']:+.2f}/trade")
        if runner:
            print(f"      runner-up: {runner_key} ({strategies.REGISTRY[runner_key].label}) "
                  f"net ${runner['net']:+,.0f}")

        # honest, short flags — only when they matter
        warnings = []
        if best["trades"] < 20:
            warnings.append(f"only {best['trades']} trades — thin sample, treat as tentative")
        if (best["ci_hi"] - best["ci_lo"]) > 30:
            warnings.append("wide win-rate range — result is noisy, not yet reliable")
        if best["days"] < 5:
            warnings.append(f"only {best['days']} day(s) — capture a fuller week+")
        if runner and best["net"] > 0 and runner["net"] > 0 and \
           best["net"] < runner["net"] * 1.25:
            warnings.append("top two are close — no clear standout")
        if warnings:
            print("      caution: " + "; ".join(warnings) + ".")
    print(line)
    print("  This is what worked on THIS sample, not a promise about tomorrow.")
    print("  Re-run as you record more days; if the leader keeps changing, no")
    print("  strategy has a real edge yet. Sim-trade the pick before going live.")
    print(line)


if __name__ == "__main__":
    main()
