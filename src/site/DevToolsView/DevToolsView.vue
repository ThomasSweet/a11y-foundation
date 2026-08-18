<template>
  <SiteFrame sheet="A·04" sheet-title="DevTools">
    <h1 class="devtools-title">DevTools for accessibility</h1>
    <p class="devtools-lede">
      Accessibility tooling has a quiet pattern: extensions rebuilding what
      the browser already ships. This sheet is the built-in inventory — the
      panels and toggles that cover most of an audit's tooling needs before
      you install anything — and the short list of add-ons that genuinely add
      something. Everything here can be tried on this very page.
    </p>

    <section class="devtools-section">
      <h2 class="devtools-h2">Already in the browser</h2>
      <p class="devtools-p">
        Paths are Chrome and Edge unless named otherwise; Firefox gets its
        own row where it shines. None of this needs an account, a license,
        or an update cycle — it ships with the engine you're debugging.
      </p>
      <dl class="devtools-features">
        <div v-for="f in nativeFeatures" :key="f.name" class="devtools-feature">
          <dt class="devtools-feature-head">
            <strong class="devtools-feature-name">{{ f.name }}</strong>
            <code class="devtools-feature-where">{{ f.where }}</code>
          </dt>
          <dd class="devtools-feature-desc">{{ f.desc }}</dd>
        </div>
      </dl>
      <p class="devtools-p">
        The first row is the pane
        <a href="/proof.html#testing-tree">the proof chapter walks through</a> —
        the four examples there make a good first target for it. And the
        Rendering emulations are this site's own test rig: flip
        <GlossaryRef id="forced-colors">forced colors</GlossaryRef> or
        reduced motion right here and watch the page hold.
      </p>
    </section>

    <section class="devtools-section">
      <h2 class="devtools-h2">Add-ons that earn their place</h2>
      <p class="devtools-p">
        The test for this list: an add-on must do something the panels above
        can't. Three pass it.
      </p>
      <dl class="devtools-features">
        <div v-for="a in addOns" :key="a.name" class="devtools-feature">
          <dt class="devtools-feature-head">
            <strong class="devtools-feature-name">{{ a.name }}</strong>
            <code class="devtools-feature-where">{{ a.by }}</code>
          </dt>
          <dd class="devtools-feature-desc">{{ a.desc }}</dd>
        </div>
      </dl>
    </section>

    <section class="devtools-section">
      <h2 class="devtools-h2">What none of them change</h2>
      <p class="devtools-p">
        Tooling — built-in or installed — sees the machine-checkable slice,
        and <a href="/proof.html#testing-layers">the layered model</a> says
        what that slice is worth: necessary, never sufficient. The rest is
        still you, a keyboard, and
        <a href="/screen-reader.html">a screen reader's first fifteen
        minutes</a>.
      </p>
    </section>
  </SiteFrame>
</template>

<script setup lang="ts">
import SiteFrame from '../SiteFrame/SiteFrame.vue'
import GlossaryRef from '../../glossary/GlossaryRef.vue'

