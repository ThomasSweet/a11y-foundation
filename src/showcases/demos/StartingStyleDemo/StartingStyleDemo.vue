<template>
  <div class="starting-style-demo">
    <p class="starting-style-caption">
      <code>@starting-style</code> animates an element <em>in</em> from
      <code>display: none</code> — entry transitions that used to need JS.
      Exit is handled by <code>transition-behavior: allow-discrete</code>.
      Both run on motion tokens, so they collapse to an instant change under
      reduced motion. Toggle the card:
    </p>

    <AppButton
      variant="secondary"
      :aria-expanded="open"
      aria-controls="starting-style-card"
      @click="open = !open"
    >
      {{ open ? 'Hide' : 'Show' }} card
    </AppButton>

    <div id="starting-style-card" class="starting-style-card" :class="{ 'is-open': open }">
      <p class="starting-style-card-title">Hello there 👋</p>
      <p class="starting-style-card-text">
        I faded and slid in from <code>display: none</code> — no JS animation,
        just <code>@starting-style</code> plus a transition.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import AppButton from '../../components/AppButton/AppButton.vue'

const open = ref(false)
</script>

<style scoped lang="scss">
@layer components {
  .starting-style-demo {
    display: grid;
    gap: var(--space-3);
    justify-items: start;
  }

  .starting-style-caption {
    font-size: var(--text-sm);
    color: var(--color-text-subtle);
  }

  .starting-style-card {
    /* Closed state: removed from layout and the a11y tree. */
    display: none;
    max-inline-size: 40ch;
    padding: var(--space-4);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    background-color: var(--color-surface);
    box-shadow: var(--shadow-md);
    opacity: 0;
    transform: translateY(0.5rem);
    /* allow-discrete lets `display` participate, so the exit animates too. */
    transition:
      opacity var(--duration-normal) var(--easing-standard),
      transform var(--duration-normal) var(--easing-standard),
      display var(--duration-normal) allow-discrete;

    &.is-open {
      display: grid;
      gap: var(--space-1);
      opacity: 1;
      transform: translateY(0);

      /* The from-state for the entry transition (display:none → shown). */
      @starting-style {
        opacity: 0;
        transform: translateY(0.5rem);
      }
    }

    @include high-contrast {
      border-color: currentcolor;
    }
  }

  .starting-style-card-title {
    font-weight: 600;
  }

  .starting-style-card-text {
    font-size: var(--text-sm);
    color: var(--color-text-subtle);
  }
}
</style>
