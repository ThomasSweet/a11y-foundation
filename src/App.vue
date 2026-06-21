<template>
  <a class="skip-link visually-hidden-focusable" href="#main">
    Skip to main content
  </a>

  <div class="app-shell">
    <header class="hero">
      <div class="hero-top">
        <p class="hero-eyebrow">
          <span class="hero-wordmark">a11y&#8209;foundation</span>
          <span class="hero-eyebrow-sep" aria-hidden="true">·</span>
          an exploration of accessibility&#8209;first frontend development
        </p>
        <ThemeToggle />
      </div>

      <div class="hero-body">
        <!-- A bold band of signage pictograms + this site's own accessibility
             concepts — the "find your way" metaphor, full size. Purely
             decorative, so the whole grid is aria-hidden. -->
        <div class="hero-icons" aria-hidden="true">
          <span
            v-for="icon in heroIcons"
            :key="icon.name"
            class="hero-icon"
            :data-kind="icon.kind"
          >
            <svg class="hero-icon-svg" viewBox="0 -960 960 960">
              <path :d="icon.d" />
            </svg>
          </span>
        </div>

        <h1 class="hero-title">Accessible by default</h1>
        <p class="hero-lede">
          A hands-on look at how much of accessibility the modern web platform
          handles <em>natively</em> — with little to no JavaScript. It runs as
          one argument in four parts: what <strong>the standard</strong> (WCAG)
          asks for, <strong>the craft</strong> of meeting it, what cutting-edge
          <strong>CSS</strong> now makes possible, and <strong>the proof</strong>
          that it holds up.
        </p>
      </div>

      <a class="hero-scroll" href="#standard">
        <span class="hero-scroll-label">Start reading</span>
        <svg class="hero-scroll-icon" viewBox="0 -960 960 960" aria-hidden="true">
          <path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" />
        </svg>
      </a>
    </header>

    <div class="app-body">
      <!-- Wayfinding nav. On desktop it's a sticky sidebar: the four pillars,
           each expanded to its sections. Below `lg` it becomes a sticky top bar
           of just the four pillar tabs, so it never buries the content. Active
           state is driven purely by scroll position (view-timeline), no JS. -->
      <nav class="toc" aria-label="Sections">
        <p class="toc-heading">On this page</p>
        <ol class="toc-groups" role="list">
          <li v-for="group in toc" :key="group.id" class="toc-group">
            <a
              class="toc-group-link"
              :href="`#${group.id}`"
              :style="{ animationTimeline: `--vt-${group.id}` }"
            >
              <span class="toc-group-n">{{ group.n }}</span>
              {{ group.label }}
            </a>
            <ul class="toc-sections" role="list">
              <li v-for="s in group.sections" :key="s.id">
                <a class="toc-section-link" :href="`#${s.id}`">
                  {{ s.label }}
                </a>
              </li>
            </ul>
          </li>
        </ol>
      </nav>

      <main id="main" tabindex="-1" class="site-main">
      <!-- ===================================================================
           Pillar 1 — The requirement: accessibility as a living standard
      ==================================================================== -->
      <div id="standard" class="pillar scrollspy-region">
        <p class="pillar-eyebrow">01 · The requirement</p>

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

      <!-- ===================================================================
           Pillar 2 — The platform's answer (a) shipping today: the craft
      ==================================================================== -->
      <div id="craft" class="pillar scrollspy-region">
        <p class="pillar-eyebrow">02 · The platform's answer · shipping today</p>
        <p class="pillar-lead">
          The standard sets the bar; modern CSS and HTML clear most of it with no
          JavaScript at all. Not a component catalog — the deliberate,
          low-drama <em>craft decisions</em> this foundation is built on, and why
          each one is the accessible default.
        </p>

        <section class="demo" aria-labelledby="craft-validation">
          <h2 id="craft-validation">Validation that waits its turn</h2>
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
        </section>

        <section class="demo" aria-labelledby="craft-light-dark">
          <h2 id="craft-light-dark">Dark mode from one source of truth</h2>
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
          <h2 id="craft-dialog">Native dialog, zero trapping code</h2>
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
        </section>

        <section class="demo" aria-labelledby="craft-motion">
          <h2 id="craft-motion">Motion that bows out on request</h2>
          <p>
            This spinner stops when the OS asks for reduced motion — handled
            globally in <code>preferences.css</code> from a single source of
            truth, so no component has to remember to opt in. The craft move is
            making the accessible behaviour automatic rather than per-component.
          </p>
          <div class="spinner" aria-hidden="true"></div>
        </section>

        <section class="demo" aria-labelledby="craft-targets">
          <h2 id="craft-targets">Targets that survive touch and forced colors</h2>
          <p>
            Hover styles only apply on devices that can actually hover; touch
            devices get larger targets via <code>touch-primary()</code>. In
            forced-colors mode the border keeps the button visible when the
            background is replaced — a failure mode most buttons never account
            for.
          </p>
          <div class="demo-row">
            <AppButton variant="primary">Primary action</AppButton>
            <AppButton variant="secondary">Secondary action</AppButton>
          </div>
        </section>
      </div>

      <!-- ===================================================================
           Pillar 2 — The platform's answer (b) arriving next: the showcase
      ==================================================================== -->
      <div id="showcase" class="pillar scrollspy-region">
        <p class="pillar-eyebrow">03 · The platform's answer · arriving next</p>

        <section class="demo" aria-labelledby="demo-css">
          <h2 id="demo-css">CSS showcases</h2>
          <p>
            The same idea, looking forward: modern CSS worth knowing, grouped by
            where it stands across the current versions of Chrome, Firefox, and
            Safari — based on
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

      <!-- ===================================================================
           Pillar 3 — The proof: how you know any of it actually works
      ==================================================================== -->
      <div id="testing" class="pillar scrollspy-region">
        <p class="pillar-eyebrow">04 · The proof</p>
        <p class="pillar-lead">
          A standard and a clever platform answer are only claims until something
          checks them. Accessibility testing is where many teams get lost — they
          run an automated scanner, see green, and call it accessible. The honest
          picture is layered, and most of it isn't a scanner's job. (Writing these
          very tests turned up two real barriers on this site — proof the layers
          earn their place.)
        </p>

        <section class="demo" aria-labelledby="testing-layers">
          <h2 id="testing-layers">A layered job, not a button</h2>
          <p>
            Each layer is cheaper and broader than the one above it, so it clears
            the easy ground and frees the slow, human layer for what only a person
            can judge. None replaces the next. Every layer below points at the
            real artifact in this repo — the suite you can open and run.
          </p>
          <TestingLayers />
        </section>

        <section class="demo" aria-labelledby="testing-coverage">
          <h2 id="testing-coverage">What automation can and can't see</h2>
          <p>
            This is the part that's rarely spelled out. An automated pass like
            <code>axe</code> is excellent at a specific slice of WCAG and blind to
            the rest. Here's a sample of real defects against the methods that
            catch them — read the <code>axe</code> column top to bottom and watch
            it run out.
          </p>
          <CoverageMatrix />
        </section>
      </div>
    </main>
    </div>

    <footer class="site-footer" aria-labelledby="a11y-statement">
      <h2 id="a11y-statement" class="footer-title">Accessibility</h2>
      <p class="footer-lede">
        This site practises what it shows. It targets
        <a href="https://www.w3.org/TR/WCAG22/">WCAG 2.2 AA</a>, works with a
        keyboard and a screen reader, and honours your motion, contrast, and
        colour-scheme preferences — and it never leans on colour alone to carry
        meaning.
      </p>
      <p class="footer-lede">
        It also leans on genuinely new platform features — anchor positioning,
        scroll-driven animation, container queries, <code>contrast-color()</code>.
        Each is a progressive enhancement: where your browser supports it you get
        the richer version; where it doesn't you get an accessible fallback, not a
        broken page. New features extend the baseline here — they never replace it.
      </p>

      <!-- The statement demonstrates the thesis while making it: progressive
           disclosure with a native <details>, no JavaScript. -->
      <details class="footer-details">
        <summary class="footer-summary">What that means in practice</summary>
        <div class="footer-details-body">
          <p>
            <strong>It's a demo, not a dependency.</strong> a11y-foundation is a
            playground for showing how the modern web platform answers
            accessibility natively, with little to no JavaScript — made to be
            explored and learned from, not installed into a production app.
          </p>
          <p>
            <strong>Some showcases want a recent browser.</strong> The
            “arriving next” demos use features still landing across engines. On an
            older browser they quietly fall back to a simpler, still-usable form —
            that degradation is the design, not a defect.
          </p>
          <p>
            <strong>Tested where it counts.</strong> Verified against current
            Chrome, Firefox, and Safari, with a keyboard, forced-colours mode, and
            the reduced-motion and reduced-transparency preferences.
          </p>
          <p>
            <strong>Found a barrier?</strong> Accessibility work is never
            finished. If something gets in your way,
            <a href="https://github.com/ThomasSweet/a11y-foundation/issues">open an
            issue</a> — that feedback is welcome and acted on.
          </p>
        </div>
      </details>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

