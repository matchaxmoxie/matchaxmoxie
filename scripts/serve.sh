#!/usr/bin/env bash
# 本地预览 site/（与 GitHub Pages 根目录一致）
# 用法: ./scripts/serve.sh [端口] [--open]
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

# 仅本地预览：把 content/ 链到 site/，方便解析相对路径
# 已在 .gitignore，不会部署到 GitHub Pages
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
