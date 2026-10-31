# Roadmap

What comes next for accessible-by-default.dev, what is still to fix, what is
being watched, and what has been decided. The site argues, in four chapters
with practice rooms, an agent skill and a feed, how much of accessibility the
web platform handles natively. Every item here keeps three constraints:

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
  under Open, the sections "Standards re-checks (dated)" and "Watchlist",
  and under Standing decisions the entry "What earns a what-changed line".
  Keep those names and that nesting, or change the routine's prompt in the
  same change. GUIDE's "What changed" states the same rule: change both
  together.
- Budget: about 3,000 words, never more than 3,500.

---

## Open

### Now

- **The checks package on the site**, as decided on 2026-10-29 in
  [docs/checks-scope.md](docs/checks-scope.md). First, from 31 October: 0.2.0
  as a pinned devDependency, `behaviour.spec.ts`, and the dialog test in Known
  debt replaced. Then, in one change: the three proof rows with axe's misses
  measured, the `/checks/` page, and a Tools group on the hub (T·01 agent
  skill, T·02 checks, the reference sheets closing up to A·03), plus one
  what-changed line. Then the npm homepage and the repository's website field
  point at `/checks/`.

### Next

- **An accessibility statement with evidence.** The hub's statement says
  what runs on every change and that hand testing happens from time to time,
  not before every change. Date it, name the known gaps, and add
  `ACCESSIBILITY.md`, which GitHub has shown on the repository overview since
  2026-10-01; README's section then points to it. Later, a WCAG-EM
  self-evaluation with W3C's report tool.
