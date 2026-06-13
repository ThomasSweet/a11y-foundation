<template>
  <div class="rf-demo" :class="{ 'is-broken': broken }">
    <p class="rf-caption">
      This panel is ~340px wide — like a phone, or a 1280px desktop zoomed
      to 400%, which is the width 1.4.10 targets. Scroll it.
    </p>

    <!-- A simulated narrow viewport. overflow:auto contains any scrolling
         to this box (not the page), so a horizontal scrollbar appearing
         here IS the failure you can see and feel. -->
    <div class="rf-viewport">
      <div class="rf-content">
        <p class="rf-title">Account overview</p>
        <p class="rf-text">
          Your subscription renews next month. Everything below should stay
          readable in one column, with only vertical scrolling.
        </p>
        <ul class="rf-stats">
          <li v-for="stat in stats" :key="stat.label" class="rf-stat">
            <span class="rf-stat-value">{{ stat.value }}</span>
            <span class="rf-stat-label">{{ stat.label }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
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
  .rf-demo {
    display: grid;
    gap: var(--space-3);
  }

  .rf-caption {
    font-size: var(--text-sm);
    color: var(--color-text-subtle);
  }

  .rf-viewport {
    /* Fixed, phone-narrow stage. overflow:auto keeps any overflow local. */
    inline-size: min(100%, 21rem);
    max-block-size: 15rem;
    overflow: auto;
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);

    @include high-contrast {
      border-color: currentcolor;
    }
  }

  .rf-content {
    /* Compliant: the content is fluid and never forced wider than the
       viewport — the same intrinsic approach used across this project. */
    display: grid;
    gap: var(--space-3);
    padding: var(--space-3);
  }

  .rf-title {
    font-size: var(--text-lg);
    font-weight: 600;
  }

  .rf-text {
    font-size: var(--text-sm);
    color: var(--color-text-subtle);
  }

  .rf-stats {
    /* auto-fit + min() reflows from a row to a single column as space
       tightens — no media query, no fixed track widths. */
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 7rem), 1fr));
    gap: var(--space-2);
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .rf-stat {
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

  .rf-stat-value {
    font-size: var(--text-lg);
    font-weight: 600;
  }

  .rf-stat-label {
    font-size: var(--text-sm);
    color: var(--color-text-subtle);
  }

  /* The regression: fixed widths that ignore the viewport. The content
     becomes wider than its container, so reading now requires scrolling
     in two dimensions — exactly what 1.4.10 forbids. Only the sizing
     changes; the content and structure are identical. */
  .is-broken {
    .rf-content {
      inline-size: 34rem;
    }

    .rf-text {
      white-space: nowrap;
    }

    .rf-stats {
      grid-template-columns: repeat(3, 11rem);
    }
  }
}
</style>
