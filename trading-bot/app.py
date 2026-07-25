#!/usr/bin/env python3
"""
Local desktop-style app for the paper trading bot.

Run it and it opens a dashboard in your browser where you can pick the
instrument and strategy, press Start/Stop, and watch live signals, the paper
account, and mirror-alerts — no command line needed.

    python3 app.py

By default it serves on 127.0.0.1 (this machine only). To reach it from your
phone, run with --host 0.0.0.0 and a --token, ideally over Tailscale so only
your own devices can connect (see the README "From your phone" section).

Nothing ever touches a real brokerage account — you still mirror trades in Lucid
by hand. Standard-library only, no packages to install.
"""

import argparse
import json
import os
import threading
import time
import urllib.error
import webbrowser
from datetime import datetime, timezone
from http.server import ThreadingHTTPServer, BaseHTTPRequestHandler
from urllib.parse import urlparse, parse_qs

import bot
import compare
import instruments
import session as session_guard
import strategies
import traderspost

HERE = os.path.dirname(os.path.abspath(__file__))
HOST, PORT = "127.0.0.1", 8787
TOKEN = None  # when set, every request must supply it (?token= or X-Token header)


# --------------------------------------------------------------------------
# Bot runner — runs the trading loop in a background thread, exposes state
# --------------------------------------------------------------------------

