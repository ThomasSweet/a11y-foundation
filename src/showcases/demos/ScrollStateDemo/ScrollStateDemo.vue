<template>
  <div class="scroll-state-demo">
    <p class="scroll-state-caption">
      <code>scroll-state()</code> container queries let an element restyle
      itself based on <em>how it sits in a scroller</em>: no scroll listeners,
      no JS. Here a card knows when it’s the <strong>snapped</strong> one, a
      header knows when it’s <strong>stuck</strong>, and a strip knows which
      way it is still <strong>scrollable</strong>, so its edges shade only
      while there is more. Without support, all three stay fully usable and
      just skip the extra cue.
    </p>

    <!-- snapped: the centered card highlights itself -->
    <section class="scroll-state-block">
      <h5 class="scroll-state-h">Snapped</h5>
      <!-- Region wraps the list so the cards keep list semantics (role on the <ul> would strip them). -->
      <div
        class="scroll-state-track"
        tabindex="0"
        role="region"
        aria-label="Steps, scrollable — the centered card is highlighted"
      >
        <ul class="scroll-state-cards" role="list">
          <li v-for="step in steps" :key="step.n" class="scroll-state-card">
            <div class="scroll-state-card-inner">
              <span class="scroll-state-n">{{ step.n }}</span>
              <span class="scroll-state-label">{{ step.label }}</span>
              <span class="scroll-state-snapped" aria-hidden="true">snapped</span>
            </div>
          </li>
        </ul>
      </div>
    </section>

    <!-- stuck: the sticky header restyles once it pins -->
    <section class="scroll-state-block">
      <h5 class="scroll-state-h">Stuck</h5>
      <div
        class="scroll-state-scroll"
        tabindex="0"
        role="region"
        aria-label="List with a sticky header — scroll to pin it"
      >
        <div class="scroll-state-stick">
          <div class="scroll-state-stick-inner">
            <span>Pinned header</span>
            <span class="scroll-state-stuck-badge" aria-hidden="true">stuck</span>
          </div>
        </div>
        <ul class="scroll-state-list">
          <li v-for="row in rows" :key="row">Row {{ row }}</li>
        </ul>
      </div>
    </section>

    <section class="scroll-state-block">
      <h5 class="scroll-state-h">Scrollable</h5>
      <div
        class="scroll-state-hinted"
        tabindex="0"
        role="region"
        aria-label="Test methods, scrollable. The edges shade only while there is more."
      >
        <span class="scroll-state-hint scroll-state-hint-start" aria-hidden="true"></span>
        <ul class="scroll-state-chips" role="list">
          <li v-for="method in methods" :key="method" class="scroll-state-chip">{{ method }}</li>
        </ul>
        <span class="scroll-state-hint scroll-state-hint-end" aria-hidden="true"></span>
      </div>
      <p class="scroll-state-note">
        The scrollbar is the platform’s own scroll hint, but overlay
        scrollbars stay invisible until touched. The shade says “more this
        way” only while it is true, which a static shadow cannot: at the end
        it would still claim more.
      </p>
    </section>
  </div>
</template>

<script setup lang="ts">
const steps = [
  { n: '01', label: 'Scroll me sideways' },
  { n: '02', label: 'Watch the centre' },
  { n: '03', label: 'It knows it’s snapped' },
  { n: '04', label: 'Pure CSS state' },
  { n: '05', label: 'No scroll listeners' },
]
const rows = Array.from({ length: 12 }, (_, i) => i + 1)
const methods = [
  'Automated scan',
  'Keyboard walk',
  'Screen reader pass',
  '400% zoom',
  'Text spacing',
  'Forced colors',
  'Reduced motion',
  'Touch targets',
]
</script>

