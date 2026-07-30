<template>
  <ChapterLayout id="craft" :sections="sections">
    <p class="chapter-intro">
      The standard sets the bar; modern CSS and HTML clear most of it with no
      JavaScript at all. Not a component catalog — the deliberate,
      low-drama <em>craft decisions</em> this foundation is built on, and why
      each one is the accessible default.
    </p>

    <section class="demo" aria-labelledby="craft-validation" style="view-timeline-name: --chapter-sec-1">
      <h3 id="craft-validation">Validation that waits its turn</h3>
      <p>
        Validation leans on the platform: native constraints
        (<code>required</code>, <code>type="email"</code>) drive the styling
        through <code>:user-invalid</code> / <code>:user-valid</code> — the
        craft detail is the <em>user-</em> prefix, which only matches
        <em>after</em> someone has interacted, so a pristine field never
        flags. The display name is required; the email is optional, so leaving
        it empty stays neutral. The email also uses a <code>pattern</code> to
        require a dotted domain (<code>type="email"</code> alone accepts
        <code>a@b</code>) — still pure HTML, still in the native pipeline.
        Hints and errors are linked via <code>aria-describedby</code> and
        never rely on color alone (the invalid border also thickens).
      </p>
      <div class="demo-stack">
        <TextField
          v-model="name"
          label="Display name"
          required
          hint="Required. Shown publicly next to your comments."
        />
        <TextField
          v-model="email"
          label="Email"
          type="email"
          pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
          title="Enter an address with a domain, e.g. name@example.com"
          hint="Optional — include a domain, e.g. name@example.com."
        />
      </div>
      <CodeCompare v-bind="craftSnippets.validation" />
      <CraftLinks :links="craftLinks.validation" />
    </section>

    <section class="demo" aria-labelledby="craft-light-dark" style="view-timeline-name: --chapter-sec-2">
      <h3 id="craft-light-dark">Dark mode from one source of truth</h3>
      <p>
        Theming is a place craft pays off quietly. Declaring each colour once
        with <code>light-dark()</code> keeps the light and dark values
        together so they can't drift apart — the alternative scatters them
        across <code>@media (prefers-color-scheme)</code> blocks that someone
        eventually edits half of. Same result, half the surface area for bugs.
      </p>
      <LightDarkDemo />
      <CraftLinks :links="craftLinks.lightDark" />
    </section>

    <section class="demo" aria-labelledby="craft-dialog" style="view-timeline-name: --chapter-sec-3">
      <h3 id="craft-dialog">Native dialog, zero trapping code</h3>
      <p>
        A native <code>&lt;dialog&gt;</code> with <code>showModal()</code>
        gives you focus trapping, Esc-to-close, and an inert background from
        the platform — the things hand-rolled modals get wrong. The entry
        animation uses motion tokens, so it disappears automatically under
        <GlossaryRef id="reduced-motion">reduced motion</GlossaryRef>.
      </p>
      <div class="demo-row">
        <AppButton variant="secondary" @click="dialog?.open()">
          Open dialog
        </AppButton>
      </div>
      <AppDialog ref="dialog">
        <template #title>An accessible dialog</template>
        <p>
          Press <kbd>Esc</kbd> or use the close button. Tab around — focus
          stays inside while the dialog is open.
        </p>
      </AppDialog>
      <CodeCompare v-bind="craftSnippets.dialog" />
      <CraftLinks :links="craftLinks.dialog" />
    </section>

    <section class="demo" aria-labelledby="craft-motion" style="view-timeline-name: --chapter-sec-4">
      <h3 id="craft-motion">Motion that bows out on request</h3>
      <p>
        Three independent animations, one preference. When the OS asks for
        reduced motion, all of them still — handled globally in
        <code>preferences.css</code> from a single source of truth, so no
        component has to remember to opt in. Flip the switch to simulate the
        preference (your real OS setting works too) and watch every one stop
        at once.
      </p>
      <MotionDemo />
      <CodeCompare v-bind="craftSnippets.motion" />
      <CraftLinks :links="craftLinks.motion" />
    </section>

    <section class="demo" aria-labelledby="craft-targets" style="view-timeline-name: --chapter-sec-5">
      <h3 id="craft-targets">Targets that survive touch and forced colors</h3>
      <p>
        Hover styles only apply on devices that can actually hover; touch
        devices get larger targets via <code>touch-primary()</code>. In
        forced-colors mode the border keeps the button visible when the
        background is replaced — a failure mode most buttons never account
        for.
      </p>
      <TargetsDemo />
      <CodeCompare v-bind="craftSnippets.targets" />
      <CraftLinks :links="craftLinks.targets" />
    </section>

    <section class="demo" aria-labelledby="craft-defensive" style="view-timeline-name: --chapter-sec-6">
      <h3 id="craft-defensive">Layouts that expect the worst</h3>
      <p>
        Defensive CSS is the habit of assuming real content will be longer,
        wider, and weirder than the mockup. Designs are composed with tidy
        placeholder copy; CSS has to survive user names, tokens, and URLs.
        The classic trap: a grid item's automatic minimum size is its
        <em>min-content</em> size, not zero — the first unbreakable string
        forces its column wider than the container and pushes the layout
        past the viewport, a
        <a href="https://www.w3.org/WAI/WCAG22/Understanding/reflow.html">WCAG
        1.4.10 Reflow</a> failure that low-vision users at high zoom hit
        first. The guard is boring and load-bearing:
        <code>min-inline-size: 0</code> at every grid hop, plus a scroll or
        wrap strategy for content that can't break. (This codebase learned
        it the hard way during QA, courtesy of an iOS WebKit quirk.)
      </p>
      <DefensiveCssDemo />
      <CodeCompare v-bind="craftSnippets.defensive" />
      <CraftLinks :links="craftLinks.defensive" />
    </section>

    <section class="demo" aria-labelledby="craft-content-stress" style="view-timeline-name: --chapter-sec-7">
      <h3 id="craft-content-stress">Break it with content</h3>
      <p>
        Layouts don't break in design reviews; they break the day the CMS
        delivers a title nobody planned for. The habit that catches it
        early is feeding a component hostile content on purpose: the
        longest plausible headline, German compound words that refuse to
        wrap, a right-to-left language. One card survives all four feeds
        below because the guards were built in — logical properties
        instead of left and right, <code>min-inline-size: 0</code> where
        grids meet text, <code>hyphens: auto</code> riding on an honest
        <code>lang</code> attribute, and a button sized by its label
        instead of a designer's optimism.
      </p>
      <ContentStressDemo />
      <CodeCompare v-bind="craftSnippets.contentStress" />
      <p>
        One more content-shaped trap: flattening a list with
        <code>display: contents</code> so its items can sit on the parent
        grid. For years that stripped the list's semantics from assistive
        tech — and Safari has relapsed more than once. Subgrid gets the same
        alignment without the sacrifice.
      </p>
      <CodeCompare
        v-bind="craftSnippets.displayContents"
        mistake-label="The tempting flatten"
        craft-label="Subgrid instead"
      />
      <CraftLinks :links="craftLinks.contentStress" />
    </section>

    <section class="demo" aria-labelledby="craft-loading" style="view-timeline-name: --chapter-sec-8">
      <h3 id="craft-loading">Loading states the accessibility tree can see</h3>
      <p>
        Skeleton screens are a perceived-performance trick for the eyes:
        grey shapes promise that content is on its way. But placeholders
        are semantic-free <code>div</code>s — a screen reader finds an
        empty region with no hint that anything is happening. The craft
        move costs two attributes: <code>aria-busy="true"</code> marks the
        region as loading (a state you clear once it settles), and one
        visually-hidden line says what's coming — the part a screen reader
        actually reads. A live region is usually the <em>wrong</em> tool here — on
        a fast connection the "loading" announcement lands after the
        content it was warning about. And size placeholders to the content
        they stand in for: a skeleton that shifts the page when real
        content lands trades one jank for another — that shift is what
        CLS (Cumulative Layout Shift) measures.
      </p>
      <LoadingStateDemo />
      <CodeCompare v-bind="craftSnippets.loading" />
      <CraftLinks :links="craftLinks.loading" />
    </section>

    <section class="demo" aria-labelledby="craft-truncation" style="view-timeline-name: --chapter-sec-9">
      <h3 id="craft-truncation">Truncation that keeps a way in</h3>
      <p>
        <code>line-clamp</code> cuts a paragraph to a tidy three lines — and
        for a sighted visitor, everything past the clamp simply stops
        existing, because the property is visual-only and ships no control
        to open it. A screen reader still gets the full text, so the two
        audiences quietly read different documents. The craft move: make
        the clamp itself the collapsed state of a native
        <code>&lt;details&gt;</code> — <code>::details-content</code>
        normally hides closed content, but overriding its
        <code>content-visibility</code> leaves a clamped preview showing.
        One element, expanded state announced for free, nothing duplicated.
        Browsers without the pseudo-element fall back to an ordinary closed
        disclosure. And when the content is essential, the honest fix is
        simpler: don't clamp it.
      </p>
      <TruncationDemo />
      <CodeCompare v-bind="craftSnippets.truncation" />
      <CraftLinks :links="craftLinks.truncation" />
    </section>

    <section class="demo" aria-labelledby="craft-scrollbar" style="view-timeline-name: --chapter-sec-10">
      <h3 id="craft-scrollbar">The scrollbar you leave alone</h3>
      <p>
        Scrollbars are OS territory the page only borrows. On macOS they
        float above content by default and take no space; on Windows and
        for anyone who sets "always show", they claim a lane — and when one
        appears mid-interaction, every line of text re-wraps around it.
        <code>scrollbar-gutter: stable</code> reserves the lane before it's
        needed, which is the one scrollbar property worth adopting. The
        rest is restraint: restyled scrollbars use syntax Firefox ignores,
        tend toward thin low-contrast thumbs that hurt exactly the people
        scrollbars serve most, and are invisible to overlay users anyway —
        while the native bar already follows <code>color-scheme</code> into
        dark mode. What a scrollable region does need is
        <code>tabindex="0"</code> and a label, so keyboard users can reach
        and scroll it at all.
      </p>
      <ScrollbarDemo />
      <CodeCompare v-bind="craftSnippets.scrollbar" />
      <CraftLinks :links="craftLinks.scrollbar" />
    </section>
  </ChapterLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import ChapterLayout from '../site/ChapterLayout/ChapterLayout.vue'
