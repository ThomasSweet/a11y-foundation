<template>
  <a class="skip-link visually-hidden-focusable" href="#main">
    Skip to main content
  </a>

  <div class="app-shell">
    <header class="hero">
      <div class="hero-top">
        <p class="hero-eyebrow">Cutting-edge CSS · WCAG · little-to-no JS</p>
        <ThemeToggle />
      </div>
      <h1 class="hero-title">a11y&#8209;foundation</h1>
      <p class="hero-lede">
        An accessibility-first styling foundation, told as one argument in two
        halves: what the standard <em>asks for</em>, and how the web platform
        already <em>answers it</em> — natively, with little to no JavaScript.
      </p>
    </header>

    <!-- Spine: an in-page table of contents, not a switcher. The active link
         is driven purely by scroll position (view-timeline) — no JS. -->
    <nav class="scrollspy-nav" aria-label="On this page">
      <ul class="scrollspy-list" role="list">
        <li>
          <a class="scrollspy-link" data-spy="standard" href="#standard">
            The standard
          </a>
        </li>
        <li>
          <a class="scrollspy-link" data-spy="craft" href="#craft">The craft</a>
        </li>
        <li>
          <a class="scrollspy-link" data-spy="showcase" href="#showcase">
            CSS showcase
          </a>
        </li>
      </ul>
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
    </main>

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

  .hero {
    display: grid;
    gap: var(--space-6);
    max-inline-size: 72rem;
    margin-inline: auto;
    padding: var(--space-12) var(--space-4) var(--space-16);

    @include from('md') {
      padding-block: var(--space-24);
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
    gap: var(--space-24);
    max-inline-size: 72rem;
    margin-inline: auto;
    padding: var(--space-4);
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
  /* --- Spine navigation ----------------------------------------------------
     A sticky in-page table of contents. It floats over scrolling content with
     the same glassy treatment as the rest of the shell. */
  .scrollspy-nav {
    position: sticky;
    inset-block-start: var(--space-2);
    z-index: 5;
    justify-self: center;
    inline-size: min(100%, 32rem);
    margin-block-end: var(--space-4);
    padding: var(--space-1);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-full);
    background-color: var(--color-surface-glass);
    backdrop-filter: blur(12px);

    @include reduced-transparency {
      background-color: var(--color-bg-subtle);
      backdrop-filter: none;
    }

    @include forced-colors {
      background-color: Canvas;
      backdrop-filter: none;
    }
  }

  .scrollspy-list {
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: 1fr;
  }

  .scrollspy-link {
    display: grid;
    place-items: center;
    min-block-size: 44px;
    padding-inline: var(--space-3);
    border-radius: var(--radius-full);
    color: var(--color-text-subtle);
    font-weight: 500;
    text-align: center;
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

  /* Pure-CSS scroll spy: each region owns a named view-timeline, hoisted to a
     common ancestor so the (sibling) nav links can read it. Each link runs a
     crossfade keyed to its region's timeline — the highlight peaks while the
     region holds the viewport and hands off softly to the next. Scroll-linked
     motion mirrors the user's own gesture, so it needs no reduced-motion
     override; it's gated only on support, with the plain link as the fallback. */
  @supports (animation-timeline: view()) {
    .app-shell {
      timeline-scope: --vt-standard, --vt-craft, --vt-showcase;
    }

    #standard { view-timeline-name: --vt-standard; }
    #craft { view-timeline-name: --vt-craft; }
    #showcase { view-timeline-name: --vt-showcase; }

    .scrollspy-link {
      animation: scrollspy-active linear both;
      animation-range: cover 0% cover 100%;
    }

    .scrollspy-link[data-spy='standard'] { animation-timeline: --vt-standard; }
    .scrollspy-link[data-spy='craft'] { animation-timeline: --vt-craft; }
    .scrollspy-link[data-spy='showcase'] { animation-timeline: --vt-showcase; }

    /* A plateau, not a single peak: the link reaches full strength early and
       holds it across the bulk of the region (12%–88% of its cover range),
       fading only at the hand-off edges. That keeps the active link clearly
       lit even at the top of a very tall region, while neighbours stay dark. */
    @keyframes scrollspy-active {
      0%,
      100% {
        background-color: transparent;
        color: var(--color-text-subtle);
        box-shadow: none;
      }

      12%,
      88% {
        background-color: var(--color-surface);
        color: var(--color-text);
        box-shadow: var(--shadow-sm);
      }
    }

    /* In forced-colors the crossfade colors collapse to system values; give the
       active link a clear, non-color boundary instead. */
    @include forced-colors {
      .scrollspy-link {
        animation: scrollspy-active-hc linear both;
        animation-range: cover 0% cover 100%;
      }

      @keyframes scrollspy-active-hc {
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

  .hero-title {
    inline-size: fit-content;
    font-size: var(--text-display);
    font-weight: 800;
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
