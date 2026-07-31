<template>
  <SiteFrame sheet="P·01" sheet-title="Audit room">
    <h1 class="audit-room-title">The audit room</h1>
    <p class="audit-room-lede">
      A page broken on purpose. Below sits the release page for a band's
      debut EP — and hidden in it are <strong>twelve accessibility
      barriers</strong>, planted deliberately. Your job is the hunt: the
      heading list, the tab key, the accessibility pane, the emulations —
      everything <a href="/proof.html">the proof chapter</a> and the
      reference sheets taught. A scanner finds two of the twelve — this
      site's own suite measured it. The other ten need you.
    </p>
    <p class="audit-room-contract">
      The contract: every barrier lives inside the marked specimen, nothing
      outside it is broken, none of its links or buttons do anything real,
      and the answers wait at the end.
      <a href="#audit-room-answers">Skip past the broken page, straight to
      the answers.</a>
    </p>

    <section id="audit-specimen" class="audit-room-specimen" aria-label="The specimen: a deliberately broken page">
      <p class="audit-room-specimen-tag">Specimen · deliberately broken · barriers 1–12</p>
      <AuditSpecimen />
    </section>

    <p class="audit-room-end">
      End of the broken page. Everything from here on is compliant again.
    </p>

    <section class="audit-room-section" aria-labelledby="audit-room-answers">
      <h2 id="audit-room-answers" class="audit-room-h2">Answers</h2>
      <p class="audit-room-p">
        Each barrier below opens to a hint first; the answer hides one level
        deeper. Honest scoring is your own business — that's why there is no
        counter.
      </p>
      <ol class="audit-room-answers">
        <li v-for="b in barriers" :key="b.n" class="audit-room-answer">
          <details>
            <summary class="audit-room-hint">
              Barrier {{ b.n }} — {{ b.hint }}
            </summary>
            <details class="audit-room-reveal">
              <summary>Reveal the answer</summary>
              <div class="audit-room-reveal-body">
                <p>{{ b.what }}</p>
                <p class="audit-room-meta">
                  <a :href="b.criterionHref">WCAG {{ b.criterion }}</a>
                  · Caught by: {{ b.caught }}
                </p>
                <p>
                  {{ b.fix }}
                  <a v-if="b.fixLink" :href="b.fixLink.href">{{ b.fixLink.label }}</a>
                </p>
              </div>
            </details>
          </details>
        </li>
      </ol>
    </section>

    <section class="audit-room-section" aria-labelledby="audit-room-about">
      <h2 id="audit-room-about" class="audit-room-h2">About this page</h2>
      <p class="audit-room-p">
        The band is real; this page is not its website. Fitis exists, the EP
        exists, and the actual site — which is not broken on purpose — lives
        at <a href="https://fitis-band.de">fitis-band.de</a>. Everything
        else here is fiction in service of the exercise.
      </p>
      <p class="audit-room-p">
        Found barriers like these on a page you work on? The proof chapter
        ends with <a href="/proof.html#testing-filing">how to file what you
        find</a> — impact first, one barrier per ticket, and the fix is
        usually a swap.
      </p>
    </section>

    <template #prevnext>
      <nav class="audit-room-prevnext" aria-label="Adjacent pages">
        <a class="audit-room-nav" href="/proof.html">
          <span class="audit-room-nav-k">← Previous</span>
          <span class="audit-room-nav-t">04 · The proof</span>
        </a>
        <a class="audit-room-nav audit-room-nav-next" href="/#reference-sheets">
          <span class="audit-room-nav-k">Next →</span>
          <span class="audit-room-nav-t">A · Reference sheets</span>
        </a>
      </nav>
    </template>
  </SiteFrame>
</template>

<script setup lang="ts">
import SiteFrame from '../SiteFrame/SiteFrame.vue'
import AuditSpecimen from './AuditSpecimen.vue'

interface Barrier {
  n: number
  hint: string
  what: string
  criterion: string
  criterionHref: string
  caught: string
  fix: string
  fixLink?: { label: string; href: string }
}

