<img src="docs/banner.svg" alt="Built in, not bolted on — with 'bolted on' struck through" width="1080">

# Accessible by default

[![CI](https://github.com/ThomasSweet/a11y-foundation/actions/workflows/ci.yml/badge.svg)](https://github.com/ThomasSweet/a11y-foundation/actions/workflows/ci.yml)
[![Live site](https://img.shields.io/badge/live-accessible--by--default.dev-2563eb)](https://accessible-by-default.dev/)
[![WCAG](https://img.shields.io/badge/WCAG_2.2_AA-target-16a34a)](https://www.w3.org/TR/WCAG22/)
[![License: MIT](https://img.shields.io/badge/license-MIT-8a8a8a)](./LICENSE)

How much of accessibility does the modern web platform handle **natively** —
with little to no JavaScript? **Most of it.** This site is that claim, argued
in four parts and running live: what **the standard** (WCAG) asks for —
eleven criteria you can break and restore — **the craft** of meeting it with
modern CSS and HTML, the modern **CSS** worth knowing sorted by how safely it
ships today, and **the proof** that the claim holds up.

Underneath it is an accessibility-first styling foundation — SCSS mixins,
design tokens, and a cascade-layer architecture — where components adapt to
**user preferences** (reduced motion, high contrast, forced colors, dark mode,
reduced transparency) and **input capabilities** (hover, touch) by default,
with the cascade doing the work instead of `!important`.

The site wears a technical-drawing look: an overview hub plus four chapter
pages. Its previous single-page design is preserved under the
`design-classic` git tag.

<a href="https://accessible-by-default.dev/"><picture>
  <source media="(prefers-color-scheme: dark)" srcset="docs/screenshots/hub-dark.png">
  <img alt="Visit the live site: the hub page, its claim and the four numbered chapter plates" src="docs/screenshots/hub-light.png" width="1080">
</picture></a>

<sub>The banner and this screenshot follow your color-scheme preference
(`prefers-color-scheme`, as reported by your browser — usually your OS
setting, unless the browser overrides it), and the banner's strike only
animates without a reduced-motion preference — this README practises the
thesis too.</sub>

## The site practises what it shows

Every feature the site teaches is doing real work *in* the site — each behind
`@supports`, degrading to an accessible fallback, never a broken page:

| Platform feature | Where it runs |
| --- | --- |
| `@layer` cascade layers | the entire stylesheet — user preferences beat components without `!important` |
| `light-dark()` + `color-scheme` | every color token, native controls included |
| OKLCH + `color-mix()` | the seed-driven theming engine — 8 presets derived from two seeds each |
| Container queries | the standards map and the what-changed block reflow by their own width, not the viewport's |
| Scroll-driven animations | reading-position nav highlight, the timeline's era strata pouring in |
| Anchor positioning | the theme panel tethers to its trigger, flips when space runs out |
| `:has()` | the showcase topic filter — pure CSS, no state management |
| `@starting-style` + `allow-discrete` | dialog and popover entry/exit transitions |
| Subgrid | the hub plates align rows across cards |
| `<details name>` + `::details-content` | the standards map: an exclusive accordion whose open card grows to span the row, with no script |
| Cross-document view transitions | the page-to-page content fade — an MPA with zero routing JS |

## What's inside

- **Cascade layers** (`@layer reset, tokens, themes, base, layout, components,
  utilities, preferences`) — the one rule: no unlayered CSS, ever.
- **Design tokens** declared once with `light-dark()` — the user's scheme
  preference and manual theming from the same tokens, persisted with a
  no-flash reload.
- **A seed-driven theming engine** — a theme is two OKLCH seeds plus optional
  contrast strengths; the full contrast-safe palette is derived in CSS. Eight
  presets: visual themes, a color-vision-friendly trio, high-contrast pair.
- **WCAG, live** — eleven criteria demos on the standard's timeline, each
  with a **"break this rule"** toggle so you can feel what the criterion
  prevents.
- **A standards map**: six laws, from Section 508 to the UK's public sector
  regulations, filed in the row of the WCAG version each one cites. Open a
  law and the layers between it and the criterion you test unfold, with no
  JavaScript: an exclusive `<details name>` accordion.
- **A CSS showcase catalog** — 36 accessible demos of modern platform
  features, grouped into Baseline's own tiers from `web-features` data at
  build time, each with its a11y payoff spelled out and its code one click away.
- **Practice rooms** — two pages broken on purpose, each with its answers
  behind `<details>` and a test suite that asserts the page stays exactly that
  broken. The **audit room** plants twelve barriers to hunt with the tools the
  site teaches; the **listening room** plants eleven that a scanner passes
  over, every one of them audible before it is visible.
- **Reference sheets** — a screen reader's first fifteen minutes, the
  DevTools accessibility inventory, a linkable glossary, and the style guide
  the site is drawn with.
- **What changed**: six dated lines at the foot of the hub, one link each, for
  what moved in the platform and the standards and what it changed here. The
  same registry writes an Atom feed at
  [/feed.xml](https://accessible-by-default.dev/feed.xml) at build time.
- **Preference & interaction mixins** — `reduced-motion()`, `forced-colors()`,
  `high-contrast()`, `can-hover()`, `touch-primary()` and friends —
  enhancement only, never gating.
- **Accessibility utilities** — `.visually-hidden`, skip link, WCAG 2.2 focus
  appearance, minimum target sizes as base styles.

## Use it with your coding agent

The same argument ships as an **[Agent Skill](skills/accessible-by-default)**,
so an agent writing markup reaches for the native element before the `div`,
guards modern CSS behind the right `@supports`, and can name the criterion it
is about to break. `SKILL.md` holds the decisions; three reference files carry
the WCAG criteria, the Baseline-tiered feature catalog, and a copy-paste-ready
accessible implementation of each.

Drop the folder wherever your agent loads skills from — for Claude Code that is
`~/.claude/skills/`:

```sh
cp -r skills/accessible-by-default ~/.claude/skills/
```

The reference files are generated from the same registries the site renders
(`npm run skill:gen`), and CI fails when the committed copy falls behind, so
the skill can't drift from the live demos. The idea
came from [Jakub Andrzejewski](https://x.com/jacobandrewsky), alongside Chrome's
[Modern Web Guidance](https://developer.chrome.com/docs/modern-web-guidance).

For agents that read rather than install, the same markdown is served at
[accessible-by-default.dev/llms.txt](https://accessible-by-default.dev/llms.txt).

## Try it with your OS preferences

The site responds live to OS settings — no reload needed:

- **Reduced motion** → page transitions, reveals, and spinners bow out
- **Dark mode / theme panel** → all tokens and native controls flip; presets
  re-derive the whole palette from two seeds
- **Increased contrast** → borders strengthen, decorative shadows drop
- **Forced colors (Windows)** → buttons, dialogs, and charts keep visible boundaries
- **Keyboard only** → skip link on first Tab, consistent focus rings throughout

<sub>If a toggle seems to do nothing, check your browser's own appearance
setting — Chrome, for one, can pin light/dark and override the system
scheme for every page.</sub>

## Tested like it matters

The site's **proof** chapter argues that accessibility testing is layered —
static checks, unit logic, an automated `axe` sweep, then keyboard and
screen-reader passes — and that a scanner alone is never the whole story.
The repo's suite is that model, runnable:

```sh
npm run test:unit   # contrast-clamp guarantee, snippet guard, Baseline fallback watch, revisions registry (Vitest)
npm run test:e2e    # axe sweep of every content page + keyboard/focus specs + the standards map and the feed, on Chromium, Firefox, and WebKit
```

The e2e suite runs the `axe` scan across every content page in three
engines, pins keyboard behaviour (skip link, dialog focus, popovers, theme
persistence, the standards map's exclusive accordion), and fetches each
content page's raw HTML to assert the content is there before any
JavaScript runs — the pages are prerendered at build time and hydrated on
the client.
It has caught real WCAG failures on this very site before they shipped —
which is the strongest argument for the layered model the site makes.

## Kept current

Baseline moves without anyone touching the repo, so a workflow watches it.
Every Monday it bumps `web-features`, regenerates the Baseline data, the
agent skill and the feed, and opens a pull request that proposes a
what-changed line for any showcase that gained an engine or reached
Baseline; a person reads it against the release notes and merges. Merging
to `main` deploys: after a green CI run the build goes to production, the
live site is checked for the new build, and the pull request gets a comment
saying so. CI also fails when a generated file, the skill, the llms mirror,
the feed or the Baseline data, falls behind its registry.

## Getting started

```sh
npm install         # Node 22.18 or newer: gen-feed in prebuild imports revisions.ts directly
npm run dev         # playground at http://localhost:5173
npm run typecheck   # vue-tsc
npm run lint:css    # stylelint, including mixin-order enforcement
npm run lint:js     # eslint (vue + typescript), zero warnings tolerated
npm run build       # regenerates Baseline data and the feed, builds, then prerenders every page
npm run skill:gen   # regenerates the agent skill and the llms mirror from the registries
```

Conventions live in [GUIDE.md](./GUIDE.md) — the layer rules, mixin ordering,
theming, and how component styles are written. The public backlog, including
visitor feedback and what became of it, is [ROADMAP.md](./ROADMAP.md).

## Accessibility statement

This project targets **WCAG 2.2 AA**, works with a keyboard and a screen
reader, and never relies on color alone. It is a **demo and playground**, not
a production dependency — built to be explored and learned from. The full
[statement lives on the hub](https://accessible-by-default.dev/#a11y-statement).
Found a barrier?
[Open an issue](https://github.com/ThomasSweet/a11y-foundation/issues) — that
feedback is welcome and acted on.

## How this was built

This site was built in a directed collaboration with an AI pair — Claude,
working in Claude Code. The division of labour: the taste, the decisions,
and the standard are mine; a large share of the execution — code, copy
drafts, research sweeps, whole demo components — came from the agent,
working under review. Nothing ships unread, and nothing ships untested:
every page passes the axe sweep in three engines and the keyboard specs,
and I put my own hands on a keyboard and a screen reader before anything
goes live. Where the site states a number, the number was measured; the
claims that matter are pinned in CI precisely so they cannot drift,
however they were written. [ROADMAP.md](./ROADMAP.md) keeps the honest
record, including ideas the agent proposed that I rejected and things we
built and then cut.

That isn't a caveat — it's the site's argument, applied to itself. This
project packages its guidance as an agent skill because coding agents
increasingly write the web's markup; it was built the way it recommends
the web be built: platform-first defaults, an agent doing much of the
typing, a human holding the result to the standard. Just as important is
what AI did **not** do here: no accessibility overlay, no automated
"remediation", and no generated claim presented as tested when it wasn't.

## Thanks

Feedback from these people changed the site. Named with their permission, and
described by what they actually found, because "thanks for the feedback" is not
a credit.

- **[Imad Abdulkarim](https://github.com/fanckush)** — noticed that the
  non-colour state cues vanished in iOS Safari, which turned out to be WebKit
  declining to apply pseudo-element rules inside a style query. Also argued the
  showcase read as "you don't need JavaScript" rather than accessibility, which
  is why every entry now names who the feature helps, and asked for topic tags,
  which became the catalog filter.
- **[Josefine Schaefer](https://github.com/josefineschaefer)** — pointed out, in
  passing, that "blind spot" is contested language. It was gone from the site
  the same evening and the wording is plainer for it (*catches* and *misses*).
  Also made the introductions that most of the rest of this list came from.
- **[Lorena Ramonda](https://github.com/lorenaramonda)** — found that content
  was cut off on mobile and, crucially, kept saying so after I had twice
  announced it was fixed. It took three commits: iOS WebKit was inflating
  sections past the viewport. She also spotted that the `light-dark()` demo was
  showing the two schemes the wrong way round.
- **[Dhiego Bastos](https://github.com/dhiego-bastos)** — recorded two videos
  rather than describing the problems, which made both trivial to track down.
  The theme panel was flying out detached from its button on wide screens; it is
  anchored now. The second turned out to be correct behaviour, and explaining
  why Space scrolls and Enter activates was worth the trip on its own.
- **[Klara Schmitt](https://portfolio.klaraschmitt.com/)** — reviewed the
  redesign's wayfinding and called out where the blueprint metaphor had leaked
  into the navigation: labels that needed decoding, mono-caps dressing up bare
  links. "Metaphor lives in ornament, never in labels" has been a house rule
  since, the title block gained its ruled form in the same review, and the
  timeline grew clearer from her notes on it.
- **[Jakub Andrzejewski](https://x.com/jacobandrewsky)** — asked whether the
  whole argument could ship in a form AI agents can use. That question became
  the Agent Skill and its page — arguably the most portable thing the project
  produces.
- **My wife** — caught that the end-of-chapter links were too small and easy to
  miss, which is why they are full cards now, and has been the steady source of
  pointers and ideas behind a lot of the rest.

## Credits

Several of the ideas here started as someone else's. The craft chapter's
defensive-CSS section builds on **[Defensive CSS](https://defensivecss.dev/)**
by [Ahmad Shadeed](https://ishadeed.com/) — guarding a layout against content
you did not anticipate is his framing, and it is the whole premise of that
section. The interest-invoker toolbar behaviour comes from a trick by
[Una Kravets](https://una.im/). And a CSS Day talk by
[Bramus Van Damme](https://www.bram.us/) is why the scroll-driven animation
work is here at all — the reading-position rail, the section reveals, the
timeline's strata — along with the cross-document view transitions that carry
navigation between chapters with no routing JavaScript. The scrollbar rules,
tinted from the page's tokens and never thinned, the thumb that takes the accent
while keyboard focus is inside a region, and the edge hints that show only while
there is more to scroll follow [Adam Argyle](https://nerdy.dev/)'s CSS Day 2025
talk on scrollers, layered onto what `overflow: auto` already ships. The
implementations and the accessibility argument are mine; the insight was theirs.

The small decorative glyphs — the payoff figure on the showcase cards among
them — are
[Material Symbols](https://github.com/google/material-design-icons) by Google,
used under the [Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0).

## License

[MIT](./LICENSE) © Thomas Sweet. The Material Symbols assets above remain
under their own Apache 2.0 license.
