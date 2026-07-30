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

### Feedback inbox

- iOS zoom-in/zoom-out sometimes lands in a different section — needs the
  tester's video to reproduce; suspects: scroll anchoring vs sticky
  ghosts / scroll-driven timelines.
- A public `/llms.txt` as the agent-skill follow-up — needs page-level
  markdown the site doesn't emit yet.
- Distribution (Anthony's push): get the project into curated lists —
  the accessibility side (brunopulis/awesome-a11y, The A11y Project's
  resources page, an A11y Weekly link suggestion) and the agent side,
  where "a11y for AI agents" is a near-empty niche (VoltAgent/
  awesome-agent-skills and the awesome-claude-skills lists). Also worth
  a shot: CSS/frontend newsletters for the showcase itself. Draft the
  PR/blurb texts once, submit by hand.

- The project itself as a showcase (open, directional) — my worry after the
  restructure: some playfulness got lost, and the site chrome should *itself*
  employ the CSS it showcases, visibly. Partly addressed already (cross-doc
  view-transition morphs, subgrid hub, scroll-driven scroll-spy + reveals,
  chapter watermarks, anchor-positioned theme panel, :has() legal wash, the
  rounded-polygon "You are here" tag) — but treat "does the site dogfood
  this?" as a standing design test, and keep hunting for places where a
  showcased feature can do real chrome work with personality. Playfulness is
  a feature, not a garnish.

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
Operable: strong (targets, focus appearance, bypass, and 2.4.11's sticky-bar
break-it already exists). Understandable: thinnest — 3.3.7 and 3.2.6 stand
almost alone; 1.3.5, 3.1.1/3.1.2 are absent or unnamed. Robust: the site
*is* the demo (landmarks, headings, native elements) but never teaches the
hiding-technique decisions every dev gets wrong; status messages (4.1.3)
are JS and should be named as out of lane, not skipped silently.

Craft-chapter candidates (pure CSS/HTML, each with the interactive hook):

- **Text-spacing stress test (1.4.12)** — a toggle applies the WCAG
  override values (line-height 1.5×, paragraph 2×, letter 0.12×, word
  0.16×); the defensively-built card breathes, the fixed-height twin
  clips. The 200%-zoom sibling of Break-it-with-content.
- **The hiding matrix** — one specimen hidden four ways (`display:none`,
  `.visually-hidden`, `aria-hidden`, `inert`) with a "what the screen
  reader meets / what the keyboard meets" readout per technique. The
  single most-asked junior question, rarely answered in one place.
- **Input purpose (1.3.5)** — a checkout form where `autocomplete`
  tokens let the browser fill name/address/email; break-it removes the
  tokens and autofill goes blind. Pure HTML; the `forms` tag exists and
  is underfed. Could live on the timeline as a break-it criterion instead.
- **content-visibility** — performance as accessibility, with the nuance
  that (unlike `display:none`) skipped content stays findable and
  announceable; find-in-page proves it live. Showcase candidate.

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
Structure: nothing above needs a fifth pillar. Understandable items feed
the timeline, the hiding/stress work feeds craft, audit practice feeds
proof, and cheat-sheet material extends the title-block reference sheets
(A·03, A·04…) the way glossary and agent-skill already do.

Out of lane — now stated on the site ("Where this argument stops", end of
proof): captions/media (no media on the site), 4.1.3 live regions, ARIA
authoring patterns, focus management — JS mechanisms; the section points
at the ARIA APG.

### Watchlist (too early / conditional — revisit)

- WCAG 2.2 timeline coverage — settled at 5 of the 9 new criteria (2.5.8,
  2.4.11, 2.4.13, 3.2.6, 3.3.7); the rest assessed July 2026 and skipped on
  purpose: 2.4.12 near-duplicates the 2.4.11 demo at AAA, 2.5.7 and 3.3.8
  need JS mechanisms to break honestly.
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
- **Interaction earns its place only when it IS the lesson** — as in the
  break-it toggles. "Make X more interactive" is a trap framing; two
  additions built on that framing were rejected the same day they were
  tried (breakage tally: reads as surveillance; LegalMap jurisdiction
  picker: the eye filters four cards faster than any control).
- **No learned-affordance features** — mechanisms a visitor must first
  learn (keyboard shortcuts, custom gestures) are the opposite of
  invisible/native accessibility; a pull toward nav conveniences is a flow
  problem to fix structurally. Leaves 2.1.4 uncovered by choice.
- **Metaphor lives in ornament and prose** — never in labels, link text, or
  group names; mono-caps never marks a bare link in text flow. (Klara's
  wayfinding round.)
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

- **2026-07** Quick-wins content sweep: truncation craft demo (a clamped `<details>` preview via `::details-content` — the clamp IS the disclosure), "the scrollbar you leave alone" demo (`scrollbar-gutter: stable` + keyboard-reachable regions), the `display: contents` subgrid gotcha pair, reference links on all ten craft demos, WebAIM Survey 10 numbers + reader-mode smoke test in proof, and a "Where this argument stops" scope section pointing at the ARIA APG.

- **2026-07** Stage wash pinned to the viewport (fixed pseudo-element) — the showcase filter used to re-stretch the page-length gradient behind the sheet.
- **2026-07** Wave 9 showcase: rounded `polygon()` — real text vs an exported image of text (1.4.5), a break-it that clips the focus ring off the link, a drop-shadow focus ring that follows the shape, and the timeline's "You are here" label re-cut as a pointer tag (dogfood). Idea via Temani Afif's CSS Tip.
- **2026-07** Sidebar rail scroll-spy rebuilt on an opacity-only overlay after four defects in the colour-animation mechanism; theme flips re-ink via plain declarations.
- **2026-07** Timeline redesign II: ghost years removed, era rules + spine, sticky era heading with a `scroll-state(stuck)` border (Josi/Imad/Klara feedback).
- **2026-07** LegalMap: every law links to its official text with a hand-set "last read" date; "Orientation, not legal advice" (Morgan's caution, uncredited by request).
- **2026-07** README Thanks/Credits: contributors credited by what they found, with permission; Ahmad Shadeed, Una Kravets, Bramus Van Damme credited for reused ideas.
- **2026-07** July feedback round cleared (details in git history):
  theme switcher reachable inside the dark-mode craft demo; iOS phantom
  focus ring after dialog close fixed; WebKit style-query pseudo cue moved
  to a `--cue` custom property (snippet teaches the gotcha); showcase topic
  filter (7 tags, `:has()` radio chips) + a11y payoff line on every card;
  style guide revived with a live theming section; `shape()` and
  `text-wrap` demos made interactive; ghost/spinner contrast re-derived
  from `--color-text`; theme panel anchored to its toggle on wide screens;
  "back to navigation" skip links (pinned by e2e); `:target` reveal beats
  the filter (pinned by e2e); motion + targets demos rebuilt interactive;
  "View source" links on every showcase + CodeCompare mistake→craft pairs
  on 7 craft demos; avatar/bio footer; hero strike-through hover;
  Space-vs-Enter closed as not-a-bug (native link behaviour);
  keyboard shortcuts dropped on purpose; "make the standard pillar more
  interactive" closed after break-it criteria grew 7→9; wayfinding
  subtraction + the ruled title block from Klara's review, and the
  end-of-chapter pager grown into plate cards after my wife caught how
  hidden it was.
- **2026-07** Agent Skill published (`skills/accessible-by-default`): hand-written decisions plus three reference files generated from the criteria and showcase registries (`npm run skill:gen`), so agents get the platform-first argument without the skill drifting from the demos. Suggested by Jakub Andrzejewski, after Chrome's Modern Web Guidance.
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
