#!/bin/sh
set -e

WORKTREE="/tmp/a11y-foundation-gh-pages"
BRANCH="gh-pages"
DOMAIN="staging.accessible-by-default.dev"

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
printf '%s\n' "$DOMAIN" > "$WORKTREE/CNAME"
touch "$WORKTREE/.nojekyll"

cat > "$WORKTREE/index.html" <<'HTML'
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="color-scheme" content="light dark" />
    <meta name="robots" content="noindex, nofollow" />
    <title>Staging is idle — Accessible by default</title>
    <link rel="canonical" href="https://accessible-by-default.dev/" />
    <style>
      :root {
        color-scheme: light dark;
        --ground: light-dark(#f5f5f5, #1a1a1a);
        --ink: light-dark(#1a1a1a, #f5f5f5);
        --muted: light-dark(#5c5c5c, #a8a8a8);
        --accent: light-dark(#0b57d0, #8ab4f8);
      }
      html {
        background: var(--ground);
        color: var(--ink);
        font: 1.125rem/1.6 system-ui, sans-serif;
      }
      body {
        margin: 0;
        min-height: 100svh;
        display: grid;
        place-items: center;
        padding: 2rem;
      }
      main {
        max-width: 34rem;
      }
      h1 {
        font-size: 1.75rem;
        line-height: 1.2;
        margin: 0 0 1rem;
      }
      p {
        margin: 0 0 1rem;
        color: var(--muted);
      }
      a {
        color: var(--accent);
        text-underline-offset: 0.2em;
      }
      a:focus-visible {
        outline: 3px solid var(--accent);
        outline-offset: 0.2em;
        border-radius: 0.2em;
      }
    </style>
  </head>
  <body>
    <main>
      <h1>Staging is idle</h1>
      <p>Nothing is being previewed on this host right now.</p>
      <p>The site lives at <a href="https://accessible-by-default.dev/">accessible-by-default.dev</a>.</p>
    </main>
  </body>
</html>
HTML

if [ -n "${PROBE_DIR:-}" ] && [ -d "$PROBE_DIR" ]; then
  mkdir -p "$WORKTREE/probe"
  cp "$PROBE_DIR"/*.html "$WORKTREE/probe/"
  echo "Probe pages copied from $PROBE_DIR"
fi

cd "$WORKTREE"
git add -A
if git diff --cached --quiet; then
  echo "Nothing changed — skipping commit."
else
  git commit -q -m "Staging idle $(date -u +%Y-%m-%dT%H:%M:%SZ)"
  git push origin "$BRANCH"
fi
cd - >/dev/null
git worktree remove --force "$WORKTREE"

echo "Parked: https://$DOMAIN"
