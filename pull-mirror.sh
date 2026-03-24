#!/usr/bin/env bash
# Pull matchaxmoxie/matchaxmoxie into monorepo folders.
# This mirror repo has unrelated history with UCM, so use archive sync.
set -euo pipefail

ROOT="$(git rev-parse --show-toplevel)"
cd "$ROOT"

REMOTE="${1:-matchaxmoxie}"
BRANCH="${2:-main}"

if ! git remote get-url "$REMOTE" >/dev/null 2>&1; then
  echo "Remote '$REMOTE' not found. Add it first, e.g.:" >&2
  echo "  git remote add $REMOTE git@github.com:matchaxmoxie/matchaxmoxie.git" >&2
  exit 1
fi

TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

git fetch "$REMOTE" "$BRANCH"
git archive "$REMOTE/$BRANCH" | tar -x -C "$TMP"

rsync -a --delete --exclude='.DS_Store' "$TMP/latex/" "matchaxmoxie/latex/"
rsync -a --delete --exclude='.DS_Store' "$TMP/scripts/" "matchaxmoxie/scripts/"
rsync -a \
  "$TMP/index.html" \
  "$TMP/styles.css" \
  "$TMP/CONTRIBUTING.md" \
  "$TMP/LICENSE" \
  "$TMP/README.md" \
  "$TMP/j.adezhao.jpg" \
  "$TMP/resume.pdf" \
  "$TMP"/jade-zhao-*.pdf \
  "matchaxmoxie/site/"

chmod +x "matchaxmoxie/scripts/publish-site.sh"

echo "Done. Synced $REMOTE/$BRANCH into matchaxmoxie/site, latex, and scripts."
