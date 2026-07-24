#!/bin/bash
# Run the whole thing PC-free on a cloud server / Raspberry Pi:
#   1) tradovate_feed.py  -> pulls your real futures bars into bars.csv
#   2) app.py             -> trades on those bars and pushes signals to your phone
#
# Set your Tradovate credentials as environment variables first (see
# tradovate_feed.py header and DEPLOY.md), then:  ./run-cloud.sh
set -e
cd "$(dirname "$0")"

: "${TRADOVATE_CONTRACT:?Set TRADOVATE_CONTRACT (e.g. MESM5) — the current front-month symbol}"

echo "Starting Tradovate feed for $TRADOVATE_CONTRACT ..."
python3 tradovate_feed.py --contract "$TRADOVATE_CONTRACT" --out bars.csv \
    --env "${TRADOVATE_ENV:-demo}" &
FEED_PID=$!
trap 'kill $FEED_PID 2>/dev/null' EXIT

# give the feed a moment to authenticate and write the first bars
sleep 5

echo "Starting the app (reads bars.csv, pushes signals) ..."
python3 app.py --config config.json
