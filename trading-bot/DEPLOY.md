# Running PC-free (phone-only) via Tradovate

This lets the bot run without your PC: a small always-on cloud server pulls your
real futures data from **Tradovate** and pushes signals to your phone. You place
the trades in your Lucid/broker mobile app.

---

## ⚠️ Check these FIRST — they decide whether this is even possible

1. **API access on your account.** Your Lucid/prop account must *permit* API
   access. Many eval/funded accounts block it, and connecting against the rules
   can fail the account. **Ask Lucid support directly** before doing this.
2. **Real-time market data.** You need a real-time data subscription on
   Tradovate (a monthly CME fee). Without it the API returns delayed data.
3. This uses Tradovate's live API, which **could not be tested where it was
   written.** Plan to validate it with your credentials — the first run may need
   small fixes. It only *reads* data; it places no orders.

If your account blocks API access, this path won't work — use the SPY/QQQ proxy
(below) or keep NinjaTrader on a PC instead (see README).

---

## Quick $0 test first (no Tradovate, no PC) — recommended

Before dealing with API access, prove the whole cloud setup works for free using
a **SPY/QQQ proxy feed**. It pulls index-ETF bars from a free source and writes
`bars.csv` just like the real feed does. On your server:

```bash
cp config.example.json config.json    # edit: host 0.0.0.0, a token, your ntfy-topic
PROXY_SYMBOL=SPY ./run-cloud-proxy.sh     # SPY for MES/ES  (QQQ for MNQ/NQ)
```

That's it — no credentials, nothing to install. You'll get live-ish signals on
your phone within a couple of minutes, and you can confirm the server → bars.csv
→ app → phone chain end to end.

**Honest limits of the proxy:** SPY is not the ES contract (only tracks the same
index), and the free data is delayed ~15 minutes. It's for *testing the setup*,
not for trading real money on timing. Once it works, switch to the Tradovate
feed below for real, real-time data.

---

## What you need

- A small always-on computer. Cheapest options:
  - a **$4–6/month VPS** (Hetzner, DigitalOcean, Vultr), or
  - **Oracle Cloud Free Tier** (an always-free small VM), or
  - a **Raspberry Pi** (~$50, one-time) at home.
- Your Tradovate **API credentials** (username, password, API key `cid`, secret).
  Get these from Tradovate's API access settings once API access is enabled.

## Step 1 — put the files on the server

Copy the `trading-bot` folder to the server (git clone, or `scp`).

## Step 2 — set your credentials

Create a file `tradovate.env` in the folder (never commit it):

```
TRADOVATE_USERNAME=you@example.com
TRADOVATE_PASSWORD=your-password
TRADOVATE_APP_ID=paperbot
TRADOVATE_CID=your-api-key-id
TRADOVATE_SECRET=your-api-secret
TRADOVATE_ENV=live
TRADOVATE_CONTRACT=MESM5
```

`TRADOVATE_CONTRACT` is the current front-month symbol of the instrument you
trade (e.g. `MESM5`, `MNQU5`) — find it in Tradovate.

## Step 3 — set up config.json

Copy `config.example.json` to `config.json` and set the phone options:

```json
{
  "symbol": "MES",
  "allow": "MES,MNQ",
  "data-source": "csv",
  "csv-file": "bars.csv",
  "engine": "auto",
  "autostart": true,
  "host": "0.0.0.0",
  "port": 8787,
  "token": "a-long-secret-you-choose",
  "ntfy-topic": "lucid-mes-7fx93k"
}
```

## Step 4 — run it

**With Docker (simplest):**
```bash
docker build -t paperbot .
docker run -p 8787:8787 --env-file tradovate.env --restart unless-stopped paperbot
```

**Without Docker:**
```bash
pip install -r requirements-cloud.txt
export $(grep -v '^#' tradovate.env | xargs)   # load credentials
./run-cloud.sh
```

The feed logs each bar it writes; the app autostarts trading and pushes every
signal to your phone via ntfy.

## Step 5 — use it from your phone

- **Signals:** install the **ntfy** app, subscribe to your `ntfy-topic`. Every
  entry/exit buzzes your phone; you place the trade in your broker's mobile app.
- **Dashboard (optional):** install **Tailscale** on the server and your phone
  (same account), then open `http://<server-tailscale-ip>:8787/?token=YOUR_TOKEN`.
  Tailscale keeps it private to your own devices. If you skip Tailscale and use
  the server's public IP, the `token` is your only lock — keep it long and secret,
  and prefer Tailscale.

## Before real money

Run it in Tradovate **demo** (`TRADOVATE_ENV=demo`) first and watch the signals
against a chart for a good while. Confirm Lucid permits this style of trading.
Nothing here guarantees profit — it's a paper tool that tells you what it *would*
do; you decide whether to follow it.
