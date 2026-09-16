# The listening room — scope

The second practice page, P·02. The audit room (P·01) taught the hunt:
tools on a static page, and the gap between what a scanner finds and
what is there. This room changes the instrument. The page is built so a
scanner passes it outright, and every planted barrier is something you
hear before you can see it: a wrong name, a wrong language, a wrong
order, a missing structure. The lesson of P·01 was "a scanner finds two
of twelve". The lesson here is the other half of the coverage matrix:
what the ear finds that no rule set ever will.

Like the audit room, this document is the scope to settle before any
code. Phases at the bottom; open decisions marked ⚑ throughout.

---

## The two rules that shape everything

**Isolation, unchanged from P·01.** The broken page is its own document
(`/broken-press-kit.html`, noindex), built without this site's styles,
layers or safety nets, embedded as an inert half-scale preview and
hunted at 1:1 in its own tab. One announced region, a skip link past
it, nothing inside it required to operate the room. No motion this
time, no audio, nothing timed, so the contract needs no warning beyond
the boundary announcement.

**Scanner-clean by construction.** The page must pass axe's WCAG rule
set with zero violations. That is not a hope, it is the build
constraint: every barrier is chosen because the rule that would catch
it does not exist, is switched off by default, or is satisfied by
something technically present and semantically wrong. The page also
gets proper landmarks (`header`, `main`, `footer`) and a real heading
outline below the broken h1, so axe's best-practice landmark rules stay
quiet and the best-practice count is the planted set, nothing else.
Everything in the broken page that is not a planted barrier is done
right. A visitor who finds something not on the list has found a bug in
the room, and the inverted spec exists so CI finds it first.

## The fiction

**The Fitis press kit.** Same universe as the audit room, a different
artefact: the electronic press kit a venue or a journalist would be sent.
An English intro, a short German band biography, three press quotes, six
press photos with download links, the technical rider as a table, the
setlist, the tour dates, social links, a contact block. Every barrier
slot has a natural host: a press kit is image-heavy and bilingual, which
is exactly where alt-text and language judgments live. It is personally
mine, it sells nothing, every link inside it is a stub, and the one real
link, fitis-band.de, stays in the room's outro as before.

**Facts are facts** (corrected 2026-09-15). The band is real, so anything
the page states about the band matches fitis-band.de: the four-piece
line-up and its instruments, the sound, the EP title, its six tracks and
its July 2025 release. Only the things a mock genuinely needs may be
invented, and the room's outro names them: press quotes, the review,
photo captions, venues and dates. A first draft fabricated a line-up, a
label and a founding story, which is exactly the failure mode to avoid
when the fiction borrows a real name.

The German stays short, four sentences at most. The point is to hear
English phonemes applied to German, not to make an English-reading
audience read German. One German phrase is tagged correctly on purpose,
the EP title "Alles auf Anfang" in the intro, so the ear has a control:
hear the title pronounced right, then hear the biography pronounced
wrong.

Styling as for P·01: deliberately ordinary, not the blueprint system,
framed on the drafting sheet like an artefact pinned for review.

**Types, not themes** (decided 2026-09-15). What varies across the
P-series is the *type* of thing under test, not the story around it.
P·01 is a release page, this one is a press kit, and the rooms after it
should reach for a settings page, a booking form, a component library, a
shop: each type carries its own natural barriers, and repeating a type
teaches the same lesson twice. The band fiction is a convenience, it
saves inventing a world for every room, and it is never a constraint.
The day a type does not fit the band, the band goes and the type stays.

## The barrier list (eleven, as shipped, in DOM order)

Chosen so that a scanner's default rule set finds none, a screen reader
finds all, and the tree pane confirms what the ear caught. Spread across
1.1.1, 1.3.1, 1.3.2, 3.1.2 and 4.1.2, which gives 3.1.2 Language of
Parts and 1.3.2 Meaningful Sequence their first home on the site.

