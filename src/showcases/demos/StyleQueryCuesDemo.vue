<template>
  <div class="cues-demo">
    <p class="cues-caption">
      These service statuses are shown by <strong>color alone</strong> — but
      ~1 in 12 men can't reliably tell red from green
      (deuteranopia / protanopia). Toggle non-color cues: a
      <code>@container style(--cues: on)</code> query adds a distinct
      <em>shape</em> to every status inside, with no per-status code.
      (Screen-reader users get the state from an <code>aria-label</code>
      regardless.)
    </p>

    <label class="cues-toggle">
      <input type="checkbox" />
      <span>Add non-color cues</span>
    </label>

    <!-- No JS: --cues is set on the demo root in CSS, where :has() reads this
         checkbox. It inherits down to each status, where the style query reads
         it and adds shapes to statuses that don't know about it. -->
    <ul class="service-list">
      <li v-for="s in services" :key="s.name" class="service">
        <span class="service-name">{{ s.name }}</span>
        <span
          class="service-status"
          :class="`service-status--${s.state}`"
          role="img"
          :aria-label="stateLabel[s.state]"
        ></span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
type State = 'ok' | 'degraded' | 'down'

const stateLabel: Record<State, string> = {
  ok: 'Operational',
  degraded: 'Degraded',
  down: 'Down',
}

const services: { name: string; state: State }[] = [
  { name: 'API gateway', state: 'ok' },
  { name: 'Database', state: 'down' },
  { name: 'CDN', state: 'degraded' },
  { name: 'Auth service', state: 'ok' },
]
</script>

<style scoped lang="scss">
@layer components {
  .cues-demo {
    /* The toggle's state lives here, set purely in CSS: :has() reads the
       checkbox and flips --cues, which inherits down to every status where
       the style query below reads it. No JS drives this. */
    --cues: off;

    display: grid;
    gap: var(--space-4);

    &:has(.cues-toggle input:checked) {
      --cues: on;
    }
  }

  .cues-caption {
    font-size: var(--text-sm);
    color: var(--color-text-subtle);
  }

  .cues-toggle {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    font-size: var(--text-sm);
    font-weight: 600;
    cursor: pointer;
  }

  .service-list {
    display: grid;
    gap: var(--space-2);
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .service {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-4);
    padding: var(--space-2) var(--space-3);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    background-color: var(--color-bg-subtle);

    @include high-contrast {
      border-color: currentcolor;
    }
  }

  .service-status {
    display: grid;
    place-items: center;
    inline-size: 1.25rem;
    block-size: 1.25rem;
    border-radius: var(--radius-full);
    /* Color-only by default — the trap. */
    background-color: var(--state-color);
    font-size: var(--text-sm);
    font-weight: 700;
    line-height: 1;

    &--ok {
      --state-color: var(--color-success);
    }

    &--degraded {
      --state-color: var(--color-warning);
    }

    &--down {
      --state-color: var(--color-error);
    }
  }

  /* The container style query: when --cues is on (inherited from .cues-demo),
     swap the colored dot for a colored SHAPE on the neutral row — a cue that
     survives any color-vision deficiency. No status element references
     --cues; the query reaches them from their ancestor. */
  @container style(--cues: on) {
    .service-status {
      background-color: transparent;
      color: var(--state-color);

      &--ok::before {
        content: '✓';
      }

      &--degraded::before {
        content: '▲';
      }

      &--down::before {
        content: '✕';
      }
    }
  }
}
</style>
