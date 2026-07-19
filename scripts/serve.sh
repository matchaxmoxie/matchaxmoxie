#!/usr/bin/env bash
# ben di yu lan site/（yu GitHub Pages gen mu lu yi zhi）
# yong fa: ./scripts/serve.sh [duan kou] [--open]
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

# jin ben di yu lan：ba content/ lian dao site/，fang bian jie xi xiang dui lu jing
# yi zai .gitignore，bu hui bu shu dao GitHub Pages
CONTENT_LINK="${ROOT}/site/content"
if [[ ! -e "$CONTENT_LINK" ]]; then
  ln -s ../content "$CONTENT_LINK"
fi

URL="http://127.0.0.1:${PORT}/"
echo "Serving ${ROOT}/site at ${URL}"
echo "  home:      ${URL}"
echo "  guide:     ${URL}informatics-class-of-2027.html"
echo "  scratch:   ${URL}scratch-studio.html"

if [[ "$OPEN" -eq 1 ]]; then
  open "${URL}"
fi

cd "${ROOT}/site"
exec python3 -m http.server "$PORT"