| # | Barrier | Criterion | Caught by |
|---|---------|-----------|-----------|
| 1 | The h1 is an inline SVG wordmark with no `<title>` and no role, so the heading list opens with an empty level-one heading; the first body heading is an h4 after the sidebar’s h2, because h4 had the right size in the design | 1.3.1 (and 1.1.1 for the wordmark) | rotor heading list; the one barrier a scanner half-sees: empty-heading and heading-order, best-practice only |
| 2 | A decorative divider `<img alt="divider ornament">` between every section, eight of them, read aloud where `alt=""` would silence it | 1.1.1 | ear (noise between sections); tree; scanner silent |
| 3 | The facts sidebar (line-up, sound, release date, contact) first in the DOM and moved to the right with CSS `order`, so continuous reading hears the facts before the page has said who the band is | 1.3.2 | continuous reading; the source-order viewer in the accessibility pane (A·04); scanner silent |
| 4 | The German biography with no `lang="de"` on a page whose `html` is `lang="en"`, so the synthesizer reads German with English phonemes; the EP title in the intro is tagged correctly as the control | 3.1.2 | ear only; valid-lang passes, nothing is invalid |
| 5 | A stale `lang="fr"` copied from a template onto the English press quotes: a valid code, the wrong language | 3.1.2 | ear; tree shows the inherited language; scanner silent |
| 6 | Hero photo alt begins "Image of the band Fitis…", so the reader announces the word image twice; the six thumbnails under it carry distinct, correct alt text as the control | 1.1.1 | ear (the double word); tree; image-redundant-alt cannot fire here |
| 7 | The technical rider table with `role="presentation"` added to lose the borders, proper `th` cells underneath, so cells are read as loose text with no row or column context | 1.3.1 | ear (table navigation goes dead); tree; presentation-role-conflict cannot fire here |
| 8 | The setlist as a paragraph with `<br>` and typed dashes instead of a list, so no "list, 6 items" is announced and the rotor cannot jump by list | 1.3.1 | ear (no list semantics); tree; scanner silent, nothing is a list |
| 9 | The tour dates block left `aria-hidden="true"` from a demo where it "cluttered VoiceOver": sighted visitors see four dates, screen reader users hear none; nothing inside is focusable, so aria-hidden-focus stays quiet | 1.3.1 / 4.1.2 | ear (silence where the eye sees content); tree; scanner silent |
| 10 | The press-review rating drawn as `::after { content: "★★★★☆" }` on an empty span; all three browser engines expose the glyphs in the tree, and what a screen reader makes of them depends on its symbol handling | 1.1.1 / 1.3.1 | ear (engine-dependent, which is the lesson); tree shows generated text; scanner silent |
| 11 | Social links whose icon SVG carries its own `aria-label="Instagram"` next to the visible word, so the computed name is "Instagram Instagram" | 1.1.1 / 4.1.2 | ear (the stutter); the name-computation chain in the tree; link-name passes, a name exists |

