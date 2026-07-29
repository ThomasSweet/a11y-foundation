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

- ~~Ship the concept in a form AI agents can use (Jakub)~~ — done:
  `skills/accessible-by-default` is an Agent Skill — hand-written decisions
  (reach for the native element, guard by Baseline tier, preferences are
  constraints) over three reference files generated from the criteria and
  showcase registries, so it can't drift from the demos. Explained on the site
  at `/agent-skill.html` (page A·02, linked from the title block's references
  row) — not in a chapter: it's the argument in another medium, not a fifth
  part of it, and the proof chapter is about evidence. The page carries a
  shelf-life note, since agent mechanics will date long before the rules do.
  A public `/llms.txt` is the natural follow-up; it needs page-level markdown
  the site doesn't emit yet.
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
- ~~"The standard" pillar could be more interesting/interactive~~ — closed
  (July 2026). The chapter's real interactivity is the break-it criteria,
  which grew from 7 to 9 while this sat parked (ghost-year timeline redesign,
  Bypass Blocks, 3.3.7). Two additions were tried and rejected the same day:
  a "criteria you're currently breaking" tally (reads as surveillance — makes
  the consequence-free sandbox feel consequential) and a LegalMap jurisdiction
  picker (built, then reverted: at four region-headlined cards the eye filters
  faster than any control). Standing lesson: "make X more interactive" is a
  trap framing — interaction earns its place when it IS the lesson, as in
  break-it, never as decoration.
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
- ~~Keyboard shortcuts, done accessibly~~ — dropped (July 2026). Two reasons:
  it needs JS for the mechanism (against the site's little-to-no-JS identity;
  `accesskey`, the only no-JS option, is a native anti-pattern), and it
  "improves accessibility" by adding a shortcut the user must *learn* — the
  opposite of invisible/native. The pull toward shortcuts was really a symptom
  of the flow/length problem, to be fixed structurally (per-pillar pages), not
  band-aided. Leaves 2.1.4 (Character Key Shortcuts) an uncovered criterion by
  choice.
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
- ~~"I'd like to see the code" (former colleague)~~ — done: every showcase now
  carries an always-visible "View source" link (GitHub mark, opens in a new tab)
  beside "Show the code", pointing at that demo's full folder on GitHub — the
  snippet panel is only a portable excerpt. The URL is derived from the file
  tree (import.meta.glob → component→folder map), so new demos get it for free.
  The signal was worth acting on even though the reply read as a skim: code was
  previously reachable only by opening each collapsed panel. Also elevated the
  "Show the code" toggle from a muted grey pill to a filled primary button
  (mirrors AppButton --primary, so the label colour stays contrast-safe on every
  theme), so skimmers actually notice the code is there.
- ~~Code in the Craft section~~ — done: a reusable `CodeCompare` pairs each craft
  demo with a short "common mistake → the craft" snippet (reuses CodeBlock, and
  each mirrors that demo's real CSS/HTML so it can't drift). Shipped on 7 demos
  (validation, dialog, motion, targets, defensive, content-stress, loading);
  light-dark was skipped because it already shows both code blocks inline. The
  "mistake" side has its Copy button suppressed (new `copyable` flag on CodeBlock)
  — no point one-click-copying the anti-pattern. Bad→good distinction rides on
  shape (✕/✓) + text, not colour alone. Snippets live in `src/craft/snippets.ts`.
  The optional "emerging" third act is deferred to demos where a real successor
  exists. Directly answers the "avoid it from happening" feedback.
