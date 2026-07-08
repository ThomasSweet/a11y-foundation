<template>
  <div class="motion-demo" :class="{ 'is-rm': simulateRm }">
    <label class="motion-sim">
      <input v-model="simulateRm" type="checkbox" />
      <span>Simulate: I prefer reduced motion</span>
    </label>

    <div class="motion-stage">
      <div class="motion-item">
        <div class="motion-spinner" aria-hidden="true"></div>
        <p class="motion-item-label">Spinner</p>
      </div>
      <div class="motion-item">
        <div class="motion-progress" aria-hidden="true"><span></span></div>
        <p class="motion-item-label">Progress</p>
      </div>
      <div class="motion-item">
        <div class="motion-pulse" aria-hidden="true"></div>
        <p class="motion-item-label">Live pulse</p>
      </div>
    </div>

    <p class="motion-readout" role="status">{{ readout }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

// Simulates the OS preference so the effect is visible without changing system
// settings; the real prefers-reduced-motion media query drives it too.
const simulateRm = ref(false)
const readout = computed(() =>
  simulateRm.value
    ? 'Reduced motion — all three froze from one switch, no component opted in.'
    : 'Motion on. Toggle the preference (or set it in your OS) to still it.',
)
</script>

<style scoped lang="scss">
@layer components {
  .motion-demo {
    /* One switch for every animation here: 0 = allowed, 1 = suppressed. The
       real preference sets it globally (preferences.css); the checkbox
       simulates that so the payoff is visible in-page. */
    --rm: 0;

    display: grid;
    gap: var(--space-4);

    @include reduced-motion {
      --rm: 1;
    }

    &.is-rm {
      --rm: 1;
    }
  }

  .motion-sim {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    justify-self: start;
    font-size: var(--text-sm);
    font-weight: 600;
    cursor: pointer;
  }

  .motion-stage {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 8rem), 1fr));
    gap: var(--space-4);
  }

  .motion-item {
    display: grid;
    gap: var(--space-2);
    justify-items: center;
    align-content: start;
    padding: var(--space-4) var(--space-3);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    background-color: var(--color-bg-subtle);

    @include high-contrast {
      border-color: currentcolor;
    }
  }

  .motion-item-label {
    font-size: var(--text-sm);
    color: var(--color-text-subtle);
  }

  /* Every duration is scaled by (1 - --rm): at rm:1 it collapses to 0, so the
     animation holds its start frame — no per-element reduced-motion rule. */
  .motion-spinner {
    inline-size: var(--space-8);
    block-size: var(--space-8);
    border: 4px solid color-mix(in oklab, var(--color-text) 20%, transparent);
    border-block-start-color: var(--color-text);
    border-radius: var(--radius-full);
    animation: motion-spin calc(1s * (1 - var(--rm))) linear infinite;

    @include forced-colors {
      border-color: CanvasText;
      border-block-start-color: Highlight;
    }
  }

  .motion-progress {
    inline-size: 100%;
    block-size: var(--space-2);
    border-radius: var(--radius-full);
    background-color: color-mix(in oklab, var(--color-text) 12%, transparent);
    overflow: hidden;

    span {
      display: block;
      block-size: 100%;
      inline-size: 40%;
      border-radius: inherit;
      background-color: var(--color-primary);
      animation: motion-progress calc(1.4s * (1 - var(--rm))) var(--easing-standard) infinite;
    }
  }

  .motion-pulse {
    inline-size: var(--space-6);
    block-size: var(--space-6);
    border-radius: var(--radius-full);
    background-color: var(--color-primary);
    animation: motion-pulse calc(1.6s * (1 - var(--rm))) var(--easing-standard) infinite;

    @include forced-colors {
      background-color: Highlight;
    }
  }

  .motion-readout {
    min-block-size: 2lh;
    font-size: var(--text-sm);
    color: var(--color-text-subtle);
  }

  @keyframes motion-spin {
    to {
      rotate: 1turn;
    }
  }

  @keyframes motion-progress {
    0% {
      translate: -110% 0;
    }

    100% {
      translate: 310% 0;
    }
  }

  @keyframes motion-pulse {
    0%,
    100% {
      scale: 0.7;
      opacity: 0.5;
    }

    50% {
      scale: 1;
      opacity: 1;
    }
  }
}
</style>