class BotRunner:
    def __init__(self):
        self.lock = threading.Lock()
        self.thread = None
        self.stop_flag = False
        self.alerts = []       # recent entry/exit events (most recent last)
        self.reset_state()

    def reset_state(self):
        self.state = {
            "running": False, "symbol": None, "engine": None, "contracts": 1,
            "price": None, "decision": None, "reason": None, "position": None,
            "realized": 0.0, "wins": 0, "losses": 0, "started_at": None,
            "message": None, "demo": False, "execute": "manual",
        }

    # ---- control ----
    def start(self, cfg):
        with self.lock:
            if self.state["running"]:
                return {"ok": False, "error": "already running"}
        # resolve allow-list override
        if cfg.get("allow"):
            syms = cfg["allow"] if isinstance(cfg["allow"], list) else str(cfg["allow"]).split(",")
            instruments.ALLOWED = {s.strip().upper() for s in syms if s.strip()}
        symbol = cfg.get("symbol", "MES")
        demo = bool(cfg.get("demo"))
        spec = instruments.get_spec(symbol, demo=demo)
        if spec is None:
            return {"ok": False, "error": f"unknown symbol '{symbol}'"}
        if not instruments.is_allowed(symbol, demo=demo):
            return {"ok": False, "error": f"'{symbol}' is not allowed. Add it in the "
                    f"Allowed field (only if Lucid permits it)."}
        source = cfg.get("data_source", "csv")
        if source == "coinbase" and not demo:
            return {"ok": False, "error": "coinbase feed is crypto — tick the Demo box to use it."}
        self.alerts = []
        self.stop_flag = False
        self.thread = threading.Thread(target=self._run, args=(cfg, spec, symbol, demo, source),
                                       daemon=True)
        self.thread.start()
        return {"ok": True}

    def stop(self):
        self.stop_flag = True
        return {"ok": True}

    def status(self):
        with self.lock:
            return {"state": dict(self.state), "alerts": list(self.alerts[-50:])}

    # ---- the loop ----
    def _run(self, cfg, spec, symbol, demo, source):
        contracts = int(cfg.get("contracts", 1))
        stop_atr = float(cfg.get("stop_atr", 1.5))
        target_atr = float(cfg.get("target_atr", 2.0))
        max_daily_loss = float(cfg.get("max_daily_loss", 0) or 0)
        csv_file = cfg.get("csv_file", "bars.csv")
        granularity = int(cfg.get("granularity", 60))
        data_dir = cfg.get("data_dir", "data")
        last_days = int(cfg.get("last_days", 0) or 0)
        engine_choice = cfg.get("engine", "ema_rsi")

        notifier = bot.notify.Notifier(
            use_desktop=bool(cfg.get("desktop")),
            ntfy_topic=cfg.get("ntfy_topic") or None,
            webhook_url=cfg.get("webhook_url") or None)

        # pick engine (auto = rank recorded days)
        engine_key = engine_choice
        if engine_choice == "auto":
            key, best, ndays = compare.pick_best(data_dir, symbol, spec, contracts,
                                                 stop_atr, target_atr, last_days)
            if key is None:
                self._set(message=(f"Auto: nothing profitable over {ndays} day(s) — "
                                   f"not trading. Record more days first."))
                return
            engine_key = key
            self._set(message=f"Auto-selected {key} (best over {ndays} days, net ${best['net']:+,.0f})")
        engine = (bot.LLMEngine(model=cfg.get("model", "claude-haiku-4-5-20251001"))
                  if engine_key == "llm" else strategies.build(engine_key))

        acct = bot.PaperAccount(spec, contracts, stop_atr, target_atr,
                                cfg.get("log", "trades.csv"))
        poll = max(granularity, 15) if source == "coinbase" else max(float(cfg.get("poll", 5)), 1)

        # Optional auto-execution via TradersPost (OFF unless execute == "auto").
        auto_exec = str(cfg.get("execute", "manual")).lower() == "auto"
        tp_ticker = cfg.get("traderspost_symbol") or symbol
        executor = traderspost.Executor(cfg.get("traderspost_url"), tp_ticker, auto_exec)
        session_end = cfg.get("session_end", "16:45")

        with self.lock:
            self.state.update(running=True, symbol=symbol, engine=getattr(engine, "label", engine_key),
                              contracts=contracts, demo=demo, execute=("auto" if executor.enabled else "manual"),
                              started_at=datetime.now().strftime("%H:%M:%S"))
        if executor.enabled:
            print("*** AUTO-EXECUTION ON: real orders will be sent to TradersPost. ***")

        def emit(kind, side, price, **kw):
            ev = {"time": datetime.now().strftime("%H:%M:%S"), "kind": kind,
                  "side": side, "price": price, "symbol": symbol,
                  "contracts": contracts}
            if kind == "ENTRY":
                ev["stop"] = kw.get("stop")
                ev["target"] = kw.get("target")
                ev["reason"] = kw.get("reason", "")
                ev["risk_ticks"] = instruments.ticks_between(spec, price, kw["stop"])
                ev["reward_ticks"] = instruments.ticks_between(spec, price, kw["target"])
                ev["risk_usd"] = instruments.dollars(spec, abs(price - kw["stop"]), contracts)
                ev["reward_usd"] = instruments.dollars(spec, abs(price - kw["target"]), contracts)
            else:
                ev["reason"] = kw.get("reason", "")
                ev["pnl"] = kw.get("pnl")
            with self.lock:
                self.alerts.append(ev)
            # also fire desktop/phone/webhook via the shared notifier
            if notifier.any_enabled:
                if kind == "ENTRY":
                    notifier.send(f"{side} {contracts}x {symbol} @ {price:,.4f}",
                                  f"stop {kw['stop']:,.4f} | target {kw['target']:,.4f}", urgent=True)
                else:
                    notifier.send(f"CLOSE {side} {contracts}x {symbol} ({kw.get('pnl',0):+,.2f})",
                                  f"exit @ {price:,.4f} — {kw.get('reason','')}", urgent=True)
            # auto-execution: place/flatten in the real account via TradersPost
            if executor.enabled:
                if kind == "ENTRY":
                    executor.entry(side, contracts, price, kw.get("stop"), kw.get("target"))
                # stop/target exits are handled by the broker-side bracket sent on
                # entry; only send an exit for discretionary closes (reversal/session)
                elif kw.get("reason") not in ("stop hit", "target hit"):
                    executor.exit()

        last_bar = None
        day = datetime.now(timezone.utc).date()
        dl_halt = False   # daily-loss halt (persists through the day)
        while not self.stop_flag:
            try:
                if source == "coinbase":
                    candles = bot.fetch_coinbase(symbol, granularity)
                else:
                    candles = bot.read_csv_bars(csv_file)
            except (urllib.error.URLError, ValueError, TimeoutError, OSError) as e:
                self._set(message=f"feed error: {e} — retrying")
                time.sleep(poll)
                continue
            if len(candles) < 2:
                self._set(message=f"waiting for bars in {csv_file} ..." if source == "csv" else "waiting...")
                time.sleep(poll)
                continue

            closed = candles[:-1] if source == "coinbase" else candles
            newest = closed[-1]

            today = datetime.now(timezone.utc).date()
            if today != day:
                day, dl_halt = today, False
                if engine_choice == "auto" and not acct.position:
                    key, best, ndays = compare.pick_best(data_dir, symbol, spec, contracts,
                                                         stop_atr, target_atr, last_days)
                    if key and key != engine_key:
                        engine, engine_key = strategies.build(key), key
                        self._set(message=f"Auto-reselect: now {key} (net ${best['net']:+,.0f})")

            if newest["time"] != last_bar:
                last_bar = newest["time"]

                # Lucid session guard: flatten by the cutoff / on weekends, and
                # block new entries outside the session (transient, per-bar).
                session_block = False
                if session_guard.must_flatten(session_end):
                    if acct.position:
                        side = acct.position["side"]
                        pnl = acct.close(newest["close"], "session end")
                        emit("EXIT", side, newest["close"], reason="session end", pnl=pnl)
                    session_block = True
                elif not session_guard.can_open(session_end):
                    session_block = True

                # daily-loss halt (persists through the day)
                was_halted = dl_halt
                if max_daily_loss > 0 and acct.realized <= -abs(max_daily_loss):
                    dl_halt = True

                decision, why, _ = bot.process_bar(
                    acct, engine, closed, symbol, spec, contracts,
                    dl_halt or session_block, max_daily_loss, emit)
                pos = None
                if acct.position:
                    pos = {"side": acct.position["side"], "entry": acct.position["entry"],
                           "stop": acct.position["stop"], "target": acct.position["target"]}
                msg = None
                if dl_halt and not was_halted:
                    msg = "daily loss limit hit — paused for the day"
                elif session_block:
                    msg = "outside trading session — flat until next session"
                with self.lock:
                    self.state.update(
                        price=newest["close"], decision=decision, reason=why, position=pos,
                        realized=acct.realized, wins=acct.wins, losses=acct.losses,
                        engine=getattr(engine, "label", engine_key),
                        message=(msg if msg else self.state["message"]))
            time.sleep(poll)

        with self.lock:
            self.state["running"] = False
            self.state["message"] = "stopped"

    def _set(self, **kw):
        with self.lock:
            self.state.update(kw)


