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

### Next up

- **Theme presets in the header ThemeToggle** — promote the theming engine's
  presets (Ocean / Midnight / Sunset + the CVD trio) from demo to site-wide.
  Realizes the modern-UI/theming vision; forces the persistence decision
  (below). Own branch.
- **Timeline redesign — the stitched thread** — replace the straight spine
  with per-era SVG thread segments (stroke-dashoffset scrub per era fixes the
  mistimed global tween), knot markers at the year badges, a frayed loose end
  after the 3.0 draft, a "you are here" marker. Prototype first, judge
  visually. Content pass alongside: tighter era summaries.
- **Subgrid card alignment** — only if criteria/showcase cards ever sit side
  by side; verify the layout before building.

### Showcase backlog

- Container query units — `cqi` + `clamp()` ultra-fluid components.
- Pure-CSS carousel — scroll buttons + `::scroll-marker`, presented WITH the
  current screen-reader caveats (that honesty is the site's voice).
- `light-dark()` beyond color — style-query trick for non-color values;
  could extend LightDarkDemo instead of a new entry.
- `:user-valid` / `:user-invalid` — stable tier; TextField already uses it.
- Media state pseudo-classes (`:playing` etc.) — custom player demo.

### Content backlog

- "Performance is accessibility" prose block in The proof — compositor
  animation → vestibular safety, main-thread health → SR responsiveness,
  keystroke-level performance as a metric.
- RTL / logical-properties craft block — flip a section to `dir="rtl"` to
  surface the logical-properties rigor already in the codebase.
- CoverageMatrix row: "loading state never announced" (axe can't see it).

### Infra / nice-to-have

- Derive the stable/emerging grouping (and sidebar clusters) from the
  Baseline data instead of the hand-maintained `status` field;
  `baseline-watch` already flags transitions.
- Grow `theming.css` into a `src/theming/` directory when it next expands.

### Decisions parked with Thomas

- **Theme persistence** — localStorage in ThemeToggle (it already uses JS);
  a no-flash reload additionally needs an inline head script. Decide when
  building the presets item above.
- **WCAG 2.0 timeline era** — keep intentionally empty, or fill with a
  Bypass Blocks / No Keyboard Trap break-it demo? Fold into the timeline
  redesign.
- **CSS naming convention** — the informal house style (root class +
  role-named descendants, no BEM ceremony) works; write it into GUIDE.md so
  it's documented intent, not accident.
- **Long-term reimagining** (“less documentation-like”) — open design
  question; Thomas brings references, discuss before building.

### Watchlist (too early — revisit)

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
