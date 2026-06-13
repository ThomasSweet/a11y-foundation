<template>
  <a class="skip-link visually-hidden-focusable" href="#main">
    Skip to main content
  </a>

  <header class="site-header">
    <h1 class="site-title">a11y-foundation</h1>
    <ThemeToggle />
  </header>

  <main id="main" tabindex="-1" class="site-main">
    <p class="intro">
      A playground for the accessibility-first styling foundation: design
      tokens, cascade layers, and SCSS mixins for breakpoints, input
      capabilities, and user preferences. Try it with your OS set to dark
      mode, increased contrast, or reduced motion — every component below
      adapts without any component-level JavaScript.
    </p>

    <section class="demo" aria-labelledby="demo-buttons">
      <h2 id="demo-buttons">Buttons</h2>
      <p>
        Hover styles only apply on devices that can hover; touch devices get
        larger targets via <code>touch-primary()</code>. In forced-colors
        mode the border keeps the button visible.
      </p>
      <div class="demo-row">
        <AppButton variant="primary">Primary action</AppButton>
        <AppButton variant="secondary">Secondary action</AppButton>
      </div>
    </section>

    <section class="demo" aria-labelledby="demo-dialog">
      <h2 id="demo-dialog">Dialog</h2>
      <p>
        Native <code>&lt;dialog&gt;</code> with <code>showModal()</code> —
        focus trapping, Esc-to-close, and an inert background come free from
        the platform. The entry animation uses motion tokens, so it
        disappears automatically under reduced motion.
      </p>
      <AppButton variant="secondary" @click="dialog?.open()">
        Open dialog
      </AppButton>
      <AppDialog ref="dialog">
        <template #title>An accessible dialog</template>
        <p>
          Press <kbd>Esc</kbd> or use the close button. Tab around — focus
          stays inside while the dialog is open.
        </p>
      </AppDialog>
    </section>

    <section class="demo" aria-labelledby="demo-form">
      <h2 id="demo-form">Form fields</h2>
      <p>
        Validation leans on the platform: native constraints
        (<code>required</code>, <code>type="email"</code>) drive the styling
        through <code>:user-invalid</code> / <code>:user-valid</code>, which
        only match <em>after</em> the user has interacted — so a pristine
        field never flags. The display name is required; the email is
        optional, so leaving it empty stays neutral. The email also uses a
        <code>pattern</code> to require a dotted domain
        (<code>type="email"</code> alone accepts <code>a@b</code>) — still
        pure HTML, still in the native pipeline. Hints and errors are linked
        via <code>aria-describedby</code> and never rely on color alone (the
        invalid border also thickens).
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
    </section>

    <section class="demo" aria-labelledby="demo-criteria">
      <h2 id="demo-criteria">Guidelines, alive</h2>
      <p>
        These aren't definitions of accessibility — they're the standard,
        running. Each card is a real working piece of this foundation,
        tagged with the WCAG success criterion that requires it, the version
        it arrived in, and its <abbr title="Perceivable, Operable, Understandable, Robust">POUR</abbr>
        principle. Flip <strong>break this rule</strong> to switch the
        compliant behavior off and feel what the criterion actually
        prevents. Accessibility isn't a feature added on top; it's the
        baseline these guidelines keep formalizing.
      </p>

      <div class="criterion-list">
        <CriterionFrame
          v-for="c in criteria"
          :key="c.id"
          :id="c.id"
          :name="c.name"
          :level="c.level"
          :version="c.version"
          :principle="c.principle"
          :requirement="c.requirement"
          :break-label="c.breakLabel"
          :restore-label="c.restoreLabel"
          :pass-text="c.passText"
          :fail-text="c.failText"
          :links="c.links"
          v-slot="{ broken }"
        >
          <component :is="c.component" :broken="broken" />
        </CriterionFrame>
      </div>
    </section>

    <section class="demo" aria-labelledby="demo-css">
      <h2 id="demo-css">CSS showcases</h2>
      <p>
        Modern CSS worth knowing, grouped by where it stands across the
        current versions of Chrome, Firefox, and Safari — based on
        <a href="https://wpt.fyi/interop-2026">Interop</a> and Baseline.
        Everything is written as a progressive enhancement, so unsupported
        demos degrade instead of breaking.
      </p>

      <template v-for="group in groups" :key="group.status">
        <h3 v-if="group.items.length">{{ group.label }}</h3>
        <div class="showcase-list">
          <ShowcaseFrame
            v-for="item in group.items"
            :key="item.id"
            :title="item.title"
            :summary="item.summary"
            :status="item.status"
            :supports="item.supports"
            :links="item.links"
          >
            <component :is="item.component" v-bind="item.props" />
          </ShowcaseFrame>
        </div>
      </template>
    </section>

    <section class="demo" aria-labelledby="demo-motion">
      <h2 id="demo-motion">Motion</h2>
      <p>
        This spinner stops when the OS asks for reduced motion — handled
        globally in <code>preferences.css</code>, no component code needed.
      </p>
      <div class="spinner" aria-hidden="true"></div>
    </section>
  </main>
</template>

<script setup>
import { computed, ref } from 'vue'

import AppButton from './components/AppButton.vue'
import AppDialog from './components/AppDialog.vue'
import TextField from './components/TextField.vue'
import ThemeToggle from './components/ThemeToggle.vue'
import ShowcaseFrame from './showcases/ShowcaseFrame.vue'
import { showcases } from './showcases/registry.js'
import CriterionFrame from './criteria/CriterionFrame.vue'
import { criteria } from './criteria/registry.js'

const dialog = ref(null)
const name = ref('')
const email = ref('')

const groups = computed(() => [
  {
    status: 'stable',
    label: 'Widely supported',
    items: showcases.filter((s) => s.status === 'stable'),
  },
  {
    status: 'emerging',
    label: 'Emerging — Interop focus areas',
    items: showcases.filter((s) => s.status === 'emerging'),
  },
])
</script>

<style scoped lang="scss">
/* Page-level composition belongs in the layout layer. */
@layer layout {
  .site-header {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-4);
    max-inline-size: 70ch;
    margin-inline: auto;
    padding: var(--space-4);

    @include from('md') {
      padding: var(--space-6) var(--space-4);
    }
  }

  .site-title {
    font-size: var(--text-2xl);
  }

  .site-main {
    display: grid;
    gap: var(--space-12);
    max-inline-size: 70ch;
    margin-inline: auto;
    padding: var(--space-4);
    padding-block-end: var(--space-16);
  }

  .demo {
    display: grid;
    gap: var(--space-3);
  }

  .demo-row {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-3);
  }

  .demo-stack {
    display: grid;
    gap: var(--space-6);
  }

  .showcase-list {
    display: grid;
    gap: var(--space-6);
  }

  .criterion-list {
    display: grid;
    gap: var(--space-6);
  }
}

@layer components {
  .intro {
    color: var(--color-text-subtle);
  }

  .spinner {
    inline-size: var(--space-8);
    block-size: var(--space-8);
    border: 4px solid var(--color-border);
    border-block-start-color: var(--color-primary);
    border-radius: var(--radius-full);
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    to {
      rotate: 1turn;
    }
  }
}
</style>
