# Paper "follow-along" trading bot

A bot that watches **real-time market data**, makes its **own trade decisions**,
tracks a **simulated (fake-money) account**, and prints a loud alert every time
it enters or exits — so you can **mirror the trade in your real account by hand**.

It never connects to, logs into, or places orders on any real brokerage
(Lucid, NinjaTrader, or anything else). You are always the human who decides
whether to actually place a trade.

---

## ⚠️ Read this first — the honest version

- **No proven edge.** This bot's decisions are not better than a guess about
  where price goes next. Neither the built-in rules nor the optional "Claude
  decides" mode can predict the market. Most retail auto-strategies lose money.
- **Treat it as an experiment.** Watch it run on paper for a long time and see
  how it actually does. Do **not** treat its alerts as advice, and never risk
  money you can't afford to lose.
- **Your account, your rules.** If you mirror trades into a Lucid eval/funded
  account, check your firm's rules first — many prop firms restrict automated or
  copied trading, daily loss, and drawdown. That's on you, not the bot.
- **Fake money only.** The account inside this bot is simulated. Real prices,
  imaginary fills.

---

## Requirements

- Python 3.9 or newer. That's it — **no packages to install** for the built-in
  engine. It uses only the Python standard library.
- Internet access to Coinbase's public API (free, no account, no key).

Check your Python:

```bash
python3 --version
```

## Run it

From this folder:

```bash
python3 bot.py
```

That watches **BTC-USD on 1-minute bars** with the built-in decision engine.
Because crypto trades 24/7, you can run it right now, any time, and watch it
work. Stop it any time with **Ctrl+C** — nothing is ever traded for real.

You'll see a heartbeat line each bar and a big boxed **ALERT** on every entry
and exit, e.g.:

```
============================================================
  >>> LONG BTC-USD   @ 61,240.00   [09:31:00]
      stop 61,150.00   target 61,420.00
      why: EMA9>21, RSI 55
      ACTION: mirror this LONG in your real account if you agree.
============================================================
```

Every trade is also appended to **`trades.csv`** so you have a full record.

## Common options

```bash
# Different market or bar size (granularity is in seconds)
python3 bot.py --symbol ETH-USD --granularity 300

# Risk controls: stop = 1.5x ATR, target = 2x ATR, halt after $200 paper loss/day
python3 bot.py --stop-atr 1.5 --target-atr 2.0 --max-daily-loss 200

# See everything
python3 bot.py --help
```

| Option | Meaning | Default |
|---|---|---|
| `--symbol` | Coinbase product (BTC-USD, ETH-USD, SOL-USD, …) | `BTC-USD` |
| `--granularity` | Bar size in seconds: 60, 300, 900, 3600 | `60` |
| `--engine` | `rule` (built-in) or `llm` (Claude decides) | `rule` |
| `--unit-size` | Paper position size, for P&L scoring | `0.1` |
| `--stop-atr` | Stop distance = N × ATR | `1.5` |
| `--target-atr` | Target distance = N × ATR | `2.0` |
| `--max-daily-loss` | Halt new trades after this paper loss ($, 0 = off) | `0` |
| `--log` | Trade-log CSV path | `trades.csv` |

## Optional: let Claude make each decision

Instead of the built-in rules, you can have the Claude API decide each bar.
This needs your own Anthropic API key (a small cost per decision — the key
stays on your machine and is sent only to Anthropic).

```bash
export ANTHROPIC_API_KEY=sk-ant-...        # get one at console.anthropic.com
python3 bot.py --engine llm
```

You can pick the model with `--model` (default is a fast, cheap one). Reminder:
letting Claude decide is still just a guess with no market edge — same warnings
apply.

---

## How it works (so you can change it)

1. **Data** — pulls recent candles from Coinbase's public API each bar.
2. **Decision** — `RuleEngine` combines an EMA trend filter with an RSI
   momentum check to pick LONG / SHORT / FLAT. (Or `LLMEngine` asks Claude.)
   This lives in `bot.py`; edit the numbers, or replace the whole engine with
   your own idea.
3. **Management** — on entry it sets an ATR-based stop and target. Each new bar
   it checks whether the stop or target was hit, or whether the signal flipped,
   and exits accordingly.
4. **Account** — a simulated account tracks position, realized P&L, and a
   win/loss record, all logged to `trades.csv`.
5. **Alerts** — a boxed message + terminal bell on every entry and exit tells
   you exactly what to mirror.

## Pointing it at futures (ES/NQ) later

This prototype uses free crypto data because real-time **futures** data isn't
free and a standalone bot has no feed of its own. The decision logic is
identical regardless of instrument — to trade the S&P/Nasdaq you'd either:

- use a stock/ETF proxy (SPY/QQQ) through a data-API with a key, or
- feed the bot your NinjaTrader data.

Say the word and we can wire up one of those as a next step.

---

**Bottom line:** this is a tool for testing an idea on paper with your own eyes,
not a money machine. Run it, watch it, judge it — before a single real dollar is
ever involved.
