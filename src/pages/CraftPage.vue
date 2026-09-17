<template>
  <ChapterLayout id="craft" :sections="rail">
    <p class="chapter-intro">
      The standard sets the bar; modern CSS and HTML clear most of it with no
      JavaScript at all. Not a component catalog — the deliberate,
      low-drama <em>craft decisions</em> this foundation is built on, and why
      each one is the accessible default. These decisions also ship as
      <a href="/agent-skill.html">an agent skill</a> — the same swaps,
      packaged for the coding agents that increasingly write this markup.
    </p>

    <ChapterSection v-bind="sections.validation">
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
    </ChapterSection>

    <ChapterSection v-bind="sections.lightDark">
      <p>
        Theming is a place craft pays off quietly. Declaring each colour once
        with <code>light-dark()</code> keeps the light and dark values
        together so they can't drift apart — the alternative scatters them
        across <code>@media (prefers-color-scheme)</code> blocks that someone
        eventually edits half of. Same result, half the surface area for bugs.
      </p>
      <LightDarkDemo />
      <CraftLinks :links="craftLinks.lightDark" />
    </ChapterSection>

    <ChapterSection v-bind="sections.dialog">
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
    </ChapterSection>

    <ChapterSection v-bind="sections.motion">
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
    </ChapterSection>

    <ChapterSection v-bind="sections.targets">
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
    </ChapterSection>

    <ChapterSection v-bind="sections.defensive">
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
    </ChapterSection>

    <ChapterSection v-bind="sections.contentStress">
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
    </ChapterSection>

    <ChapterSection v-bind="sections.loading">
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
    </ChapterSection>

    <ChapterSection v-bind="sections.truncation">
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
    </ChapterSection>

    <ChapterSection v-bind="sections.scrollbar">
      <p>
        Scrollbars are OS territory the page only borrows, and
        <code>overflow: auto</code> alone ships more than most custom
        widgets: a thumb whose presence says "this scrolls" and whose size
        says how much, click-to-jump, the arrow keys, Home, End and Page
        Down, wheel, trackpad and touch, and a contrast the browser
        maintains. The craft is to add to that without taking any of it
        away, and two additions earn their place. On macOS the bar floats
        above content by default; on Windows, and for anyone who sets
        "always show", it claims a lane, and when it arrives mid-interaction
        every line re-wraps around it. <code>scrollbar-gutter: stable</code>
        reserves that lane up front. And <code>scrollbar-color</code>,
        standard in all three engines since Safari 26.2, tints the thumb
        from the page's own tokens instead of the OS grey and turns it to
        the accent while keyboard focus is inside the region, so the thumb
        now says which scroller the arrow keys will move. Tinting it comes
        with a bill: 1.4.11 and 2.5.8 exempt a control only while the
        browser draws it. A thumb the author colours must clear 3:1, so it
        is the ink at half strength here, not the frame tint. A thumb the
        author thins is a target shrunk below 24 pixels that people grab
        all day, so the width stays <code>auto</code>. The prefixed
        <code>::-webkit-scrollbar</code> stays out: non-standard, and
        Chromium ignores it once the standard properties are set. What a
        scrollable region needs before any of this is
        <code>tabindex="0"</code> and a label, so keyboard users can reach
        it at all.
      </p>
      <ScrollbarDemo />
      <CodeCompare v-bind="craftSnippets.scrollbar" />
      <CraftLinks :links="craftLinks.scrollbar" />
    </ChapterSection>

    <ChapterSection v-bind="sections.hiding">
      <p>
        "How do I hide this?" is the wrong question — the right one is
        <em>from whom</em>. <code>display: none</code> removes content for
        everyone: eyes, screen readers, the Tab key. The
        <code>.visually-hidden</code> pattern removes it for eyes only,
        which is how labels and hints reach a screen reader without
        cluttering the layout — but any control inside stays tabbable, so
        focus can land on nothing visible. <code>aria-hidden</code> is the
        mirror image: fully visible, silent to assistive tech, and it does
        <em>not</em> touch the tab order, which is why it must never wrap
        anything interactive. And <code>inert</code> switches a visible
        region off for everyone at once — the modern answer for the page
        behind a modal. Native <code>&lt;dialog&gt;</code> applies it to
        the whole background for free.
      </p>
      <HidingMatrixDemo />
      <CodeCompare v-bind="craftSnippets.hiding" />
      <CraftLinks :links="craftLinks.hiding" />
    </ChapterSection>

    <ChapterSection v-bind="sections.textSpacing">
      <p>
        WCAG 1.4.12 grants readers the right to raise line height to 1.5,
        letter spacing to 0.12em, word spacing to 0.16em, and paragraph
        spacing to 2em — people with dyslexia or low vision do this
        through extensions and user stylesheets, and the page has to
        survive it with no loss of content or function. What breaks is
        never the text; it's the pixel-perfect box around it. The toggle
        below does exactly what a reader's override does: the flexible
        card breathes, the fixed-height one clips sentences mid-thought.
        The craft is one habit — heights on text containers are floors
        (<code>min-block-size</code>), never ceilings.
      </p>
      <TextSpacingDemo />
      <CodeCompare v-bind="craftSnippets.textSpacing" />
      <CraftLinks :links="craftLinks.textSpacing" />
    </ChapterSection>
  </ChapterLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import ChapterLayout from '../site/ChapterLayout/ChapterLayout.vue'
import ChapterSection from '../site/ChapterSection/ChapterSection.vue'
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
import HidingMatrixDemo from '../craft/demos/HidingMatrixDemo.vue'
import TextSpacingDemo from '../craft/demos/TextSpacingDemo.vue'
import CodeCompare from '../craft/CodeCompare/CodeCompare.vue'
import CraftLinks from '../craft/CraftLinks/CraftLinks.vue'
import { craftSnippets } from '../craft/snippets'
import { craftLinks } from '../craft/links'
import { railFrom, type ChapterSectionEntry } from '../site/ChapterLayout/chapterSections'

const name = ref('')
const email = ref('')
const dialog = ref<InstanceType<typeof AppDialog> | null>(null)

const sections = {
  validation: { id: 'craft-validation', title: 'Validation that waits its turn' },
  lightDark: { id: 'craft-light-dark', title: 'Dark mode from one source of truth', railLabel: 'Dark mode from one source' },
  dialog: { id: 'craft-dialog', title: 'Native dialog, zero trapping code', railLabel: 'Native dialog, zero trapping' },
  motion: { id: 'craft-motion', title: 'Motion that bows out on request', railLabel: 'Reduced motion' },
  targets: { id: 'craft-targets', title: 'Targets that survive touch and forced colors', railLabel: 'Targets that survive touch' },
  defensive: { id: 'craft-defensive', title: 'Layouts that expect the worst', railLabel: 'Defensive layouts' },
  contentStress: { id: 'craft-content-stress', title: 'Break it with content', railLabel: 'Content stress test' },
  loading: { id: 'craft-loading', title: 'Loading states the accessibility tree can see', railLabel: 'Loading states' },
  truncation: { id: 'craft-truncation', title: 'Truncation that keeps a way in', railLabel: 'Truncating text' },
  scrollbar: { id: 'craft-scrollbar', title: 'The scrollbar you tint, never thin', railLabel: 'Scrollbars' },
  hiding: { id: 'craft-hiding', title: 'Four ways to hide, and whom they hide from', railLabel: 'Four ways to hide' },
  textSpacing: { id: 'craft-text-spacing', title: "Text spacing is the reader's setting", railLabel: 'Text spacing' },
} satisfies Record<string, ChapterSectionEntry>
const rail = railFrom(Object.values(sections))
</script>