RUNNER = BotRunner()


# --------------------------------------------------------------------------
# HTTP handlers
# --------------------------------------------------------------------------

class Handler(BaseHTTPRequestHandler):
    def log_message(self, *a):
        pass  # quiet

    def _json(self, obj, code=200):
        body = json.dumps(obj).encode()
        self.send_response(code)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def _read_json(self):
        n = int(self.headers.get("Content-Length", 0))
        if not n:
            return {}
        try:
            return json.loads(self.rfile.read(n).decode())
        except ValueError:
            return {}

    def _authed(self):
        """When a token is configured, require it (query ?token= or X-Token)."""
        if not TOKEN:
            return True
        if self.headers.get("X-Token") == TOKEN:
            return True
        q = parse_qs(urlparse(self.path).query)
        return q.get("token", [None])[0] == TOKEN

    def do_GET(self):
        if not self._authed():
            return self.send_error(401, "missing or bad token")
        route = urlparse(self.path).path
        if route in ("/", "/index.html"):
            return self._serve_file("index.html", "text/html; charset=utf-8")
        self.path = route  # strip query for the checks below
        if self.path in ("/", "/index.html"):
            return self._serve_file("index.html", "text/html; charset=utf-8")
        if self.path == "/api/meta":
            return self._json({
                "instruments": [
                    {"symbol": s, "name": instruments.FUTURES[s]["name"],
                     "allowed": s in instruments.ALLOWED}
                    for s in sorted(instruments.FUTURES)],
                "allowed": sorted(instruments.ALLOWED),
                "strategies": [{"key": k, "label": strategies.REGISTRY[k].label}
                               for k in strategies.REGISTRY] +
                              [{"key": "auto", "label": "Auto (best-ranked)"}],
            })
        if self.path == "/api/status":
            return self._json(RUNNER.status())
        self.send_error(404)

    def do_POST(self):
        if not self._authed():
            return self.send_error(401, "missing or bad token")
        self.path = urlparse(self.path).path
        cfg = self._read_json()
        try:
            if self.path == "/api/start":
                return self._json(RUNNER.start(cfg))
            if self.path == "/api/stop":
                return self._json(RUNNER.stop())
            if self.path == "/api/backtest":
                return self._json(self._backtest(cfg))
            if self.path == "/api/compare":
                return self._json(self._compare(cfg))
        except Exception as e:  # never crash the server on a bad request
            return self._json({"ok": False, "error": str(e)}, code=400)
        self.send_error(404)

    # ---- tool endpoints ----
    def _spec_for(self, cfg):
        if cfg.get("allow"):
            syms = cfg["allow"] if isinstance(cfg["allow"], list) else str(cfg["allow"]).split(",")
            instruments.ALLOWED = {s.strip().upper() for s in syms if s.strip()}
        symbol = cfg.get("symbol", "MES")
        spec = instruments.get_spec(symbol, demo=bool(cfg.get("demo")))
        return symbol, spec

    def _backtest(self, cfg):
        symbol, spec = self._spec_for(cfg)
        if spec is None:
            return {"ok": False, "error": f"unknown symbol '{symbol}'"}
        candles = bot.read_csv_bars(cfg.get("csv_file", "bars.csv"))
        if len(candles) < 30:
            return {"ok": False, "error": "need a bar file with >=30 bars"}
        contracts = int(cfg.get("contracts", 1))
        key = cfg.get("engine", "ema_rsi")
        if key in ("auto", "llm"):
            key = "ema_rsi"
        pnls = compare.run_day(candles, key, spec, contracts,
                               float(cfg.get("stop_atr", 1.5)), float(cfg.get("target_atr", 2.0)))
        s = compare.stats_for(pnls, [sum(pnls)])
        s["ok"] = True
        s["engine"] = strategies.REGISTRY[key].label
        return s

    def _compare(self, cfg):
        symbol, spec = self._spec_for(cfg)
        if spec is None:
            return {"ok": False, "error": f"unknown symbol '{symbol}'"}
        contracts = int(cfg.get("contracts", 1))
        stop_atr = float(cfg.get("stop_atr", 1.5))
        target_atr = float(cfg.get("target_atr", 2.0))
        days, files = compare.gather_days(cfg.get("data_dir", "data"), symbol,
                                          int(cfg.get("last_days", 0) or 0))
        if not days:
            return {"ok": False, "error": f"no usable day files in {cfg.get('data_dir','data')}/"}
        results, ranked = compare.rank(days, spec, contracts, stop_atr, target_atr)
        rows = [{"key": k, "label": strategies.REGISTRY[k].label, **v} for k, v in ranked]
        best_key, best = ranked[0]
        rec = None
        if best["net"] > 0:
            rec = {"key": best_key, "label": strategies.REGISTRY[best_key].label,
                   "net": best["net"], "days_green": best["days_green"], "days": best["days"],
                   "win_rate": best["win_rate"], "ci_lo": best["ci_lo"], "ci_hi": best["ci_hi"]}
        return {"ok": True, "days": len(days), "rows": rows, "recommendation": rec}

    def _serve_file(self, name, ctype):
        path = os.path.join(HERE, "webapp", name)
        try:
            with open(path, "rb") as f:
                body = f.read()
        except OSError:
            return self.send_error(404)
        self.send_response(200)
        self.send_header("Content-Type", ctype)
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)


