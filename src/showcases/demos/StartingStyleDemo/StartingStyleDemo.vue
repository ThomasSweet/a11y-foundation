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

    <p class="starting-style-caption">
      The same trick composes with breakpoints: put the block inside a
      container (or media) query and responsive state changes <em>fade</em>
      instead of popping. The motion tokens still guard it — resizing and
      device rotation trigger this, so reduced motion collapses it to an
      instant swap. Narrow the space until the details panel leaves, then
      widen it again:
    </p>

    <label class="starting-style-control">
      Container width
      <input v-model="stageWidth" type="range" min="40" max="100" step="1" />
      <span aria-hidden="true">{{ stageWidth }}%</span>
    </label>

    <div class="starting-style-stage" :style="{ inlineSize: `${stageWidth}%` }">
      <div class="starting-style-app">
        <div class="starting-style-main">
          <p class="starting-style-card-title">Inbox</p>
          <p class="starting-style-card-text">The content that's always there.</p>
        </div>
        <aside class="starting-style-panel">
          <p class="starting-style-card-title">Details</p>
          <p class="starting-style-card-text">I fade in when there's room.</p>
        </aside>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import AppButton from '../../../components/AppButton/AppButton.vue'

const open = ref(false)
const stageWidth = ref(100)
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

  .starting-style-control {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--space-3);
    justify-self: stretch;
    font-size: var(--text-sm);

    input {
      flex: 1;
      min-inline-size: 8rem;
    }
  }

  .starting-style-stage {
    container-type: inline-size;
    justify-self: stretch;
    min-inline-size: min(100%, 14rem);
  }

  .starting-style-app {
    display: flex;
    gap: var(--space-3);
    padding: var(--space-3);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);

    @include high-contrast {
      border-color: currentcolor;
    }
  }

  .starting-style-main {
    flex: 1;
    min-inline-size: 0;
    padding: var(--space-3);
    border-radius: var(--radius-sm);
    background-color: var(--color-bg-subtle);
  }

  .starting-style-panel {
    display: none;
    inline-size: 40%;
    padding: var(--space-3);
    border-radius: var(--radius-sm);
    background-color: var(--color-bg-subtle);
    opacity: 0;
    translate: 0.5rem 0;
    transition:
      opacity var(--duration-normal) var(--easing-standard),
      translate var(--duration-normal) var(--easing-standard),
      display var(--duration-normal) allow-discrete;
  }

  @container (inline-size >= 26rem) {
    .starting-style-panel {
      display: grid;
      gap: var(--space-1);
      align-content: start;
      opacity: 1;
      translate: 0 0;

      @starting-style {
        opacity: 0;
        translate: 0.5rem 0;
      }
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