import GlossaryRef from '../glossary/GlossaryRef.vue'
import TextField from '../components/TextField/TextField.vue'
import AppButton from '../components/AppButton/AppButton.vue'
import AppDialog from '../components/AppDialog/AppDialog.vue'
import LightDarkDemo from '../craft/demos/LightDarkDemo.vue'
import MotionDemo from '../craft/demos/MotionDemo.vue'
import TargetsDemo from '../craft/demos/TargetsDemo.vue'
import DefensiveCssDemo from '../craft/demos/DefensiveCssDemo.vue'
import ContentStressDemo from '../craft/demos/ContentStressDemo.vue'
import LoadingStateDemo from '../craft/demos/LoadingStateDemo.vue'
import TruncationDemo from '../craft/demos/TruncationDemo.vue'
import ScrollbarDemo from '../craft/demos/ScrollbarDemo.vue'
import CodeCompare from '../craft/CodeCompare/CodeCompare.vue'
import CraftLinks from '../craft/CraftLinks/CraftLinks.vue'
import { craftSnippets } from '../craft/snippets'

const name = ref('')
const email = ref('')
const dialog = ref<InstanceType<typeof AppDialog> | null>(null)

const sections = [
  { id: 'craft-validation', label: 'Validation that waits its turn' },
  { id: 'craft-light-dark', label: 'Dark mode from one source' },
  { id: 'craft-dialog', label: 'Native dialog, zero trapping' },
  { id: 'craft-motion', label: 'Motion that bows out' },
  { id: 'craft-targets', label: 'Targets that survive touch' },
  { id: 'craft-defensive', label: 'Layouts that expect the worst' },
  { id: 'craft-content-stress', label: 'Break it with content' },
  { id: 'craft-loading', label: 'Loading states the tree can see' },
  { id: 'craft-truncation', label: 'Truncation with a way in' },
  { id: 'craft-scrollbar', label: 'The scrollbar left alone' },
]