def main():
    global HOST, PORT, TOKEN
    ap = argparse.ArgumentParser(description="Paper trading bot — browser app.")
    ap.add_argument("--host", default=None,
                    help="interface to bind (default 127.0.0.1 = this PC only; "
                         "use 0.0.0.0 to reach it from your phone over Tailscale/LAN)")
    ap.add_argument("--port", type=int, default=None)
    ap.add_argument("--token", default=None,
                    help="require this secret to access the app (recommended when host is not localhost)")
    ap.add_argument("--autostart", action="store_true",
                    help="start trading immediately using config.json (no need to press Start)")
    ap.add_argument("--config", default="config.json")
    args = ap.parse_args()

    cfg = bot.load_config(args.config)
    HOST = args.host or cfg.get("host") or "127.0.0.1"
    PORT = args.port or int(cfg.get("port") or 8787)
    TOKEN = args.token or cfg.get("token") or None
    autostart = args.autostart or bool(cfg.get("autostart"))

    server = ThreadingHTTPServer((HOST, PORT), Handler)
    shown = "127.0.0.1" if HOST in ("127.0.0.1", "localhost") else HOST
    suffix = f"?token={TOKEN}" if TOKEN else ""
    url = f"http://{shown}:{PORT}/{suffix}"
    print("=" * 64)
    print("  PAPER TRADING BOT — app")
    print(f"  Open:  {url}")
    if HOST in ("127.0.0.1", "localhost"):
        print("  (this PC only — add --host 0.0.0.0 to reach it from your phone)")
    else:
        print(f"  Reachable from other devices on this host/IP: {HOST}")
        if not TOKEN:
            print("  WARNING: no --token set. Anyone who can reach this address can")
            print("           control the app. Set --token, or use Tailscale so only")
            print("           your own devices can connect.")
    if autostart:
        r = RUNNER.start(cfg)
        print(f"  Autostart: {'trading started from config.json' if r.get('ok') else r.get('error')}")
    print("  FAKE money. Mirror trades in Lucid by hand, at your own risk.")
    print("  Press Ctrl+C here to quit.")
    print("=" * 64)
    if HOST in ("127.0.0.1", "localhost"):
        try:
            webbrowser.open(url)
        except Exception:
            pass
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nShutting down.")
        server.shutdown()


if __name__ == "__main__":
    main()
