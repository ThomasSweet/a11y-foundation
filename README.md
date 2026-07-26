<img src="docs/banner.svg" alt="Built in, not bolted on — with 'bolted on' struck through" width="1080">

# Accessible by default

[![CI](https://github.com/ThomasSweet/a11y-foundation/actions/workflows/ci.yml/badge.svg)](https://github.com/ThomasSweet/a11y-foundation/actions/workflows/ci.yml)
[![Live site](https://img.shields.io/badge/live-accessible--by--default.dev-2563eb)](https://accessible-by-default.dev/)
[![Redesign preview](https://img.shields.io/badge/redesign-staging-7c3aed)](https://staging.accessible-by-default.dev/)
[![WCAG](https://img.shields.io/badge/WCAG_2.2_AA-target-16a34a)](https://www.w3.org/TR/WCAG22/)
[![License: MIT](https://img.shields.io/badge/license-MIT-8a8a8a)](./LICENSE)

How much of accessibility does the modern web platform handle **natively** —
with little to no JavaScript? This site is that question, answered as one
argument in four parts: what **the standard** (WCAG) asks for, **the craft**
of meeting it with modern CSS and HTML, what cutting-edge **CSS** makes
possible next, and **the proof** that it holds up.

Underneath it is an accessibility-first styling foundation — SCSS mixins,
design tokens, and a cascade-layer architecture — where components adapt to
**user preferences** (reduced motion, high contrast, forced colors, dark mode,
reduced transparency) and **input capabilities** (hover, touch) by default,
with the cascade doing the work instead of `!important`.

> [!IMPORTANT]
> **Two designs are live right now, and you can help pick one.**
> The [live site](https://accessible-by-default.dev/) runs the current
> single-page design; a full restructure — an overview hub plus four chapter
> pages, wearing a technical-drawing look — is in review on
> [staging](https://staging.accessible-by-default.dev/). Impressions,
> nitpicks, and accessibility findings on either version are genuinely
> welcome: [open an issue](https://github.com/ThomasSweet/a11y-foundation/issues).

<table>
  <tr>
    <th scope="col">Current design (live)</th>
    <th scope="col">Blueprint redesign (staging)</th>
  </tr>
  <tr>
    <td>
      <a href="https://accessible-by-default.dev/"><picture>
        <source media="(prefers-color-scheme: dark)" srcset="docs/screenshots/design-current-dark.png">
        <img alt="Visit the live site — current design: gradient wordmark hero over a soft wash" src="docs/screenshots/design-current-light.png">
      </picture></a>
    </td>
    <td>
      <a href="https://staging.accessible-by-default.dev/"><picture>
        <source media="(prefers-color-scheme: dark)" srcset="docs/screenshots/design-blueprint-dark.png">
        <img alt="Visit the staging redesign — blueprint hub: four chapter plates on a drawing sheet" src="docs/screenshots/design-blueprint-light.png">
      </picture></a>
    </td>
  </tr>
</table>

<sub>The banner and these screenshots follow your OS color scheme, and the
banner's strike only animates without a reduced-motion preference — this
README practises the thesis too.</sub>

## The site practises what it shows

Every feature the site teaches is doing real work *in* the site — each behind
`@supports`, degrading to an accessible fallback, never a broken page:

| Platform feature | Where it runs |
| --- | --- |
| `@layer` cascade layers | the entire stylesheet — user preferences beat components without `!important` |
| `light-dark()` + `color-scheme` | every color token, native controls included |
| OKLCH + `color-mix()` | the seed-driven theming engine — 8 presets derived from two seeds each |
| Container queries + `cqi` | the WCAG timeline reflows by its own width, not the viewport's |
| Scroll-driven animations | reading-position nav highlight, the timeline's ghost years |
| Anchor positioning | the theme panel tethers to its trigger, flips when space runs out |
| `:has()` | the showcase topic filter — pure CSS, no state management |
| `@starting-style` + `allow-discrete` | dialog and popover entry/exit transitions |
| Subgrid | the redesign's hub plates align rows across cards |
| Cross-document view transitions | the redesign's page-to-page content fade — an MPA with zero routing JS |

## What's inside

- **Cascade layers** (`@layer reset, tokens, themes, base, layout, components,
  utilities, preferences`) — the one rule: no unlayered CSS, ever.
- **Design tokens** declared once with `light-dark()` — OS preference and
  manual theming from the same tokens, persisted with a no-flash reload.
- **A seed-driven theming engine** — a theme is two OKLCH seeds plus optional
  contrast strengths; the full contrast-safe palette is derived in CSS. Eight
  presets: visual themes, a color-vision-friendly trio, high-contrast pair.
- **WCAG, live** — criteria demos on the standard's timeline, each with a
  **"break this rule"** toggle so you can feel what the criterion prevents.
- **A CSS showcase catalog** — 29 accessible demos of modern platform
  features, grouped into Baseline's own tiers from `web-features` data at
  build time, each with its a11y payoff spelled out and its code one click away.
- **Preference & interaction mixins** — `reduced-motion()`, `forced-colors()`,
  `high-contrast()`, `can-hover()`, `touch-primary()` and friends —
  enhancement only, never gating.
- **Accessibility utilities** — `.visually-hidden`, skip link, WCAG 2.2 focus
  appearance, minimum target sizes as base styles.

## Try it with your OS preferences

The site responds live to OS settings — no reload needed:

- **Reduced motion** → page transitions, reveals, and spinners bow out
- **Dark mode / theme panel** → all tokens and native controls flip; presets
  re-derive the whole palette from two seeds
- **Increased contrast** → borders strengthen, decorative shadows drop
- **Forced colors (Windows)** → buttons, dialogs, and charts keep visible boundaries
- **Keyboard only** → skip link on first Tab, consistent focus rings throughout

## Tested like it matters

The site's **proof** chapter argues that accessibility testing is layered —
static checks, unit logic, an automated `axe` sweep, then keyboard and
screen-reader passes — and that a scanner alone is never the whole story.
The repo's suite is that model, runnable:

```sh
npm run test:unit   # contrast-clamp guarantee + Baseline fallback watch (Vitest)
npm run test:e2e    # axe sweep of every page + keyboard/focus specs, on Chromium, Firefox, and WebKit
```

The e2e suite runs the `axe` scan across all pages in three engines and pins
keyboard behaviour (skip link, dialog focus, popovers, theme persistence).
It has caught real WCAG failures on this very site before they shipped —
which is the strongest argument for the layered model the site makes.

## Getting started

```sh
npm install
npm run dev         # playground at http://localhost:5173
npm run typecheck   # vue-tsc
npm run lint:css    # stylelint, including mixin-order enforcement
npm run build
```

Conventions live in [GUIDE.md](./GUIDE.md) — the layer rules, mixin ordering,
theming, and how component styles are written. The public backlog, including
visitor feedback and what became of it, is [ROADMAP.md](./ROADMAP.md).

## Accessibility statement

This project targets **WCAG 2.2 AA**, works with a keyboard and a screen
reader, and never relies on color alone. It is a **demo and playground**, not
a production dependency — built to be explored and learned from. The full
statement lives on the site. Found a barrier?
[Open an issue](https://github.com/ThomasSweet/a11y-foundation/issues) — that
feedback is welcome and acted on.

## Credits

The decorative hero pictograms are
[Material Symbols](https://github.com/google/material-design-icons) by Google,
used under the [Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0).

## License

[MIT](./LICENSE) © Thomas Sweet. The Material Symbols assets above remain
under their own Apache 2.0 license.
