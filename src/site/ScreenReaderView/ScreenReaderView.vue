<template>
  <SiteFrame sheet="A·03" sheet-title="Screen reader">
    <h1 class="screen-reader-title">A screen reader&rsquo;s first fifteen minutes</h1>
    <p class="screen-reader-lede">
      Nothing teaches accessibility faster than hearing your own page through a
      <GlossaryRef id="screen-reader">screen reader</GlossaryRef> — and nothing
      gets postponed harder. This sheet is the on-ramp: the handful of
      keystrokes that matter, and a plan for the first fifteen minutes.
    </p>

    <section class="screen-reader-section">
      <h2 class="screen-reader-h2">Two rules before you start</h2>
      <p class="screen-reader-p">
        <strong>Learn the stop key before anything else.</strong> Speech you
        can&rsquo;t silence is why most first attempts end inside a minute.
        It&rsquo;s <kbd>Control</kbd> — on both.
      </p>
      <p class="screen-reader-p">
        <strong>Don&rsquo;t arrow through the page word by word.</strong>
        That&rsquo;s the tourist&rsquo;s walk. People who use screen readers
        daily pull up the list of headings and jump — WebAIM&rsquo;s surveys
        have found heading navigation the most common way to find information
        for over a decade. Your job isn&rsquo;t to narrate the page; it&rsquo;s
        to check the shortcuts have somewhere to land.
      </p>
    </section>

    <section class="screen-reader-section">
      <h2 class="screen-reader-h2">VoiceOver, already on your Mac</h2>
      <p class="screen-reader-p">
        Ships with macOS. Pair it with Safari — that&rsquo;s the combination
        Apple builds and tests together.
      </p>
      <dl class="screen-reader-keys">
        <div v-for="row in voiceOverKeys" :key="row.does" class="screen-reader-key">
          <dt class="screen-reader-key-combo">
            <template v-for="(k, i) in row.keys" :key="k">
              <span v-if="i" aria-hidden="true">+</span>
              <kbd>{{ k }}</kbd>
            </template>
          </dt>
          <dd class="screen-reader-key-does">{{ row.does }}</dd>
        </div>
      </dl>
    </section>

    <section class="screen-reader-section">
      <h2 class="screen-reader-h2">NVDA, free on Windows</h2>
      <p class="screen-reader-p">
        Download it from <a href="https://www.nvaccess.org/">nvaccess.org</a>;
        it pairs well with both Chrome and Firefox. On web pages it runs in
        browse mode, which is why single letters below work as jumps — the
        page is treated as a document, not a text field.
      </p>
      <dl class="screen-reader-keys">
        <div v-for="row in nvdaKeys" :key="row.does" class="screen-reader-key">
          <dt class="screen-reader-key-combo">
            <template v-for="(k, i) in row.keys" :key="k">
              <span v-if="i" aria-hidden="true">+</span>
              <kbd>{{ k }}</kbd>
            </template>
          </dt>
          <dd class="screen-reader-key-does">{{ row.does }}</dd>
        </div>
      </dl>
    </section>

    <section class="screen-reader-section">
      <h2 class="screen-reader-h2">The phone in your pocket</h2>
      <p class="screen-reader-p">
        In WebAIM&rsquo;s latest survey, 91.3% of screen reader users reported
        using one on a mobile device — the phone pass is the majority
        experience, not extra credit. On an iPhone: Settings → Accessibility →
        VoiceOver, and set the side-button triple-press shortcut while
        you&rsquo;re there. On Android the same job is TalkBack.
      </p>
      <dl class="screen-reader-keys">
        <div v-for="row in phoneGestures" :key="row.does" class="screen-reader-key">
          <dt class="screen-reader-key-combo"><kbd>{{ row.gesture }}</kbd></dt>
          <dd class="screen-reader-key-does">{{ row.does }}</dd>
        </div>
      </dl>
    </section>

    <section class="screen-reader-section">
      <h2 class="screen-reader-h2">Spend the fifteen minutes like this</h2>
      <ol class="screen-reader-plan">
        <li>
          <strong>Minutes 0–3, somewhere you didn&rsquo;t build.</strong>
          Turn the screen reader on, on a page you have no stake in, and
          practice the stop key until it&rsquo;s a reflex. You can&rsquo;t
          think while it talks; everyone silences it constantly.
        </li>
        <li>
          <strong>3–6, the outline.</strong> On your own page, pull up the
          heading list — the rotor on VoiceOver, the elements list on NVDA —
          and read only that. Does it tell the page&rsquo;s story in order?
          That list is your page&rsquo;s table of contents, and it&rsquo;s
          often the first bug report.
        </li>
        <li>
          <strong>6–9, the landmarks.</strong> Jump by landmark. Is there a
          main? Do repeated navs have names that tell them apart? Then press
          <kbd>Tab</kbd> once from the top of the page: does a skip link
          surface?
        </li>
        <li>
          <strong>9–12, the controls.</strong> <kbd>Tab</kbd> through
          everything interactive. Each stop should announce a name, a role,
          and a state. Silence, &ldquo;clickable&rdquo;, or
          &ldquo;button&rdquo; with no name are your bugs. Submit a form
          empty: does focus land somewhere that explains what went wrong?
        </li>
        <li>
          <strong>12–15, one real task.</strong> Pick the page&rsquo;s main
          job and finish it with your eyes off the screen. Slow is fine —
          stuck is a finding.
        </li>
      </ol>
    </section>

    <section class="screen-reader-section">
      <h2 class="screen-reader-h2">What fifteen minutes doesn&rsquo;t prove</h2>
      <p class="screen-reader-p">
        It doesn&rsquo;t make you a screen reader user. People who rely on
        this software are far faster than you&rsquo;ll be today and lean on
        shortcuts you haven&rsquo;t met — your slowness is yours, not theirs.
        And passing your own ear test is not the same as being accessible:
        this catches the loud failures. The quiet ones still need
        <a href="/proof.html#testing-layers">the layered model</a> — and,
        eventually, feedback from people who use this software every day.
      </p>
    </section>
  </SiteFrame>
