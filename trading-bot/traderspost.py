#!/usr/bin/env python3
"""
Optional auto-execution via TradersPost.

Lucid Trading permits automated trading through TradersPost, which places orders
in your Lucid/Tradovate account from a webhook. When (and ONLY when) you turn
this on, the bot sends a TradersPost "signal" on each entry/exit so trades happen
hands-free.

This is OFF by default. Manual mirror (signals to your phone) stays the default
so you approve every trade. Turn this on only after you've watched the bot on
paper and you accept that real money will move with no human in the loop.

Could not be tested against TradersPost from where it was written — validate the
webhook format with a TradersPost test signal before trusting it with real money.

Standard library only.
"""

import json
import urllib.error
import urllib.request
from datetime import datetime


def entry_signal(ticker, side, quantity, price=None, stop=None, target=None):
    """Build a TradersPost entry signal. Includes a protective stop bracket so a
    position is still protected if the bot/server disconnects."""
    payload = {
        "ticker": ticker,
        "action": "buy" if side == "LONG" else "sell",
        "quantity": quantity,
        "time_in_force": "day",
    }
    if price is not None:
        payload["price"] = round(price, 2)
    if stop is not None:
        payload["stopLoss"] = {"type": "stop", "stopPrice": round(stop, 2)}
    if target is not None:
        payload["takeProfit"] = {"limitPrice": round(target, 2)}
    return payload


def exit_signal(ticker):
    """Flatten the position for this ticker."""
    return {"ticker": ticker, "action": "exit"}


def test_connection(url, ticker):
    """Fire a harmless 'exit' (flatten) signal to check the webhook link.

    With no open position an exit is a no-op at the broker, so this is safe to
    run before going live. Returns {ok, detail}.
    """
    if not url:
        return {"ok": False, "detail": "No TradersPost webhook URL set."}
    try:
        status = _post(url, exit_signal(ticker or "TEST"))
        if 200 <= status < 300:
            return {"ok": True, "detail": f"TradersPost accepted the test (HTTP {status})."}
        return {"ok": False, "detail": f"Endpoint reached but returned HTTP {status}."}
    except urllib.error.HTTPError as e:
        return {"ok": False,
                "detail": f"Endpoint reached but rejected it (HTTP {e.code}). "
                          f"Check the URL and that your broker is connected in TradersPost."}
    except (urllib.error.URLError, OSError) as e:
        reason = getattr(e, "reason", e)
        return {"ok": False, "detail": f"Could not reach the webhook: {reason}"}


def _post(url, payload, timeout=10):
    data = json.dumps(payload).encode()
    req = urllib.request.Request(url, data=data, method="POST",
                                 headers={"content-type": "application/json"})
    with urllib.request.urlopen(req, timeout=timeout) as r:
        return r.status


class Executor:
    """Sends signals to TradersPost when enabled; a no-op otherwise."""

    def __init__(self, url, ticker, enabled):
        self.url = url
        self.ticker = ticker
        self.enabled = bool(enabled and url)

    def entry(self, side, quantity, price, stop, target):
        if not self.enabled:
            return
        self._send(entry_signal(self.ticker, side, quantity, price, stop, target),
                   f"ENTRY {side} {quantity} {self.ticker}")

    def exit(self):
        if not self.enabled:
            return
        self._send(exit_signal(self.ticker), f"EXIT {self.ticker}")

    def _send(self, payload, label):
        try:
            _post(self.url, payload)
            print(f"[{datetime.now():%H:%M:%S}] TradersPost -> {label}")
        except (urllib.error.URLError, OSError) as e:
            print(f"[{datetime.now():%H:%M:%S}] TradersPost send FAILED ({label}): {e}")


def selftest():
    e = entry_signal("MESU2025", "LONG", 2, price=5043.0, stop=5039.75, target=5047.25)
    assert e["action"] == "buy" and e["quantity"] == 2
    assert e["stopLoss"]["stopPrice"] == 5039.75 and e["takeProfit"]["limitPrice"] == 5047.25
    s = entry_signal("MESU2025", "SHORT", 1)
    assert s["action"] == "sell" and "stopLoss" not in s
    x = exit_signal("MESU2025")
    assert x["action"] == "exit"
    # disabled executor never raises / never sends
    Executor(None, "MES", False).entry("LONG", 1, 1, 1, 1)
    print("traderspost selftest OK")


if __name__ == "__main__":
    selftest()
