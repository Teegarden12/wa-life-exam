"""
Trading-session guard for Lucid's rules: be flat by a cutoff time (default
4:45 PM ET) and don't trade weekends. Used so auto-execution can't leave a
position open overnight or over the weekend (a permanent-ban risk on Lucid).
"""

from datetime import datetime


def now_et():
    """Current time in US Eastern (Lucid's clock). Falls back to local time if
    the timezone database isn't available."""
    try:
        from zoneinfo import ZoneInfo
        return datetime.now(ZoneInfo("America/New_York"))
    except Exception:
        return datetime.now()  # naive local fallback (set session-end accordingly)


def parse_hhmm(s, default=(16, 45)):
    try:
        hh, mm = str(s).split(":")
        return int(hh), int(mm)
    except (ValueError, AttributeError):
        return default


def can_open(session_end="16:45", now=None):
    """True if it's OK to OPEN a new trade now: a weekday, before the cutoff."""
    t = now or now_et()
    if t.weekday() >= 5:            # 5=Sat, 6=Sun
        return False
    hh, mm = parse_hhmm(session_end)
    return (t.hour, t.minute) < (hh, mm)


def must_flatten(session_end="16:45", now=None):
    """True if any open position should be closed now (cutoff reached, or weekend)."""
    t = now or now_et()
    if t.weekday() >= 5:
        return True
    hh, mm = parse_hhmm(session_end)
    return (t.hour, t.minute) >= (hh, mm)
