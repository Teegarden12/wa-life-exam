"""Shared technical indicators (pure Python, no numpy)."""


def ema(values, period):
    if not values:
        return []
    k = 2.0 / (period + 1)
    out = [values[0]]
    for v in values[1:]:
        out.append(v * k + out[-1] * (1 - k))
    return out


def rsi(closes, period=14):
    if len(closes) <= period:
        return [None] * len(closes)
    gains, losses = [], []
    for i in range(1, len(closes)):
        change = closes[i] - closes[i - 1]
        gains.append(max(change, 0.0))
        losses.append(max(-change, 0.0))
    avg_gain = sum(gains[:period]) / period
    avg_loss = sum(losses[:period]) / period
    out = [None] * (period + 1)
    for i in range(period, len(gains)):
        if i > period:
            avg_gain = (avg_gain * (period - 1) + gains[i]) / period
            avg_loss = (avg_loss * (period - 1) + losses[i]) / period
        out.append(100.0 if avg_loss == 0 else 100.0 - (100.0 / (1 + avg_gain / avg_loss)))
    while len(out) < len(closes):
        out.append(out[-1])
    return out


def atr(candles, period=14):
    if len(candles) <= period:
        return [None] * len(candles)
    trs = [candles[0]["high"] - candles[0]["low"]]
    for i in range(1, len(candles)):
        h, l = candles[i]["high"], candles[i]["low"]
        pc = candles[i - 1]["close"]
        trs.append(max(h - l, abs(h - pc), abs(l - pc)))
    out = [None] * (period - 1)
    prev = sum(trs[:period]) / period
    out.append(prev)
    for i in range(period, len(trs)):
        prev = (prev * (period - 1) + trs[i]) / period
        out.append(prev)
    return out


def vwap(candles):
    """Session VWAP over the whole candle list (cumulative). Returns last value."""
    cum_pv = cum_v = 0.0
    for c in candles:
        typical = (c["high"] + c["low"] + c["close"]) / 3.0
        vol = c["volume"] or 1.0  # guard against 0-volume bars
        cum_pv += typical * vol
        cum_v += vol
    return cum_pv / cum_v if cum_v else candles[-1]["close"]
