# Paper "follow-along" trading bot — Lucid edition

A bot that watches **real-time futures data**, makes its **own trade
decisions**, tracks a **simulated (fake-money) account**, and prints a loud
alert every time it enters or exits — so you can **mirror the trade in your real
Lucid account by hand**.

It only ever trades **instruments you're allowed to trade in Lucid** (you set the
list), and it reports every stop and target in **ticks and dollars** — the units
you actually use. It never connects to, logs into, or places orders on any real
brokerage. You are always the human who decides whether to place a trade.

---

## ⚠️ Read this first — the honest version

- **No proven edge.** The bot's decisions are not better than a guess about
  where price goes next. Neither the built-in rules nor the optional "Claude
  decides" mode can predict the market. Most retail auto-strategies lose money.
- **Treat it as an experiment.** Watch it on paper for a long time and see how it
  actually does before a single real dollar is involved.
- **Your Lucid rules are yours to enforce.** Prop firms restrict things — daily
  loss, trailing drawdown, consistency, news trading, sometimes copied/automated
  trading itself. The bot can't know your agreement. Check it. Blowing a rule can
  fail the account.
- **Fake money only.** Real prices, imaginary fills.

---

## Keeping it to "what Lucid allows"

Open **`instruments.py`** and edit the `ALLOWED` set so it lists exactly the
symbols your Lucid account permits:

```python
ALLOWED = {"MES", "MNQ"}      # <-- edit to match your Lucid account
```

The bot **refuses to trade anything not in `ALLOWED`.** The seeded list is just
common micros — it is **not** an authoritative statement of what Lucid permits.
Contract specs for ES/NQ/YM/RTY, their micros, CL, and GC are already defined
(tick size and tick value) so stops/targets come out in ticks and dollars.

---

## Getting real futures data (the important part)

Real-time futures data isn't free, and a standalone bot has no feed of its own —
but **your NinjaTrader already has one.** So the bot reads bars that NinjaTrader
writes for it:

1. In NinjaTrader, open the **NinjaScript Editor** and add the indicator in
   [`ninjatrader/BarLogger.cs`](ninjatrader/BarLogger.cs) (paste it into a new
   Indicator and press F5 to compile). It only *writes price data to a file* —
   it places no orders and touches no account.
2. Put a chart of the instrument you'll trade (e.g. **MES, 1-minute**) on screen
   and apply the **BarLogger** indicator. Set its `OutputPath` to a file, e.g.
   `C:\paper-bot\bars.csv`.
3. Run the bot pointed at that same file (next section).

Now the bot decides on your real MES feed — the exact instrument you'll mirror in
Lucid.

---

## Run it

Requirements: **Python 3.9+**, no packages to install.

```bash
# Real path: decide on MES bars your NinjaTrader is logging
python3 bot.py --data-source csv --symbol MES --csv-file "C:\paper-bot\bars.csv"
```

You'll see a heartbeat each bar and a big boxed **ALERT** on every entry/exit:

```
================================================================
  >>> LONG 1x MES  @ 5,043.00   [09:31:00]
      stop   5,039.75   (13 ticks, -$16.25)
      target 5,047.25   (17 ticks, +$21.25)
      why: EMA9>21, RSI 62
      ACTION: mirror this LONG of 1 MES in Lucid if you agree.
================================================================
```

Every trade is also appended to **`trades.csv`**. Stop any time with **Ctrl+C** —
nothing is ever traded for real.

### Just want to see it move right now?

Crypto trades 24/7 and Coinbase's data is free, so there's a **demo** feed to
watch the mechanics (it is **not** Lucid-tradable and requires `--demo`):

```bash
python3 bot.py --demo --data-source coinbase --symbol BTC-USD
```

## Options

| Option | Meaning | Default |
|---|---|---|
| `--symbol` | Instrument (must be in `ALLOWED`) | `MES` |
| `--data-source` | `csv` (NinjaTrader bars) or `coinbase` (demo) | `csv` |
| `--csv-file` | Path NinjaTrader logs bars to | `bars.csv` |
| `--contracts` | Paper position size in contracts | `1` |
| `--engine` | `ema_rsi`, `orb`, `fair_value`, `support_resistance`, `vwap_revert`, `donchian`, `llm`, or `auto` | `ema_rsi` |
| `--last-days` | For `auto`: rank over the most recent N recorded days (0 = all) | `0` |
| `--config` | JSON defaults file (CLI overrides it) | `config.json` |
| `--record` | Capture bars to `data/<symbol>_<date>.csv`, no trading | off |
| `--data-dir` | Folder for captured daily bar files | `data` |
| `--stop-atr` / `--target-atr` | Stop/target = N × ATR | `1.5` / `2.0` |
| `--max-daily-loss` | Halt new trades after this paper $ loss/day | `0` (off) |
| `--demo` | Allow a non-Lucid demo instrument | off |
| `--desktop` | Desktop pop-up on each alert | off |
| `--ntfy-topic` | Phone push via ntfy.sh/&lt;topic&gt; | off |
| `--webhook-url` | POST alerts as JSON to a URL | off |
| `--backtest` | Run over `--csv-file` and print stats, then exit | off |
| `--log` | Trade-log CSV path | `trades.csv` |

## Get alerts on your phone or desktop

By default alerts print to the terminal (with a bell). Turn on any of these to be
notified when you're not staring at the window — all optional, mix and match:

```bash
# Desktop pop-up on the machine running the bot
python3 bot.py --data-source csv --symbol MES --csv-file bars.csv --desktop

# Push to your PHONE via ntfy (free, no account):
#   1. Install the "ntfy" app (iOS/Android).
#   2. Subscribe to a topic name — pick something long and unguessable,
#      e.g. lucid-mes-9f3k2. Anyone who knows the topic can read your alerts.
#   3. Pass it here:
python3 bot.py ... --ntfy-topic lucid-mes-9f3k2

# POST alerts as JSON to any URL (Discord/Slack webhook, your own service)
python3 bot.py ... --webhook-url https://discord.com/api/webhooks/....
```