const barriers: Barrier[] = [
  {
    n: 1,
    hint: 'try to press the most important thing on the page',
    what: '"Listen now" is a styled div. It looks like the primary button, but it is not focusable, not pressable by keyboard, and announces as nothing — the tree shows role generic, no name that matters.',
    criterion: '2.1.1 Keyboard',
    criterionHref: 'https://www.w3.org/WAI/WCAG22/Understanding/keyboard.html',
    caught: 'the Tab key, the accessibility pane; a scanner stays silent',
    fix: 'A native button element brings focus, keyboard behaviour, role, and name for free —',
    fixLink: { label: 'the agent skill’s first swap.', href: '/agent-skill.html' },
  },
  {
    n: 2,
    hint: 'one image says nothing at all',
    what: 'The EP cover has no alt attribute. A screen reader announces the filename or skips it; either way the most important image on the page is silence.',
    criterion: '1.1.1 Non-text Content',
    criterionHref: 'https://www.w3.org/WAI/WCAG22/Understanding/non-text-content.html',
    caught: 'a scanner — this one axe finds',
    fix: 'alt="Cover of Alles auf Anfang: the band walks through darkness in a long-exposure blur" — describe what it shows, not that it is an image.',
  },
  {
    n: 3,
    hint: 'one of the photos is lying',
    what: 'The band photo has alt="IMG_2047.jpg". An alt exists, so scanners pass it — but hearing a camera filename is as useless as hearing nothing.',
    criterion: '1.1.1 Non-text Content',
    criterionHref: 'https://www.w3.org/WAI/WCAG22/Understanding/non-text-content.html',
    caught: 'a human ear only — axe sees an alt and moves on',
    fix: 'Useful alt text, or alt="" if the image is decoration. The judgment is exactly what automation cannot make.',
  },
  {
    n: 4,
    hint: 'pull the heading list — where did the page go?',
    what: 'Tracklist, Tour, Listen, Mailing list all look like headings and are all styled paragraphs. The rotor’s heading list is empty; a screen reader user has no outline to jump by.',
    criterion: '1.3.1 Info and Relationships',
    criterionHref: 'https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html',
    caught: 'the heading list (rotor / elements list), the tree',
    fix: 'Real h2 elements. Style is free; structure is what the shortcuts land on —',
    fixLink: { label: 'the fifteen-minute plan, step two.', href: '/screen-reader.html' },
  },
  {
    n: 5,
    hint: 'read the band’s self-description in bad light',
    what: 'The tagline is #a7a7a7 on white — roughly 2.6:1, far under the 4.5:1 minimum for body text.',
    criterion: '1.4.3 Contrast (Minimum)',
    criterionHref: 'https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html',
    caught: 'a scanner, or the color picker’s contrast readout',
    fix: 'Pick a passing gray in DevTools — the picker draws the AA line for you —',
    fixLink: { label: 'sheet A·04 shows where.', href: '/devtools.html' },
  },
  {
    n: 6,
    hint: 'what is the email field actually called?',
    what: 'The signup field’s only label is its placeholder. The name vanishes the moment you type, low-contrast by design, and never a real label — the tree shows the field named by a hint that is about to disappear.',
    criterion: '3.3.2 Labels or Instructions',
    criterionHref: 'https://www.w3.org/WAI/WCAG22/Understanding/labels-or-instructions.html',
    caught: 'the accessibility pane; most scanners accept it',
    fix: 'A visible label element, wired with for — and an autocomplete token while you are there (1.3.5).',
  },
  {
    n: 7,
    hint: 'which shows can you still get into?',
    what: 'Sold-out dates differ from open ones by red text alone. With deuteranopia — or a monochrome display, or forced colors — the distinction evaporates.',
    criterion: '1.4.1 Use of Color',
    criterionHref: 'https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html',
    caught: 'the vision-deficiency emulation (A·04), or any careful eye',
    fix: 'Say it in text — the word "ausverkauft" is actually already doing the work here; the barrier is that only its color distinguishes it from the ticket link next to it. Add an explicit "Tickets" link text and the color becomes reinforcement, not the message.',
  },
  {
    n: 8,
    hint: 'Tab into the signup form and watch your position vanish',
    what: 'The form controls set outline: none (and this site had to fight its own protections to plant that). Keyboard users lose their place exactly where the page asks them to type.',
    criterion: '2.4.7 Focus Visible',
    criterionHref: 'https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html',
    caught: 'the Tab key; scanners stay silent',
    fix: 'Never remove an outline without replacing it. :focus-visible styling costs one declaration.',
  },
  {
    n: 9,
    hint: 'pull the links list and try to tell them apart',
    what: 'Three links in a row read "click here". In the rotor’s links list — which strips their surroundings — they are indistinguishable.',
    criterion: '2.4.4 Link Purpose (In Context)',
    criterionHref: 'https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context.html',
    caught: 'the rotor / elements list',
    fix: 'Name the destination: "Listen on Spotify". The sentence around the link is not what a links list reads.',
  },
  {
    n: 10,
    hint: 'ask the tracklist which column is which',
    what: 'The tracklist is a table of td cells only — no th, no headers. The tree shows a grid of anonymous cells; a screen reader can’t answer "which column am I in?"',
    criterion: '1.3.1 Info and Relationships',
    criterionHref: 'https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html',
    caught: 'the accessibility pane; scanners only partially',
    fix: 'th elements with scope="col" — number, title, length — and the table starts answering questions.',
  },
  {
    n: 11,
    hint: 'something on this page never stops moving',
    what: 'The "OUT NOW" badge bounces forever, and its CSS never asks permission — no reduced-motion guard anywhere. If it is holding still for you, that is this site’s global animation kill stepping in front of it; the specimen itself never asked. Drop the same CSS into an ordinary page and it bounces at everyone, including the people who switched motion off.',
    criterion: '2.3.3 Animation from Interactions',
    criterionHref: 'https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html',
    caught: 'the Styles pane — no media query wraps the animation; on a page without a global kill, the reduced-motion emulation (A·04) exposes it too',
    fix: 'Wrap it in @media (prefers-reduced-motion: no-preference) — motion is the enhancement, stillness the default.',
  },
  {
    n: 12,
    hint: 'ask the mailing-list button its name, then read its label',
    what: 'The button shows "Join the mailing list" but carries aria-label="subscribe". Voice-control users say what they see — "click join the mailing list" — and nothing happens, because the visible words are not in the accessible name.',
    criterion: '2.5.3 Label in Name',
    criterionHref: 'https://www.w3.org/WAI/WCAG22/Understanding/label-in-name.html',
    caught: 'the accessibility pane — axe’s rule for this exists but ships off by default (experimental)',
    fix: 'Let the content name it — or if ARIA must add context, start with the visible words,',
    fixLink: { label: 'as the tree section showed.', href: '/proof.html#testing-tree' },
  },
]
</script>