- **Distribution.** Draft the blurbs once, then submit by hand:
  [brunopulis/awesome-a11y](https://github.com/brunopulis/awesome-a11y), The
  A11y Project's resources page, VoltAgent/awesome-agent-skills and the
  awesome-claude-skills lists (the agent side is a near-empty niche), and CSS
  newsletters for the showcase. A11y Weekly's issue 522 ran it on 19 October.
  Once `/checks/` ships, add the checks package, its npm page and repository.
- **Positioning, Tier 2**, each its own change: items 3 to 10 in
  [docs/positioning-review.md](docs/positioning-review.md), plus a "last
  changed" stamp per chapter, derived from `revisions.ts`. Optional, from
  Tier 1: the hub method block.
- **A scroll-shadow hint** for the code blocks and the coverage matrix, which
  scroll sideways on phones whose overlay scrollbar shows only while
  scrolling: two shadow overlays faded by `opacity` on the scroller's named
  scroll timeline, never a custom property on it (GUIDE, "Scroll-driven
  animations", rule 2). No static shadow as a fallback: one that stays claims
  more than there is.
- **Carousel buttons by container query**: outside the strip when there is
  room, inside when not, with a pressed scale and a flat disabled state.
- **Practice rooms**, in build order, each a candidate until its scope is
  written and reviewed: P·03 settings room (state and preference barriers a
  static page cannot host); P·04 booking form (a multi-step flow where
  errors, instructions and grouping do the damage); P·05 review desk (a
  component library read one component at a time). Barriers collected for
  them: an icon button named only by its tooltip's `aria-describedby`
  (Archibald), spanned table headers wired with `headers` (Roselli), a card
  list built as a `listbox` (Higley). From the checks scope: a disclosure
  whose `aria-expanded` never changes and a popover "modal" that Tab escapes
  (P·03), and visible error text tied to no field (P·04).

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
  light-scheme control. With it, `light-dark()` on images (Baseline since
  2026-09-14) for the blueprint paper: it follows `color-scheme`, where
  `<picture media>` only hears the OS. When: the theming demos change.
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
- **Icons in forced colours**: test icons drawn with `mask-image` and
  `currentColor` (Verou's icon tokens) against the site's inline SVG. When:
  craft has room.
- **Bidirectional content** in the content-stress demo: `dir="auto"` on user
  content and `<bdi>` (Seyedi). When: that section changes.
- **Small copy additions**, each when its section next changes. Dialog: it
  already uses `closedby="any"`; add Roselli's rule, light dismiss only
  where closing loses nothing. Dark mode: the two-versus-three-state debate
  (Verou, Bramus Van Damme) and why the Mode control keeps System. DevTools
  sheet: Firefox 155's `@` panel emulates reduced motion. Scrollbars:
  Firefox 153 honoured `::-webkit-scrollbar` everywhere, 155 cut it back to
  a short site list.
- **Per-section pages**, the deferred Tier 3 split; the task index would
  become its structure. Deferred, no trigger yet.

### Watchlist

- **Playwright 1.65**: role queries skip inert content and the page behind a
  modal, and clicks wait on inert elements. Trigger: the release; re-run the
  suite and the checks, and fix specs that query or click behind a dialog.
  If its Firefox is 158 or later, drop `CFFIXED_USER_HOME` from
  `playwright.config.ts` and its bullet in GUIDE's "In tests".
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
- **The OS text size on the web**: `<meta name="text-scale">` (Chrome 146)
  and `env(preferred-text-scale)` (Chrome on Android). Trigger: a second
  engine, Safari above all, where iOS Text Size would finally reach pages.
- **`focusgroup`** (Chrome 150): arrow keys within a toolbar or tab list
  without a hand-rolled roving `tabindex`. Trigger: a second engine, or an
  Interop 2027 pick.
- **Ubuntu 26.04 for e2e**: the job stays on `ubuntu-24.04` while
  `ubuntu-latest` moves. Trigger: GitHub dates the 24.04 image's retirement;
  then switch in a pull request of its own and read the font-dependent specs.
- **Dart Sass 2**, targeted for December 2026. Sass 1.106.1 builds with no
  deprecation warnings and the same CSS as 1.101, so it should be a version
  bump. Trigger: the release; read its breaking changes first.

### Standards re-checks (dated)

The map and the timeline carry claims with expiry dates. Re-read the primary
source before touching the wording or the sources-read stamp in
`standardsMapData.ts`.

- **EN 301 549 V4.1.1** (WCAG 2.2 AA): published by ETSI, not yet cited in
  the Official Journal; Ireland's NDA expects the citation on 16 December
  2026. Re-check then. When cited, the EAA chain
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

### Known debt

- **High-contrast blocks.** Of 130 `@include high-contrast` blocks, 117 only
  set `border-color: currentcolor`; 86 of those sit on `--color-border`,
  which the preferences layer already turns to `CanvasText`. Check each before
  removing any.
- **The dialog spec never presses Tab.** "native dialog traps focus" in
  `keyboard.spec.ts` checks that focus starts inside and that Escape closes
  it. Walk Tab and Shift+Tab inside, and check focus returns to the opener.
- **Two fluid sizes outside GUIDE's rule.** The hub headline
  (`--text-display`, a cap 1.8 times its floor) and `.chapter-no` (`4.6vw`,
  no `rem` term, 1.57 times) break the fluid-type rule. Shipping engines
  still double them: Chrome and Firefox by 400%, and Safari's zoom scales
  the computed size (WebKit bug 253540, 2023; not tried in Safari 27). An
  engine that narrowed the viewport under zoom, as Chrome does, but stopped
  at 300%, as Safari does, would reach 181% and 191% on a 1280px screen
  (computed). The rule narrows both ranges, the headline's most: a design
  call.
- **Rail highlight after a jump to a tall section.** The clicked link lands
  at 0.19 to 0.61 opacity on showcase's tier groups and standard's criteria,
  and the last link is faint at the bottom of craft, standard and showcase
  (all three engines, 2026-10-29). A reading-line band
  (`view-timeline-inset: 30% 65%`) fixed both and never lit two links, but
  went dark after a jump to proof's short "Performance is accessibility"
  at 1440x1000. Untried: a band pinned in `rem` just below the landing line.
  Visual only; the links carry no `aria-current`.

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
- **Four chapters, no fifth.** New material feeds an existing chapter, a
  reference sheet, or a tool's own page (2026-10-29: a Tools group on the hub
  holds the agent skill and the checks).
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

- 2026-10-31: The owed-checks list left the repo: the hub and README say hand testing is occasional, and the listening room labels its transcripts as predictions. #108
- 2026-10-29: The text field's resting and valid edges now reach 3:1 in every theme, and a contrast test holds all three field states there. #106
- 2026-10-29: The style guide catches up with the shipped design: all ten blueprint tokens, the system mono stack, display small, mono labels and `--space-20`. #105
- 2026-10-29: WebKit starts on CI again: e2e stays on Ubuntu 24.04 and its browser cache is keyed per runner image while GitHub moves to 26.04. #107
- 2026-10-29: Three small CSS fixes: showcase code buttons sit level on touch screens, code-compare names its column, the standards map hides old WebKit's triangle. #104
- 2026-10-29: The site's CSS has no comments left: their reasons moved to GUIDE, the built CSS is unchanged, and a test guards the boot ground. #103
- 2026-10-29: Local Firefox runs work again on macOS 27: Playwright's Firefox gets a stand-in home folder until Playwright ships the upstream fix. #103
- 2026-10-29: Firefox 159 checked: reveals step aside for jump targets and keyboard focus, so jumps land and focus rings keep full contrast in every engine. #102
- 2026-10-29: The deploy stops with a clear message when it cannot read the production repository, instead of starting a fresh branch the server refuses. #101
- 2026-10-29: The page shell's minimum height uses the small viewport, like the body's; the chapter bar loses a safe-area term that always resolved to zero. #100
- 2026-10-29: The forced-colours focus ring finally applies, in ButtonText at full width; 36 dead component outline rules removed, nothing else changes. #99
- 2026-10-28: Node 26 in CI, Actions upgraded, dependencies updated with no audit findings and unchanged CSS; live transitions and saved themes checked in Chrome. #97
- 2026-10-28: Page changes no longer swallow clicks: the live content fades in. Survey 11 figures; craft's last two rail links light up. #96
- 2026-10-26: Agent files: /llms/ no longer answers 403, the markdown is served as UTF-8, and pages link their markdown twins. #95
- 2026-10-18: axe 4.14: it now checks Label in Name, so a scanner finds three of the audit room's twelve barriers. #92

Older work is in the merged pull requests and, up to 2026-10-16, in
[docs/history/2026.md](docs/history/2026.md).
