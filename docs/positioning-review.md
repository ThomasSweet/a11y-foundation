# Positioning review — what the site is, and how it says so

Written 2026-08-31. Four analysis passes over the live site and source: the
stranger's first five minutes, task-shaped findability, return visits, and
learning contracts. This doc is the record; work through it in tiers.

## The genre answer

The site is two things, sequentially: **an argument you read once, wrapped
around a working laboratory you return to**. The argument (four chapters)
convinces a visitor one time — that is fine, arguments are supposed to end.
The repeat value lives entirely in the reference layer: the sheets, the
glossary, the Baseline tiers, the portable snippets, the bug template, the
audit room. It is not a course and must not become one; no course
apparatus (paths, quizzes, progress marks) belongs here. What the site
under-does is not content and not interactivity — it is *stating its own
identity*: promise, audience, method, and per-unit contracts. The raw
material for those statements exists, almost none of it where a stranger
looks.

The sharpest single finding: **public/llms.txt describes the site to
machines better than the hub describes it to humans.** llms.txt says
"An interactive argument in four chapters … each criterion with a working
break-this-rule demo." The hub said "arranged along the timeline it grew
on." The word "interactive" — the site's most distinctive property — never
appeared above the fold for a human.

A second structural observation: contract-writing quality on the hub was
inversely ordered. The reference-sheet and practice cards state
deliverables precisely ("The first fifteen minutes: the keystrokes that
matter…", "twelve barriers, your tools, answers included") while the four
main plates — the first thing anyone reads — stayed abstract ("Meeting the
bar with modern CSS and native HTML"). The proof that the register can do
this already sat on the same page.

## One accuracy item, urgent regardless of positioning

The Standard chapter demos 11 curated criteria but never said the set is a
sample. Concretely dangerous case: a visitor asking "what does WCAG require
for focus visibility?" finds 2.4.13 Focus Appearance labeled AAA, does not
find 2.4.7 Focus Visible (AA, not demoed), and can conclude a visible focus
indicator is optional at AA. The coverage policy existed only as a code
comment. Fix: one visible sentence in the chapter intro — these are ~a
dozen recent criteria this foundation itself implements, not the full ~80 —
plus a link to the complete WCAG 2.2 quick reference.

## Tier 1 — copy-only pass

Applied 2026-08-31 (review in the diff):

1. **Hub lede** states claim + mechanic + audience: "Most of what WCAG
   asks for, the platform already ships … That claim runs live on every
   page here … Written for developers who already ship UI; nothing here
   repeats what the rest of the web teaches well."
2. **Four plate descs** became outcome contracts with counts — counts are
   the expert-audience scope signal (a catalog, not a blog post) at zero
   pedagogy cost. The pattern was already proven on the page by the
   audit-room card.
3. **Chapter 03 sub** "Arriving next" mislabeled a chapter whose largest
   tier is Baseline widely available → "Shipping and next", and the desc
   carries the tier idea ("sorted by how safely you can ship each today").
4. **Coverage-policy sentence** in the Standard intro (see above).
5. **Rail labels, boring-prose pass** via the existing railLabel prop:
   the rail is navigation, so it says the task ("Reduced motion",
   "Truncating text", "Scrollbars", "Content stress test", "The break-it
   criteria"); section titles keep their character as ornament.
6. **Standard chapter close**: one bridge sentence after LegalMap ("The
   bar, set. Chapter 02 is how the platform clears it.") — the first time
   the "one argument" thread surfaces at a chapter boundary.
7. **A·02 desc** ported from llms.txt, which had the stronger sentence.
8. **"Used in anger"** (Practice lede) → plain prose; idiom fails
   non-native readers and the site's own nav-label rule.
9. **Three syntax-only showcase titles** gained plain-words qualifiers
   ("shape() responsive clipping", "Typed attr()", "Dialog & popover
   dismissal"). Genuine proper names stay as they are.

Tier-1 remainder, not yet applied:

- One contract sentence at the end of each chapter intro stating what the
  reader leaves with (Proof's model: "By the end: the layers, what each
  catches, and the template for filing it.").
- Craft's closing loop: echo the agent-skill pointer after the twelfth
  section ("Twelve decisions; the portable copy is the agent skill") so it
  reads as the takeaway it already is.
- Optionally, a compact hub method block between lede and plates
  ("Everything runs — no claim here is prose alone. Break it to feel it.
  The site is its own proof — chapter 04's tests audit these very pages.")
  if the rewritten lede alone proves too dense.

## Tier 2 — small structural (each its own change)

Applied 2026-09-13: items 1 and 2 shipped, the block at the foot of the hub
and the Atom feed from one registry, with one reframe. The block is what
moved in the platform and the standards and what it changed here, not a
site changelog; plumbing never gets a line, and every line carries exactly
one link. The Tier 1 bridge sentence (item 6) now follows the standards
map, which replaced LegalMap the same day. Added to the list since: a
chapter-level "last changed" stamp in each chapter's title block, derived
from the newest registry line for that area, so there is no second
registry.

1. **What's-new block on the hub**: 5–8 dated one-liners from a tiny
   hand-maintained registry (the ROADMAP Done lines are already written in
   this shape). The site ships constantly — audit room, two sheets,
   criterion 11, three showcase waves, all post-launch — and nothing
   user-facing says so: no dates, no changelog, no feed. This one change
   fixes both the returning-visitor diff problem and the first-visit
   liveness signal.
2. **Atom/RSS feed** generated from the same registry (sibling script to
   gen-baseline.mjs → public/feed.xml); listed in llms.txt. Gives
   newsletters and lists something durable to subscribe to.
3. **Task index sheet** (A·05, plain title like "Where to find things"):
   a static A–Z of boring-prose task rows mapping task words to existing
   anchors ("Hide content from screen readers → The craft: Four ways to
   hide"). Generate from the registries like the llms mirrors so it cannot
   drift. Today, four of five task-shaped questions start with an
   unassisted chapter guess because task words appear nowhere on the hub.
4. **Register criterion cards in the Standard rail** (heading ids already
   exist) so the 11 deepest destinations are scannable and jumpable.
5. **Glossary as router**: add the missing task vocabulary
   (visually-hidden, inert, aria-hidden, live region, focus indicator) and
   an optional "see it in action" href per term to the demonstrating
   section.
6. **Cross-link the error-message cluster**: craft validation ↔ showcase
   :user-valid / native squiggles ↔ screen-reader sheet step 4 — today a
   three-page answer with no connecting links.
7. **Baseline tiers say what they do**: one sentence in the showcase intro
   — tiers re-derive from Baseline data on every release; when an engine
   ships, cards move. The site's one factually honest "check back later"
   hook, currently unstated. Optional later: a build-time diff rendering a
   quiet "moved up from limited, Aug 2026" line on shifted cards.
8. **Stamp the agent skill**: generated "last regenerated" date in
   SKILL.md and on A·02, plus one sentence that re-running the install
   commands refreshes it. The skill is the one artifact visitors carry
   away, and after the one-time copy it silently drifts — the exact drift
   the build system prevents server-side.
9. **Bug-report template as take-along**: emit to public/llms/bug-report.md
   from the same source ProofPage renders; reference in llms.txt.
10. **Human pointer to the llms mirrors** ("the whole argument as four
    grep-able markdown files") — the site's existing full-text answer to
    "no search".

## Tier 3 — the deferred structural decision, strengthened

The per-section-pages split (already on the books as deferred) is where
these findings point long-term: per-section pages make every task-index row
a real page, every rail label a URL, and every what's-new line a link. The
findings do not force it now — Tiers 1–2 deliver most of the value at copy
cost — but when the split happens, this doc's task vocabulary becomes its
information architecture.

## Deliberately not building (course apparatus and engagement theatre)

Learning-goal lists, quizzes and knowledge checks, completion marks and
progress state, levels/badges, "no experience needed" chips, time
estimates, site search (8 content pages; once routed, the rails and
find-in-page carry the load), newsletter capture, unread-content counters,
artificial rotation of audit-room barriers. All either learned-affordance,
gamification, course-voice, or engagement theatre for this audience. The
audit room already is the site's knowledge check — answers included,
nothing scored — in a form that beats a quiz. The honest return cadence
for working developers is lookup-at-need plus occasional revisits on
platform movement; the what's-new block, the feed, and the
Baseline-movement line serve exactly that and nothing more.

## What the audit confirmed is strong

The headline as expert shibboleth ("Built in, not bolted on" self-selects
the audience in four words, metaphor in ornament exactly as the house rules
prescribe). Demo-level contracts (payoff lines, requirement/passText/
failText, the audit-room contract paragraph) — a schema-enforced promise
surface most sites never build. The screen-reader sheet as the site's most
complete contract unit: promise up front, minute-budgeted plan, honest
"what fifteen minutes doesn't prove" close — the template the chapters
should be measured against. Destination quality once found (Baseline badges
answer "safe to ship?" at a glance; the hiding matrix answers a better
question than the one asked). The five best section titles ("The scrollbar
you leave alone", "Four ways to hide, and whom they hide from") are
verdicts — scannable promises in the site's own register.
