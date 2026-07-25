#!/bin/bash
# $0 PC-free test: free SPY/QQQ proxy feed + the app, no Tradovate, no PC.
# Use this to prove the whole cloud setup works before sorting out Tradovate.
#
#   PROXY_SYMBOL=SPY ./run-cloud-proxy.sh      # SPY -> MES/ES
#   PROXY_SYMBOL=QQQ ./run-cloud-proxy.sh      # QQQ -> MNQ/NQ
set -e
cd "$(dirname "$0")"

SYM="${PROXY_SYMBOL:-SPY}"
echo "Starting free proxy feed for $SYM (delayed, approximate) ..."
python3 proxy_feed.py --proxy-symbol "$SYM" --out bars.csv &
FEED_PID=$!
trap 'kill $FEED_PID 2>/dev/null' EXIT

sleep 5
echo "Starting the app (reads bars.csv, pushes signals) ..."
python3 app.py --config config.json