<style scoped lang="scss">
@layer components {
  .scroll-state-demo {
    display: grid;
    gap: var(--space-4);
  }

  .scroll-state-caption {
    font-size: var(--text-sm);
    color: var(--color-text-subtle);
  }

  .scroll-state-block {
    display: grid;
    gap: var(--space-2);
  }

  .scroll-state-h {
    font-size: var(--text-sm);
    font-weight: 600;
    color: var(--color-text-subtle);
  }

  .scroll-state-track {
    container-type: inline-size;
    overflow-x: auto;
    min-inline-size: 0;
    scroll-snap-type: x mandatory;
    overscroll-behavior-x: contain;
    border-radius: var(--radius-md);

    &:focus-visible {
      outline: var(--focus-ring-width) solid var(--focus-ring-color);
      outline-offset: var(--focus-ring-offset);
    }
  }

  .scroll-state-cards {
    display: flex;
    gap: var(--space-3);
    inline-size: max-content;
    margin: 0;
    padding: var(--space-2);
    list-style: none;
  }

  .scroll-state-card {
    flex: none;
    inline-size: min(13rem, 60cqi);
    scroll-snap-align: center;
    container-type: scroll-state;
  }

  .scroll-state-card-inner {
    display: grid;
    gap: var(--space-1);
    block-size: 100%;
    padding: var(--space-4);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    background-color: var(--color-surface);
    transition:
      border-color var(--duration-normal) var(--easing-standard),
      box-shadow var(--duration-normal) var(--easing-standard),
      scale var(--duration-normal) var(--easing-standard);

    @include high-contrast {
      border-color: currentcolor;
    }
  }

  .scroll-state-n {
    font-family: var(--font-mono);
    font-size: var(--text-sm);
    color: var(--color-text-subtle);
  }

  .scroll-state-label {
    font-weight: 600;
  }

  .scroll-state-snapped {
    inline-size: fit-content;
    margin-block-start: var(--space-1);
    padding: 0 var(--space-2);
    border-radius: var(--radius-full);
    background-color: var(--color-primary);
    color: var(--color-primary-text, #fff);
    font-size: var(--text-sm);
    font-weight: 600;
    opacity: 0;
  }

  @supports (container-type: scroll-state) {
    @container scroll-state(snapped: inline) {
      .scroll-state-card-inner {
        border-color: var(--color-primary);
        box-shadow: var(--shadow-md);
        scale: 1.03;
      }

      .scroll-state-snapped {
        opacity: 1;
      }
    }
  }

  .scroll-state-scroll {
    block-size: 12rem;
    overflow-y: auto;
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);

    &:focus-visible {
      outline: var(--focus-ring-width) solid var(--focus-ring-color);
      outline-offset: var(--focus-ring-offset);
    }
  }

  .scroll-state-stick {
    position: sticky;
    inset-block-start: 0;
    container-type: scroll-state;
  }

  .scroll-state-stick-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--space-2) var(--space-3);
    background-color: var(--color-surface);
    border-block-end: 1px solid var(--color-border);
    font-weight: 600;
    transition:
      box-shadow var(--duration-normal) var(--easing-standard),
      background-color var(--duration-normal) var(--easing-standard);
  }

  .scroll-state-stuck-badge {
    padding: 0 var(--space-2);
    border-radius: var(--radius-full);
    background-color: var(--color-bg-subtle);
    font-size: var(--text-sm);
    color: var(--color-text-subtle);
    opacity: 0;
  }

  @supports (container-type: scroll-state) {
    @container scroll-state(stuck: top) {
      .scroll-state-stick-inner {
        background-color: var(--color-surface-glass);
        backdrop-filter: blur(8px);
        box-shadow: var(--shadow-md);

        @include reduced-transparency {
          background-color: var(--color-bg-subtle);
          backdrop-filter: none;
        }
      }

      .scroll-state-stuck-badge {
        opacity: 1;
      }
    }
  }

  .scroll-state-list {
    display: grid;
    gap: 1px;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .scroll-state-list li {
    padding: var(--space-2) var(--space-3);
    font-size: var(--text-sm);
  }

  .scroll-state-hinted {
    position: relative;
    display: flex;
    overflow-x: auto;
    min-inline-size: 0;
    overscroll-behavior-x: contain;
    container-type: scroll-state;
    border-radius: var(--radius-md);

    &:focus-visible {
      outline: var(--focus-ring-width) solid var(--focus-ring-color);
      outline-offset: var(--focus-ring-offset);
    }
  }

  .scroll-state-chips {
    display: flex;
    flex: none;
    gap: var(--space-2);
    margin: 0;
    padding: var(--space-2);
    list-style: none;
  }

  .scroll-state-chip {
    padding: var(--space-1) var(--space-3);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-full);
    background-color: var(--color-surface);
    font-size: var(--text-sm);
    white-space: nowrap;

    @include high-contrast {
      border-color: currentcolor;
    }
  }

  .scroll-state-hint {
    position: sticky;
    z-index: 1;
    flex: 0 0 0;
    inline-size: 0;
    opacity: 0;
    transition: opacity var(--duration-normal) var(--easing-standard);

    &::before {
      content: '';
      position: absolute;
      inset-block: 0;
      inline-size: var(--space-8);
      pointer-events: none;
    }
  }

  .scroll-state-hint-start {
    inset-inline-start: 0;

    &::before {
      inset-inline-start: 0;
      background: linear-gradient(to right, color-mix(in oklab, var(--color-text) 22%, transparent), transparent);
    }
  }

  .scroll-state-hint-end {
    inset-inline-end: 0;

    &::before {
      inset-inline-end: 0;
      background: linear-gradient(to left, color-mix(in oklab, var(--color-text) 22%, transparent), transparent);
    }
  }

  @include forced-colors {
    .scroll-state-hint::before {
      inline-size: var(--space-1);
      background: Highlight;
    }
  }

  @supports (container-type: scroll-state) {
    @container scroll-state(scrollable: inline-start) {
      .scroll-state-hint-start {
        opacity: 1;
      }
    }

    @container scroll-state(scrollable: inline-end) {
      .scroll-state-hint-end {
        opacity: 1;
      }
    }
  }

  .scroll-state-note {
    font-size: var(--text-sm);
    color: var(--color-text-subtle);
  }
}
</style>
