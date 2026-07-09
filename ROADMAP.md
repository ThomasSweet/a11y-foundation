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

## Open

### Feedback inbox — July 2026 round

Collected from friends and former colleagues after launch; triage into
fixes/features as they come in.

- ~~Theme switch reachable from the dark-mode craft section~~ — fixed:
  shared theme state (composable), inline mode switcher in the demo.
- ~~Phantom focus ring on the content column after closing a dialog
  (iOS)~~ — fixed: `tabindex="-1"` containers no longer draw the ring.
- ~~Non-color cues invisible in Safari~~ — fixed: WebKit doesn't apply
  pseudo-element rules inside style queries; the query now sets `--cue`
  on the element, the pseudo renders it. Snippet teaches the gotcha.
- ~~Showcase findability~~ — done: 7 topic tags on all 29 entries,
  pure-CSS `:has()` radio-chip filter, empty tier groups hide themselves.
- ~~A11y payoff line per showcase~~ — done: `payoff` registry field, 29
  lines of copy, distinct accessibility-marked line on every card.
- ~~Style guide dormant~~ — done: live theming/presets section (renders
  from the real `.theme-*` classes) + footer link.
- "The standard" pillar could be more interesting/interactive — parked
  for now (Thomas); revisit with concrete ideas, not urgency.
- ~~shape() demo interactive~~ — done: width slider resizes two cards;
  path()'s frozen coords visibly detach while shape() reflows.
- ~~text-wrap demo interactive~~ — done: one block toggled in place via
  :has(), default vs balance+pretty.
- ~~Timeline ghost year too subtle in dark theme~~ & ~~loading spinner
  low-contrast in some themes~~ — fixed together (Round 2c): both now
  derive from `--color-text` (engine-guaranteed to contrast the bg)
  instead of `--color-border` / `--color-primary`, which can wash out on
  some seeds. Ghost stays quiet (24% text mix); spinner arc is full text.
- iOS zoom-in/zoom-out sometimes lands in a different section — needs the
  tester's video to reproduce; suspects: scroll anchoring vs sticky
  ghosts / scroll-driven timelines.
- ~~Theme panel stranded top-right on very wide screens~~ — fixed: the
  capped header detaches the toggle from the viewport edge; panel now
  tethered to the toggle via anchor positioning (xl+), fallback kept.
- ~~Hard to return to nav after jumping into long content (keyboard)~~ —
  fixed: "Back to navigation" skip link ending each pillar (fixed-position
  reveal, targets the nav landmark); pinned by e2e.
- Space vs Enter on nav items "inconsistent" — NOT a bug: links scroll on
  Space (native), summaries toggle on Space; mixing the two is what feels
  inconsistent. Hijacking Space on links would break a web convention.
  Leave as-is; explain to the reporter.
- ~~BUG: filter breaks sidebar nav~~ — fixed (3a): `:target` reveal in the
  utilities layer un-hides a linked-to card + its tier group, beating the
  components-layer filter by layer order (pure CSS, no JS). Pinned by e2e.
- Keyboard shortcuts, done accessibly (feature, not the nav fix) — NOT
  cmd/ctrl+N (browser-reserved). If built: safe keys, a `?` help overlay,
  a 2.1.4 disable/remap mechanism, fire only when focus isn't in a field.
  Teaches Character Key Shortcuts instead of violating it. The back-to-nav
  skip links already cover the return-to-nav need, so this is additive.
- ~~Avatar + brief bio~~ — done (3c): footer sliver with a round photo
  avatar (background-image framed on the face, gradient fallback) + one
  line + GitHub link.
- ~~Hero hover flourish~~ — done (3b): a line draws across "bolted on" on
  hover of the title. Pure CSS (scaleX on a pseudo-element), reduced-motion
  gated (instant, no draw), can-hover only, forced-colors aware. The span
  needed its own gradient clip — position:relative pulls it out of the
  parent's background-clip:text.
- Big idea (someday): structure the whole site's flow around a real
  physical object made digital — a skeuomorphic narrative spine. Open
  design question; bring references before building.
- ~~"Motion that bows out on request" demo boring~~ & ~~"Targets that
  survive touch and forced colors" demo boring~~ — done: both rebuilt as
  interactive. Motion: three animations (spinner/progress/pulse) that all
  freeze from one simulate-reduced-motion switch. Targets: a coarse-pointer
  toggle grows hit areas 24→44px, and a forced-colors preview dissolves the
  colour-only button while the bordered one survives.

### Watchlist (too early / conditional — revisit)

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

- **2026-07** Wave 7: showcase grouping derived from Baseline data — three tiers in Baseline's own vocabulary (widely / newly / limited availability), computed at build time; hand-maintained `status` field removed.
- **2026-07** Wave 6: pure-CSS carousel showcase — `::scroll-button` (anchor-positioned) + `::scroll-marker` dots with slash-alt accessible names; honest SR caveats; plain snap scroller everywhere else.
- **2026-07** Wave 5: proof pillar pass — "CSS that audits" diagnostic-stylesheet demo (inert specimen), "performance is accessibility" prose, responsive-reveal card on @starting-style (with the reduced-motion guard the viral snippet skips).
- **2026-07** Wave 4: "Break it with content" craft block — one card vs. long titles, German compounds (hyphens + lang), Arabic RTL (:dir(), logical properties).
- **2026-07** Toolbar glyphs replaced with inline SVGs (font-metric-proof centering).
- **2026-07** Wave 3: high-contrast presets via engine `--mix-*` contrast knob; theming split into engine + presets files.
- **2026-07** Wave 2: container query units showcase (`clamp(rem, cqi, rem)` fluid card).
- **2026-07** Wave 1: `:user-valid` showcase, light-dark() style-query card, CoverageMatrix loading row; media pseudos parked (no Chromium).

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
