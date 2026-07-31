# The audit room — scope

The capstone of the proof chapter's practice arc. Everything the site
teaches — hear the page (A·03), read the tree, use the toolbox (A·04),
file what you find — gets one place to actually do it: a fictional page
deliberately seeded with a known number of barriers, hunted with real
tools, answers included. Break-it scaled from one rule to a whole page.

This document is the scope to settle **before any code**. Phases at the
bottom; open decisions marked ⚑ throughout.

---

## The one rule that shapes everything

The barriers must be real — and since 2026-08 they are real all the way
down: the specimen is **its own document** (`/audit-specimen.html`,
noindex), embedded in an iframe, built without this site's styles,
layers, or safety nets. Nothing can rescue it. That revision came from
practising in the room: the site's global reduced-motion kill and
preferences-layer focus ring were quietly repairing planted barriers,
forcing a mental jump ("the site is protecting this") that practice
should never require. A separate document is the only boundary CSS
actually respects — `@layer` tricks can't stop universal selectors or
inheritance.

What "never injure the visitor" means under full isolation:

- The specimen is one clearly announced region with a skip link past
  it. Nothing inside it is required to operate the room.
- The room **warns instead of silently protecting**: the contract names
  the unguarded motion (a small bouncing badge) before the frame, with
  the skip route in the same sentence. Reduced-motion users get the
  choice, not the harm by ambush.
- Forced colors still reach into the frame — that preference is
  user-level, not site-level, so it genuinely holds everywhere.
- No keyboard traps, no audio, nothing timed. Traps need JS and JS
  barriers are out of lane; the answers name that boundary once.

In the room itself the specimen appears only as an inert half-scale
preview (an inset drawing at 1:2 — no nested scrolling, nothing to tab
into by accident); the hunt happens at 1:1 in the specimen's own tab.
Side benefit: the standalone URL takes a full-page Lighthouse run, so
"a scanner finds two of twelve" is reproducible by any visitor.

## The fiction

**Decided: an EP release page for Fitis** — my band's real debut EP
"Alles auf Anfang", on a page that is emphatically *not* the band's
real website. Header with nav, cover art and a band photo, a
"Listen now" call to action, the six-track tracklist, (fictional)
tour dates, streaming links, a mailing-list signup, footer. Every
barrier slot has a natural host here, and the fiction is personally
mine — which fits a site whose title block says who drew it.

Guardrails: it's a release page, not a shop (nothing pretends to
sell); every link inside the specimen is a stub, per the room
contract; and the one real link — fitis-band.de — lives outside the
specimen, in the room's outro, so the planted brokenness never
touches the actual band. Corollary: visitors will follow that link
with freshly sharpened tools, so the real site gets its own audit
pass before the room ships.

Alternatives considered: a bakery order page (the site's usual demo
flavor), a meetup landing page. Both work; neither is mine.

The specimen wears its own deliberately generic styling — not the
blueprint system — and sits framed on the drafting sheet like an
artifact pinned for review. The visual seam between room chrome
(compliant, blueprint) and specimen (broken, ordinary) is the framing
device and the accessibility boundary at once.

## The barrier list (draft twelve)

Chosen to spread across POUR, to need different layers to catch (the
coverage lesson, felt), and to be pure HTML/CSS. The split matters:
**a scanner should find roughly a third** — run axe on the room and it
finds four; there are twelve. That number pair is the poster.