- ~~Blueprint wayfinding review (Klara, July 2026)~~ — done, in two moves.
  Subtraction: the fake-breadcrumb eyebrows ("Drawing 03 · …"), the aria-hidden
  hub index strip, and the drawing vocabulary in nav ("Legend", "Enter drawing")
  all read as navigation to decode or ornament posing as controls — deleted or
  renamed to plain prose; plate subtext now follows the heading as a subtitle;
  CTAs name their destination. Addition: the blueprintiness returned where
  drafting legitimately puts it — the footer became a real ruled title block
  (project / title / drawn by / scale 1:1 / sheet n° + references row; hub 00,
  chapters n / 04, glossary A·01) plus a dimension line under chapter titles.
  Standing rule: metaphor lives in ornament and prose, never in labels, link
  text, or group names; mono-caps never marks a bare link in text flow. Also
  from this round (spouse): the end-of-chapter pager was too small and hidden
  under the legal row — now plate-style cards inside main.
- Site-wide flow / length restructure — BUILT (July 2026, in review; not yet
  deployed). The one-page scroll became a five-page MPA wearing a blueprint /
  technical-drawing skin: an overview hub (index — hero, four "plates" on a
  subgrid, a11y statement, author) and one chapter page per pillar
  (standard/craft/showcase/proof.html), each with a legend rail (chapter
  switcher + pure-CSS view-timeline scroll-spy), oversized watermark on a
  scroll() parallax, demo reveals, and prev/next in the title block. Entering a
  chapter morphs the plate's icon into the chapter header via cross-document
  view transitions (zero JS, reduced-motion → instant nav). The skin is fully
  theme-driven (--bp-* tokens derive from --color-*, so all presets/CVD/contrast
  re-ink it); legal pages wear the sheet too. Legacy one-page anchors forward to
  their chapter pages. App.vue (+ PillarHeader, heroIcons) deleted; e2e suite
  extended to all 7 pages ×3 engines (54 tests green) — the sweep even caught a
  real AA contrast bug in TargetsDemo (opacity on subtle text), fixed. Still
  open from this thread: per-topic reference links (MDN/spec) on craft demos;
  styleguide.html reskinned July 2026 (sheet chrome, title block S·01, real
  logo section) alongside the new brand assets.

- The project itself as a showcase (open, directional) — Thomas's worry after the
  restructure: some playfulness got lost, and the site chrome should *itself*
  employ the CSS it showcases, visibly. Partly addressed already (cross-doc
  view-transition morphs, subgrid hub, scroll-driven scroll-spy + reveals, sticky
  ghost years and chapter watermarks, anchor-positioned theme panel, :has() legal
  wash) — but treat "does the site dogfood this?" as a standing design test, and
  keep hunting for places where a showcased feature can do real chrome work with
  personality. Playfulness is a feature, not a garnish.

### The masterclass sweep (July 2026) — specialist-lens gap analysis

The exercise: what would an accessibility specialist and a senior
accessibility engineer say is missing, if this site is meant to go past
"what is a11y" into building solid foundations and auditing well? Verdict
first: the four pillars hold. The real gaps cluster in three places — the
**Understandable** principle is the thinnest pillar, **layout under user
stress** (zoom, spacing, translation) is practised everywhere but taught
nowhere, and the proof chapter argues the layered model without teaching
the *practice* of auditing (screen-reader literacy, triage, reporting).
Every candidate below keeps the house rules: interaction only when it IS
the lesson, pure CSS/HTML mechanisms, JS-territory named as out of lane
rather than half-covered.

**POUR, honestly scored.** Perceivable: strong (contrast engine, theming,
forced colors, reduced motion/transparency) — missing 1.4.12 and 1.4.13.
Operable: strong (targets, focus appearance, bypass) — missing the sticky
chrome/focus interaction. Understandable: thinnest — 3.3.7 and 3.2.6 stand
almost alone; 1.3.5, 3.1.1/3.1.2 are absent or unnamed. Robust: the site
*is* the demo (landmarks, headings, native elements) but never teaches the
hiding-technique decisions every dev gets wrong; status messages (4.1.3)
are JS and should be named as out of lane, not skipped silently.

Craft-chapter candidates (pure CSS/HTML, each with the interactive hook):

