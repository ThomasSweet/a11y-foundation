# The checks package on this site: scope

Written 28 October 2026, before any code. It works from the brief the package
session handed over and from the package's README, which is the single source
for what the checks do. Thomas took the decisions at the end on 29 October
2026.

---

## The package, in one paragraph

`@accessible-by-default/checks` is three Playwright matchers that operate a
page's widgets by keyboard in Chromium, Firefox and WebKit and check that they
behave as they claim: expanded state tells the truth
(`toHaveTruthfulExpandedState`), a dialog holds focus and gives it back
(`toOpenADialogThatHoldsFocus`), and errors are tied to their fields
(`toHaveErrorsTiedToFields`). It runs next to axe, and a pass is not
conformance. Repository: https://github.com/ThomasSweet/behaviour-checks.

## Checked for this scope (28 October 2026)

- **npm**: MIT. 0.1.0 was published on 27 October 2026 at 22:39 UTC, 0.1.1
  and 0.2.0 on 28 October at 11:43 and 12:32 UTC; `latest` is 0.2.0. Its npm
  homepage is the GitHub README; the GitHub repository's website field is
  `https://accessible-by-default.dev`.
- **The README's survey claim holds.** WebAIM's screen reader survey #10 ran
  from December 2023 to January 2024. Its second-ranked problem is
  "Interactive elements like menus, tabs, and dialogs do not behave as
  expected", after CAPTCHA.
- **Install timing.** The site waits for 0.2.0, which gives every finding a
  stable code, so the site's tests assert codes instead of prose. This
  repo's `.npmrc` sets `min-release-age=3`, so npm installs 0.2.0 here from
  31 October, about 12:33 UTC. The package runs no install scripts, so
  `strict-allow-scripts` has nothing to approve.
- **No dialog on this site calls `focus()` as it starts a transition**, the
  pattern the package found dropping focus to the page body. The site's two
  `focus()` calls are the "focus the demo" links.
- **Confirmed: Chromium puts blank Tab stops behind the showcase dialog.**
  With "Open the dialog" open, the first lap of Tab stops one to five times
  on the carousel's `::scroll-marker`s, which take focus although the dialog
  makes them inert; nothing visible is focused. The scroll buttons are not
  affected, and Firefox and WebKit do not support either pseudo-element. The
  package reports it as a warning, `modal-walk/blank-stop-behind-dialog`, and
  its repository holds a Chromium bug draft with a minimal page
  (`docs/upstream/chromium-scroll-marker-inert.md`), not yet filed. A browser
  bug, not the site's.
- **The site now steps around it in CSS.** `CssCarouselDemo` sets
  `scroll-marker-group: none` under `:root:has(dialog:modal)`, so the markers
  are not rendered while a modal dialog is open. The package's walk, under
  reduced motion in Chromium 156, found 1 to 5 blank stops in each of six
  walks over the two showcase dialogs before the rule and none after it.
  Without reduced motion none were found either way. The markers still work
  with the dialog closed, and Firefox 157 and WebKit 27.2, which have no
  scroll markers, render the page as before (29 October 2026). The rule goes
  once Chromium fixes the bug: GUIDE, "Engine behaviours we work around".

## Standing decisions this touches

- **"Four chapters, no fifth. New material feeds an existing chapter or a
  reference sheet."** A page in a Tools group is neither. Sections 1 and 2
  need this decision amended, not worked around: see decision 3.
- **"Out of lane, said on the site."** Proof names ARIA widget patterns and
  focus management as JavaScript territory and points at the APG. The page
  and the proof rows stay on the testing side of that line: they say what the
  checks find, never how to build the widget.
- **"No JavaScript in demos"** and **"Form validation stays CSS and native"**
  hold: the page has no script, and the package passes a field that only the
  browser's own validation marks invalid.
- **"Practice rooms vary the type under test"** holds: the barriers in
  section 5 go into a settings room and a form flow, two different types.

---

## 1. A page for the package

**At `/checks/`**, a page of its own: not a fifth chapter, not a reference
sheet. The URL goes into the package's npm homepage and the repository's
website field, so it must never move. Built as `checks/index.html`, a Vite
input prerendered like every other page. Apache serves `/checks` as
`/checks/` by itself; test that on the local Apache before shipping.

What it says, in this order:

1. What the three checks do, in one sentence each, worded from the README.
2. Why: the survey item above, and that axe reads markup and cannot press a
   button to see what happened.
3. Install, and one example, copied from the README's "Use" block.
4. The site's own results: what the matchers find when this site runs them
   (section 4).
