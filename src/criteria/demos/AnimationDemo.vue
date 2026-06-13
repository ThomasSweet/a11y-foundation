<template>
  <div class="am-demo" :class="{ 'is-broken': broken, 'is-rm': simulateRm }">
    <p class="am-caption">
      Reload the panel to replay its entry motion. Then turn on the
      simulated preference and reload again: compliant goes still, broken
      keeps sliding. (Your real OS reduced-motion setting works too.)
    </p>

    <label class="am-sim">
      <input v-model="simulateRm" type="checkbox" />
      <span>Simulate: I prefer reduced motion</span>
    </label>

    <div class="am-stage">
      <!-- :key remounts the panel on each click, replaying the CSS entry
           animation — a clean interaction-triggered motion. -->
      <article :key="playId" class="am-panel">
        <p class="am-panel-title">Message sent</p>
        <p class="am-panel-text">Your changes are saved.</p>
      </article>
    </div>

    <button class="am-replay" type="button" @click="playId++">
      Reload panel
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  broken: { type: Boolean, default: false },
})

const simulateRm = ref(false)
const playId = ref(0)
</script>

<style scoped lang="scss">
@layer components {
  .am-demo {
    /* One switch governs all motion: 0 = motion allowed, 1 = suppressed.
       The compliant cascade flips it to 1 when the preference is set
       (simulated OR real); the broken state forces it back to 0. */
    --rm: 0;

    display: grid;
    gap: var(--space-3);

    @include reduced-motion {
      --rm: 1;
    }
  }

  /* Compliant respects a simulated preference… */
  .am-demo.is-rm {
    --rm: 1;
  }

  /* …but broken ignores the preference entirely — declared last so it wins
     over both the simulated and the real (media-query) overrides above. */
  .am-demo.is-broken {
    --rm: 0;
  }

  .am-caption {
    font-size: var(--text-sm);
    color: var(--color-text-subtle);
  }

  .am-sim {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    font-size: var(--text-sm);
    cursor: pointer;
  }

  .am-stage {
    /* Clip the slide so it can't introduce horizontal scrolling. */
    overflow: hidden;
    padding: var(--space-1);
  }

  .am-panel {
    display: grid;
    gap: var(--space-1);
    padding: var(--space-3);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    background-color: var(--color-bg-subtle);

    /* Duration collapses to 0 when --rm is 1, so the panel simply appears
       with no motion. No per-state duplication — the switch does it. */
    animation: am-slide calc(450ms * (1 - var(--rm))) var(--easing-enter) both;

    @include high-contrast {
      border-color: currentcolor;
    }
  }

  .am-panel-title {
    font-weight: 600;
  }

  .am-panel-text {
    font-size: var(--text-sm);
    color: var(--color-text-subtle);
  }

  .am-replay {
    justify-self: start;
    min-block-size: 44px;
    padding: var(--space-2) var(--space-4);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    background-color: var(--color-surface);
    color: var(--color-text);
    font-weight: 600;
    cursor: pointer;

    @include can-hover {
      &:hover {
        background-color: var(--color-bg-subtle);
      }
    }

    @include high-contrast {
      border-color: currentcolor;
    }

    @include forced-colors {
      border-color: ButtonText;
    }
  }

  @keyframes am-slide {
    from {
      opacity: 0;
      transform: translateX(-1.5rem);
    }

    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
}
</style>
