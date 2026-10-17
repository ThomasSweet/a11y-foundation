# Roadmap

What comes next for accessible-by-default.dev, what is owed, what is being
watched, and what has been decided. The site argues, in four chapters with
practice rooms, an agent skill and a feed, how much of accessibility the web
platform handles natively. Every item here keeps three constraints:

- **Platform first.** A native element or a CSS feature before JavaScript; a
  little Vue before a library.
- **Use what ships.** Current evergreen browsers, no heavy dependencies.
- **Accessibility is the point.** Every idea has to survive keyboard, screen
  reader, reduced motion and forced colours.

Code rules live in [GUIDE.md](GUIDE.md).

How to edit this file:

- Open holds only what is still open. When something ships, it leaves Open in
  the same change and gets one line under Recently done.
- Recently done keeps at most 15 lines of at most 25 words, newest first,
  each ending with its PR number. When a sixteenth arrives, delete the
  oldest: its PR keeps it. [docs/history/2026.md](docs/history/2026.md) is the
  old Done section as it stood on 2026-10-16.
- Measurements and test notes go in the PR description. Lessons for future
  code go in GUIDE.md. A longer record of why goes in `docs/history/` only
  when a later reader will ask.
- Visitor feedback goes into Now, Next or Ideas, or into Rejected with the
  reason. Credit the finder only if they are named in README's Thanks.
- Point with a heading name or a PR number, never "above" or "below".
- The monthly cloud routine "Standards and browser freshness sweep" reads,
  under Open, the sections "Standards re-checks (dated)", "Owed checks" and
  "Watchlist", and under Standing decisions the entry "What earns a
  what-changed line". Keep those names and that nesting, or change the
  routine's prompt in the same change. GUIDE's "What changed" states the same
  rule: change both together.
- Budget: about 3,000 words, never more than 3,500.

---

## Open

### Now

- **Refresh the WebAIM figures.** WebAIM published Survey 11 on 2026-09-29;
  proof (`ProofPage.vue`) and A·03 (`ScreenReaderView.vue`) still quote
  Survey 10. The freshness routine checks the same page on 2026-11-01: if it
  opens a draft PR first, review that instead.
- **Bump Playwright to 1.64.** 1.61.1 is installed; 1.64.1 bundles Chromium
  156, Firefox 157 and WebKit 27.2. Then run the re-checks under Owed checks.
- **Bump `axe-core` and `@axe-core/playwright` together.** 4.12.1 is pinned;
  4.13 changed rule behaviour and 4.14 is out. GUIDE's CI section says why
  both move at once. Re-run the audit-room and listening-room specs, which pin
  exact findings, and re-check the axe column of proof's coverage matrix.

### Next