<style scoped lang="scss">
@layer components {
  .audit-room-title {
    margin: 0;
    max-inline-size: 24ch;
    font-size: var(--text-display-sm);
    line-height: 1.05;
    letter-spacing: -0.02em;
    text-wrap: balance;
    color: var(--bp-ink);
  }

  .audit-room-lede {
    max-inline-size: 58ch;
    margin-block: var(--space-4) 0;
    font-size: var(--text-lg);
    line-height: var(--leading-normal);
    color: var(--bp-ink-2);
  }

  .audit-room-lede strong {
    color: var(--bp-ink);
  }

  .audit-room-contract {
    max-inline-size: 62ch;
    margin-block: var(--space-4) 0;
    line-height: var(--leading-normal);
    color: var(--bp-ink-2);
  }

  .audit-room-specimen {
    max-inline-size: 68ch;
    margin-block-start: var(--space-8);
    padding: var(--space-4);
    border: 2px dashed var(--bp-redline);
    border-radius: var(--radius-md);
    scroll-margin-block-start: var(--space-8);

    @include high-contrast {
      border-color: currentcolor;
    }
  }

  .audit-room-specimen-tag {
    margin: 0 0 var(--space-3);
    font-family: var(--bp-mono);
    font-size: 0.6875rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--bp-redline);
  }

  .audit-room-end {
    max-inline-size: 62ch;
    margin-block: var(--space-4) 0;
    font-family: var(--bp-mono);
    font-size: var(--text-sm);
    color: var(--bp-ink-2);
  }

  .audit-room-section {
    margin-block-start: var(--space-16);
    max-inline-size: 68ch;
  }

  .audit-room-h2 {
    margin: 0 0 var(--space-4);
    font-size: var(--text-2xl);
    letter-spacing: -0.01em;
    color: var(--bp-ink);
    scroll-margin-block-start: var(--space-8);
  }

  .audit-room-p {
    margin-block: var(--space-4) 0;
    max-inline-size: 62ch;
    line-height: var(--leading-normal);
    color: var(--bp-ink-2);
  }

  .audit-room-answers {
    display: grid;
    gap: var(--space-2);
    margin-block: var(--space-6) 0;
    padding: 0;
    list-style: none;
  }

  .audit-room-answer > details {
    padding: var(--space-3) var(--space-4);
    border: 1px solid var(--bp-line-strong);
    border-radius: var(--radius-md);
    background-color: var(--bp-sheet);

    @include high-contrast {
      border-color: currentcolor;
    }
  }

  .audit-room-hint {
    font-weight: 600;
    color: var(--bp-ink);
    cursor: pointer;

    &:focus-visible {
      outline: var(--focus-ring-width) solid var(--focus-ring-color);
      outline-offset: 2px;
    }
  }

  .audit-room-reveal {
    margin-block-start: var(--space-3);

    summary {
      inline-size: fit-content;
      font-family: var(--bp-mono);
      font-size: 0.6875rem;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--bp-accent);
      cursor: pointer;

      &:focus-visible {
        outline: var(--focus-ring-width) solid var(--focus-ring-color);
        outline-offset: 2px;
      }
    }
  }

  .audit-room-reveal-body {
    display: grid;
    gap: var(--space-2);
    padding-block-start: var(--space-2);
    font-size: var(--text-sm);
    line-height: var(--leading-normal);
    color: var(--bp-ink-2);

    p {
      margin: 0;
    }
  }

  .audit-room-meta {
    font-family: var(--bp-mono);
    font-size: 0.75rem;
    letter-spacing: 0.02em;
  }

  .audit-room-prevnext {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-4);
    margin-block-start: clamp(var(--space-8), 5vw, var(--space-16));
  }

  @media (width <= 40rem) {
    .audit-room-prevnext {
      grid-template-columns: 1fr;
    }
  }

  .audit-room-nav {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
    padding: var(--space-4) var(--space-6);
    border: 1px solid var(--bp-line-strong);
    color: var(--bp-ink-2);
    text-decoration: none;
    transition:
      border-color var(--duration-fast) var(--easing-standard),
      background-color var(--duration-fast) var(--easing-standard);

    @include can-hover {
      &:hover {
        border-color: var(--bp-accent);
        background: var(--bp-accent-soft);
      }
    }

    &:focus-visible {
      outline: var(--focus-ring-width) solid var(--focus-ring-color);
      outline-offset: 2px;
    }

    @include high-contrast {
      border-color: currentcolor;
    }
  }

  .audit-room-nav-next {
    grid-column: -2 / -1;
    text-align: end;
  }

  .audit-room-nav-k {
    font-family: var(--bp-mono);
    font-size: 0.625rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--bp-ink-2);
  }

  .audit-room-nav-t {
    font-size: var(--text-lg);
    font-weight: 600;
    color: var(--bp-ink);
    transition: color var(--duration-fast) var(--easing-standard);
  }

  .audit-room-nav:hover .audit-room-nav-t,
  .audit-room-nav:focus-visible .audit-room-nav-t {
    color: var(--bp-accent);
  }
}
</style>
