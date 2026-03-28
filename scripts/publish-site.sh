#!/usr/bin/env bash
# Push matchaxmoxie/ to the public repo (root = Pages site).
# Site copy includes public AI or agent disclosure (#how-i-work); keep in sync with UCM monorepo edits.
# Prereqs: git remote "matchaxmoxie" → git@github.com:matchaxmoxie/matchaxmoxie.git
#          SSH access as a user with push permission to that repo.
set -euo pipefail

ROOT="$(git rev-parse --show-toplevel)"
cd "$ROOT"

if ! git remote get-url matchaxmoxie &>/dev/null; then
  echo "Add remote first: git remote add matchaxmoxie git@github.com:matchaxmoxie/matchaxmoxie.git" >&2
  exit 1
fi

BRANCH="tmp-mxm-site-push-$(date +%s)"
git subtree split --prefix=matchaxmoxie -b "$BRANCH"
# Mirror main is subtree-only; history will not fast-forward. Force replaces remote main with this split.
git push matchaxmoxie "$BRANCH:main" --force
git branch -D "$BRANCH"
echo "Done. Force-pushed matchaxmoxie/ subtree to matchaxmoxie/matchaxmoxie main."
