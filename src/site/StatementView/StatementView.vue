<template>
  <SiteFrame sheet="S·02" sheet-title="Accessibility statement">
    <h1 class="statement-title">Accessibility statement</h1>
    <p class="statement-lede">
      What this site aims for, how it is tested, and what is known to fall
      short. Last reviewed on 1 November 2026.
    </p>

    <section class="statement-section">
      <h2 class="statement-h2">Where it stands</h2>
      <p class="statement-p">
        accessible-by-default.dev targets <a :href="wcag">WCAG 2.2 AA</a>. That
        is a target, not a conformance claim: the whole site has not been
        evaluated against it, the first known gap below fails it, and two
        practice pages fail on purpose.
      </p>
      <p class="statement-p">
        There is no accessibility overlay, no analytics, no third-party embed,
        and no audio or video.
      </p>
    </section>

    <section class="statement-section">
      <h2 class="statement-h2">What runs on every change</h2>
      <p class="statement-p">
        A change goes live only after these pass in the engines behind Chrome,
        Firefox and Safari:
      </p>
      <ul class="statement-list">
        <li>axe, set to the WCAG A and AA rules, on every content page.</li>
        <li>
          Keyboard paths: the skip link, dialog focus, popovers and theme
          persistence.
        </li>
        <li>
          <a href="/checks/">The checks package</a>, which presses the widgets
          and walks the dialogs.
        </li>
        <li>
          Layout at 320 CSS pixels, with WCAG text spacing, and at 200% text.
        </li>
        <li>
          Contrast of the glass surfaces and the text field in every theme, and
          focus rings that no box clips.
        </li>
        <li>
          Emulated forced colours and reduced motion, plus reduced transparency
          in Chromium, the only engine that reads it.
        </li>
      </ul>
      <p class="statement-p">
        The <a :href="workflow">CI workflow</a> and the
        <a :href="tests">tests</a> are public, and
        <a href="/proof.html">the proof chapter</a> says what each layer can and
        cannot catch. A green run does not prove conformance: the first known
        gap below got past all of it.
      </p>
    </section>

    <section class="statement-section">
      <h2 class="statement-h2">What is checked by hand</h2>
      <p class="statement-p">
        VoiceOver on the Mac, an iPhone and Safari itself are checked by hand
        from time to time, not before every change. NVDA, JAWS, TalkBack, voice
        control and switch access are not part of that, so this statement says
        nothing about how the site works with them.
      </p>
      <p class="statement-p">
        The announcements in the listening room are predictions worked out from
        the accessibility tree, not recordings of a running screen reader. The
        room says so.
      </p>
    </section>

    <section class="statement-section">
      <h2 class="statement-h2">Known gaps</h2>
      <ul class="statement-gaps">
        <li v-for="gap in gaps" :key="gap.name">
          <strong>{{ gap.name }}</strong> {{ gap.detail }}
        </li>
      </ul>
    </section>

    <section class="statement-section">
      <h2 class="statement-h2">Barriers here on purpose</h2>
      <p class="statement-p">
        Some things on this site are broken to teach something. They are not
        gaps:
      </p>
      <ul class="statement-list">
        <li>
          <a href="/audit-room.html">The audit room</a> and
          <a href="/listening-room.html">the listening room</a> each frame a page
          with planted barriers. Nothing outside the frame is broken.
        </li>
        <li>
          The break-it toggles on <a href="/standard.html">the standard</a> turn
          a criterion off so you can feel what it prevents.
        </li>
        <li>
          Escape does not close the
          <a href="/showcase.html#showcase-dialog-polish">takeover dialog</a> on
          the showcase, because <code>closedby="none"</code> is the point of
          that demo.
        </li>
      </ul>
    </section>

    <section class="statement-section">
      <h2 class="statement-h2">What it depends on</h2>
      <p class="statement-p">
        Every page is rendered to markup at build time, so its content is there
        before any JavaScript runs. The script only wakes up what is already on
        the page.
      </p>
      <p class="statement-p">
        The site is written for current Chrome, Firefox and Safari, and honours
        your motion, contrast, transparency and colour-scheme preferences. Demos
        under “Limited availability” use features still landing across engines:
        on an older browser they fall back to a simpler, still-usable form.
      </p>
      <p class="statement-p">
        It is a playground for showing how the web platform answers
        accessibility natively, made to be explored and learned from, not
        installed into a production app.
      </p>
    </section>

    <section class="statement-section">
      <h2 class="statement-h2">Found a barrier?</h2>
      <p class="statement-p">
        <a :href="barrierReport">File a barrier report</a> on GitHub, or email
        <a :href="`mailto:${email}`">{{ email }}</a> if you would rather not use
        GitHub. No report is too small.
      </p>
      <p class="statement-p">
        This statement lives in the repository, so its
        <a :href="history">history</a> is public. It changes in the same pull
        request as any gap it names.
      </p>
    </section>
  </SiteFrame>
