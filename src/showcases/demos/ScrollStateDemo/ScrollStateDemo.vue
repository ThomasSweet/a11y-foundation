<template>
  <div class="scroll-state-demo">
    <p class="scroll-state-caption">
      <code>scroll-state()</code> container queries let an element restyle
      itself based on <em>how it sits in a scroller</em> — no scroll listeners,
      no JS. Here a card knows when it’s the <strong>snapped</strong> one, and a
      header knows when it’s <strong>stuck</strong>. Without support, both stay
      fully usable — they just skip the extra cue.
    </p>

    <!-- snapped: the centered card highlights itself -->
    <section class="scroll-state-block">
      <h5 class="scroll-state-h">Snapped</h5>
      <!-- Region wraps the list so the cards keep list semantics (a
           role="region" directly on the <ul> would strip them). -->
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

  /* ---- Snapped carousel ---- */
  .scroll-state-track {
    padding: var(--space-2);
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    border-radius: var(--radius-md);

    &:focus-visible {
      outline: var(--focus-ring-width) solid var(--focus-ring-color);
      outline-offset: var(--focus-ring-offset);
    }
  }

  .scroll-state-cards {
    display: flex;
    gap: var(--space-3);
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .scroll-state-card {
    flex: 0 0 min(60%, 13rem);
    scroll-snap-align: center;
    /* The card becomes a scroll-state query container; its inner content
       reacts to whether the card is currently snapped. */
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

  /* Badge hidden until the card is snapped (revealed in the query below). */
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

  /* ---- Stuck sticky header ---- */
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
    /* The sticky element is the scroll-state container; its inner header
       reacts to becoming stuck to the top. */
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
}
</style>