| # | Barrier | Criterion | Caught by |
|---|---------|-----------|-----------|
| 1 | The "Listen now" div — styled as the primary button, not focusable, no role | 2.1.1 / 4.1.2 | keyboard, tree pane; axe silent |
| 2 | EP cover art with no alt at all | 1.1.1 | **axe** |
| 3 | Band photo with `alt="IMG_2047.jpg"` | 1.1.1 | human only — axe sees an alt and passes |
| 4 | Visual section headings that are styled `<p>`s (empty rotor outline) | 1.3.1 | heading list, tree |
| 5 | The band's tagline in low-contrast gray | 1.4.3 | **axe**, color picker |
| 6 | Mailing-list email field with placeholder as its only label | 3.3.2 / 1.3.5 | tree pane (name = placeholder), human |
| 7 | Sold-out tour dates carried by red text alone | 1.4.1 | human; CVD emulation proves it |
| 8 | `outline: none` on the signup form inputs | 2.4.7 | keyboard; axe silent |
| 9 | Three streaming links all reading "click here" | 2.4.4 | rotor links list |
| 10 | Tracklist table built of `<td>` only | 1.3.1 | **axe** (partially), tree |
| 11 | Bouncing "OUT NOW" badge with no reduced-motion guard | 2.3.3 | Rendering-panel emulation |
| 12 | `aria-label="subscribe"` on the "Join the mailing list" button (visible words not in the name) | 2.5.3 | **axe** (label-in-name), voice-control story |

**Measured (2026-07-31): axe finds two of twelve** — `image-alt` (#2)
and `color-contrast` (#5). The predicted third, label-in-name (#12),
turns out to live in axe's *experimental* ruleset, off by default — a
sharper coverage lesson than the planned four-of-twelve, so the room's
copy says two and the inverted spec pins exactly that pair. The
placeholder-only label (#6) and td-only table (#10) pass silently, as
predicted.

Rejected: keyboard trap (JS), autoplaying video (no media on this
site), `lang` mix-ups (real harm is pronunciation — hearable but
invisible, weak for a mixed audience; candidate for a future round).

## The hunt

Paper-simple, native elements only:

1. **Intro** states the contract: twelve barriers, all inside the
   marked specimen, nothing outside it is broken, answers below.
2. **The specimen.**
3. **Answers** — one `<details>` per barrier: the summary is a hint
   ("Barrier 3 — one of the photos is lying"), and a nested
   `<details>` inside reveals the answer: what it is, the criterion
   (linked to the timeline), which layer catches it (linked to proof),
   and the fix — which is almost always the swap, linked to craft or
   the agent skill. Nested `<details>` gives hint-then-answer with
   zero JS.

⚑ Considered and **rejected**: a pure-CSS "found 7 of 12" checkbox
counter. It's bookkeeping the visitor can do in their head, it can't
verify anything (self-report), and it adds mechanism where the lesson
is the hunt — the feature-fit filter says no.

## Screen reader fairness

SR users don't get a degraded version of this — they get a different
first-finds order (the empty heading outline and nameless controls
surface immediately where sighted visitors see them last). The intro
says exactly that: different tools surface different subsets first,
and that asymmetry is the coverage lesson wearing another coat. The
specimen boundary is announced before and after; the skip link works.

## Testing (the fun part)

The room leaves the normal axe sweep and gets its own **inverted
spec**: axe scoped to the specimen must report *exactly* the
documented violation set — same rules, same counts — and axe scoped to
everything outside the specimen must be clean. The suite doesn't just
tolerate the broken page; it pins it. If a future refactor accidentally
fixes a barrier, CI fails. Plus a keyboard spec for the skip route and
the details tiers, across the usual three engines.

## Wiring

- Own entry: `audit-room.html` + `src/entries/audit-room.ts` +
  `AuditRoomView` on SiteFrame. ⚑ Sheet number: it's practice, not
  reference — proposal `P·01 · Audit room`, opening a P-series.
- Hub: ⚑ its own single wide card between the plates and the sheet
  index — it's something to *do*, not to look up: "A page broken on
  purpose. Twelve barriers, your tools, answers included."
- Proof's end-of-chapter pager points here; the room's pager points on
  to the reference sheets.
- Sitemap and llms.txt Pages list gain a row; a11y.spec excludes the
  page; README and ROADMAP updated.

## Phases

1. **Scope review** — this document, torn apart and locked.
2. **Specimen** — the bakery page with all twelve planted, framed,
   skip route in place.
3. **Answers** — hints, reveals, cross-links.
4. **Test rig** — inverted axe spec, keyboard spec, exclusion wiring;
   verify the four-of-twelve split against real axe output.
5. **Ship** — wiring above, manual SR + keyboard + forced-colors +
   reduced-motion pass, deploy.

Each phase is one reviewable change; nothing merges until its spec is
green.
