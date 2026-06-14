<template>
  <a class="skip-link visually-hidden-focusable" href="#main">
    Skip to main content
  </a>

  <div class="app-shell">
    <div class="scroll-progress" aria-hidden="true"></div>

    <header class="hero">
      <div class="hero-top">
        <p class="hero-eyebrow">Cutting-edge CSS · WCAG · little-to-no JS</p>
        <ThemeToggle />
      </div>
      <h1 class="hero-title">a11y&#8209;foundation</h1>
      <p class="hero-lede">
        An accessibility-first styling foundation — design tokens, cascade
        layers, and modern CSS — where every component adapts to dark mode,
        contrast, and motion preferences with little to no JavaScript.
      </p>
    </header>

    <main id="main" tabindex="-1" class="site-main">
      <div
        class="pillar-tabs"
        role="tablist"
        aria-label="Sections"
        :style="{ '--n': pillars.length }"
      >
        <span class="pillar-indicator" aria-hidden="true"></span>
        <button
          v-for="(p, i) in pillars"
          :id="`tab-${p.id}`"
          :key="p.id"
          type="button"
          role="tab"
          class="pillar-tab"
          :aria-selected="active === p.id ? 'true' : 'false'"
          :aria-controls="`panel-${p.id}`"
          :tabindex="active === p.id ? 0 : -1"
          @click="select(p.id)"
          @keydown="onTabKey($event, i)"
        >
          {{ p.label }}
        </button>
      </div>

      <div
        v-show="active === 'foundation'"
        id="panel-foundation"
        class="pillar-panel"
        role="tabpanel"
        aria-labelledby="tab-foundation"
        tabindex="0"
      >
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

    <section class="demo" aria-labelledby="demo-motion">
      <h2 id="demo-motion">Motion</h2>
      <p>
        This spinner stops when the OS asks for reduced motion — handled
        globally in <code>preferences.css</code>, no component code needed.
      </p>
      <div class="spinner" aria-hidden="true"></div>
    </section>
      </div>

      <div
        v-show="active === 'guidelines'"
        id="panel-guidelines"
        class="pillar-panel"
        role="tabpanel"
        aria-labelledby="tab-guidelines"
        tabindex="0"
      >

    <section class="demo" aria-labelledby="demo-criteria">
      <h2 id="demo-criteria">Guidelines, alive</h2>
      <p>
        These aren't definitions of accessibility — they're the standard,
        running. The criteria are arranged along WCAG's timeline, so you can
        watch the standard grow as the web changed. Each card is a real
        working piece of this foundation; flip <strong>break this rule</strong>
        to switch the compliant behavior off and feel what the criterion
        actually prevents. Accessibility isn't a feature added on top; it's
        the baseline these guidelines keep formalizing — and they keep
        <abbr title="Perceivable, Operable, Understandable, Robust">POUR</abbr>
        at the core.
      </p>

      <CriteriaTimeline />
    </section>

    <section class="demo" aria-labelledby="demo-conformance">
      <h2 id="demo-conformance">From pass / fail to outcomes</h2>
      <p>
        The timeline's next stop is the biggest change of all — not new
        criteria, but a new <em>way of measuring</em>. Drag the slider to see
        how the same result reads under today's binary model versus WCAG 3.0's
        draft graded scoring.
      </p>
      <ConformanceShift />
    </section>

    <section class="demo" aria-labelledby="demo-legal">
      <h2 id="demo-legal">One standard, many laws</h2>
      <p>
        WCAG isn't just guidance — it's the technical core that accessibility
        law around the world points to. The map below shows how different
        jurisdictions wrap legal force around the same standard.
      </p>
      <LegalMap />
    </section>
      </div>

      <div
        v-show="active === 'showcases'"
        id="panel-showcases"
        class="pillar-panel"
        role="tabpanel"
        aria-labelledby="tab-showcases"
        tabindex="0"
      >

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

      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, ref } from 'vue'

