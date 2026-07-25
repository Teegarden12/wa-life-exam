"""
Settings + secrets storage for the app's "Connect account" page.

Non-secret settings are saved to config.json (so autostart/headless runs pick
them up too). Sensitive values (Tradovate password/secret) go to secrets.json,
which is git-ignored, chmod 600, and NEVER sent back to the browser — the API
only reports whether each secret is set.

Everything stays on the machine running the app. Nothing is sent anywhere except
the broker/TradersPost endpoints you configure.
"""

import json
import os

BASE = os.path.dirname(os.path.abspath(__file__))
CONFIG = os.path.join(BASE, "config.json")
SECRETS = os.path.join(BASE, "secrets.json")

# keys treated as secrets: stored write-only, never returned to the browser
SECRET_KEYS = {
    "tradovate_username", "tradovate_password", "tradovate_cid", "tradovate_secret",
}


def _read(path):
    try:
        with open(path) as f:
            raw = json.load(f)
        return {str(k).replace("-", "_"): v for k, v in raw.items()}
    except (OSError, ValueError):
        return {}


def load_config_dict():
    return _read(CONFIG)


def load_secrets():
    return _read(SECRETS)


def public_settings():
    """Settings safe to show the browser: config values, plus a *_set boolean for
    each secret (never the secret itself)."""
    cfg = load_config_dict()
    sec = load_secrets()
    view = {k: v for k, v in cfg.items() if not k.startswith("_")}
    for k in SECRET_KEYS:
        view.pop(k, None)
        view[k + "_set"] = bool(sec.get(k))
    return view


def save(incoming):
    """Merge incoming settings. Secrets go to secrets.json (skipped if blank so a
    save doesn't wipe an existing one); everything else to config.json."""
    cfg = load_config_dict()
    sec = load_secrets()
    for raw_k, v in incoming.items():
        k = str(raw_k).replace("-", "_")
        if k in SECRET_KEYS:
            if v:  # only set when a non-empty value is provided
                sec[k] = v
        elif not k.endswith("_set"):
            cfg[k] = v
    with open(CONFIG, "w") as f:
        json.dump(cfg, f, indent=2)
    if sec:
        with open(SECRETS, "w") as f:
            json.dump(sec, f, indent=2)
        try:
            os.chmod(SECRETS, 0o600)
        except OSError:
            pass
    return public_settings()