</template>

<script setup lang="ts">
import SiteFrame from '../SiteFrame/SiteFrame.vue'

const repository = 'https://github.com/ThomasSweet/a11y-foundation'
const wcag = 'https://www.w3.org/TR/WCAG22/'
const workflow = `${repository}/blob/main/.github/workflows/ci.yml`
const tests = `${repository}/tree/main/tests`
const barrierReport = `${repository}/issues/new?template=barrier-report.yml`
const history = `${repository}/commits/main/src/site/StatementView/StatementView.vue`
const email = 'hello@accessible-by-default.dev'

const gaps = [
  {
    name: 'Demo control edges fail WCAG 1.4.11.',
    detail:
      'Eight form controls in demos on the standard, showcase and proof ' +
      'chapters have edges far under the 3:1 this AA criterion asks for, ' +
      'most of them about 1.3:1. Measured in Chromium on 1 November 2026.',
  },
  {
    name: 'Forced colours flatten control states.',
    detail:
      'Every control gets the same thin border, so the invalid, pressed and ' +
      'disabled edges disappear. Error messages keep their warning sign, but ' +
      'no page shows one yet. Measured in Chromium and Firefox on 29 October ' +
      '2026.',
  },
  {
    name: 'Chapter headings skip a level.',
    detail:
      'The standard, craft, showcase and proof go from the h1 straight to ' +
      'h3, so a heading list starts one level deep. Not a WCAG failure. ' +
      'Measured in Chromium on 1 November 2026.',
  },
  {
    name: 'On phones the contents come first.',
    detail:
      'A chapter’s contents sit before its title, in the reading order too, ' +
      'so the h1 starts 345 to 667 pixels down a 402 pixel wide screen. ' +
      'Measured in Chromium on 1 November 2026.',
  },
  {
    name: 'Small labels on phones.',
    detail:
      'The links in the chapter bar are 9 pixel capitals at the default text ' +
      'size. Measured in Chromium on 1 November 2026.',
  },
  {
    name: 'Some lists may lose their semantics.',
    detail:
      'Sixteen components remove list markers without restoring the list ' +
      'role, so Safari may not expose them as lists. Not measured.',
  },
  {
    name: 'The carousel demo ignores the theme chosen here.',
    detail: 'Its slides follow the operating system’s colour scheme instead.',
  },
  {
    name: 'The contents highlight can fade.',
    detail:
      'After a jump to a tall section, the clicked link in the chapter rail ' +
      'can stay faint. Visual only: the links carry no aria-current. Seen in ' +
      'all three engines on 29 October 2026.',
  },
]
</script>

<style scoped lang="scss">
@layer components {
  .statement-title {
    margin: 0;
    font-size: var(--text-display-sm);
    line-height: 1.05;
    letter-spacing: -0.02em;
    color: var(--bp-ink);
  }

  .statement-lede {
    max-inline-size: 58ch;
    margin-block: var(--space-4) 0;
    font-size: var(--text-lg);
    line-height: var(--leading-normal);
    color: var(--bp-ink-2);
  }

  .statement-section {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: var(--space-4);
    margin-block-start: var(--space-16);
    max-inline-size: 68ch;
  }

  .statement-h2 {
    margin: 0;
    font-size: var(--text-2xl);
    letter-spacing: -0.01em;
    color: var(--bp-ink);
  }

  .statement-p {
    margin: 0;
    max-inline-size: 62ch;
    line-height: var(--leading-normal);
    color: var(--bp-ink-2);
  }

  .statement-list,
  .statement-gaps {
    display: grid;
    gap: var(--space-3);
    margin: 0;
    padding-inline-start: var(--space-6);
    line-height: var(--leading-normal);
    color: var(--bp-ink-2);
  }

  .statement-gaps strong {
    color: var(--bp-ink);
  }
}
</style>
