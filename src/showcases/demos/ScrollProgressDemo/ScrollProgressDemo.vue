<template>
  <!-- tabindex + role + label make the scroll region keyboard-operable and announced. -->
  <div
    class="scroll-demo"
    tabindex="0"
    role="region"
    aria-label="Scrollable example text with reading progress"
  >
    <div class="scroll-progress" aria-hidden="true"></div>
    <div class="scroll-content">
      <p v-for="n in 4" :key="n">
        Scroll this box — the progress bar at the top is driven by the
        scroll position of this container, in pure CSS. No scroll
        listeners, no layout thrash, and it runs off the main thread.
      </p>
    </div>
  </div>
</template>

<script setup>
// Intentionally empty — the whole demo is CSS.
</script>

<style scoped lang="scss">
@layer components {
  .scroll-demo {
    position: relative;
    max-block-size: 10rem;
    overflow-y: auto;
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);

    @include high-contrast {
      border-color: currentcolor;
    }
  }

  .scroll-progress {
    position: sticky;
    inset-block-start: 0;
    block-size: var(--space-1);
    background-color: var(--color-primary);
    transform-origin: 0 50%;

    /* Hidden unless the browser can drive it from scroll — a frozen bar would
       read as "0%". Scroll-linked motion mirrors the gesture, so no RM override. */
    display: none;

    @supports (animation-timeline: scroll()) {
      display: block;
      animation: grow-progress linear both;
      animation-timeline: scroll(nearest);
    }
  }

  .scroll-content {
    display: grid;
    gap: var(--space-3);
    padding: var(--space-3) var(--space-4);
    font-size: var(--text-sm);
    color: var(--color-text-subtle);
  }

  @keyframes grow-progress {
    from {
      transform: scaleX(0);
    }

    to {
      transform: scaleX(1);
    }
  }
}
</style>