import AppButton from './components/AppButton/AppButton.vue'
import AppDialog from './components/AppDialog/AppDialog.vue'
import TextField from './components/TextField/TextField.vue'
import ThemeToggle from './components/ThemeToggle/ThemeToggle.vue'
import ShowcaseFrame from './showcases/ShowcaseFrame/ShowcaseFrame.vue'
import { showcases } from './showcases/registry'
import CriteriaTimeline from './criteria/CriteriaTimeline/CriteriaTimeline.vue'
import ConformanceShift from './criteria/ConformanceShift/ConformanceShift.vue'
import LegalMap from './criteria/LegalMap/LegalMap.vue'
import LightDarkDemo from './craft/demos/LightDarkDemo.vue'
import TestingLayers from './testing/TestingLayers/TestingLayers.vue'
import CoverageMatrix from './testing/CoverageMatrix/CoverageMatrix.vue'
import { heroIcons } from './icons/heroIcons'

const dialog = ref<InstanceType<typeof AppDialog> | null>(null)
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

// The table of contents: the four pillars, each with its real <h2> sections.
// Drives the sidebar nav; ids match the headings in the template above.
const toc = [
  {
    id: 'standard',
    n: '01',
    label: 'The standard',
    sections: [
      { id: 'demo-criteria', label: 'Guidelines, alive' },
      { id: 'demo-conformance', label: 'From pass / fail to outcomes' },
      { id: 'demo-legal', label: 'One standard, many laws' },
    ],
  },
  {
    id: 'craft',
    n: '02',
    label: 'The craft',
    sections: [
      { id: 'craft-validation', label: 'Validation that waits its turn' },
      { id: 'craft-light-dark', label: 'Dark mode from one source' },
      { id: 'craft-dialog', label: 'Native dialog, zero trapping code' },
      { id: 'craft-motion', label: 'Motion that bows out on request' },
      { id: 'craft-targets', label: 'Targets for touch & forced colors' },
    ],
  },
  {
    id: 'showcase',
    n: '03',
    label: 'CSS showcase',
    sections: [{ id: 'demo-css', label: 'CSS showcases' }],
  },
  {
    id: 'testing',
    n: '04',
    label: 'The proof',
    sections: [
      { id: 'testing-layers', label: 'A layered job, not a button' },
      { id: 'testing-coverage', label: 'What automation can’t see' },
    ],
  },
]
</script>