</template>

<script setup lang="ts">
import SiteFrame from '../SiteFrame/SiteFrame.vue'
import GlossaryRef from '../../glossary/GlossaryRef.vue'

const voiceOverKeys = [
  {
    keys: ['⌘', 'F5'],
    does: 'Turn VoiceOver on or off. On a Touch ID Mac, hold ⌘ and press Touch ID three times.',
  },
  { keys: ['Control'], does: 'Stop speech, immediately. Learn this one first.' },
  {
    keys: ['Control', 'Option'],
    does: 'The VO keys, held at the start of every command below — written as VO. Caps Lock works too.',
  },
  { keys: ['VO', '→'], does: 'Move to the next item; ← moves back.' },
  { keys: ['VO', 'Space'], does: 'Press the thing you are on.' },
  {
    keys: ['VO', 'U'],
    does: 'Open the rotor — lists of headings, landmarks, links, and form controls. Switch lists with ← and →.',
  },
  { keys: ['VO', '⌘', 'H'], does: 'Jump to the next heading.' },
  { keys: ['VO', 'A'], does: 'Read continuously from here.' },
]

const nvdaKeys = [
  { keys: ['Ctrl', 'Alt', 'N'], does: 'Start NVDA.' },
  { keys: ['Control'], does: 'Stop speech — same reflex, same key.' },
  {
    keys: ['Insert'],
    does: 'The NVDA key, for commands that need it. Caps Lock can stand in if you chose that at setup.',
  },
  { keys: ['H'], does: 'Jump to the next heading; Shift + H goes back.' },
  { keys: ['1–6'], does: 'Jump to the next heading of exactly that level.' },
  { keys: ['D'], does: 'Jump to the next landmark.' },
  { keys: ['K'], does: 'Jump to the next link.' },
  { keys: ['F'], does: 'Jump to the next form field.' },
  {
    keys: ['Insert', 'F7'],
    does: 'The elements list — every heading, link, and landmark on the page in one searchable dialog.',
  },
  { keys: ['Insert', '↓'], does: 'Read continuously from here.' },
]

const phoneGestures = [
  { gesture: 'Swipe →', does: 'Move to the next item; swipe ← moves back.' },
  { gesture: 'Double-tap', does: 'Press the item you just heard.' },
  { gesture: 'Two-finger tap', does: 'Stop speech.' },
  {
    gesture: 'Two-finger twist',
    does: 'The rotor — choose what swiping up and down steps through, headings included.',
  },
]
</script>

<style scoped lang="scss">
@layer components {
  .screen-reader-title {
    margin: 0;
    max-inline-size: 24ch;
    font-size: var(--text-display-sm);
    line-height: 1.05;
    letter-spacing: -0.02em;
    text-wrap: balance;
    color: var(--bp-ink);
  }

  .screen-reader-lede {
    max-inline-size: 58ch;
    margin-block: var(--space-4) 0;
    font-size: var(--text-lg);
    line-height: var(--leading-normal);
    color: var(--bp-ink-2);
  }

  .screen-reader-section {
    margin-block-start: var(--space-16);
    max-inline-size: 68ch;
  }

  .screen-reader-h2 {
    margin: 0 0 var(--space-4);
    font-size: var(--text-2xl);
    letter-spacing: -0.01em;
    color: var(--bp-ink);
  }

  .screen-reader-p {
    margin-block: var(--space-4) 0;
    max-inline-size: 62ch;
    line-height: var(--leading-normal);
    color: var(--bp-ink-2);
  }

  .screen-reader-keys {
    display: grid;
    gap: var(--space-2);
    margin-block: var(--space-6) 0;
  }

  .screen-reader-key {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-1) var(--space-4);
    align-items: baseline;
    padding: var(--space-2) var(--space-3);
    border: 1px solid var(--bp-line-strong);
    border-radius: var(--radius-md);
    background-color: var(--bp-sheet);
    break-inside: avoid;

    @include high-contrast {
      border-color: currentcolor;
    }
  }

  .screen-reader-key-combo {
    flex: 0 0 11rem;
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-1);
    align-items: center;
    color: var(--bp-ink-2);
  }

  .screen-reader-key-does {
    flex: 1 1 20ch;
    margin: 0;
    font-size: var(--text-sm);
    line-height: var(--leading-normal);
    color: var(--bp-ink-2);
  }

  .screen-reader-section kbd {
    padding: 1px var(--space-2);
    border: 1px solid var(--bp-line-strong);
    border-block-end-width: 2px;
    border-radius: var(--radius-sm);
    background-color: var(--bp-sheet);
    font-family: var(--bp-mono);
    font-size: var(--text-sm);
    font-weight: 600;
    color: var(--bp-ink);
    white-space: nowrap;

    @include high-contrast {
      border-color: currentcolor;
    }
  }

  .screen-reader-plan {
    display: grid;
    gap: var(--space-4);
    margin-block: var(--space-6) 0;
    padding-inline-start: var(--space-6);
  }

  .screen-reader-plan li {
    line-height: var(--leading-normal);
    color: var(--bp-ink-2);
    break-inside: avoid;
  }

  .screen-reader-plan strong,
  .screen-reader-p strong {
    color: var(--bp-ink);
  }
}
</style>
