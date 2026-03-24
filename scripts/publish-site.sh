#!/usr/bin/env bash
# Push matchaxmoxie/site/ to the public repo (root = Pages site).
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
git subtree split --prefix=matchaxmoxie/site -b "$BRANCH"
git push matchaxmoxie "$BRANCH:main"
git branch -D "$BRANCH"
echo "Done. Pushed matchaxmoxie/site/ to matchaxmoxie/matchaxmoxie main."
