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
| `--engine` | `rule` (built-in) or `llm` (Claude decides) | `rule` |
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

## Backtest before you trade live

Run the strategy over a **saved** bar file to see how it would have done — no
waiting, no live feed. Save a session of bars (the BarLogger CSV works, or export
from NinjaTrader), then:

```bash
python3 bot.py --backtest --symbol MES --csv-file saved_day.csv
```

You'll get a summary:

```
  Trades taken        : 5
  Wins / Losses       : 2 / 3  (40.0% win rate)
  Net P&L             : $-2.50
  Profit factor       : 0.94  (>1 = profitable on this data)
  Max drawdown        : -$40.00
  Worst losing streak : 3
```

**A good backtest is not a promise.** Short samples overfit, and past results
don't predict the future. Use it to sanity-check and compare settings
(`--stop-atr`, `--target-atr`, `--engine`), not as proof it'll make money.

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
