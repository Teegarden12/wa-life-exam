"""
Strategy registry.

Each strategy exposes decide(candles) -> (signal, reason, atr_value) where
signal is "LONG" | "SHORT" | "FLAT". All return the current ATR so the account
can size stops/targets consistently.

These are transparent, well-known approaches — none has a proven edge. They
exist so you can BACKTEST several ideas against the same days and compare, not
because any is guaranteed to work. Add your own by writing a class with a
decide() method and registering it in REGISTRY at the bottom.
"""

import indicators as ind


def _atr_last(candles, period=14):
    a = ind.atr(candles, period)
    return a[-1] if a and a[-1] is not None else None


class EmaRsi:
    """Trend-follow: fast/slow EMA cross, filtered by RSI."""
    key = "ema_rsi"
    label = "EMA cross + RSI"

    def __init__(self, ema_fast=9, ema_slow=21, rsi_period=14, atr_period=14):
        self.ef, self.es, self.rp, self.ap = ema_fast, ema_slow, rsi_period, atr_period

    def decide(self, candles):
        closes = [c["close"] for c in candles]
        if len(closes) < max(self.es, self.rp, self.ap) + 2:
            return "FLAT", "warming up", None
        f = ind.ema(closes, self.ef)[-1]
        s = ind.ema(closes, self.es)[-1]
        rr = ind.rsi(closes, self.rp)[-1]
        aa = _atr_last(candles, self.ap)
        if rr is None or aa is None:
            return "FLAT", "warming up", None
        if f > s and rr < 68:
            return "LONG", f"EMA{self.ef}>{self.es}, RSI {rr:.0f}", aa
        if f < s and rr > 32:
            return "SHORT", f"EMA{self.ef}<{self.es}, RSI {rr:.0f}", aa
        return "FLAT", f"no edge (RSI {rr:.0f})", aa


class ORB:
    """Opening-Range Breakout: break of the first N bars' high/low.

    Assumes each bar file starts at the session open (which is how the capture
    /backtest files are organized — one file per day).
    """
    key = "orb"
    label = "Opening-Range Breakout"

    def __init__(self, open_bars=6, atr_period=14):
        self.open_bars, self.ap = open_bars, atr_period

    def decide(self, candles):
        if len(candles) < self.open_bars + 2:
            return "FLAT", "building opening range", None
        opening = candles[:self.open_bars]
        or_high = max(c["high"] for c in opening)
        or_low = min(c["low"] for c in opening)
        price = candles[-1]["close"]
        aa = _atr_last(candles, self.ap)
        if aa is None:
            return "FLAT", "warming up", None
        if price > or_high:
            return "LONG", f"break OR high {or_high:.2f}", aa
        if price < or_low:
            return "SHORT", f"break OR low {or_low:.2f}", aa
        return "FLAT", "inside opening range", aa


class VwapRevert:
    """Mean-reversion: fade price when it stretches far from session VWAP."""
    key = "vwap_revert"
    label = "VWAP mean-reversion"

    def __init__(self, k=1.5, atr_period=14):
        self.k, self.ap = k, atr_period

    def decide(self, candles):
        if len(candles) < self.ap + 2:
            return "FLAT", "warming up", None
        aa = _atr_last(candles, self.ap)
        if aa is None:
            return "FLAT", "warming up", None
        vw = ind.vwap(candles)
        price = candles[-1]["close"]
        dev = price - vw
        if dev > self.k * aa:
            return "SHORT", f"{dev/aa:.1f} ATR above VWAP", aa
        if dev < -self.k * aa:
            return "LONG", f"{-dev/aa:.1f} ATR below VWAP", aa
        return "FLAT", "near VWAP", aa


class Donchian:
    """Breakout: new high/low of the last N bars."""
    key = "donchian"
    label = "Donchian breakout"

    def __init__(self, lookback=20, atr_period=14):
        self.lb, self.ap = lookback, atr_period

    def decide(self, candles):
        if len(candles) < self.lb + 2:
            return "FLAT", "warming up", None
        window = candles[-self.lb - 1:-1]  # exclude current bar
        hh = max(c["high"] for c in window)
        ll = min(c["low"] for c in window)
        price = candles[-1]["close"]
        aa = _atr_last(candles, self.ap)
        if aa is None:
            return "FLAT", "warming up", None
        if price >= hh:
            return "LONG", f"{self.lb}-bar high break", aa
        if price <= ll:
            return "SHORT", f"{self.lb}-bar low break", aa
        return "FLAT", "inside channel", aa


class FairValueGap:
    """Fair-value gap (FVG / imbalance): a 3-bar gap where price skipped a zone.

    Bullish FVG: bar i's low is above bar i-2's high — an unfilled gap up. When
    price pulls back INTO that zone (fair value), trade in the gap's direction.
    Bearish FVG is the mirror. Only the most recent gap in the scan window is
    used.
    """
    key = "fair_value"
    label = "Fair-value gap (FVG)"

    def __init__(self, scan=10, atr_period=14):
        self.scan, self.ap = scan, atr_period

    def decide(self, candles):
        if len(candles) < max(self.scan, self.ap) + 3:
            return "FLAT", "warming up", None
        aa = _atr_last(candles, self.ap)
        if aa is None:
            return "FLAT", "warming up", None
        price = candles[-1]["close"]
        last = len(candles) - 1
        for i in range(last, 1, -1):
            if last - i > self.scan:
                break
            hi2, lo2 = candles[i - 2]["high"], candles[i - 2]["low"]
            hi0, lo0 = candles[i]["high"], candles[i]["low"]
            if lo0 > hi2:  # bullish FVG, zone [hi2, lo0]
                if hi2 <= price <= lo0:
                    return "LONG", f"bullish FVG {hi2:.2f}-{lo0:.2f}", aa
                break
            if hi0 < lo2:  # bearish FVG, zone [hi0, lo2]
                if hi0 <= price <= lo2:
                    return "SHORT", f"bearish FVG {hi0:.2f}-{lo2:.2f}", aa
                break
        return "FLAT", "no FVG in zone", aa


class SupportResistance:
    """Support/Resistance bounce: fade the edges of the recent range.

    Support = lowest low over the lookback, resistance = highest high. When price
    comes within `near` x ATR of a level, trade the bounce back into the range.
    (This fades the level; Donchian instead trades the break of it.)
    """
    key = "support_resistance"
    label = "Support/Resistance bounce"

    def __init__(self, lookback=30, near=0.5, atr_period=14):
        self.lb, self.near, self.ap = lookback, near, atr_period

    def decide(self, candles):
        if len(candles) < max(self.lb, self.ap) + 2:
            return "FLAT", "warming up", None
        aa = _atr_last(candles, self.ap)
        if aa is None:
            return "FLAT", "warming up", None
        window = candles[-self.lb - 1:-1]  # exclude current bar
        support = min(c["low"] for c in window)
        resistance = max(c["high"] for c in window)
        price = candles[-1]["close"]
        tol = self.near * aa
        if abs(price - support) <= tol:
            return "LONG", f"bounce support {support:.2f}", aa
        if abs(price - resistance) <= tol:
            return "SHORT", f"reject resistance {resistance:.2f}", aa
        return "FLAT", "mid-range", aa


REGISTRY = {
    EmaRsi.key: EmaRsi,
    ORB.key: ORB,
    FairValueGap.key: FairValueGap,
    SupportResistance.key: SupportResistance,
    VwapRevert.key: VwapRevert,
    Donchian.key: Donchian,
}


def build(key):
    if key not in REGISTRY:
        raise KeyError(key)
    return REGISTRY[key]()
