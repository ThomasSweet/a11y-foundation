<template>
  <div class="animation-demo" :class="{ 'is-broken': broken, 'is-rm': simulateRm }">
    <p class="animation-caption">
      Reload the panel to replay its entry motion. Then turn on the
      simulated preference and reload again: compliant goes still, broken
      keeps sliding. (Your real OS reduced-motion setting works too.)
    </p>

    <label class="animation-sim">
      <input v-model="simulateRm" type="checkbox" />
      <span>Simulate: I prefer reduced motion</span>
    </label>

    <div class="animation-stage">
      <!-- :key remounts the panel on each click, replaying the entry animation. -->
      <article :key="playId" class="animation-panel">
        <p class="animation-panel-title">Message sent</p>
        <p class="animation-panel-text">Your changes are saved.</p>
      </article>
    </div>

    <button class="animation-replay" type="button" @click="playId++">
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
  .animation-demo {
    /* One switch for all motion: 0 = allowed, 1 = suppressed. Compliant flips
       it to 1 on the preference (simulated or real); broken forces it to 0. */
    --rm: 0;

    display: grid;
    gap: var(--space-3);

    @include reduced-motion {
      --rm: 1;
    }
  }

  /* Compliant respects a simulated preference… */
  .animation-demo.is-rm {
    --rm: 1;
  }

  /* …but broken ignores the preference entirely — declared last so it wins
     over both the simulated and the real (media-query) overrides above. */
  .animation-demo.is-broken {
    --rm: 0;
  }

  .animation-caption {
    font-size: var(--text-sm);
    color: var(--color-text-subtle);
  }

  .animation-sim {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    font-size: var(--text-sm);
    cursor: pointer;
  }

  .animation-stage {
    /* Clip the slide so it can't introduce horizontal scrolling. */
    overflow: hidden;
    padding: var(--space-1);
  }

  .animation-panel {
    display: grid;
    gap: var(--space-1);
    padding: var(--space-3);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    background-color: var(--color-bg-subtle);

    /* Duration collapses to 0 when --rm is 1, so the panel simply appears
       with no motion. No per-state duplication — the switch does it. */
    animation: animation-slide calc(450ms * (1 - var(--rm))) var(--easing-enter) both;

    @include high-contrast {
      border-color: currentcolor;
    }
  }

  .animation-panel-title {
    font-weight: 600;
  }

  .animation-panel-text {
    font-size: var(--text-sm);
    color: var(--color-text-subtle);
  }

  .animation-replay {
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

  @keyframes animation-slide {
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