5. What a pass does not prove, in one paragraph.
6. Links: the README for everything else, npm, GitHub, issues.

It copies none of the README's tables or engine notes: the README ships with
each version, and a second copy would drift. A static page in `SiteFrame`,
with no script for its mechanism. It joins the sitemap, `llms.txt`'s page list
and the hub (section 2), and the page lists in the specs and unit tests that
read one folder level only, so it must be added to them by name. After it ships, Thomas points the package's
`homepage` and the repository's website field at it.

**Its own domain?** Not now. The package name already carries this domain's
name, and one site keeps one deploy, one accessibility statement and one
place that earns links. A domain with a redirect can follow if the tools grow
into a family.

## 2. The agent skill, and a Tools group on the hub

The hub has Practice (P·01, P·02) and Reference sheets (A·01 to A·04). The
skill (A·02) and the checks are both things a reader installs, not pages a
reader looks things up in. Proposed: a third group, **Tools**, between
Practice and Reference sheets, holding the agent skill and the checks.

- The skill keeps `/agent-skill.html`: `llms.txt` and the planned list
  submissions point there.
- Sheet codes: `T·01` Agent skill and `T·02` Checks. Leaving the skill at A·02
  would put an appendix code inside the Tools group; taking it out leaves a gap
  at A·02 unless the reference sheets close up (A·03 Screen reader becomes
  A·02, A·04 DevTools becomes A·03). Copy in the audit room, the listening
  room and proof names A·03 and A·04 six times; those lines change with it.
- **Not built now:** a later minor version of the package plans a CLI and an
  agent skill that calls it. That belongs in the existing accessible-by-default skill as a
  reference file, not as a second skill under the same name.

## 3. The proof chapter

"What automation can and can't see" compares three methods in
`CoverageMatrix`: axe, keyboard by hand, and screen reader or judgement. The
package is a fourth kind, a scripted keyboard check, but it covers three
behaviours, not keyboard testing in general. A fourth column would read as
"scripts can now do keyboard testing". Proposed instead:

- **Three rows** for the defects the package targets, placed by the axe
  column like the rest:
  - "A disclosure reports the wrong state" (4.1.2): axe missed, keyboard
    missed (a sighted keyboard user sees the panel, never the state),
    screen reader caught.
  - "Focus escapes an open modal" (2.4.3): axe missed, keyboard caught,
    screen reader caught.
  - "Error text tied to no field" (1.3.1, as the package's
    `error-association/visible-error-is-not-tied` gives it): axe missed,
    keyboard missed, screen reader caught.
- **One sentence under the matrix:** these three can be scripted. The
  package presses the widget in three engines and reports when it lies. Link
  to `/checks/`.

Every "missed" for axe is measured before it is printed. **Measured on 29
October 2026** with axe 4.14.0 in Chromium 156, Firefox 157 and WebKit 27.2,
on the package's failing fixtures at 85c0a0f, both with the site's WCAG tags
and with axe's defaults:

- `expanded-state/fail.html`, at rest and with "Stale state" opened: nothing
  about any expanded state. The only violation is `target-size` on two
  unstyled controls, with the WCAG tags.
- `modal/fail-leaky.html`, at rest and with the dialog open: nothing about
  focus. The only violation is `target-size`, with the WCAG tags.
- `errors/fail.html`: nothing about the visible error texts tied to no field
  (email, name, the size group, the promo dialog). axe does flag
  `aria-valid-attr-value` on the postcode field, whose `aria-errormessage`
  points at an empty element: a broken tie, not a missing one. So the row
  names the missing tie only.

## 4. The site as the package's first user

Once 0.2.0 is three days old:

- Add the package as a devDependency, pinned to an exact version: the
  README's "Versions" says a 0.x minor can change what a check reports.
- Replace "native dialog traps focus and closes on Escape" in
  `keyboard.spec.ts`, which never presses Tab, with
  `toOpenADialogThatHoldsFocus`.
- Add `tests/e2e/behaviour.spec.ts`, adapted from the package's
  `tests/site.spec.ts`:
  - expanded state and errors at rest on every page;
  - the craft and showcase dialogs;
  - the showcase's `closedby="none"` takeover dialog, expecting exactly one
    code, `modal-walk/escape-does-not-close`, which is by design;
  - the craft form after an empty submit.
- Chromium's `modal-walk/blank-stop-behind-dialog` warning on the showcase
  needs no setting aside now that the carousel steps around it: a walk that
  reports it means the rule stopped working.