- **Node 26 in CI**, once it becomes LTS on 2026-10-28 (noted in #87).
- **Distribution.** Draft the blurbs once, then submit by hand:
  [brunopulis/awesome-a11y](https://github.com/brunopulis/awesome-a11y), The
  A11y Project's resources page, VoltAgent/awesome-agent-skills and the
  awesome-claude-skills lists (the agent side is a near-empty niche), and CSS
  newsletters for the showcase. A11y Weekly already has it queued.
- **Positioning, Tier 2**, each its own change: items 3 to 10 in
  [docs/positioning-review.md](docs/positioning-review.md), plus a "last
  changed" stamp per chapter, derived from `revisions.ts`. Optional, from
  Tier 1: the hub method block.
- **A scroll-shadow hint** on scroll-driven animations (`@property`
  percentages on `scroll(self inline)`), for the code blocks and the coverage
  matrix, which scroll sideways on phones with a hidden scrollbar. No static
  shadow as a fallback: one that stays claims more than there is.
- **Carousel buttons by container query**: outside the strip when there is
  room, inside when not, with a pressed scale and a flat disabled state.
- **Practice rooms**, in build order, each a candidate until its scope is
  written and reviewed: P·03 settings room (state and preference barriers a
  static page cannot host); P·04 booking form (a multi-step flow where
  errors, instructions and grouping do the damage); P·05 review desk (a
  component library read one component at a time).

### Ideas

- **`sibling-index()` and `sibling-count()`**, Baseline since 2026-08-18. The
  payoff is aesthetic: a staggered `@starting-style` entrance or a footnote on
  quantity queries, not a showcase of its own. When: either showcase next
  changes.
- **The peek-a-boo overscroll pseudo-element**, an easter egg gated on reduced
  motion. When: the scroll items in Next are done.
- **Print styles** as a parallel to WCAG, not a conformance target: no forced
  backgrounds, no `attr(href)` on every link. When: craft has room.
- **"The label that stays"**: `:placeholder-shown` as an emptiness guard, as
  `TextField.scss` already uses it. When: craft's form sections change.
- **A region set to the dark scheme with `color-scheme`**, beside a
  hand-painted copy; the real failure is inherited light text in a
  light-scheme control. When: the theming demos change.
- **Readonly versus disabled** as a craft note (bare `:read-only` also
  matches a paragraph). When: craft's form sections change.
- **`@scope`**: proximity only breaks specificity ties, so inherited custom
  properties stay the stronger fix. When: a showcase gap.
- **Understandable is the thinnest of the three principles on the
  timeline** (Robust has none): 3.2.6 and 3.3.7 only. 3.1.2 lives in the
  listening room; 3.1.1 is named nowhere. When: the next timeline
  criterion, or P·03's scope.
- **`text-box` trim** (Chrome and Safari): alignment with a modest
  accessibility angle. When: a showcase gap.
- **`text-fit`**, Chrome 150 only, ready for a limited-tier slot. It would
  retire images of text and SVG `textLength` hacks for display headlines
  (1.4.5). Display type only, never body or functional text, and lead with
  the caveat that shrinking per line can undo a reader's larger text (1.4.4).
  When: a limited-tier slot is wanted.
- **Translucent glass again.** Glass sits at 90% because Midnight needs 87%.
  Lighter subtle text in Midnight, or a lower token for surfaces without
  text, would bring it back. When: a design reason to want it.
- **Per-section pages**, the deferred Tier 3 split; the task index would
  become its structure. Deferred, no trigger yet.

### Watchlist

- **Media state pseudo-classes** (`:playing`, `:paused` and five more):
  web-features 3.42 has Firefox 150 and Safari 15.4, no Chrome. Trigger:
  web-features lists a Chrome version; the monthly routine checks this, since
  the Monday bot only reports features that already have a showcase. A
  showcase then needs a short clip with captions and a transcript, and a
  Playwright whose Chromium has them.
- **Anchor positioning's badge** stays limited until Chrome and Firefox ship
  the `position-visibility` values `anchor-valid` and `anchor-visible`,
  although every engine ships the parts both anchor demos use. Chrome is
  expected in 157 (web-features issue #3558). Trigger: Chrome's tick; then
  reword "only Safari 27" in the anchor positioning summary in `registry.ts`.
- **`border-shape`**, Chrome 147 only, for the anchor tooltip's arrow.
  Trigger: a second engine; the monthly routine checks.

### Standards re-checks (dated)

The map and the timeline carry claims with expiry dates. Re-read the primary
source before touching the wording or the sources-read stamp in
`standardsMapData.ts`.

- **EN 301 549 V4.1.1** (WCAG 2.2 AA): published by ETSI, not yet cited in
  the Official Journal. Re-check December 2026. When cited, the EAA chain
  moves to the 2.2 row and the "arriving" note goes. Canada's ACA cites the
  2024 Canadian adoption of V3.2.1, so it stays at 2.1 AA regardless.
- **WCAG 3.0**: next working draft expected Q4 2026; none since September as
  of 2026-10-16. The 3.0 row note says "late 2026" and must follow it.
  Candidate Recommendation snapshot targeted Q4 2027.
- **ADA Title II**: the April 2026 interim final rule (26 Apr 2027 and 26 Apr
  2028) is challenged in court, with no ruling as of 2026-10-16. The phase-in
  wording holds until one lands.
- **Interop 2027**: the scope is published 2027-02-04. Then re-check the
  eight "Interop 2026" labels in `src/showcases/registry.ts` and its
  dashboard link, the showcase intro's Interop link, and the Interop 2026
  link and preview card in `InterestInvokerDemo.vue`, and see whether a
  watched feature made the cut.

### Owed checks

- **VoiceOver pass for the listening room**, owed since 2026-09-16. Record
  what VoiceOver says for each of the eleven barriers (NVDA too, given a
  Windows machine), then drop the "predictions" caveat and date the answers.
  When: the next screen reader session. See
  [docs/listening-room-scope.md](docs/listening-room-scope.md).
- **Engine workarounds**, due with the Playwright bump. Run each re-check in
  GUIDE's "Engine behaviours we work around" in the new engines, starting
  with "Anchored elements" (measured 2026-09-28).
- **Safari 27 and style queries**, owed since 2026-09-14. Does real Safari 27
  apply pseudo-element rules inside a style query? If so, qualify
  `StyleQueryCuesDemo.snippet.css` with the last affected version, and recheck
  the `::after` moon glyph in `LightDarkDemo.vue`. When: with the iPhone
  check.
- **Proof's sample bug report** names Safari 26 in its setup line; move it to
  Safari 27, whatever the style-query result.
- **Real Chrome after a deploy**, owed since 2026-09-05: cross-document
  transitions and the theme no-flash on the live site, per
  [docs/prerender-scope.md](docs/prerender-scope.md). When: the next deploy.
- **Real iPhone after the responsiveness sweep**, owed since 2026-10-11: the
  hero strike, the "Content source", "Theme" and "Filter by topic" rows, and
  proof's "A layered job". Playwright's WebKit is not iOS Safari. When: the
  next look on the phone.
- **Increase Contrast and 1.3.4 in real Safari**, owed since 2026-10-13:
  Increase Contrast on an iPhone and a Mac with craft open (its mapping to
  `prefers-contrast: more` was read in WebKit's source, never tried), and
  whether the arrow keys scroll the 1.3.4 device screen. When: with the
  iPhone check.

### Known debt

- **Forced-colours ring.** In `preferences.css` the ring rule in the
  `forced-colors` block sits before the general `:focus-visible` rule and
  never applies. What shows is the general ring (3px, 4px when more contrast
  also matches) in whatever colour forced colours pick. Check in forced
  colours, then fix or delete.
- **High-contrast blocks.** Of 130 `@include high-contrast` blocks, 117 only
  set `border-color: currentcolor`; 86 of those sit on `--color-border`,
  which the preferences layer already turns to `CanvasText`. Check each before
  removing any.
- **Dead outline rules.** 38 component `:focus-visible` blocks declare an
  `outline` that the preferences layer overrides.
- **Two fluid sizes outside GUIDE's rule.** The hub headline
  (`--text-display`, a cap 1.8 times its floor) and `.chapter-no` (`4.6vw`,
  no `rem` term, 1.57 times) break the fluid-type rule. Shipping engines
  still double them: Chrome and Firefox by 400%, and Safari's zoom scales
  the computed size (WebKit bug 253540, 2023; not tried in Safari 27). An
  engine that narrowed the viewport under zoom, as Chrome does, but stopped
  at 300%, as Safari does, would reach 181% and 191% on a 1280px screen
  (computed). The rule narrows both ranges, the headline's most: a design
  call.
- **`100vh`.** `SiteFrame.scss` says `100vh` where `reset.css` says `100svh`.
- **Safe-area inset.** `env(safe-area-inset-bottom)` in `ChapterLayout.scss`
  resolves to 0, because no page's viewport meta sets `viewport-fit=cover`.
- **Comments in CSS.** 28 CSS and SCSS files outside the snippets still carry
  comments, among them `preferences.css`, `layers.css` and `tokens.css`, and
  two Vue `<style>` blocks (`FocusAppearanceDemo`, `CustomSelectDemo`) carry
  prose comments, against GUIDE's zero-comments rule. Remove them file by
  file.

---

## Standing decisions

- **Does the site dogfood this?** A standing design test: the site's own
  chrome uses the CSS it shows, visibly and with personality, and degrades to
  a working page without it. Keep looking for chrome a showcased feature
  could do.
- **No JavaScript in demos.** If CSS and HTML cannot do it, the idea is
  dropped; a little Vue state may simulate outside context (a CMS, a fetch),
  never the mechanism taught. Two older showcases are exceptions:
  same-document view transitions (`document.startViewTransition`) and the
  Custom Highlight API, whose only way in is JavaScript.
- **Interaction earns its place only when it is the lesson**, as in the
  break-it toggles; "make X more interactive" is a trap framing. A breakage
  tally (it read as surveillance) and the old legal map's jurisdiction picker
  (scanning four cards was faster) were cut the day they were tried.
- **No learned-affordance features.** Shortcuts and custom gestures must be
  learned first, the opposite of native accessibility; a pull toward them is
  a flow problem to fix in the structure. This leaves 2.1.4 uncovered on
  purpose.
- **Metaphor lives in ornament and prose**, never in labels, link text or
  group names, and mono-caps never marks a bare link. From Klara Schmitt's
  wayfinding review.
- **Form validation stays CSS and native.** JavaScript message wiring and
  submit gating are out of scope. The live submit button with a simulated
  "nothing was sent" is outside context, the opposite of gating.
- **What earns a what-changed line.** What moved in the platform and the
  standards, and what it changed here. A line goes in only if a reader can
  act on it: a platform or standards fact with its consequence on the site,
  or a new thing here to try. Never plumbing (prerendering, the 404 page,
  durations belong in git). One sentence, exactly one link, to the primary
  source or the place on the site. GUIDE's "What changed" has the mechanics.
- **Practice rooms vary the type under test** (2026-09-15): a press kit, a
  shop, a component library, a form flow, each with its own barriers. A room
  that repeats a type teaches the same lesson twice. The band fiction stays
  only where it saves inventing a world, and a room that forces it onto a
  type it does not fit is rejected on that ground alone.
- **WCAG 2.2 coverage is settled at 5 of the 9 new criteria** (2.5.8,
  2.4.11, 2.4.13, 3.2.6, 3.3.7). Skipped in July 2026: 2.4.12 near-duplicates
  the 2.4.11 demo at AAA; 2.5.7 and 3.3.8 need JavaScript to break honestly.
  3.3.9 (the AAA form of 3.3.8) is not in the July record.
- **Four chapters, no fifth.** New material feeds an existing chapter or a
  reference sheet.
- **Out of lane, said on the site.** Proof's "Where this argument stops"
  names ARIA widget patterns, live regions and focus management as
  JavaScript territory and points at the APG, instead of half-covering them.

### Rejected, with reasons

- Runtime state as custom properties, and prop-for-that as a dependency: its
  providers rewrite `:root` on every pointer move. The rule is GUIDE's
  "Script writes state into the document".
- Scroll-driven colour through custom properties: built, then dropped for
  jitter (GUIDE, "Scroll-driven animations").
- View-transition scrubbing and FLIP keyframe tuning: deep JavaScript.
- A glide for the standards map's displaced card: parked, the owner's call.
  CSS cannot animate the reflow, and a View Transition around the toggle is
  script.
- Watching built-in gestures and scoped view transitions: a learned
  affordance, and a JavaScript API.
- `::-webkit-scrollbar`, and `scrollbar-width: thin` on anything a hand
  grabs: `scrollbar-color` already tints the thumb, and thin shrinks a target.
- Dropping the scroller outline for the thumb colour: the outline is the focus
  indicator, and the tint only adds to it.
- Sounds, haptics and `scrollTo` from the scroller talk's Switch demo:
  script, and not the lesson.
- Quizzes, progress marks, time estimates, search, newsletter capture: course
  apparatus, per the positioning review.
- Pointer tilt, parallax and a following eye: 2.3.3, and pointer-only state.
- A reveal-once latch held at opacity 0: focusable content nobody can see.
- A value painted with `counter()` and `content`: the visible and the
  accessible value diverge (F87).
- Battery, network and frame-rate tiles: no cross-engine support, and the
  `prefers-*` features already carry the person's intent.
- The GRAD axis: no font here has one, and `@supports` cannot detect axes.
- The interpolated anchor morph: no accessibility benefit, Chromium only, and
  a hover morph was already cut.
- COLRv1 colour fonts: the site's first web font, and not in Safari.
- `::selection` styling: the default highlight is the reader's OS setting.
- Concentric corners: the tokens resolve to 0.
- Counters for the testing layers: the markup does not match.

---

## Recently done

- 2026-10-17: Reduced, not removed: under reduced motion a busy skeleton fades instead of freezing, and the sweep lets aria-busy regions through. #90
- 2026-10-16: Accuracy pass: false feed line withdrawn, 1.3.5 tagged Perceivable, code blocks named, fluid type that zooms, reveals that end in view, more contrast on surfaces. #89
- 2026-10-16: Node 24 in CI; installs skip releases under three days old and stop on unreviewed install scripts. #87
- 2026-10-14: Coverage matrix: a faint focus ring cites 1.4.11, and axe is partial on colour alone. #86
- 2026-10-13: The standard page stops failing 2.4.11: era headers step aside for focus, and the demo's bar can hide a link. #85
- 2026-10-13: Showcase ring check fixed in CI: probes measured in one pass, 0.3 seconds instead of over 30. #84
- 2026-10-13: Flaky 2.4.11 test fixed: specs stop reading transitioning values, and the demo's links get an inset ring. #83
- 2026-10-13: More contrast and glass contrast: two craft sections, unclipped focus rings and a real orientation query. #82
- 2026-10-11: Responsiveness sweep: nothing scrolls sideways or clips from 320px up, in three engines. #80
- 2026-09-29: The anchor tooltip flips for real, with three engine workarounds and a new spec. #78
- 2026-09-29: @supports claims scoped: the README and the skill's guard lines follow the tier rules. #77
- 2026-09-28: Baseline bot lines: one per feature, and no false "first engine". #76
- 2026-09-21: JavaScript as the second question: a proof paragraph and a submit button that stays live. #74
- 2026-09-21: Chapter bar focus: the bar never hides or covers a focused control; reveals carry their own motion gate. #73
- 2026-09-21: Scrollbars tinted, never thinned: the thumb shows focus, plus a scroll-state scrollable block. #72

Older work is in the merged pull requests and, up to 2026-10-16, in
[docs/history/2026.md](docs/history/2026.md).