const nativeFeatures = [
  {
    name: 'The accessibility pane',
    where: 'Elements → Accessibility',
    desc: 'Role, name, and the full computed-name chain for the selected element — which source won and which were skipped. A checkbox switches the whole panel to the page-wide tree, and the source-order viewer overlays reading order on the page.',
  },
  {
    name: 'Contrast in the color picker',
    where: 'Styles → any color swatch',
    desc: 'Click a text color and the picker shows its contrast ratio with AA and AAA lines drawn on the spectrum — pick a passing shade without leaving the panel.',
  },
  {
    name: 'The inspect tooltip',
    where: 'the element picker, before you click',
    desc: 'Hovering with the picker already answers the audit basics: accessible name, role, contrast, keyboard-focusable — for every element you sweep across.',
  },
  {
    name: 'Rendering emulations',
    where: 'More tools → Rendering',
    desc: 'Emulate prefers-color-scheme, reduced motion, forced colors, prefers-contrast, and six vision deficiencies — several extensions replaced by one panel, no device settings touched.',
  },
  {
    name: 'Emulate a focused page',
    where: 'More tools → Rendering',
    desc: 'Keeps focus-dependent UI — dropdowns, comboboxes, tooltips that close on blur — open while your cursor is in DevTools. The single most "how did I not know this" checkbox in the panel.',
  },
  {
    name: 'Live expressions',
    where: 'Console → the eye icon',
    desc: 'Pin document.activeElement and Tab through the page: you watch focus move in real time without pausing. The keyboard test, with a dashboard.',
  },
  {
    name: 'Lighthouse',
    where: 'its own panel',
    desc: 'No install needed — and its accessibility audit is axe-core, the same engine this site\'s test suite runs. Anything below 100 lists the machine-checkable failures with the failing nodes.',
  },
  {
    name: "Firefox's accessibility inspector",
    where: 'Firefox → Accessibility tab',
    desc: 'Its own full tree, a "check for issues" sweep (contrast, keyboard, text labels), and a tabbing-order overlay drawn directly on the page. Worth keeping Firefox around for on its own.',
  },
]

const addOns = [
  {
    name: 'axe DevTools',
    by: 'Deque',
    desc: 'The same engine as Lighthouse\'s audit, but scoped: scan one component instead of the page, and get each failing node pinpointed with its rule documentation. The extension form of the suite this site runs in CI.',
  },
  {
    name: 'Accessibility Insights for Web',
    by: 'Microsoft',
    desc: 'FastPass draws tab stops on the page as numbered lines while you Tab — the visualization DevTools doesn\'t have — and the guided assessment walks a full manual WCAG review, question by question.',
  },
  {
    name: 'WAVE',
    by: 'WebAIM',
    desc: 'Renders findings as icons on the page itself: headings, landmarks, labels, and errors all visible at once. The didactic one — made for showing a page\'s structure to someone who doesn\'t live in DevTools.',
  },
]
</script>

<style scoped lang="scss">
@layer components {
  .devtools-title {
    margin: 0;
    max-inline-size: 24ch;
    font-size: var(--text-display-sm);
    line-height: 1.05;
    letter-spacing: -0.02em;
    text-wrap: balance;
    color: var(--bp-ink);
  }

  .devtools-lede {
    max-inline-size: 58ch;
    margin-block: var(--space-4) 0;
    font-size: var(--text-lg);
    line-height: var(--leading-normal);
    color: var(--bp-ink-2);
  }

  .devtools-section {
    margin-block-start: var(--space-16);
    max-inline-size: 68ch;
  }

  .devtools-h2 {
    margin: 0 0 var(--space-4);
    font-size: var(--text-2xl);
    letter-spacing: -0.01em;
    color: var(--bp-ink);
  }

  .devtools-p {
    margin-block: var(--space-4) 0;
    max-inline-size: 62ch;
    line-height: var(--leading-normal);
    color: var(--bp-ink-2);
  }

  .devtools-features {
    display: grid;
    gap: var(--space-2);
    margin-block: var(--space-6) 0;
  }

  .devtools-feature {
    padding: var(--space-3) var(--space-4);
    border: 1px solid var(--bp-line-strong);
    border-radius: var(--radius-md);
    background-color: var(--bp-sheet);
    break-inside: avoid;

    @include high-contrast {
      border-color: currentcolor;
    }
  }

  .devtools-feature-head {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-1) var(--space-3);
    align-items: baseline;
  }

  .devtools-feature-name {
    color: var(--bp-ink);
  }

  .devtools-feature-where {
    font-family: var(--bp-mono);
    font-size: 0.6875rem;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: var(--bp-accent);
  }

  .devtools-feature-desc {
    margin: var(--space-1) 0 0;
    font-size: var(--text-sm);
    line-height: var(--leading-normal);
    color: var(--bp-ink-2);
  }
}
</style>
