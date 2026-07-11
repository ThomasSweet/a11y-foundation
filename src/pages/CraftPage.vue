<template>
  <ChapterLayout id="craft" :sections="sections">
    <p class="chapter-intro">
      The standard sets the bar; modern CSS and HTML clear most of it with no
      JavaScript at all. Not a component catalog — the deliberate,
      low-drama <em>craft decisions</em> this foundation is built on, and why
      each one is the accessible default.
    </p>

    <section class="demo" aria-labelledby="craft-validation">
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
    </section>

    <section class="demo" aria-labelledby="craft-light-dark">
      <h3 id="craft-light-dark">Dark mode from one source of truth</h3>
      <p>
        Theming is a place craft pays off quietly. Declaring each colour once
        with <code>light-dark()</code> keeps the light and dark values
        together so they can't drift apart — the alternative scatters them
        across <code>@media (prefers-color-scheme)</code> blocks that someone
        eventually edits half of. Same result, half the surface area for bugs.
      </p>
      <LightDarkDemo />
    </section>

    <section class="demo" aria-labelledby="craft-dialog">
      <h3 id="craft-dialog">Native dialog, zero trapping code</h3>
      <p>
        A native <code>&lt;dialog&gt;</code> with <code>showModal()</code>
        gives you focus trapping, Esc-to-close, and an inert background from
        the platform — the things hand-rolled modals get wrong. The entry
        animation uses motion tokens, so it disappears automatically under
        reduced motion.
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
    </section>

    <section class="demo" aria-labelledby="craft-motion">
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
    </section>

    <section class="demo" aria-labelledby="craft-targets">
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
    </section>

    <section class="demo" aria-labelledby="craft-defensive">
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
    </section>

    <section class="demo" aria-labelledby="craft-content-stress">
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
    </section>

    <section class="demo" aria-labelledby="craft-loading">
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
    </section>
  </ChapterLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import ChapterLayout from '../site/ChapterLayout/ChapterLayout.vue'
import TextField from '../components/TextField/TextField.vue'
import AppButton from '../components/AppButton/AppButton.vue'
import AppDialog from '../components/AppDialog/AppDialog.vue'
import LightDarkDemo from '../craft/demos/LightDarkDemo.vue'
import MotionDemo from '../craft/demos/MotionDemo.vue'
import TargetsDemo from '../craft/demos/TargetsDemo.vue'
import DefensiveCssDemo from '../craft/demos/DefensiveCssDemo.vue'
import ContentStressDemo from '../craft/demos/ContentStressDemo.vue'
import LoadingStateDemo from '../craft/demos/LoadingStateDemo.vue'
import CodeCompare from '../craft/CodeCompare/CodeCompare.vue'
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
]
</script>