Notifications are best-effort: if a channel is down the bot logs a line and keeps
trading. The terminal alert always fires.

## Strategies

Six built-in strategies (pick with `--engine`), all in `strategies.py`:

| key | what it does |
|---|---|
| `ema_rsi` | trend-follow: fast/slow EMA cross, filtered by RSI (default) |
| `orb` | opening-range breakout: trade breaks of the first N bars' high/low |
| `fair_value` | fair-value gap (FVG): trade the direction of a 3-bar imbalance when price returns into it |
| `support_resistance` | bounce: fade the edges of the recent range (support/resistance) |
| `vwap_revert` | mean-reversion: fade price when it stretches far from VWAP |
| `donchian` | breakout: new high/low of the last N bars |

Add your own by writing a class with a `decide(candles)` method and registering
it in `REGISTRY`.

## Capture days, then backtest and compare

### 1. Record a day of bars

Leave this running through a session to save bars to `data/<symbol>_<date>.csv`
(rolls to a new file each day). Point it at your NinjaTrader feed:

```bash
python3 bot.py --record --symbol MES --data-source csv --csv-file bars.csv
```

### 2. Backtest one strategy on one day

```bash
python3 bot.py --backtest --symbol MES --csv-file data/MES_2026-07-24.csv --engine orb
```

### 3. Compare all strategies and get a recommendation

Point it at your `data/` folder — it runs every strategy over every saved day,
ranks them, and **recommends the one that worked best**:

```bash
python3 compare.py --data-dir data --symbol MES              # all recorded days
python3 compare.py --data-dir data --symbol MES --last-days 5  # just the past week
```

```
  strategy           trades       win% (95% CI)      net $     PF    exp$    maxDD   days+
  ----------------------------------------------------------------------------
  ema_rsi                53         36% (24-49)        -65   0.83    -1.2     -162     1/8
  orb                   153         86% (79-90)      +2455   9.05   +16.0      -95     6/8
  fair_value             87         74% (63-82)       +949   4.26   +10.9      -70     6/8
  donchian              135         85% (78-90)      +2170   8.68   +16.1     -110     5/8
  ...
  RECOMMENDATION — best over the last 5 recorded day(s)
  >>> Trade: orb  (Opening-Range Breakout)
      net $+1,430 over 5 days | green 4/5 days | win 87% (78-92) | exp $+16.07/trade
      runner-up: donchian net $+1,265
      caution: top two are close — no clear standout.
```

The columns, briefly: **net $** is the bottom line, **days+** is how many days
finished green (consistency), and **win% (95% CI)** shows the win rate *with its
uncertainty* — a wide range like `40% (24-49)` means too few trades to trust yet.
The tool flags a pick as tentative when the sample is thin or the top two are
close.

One honest line it always prints: *this is what worked on this sample, not a
promise about tomorrow.* Re-run it as you record more days — if the recommended
strategy keeps changing, that itself is telling you none has a real edge yet.
Sim-trade the pick before going live.

## Auto-pick: let the bot run whatever ranks best

Instead of choosing `--engine` yourself each week, use `--engine auto`. On
startup (and again at the start of each new day) the bot ranks all strategies
over your recorded days and trades whichever is best:

```bash
python3 bot.py --engine auto --symbol MES --data-source csv --csv-file bars.csv
# rank over just the past week:
python3 bot.py --engine auto --last-days 5 --symbol MES --csv-file bars.csv
```

```
  AUTO-SELECTED: orb (Opening-Range Breakout) — best over 8 day(s), net $+2,455
```

- It re-ranks at each new day and switches if the leader changed (only while
  flat, never mid-trade), printing an `AUTO-RESELECT` line.
- If **nothing** was net-profitable over your recorded days, auto mode **refuses
  to trade** and tells you so — better to sit out than trade a losing set.
- It needs recorded history first (`--record`), and the more days the better.

This keeps the pick honest and current, but it's still picking based on the
past. A strategy that led last week can lag next week — that's why it re-checks
daily and sits out when nothing works.

## Config file (skip the long command lines)

Copy `config.example.json` to `config.json` and set your defaults once:

```bash
cp config.example.json config.json
# edit config.json, then just:
python3 bot.py
```

Any command-line flag still overrides the file. Keys use the flag names (hyphens
or underscores both work), e.g. `"stop-atr": 2.0`.

## Optional: let Claude make each decision

```bash
export ANTHROPIC_API_KEY=sk-ant-...        # console.anthropic.com
python3 bot.py --engine llm --data-source csv --symbol MES --csv-file bars.csv
```

Small cost per decision; the key stays on your machine. Same warnings apply —
it's still a guess with no market edge.

---

## How it works (so you can change it)

1. **Data** — reads bars NinjaTrader logs for your instrument (or demo crypto).
2. **Decision** — `RuleEngine` combines an EMA trend filter with an RSI momentum
   check → LONG / SHORT / FLAT. (Or `LLMEngine` asks Claude.) Edit the numbers in
   `bot.py`, or drop in your own engine.
3. **Management** — sets an ATR-based stop and target, snapped to real tick
   prices; exits on stop, target, or a signal flip.
4. **Account** — a simulated account tracks position, realized $ P&L, and a
   win/loss record, logged to `trades.csv`.
5. **Alerts** — a boxed message + terminal bell tells you exactly what to mirror,
   in contracts, ticks, and dollars.

**Bottom line:** a tool for testing an idea on paper, on your real Lucid
instruments, before any real money is involved — not a money machine.
