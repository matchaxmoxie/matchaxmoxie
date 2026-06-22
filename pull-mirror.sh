#!/usr/bin/env bash
# Pull matchaxmoxie/matchaxmoxie into monorepo folders.
# Mirror and SU26 have unrelated subtree history, so use archive sync (not subtree pull).
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

rsync -a --delete --exclude='.DS_Store' "$TMP/site/" "matchaxmoxie/site/"
rsync -a --delete --exclude='.DS_Store' "$TMP/latex/" "matchaxmoxie/latex/"
rsync -a --delete --exclude='.DS_Store' "$TMP/scripts/" "matchaxmoxie/scripts/"
cp "$TMP/README.md" "matchaxmoxie/README.md"
cp -R "$TMP/docs/." "matchaxmoxie/docs/"
# Optional root files in the mirror vary over time.
if [[ -f "$TMP/index.html" ]]; then
  cp "$TMP/index.html" "matchaxmoxie/index.html"
fi
if [[ -f "$TMP/.nojekyll" ]]; then
  cp "$TMP/.nojekyll" "matchaxmoxie/.nojekyll"
fi
if [[ -f "$TMP/matchaxmoxie.jpg" ]]; then
  cp "$TMP/matchaxmoxie.jpg" "matchaxmoxie/matchaxmoxie.jpg"
fi
# Do not copy pull-mirror.sh from the mirror; monorepo keeps the archive-safe version (rsync site/ first).

chmod +x "matchaxmoxie/pull-mirror.sh" "matchaxmoxie/scripts/publish-site.sh"

echo "Done. Synced $REMOTE/$BRANCH into matchaxmoxie/ (site, latex, scripts, docs, root README + redirect)."
