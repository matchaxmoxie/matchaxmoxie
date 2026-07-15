#!/usr/bin/env bash
# Serve site/ locally (same root as GitHub Pages).
# Usage: ./scripts/serve.sh [port] [--open]
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
PORT="8080"
OPEN=0

for arg in "$@"; do
  case "$arg" in
    --open) OPEN=1 ;;
    *) PORT="$arg" ;;
  esac
done

# Local preview only: symlink content/ into site/ so ../content links resolve.
# Gitignored so coordinator drafts are not deployed to GitHub Pages.
CONTENT_LINK="${ROOT}/site/content"
if [[ ! -e "$CONTENT_LINK" ]]; then
  ln -s ../content "$CONTENT_LINK"
fi

URL="http://127.0.0.1:${PORT}/"
echo "Serving ${ROOT}/site at ${URL}"
echo "  fase-map:  ${URL}fase-map.html"
echo "  handoff:   ${URL}handoff-checklist.html"

if [[ "$OPEN" -eq 1 ]]; then
  open "${URL}fase-map.html"
fi

cd "${ROOT}/site"
exec python3 -m http.server "$PORT"
