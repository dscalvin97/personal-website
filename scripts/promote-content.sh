#!/bin/bash
# Promote CMS content from the content branch to main (triggers deploy).
set -euo pipefail
cd "$(dirname "$0")"

BRANCH="${1:-content}"

if [ "$BRANCH" = "main" ]; then
  echo "Refusing to promote main onto itself" >&2
  exit 1
fi

git fetch origin "$BRANCH" main
git checkout main
git pull --ff-only origin main

if git merge --no-ff "origin/$BRANCH" -m "Promote CMS content from $BRANCH"; then
  git push origin main
  echo "Merged $BRANCH → main. GitHub Actions will deploy."
else
  echo "Merge conflict. Resolve manually:" >&2
  echo "  git checkout main && git merge $BRANCH" >&2
  echo "  # fix conflicts, then: git push origin main" >&2
  exit 1
fi
