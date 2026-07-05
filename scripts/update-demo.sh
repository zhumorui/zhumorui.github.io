#!/usr/bin/env bash
# Rebuild an interactive demo and sync its static build into public/demos/.
# Usage: ./scripts/update-demo.sh [demo-name] [source-dir]
# Default: aurora demo from ../aurora_simulation
set -euo pipefail

NAME="${1:-aurora}"
SRC="${2:-$(dirname "$0")/../../aurora_simulation}"
SITE_DIR="$(cd "$(dirname "$0")/.." && pwd)"

cd "$SRC"
npm run build -- --base=./
rsync -a --delete dist/ "$SITE_DIR/public/demos/$NAME/"
echo "Synced $SRC/dist -> public/demos/$NAME/"
