<template>
  <div class="orientation-demo" :class="{ 'is-broken': broken, 'is-landscape': landscape }">
    <p class="orientation-caption">
      A little app inside a device frame. Rotate it. Compliant works either
      way; broken demands landscape and walls off portrait — locking out
      anyone whose device is fixed in one orientation (a tablet mounted to
      a wheelchair, say).
    </p>

    <div class="orientation-stage">
      <div class="orientation-device">
        <!-- Both states stay in the DOM; CSS shows the right one per orientation + rule state. -->
        <div class="orientation-screen">
          <p class="orientation-screen-title">Today</p>
          <p class="orientation-screen-row">7,204 steps</p>
          <p class="orientation-screen-row">3 reminders</p>
          <p class="orientation-screen-row">2 messages</p>
        </div>
        <div class="orientation-rotate-notice" role="alert">
          <span class="orientation-rotate-icon" aria-hidden="true">⟳</span>
          <p>Please rotate your device to landscape to continue.</p>
        </div>
      </div>
    </div>

    <button class="orientation-rotate-btn" type="button" @click="landscape = !landscape">
      Rotate device ({{ landscape ? 'landscape' : 'portrait' }})
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  broken: { type: Boolean, default: false },
})

const landscape = ref(false)
</script>

<style scoped lang="scss">
@layer components {
  .orientation-demo {
    display: grid;
    gap: var(--space-3);
  }

  .orientation-caption {
    font-size: var(--text-sm);
    color: var(--color-text-subtle);
  }

  .orientation-stage {
    display: flex;
    justify-content: center;
    padding: var(--space-2);
  }

  .orientation-device {
    position: relative;
    display: grid;
    inline-size: 11rem;
    block-size: 17rem;
    padding: var(--space-3);
    border: 2px solid var(--color-border);
    border-radius: var(--radius-lg);
    background-color: var(--color-bg-subtle);

    @include high-contrast {
      border-color: currentcolor;
    }
  }

  /* Rotating swaps the device's dimensions (.is-landscape sits on the root). */
  .is-landscape .orientation-device {
    inline-size: 17rem;
    block-size: 11rem;
  }

  .orientation-screen {
    display: grid;
    gap: var(--space-2);
    align-content: start;
    padding: var(--space-3);
    border-radius: var(--radius-md);
    background-color: var(--color-surface);
  }

  .orientation-screen-title {
    font-size: var(--text-lg);
    font-weight: 600;
  }

  .orientation-screen-row {
    font-size: var(--text-sm);
    color: var(--color-text-subtle);
  }

  .orientation-rotate-notice {
    /* Hidden by default — the app works in every orientation. */
    display: none;
    place-content: center;
    justify-items: center;
    gap: var(--space-2);
    padding: var(--space-3);
    text-align: center;
    font-size: var(--text-sm);
  }

  .orientation-rotate-icon {
    font-size: var(--text-3xl);
  }

  /* The regression: the app only supports landscape, so in portrait it
     blocks the content behind a "rotate your device" wall. */
  .is-broken:not(.is-landscape) {
    .orientation-screen {
      display: none;
    }

    .orientation-rotate-notice {
      display: grid;
    }
  }

  .orientation-rotate-btn {
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
}
</style>
