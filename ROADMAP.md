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
  rounded-polygon "You are here" tag, the standards map's exclusive details,
  ::details-content and :has() bubble) — but treat "does the site dogfood
  this?" as a standing design test, and keep hunting for places where a
  showcased feature can do real chrome work with personality. Playfulness is
  a feature, not a garnish.

### Scroll affordances (Argyle pass, 2026-09-16)

Mined from Adam Argyle's CSS Day 2025 talk and its CodePen collection; the
first three items shipped (see Done). Still open, in order: a scroll-shadow
scroll hint built on scroll-driven animations (`@property` percentages
animated on `scroll(self inline)` with `animation-range`), dogfooded on the
code blocks and the coverage matrix, which overflow sideways at phone widths
where the scrollbar is overlay and invisible until touched; no static shadow
as the fallback, because a shadow that stays at the end claims more than
there is. The carousel's buttons placed outside the strip when the container
has room and inside when it does not (his container-query trick), with the
pressed scale and flat disabled state as polish. A staggered entrance with
`@starting-style` plus `sibling-index()`, Baseline since 2026-08-18, as a
third block in the starting-style showcase or its own entry. The peek-a-boo
overscroll pseudo-element only as an easter egg, reduced-motion gated.
Rejected for this site: `::-webkit-scrollbar`, `scrollbar-width: thin` on
anything a hand grabs, dropping the scroller outline in favour of the thumb
colour, and the Switch demo's sounds, haptics and `scrollTo`.

### Positioning & wayfinding (review 2026-08-31)