import AppButton from './components/AppButton/AppButton.vue'
import AppDialog from './components/AppDialog/AppDialog.vue'
import TextField from './components/TextField/TextField.vue'
import ThemeToggle from './components/ThemeToggle/ThemeToggle.vue'
import ShowcaseFrame from './showcases/ShowcaseFrame/ShowcaseFrame.vue'
import { showcases } from './showcases/registry'
import CriteriaTimeline from './criteria/CriteriaTimeline/CriteriaTimeline.vue'
import ConformanceShift from './criteria/ConformanceShift/ConformanceShift.vue'
import LegalMap from './criteria/LegalMap/LegalMap.vue'

const dialog = ref<InstanceType<typeof AppDialog> | null>(null)
const name = ref('')
const email = ref('')

// --- Pillar tabs ------------------------------------------------------------
type PillarId = 'foundation' | 'guidelines' | 'showcases'
const pillars: { id: PillarId; label: string }[] = [
  { id: 'foundation', label: 'Foundation' },
  { id: 'guidelines', label: 'Guidelines' },
  { id: 'showcases', label: 'CSS showcases' },
]
const active = ref<PillarId>('foundation')

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function select(id: PillarId) {
  if (id === active.value) return
  const apply = () => {
    active.value = id
  }
  // View Transitions animate the panel swap — but only with motion allowed
  // and where the API exists; otherwise the switch is instant. The callback
  // awaits Vue's DOM update so the transition snapshots the new panel.
  const doc = document as Document & {
    startViewTransition?: (cb: () => unknown) => unknown
  }
  // Skip the transition under reduced motion, and on a hidden tab — its
  // DOM-update callback is tied to the rendering loop, which a backgrounded
  // document doesn't run.
  if (
    !prefersReducedMotion() &&
    document.visibilityState === 'visible' &&
    doc.startViewTransition
  ) {
    doc.startViewTransition(async () => {
      apply()
      await nextTick()
    })
  } else {
    apply()
  }
}

// Roving tab navigation: arrow keys move and activate; Home/End jump to ends.
function onTabKey(e: KeyboardEvent, i: number) {
  const last = pillars.length - 1
  let next: number | null = null
  if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = i === last ? 0 : i + 1
  else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = i === 0 ? last : i - 1
  else if (e.key === 'Home') next = 0
  else if (e.key === 'End') next = last
  if (next === null) return
  e.preventDefault()
  const id = pillars[next].id
  select(id)
  document.getElementById(`tab-${id}`)?.focus()
}

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
  .app-shell {
    position: relative;
    min-block-size: 100dvh;
  }

  /* Page reading-progress bar — driven by the document's scroll position, so
     it mirrors the user's own gesture (no autonomous motion). Hidden (zero
     width) where scroll timelines aren't supported. */
  .scroll-progress {
    position: fixed;
    inset-block-start: 0;
    inset-inline: 0;
    z-index: 10;
    block-size: 3px;
    background: var(--gradient-accent);
    transform: scaleX(0);
    transform-origin: 0 50%;

    @supports (animation-timeline: scroll()) {
      animation: scroll-progress linear both;
      animation-timeline: scroll(root block);
    }

    @include forced-colors {
      background: Highlight;
    }
  }

  @keyframes scroll-progress {
    to {
      transform: scaleX(1);
    }
  }

  /* A soft accent glow behind everything — the modern "canvas" feel.
     Decorative and translucent, so it's dropped under reduced transparency. */
  .app-shell::before {
    content: '';
    position: fixed;
    inset: 0;
    z-index: -1;
    background: var(--page-glow);
    pointer-events: none;

    @include reduced-transparency {
      display: none;
    }
  }

  .hero {
    display: grid;
    gap: var(--space-4);
    max-inline-size: 72rem;
    margin-inline: auto;
    padding: var(--space-8) var(--space-4) var(--space-12);

    @include from('md') {
      padding-block: var(--space-16);
    }
  }

  .hero-top {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-4);
  }

  .site-main {
    display: grid;
    gap: var(--space-12);
    max-inline-size: 72rem;
    margin-inline: auto;
    padding: var(--space-4);
    padding-block-end: var(--space-16);
  }

  /* Each tab's panel stacks its sections; only the active one is shown. */
  .pillar-panel {
    display: grid;
    gap: var(--space-16);
  }

  .demo {
    display: grid;
    gap: var(--space-4);
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
}

