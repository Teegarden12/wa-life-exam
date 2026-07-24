"""
Tradable-instrument definitions.

The bot will ONLY trade symbols listed in ALLOWED below. This is the mechanism
that keeps it to "what Lucid allows" — since you'll be mirroring every trade in
your Lucid account, the bot must never signal something you can't trade there.

IMPORTANT: The list below is a sensible starting point of common CME futures,
NOT an authoritative statement of what YOUR Lucid account permits. Prop firms
differ by plan, and some restrict specific products, news events, or overnight
holds. Open your Lucid account rules and edit ALLOWED so it matches exactly the
instruments you're actually cleared to trade. If it's not in ALLOWED, the bot
won't touch it.

Contract specs (tick size / tick value) are standard CME figures and are used
to report every stop and target in ticks and dollars — the units you use in
Lucid — instead of raw price only.
"""

# symbol -> spec. tick_value is the $ P&L per one tick per one contract.
FUTURES = {
    # Equity index — minis
    "ES":  {"name": "E-mini S&P 500",     "tick_size": 0.25, "tick_value": 12.50},
    "NQ":  {"name": "E-mini Nasdaq 100",  "tick_size": 0.25, "tick_value": 5.00},
    "YM":  {"name": "E-mini Dow",         "tick_size": 1.0,  "tick_value": 5.00},
    "RTY": {"name": "E-mini Russell 2000","tick_size": 0.10, "tick_value": 5.00},
    # Equity index — micros (cheapest; best for testing / small accounts)
    "MES": {"name": "Micro E-mini S&P 500",     "tick_size": 0.25, "tick_value": 1.25},
    "MNQ": {"name": "Micro E-mini Nasdaq 100",  "tick_size": 0.25, "tick_value": 0.50},
    "MYM": {"name": "Micro E-mini Dow",         "tick_size": 1.0,  "tick_value": 0.50},
    "M2K": {"name": "Micro E-mini Russell 2000","tick_size": 0.10, "tick_value": 0.50},
    # Energy
    "CL":  {"name": "Crude Oil",        "tick_size": 0.01, "tick_value": 10.00},
    "MCL": {"name": "Micro Crude Oil",  "tick_size": 0.01, "tick_value": 1.00},
    # Metals
    "GC":  {"name": "Gold",       "tick_size": 0.10, "tick_value": 10.00},
    "MGC": {"name": "Micro Gold", "tick_size": 0.10, "tick_value": 1.00},
}

# ---------------------------------------------------------------------------
# EDIT THIS to match what your Lucid account actually permits.
# The bot will refuse to trade any symbol not in this set.
# ---------------------------------------------------------------------------
ALLOWED = {"MES", "MNQ"}

# A non-tradable demo feed (crypto) so you can watch the mechanics run 24/7.
# It is deliberately NOT in ALLOWED and is only usable with the --demo flag,
# because you cannot mirror it in a Lucid futures account.
DEMO = {
    "BTC-USD": {"name": "Bitcoin (DEMO ONLY)", "tick_size": 1.0, "tick_value": 1.0},
    "ETH-USD": {"name": "Ether (DEMO ONLY)",   "tick_size": 0.1, "tick_value": 1.0},
}


def get_spec(symbol, demo=False):
    if demo:
        return DEMO.get(symbol)
    return FUTURES.get(symbol)


def is_allowed(symbol, demo=False):
    """True if the bot is permitted to trade this symbol."""
    if demo:
        return symbol in DEMO
    return symbol in ALLOWED and symbol in FUTURES


def snap(spec, price):
    """Round a price to the instrument's tick grid (a real, placeable price)."""
    ticks = round(price / spec["tick_size"])
    return round(ticks * spec["tick_size"], 10)


def ticks_between(spec, price_a, price_b):
    """Number of ticks between two prices (rounded)."""
    return round(abs(price_a - price_b) / spec["tick_size"])


def dollars(spec, price_diff, contracts):
    """Signed $ P&L for a price move, given contract count."""
    return (price_diff / spec["tick_size"]) * spec["tick_value"] * contracts
