#!/bin/bash
# One-click launcher for the paper trading app (macOS / Linux).
# Double-click this file (macOS) or run it. It starts the app and opens it in
# your browser. Press Ctrl+C in the window to stop.

cd "$(dirname "$0")" || exit 1

if command -v python3 >/dev/null 2>&1; then
    python3 app.py
else
    echo
    echo "  Python 3 is not installed."
    echo "  Get it from https://www.python.org/downloads/ then run this again."
    echo
    read -r -n 1 -p "Press any key to close..."
fi