@layer components {
  /* Pillar nav — the same sliding-pill pattern as the showcase, used as the
     site's primary navigation. The pill rides on a motion token, so it's an
     instant jump under reduced motion. */
  .pillar-tabs {
    position: relative;
    display: grid;
    grid-template-columns: repeat(var(--n), 1fr);
    inline-size: min(100%, 32rem);
    padding: var(--space-1);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-full);
    background-color: var(--color-bg-subtle);
  }

  .pillar-indicator {
    position: absolute;
    z-index: 0;
    inset-block: var(--space-1);
    inset-inline-start: var(--space-1);
    inline-size: calc((100% - var(--space-2)) / var(--n));
    border-radius: var(--radius-full);
    background-color: var(--color-surface);
    box-shadow: var(--shadow-sm);
    transform: translateX(calc(var(--i, 0) * 100%));
    transition: transform var(--duration-normal) var(--easing-standard);

    @include forced-colors {
      border: 1px solid ButtonText;
    }
  }

  .pillar-tabs:has(.pillar-tab:nth-of-type(1)[aria-selected='true']) { --i: 0; }
  .pillar-tabs:has(.pillar-tab:nth-of-type(2)[aria-selected='true']) { --i: 1; }
  .pillar-tabs:has(.pillar-tab:nth-of-type(3)[aria-selected='true']) { --i: 2; }

  .pillar-tab {
    position: relative;
    z-index: 1;
    min-block-size: 44px;
    padding-inline: var(--space-3);
    border: 0;
    border-radius: var(--radius-full);
    background-color: transparent;
    color: var(--color-text-subtle);
    font: inherit;
    font-weight: 500;
    cursor: pointer;

    &[aria-selected='true'] {
      color: var(--color-text);
      font-weight: 600;
    }

    &:focus-visible {
      outline: var(--focus-ring-width) solid var(--focus-ring-color);
      outline-offset: 2px;
    }

    @include forced-colors {
      &[aria-selected='true'] {
        color: Highlight;
      }
    }
  }

  .hero-eyebrow {
    font-family: var(--font-mono);
    font-size: var(--text-sm);
    letter-spacing: 0.02em;
    color: var(--color-text-subtle);
  }

  .hero-title {
    inline-size: fit-content;
    font-size: var(--text-display);
    line-height: 1.05;
    letter-spacing: var(--tracking-tight);
    /* Gradient text. Safari still needs the prefixed background-clip. */
    background: var(--gradient-accent);
    /* stylelint-disable-next-line property-no-vendor-prefix -- Safari */
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    color: transparent;

    /* In forced-colors, clipped text would vanish — restore a system color. */
    @include forced-colors {
      background: none;
      -webkit-text-fill-color: CanvasText;
      color: CanvasText;
    }
  }

  .hero-lede {
    max-inline-size: 60ch;
    font-size: var(--text-lg);
    line-height: var(--leading-normal);
    color: var(--color-text-subtle);
  }

  /* Section headings get the fluid display scale; intro paragraphs stay
     readable at prose width even though the cards below run wider. */
  .demo > h2 {
    font-size: var(--text-display-sm);
    line-height: var(--leading-tight);
    letter-spacing: var(--tracking-tight);
  }

  .demo > p {
    max-inline-size: 65ch;
    color: var(--color-text-subtle);
  }

  /* Sections ease in as they scroll into view — a scroll-driven animation,
     so it runs off the main thread with no scroll listeners. Added ONLY for
     users who haven't asked to reduce motion (progressive enhancement: no
     motion is the default), and only where view() timelines are supported. */
  @media (prefers-reduced-motion: no-preference) {
    @supports (animation-timeline: view()) {
      .demo {
        animation: section-reveal linear both;
        animation-timeline: view();
        animation-range: entry 0% entry 55%;
      }

      @keyframes section-reveal {
        from {
          opacity: 0;
          transform: translateY(1.5rem);
        }
      }
    }
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