- **Text-spacing stress test (1.4.12)** — a toggle applies the WCAG
  override values (line-height 1.5×, paragraph 2×, letter 0.12×, word
  0.16×); the defensively-built card breathes, the fixed-height twin
  clips. The 200%-zoom sibling of Break-it-with-content.
- **The sticky bar that eats your focus (2.4.11)** — tab through a list
  under a sticky header and watch focus land hidden behind it; then
  `scroll-padding` on the scroller fixes it. The site does this
  everywhere (`scroll-margin` on every `[id]`) and teaches it nowhere.
- **The hiding matrix** — one specimen hidden four ways (`display:none`,
  `.visually-hidden`, `aria-hidden`, `inert`) with a "what the screen
  reader meets / what the keyboard meets" readout per technique. The
  single most-asked junior question, rarely answered in one place.
- **Truncation ethics** — `line-clamp` cuts content with no way to reach
  it (1.4.10 / 1.4.4); pair the clamp with a native disclosure so the
  full text stays reachable. Sits beside ::details-content.
- **The scrollbar you shouldn't style** — `scrollbar-gutter: stable`,
  the macOS-overlay vs Windows-classic split, and why scrollable regions
  need to be keyboard-reachable (the site's `tabindex="0"` regions).
  From the July sidebar thread; the lesson is restraint.
- **Input purpose (1.3.5)** — a checkout form where `autocomplete`
  tokens let the browser fill name/address/email; break-it removes the
  tokens and autofill goes blind. Pure HTML; the `forms` tag exists and
  is underfed. Could live on the timeline as a break-it criterion instead.
- **content-visibility** — performance as accessibility, with the nuance
  that (unlike `display:none`) skipped content stays findable and
  announceable; find-in-page proves it live. Showcase candidate.
- **`display: contents` warning** — not a demo; a CodeCompare "gotcha"
  note. It stripped list/table semantics for years; still bites.

Proof-chapter candidates (the premise says "audit effectively and
efficiently" — the chapter argues the model, these teach the practice):

- **A screen reader's first fifteen minutes** — VoiceOver/NVDA survival
  card: the rotor, heading/landmark/form hops, why you don't narrate
  every word. `<kbd>`-styled, printable. Best home may be a reference
  sheet (A·03) off the title block, like the glossary and agent-skill
  pages — reference, not argument.
- **Reading the accessibility tree** — DevTools walkthrough: name, role,
  value for the working dev; where the computed name actually comes from.
- **Triage that survives a sprint** — severity as user-impact (task
  blocked? how often? any workaround?), not WCAG level; plus the bug
  template that names the barrier, the AT, the criterion, and the fix.
  Copyable block; CodeBlock already does this job elsewhere.
- **The audit room (capstone, big)** — an inert specimen page seeded
  with a known number of barriers; visitors hunt them, hints and answers
  behind `<details>`. Break-it scaled from one rule to a whole page; the
  AuditStylesheet demo already proved the inert-specimen pattern. The
  most "masterclass" idea here — also the most work; scope it standalone.
- **Reader mode as an audit layer** — if semantic HTML is right, Reader
  view works; a one-paragraph smoke test worth adding to the layers.
- **WebAIM survey grounding** — the numbers (mobile SR share, top
  frustrations) that turn "test on phones" from anecdote (article 01's
  reviewers) into data. One sourced paragraph in the proof intro.

Structure: nothing above needs a fifth pillar. Understandable items feed
the timeline, stress/hiding/scrollbar feed craft, audit practice feeds
proof, and cheat-sheet material extends the title-block reference sheets
(A·03, A·04…) the way glossary and agent-skill already do. One addition
worth making explicit *on the site*: a short "edge of the argument" note —
ARIA widget patterns, live regions, and focus management are real, they
are JavaScript's territory, and this site deliberately stops where the
platform's free guarantees stop. Saying so is more credible than silence.

Out of lane, stated once: captions/media (no media on the site), 4.1.3
live regions, ARIA authoring patterns, focus management — JS mechanisms;
the agent skill and the scope note can point at the ARIA APG instead.

### Watchlist (too early / conditional — revisit)

- WCAG 2.2 timeline coverage — settled at 4 of the 9 new criteria (2.5.8,
  2.4.11, 2.4.13, 3.3.7); the rest assessed July 2026 and skipped on purpose:
  2.4.12 near-duplicates the 2.4.11 demo at AAA, 2.5.7 and 3.3.8 need JS
  mechanisms to break honestly. **3.2.6 Consistent Help is unblocked now
  that the multi-page design is going live — a good first post-launch demo**
  (help lives in the same footer slot on every page; break-it moves it).
- `text-box` (trim) — Chrome + Safari; typographic alignment with only a
  modest a11y angle; take it only if a showcase gap needs filling.
- Subgrid card alignment — only if criteria/showcase cards ever sit side by
  side; verify the layout before building.
- Media state pseudo-classes (`:playing` etc.) — checked July 2026: no
  Chromium support (Firefox 150 + Safari only, Baseline false per
  web-features); revisit when Chrome ships.
- `text-fit` (a.k.a. the `text-grow`/`text-shrink` proposals) — assessed
  July 2026: no engine ships it, so it can't be demoed honestly. The a11y
  case is real but double-edged: *grow/fit* would retire images-of-text and
  SVG `textLength` hacks for display headlines (real text that translates
  and reads aloud), but *shrink per-line* can quietly fight the user — bump
  your font size and the algorithm shrinks it back to fit, a 1.4.4 failure
  mode with the same flavour as `maximum-scale=1`. If it ships: demo it as
  display-type-only, never body or functional text, and lead with the
  shrink caveat. Revisit when any engine lands it.
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

- **2026-07** Wave 9 showcase: rounded `polygon()` — real text vs an exported image of text (1.4.5), a break-it that clips the focus ring off the link, and the timeline's "You are here" label re-cut as a pointer tag (dogfood). Idea via Temani Afif's CSS Tip.

- **2026-07** Agent Skill published (`skills/accessible-by-default`): hand-written decisions plus three reference files generated from the criteria and showcase registries (`npm run skill:gen`), so agents get the platform-first argument without the skill drifting from the demos. Suggested by a reviewer, after Chrome's Modern Web Guidance.
- **2026-07** Launched: the multi-page redesign replaced the one-page site in production (old design kept at the `design-classic` tag), with a new brand mark, regenerated icons/OG image, and the style guide reskinned to match.
- **2026-07** Timeline: 3.2.6 Consistent Help break-it demo — three page mock-ups whose help link either holds its slot or wanders; the first criterion the multi-page structure made demoable.
- **2026-07** ESLint added (flat config, vue + typescript, `--max-warnings 0`, wired into CI) — the JS/TS gate that stylelint and vue-tsc never covered.
- **2026-07** Canonical URLs on all nine entry pages — the site answers on four host/scheme variants, so the canonical tag names the one true URL.

- **2026-07** Timeline: 3.3.7 Redundant Entry break-it demo — a two-step checkout whose reuse shortcut disappears when broken; first Understandable-principle criterion.
- **2026-07** Wave 8 showcases: `reading-flow` (focus order follows the visual layout, tab order pinned by e2e) + `::details-content` with `interpolate-size` (animated native disclosure, reduced-motion gated).
- **2026-07** SEO hygiene: robots.txt on main (crawl open, noindex gatekeeps); five-page sitemap prepared on the restructure branch; Search Console setup pending.
- **2026-07** README relaunch: adaptive SVG banner (color-scheme + reduced-motion aware, finite strike animation), scheme-swapping screenshots, badges, MIT license, issue forms — plus the "your browser reports the scheme, not your OS" correction.
- **2026-07** LegalMap: ADA Title II corrected to the 2027–2028 phase-in (community catch, applied to both designs).
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
