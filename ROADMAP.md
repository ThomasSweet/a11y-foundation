# Roadmap & ideas

A running list of things to explore. Not a backlog with deadlines — a place
to capture intent so decisions stay consistent.

The guiding constraints for everything here (from the project's character):

- **CSS/SCSS-first.** This is a styling showcase. Reach for a platform
  feature before JavaScript; reach for a tiny bit of Vue before a library.
- **Use what ships.** Current evergreen browsers only (~2 years back).
  No heavy dependencies, no complicated scripts.
- **Accessibility is the point**, not a checkbox — every idea below has to
  survive keyboard, screen reader, reduced-motion, and forced-colors.

Everything completed lives as one line under **Done** — the detail is in
git history and the PRs, not here.

---

## The plan

Ordered waves, one branch each; work top to bottom.

### Wave 1 — quick wins

- `:user-valid` / `:user-invalid` showcase — stable tier; TextField already
  uses it.
- `light-dark()` beyond color — style-query trick for non-color values;
  extends LightDarkDemo rather than a new entry.
- CoverageMatrix row: "loading state never announced" (axe can't see it).

### Wave 2 — container query units showcase

- `cqi` + `clamp()` ultra-fluid components — formalizes what the timeline's
  ghost numerals already dogfood.

### Wave 3 — high-contrast presets (+ theming split)

- High-contrast light/dark presets — the engine's grey mix strengths
  (border 44% / subtle 62%) become per-theme data (a contrast-boost knob):
  contrast as data, not duplicate palettes. Complements
  `prefers-contrast: more` for users without the OS setting.
- While in there: grow `theming.css` into `src/theming/`.

### Wave 4 — "Break it with content" craft block

- Stress-test a real component with a content switcher: designer-perfect
  copy → long titles → German compound words → Arabic with `dir="rtl"`.
  The RTL leg proves the logical-properties rigor already in the codebase
  (`:dir()` styling, no left/right anywhere); the long-content legs show
  the defensive guards absorbing it. Content variants via tiny Vue state
  (simulated CMS — allowed). Inspired by Shadeed's "Breaking a Layout
  Intentionally" (Debugging CSS, ch. 5) and his RTL Styling 101.

### Wave 5 — The proof pillar pass

- Diagnostic stylesheet ("CSS that audits") — a small debug stylesheet that
  outlines a11y smells using modern selectors alone: `img:not([alt])`,
  `a[target="_blank"]:not(:has(.visually-hidden))`, `button:empty`,
  unlabeled inputs via `:not(:has(+ label))`. Shown against an intentionally
  broken sample fragment; the selector engine as an audit tool.
- "Performance is accessibility" prose block — compositor animation →
  vestibular safety, main-thread health → SR responsiveness,
  keystroke-level performance as a metric.

### Wave 6 — pure-CSS carousel

- Scroll buttons + `::scroll-marker`, presented WITH the current
  screen-reader caveats (that honesty is the site's voice). Biggest build;
  emerging tier.

### Wave 7 — infra

- Derive the stable/emerging grouping (and sidebar clusters) from the
  Baseline data instead of the hand-maintained `status` field;
  `baseline-watch` already flags transitions.

### Conditional / Watchlist

- Subgrid card alignment — only if criteria/showcase cards ever sit side by
  side; verify the layout before building.
- Media state pseudo-classes (`:playing` etc.) — checked July 2026: no
  Chromium support (Firefox 150 + Safari only, Baseline false per
  web-features); revisit when Chrome ships.
- `sibling-index()` / `sibling-count()` — Canary only.
- `border-shape` — spec in flux; candidate for the anchor-tooltip arrow.
- Overscroll areas / built-in gestures — early spec discussion.
- Scoped view transitions (`element.startViewTransition`) — Chrome-only JS API.

---

## Standing decisions

- **No JS in demos** — if pure CSS/HTML can't do it, drop the idea; tiny Vue
  state is acceptable only to simulate external context (a CMS, a fetch),
  never the mechanism being taught.
- **Form validation demo stays CSS/native-only** — the JS layer (validation
  message wiring, submit gating) is deliberately out of scope.
- **Scroll-driven custom-property color: rejected** for performance; don't
  re-propose custom-property scroll animations.
- **Style queries are reserved for non-color cues** — the theming core uses
  plain custom-property inheritance on purpose.
- **CodeBlock `<pre>` keeps its permanent tabindex** — conditional focus
  needs JS; accepted trade-off, mitigated by closed-by-default `<details>`.
- **View-transition scrubbing / FLIP keyframe optimization: not doing** —
  deep JS, against the house rules.
- **Comments: near zero** — self-documenting code; only non-obvious "why"
  survives review (see GUIDE.md).

---

## Done

One line per item, newest first; details in git history / PRs.

- **2026-07** Timeline content pass — Bypass Blocks (2.4.1) skip-link demo fills the WCAG 2.0 era; era summaries tightened.
- **2026-07** Theme presets site-wide — seed engine promoted to `:root[data-preset]`, header popover panel (mode + presets + CVD trio), no-flash localStorage persistence; popover display trap fixed and pinned by e2e; `src` now 100% TypeScript.
- **2026-07** Timeline redesign — ghost-year watermarks (in-flow on narrow columns, sticky rail on wide), cumulative strata era markers, "you are here — 2026" divider; per-era named view timelines fix the scroll mistiming; wider section gaps site-wide.
- **2026-07** Dogfooding: site-wide `text-wrap` (balance/pretty) + interest-invoker preview popovers on the sidebar showcase links.
- **2026-07** Loading-states craft block — `aria-busy` + hidden text vs. visual-only skeletons; zero layout shift via `1lh` placeholders.
- **2026-07** Customizable `<select>` polish — optgroups, disabled option (+ reachable hint), status-tinted trigger, picker entrance, animated `::checkmark`; earlier: `<selectedcontent>` dot bugfix.
- **2026-07** Quantity-queries showcase — chat-app photo bundle, exact-count `:has()` compositions, self-filling gapless mosaic.
- **2026-07** Defensive-CSS craft block — mockup-vs-reality frames, min-content trap, guards toggle.
- **2026-07** Sidebar: per-showcase links in collapsible clusters; fixed smooth-anchor overshoot (reveal animation `fill: none`).
- **2026-07** Baseline badges — build-time `web-features` extraction + official icon sprite; per-card status chips removed.
- **2026-07** Interest-invokers showcase (`interestfor` link previews + delay-tuned toolbar hints).
- **2026-07** Quick wins: AppButton press feedback; cross-document view transitions home ↔ legal (closes the old page-transitions item); `scroll-state(scrolled:)` hidey tier for the bottom nav.
- **2026-07** A11y audit (axe clean ×3 engines + manual): GitHub-link hint, POUR spelled out, `color-scheme` meta; repo About metadata + README live-site link.
- **2026-07** iOS WebKit min-content overflow fixed (`min-inline-size: 0` guards everywhere); deterministic cache headers; hero `text-wrap: balance`.
- **2026-07** Bottom mobile nav — glass pill, scroll-state reveal; LightDark demo colors un-inverted; per-card feature detection (`detect`).
- **2026-06** Restructure: tabs → single narrative scroll, two pillars, pure-CSS scroll-spy; deep-linking.
- **2026-06** Theming: seed-driven contrast-safe engine, 4 themes, CVD presets, contrast-clamped picker; non-color cues via style queries.
- **2026-06** "Guidelines, alive": 7 break-it criteria (2.5.8, 1.4.10, 1.4.11, 2.4.11, 2.4.13, 2.3.3, 1.3.4) on the WCAG timeline; ConformanceShift; LegalMap.
- **2026-06** Modern design-language pass (hero, type scale, depth, glow, section reveals, timeline spine).
- **2026-06** Showcase catalog built out: container queries, `:has()`, subgrid, sliding indicator, text-wrap, scroll snap, popover, anchor positioning + tooltip, contrast-color, scroll-driven animations, style queries, `shape()`, `@starting-style`, typed `attr()`, field-sizing, zoom, customizable select, scroll-state, custom highlight, dialog polish, view transitions.
- **2026-06** Foundation & tooling: TypeScript adoption, per-component folders, test suite (axe e2e ×3 engines, keyboard specs, unit), `baseline-watch`, dialog centering + popover-flip fixes, `:user-valid` TextField.
