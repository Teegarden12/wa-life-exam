# Windows setup — run it 24/7 and use it from your phone

This gets the bot running on your Windows PC so it keeps going **after you log
out**, and shows how to open it on your phone. Your PC has to stay **powered on
and awake** (the installer disables sleep on AC power). If you'd rather not leave
a PC on, use the cloud/Pi route in DEPLOY.md instead.

---

## 1. Install Python (one time)

Download from <https://www.python.org/downloads/>. On the **first install
screen, tick "Add Python to PATH"**, then finish. Nothing else to install — the
app uses only Python's standard library.

## 2. Put the folder on your PC

Copy the `trading-bot` folder somewhere permanent, e.g. `C:\paper-bot`.
(Don't run it from Downloads or a temp folder.)

## 3. Configure it

- Copy `config.example.json` to `config.json`.
- Open `config.json` in Notepad and set at least:
  - `"host": "0.0.0.0"`  — so your phone can reach it
  - `"token": "a-long-secret-you-make-up"`  — your password for remote access
  - `"ntfy-topic": "something-long-and-unguessable"`  — for phone push alerts
  - leave `"execute": "manual"` for now (signals only, safest)

You can also set the instrument/strategy here, or do it later in the app.

## 4. Turn on "runs when logged out"

**Right-click `install-startup.bat` → Run as administrator.**

That registers a background task that:
- starts the app at every boot,
- keeps running after you log out,
- opens port 8787 in the firewall,
- disables sleep on AC power,
- starts it immediately (no reboot needed).

Check it's up: on the PC open <http://127.0.0.1:8787/> — you should see the app.

To remove it later: right-click `uninstall-startup.bat` → Run as administrator.

## 5. Get it on your phone

**Push alerts (the main thing):**
1. Install the **ntfy** app (App Store / Play Store).
2. Subscribe to the exact topic you put in `config.json`.
3. Signals now buzz your phone — no dashboard needed.

**The dashboard, from anywhere (Tailscale):**
1. Install **Tailscale** on the PC and your phone; sign in to the **same account** on both (free).
2. On the PC, find its Tailscale IP (looks like `100.x.y.z`) — open the Tailscale app.
3. On your phone's browser, go to:
   `http://100.x.y.z:8787/?token=YOUR_TOKEN`
   (use the token from `config.json`).

**Make it a home-screen app:**
- iPhone (Safari): Share → **Add to Home Screen**.
- Android (Chrome): menu → **Install app / Add to Home screen**.
- Now it opens full-screen with its own icon, like a normal app.

## 6. Connect your account

In the app, open **Connect account**, paste your **TradersPost webhook URL**
(and Tradovate data credentials if you use that feed), **Save**, then
**Test connection** to confirm the link works.

---

## Everyday use

- Leave the PC on and awake. The bot runs itself.
- Watch signals on your phone (ntfy) and place them in your Lucid/broker app —
  or, once you trust it, switch **Execution** to Auto for hands-free.

## Troubleshooting

- **Phone can't connect:** confirm Tailscale shows both devices online; make sure
  `host` is `0.0.0.0` in `config.json`; re-run `install-startup.bat` after config
  changes.
- **"Python not found" during install:** you missed "Add Python to PATH" — reinstall
  Python with that box ticked.
- **Is it running?** Open Task Scheduler → look for `PaperTradingBot`, or just load
  <http://127.0.0.1:8787/> on the PC.
- **Stop it:** `uninstall-startup.bat` as administrator.

## Honest reminders

- The PC must stay on and awake; if it sleeps or powers off, the bot stops.
- Keep it on **manual** and on paper/demo until you've watched it for a while.
- No strategy here is guaranteed — most auto-strategies lose. This runs *your*
  plan reliably; it doesn't make the plan profitable.