const craftLinks = {
  validation: [
    {
      label: 'MDN: :user-invalid',
      href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/:user-invalid',
    },
    {
      label: 'WCAG 3.3.1 Error Identification',
      href: 'https://www.w3.org/WAI/WCAG22/Understanding/error-identification.html',
    },
  ],
  lightDark: [
    {
      label: 'MDN: light-dark()',
      href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/light-dark',
    },
  ],
  dialog: [
    {
      label: 'MDN: <dialog>',
      href: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog',
    },
  ],
  motion: [
    {
      label: 'MDN: prefers-reduced-motion',
      href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion',
    },
    {
      label: 'WCAG 2.3.3 Animation from Interactions',
      href: 'https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html',
    },
  ],
  targets: [
    {
      label: 'WCAG 2.5.8 Target Size',
      href: 'https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html',
    },
    {
      label: 'MDN: forced-colors',
      href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/@media/forced-colors',
    },
  ],
  defensive: [
    {
      label: 'Defensive CSS (Ahmad Shadeed)',
      href: 'https://defensivecss.dev/',
    },
  ],
  contentStress: [
    {
      label: 'MDN: hyphens',
      href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/hyphens',
    },
    {
      label: 'MDN: logical properties',
      href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_logical_properties_and_values',
    },
  ],
  loading: [
    {
      label: 'MDN: aria-busy',
      href: 'https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-busy',
    },
  ],
  truncation: [
    {
      label: 'MDN: -webkit-line-clamp',
      href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/-webkit-line-clamp',
    },
    {
      label: 'MDN: ::details-content',
      href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/::details-content',
    },
  ],
  scrollbar: [
    {
      label: 'MDN: scrollbar-gutter',
      href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/scrollbar-gutter',
    },
    {
      label: 'WCAG 2.1.1 Keyboard',
      href: 'https://www.w3.org/WAI/WCAG22/Understanding/keyboard.html',
    },
  ],
}
</script>
