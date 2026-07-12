#!/bin/sh
# Builds the current branch (with noindex) and ships dist/ to the staging
# subdomain on Strato. One-time server setup: see the checklist in the PR /
# chat where this script was added.
# Usage: ./deploy-staging.sh
set -e

WORKTREE="/tmp/a11y-foundation-deploy-staging"
BRANCH="deploy-staging"
SERVER_DIR="staging-accessible-by-default"
URL="https://staging.accessible-by-default.dev"

echo "Building (staging, noindex)..."
STAGING=1 npm run build

echo "Preparing $BRANCH branch..."
git worktree remove --force "$WORKTREE" 2>/dev/null || true
rm -rf "$WORKTREE"
git fetch production "$BRANCH" 2>/dev/null || true
if git show-ref --verify --quiet "refs/remotes/production/$BRANCH"; then
  git worktree add -B "$BRANCH" "$WORKTREE" "production/$BRANCH"
else
  git worktree add --detach "$WORKTREE"
  (cd "$WORKTREE" && git checkout --orphan "$BRANCH")
fi

find "$WORKTREE" -mindepth 1 -maxdepth 1 ! -name .git -exec rm -rf {} +
cp -r dist/. "$WORKTREE"/

cd "$WORKTREE"
git add -A
if git diff --cached --quiet; then
  echo "Nothing changed — skipping commit."
else
  git commit -q -m "Staging $(date -u +%Y-%m-%dT%H:%M:%SZ)"
fi
git push production "$BRANCH"
cd - >/dev/null
git worktree remove --force "$WORKTREE"

echo "Pulling on server..."
ssh strato "cd $SERVER_DIR && git pull -q"

echo "Staged: $URL"
