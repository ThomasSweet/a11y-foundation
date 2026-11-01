<template>
  <SiteFrame sheet="T·02" sheet-title="Checks">
    <h1 class="checks-title">Checks</h1>
    <p class="checks-lede">
      Playwright matchers that operate a page’s widgets by keyboard, in
      Chromium, Firefox and WebKit, and check that they behave as they claim.
      axe reads the markup. These press the button and look at what happened.
    </p>

    <section class="checks-section">
      <h2 class="checks-h2">What they check</h2>
      <dl class="checks-list">
        <div v-for="check in checks" :key="check.matcher" class="checks-item">
          <dt class="checks-item-name">{{ check.name }}</dt>
          <dd class="checks-item-desc">{{ check.desc }}</dd>
          <dd class="checks-item-matcher"><code>{{ check.matcher }}</code></dd>
        </div>
      </dl>
    </section>

    <section class="checks-section">
      <h2 class="checks-h2">Why they exist</h2>
      <p class="checks-p">
        In <a :href="survey">WebAIM’s screen reader survey #10</a> (December 2023
        to January 2024), respondents ranked interactive elements like menus,
        tabs and dialogs that do not behave as expected second among problems,
        after CAPTCHA. The 2026 survey did not ask that question. Two of these
        checks cover part of that item: disclosures and dialogs.
      </p>
      <p class="checks-p">
        axe reads markup, so it cannot press a button and look at what
        happened. These checks do that, and nothing else. Run them next to axe,
        not instead of it.
      </p>
    </section>

    <section class="checks-section">
      <h2 class="checks-h2">Use them</h2>
      <CodeBlock :code="install" label="sh" />
      <CodeBlock :code="example" label="TS" />
    </section>

    <section class="checks-section">
      <h2 class="checks-h2">What they found here</h2>
      <p class="checks-p">
        This site runs all three on every change, in all three engines: every
        page, the craft and showcase dialogs, and the craft form after an empty
        submit. Read on 1 November 2026, with version 0.3.0:
      </p>
      <ul class="checks-findings">
        <li>
          <strong>One warning, on purpose.</strong> Escape does not close the
          <a href="/showcase.html#showcase-dialog-polish">takeover dialog</a> on
          the showcase, because <code>closedby="none"</code> is the point of
          that demo. The run expects exactly that warning and nothing more.
        </li>
        <li>
          <strong>One browser bug.</strong> Chromium put blank Tab stops behind
          the showcase’s dialogs, on the carousel’s scroll markers. The carousel
          now hides its markers while a modal dialog is open.
        </li>
        <li>
          <strong>Nothing else.</strong> No false expanded state, and nothing
          untied.
        </li>
      </ul>
      <p class="checks-p">
        The sample is small. The run presses six different widgets, and no page
        here shows an error message of its own yet, so “nothing untied” means
        there was nothing to tie. That check waits for the first one.
      </p>
    </section>

    <section class="checks-section">
      <h2 class="checks-h2">What a pass does not prove</h2>
      <p class="checks-p">
        A pass is not conformance. The checks walk the keyboard only: a dialog
        can hold keyboard focus while a screen reader’s reading cursor wanders
        into the page behind. They do not check that a panel holds the right
        content, that a dialog has a name, or that an error message helps or is
        announced.
      </p>
    </section>

    <section class="checks-section">
      <h2 class="checks-h2">Everything else</h2>
      <p class="checks-p">
        <a :href="readme">The README</a> ships with each version, and has every
        finding code, the engine notes and what each check leaves out. The
        package is on <a :href="npm">npm</a> and
        <a :href="repository">GitHub</a>, MIT licensed. A check that got a page
        wrong is the most useful report: <a :href="issues">open an issue</a>
        with the smallest page that shows it.
      </p>
    </section>
  </SiteFrame>
</template>

<script setup lang="ts">
import SiteFrame from '../SiteFrame/SiteFrame.vue'
import CodeBlock from '../../showcases/CodeBlock/CodeBlock.vue'

const repository = 'https://github.com/ThomasSweet/behaviour-checks'
const readme = `${repository}#readme`
const issues = `${repository}/issues`
const npm = 'https://www.npmjs.com/package/@accessible-by-default/checks'
const survey = 'https://webaim.org/projects/screenreadersurvey10/'

const install = 'npm install --save-dev @accessible-by-default/checks'

const example = `import { test } from '@playwright/test'
import { expect } from '@accessible-by-default/checks'

test('disclosures and popovers report their state truthfully', async ({ page }) => {
  await page.goto('/settings')
  await expect(page.locator('main')).toHaveTruthfulExpandedState()
})

test('the cart dialog holds focus and gives it back', async ({ page }) => {
  await page.goto('/shop')
  await expect(page.getByRole('button', { name: 'Cart' })).toOpenADialogThatHoldsFocus()
})

test('every error is tied to its field', async ({ page }) => {
  await page.goto('/booking')
  await page.getByRole('button', { name: 'Book' }).click()
  await expect(page.locator('form')).toHaveErrorsTiedToFields()
})`

const checks = [
  {
    name: 'Expanded state tells the truth',
    desc: 'A disclosure that says it is collapsed hides its panel.',
    matcher: 'toHaveTruthfulExpandedState',
  },
  {
    name: 'A dialog holds focus and gives it back',
    desc: 'Tab and Shift+Tab never reach the page behind a modal, and focus returns to the opener.',
    matcher: 'toOpenADialogThatHoldsFocus',
  },
  {
    name: 'Errors are tied to their fields',
    desc: 'Every invalid field has a message a screen reader can find from the field.',
    matcher: 'toHaveErrorsTiedToFields',
  },
]
</script>

<style scoped lang="scss">
@layer components {
  .checks-title {
    margin: 0;
    font-size: var(--text-display-sm);
    line-height: 1.05;
    letter-spacing: -0.02em;
    color: var(--bp-ink);
  }

  .checks-lede {
    max-inline-size: 58ch;
    margin-block: var(--space-4) 0;
    font-size: var(--text-lg);
    line-height: var(--leading-normal);
    color: var(--bp-ink-2);
  }

  .checks-section {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: var(--space-4);
    margin-block-start: var(--space-16);
    max-inline-size: 68ch;
  }

  .checks-h2 {
    margin: 0;
    font-size: var(--text-2xl);
    letter-spacing: -0.01em;
    color: var(--bp-ink);
  }

  .checks-p {
    margin: 0;
    max-inline-size: 62ch;
    line-height: var(--leading-normal);
    color: var(--bp-ink-2);
  }

  .checks-list {
    display: grid;
    gap: var(--space-6);
    margin: 0;
  }

  .checks-item-name {
    font-weight: 700;
    color: var(--bp-ink);
  }

  .checks-item-desc {
    margin: var(--space-1) 0 0;
    line-height: var(--leading-normal);
    color: var(--bp-ink-2);
  }

  .checks-item-matcher {
    margin: var(--space-1) 0 0;
    font-size: var(--text-sm);
    overflow-wrap: anywhere;
    color: var(--bp-ink-2);
  }

  .checks-findings {
    display: grid;
    gap: var(--space-3);
    margin: 0;
    padding-inline-start: var(--space-6);
    line-height: var(--leading-normal);
    color: var(--bp-ink-2);
  }

  .checks-findings strong {
    color: var(--bp-ink);
  }
}
</style>
