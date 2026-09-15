<template>
  <PracticeRoom
    sheet="P·01"
    sheet-title="Audit room"
    title="The audit room"
    broken-href="/broken-page.html"
    broken-tag="Broken on purpose · barriers 1–12 · preview at 1:2"
    preview-title="Preview of the broken page"
    :prev="{ href: '/proof.html', kicker: '← Previous', title: '04 · The proof' }"
    :next="{ href: '/listening-room.html', kicker: 'Next →', title: 'P·02 · Listening room' }"
  >
    <template #lede>
      A page broken on purpose. Below sits the release page for a band's
      debut EP — and hidden in it are <strong>twelve accessibility
      barriers</strong>, planted deliberately. Your job is the hunt: the
      heading list, the tab key, the accessibility pane, the emulations —
      everything <a href="/proof.html">the proof chapter</a> and the
      reference sheets taught. A scanner finds two of the twelve — this
      site's own suite measured it. The other ten need you.
    </template>

    <template #contract>
      The contract: every barrier lives inside the framed page below,
      nothing outside the frame is broken, none of its links or buttons do
      anything real, and the answers wait at the end. The broken page is a
      page of its own — deliberately outside this site's styles and safety
      nets, so what you catch behaves the way it would in the wild. What
      sits below is only a half-scale preview; the hunt happens at full
      scale in its own tab. One warning: a barrier in there is a small
      badge that bounces and ignores your reduced-motion preference. If
      that's harmful for you,
      <a href="#audit-room-answers">skip past the broken page, straight to
      the answers.</a>
    </template>

    <template #note>
      Full-page DevTools, your own Lighthouse run — the hunt happens at
      full scale.
    </template>

    <PracticeAnswers id="audit-room-answers" :answers="barriers">
      <p>
        Each barrier below opens to a hint first; the answer hides one level
        deeper. Honest scoring is your own business — that's why there is no
        counter.
      </p>
    </PracticeAnswers>

    <PracticeSection id="audit-room-about" title="About this page">
      <p>
        The band is real; this page is not its website. Fitis exists, the EP
        exists, and the actual site — which is not broken on purpose — lives
        at <a href="https://fitis-band.de">fitis-band.de</a>. Everything
        else here is fiction in service of the exercise.
      </p>
      <p>
        Found barriers like these on a page you work on? The proof chapter
        ends with <a href="/proof.html#testing-filing">how to file what you
        find</a> — impact first, one barrier per ticket, and the fix is
        usually a swap.
      </p>
    </PracticeSection>
  </PracticeRoom>
</template>

<script setup lang="ts">
import PracticeAnswers from '../PracticeRoom/PracticeAnswers.vue'
import PracticeRoom from '../PracticeRoom/PracticeRoom.vue'
import PracticeSection from '../PracticeRoom/PracticeSection.vue'
import type { Answer } from '../PracticeRoom/practiceAnswers'

const barriers: Answer[] = [
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
    what: 'The tagline is #a7a7a7 on white — roughly 2.4:1, far under the 4.5:1 minimum for body text.',
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
    what: 'The form controls set outline: none, and inside its own little page there is no preferences layer to overrule it. Tab into the form and your position simply vanishes — exactly where the page asks you to type.',
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
    what: 'The "OUT NOW" badge bounces forever, and its CSS never asks permission — no reduced-motion guard anywhere. Because the broken page is a document of its own, no site-wide kill rescues it either: set your OS preference or flip the Rendering-panel emulation and it keeps bouncing. That indifference is the barrier.',
    criterion: '2.3.3 Animation from Interactions',
    criterionHref: 'https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html',
    caught: 'the reduced-motion emulation (A·04) — compliant motion stops, this doesn’t',
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