- The package's site runs before 0.2.0 found only the Escape warning, and
  0.2.0 added the blank-stop check. Re-run after install and treat anything
  beyond the Escape warning as a finding.
- Measure the added time with the JSON reporter. The expanded-state check
  presses every widget on every page in three engines, and the package's
  site run allows 180 seconds per test.

**Done on 31 October 2026.** 0.2.0 is pinned, `behaviour.spec.ts` replaces the
dialog test, and every page runs in all three engines at the desktop default,
1280 wide. Before the spec, a scratch run of the same checks at 1280 and 390
wide covered 17 pages, three dialogs and the craft form, and found only the
takeover dialog's Escape warning. Locally the spec adds about 20 seconds to a
full run, and its slowest test takes 1.8 seconds. Those are Mac figures, so
decision 6's Chromium-only fallback stays open until a CI run has been read.

The sample is small. Each engine makes 16 presses on 6 distinct widgets, and
no page has page-authored error text or `aria-invalid` yet, so the error check
guards against future errors. Say "found nothing untied" on the page, not that
the site's errors are tied.

**Playwright 1.65**, when it ships, hides inert content and the page behind a
modal from role queries and makes clicks wait on inert elements. The site's
specs that query or click behind an open dialog may need changes then.

## 5. Practice rooms

The rooms have no widgets, so the package finds nothing in them today. One
script-free barrier per check would let the site measure the package's recall
the way the audit room measures axe's:

- **P·03 settings room**:
  - a disclosure whose `aria-expanded` never changes when it opens;
  - a "modal" built as a popover with `aria-modal="true"`, so Tab reaches the
    page behind. That is an escape, not a trap, so it needs no script, which
    the rooms' rule requires.
- **P·04 booking form**: visible error text beside a field, tied to nothing.

The answers would then name "a scripted check" alongside axe, keyboard and
the screen reader. The rooms' content and order stay Thomas's call; each is
decided in that room's own scope.

## 6. ROADMAP and the feed

- **Next**: the `/checks/` page and the Tools group; using the package on the
  site, once 0.2.0 is three days old; the three proof rows.
- **Distribution**: add the package, its npm page and repository, to the list
  submissions.
- **Watchlist**: Playwright 1.65 and the suite.
- **Practice rooms**: the three barriers, as candidates.
- **Feed**: one line when the page ships. "A new thing here to try" is what
  the standing rule allows; nothing before that.

All within the word budget: about 120 words net.

---

## Phases

1. Use the package on the site. Done on 31 October 2026: section 4.
2. In one change, so the proof sentence's link resolves: the proof rows with
   the axe measurements behind them, the `/checks/` page, the Tools group,
   the sitemap, `llms.txt` and the what-changed line. Then Thomas updates
   the npm homepage and the repository's website field.
3. The rooms, inside P·03's and P·04's own scopes.

---

## Decisions

Taken on 29 October 2026: every recommendation below. Decision 9 stands for
now and is revisited when the package's agent skill is scoped. The Tools
group ships with the `/checks/` page, not before it: a group holding only the
agent skill would be a group of one.

1. **Own domain or a page here?** Recommendation: a page here, at `/checks/`.
   A domain can redirect to it later.
2. **`/checks/` or `/checks.html`?** Every other page ends in `.html`.
   Recommendation: `/checks/`. It is the address the package publishes, and a
   folder reads as a home that can hold more later (a changelog, the CLI).
3. **A Tools group on the hub, which amends "Four chapters, no fifth"?**
   Recommendation: yes, between Practice and Reference sheets, holding the
   agent skill and the checks, with the decision reworded to "New material
   feeds an existing chapter, a reference sheet, or a tool's own page".
4. **Sheet codes.** Recommendation: `T·01` Agent skill, `T·02` Checks, and the
   reference sheets close up to A·01 to A·03, with the six copy references
   updated in the same change. URLs stay as they are.
5. **Proof: rows or a column?** Recommendation: three rows and one sentence,
   with axe's "missed" measured first.
6. **The site as first user.** Recommendation: yes, phase 1, in all three
   engines, unless the measured CI time says Chromium only for the
   expanded-state sweep.
7. **Barriers for the checks in P·03 and P·04?** Recommendation: yes, one per
   check, decided inside each room's scope.
8. **A what's-new line?** Recommendation: one, when the page ships, linking
   `/checks/`.
9. **The package's agent skill**, planned for a later minor version.
   Recommendation: a reference file in the existing skill, not a second
   skill.