<style scoped lang="scss">
/* Page-level composition belongs in the layout layer. */
@layer layout {
  .app-shell {
    position: relative;
    min-block-size: 100dvh;
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

  /* A full-screen, poster-style opener: the top bar, then the icon band + title
     centred in the remaining height, then a scroll cue at the foot. */
  .hero {
    display: grid;
    grid-template-rows: auto 1fr auto;
    gap: var(--space-8);
    min-block-size: 100dvh;
    max-inline-size: 80rem;
    margin-inline: auto;
    padding: var(--space-6) var(--space-4) var(--space-8);
  }

  .hero-top {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-4);
  }

  .hero-body {
    display: grid;
    align-content: center;
    gap: var(--space-8);

    @include from('md') {
      gap: var(--space-12);
    }
  }

  /* The hero spans full width; below it a two-column body pairs the sticky
     wayfinding sidebar with the content column. Block flow on mobile (so the
     sticky tab bar can travel); two-column grid from `lg`. */
  .app-body {
    max-inline-size: 72rem;
    margin-inline: auto;
    padding-inline: var(--space-4);

    @include from('lg') {
      display: grid;
      grid-template-columns: 14rem minmax(0, 1fr);
      gap: var(--space-8);
      align-items: start;
    }
  }

  .site-main {
    display: grid;
    gap: var(--space-24);
    min-inline-size: 0; /* let the content column shrink, not overflow */
    padding-block-end: var(--space-16);
  }

  /* A pillar groups several sections under one narrative beat. */
  .pillar {
    display: grid;
    gap: var(--space-12);
    /* Keep the heading clear of the sticky spine after a fragment jump. */
    scroll-margin-block-start: var(--space-16);
  }

  .demo {
    display: grid;
    gap: var(--space-6);
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

  /* A closing coda, set off from the argument above by a hairline rule. */
  .site-footer {
    display: grid;
    gap: var(--space-4);
    max-inline-size: 72rem;
    margin-inline: auto;
    padding: var(--space-12) var(--space-4) var(--space-16);
    border-block-start: 1px solid var(--color-border);
  }
}

@layer components {
  /* --- Wayfinding nav ------------------------------------------------------
     Below `lg`: a sticky glassy top bar of the four pillar tabs (sections
     hidden) — compact, so it never buries the content. From `lg`: a sticky left
     sidebar with every section listed. */
  .toc {
    position: sticky;
    inset-block-start: 0;
    z-index: 5;
    margin-block-end: var(--space-6);
    /* Bleed past the body's inline padding so the bar spans edge to edge. */
    margin-inline: calc(var(--space-4) * -1);
    padding: var(--space-2) var(--space-4);
    border-block-end: 1px solid var(--color-border);
    background-color: var(--color-surface-glass);
    backdrop-filter: blur(12px);

    @include from('lg') {
      /* Desktop: a sticky rail; drop the bar chrome. */
      inset-block-start: var(--space-6);
      align-self: start;
      max-block-size: calc(100dvh - var(--space-12));
      overflow-y: auto;
      margin: 0;
      padding: 0;
      border: none;
      background: none;
      backdrop-filter: none;
    }

    @include reduced-transparency {
      background-color: var(--color-bg-subtle);
      backdrop-filter: none;
    }

    @include forced-colors {
      background-color: Canvas;
      backdrop-filter: none;
    }
  }

  /* "On this page": a quiet heading on the desktop rail; hidden in the bar. */
  .toc-heading {
    display: none;

    @include from('lg') {
      display: block;
      margin-block-end: var(--space-4);
      font-size: var(--text-sm);
      font-weight: 700;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      color: var(--color-text-subtle);
    }
  }

  .toc-groups {
    /* Mobile: pillar tabs that wrap onto multiple rows (no horizontal scroll). */
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-2);
    margin: 0;
    padding: 0;
    list-style: none;

    @include from('lg') {
      display: grid;
      gap: var(--space-4);
    }
  }

  .toc-group-link {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    min-block-size: 44px;
    padding-inline: var(--space-3);
    border-radius: var(--radius-full);
    font-weight: 600;
    color: var(--color-text-subtle);
    text-decoration: none;
    white-space: nowrap;

    @include from('lg') {
      align-items: baseline;
      min-block-size: 0;
      padding: var(--space-1) var(--space-2);
      border-radius: var(--radius-sm);
      font-weight: 700;
    }

    @include can-hover {
      &:hover {
        color: var(--color-text);
      }
    }

    &:focus-visible {
      outline: var(--focus-ring-width) solid var(--focus-ring-color);
      outline-offset: 2px;
    }
  }

  /* The pillar number is a desktop-rail flourish; the mobile tabs stay compact. */
  .toc-group-n {
    display: none;

    @include from('lg') {
      display: inline;
      font-family: var(--font-mono);
      font-size: var(--text-sm);
      color: var(--color-primary);
    }
  }

  /* Sub-sections only appear in the desktop sidebar. */
  .toc-sections {
    display: none;

    @include from('lg') {
      display: grid;
      gap: 1px;
      margin: var(--space-1) 0 0;
      padding-inline-start: var(--space-3);
      border-inline-start: 1px solid var(--color-border);
      list-style: none;
    }
  }

  .toc-section-link {
    display: block;
    padding: var(--space-1) var(--space-2);
    border-radius: var(--radius-sm);
    font-size: var(--text-sm);
    color: var(--color-text-subtle);
    text-decoration: none;

    @include can-hover {
      &:hover {
        color: var(--color-text);
      }
    }

    &:focus-visible {
      outline: var(--focus-ring-width) solid var(--focus-ring-color);
      outline-offset: 2px;
    }
  }

  /* Pure-CSS scroll spy. Each pillar and each section owns a named
     view-timeline, hoisted to a common ancestor; the matching nav link reads it
     (timeline assigned inline from the toc data) and brightens while its target
     holds the viewport. Scroll-linked, so no reduced-motion override is needed —
     gated only on support, with the plain links as the fallback. */
  @supports (animation-timeline: view()) {
    .app-shell {
      timeline-scope: --vt-standard, --vt-craft, --vt-showcase, --vt-testing;
    }

    #standard { view-timeline-name: --vt-standard; }
    #craft { view-timeline-name: --vt-craft; }
    #showcase { view-timeline-name: --vt-showcase; }
    #testing { view-timeline-name: --vt-testing; }

    /* The group link tracks its pillar (timeline set inline from the toc data).
       Section-level single-active isn't reliably expressible in pure CSS — short
       adjacent sections all satisfy a "cover" range at once — so we highlight the
       current pillar and leave sections to hover / focus. */
    .toc-group-link {
      animation: toc-group-active linear both;
      animation-range: cover 0% cover 100%;
    }

    /* A plateau, not a peak: full strength across 12%–88% of the cover range so
       the active pillar stays lit even at the top of a tall region. */
    @keyframes toc-group-active {
      0%,
      100% {
        background-color: transparent;
        color: var(--color-text-subtle);
      }

      12%,
      88% {
        background-color: var(--color-bg-subtle);
        color: var(--color-text);
      }
    }

    /* Forced colors flattens the background tint; mark the active tab with a
       border instead so it stays distinguishable. */
    @include forced-colors {
      @keyframes toc-group-active {
        0%,
        100% {
          border: 1px solid transparent;
        }

        12%,
        88% {
          border: 1px solid Highlight;
        }
      }
    }
  }

  /* Narrative framing for each pillar — decorative labels, not headings, so
     the document outline stays a clean h1 → h2 → h3. */
  .pillar-eyebrow {
    font-family: var(--font-mono);
    font-size: var(--text-sm);
    letter-spacing: 0.02em;
    color: var(--color-primary);
  }

  .pillar-lead {
    max-inline-size: 65ch;
    font-size: var(--text-lg);
    line-height: var(--leading-normal);
    color: var(--color-text-subtle);
  }

  .hero-eyebrow {
    font-family: var(--font-mono);
    font-size: var(--text-sm);
    letter-spacing: 0.02em;
    color: var(--color-text-subtle);
  }

  /* The project name reads as a small wordmark above the poster title. */
  .hero-wordmark {
    color: var(--color-text);
    font-weight: 600;
  }

  .hero-eyebrow-sep {
    margin-inline: var(--space-1);
  }

  .hero-title {
    inline-size: fit-content;
    /* Poster-scale: fluid from a strong mobile size up to a huge desktop one. */
    font-size: clamp(3rem, 12vw, 9rem);
    font-weight: 800;
    line-height: 1;
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

  /* The decorative wayfinding band — large, boxless pictograms that read as a
     poster. The page's own topics carry the brand accent; the signage glyphs
     stay in the bold ink colour, so the "mix" still reads. */
  .hero-icons {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: var(--space-6);
    justify-items: center;

    @include from('md') {
      grid-template-columns: repeat(6, 1fr);
    }
  }

  .hero-icon {
    display: grid;
    place-items: center;
    color: var(--color-text);

    &[data-kind='concept'] {
      color: var(--color-primary);
    }
  }

  .hero-icon-svg {
    inline-size: clamp(2.75rem, 7vw, 5rem);
    block-size: clamp(2.75rem, 7vw, 5rem);
    fill: currentcolor;

    @include forced-colors {
      fill: CanvasText;
    }
  }

  /* Scroll affordance at the foot of the full-screen hero. */
  .hero-scroll {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    justify-self: center;
    padding: var(--space-2) var(--space-3);
    border-radius: var(--radius-full);
    color: var(--color-text-subtle);
    font-size: var(--text-sm);
    font-weight: 600;
    text-decoration: none;

    @include can-hover {
      &:hover {
        color: var(--color-text);
      }
    }

    &:focus-visible {
      outline: var(--focus-ring-width) solid var(--focus-ring-color);
      outline-offset: 2px;
    }
  }

  .hero-scroll-icon {
    inline-size: 1.25rem;
    block-size: 1.25rem;
    fill: currentcolor;
    /* A hardcoded duration (not a motion token), so silence it explicitly. */
    animation: hero-bob 1.8s ease-in-out infinite;

    @include reduced-motion {
      animation: none;
    }
  }

  @keyframes hero-bob {
    0%,
    100% {
      transform: translateY(0);
    }

    50% {
      transform: translateY(3px);
    }
  }

  /* Section headings get the fluid display scale; intro paragraphs stay
     readable at prose width even though the cards below run wider. */
  .demo > h2 {
    font-size: var(--text-display-sm);
    font-weight: 800;
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
        animation-range: entry 0% entry 50%;
      }

      @keyframes section-reveal {
        from {
          opacity: 0;
          transform: translateY(3rem) scale(0.97);
        }
      }
    }
  }

  .footer-title {
    font-size: var(--text-display-sm);
    font-weight: 800;
    line-height: var(--leading-tight);
    letter-spacing: var(--tracking-tight);
  }

  .footer-lede {
    max-inline-size: 65ch;
    color: var(--color-text-subtle);
  }

  .footer-details {
    max-inline-size: 65ch;
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    background-color: var(--color-bg-subtle);

    @include high-contrast {
      border-color: currentcolor;
    }
  }

  .footer-summary {
    padding: var(--space-3) var(--space-4);
    border-radius: var(--radius-md);
    font-weight: 600;
    cursor: pointer;

    &:focus-visible {
      outline: var(--focus-ring-width) solid var(--focus-ring-color);
      outline-offset: 2px;
    }
  }

  .footer-details-body {
    display: grid;
    gap: var(--space-3);
    padding: 0 var(--space-4) var(--space-4);
    max-inline-size: 65ch;
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
