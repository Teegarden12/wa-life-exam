"""
Notifications: get alerts off the terminal and onto your screen or phone.

Three independent, optional channels — turn on whichever you want:
  * desktop    — a native pop-up on the machine running the bot
  * ntfy topic — free phone push via the ntfy.sh app (no account needed)
  * webhook    — POST JSON to any URL (Discord, Slack, your own service)

All are best-effort: if a channel fails, the bot logs a line and keeps running.
The terminal bell/alert always fires regardless.
"""

import json
import platform
import shutil
import subprocess
import urllib.request
import urllib.error


def desktop(title, body):
    """Best-effort native desktop notification, per OS."""
    system = platform.system()
    try:
        if system == "Darwin":  # macOS
            script = f'display notification {json.dumps(body)} with title {json.dumps(title)} sound name "Glass"'
            subprocess.run(["osascript", "-e", script], check=False,
                           capture_output=True, timeout=5)
        elif system == "Linux":
            if shutil.which("notify-send"):
                subprocess.run(["notify-send", title, body], check=False,
                               capture_output=True, timeout=5)
        elif system == "Windows":
            # PowerShell balloon tip — works on stock Windows, no extra modules.
            ps = (
                "[reflection.assembly]::loadwithpartialname('System.Windows.Forms')|Out-Null;"
                "$n=New-Object System.Windows.Forms.NotifyIcon;"
                "$n.Icon=[System.Drawing.SystemIcons]::Information;"
                "$n.Visible=$true;"
                f"$n.ShowBalloonTip(8000,{json.dumps(title)},{json.dumps(body)},"
                "[System.Windows.Forms.ToolTipIcon]::Info);Start-Sleep -Seconds 9;$n.Dispose()"
            )
            subprocess.Popen(["powershell", "-NoProfile", "-Command", ps],
                             stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    except (OSError, subprocess.SubprocessError) as e:
        print(f"  (desktop notify failed: {e})")


def ntfy(topic, title, body, priority="default", tags=""):
    """Push to a phone via https://ntfy.sh/<topic>.

    Install the free 'ntfy' app, subscribe to your chosen topic name, then pass
    --ntfy-topic <topic>. Pick a long, unguessable topic name — anyone who knows
    it can read your alerts.
    """
    url = f"https://ntfy.sh/{topic}"
    headers = {"Title": title, "Priority": priority}
    if tags:
        headers["Tags"] = tags
    req = urllib.request.Request(url, data=body.encode(), method="POST", headers=headers)
    try:
        urllib.request.urlopen(req, timeout=8).close()
    except (urllib.error.URLError, OSError) as e:
        print(f"  (ntfy push failed: {e})")


def webhook(url, title, body):
    """POST {"title","message"} JSON to any URL (custom integrations)."""
    data = json.dumps({"title": title, "message": body}).encode()
    req = urllib.request.Request(url, data=data, method="POST",
                                 headers={"content-type": "application/json"})
    try:
        urllib.request.urlopen(req, timeout=8).close()
    except (urllib.error.URLError, OSError) as e:
        print(f"  (webhook failed: {e})")


class Notifier:
    """Fans a single message out to whichever channels are enabled."""

    def __init__(self, use_desktop=False, ntfy_topic=None, webhook_url=None):
        self.use_desktop = use_desktop
        self.ntfy_topic = ntfy_topic
        self.webhook_url = webhook_url

    @property
    def any_enabled(self):
        return self.use_desktop or self.ntfy_topic or self.webhook_url

    def send(self, title, body, urgent=False):
        if self.use_desktop:
            desktop(title, body)
        if self.ntfy_topic:
            ntfy(self.ntfy_topic, title, body,
                 priority="high" if urgent else "default",
                 tags="rotating_light" if urgent else "chart_with_upwards_trend")
        if self.webhook_url:
            webhook(self.webhook_url, title, body)