Twelve slots drafted; eleven shipped. **Cut: the six press photos whose
alt repeated their captions**, a third repetition of the
doubling theme already carried by the hero alt and the social links,
with the same fix as the first. Those six photos now carry correct,
distinct alt text and serve as a second control, so the ear hears good
alt and bad alt in the same section. The star rating (#10) stayed:
it is the only generated-content barrier and the only one whose answer
differs per engine, which is worth teaching.

**Measured 2026-09-15, and it corrected the prediction.** Under the WCAG
rule set axe reports nothing, as predicted. With the best-practice rules
switched on it reports **two**, not the predicted four, and both trace
back to the same barrier: `empty-heading` on the unnamed SVG h1 and
`heading-order` on the h4 below it. The other two predictions cannot
fire at all, for reasons in axe 4.12's own checks rather than anything
about this page:

- `image-redundant-alt` compares the alt to the whole visible text of
  the nearest `button`, `a[href]`, `p`, `li`, `td` or `th` ancestor.
  Each photo sits in an `li` that also holds its download link, so the
  texts never match. A `figure` and `figcaption` pair alone does not
  match the selector at all.
- `presentation-role-conflict` fires only on an element that is
  focusable or carries a global ARIA attribute. A plain
  `role="presentation"` table is neither, and its `th` cells do not
  create a conflict for axe.

Both numbers, zero and two, are pinned by the spec below, so the Monday
dependency bot fails loudly the day axe moves a rule between tag sets.
The room's copy says two.

Rejected: an unexpanded abbreviation (3.1.4 is AAA, and the house rule
holds barriers to A and AA); a Safari-only list-style quirk (engine
trivia, not a barrier); live regions and focus management (script, out
of lane, named once in the answers); CSS `speak` tricks (unsupported
everywhere, so not hearable).

## The hunt

Paper-simple, native elements only, the P·01 shape with one change of
order and one new line per answer:

1. **Intro** states the contract: eleven barriers, all inside the
   marked broken page, nothing outside it is broken, answers below.
   Then the instruction that makes this room different: open the page
   at 1:1, start the screen reader, and run A·03's fifteen-minute plan
   first (headings list, links list, continuous reading, then the
   table and the form controls). Open DevTools second, to confirm what
   you heard in the tree. The intro says plainly that two of the
   barriers cannot be seen at all, and that a scanner will tell you the
   page is fine.
2. **The broken page.**
3. **Answers**, one `<details>` per barrier, hint first ("Barrier 4:
   something in the biography sounds wrong"), nested `<details>` for
   the reveal. Each reveal carries, in this order: **heard** (what the
   screen reader actually announced at that spot, as a short
   transcript), **should say** (the announcement the fix produces), the
   criterion linked to the timeline, the layer that catches it linked
   to proof, and the fix, linked to craft or the agent skill. The heard
   line is what lets a visitor without a screen reader on hand still
   learn the room, and it is why the transcripts must be measured, not
   imagined.

⚑ Which engines to transcribe. VoiceOver with Safari on macOS is
available here and is the baseline. NVDA with Firefox on Windows is the
other pair A·03 teaches; if it cannot be measured before shipping, the
answers say "VoiceOver" rather than "screen readers" and the NVDA
column is added when it can be. Where engines differ (#11 in
particular), the answer states each engine's behaviour rather than
averaging them.

Considered and rejected, as in P·01: any found-counter or self-check.
The hunt is the mechanism; the answers are the only apparatus.

## Screen reader fairness, inverted

In the audit room, screen reader users got a different first-finds
order. Here they get the room's native mode: every barrier surfaces in
the first pass of the fifteen-minute plan, and the tree pane only
confirms. It is sighted visitors without a screen reader who get the
adapted version, through the heard lines in the answers. The intro says
so, and the boundary announcements, the skip link and the end marker
work exactly as in P·01.

## Testing

The room leaves the normal axe sweep and gets its own inverted spec,
with three parts:

- **Two rule sets, two exact answers.** axe scoped to the broken page
  with the WCAG tags must report `[]`. axe with the best-practice tags
  added must report exactly the documented set, same rules, same
  counts. Everything outside the broken page, WCAG tags, must be clean.
- **The tree, pinned.** The barriers a scanner cannot see are asserted
  through the accessibility tree instead: the level-one heading has an
  empty name; no `list` role exists inside the setlist section; no
  `table` role exists inside the rider section; the tour-dates section
  exposes no text; the biography carries no `lang`; the social link's
  computed name is the doubled word. Playwright's role queries and
  `toMatchAriaSnapshot` on the relevant sections do this without a
  screen reader in the loop, so CI fails the day a refactor accidentally
  fixes a barrier.
- **Keyboard spec** for the skip route and the details tiers, shared
  with P·01, across the usual three engines.

The heard transcripts themselves are not pinned; they are measured by
hand and dated in the answers, like the map's sources-read stamp.

**Status 2026-09-16:** the transcripts shipped as predictions read from
the accessibility tree in VoiceOver's phrasing, and the answers intro
says exactly that. The recorded VoiceOver pass (NVDA when a Windows
machine is at hand) is still owed; when it lands, the intro drops the
caveat and the answers gain a dated stamp.

## Wiring

- **Shared frame first.** ⚑ Factor the room chrome out of
  `AuditRoomView` into `src/site/PracticeRoom/`: one component for the
  frame (title, lede, contract with skip link, the inert preview and its
  tag, the end marker, the outro pager) and one for the two-tier answers
  list. The audit room re-mounts on it with no visible change beyond the hint
  separator, which moves from an em dash to a colon under the house rule,
  and its existing spec proves that before this room is started. Two rooms on one
  frame is the point where a third copy would be a mistake.
- Own entry: `listening-room.html` + `src/entries/listening-room.ts` +
  `ListeningRoomView` on the shared frame. Sheet number `P·02`,
  "Listening room". The broken page at `public/broken-press-kit.html`.
- Hub: a second row in the Practice list: "A page a scanner passes.
  Eleven barriers you hear before you see, answers included."
- Pager: P·01 points on to P·02; P·02 points on to the reference sheets.
  A·03's "what fifteen minutes doesn't prove" gains a sentence pointing
  here as the place to hear it. Proof's coverage matrix gains one
  sentence pointing at a whole page that passes the scanner column.
- Sitemap and llms.txt Pages list gain a row; a11y.spec excludes the
  broken page; README, ROADMAP and a what-changed line (a new thing
  here to try) follow.

## Phases

1. **Scope review**: this document, torn apart and locked.
2. **The frame**: `PracticeRoom` factored out, the audit room on it,
   every existing spec green with no visual change.
3. **The press kit**: the page with all planted, landmarks and headings
   otherwise right, the German kept short. Measure both rule sets on the
   built page and fix the list until the numbers are exactly as
   documented. Cut to eleven.
4. **The transcripts**: the VoiceOver pass, one heard line per barrier,
   dated; NVDA if available. Owed as of 2026-09-16.
5. **Answers**: hints, reveals with heard and should-say lines,
   cross-links.
6. **Test rig**: the two-rule-set spec, the tree assertions, the
   keyboard spec, exclusion wiring.
7. **Ship**: wiring above, manual screen reader, keyboard and
   forced-colours pass, the what-changed line, deploy by merge.

Each phase is one reviewable change; nothing merges until its spec is
green.