Full findings and the tiered work program live in
[docs/positioning-review.md](docs/positioning-review.md). Verdict: the
argument and the destinations are strong, but the site under-states its own
identity
(llms.txt describes it to machines better than the hub describes it to
humans), the routing layer above the chapters lacks task words, and, until
September, nothing user-facing said the site changed. Tier 1 (copy) largely applied
2026-08-31: hub lede states claim + mechanic + audience, plate descs became
outcome contracts with counts, coverage-policy sentence on the Standard
intro (the 2.4.7 trap), boring-prose rail labels, three syntax-only
showcase titles renamed, standard→craft bridge line. Tier-1 remainder:
per-chapter intro contract sentences, craft's closing agent-skill echo.
Tier 2 items 1 and 2, the what's-new block and the Atom feed, shipped
2026-09-13 (see Done). Tier 2 remainder, each its own change: task-index
sheet (A·05), criterion cards registered in the Standard rail, glossary as
concept router, error-cluster cross-links, Baseline-movement sentence in the
showcase intro (the Monday bot feeds the what-changed block, the intro still
says nothing), agent-skill date stamp, bug-template llms mirror, and a
chapter-level "last changed" stamp in each chapter's title block, derived
from the newest revisions.ts line for that area (no second registry, no
counts, no unread badges). Tier 3 is the deferred
per-section-pages split, which these findings strengthen — the task index
becomes its IA. Explicitly rejected: quizzes, progress marks, time
estimates, search, newsletter capture (see the doc's "deliberately not
doing" list).

### Contextualism pass (Argyle, 2026-09-18)

Mined from Adam Argyle's CSS Day 2026 talk "Contextualism", a list of about
seventy things a component can know, ending in prop-for-that, a JavaScript
library that publishes runtime state as custom properties. About two thirds
of the list was already on the site. Every candidate went through three
refuters (site fit, the accessibility claim, buildability); the claims below
are the narrowed versions that survived, and the criteria named are the ones
that held. Shipped in two changes (see Done): the chapter bar's
`:focus-within` exit, the slide-away that keeps it off a focused control and
the gated `view()` reveal; then the JavaScript paragraph in proof, the live
submit button in the validation section and the scroll-state sentence about
the focus exit. Still open, in order:

1. "Reduced, not removed": under reduced motion the craft spinner and the
   loading shimmer freeze and stop saying busy. Where the animation is the
   status, swap motion for a slow opacity cue (WCAG's definition of motion
   animation excludes opacity), bounded or tied to a real loading state
   (2.2.2), floor around 0.4, cycle of 2s or slower. Spinner and shimmer
   only; pulse and progress stay frozen so freeze-by-default remains the
   message. Needs an opt-out from the 0.01ms sweep in `preferences.css`,
   which no component can take today although the file's own comment
   promises one. The mechanism is a deliberate choice, not a detail.
2. Craft "Glass that keeps its contrast": the tint alpha is the contrast
   budget, blur is decoration, the preference query is a courtesy.
   `--color-surface-glass` measured 2026-09-18 over the worst-case backdrop:
   primary text 9.52:1 light and 4.81:1 dark, subtle text 3.76:1 and 2.1:1,
   both failing; about 85% alpha passes. 1.4.3 only.
   `prefers-reduced-transparency` is Chromium-only, so the base tint must
   pass without it. By-product: `CssCarouselDemo` uses the token with no
   reduced-transparency guard.
3. Craft "More contrast, on request": `prefers-contrast` is honoured
   site-wide and taught nowhere. Audience is Increase Contrast on macOS and
   iOS; Windows contrast themes arrive as `forced-colors`. Serves the intent
   of 1.4.6 without producing conformance; 1.4.11 only for a real control
   and the ring.
4. Containment clips the focus ring: `contain: paint | content | strict` and
   `content-visibility: auto` clip a focused child's outline at the padding
   edge, so a contained box needs padding of at least ring width plus
   offset. 2.4.13, and 2.4.7 only when the ring is clipped entirely. Its own
   small figure beside the defensive layouts demo, plus one sentence in the
   content-visibility entry.
5. The 1.3.4 demo on a real orientation query: `container-type: size` on the
   device frame and `@container (orientation: …)`, so the copy's "the
   content simply adapts" becomes true. Say that the container query stands
   in for the page-level media query, keep the "unless essential" exception
   (failure F97), and take `role="alert"` off the CSS-toggled notice.

Weak but honest, in this order: print styles as a parallel to WCAG and not a
conformance target (the repo has none; no forced backgrounds, no `attr(href)`
on every link); "the label that stays", with `:placeholder-shown` as an
emptiness guard being the un-obvious correct use of the talk's floating-label
selector; a dark island set with `color-scheme` beside a hand-painted twin
(the one real failure is inherited light text inside a light-scheme control);
readonly versus disabled as a craft note (bare `:read-only` also matches a
paragraph); `@scope`, where proximity only decides between selectors that tie
on specificity, so inherited custom properties remain the stronger fix. Fun
only: a `sibling-count()` footnote on quantity queries, inside the cap the
watchlist already sets.

Waiting on an asset: the media state showcase (see the watchlist) needs a short clip with
captions and a transcript, and Playwright 1.63 or later, because the bundled
Chromium 149 predates `:playing`.

Housekeeping found on the way, none of it a user-facing defect:
`SiteFrame.scss` still says `100vh` where the reset says `100svh`; the
`env(safe-area-inset-bottom)` on the chapter bar resolves to 0 because the
viewport meta has no `viewport-fit=cover`; the cq-units clamps have no rem
term in their preferred value, so that snippet teaches a zoom-resistant form
(1.4.4).

Rejected, with the reason worth keeping: prop-for-that as a dependency or a
named recommendation (global providers rewrite `:root` on every pointer move
and scroll frame, and its docs carry no reduced-motion or announcement
guidance); pointer tilt, parallax and the following eye (2.3.3, pointer-only
state); the reveal-once latch held at opacity 0 (focusable content nobody can
see); a slider value or words painted with `counter()` and `content` (the
visible and the accessible value diverge, F87); battery, network and frame
rate tiles (no cross-engine support and no fallback, and the `prefers-*`
features already carry the person's intent); the GRAD axis (no font on the
site has one and `@supports` cannot detect axes); the anchor interpolated
morph (no accessibility benefit, Chromium-only, and a hover morph was already
tried and cut); colour fonts (the site's first web font, nothing in Safari);
`::selection` styling (the default highlight is the reader's own OS setting);
concentric corners (the tokens resolve to 0); counters for the testing
layers (the markup does not match).

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
break-it already exists). Understandable: was thinnest — 3.3.7, 3.2.6, and
now 1.3.5 cover it; 3.1.1/3.1.2 remain absent or unnamed. Robust: the site
*is* the demo (landmarks, headings, native elements) but never teaches the
hiding-technique decisions every dev gets wrong; status messages (4.1.3)
are JS and should be named as out of lane, not skipped silently.

Proof-chapter candidates (the premise says "audit effectively and
efficiently" — the chapter argues the model, these teach the practice):

- **The audit room** — BUILT 2026-08-01 (see Done); the scope that
  drove it stays in [docs/audit-room-scope.md](docs/audit-room-scope.md).
- **The listening room** — BUILT 2026-09-15 (see Done); the other half of
  the coverage matrix, a page a scanner passes with eleven barriers you
  hear first. Scope in
  [docs/listening-room-scope.md](docs/listening-room-scope.md).

Structure: nothing above needs a fifth pillar. Understandable items feed
the timeline, the hiding/stress work feeds craft, audit practice feeds
proof, and cheat-sheet material extends the title-block reference sheets
(A·03, A·04…) the way glossary and agent-skill already do.

Out of lane — now stated on the site ("Where this argument stops", end of
proof): captions/media (no media on the site), 4.1.3 live regions, ARIA
authoring patterns, focus management — JS mechanisms; the section points
at the ARIA APG.

### Practice rooms

Decided 2026-09-15: the P-series varies **the type of thing under test**,
not the story around it. A press kit, a shop, a component library, a form
flow: each type carries its own natural barriers, and a room that repeats
a type teaches the same lesson twice. The band fiction is a convenience,
never a constraint; it stays only where it saves inventing a world, and
any room is free to leave it. Rooms that force the theme onto a type it
does not fit get rejected on that ground alone.

Planned, in build order, each still a candidate until its scope is
written and reviewed:

- **P·03 settings room**: a settings page, and the state-and-preference
  barriers a static page cannot host.
- **P·04 booking form**: a multi-step form flow, where errors,
  instructions and grouping do the damage.
- **P·05 review desk**: a component library sheet read as an auditor
  would read it, one component at a time.

### Watchlist (too early / conditional — revisit)

- WCAG 2.2 timeline coverage — settled at 5 of the 9 new criteria (2.5.8,
  2.4.11, 2.4.13, 3.2.6, 3.3.7); the rest assessed July 2026 and skipped on
  purpose: 2.4.12 near-duplicates the 2.4.11 demo at AAA, 2.5.7 and 3.3.8
  need JS mechanisms to break honestly.
- `text-box` (trim) — Chrome + Safari; typographic alignment with only a
  modest a11y angle; take it only if a showcase gap needs filling.
- Subgrid card alignment — only if criteria/showcase cards ever sit side by
  side; verify the layout before building.
- Media state pseudo-classes (`:playing` etc.) — re-checked Sep 2026: Chrome 152
  (25 Aug 2026) shipped all seven, so they are Baseline newly available
  (Firefox 150, Safari 15.4). No longer blocked: a demo can style state on a
  native `<video controls>` without script. Ready whenever a slot wants it.
- `text-fit` (a.k.a. the `text-grow`/`text-shrink` proposals) — assessed
  July 2026: no engine ships it, so it can't be demoed honestly. The a11y
  case is real but double-edged: *grow/fit* would retire images-of-text and
  SVG `textLength` hacks for display headlines (real text that translates
  and reads aloud), but *shrink per-line* can quietly fight the user — bump
  your font size and the algorithm shrinks it back to fit, a 1.4.4 failure
  mode with the same flavour as `maximum-scale=1`. If it ships: demo it as
  display-type-only, never body or functional text, and lead with the
  shrink caveat. Update Aug 2026: Chrome 150 shipped it, so the condition is
  met and the framing above is the build spec; passed over for wave 11 while
  single-engine, ready whenever a limited-tier slot wants it.
- `sibling-index()` / `sibling-count()` — re-checked Sep 2026: Baseline newly
  available since Firefox 154 (18 Aug 2026), but the payoff is still
  aesthetic; at most a footnote on the quantity-queries showcase.
- `border-shape` — spec still in flux; candidate for the anchor-tooltip
  arrow. Its corner cousin `corner-shape` shipped in Chrome 139 and joined
  the showcase in wave 11.
- Overscroll areas / built-in gestures — early spec discussion.
- Scoped view transitions (`element.startViewTransition`) — Chrome-only JS API.
- Interop 2027: proposals close 23 Sep 2026, the scope is published 4 Feb
  2027. When it lands, re-check the seven "Interop 2026 focus area" labels on
  the cards, the showcase intro's Interop link and the two wpt.fyi links in
  src/showcases/registry.ts (the header and the Interop entry), and see
  whether any feature above made the cut.
- Standards map, neighbour glide: when the open card spans the row, the
  displaced card hops instead of gliding; pure CSS cannot animate a reflow.
  A same-document View Transition around the toggle would, but that is
  script. Parked as a deliberate call, not forgotten.

### Standards re-checks (dated)

The map and the timeline carry claims with expiry dates. Re-read the primary
source before touching the wording or the sources-read stamp in
`standardsMapData.ts`.

- EN 301 549 V4.1.1 (WCAG 2.2 AA): published by ETSI, not yet cited in the
  Official Journal. Re-check December 2026; when cited, the EAA chain moves
  to the 2.2 row and the "arriving" note goes. Canada's ACA cites the 2024
  Canadian adoption of V3.2.1, so it stays at 2.1 AA regardless.
- WCAG 3.0: next working draft expected Q4 2026 (the 3.0 row note says
  "late 2026" and must follow it); Candidate Recommendation snapshot targeted
  Q4 2027.
- WebAIM Screen Reader Survey 11: closed 31 Aug 2026, results pending.
  When published, refresh the Survey 10 numbers in A·03 and proof in one pass.
- ADA Title II: the April 2026 interim final rule (26 Apr 2027 and 26 Apr
  2028) is challenged in court, no ruling yet; the phase-in wording holds
  until one lands.
- axe-core 4.13 changes rule behaviour; when bumping, re-run the audit-room
  spec that pins exactly two findings, and bump `@axe-core/playwright` in
  the same change, or it nests its own axe-core and the pin stops governing.

### Owed checks

- Safari 27 (14 Sep 2026): add the what-changed line for customizable select
  in a second engine (the bot's own line later is dropped as a duplicate: same
  href, same engine, within 60 days); re-test the StyleQueryCuesDemo claim that Safari skips
  pseudo-element rules inside style queries and qualify it with the last
  affected version if fixed; the sample bug report in proof names Safari 26.
- A real-Chrome check of the cross-document transitions and the theme
  no-flash on the live site after a deploy, still owed from
  [docs/prerender-scope.md](docs/prerender-scope.md).

---

## Standing decisions

- **No JS in demos** — if pure CSS/HTML can't do it, drop the idea; tiny Vue
  state is acceptable only to simulate external context (a CMS, a fetch),
  never the mechanism being taught.
- **Interaction earns its place only when it IS the lesson** — as in the
  break-it toggles. "Make X more interactive" is a trap framing; two
  additions built on that framing were rejected the same day they were
  tried (breakage tally: reads as surveillance; the old legal map's
  jurisdiction picker: the eye filtered four cards faster than any control).
- **No learned-affordance features** — mechanisms a visitor must first
  learn (keyboard shortcuts, custom gestures) are the opposite of
  invisible/native accessibility; a pull toward nav conveniences is a flow
  problem to fix structurally. Leaves 2.1.4 uncovered by choice.
- **Metaphor lives in ornament and prose** — never in labels, link text, or
  group names; mono-caps never marks a bare link in text flow. (Klara's
  wayfinding round.)
- **Form validation demo stays CSS/native-only** — the JS layer (validation
  message wiring, submit gating) is deliberately out of scope. Since 2026-09
  the two fields sit in a real form with a live submit button and a simulated
  "nothing was sent" response: that is the external context the first rule
  allows, and the opposite of gating.
- **Runtime state published as custom properties: not doing.** A custom
  property is not in the accessibility tree, and most of the states such
  libraries publish mirror pseudo-classes that already exist. Where a script
  is the right tool it writes into the document (an element, an attribute, a
  status message, focus) and CSS styles from that. Stated on the site in
  proof's "Where this argument stops".
- **Scroll-driven custom-property color: rejected** for performance; don't
  re-propose custom-property scroll animations.
- **Style queries are reserved for non-color cues** — the theming core uses
  plain custom-property inheritance on purpose.
- **CodeBlock `<pre>` keeps its permanent tabindex** — conditional focus
  needs JS; accepted trade-off, mitigated by closed-by-default `<details>`.
- **View-transition scrubbing / FLIP keyframe optimization: not doing** —
  deep JS, against the house rules.
- **Comments: zero by default.** The code says what; the reasoning lives in
  commit messages, this file, or GUIDE.md. A comment that seems load-bearing
  is proposed in review first (see GUIDE.md).
- **What earns a what-changed line.** What moved in the platform and the
  standards, and what it changed here. A line goes in only if a reader can
  act on it: a platform or standards fact with its consequence on the site,
  or a new thing here to try. Never plumbing (prerender, the 404 page,
  durations belong in git). One sentence, exactly one link, to the primary
  source or the place on the site.
- **Automation lives in CI, not in the site.** The weekly Baseline-moves bot
  and the deploy workflow are repository tooling like the build-time
  generators in `scripts/`: no runtime dependency, no site JavaScript,
  nothing the served pages execute. The bot proposes, a person merges.

---

## Done

One line per item, newest first; details in git history / PRs.

- **2026-09** JavaScript as the second question, and a submit button that stays alive (the second change from the Contextualism pass, above). Proof's "Where this argument stops" gained a middle paragraph: first ask whether the platform already knows the state; where it does, a script copy is a second source of truth and the two drift; where it does not, characters remaining being the example, the script writes into the document (an output element, an attribute such as `aria-pressed`, a status message, focus), never only into a custom property, because a custom property is not in the accessibility tree: it can change how something looks, but it is not a name, a state or a message (4.1.2, 4.1.3, failure F87). The example attribute is `aria-pressed` on purpose: `aria-invalid` and `aria-expanded` would be the second source of truth the paragraph warns about, and `aria-busy` is barely announced. No library is named, nothing is demoed, and the claim stays clear of "screen readers cannot read generated content", which current engines disprove. The validation section's two fields now sit in a real form with a live Save button, and a second pair names the talk's `form:has(:invalid) button { opacity: .5 }` for what it is: the premature judgement the section already argues against, moved from the field to the form, since an untouched required field matches `:invalid` from first paint. A truly disabled submit is the harsher variant: it leaves the focus order and removes the one action that makes the browser focus and name the first invalid field. Verified in three engines: an empty submit focuses the name field, which then matches `:user-invalid`; a valid one reports that nothing was sent and does not navigate. The copy says plainly what holds in every engine (Roselli, linked): the native message appears only on submit and for one field at a time, does not rescale if the page is zoomed while it is up, and tells a screen reader that the field is invalid more reliably than why, which is why the hint stays. The five second self-dismissal people remember was Chrome only and went away around Chrome 120, so the copy does not claim it. The form carries `method="dialog"` outside any dialog, which the HTML submission algorithm defines as doing nothing, so a valid Save cannot navigate or lose what was typed even before the script has woken up; the status line counts repeat presses so that a second Save is still announced. The scroll-state showcase now says that a bar hidden on scroll direction owes a `:focus-within` exit, with the site's own chapter bar as the live example (the `scrolled` query is Chrome 144, the three demoed states 133), and its snippet shows the rule with the page scroller as its container. One keyboard spec pins the live button, the browser finding the first invalid field, and the status clearing on edit.

- **2026-09** Scroll affordances, from Adam Argyle's CSS Day 2025 scroller talk: every scroller on the site tints its thumb from the ink token at half strength (3:1 in both schemes; `scrollbar-color` set once on `html` and inherited, width never thin) and turns it to the accent while keyboard focus is inside (`[tabindex="0"]:focus-within` in `base.css`); the craft scrollbar section rewritten around the 1.4.11 and 2.5.8 exemptions an author forfeits by restyling; the scroll-state showcase gained the scrollable state (sticky edge markers shaded only while there is more that way); both snap strips keep their inline-end padding in all three engines (padding moved onto a `max-content` list with `cqi` card widths, because Firefox and WebKit size a flex container's intrinsic width from item content, not `flex-basis`); overscroll containment on every horizontal strip and the coverage matrix.

- **2026-09** The listening room (P·02, the second practice room): a fictional Fitis press kit on its own standalone page (`/broken-press-kit.html`, previewed inert as in P·01) with eleven planted barriers, built so a scanner passes it outright. Measured, not hoped: under axe's WCAG tags the page reports nothing at all, and with the best-practice tags added it reports exactly two findings, `empty-heading` and `heading-order`, both tracing back to the same barrier, an SVG wordmark used as an unnamed `h1`. Everything else is heard before it can be seen: a German biography with no `lang`, a stale `lang="fr"` on English quotes, the facts sidebar first in the DOM and moved right with `order`, a rider table wearing `role="presentation"`, a setlist built from `<br>` instead of a list, tour dates left `aria-hidden="true"`, a star rating drawn in `::after`, an icon `aria-label` that doubles the social link's name, a divider image announced between every section, and a hero alt that starts with "Image of". Two of the scope's four predicted best-practice hits turned out to be impossible against axe 4.12's own checks, which is why the pin is two and not four. The room chrome moved to `src/site/PracticeRoom`, shared with the audit room. Scope and the barrier table: [docs/listening-room-scope.md](docs/listening-room-scope.md).

- **2026-09** Kept current by machine: a Monday workflow bumps `web-features`, regenerates the Baseline data, the agent skill and the feed, and opens a pull request proposing what-changed lines for showcases that gained an engine or reached Baseline (`scripts/gen-moves.mjs`, deduped against hand-written lines by id, or by the same showcase link naming the same engine or tier within 60 days); a deploy workflow runs after a green CI run on main, pushes the build to production, confirms the live site serves it, and comments on the merged pull request; CI gained a gate that fails when the committed skill, llms mirror, feed or Baseline data fall behind their registries. The Monday CI cron went: on a locked package it could never see new Baseline data.

- **2026-09** Chapter bar focus, and scroll-driven reveals taught: three items from the Contextualism pass, above. Two defects in the mobile chapter bar, measured before and after in three engines at 375 by 700. In Chromium the scroll-state queries hide the bar at scroll zero, at the end of the page and after any downward scroll while its links stay in the tab order, and a focused bar link sat at y=701 in a 700px viewport (2.4.7); `.chapter-bar:focus-within` brings it back. In Firefox and WebKit the bar is always fixed, and focused controls scrolled underneath it: of 60 tab stops on craft, 7 were covered in part or in full in Firefox and 9 in WebKit, 2 of them wholly hidden in each (2.4.11 and failure F110 for the wholly hidden ones, 2.4.12 for the rest). The fix is one rule: while `:focus-visible` matches anywhere outside the bar, the bar slides away, so nothing can cover a visibly focused control in any engine, by construction. It leaves pointer users alone except in a text field, which matches `:focus-visible` however focus arrived; there the bar steps aside while typing and returns on blur. After the change, 0 of 60 stops are covered in all three engines. The textbook fix, root `scroll-padding-block-end` (technique C43), was tried first and dropped for two measured reasons: WebKit ignores both `scroll-padding` and `scroll-margin` when it reveals a focused element, and `view-timeline-inset: auto` resolves to the scroller's scroll-padding, so every anonymous `view()` reveal on the page started 64px late and popped (at rest for its first 60px, then opacity 0.04). Under 30em of height the bar returns to the flow: the query is height, not orientation, because 400% zoom on a desktop lands there as often as a phone on its side. Three keyboard specs pin the focused bar link staying on screen, the first 40 tab stops on craft staying uncovered (before the fix the first covered stop was the 25th, so a shorter walk passes vacuously) and the short-viewport fallback; the 60-stop sweep and the pointer check were one-off measurements. The scroll-driven animations showcase gained a `view()` reveal and lost a false payoff line: a timeline ignores `animation-duration`, so the global reduced-motion reset never reaches it (measured: the progress bar still runs under emulated reduce). A reveal moves content and carries its own `prefers-reduced-motion: no-preference` gate, fill mode none, range ended once the row is fully in view. The progress bar is left running as a stated judgement call, a one-to-one mirror of the gesture like the scrollbar thumb, not as an exemption 2.3.3 grants.

- **2026-09** What changed: a dated block at the foot of the hub (`src/site/HubRevisions`, six rows from a hand-kept `revisions.ts` registry, one sentence and exactly one link each) and an Atom feed from the same registry (`scripts/gen-feed.mjs` in prebuild writes `public/feed.xml`; every Vue page shell carries the alternate link, `.htaccess` forces the Atom type, llms.txt lists it). Closes positioning Tier 2 items 1 and 2. What earns a line is a standing decision, above.

- **2026-09** The standards map replaced the flat legal map on the standard page (`src/criteria/StandardsMap`): rows are WCAG versions, each law sits in the row of the version it cites, so the lag is visible (the 3.0 row is empty), and opening a law unfolds the layers between it and the criterion you test (Germany's BFSG ⊃ the EAA ⊃ EN 301 549 ⊃ WCAG 2.1 AA is four; the ADA rule ⊃ WCAG 2.1 AA is two). Zero script: an exclusive `<details name>` accordion, `::details-content` height transitions with `interpolate-size` where supported, a `:has()` bubble that grows the open card to span the row (a flex-basis transition) and eases the siblings back, `corner-shape: squircle` behind `@supports`. Six laws: Section 508, AODA, EAA, ADA Title II, ACA, PSBAR; each links its official text with a hand-set sources-read date. Axe clean after two contrast fixes; the displaced neighbour still hops (see the watchlist).

- **2026-09** Freshness audit (mid-September): the WCAG 3.0 timeline entry reworded for the 10 Sep working draft (one bar of core requirements; supplemental requirements and assertions are extras you report, not higher levels); customizable select copy updated for Safari 27 (14 Sep); legal map (the standards map since the same commit) re-read against ETSI, the Commission, the Federal Register and the Canada Gazette (EN 301 549 V4.1.1 published with WCAG 2.2 AA but its Official Journal citation is pending, so 2.1 AA stays the cited bar; Canada split into the ACA via CAN/ASC-EN 301 549 and AODA at 2.0 AA); two moved MDN links repointed. Confirmed unchanged: ADA Title II's 2027–2028 phase-in under the April interim rule (challenged in court, no ruling), Section 508 at 2.0 AA, all seven Interop 2026 labels, the Survey 10 attributions (Survey 11 still unpublished). web-features 3.35 to 3.38 changes no badge tier.

- **2026-09** Prerendered: every Vue page's served HTML now carries its content (a vite SSR build renders each entry at build time and the client hydrates; the dev server renders the same way through ssrLoadModule, so hydration mismatches surface in development where Vue reports them). SSR-safety pass: the theme composable no longer touches the document at import, ShowcaseFrame's support check and two demos moved browser-API reads to onMounted, chapter pages declare their sections as data so the Contents rail is server-rendered, SVG `use` hrefs bind as attributes. `blocking="render"` retired from production output (it only ever hid an empty mount point; measured hub first paint 956 → 588 ms on a throttled connection) but kept in the source shells for the dev server, where Vite injects CSS via JS and the prerendered page would otherwise paint unstyled — the build strips it by itself. A permanent spec fetches every page's raw HTML and asserts the content. Scope and rationale: [docs/prerender-scope.md](docs/prerender-scope.md).

- **2026-08** The 404 page: a standalone zero-JavaScript blueprint sheet ("Sheet 404 · not in this set") — the "You are here" tag cut with corner-shape bevels pointing at an empty dashed frame, a home button in a quiet corner-shape squircle (a hover morph was tried and cut as ugly; the whimsy moved to ghost numerals that draft themselves via SVG stroke animation, hub-scribble style, plus a ::details-content eased disclosure), light-dark() theming, an @starting-style entrance carrying its own reduced-motion guard, and a native details explaining what the page just did for the visitor. Error pages are where accessibility usually gets forgotten; this one is in the axe suite. Wired via ErrorDocument in .htaccess.

- **2026-08** Search-index hygiene: host-variant 301s (www strips and upgrades in one hop, TLS forced host-preserving so the staging host keeps its own name) plus X-Robots-Tag noindex on the llms mirrors — text duplicates of page content can't carry a canonical, so they're kept fetchable for agents but out of the index. Closes the GSC "duplicate without user-selected canonical" report.

- **2026-08** Wave 11: invoker commands (command/commandfor — dialogs and popovers driven from markup with zero script; Baseline newly available Dec 2025), native error squiggles (text-decoration-line: spelling-error/grammar-error vs the inline-block gradient hack — backgrounds mark boxes, not text), and corner-shape (squircle/scoop/notch as real border geometry the default focus ring traces; the rounded polygon() demo's mirror lesson). Catalog 33 → 36; keyboard specs pin the script-free dialog cycle and the surviving rings. Scouted from a 56-candidate sweep; runners-up and the refuted media-pseudos Chrome rumour recorded in the watchlist. Follow-up from Thomas's testing notes: every showcase card gained a "Focus the demo" skip link (the 2.4.1 pattern doing local work — fragment navigation to a tabindex="-1" demo mount, zero JS), and the corner demo grew per-corner longhands cutting the site's own "You are here" pointer tag with borders and ring intact, plus an animated morph (the keywords are superellipse() curves — interpolation verified in Chromium, computed values sweep squircle through bevel to scoop), with both shape showcases now naming when to reach for which tool.

- **2026-08** Site-wide accuracy audit (five-agent verify pass against primary sources): five bogus "Interop 2026 focus area" labels corrected, vision deficiencies five→six, WebAIM attribution pinned to Survey 10 (2024), anchor positioning's retracted Firefox support regenerated out, axe-core pinned exactly (web-features stays a caret range, held by the lockfile until the Monday bot writes it exact). The big one: WCAG 3.0's March 2026 draft dropped graded scoring for binary core requirements + supplemental levels, so the ConformanceShift demo was rebuilt honest — and then retired, because at the base level the new model behaves like AA and a slider demonstrating "same" teaches nothing; the timeline's era entry now carries 3.0 alone. Dated re-checks live in the watchlist above.

- **2026-08** The audit room (P·01, the practice capstone): a fictional Fitis EP release page with twelve planted barriers on a standalone broken page (`/broken-page.html`, previewed inert at 1:2 in a red-dashed frame), hint-then-answer via nested `<details>`, and the inverted spec pinning axe to exactly two findings (`image-alt`, `color-contrast`) — label-in-name turned out to be experimental-off in axe, so "two of twelve" became the coverage lesson. Hub gained the "Practice" section; proof's pager now ends there; the room hands off to the reference sheets.

- **2026-07** Wave 10: 1.3.5 Identify Input Purpose joined the timeline as break-it criterion eleven (token-less twin form — CSS can't remove attributes, so the break swaps twins; captions honest about depending on the visitor's saved autofill), and `content-visibility` became showcase 33 (find-in-page as the interactive proof: "cardamom" findable inside a skipped section, "saffron" invisible in a display:none appendix). Understandable is no longer the thinnest principle.

- **2026-07** `/llms.txt` shipped: the skill's four markdown files (SKILL.md + the three generated references) are mirrored to `public/llms/` by gen-skill.mjs, and a hand-written index at `public/llms.txt` points agents at them plus the pages. The "needs page-level markdown" blocker had quietly dissolved — the skill already emitted it.

- **2026-07** Reference sheet A·04, "DevTools for accessibility": the built-in inventory (accessibility pane, color-picker contrast, inspect tooltip, Rendering emulations, emulate-a-focused-page, live expressions with document.activeElement, Lighthouse-is-axe, Firefox's inspector) and the three add-ons that pass the "does something the panels can't" test (axe DevTools, Accessibility Insights, WAVE). The thesis transposed to tooling: built in, not bolted on. Idea from a conversation about extensions rebuilding native features.

- **2026-07** Proof gained "Filing what you find" (first titled with "triage" — renamed for plain words): severity as user impact (blocked? how often? workaround?) instead of conformance level, one barrier per ticket, and a copyable bug template filled in for a fictional checkout — barrier headline, AT+browser pair, criterion once as reference, suspected fix as the swap.

- **2026-07** Proof gained "Reading the accessibility tree": four live examples (styled div vs native button vs `<label>` vs `aria-label`) with role/name/source readouts, DevTools directions per browser, and the name-computation precedence; new glossary term "Accessibility tree". The demo's captions invite verification in DevTools instead of asking to be believed.

- **2026-07** Reference sheet A·03, "A screen reader's first fifteen minutes": VoiceOver/NVDA/phone keystroke cards, the fifteen-minute plan, and a "what this doesn't prove" close; linked from the title block on every page and from proof's human layer.

- **2026-07** Craft wave: the hiding matrix (four techniques × visible/tree/tab-order, live inert example, the aria-hidden + `tabindex="-1"` pairing shown) and the 1.4.12 text-spacing stress test (toggle applies the reader's override values; the fixed-height card clips, the flexible one breathes). Craft is at twelve sections; rail scope extended to match.

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
- **2026-07** Wave 5: proof pillar pass — "CSS that audits" diagnostic-stylesheet demo (inert example), "performance is accessibility" prose, responsive-reveal card on @starting-style (with the reduced-motion guard the viral snippet skips).
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
