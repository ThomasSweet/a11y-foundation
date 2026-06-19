<template>
  <div class="sst-demo">
    <p class="sst-caption">
      <code>scroll-state()</code> container queries let an element restyle
      itself based on <em>how it sits in a scroller</em> — no scroll listeners,
      no JS. Here a card knows when it’s the <strong>snapped</strong> one, and a
      header knows when it’s <strong>stuck</strong>. Without support, both stay
      fully usable — they just skip the extra cue.
    </p>

    <!-- snapped: the centered card highlights itself -->
    <section class="sst-block">
      <h4 class="sst-h">Snapped</h4>
      <!-- Region wraps the list so the cards keep list semantics (a
           role="region" directly on the <ul> would strip them). -->
      <div
        class="sst-track"
        tabindex="0"
        role="region"
        aria-label="Steps, scrollable — the centered card is highlighted"
      >
        <ul class="sst-cards" role="list">
          <li v-for="step in steps" :key="step.n" class="sst-card">
            <div class="sst-card-inner">
              <span class="sst-n">{{ step.n }}</span>
              <span class="sst-label">{{ step.label }}</span>
              <span class="sst-snapped" aria-hidden="true">snapped</span>
            </div>
          </li>
        </ul>
      </div>
    </section>

    <!-- stuck: the sticky header restyles once it pins -->
    <section class="sst-block">
      <h4 class="sst-h">Stuck</h4>
      <div
        class="sst-scroll"
        tabindex="0"
        role="region"
        aria-label="List with a sticky header — scroll to pin it"
      >
        <div class="sst-stick">
          <div class="sst-stick-inner">
            <span>Pinned header</span>
            <span class="sst-stuck-badge" aria-hidden="true">stuck</span>
          </div>
        </div>
        <ul class="sst-list">
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
  .sst-demo {
    display: grid;
    gap: var(--space-4);
  }

  .sst-caption {
    font-size: var(--text-sm);
    color: var(--color-text-subtle);
  }

  .sst-block {
    display: grid;
    gap: var(--space-2);
  }

  .sst-h {
    font-size: var(--text-sm);
    font-weight: 600;
    color: var(--color-text-subtle);
  }

  /* ---- Snapped carousel ---- */
  .sst-track {
    padding: var(--space-2);
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    border-radius: var(--radius-md);

    &:focus-visible {
      outline: var(--focus-ring-width) solid var(--focus-ring-color);
      outline-offset: var(--focus-ring-offset);
    }
  }

  .sst-cards {
    display: flex;
    gap: var(--space-3);
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .sst-card {
    flex: 0 0 min(60%, 13rem);
    scroll-snap-align: center;
    /* The card becomes a scroll-state query container; its inner content
       reacts to whether the card is currently snapped. */
    container-type: scroll-state;
  }

  .sst-card-inner {
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

  .sst-n {
    font-family: var(--font-mono);
    font-size: var(--text-sm);
    color: var(--color-text-subtle);
  }

  .sst-label {
    font-weight: 600;
  }

  /* Badge hidden until the card is snapped (revealed in the query below). */
  .sst-snapped {
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
      .sst-card-inner {
        border-color: var(--color-primary);
        box-shadow: var(--shadow-md);
        scale: 1.03;
      }

      .sst-snapped {
        opacity: 1;
      }
    }
  }

  /* ---- Stuck sticky header ---- */
  .sst-scroll {
    block-size: 12rem;
    overflow-y: auto;
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);

    &:focus-visible {
      outline: var(--focus-ring-width) solid var(--focus-ring-color);
      outline-offset: var(--focus-ring-offset);
    }
  }

  .sst-stick {
    position: sticky;
    inset-block-start: 0;
    /* The sticky element is the scroll-state container; its inner header
       reacts to becoming stuck to the top. */
    container-type: scroll-state;
  }

  .sst-stick-inner {
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

  .sst-stuck-badge {
    padding: 0 var(--space-2);
    border-radius: var(--radius-full);
    background-color: var(--color-bg-subtle);
    font-size: var(--text-sm);
    color: var(--color-text-subtle);
    opacity: 0;
  }

  @supports (container-type: scroll-state) {
    @container scroll-state(stuck: top) {
      .sst-stick-inner {
        background-color: var(--color-surface-glass);
        backdrop-filter: blur(8px);
        box-shadow: var(--shadow-md);

        @include reduced-transparency {
          background-color: var(--color-bg-subtle);
          backdrop-filter: none;
        }
      }

      .sst-stuck-badge {
        opacity: 1;
      }
    }
  }

  .sst-list {
    display: grid;
    gap: 1px;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .sst-list li {
    padding: var(--space-2) var(--space-3);
    font-size: var(--text-sm);
  }
}
</style>
