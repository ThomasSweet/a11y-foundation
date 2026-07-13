#!/bin/sh
# Publishes the current branch (built with noindex) to GitHub Pages at
# staging.accessible-by-default.dev — a preview of the new design, separate from
# the STRATO production site. One-time setup: see the checklist in the PR / chat
# where this was added (enable Pages on the gh-pages branch + a CNAME record).
# Usage: ./deploy-staging.sh
set -e

WORKTREE="/tmp/a11y-foundation-gh-pages"
BRANCH="gh-pages"
DOMAIN="staging.accessible-by-default.dev"

echo "Building (staging, noindex)..."
STAGING=1 npm run build

echo "Preparing $BRANCH branch..."
git worktree remove --force "$WORKTREE" 2>/dev/null || true
rm -rf "$WORKTREE"
git fetch origin "$BRANCH" 2>/dev/null || true
if git show-ref --verify --quiet "refs/remotes/origin/$BRANCH"; then
  git worktree add -B "$BRANCH" "$WORKTREE" "origin/$BRANCH"
else
  git worktree add --detach "$WORKTREE"
  (cd "$WORKTREE" && git checkout --orphan "$BRANCH")
fi

find "$WORKTREE" -mindepth 1 -maxdepth 1 ! -name .git -exec rm -rf {} +
cp -r dist/. "$WORKTREE"/
# Custom domain + disable Jekyll. Rewritten every deploy so the force-refresh
# above can't drop them.
printf '%s\n' "$DOMAIN" > "$WORKTREE/CNAME"
touch "$WORKTREE/.nojekyll"

cd "$WORKTREE"
git add -A
if git diff --cached --quiet; then
  echo "Nothing changed — skipping commit."
else
  git commit -q -m "Staging $(date -u +%Y-%m-%dT%H:%M:%SZ)"
  git push origin "$BRANCH"
fi
cd - >/dev/null
git worktree remove --force "$WORKTREE"

echo "Staged: https://$DOMAIN"
