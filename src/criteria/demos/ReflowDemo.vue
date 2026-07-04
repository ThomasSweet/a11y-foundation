<template>
  <div class="reflow-demo" :class="{ 'is-broken': broken }">
    <p class="reflow-caption">
      This panel is ~340px wide — like a phone, or a 1280px desktop zoomed
      to 400%, which is the width 1.4.10 targets. Scroll it.
    </p>

    <!-- Simulated narrow viewport: overflow:auto keeps scrolling local, so a
         horizontal scrollbar here IS the visible failure. Focusable so the
         scroll area is keyboard-reachable. -->
    <div
      class="reflow-viewport"
      tabindex="0"
      role="group"
      aria-label="Account overview panel, scrollable"
    >
      <div class="reflow-content">
        <p class="reflow-title">Account overview</p>
        <p class="reflow-text">
          Your subscription renews next month. Everything below should stay
          readable in one column, with only vertical scrolling.
        </p>
        <ul class="reflow-stats">
          <li v-for="stat in stats" :key="stat.label" class="reflow-stat">
            <span class="reflow-stat-value">{{ stat.value }}</span>
            <span class="reflow-stat-label">{{ stat.label }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  broken: { type: Boolean, default: false },
})

const stats = [
  { value: '1,284', label: 'Active sessions' },
  { value: '96%', label: 'Uptime' },
  { value: '$420', label: 'Monthly spend' },
]
</script>

<style scoped lang="scss">
@layer components {
  .reflow-demo {
    display: grid;
    gap: var(--space-3);
  }

  .reflow-caption {
    font-size: var(--text-sm);
    color: var(--color-text-subtle);
  }

  .reflow-viewport {
    /* Fixed, phone-narrow stage. overflow:auto keeps any overflow local. */
    inline-size: min(100%, 21rem);
    min-inline-size: 0;
    max-block-size: 15rem;
    overflow: auto;
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);

    &:focus-visible {
      outline: var(--focus-ring-width) solid var(--focus-ring-color);
      outline-offset: var(--focus-ring-offset);
    }

    @include high-contrast {
      border-color: currentcolor;
    }
  }

  .reflow-content {
    /* Compliant: the content is fluid and never forced wider than the
       viewport — the same intrinsic approach used across this project. */
    display: grid;
    gap: var(--space-3);
    padding: var(--space-3);
  }

  .reflow-title {
    font-size: var(--text-lg);
    font-weight: 600;
  }

  .reflow-text {
    font-size: var(--text-sm);
    color: var(--color-text-subtle);
  }

  .reflow-stats {
    /* auto-fit + min() reflows from a row to a single column as space
       tightens — no media query, no fixed track widths. */
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 7rem), 1fr));
    gap: var(--space-2);
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .reflow-stat {
    display: grid;
    gap: var(--space-1);
    padding: var(--space-2);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-sm);
    background-color: var(--color-bg-subtle);

    @include high-contrast {
      border-color: currentcolor;
    }
  }

  .reflow-stat-value {
    font-size: var(--text-lg);
    font-weight: 600;
  }

  .reflow-stat-label {
    font-size: var(--text-sm);
    color: var(--color-text-subtle);
  }

  /* The regression: fixed widths force the content wider than its container, so
     reading needs two-dimensional scrolling — what 1.4.10 forbids. Sizing only;
     content and structure are unchanged. */
  .is-broken {
    .reflow-content {
      inline-size: 34rem;
    }

    .reflow-text {
      white-space: nowrap;
    }

    .reflow-stats {
      grid-template-columns: repeat(3, 11rem);
    }
  }
}
</style>
