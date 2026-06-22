#!/usr/bin/env bash
# Run pull-mirror.sh only when matchaxmoxie/main has a new commit (avoids touching files if unchanged).
# Pair with macOS Launch Agent (see SYNC-FROM-MIRROR.md) or cron for periodic checks.
set -euo pipefail

ROOT="$(git rev-parse --show-toplevel)"
cd "$ROOT"

REMOTE="${1:-matchaxmoxie}"
BRANCH="${2:-main}"
STATE_FILE="$ROOT/.git/matchaxmoxie-last-pulled"

if ! git remote get-url "$REMOTE" >/dev/null 2>&1; then
  echo "Remote '$REMOTE' not found. Add it first, e.g.:" >&2
  echo "  git remote add $REMOTE git@github.com:matchaxmoxie/matchaxmoxie.git" >&2
  exit 1
fi

git fetch "$REMOTE" "$BRANCH" --quiet
NEW="$(git rev-parse "$REMOTE/$BRANCH")"

if [[ -f "$STATE_FILE" ]] && [[ "$(cat "$STATE_FILE")" == "$NEW" ]]; then
  echo "matchaxmoxie: already synced to $REMOTE/$BRANCH ($NEW)."
  exit 0
fi

"$ROOT/matchaxmoxie/pull-mirror.sh" "$REMOTE" "$BRANCH"
printf '%s' "$NEW" > "$STATE_FILE"
echo "matchaxmoxie: recorded $NEW in .git/matchaxmoxie-last-pulled"
