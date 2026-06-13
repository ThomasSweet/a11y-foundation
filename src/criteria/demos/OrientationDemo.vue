<template>
  <div class="or-demo" :class="{ 'is-broken': broken, 'is-landscape': landscape }">
    <p class="or-caption">
      A little app inside a device frame. Rotate it. Compliant works either
      way; broken demands landscape and walls off portrait — locking out
      anyone whose device is fixed in one orientation (a tablet mounted to
      a wheelchair, say).
    </p>

    <div class="or-stage">
      <div class="or-device">
        <!-- Both states are always in the DOM; CSS shows the right one for
             the current orientation + rule state, so only orientation
             handling changes between compliant and broken. -->
        <div class="or-screen">
          <p class="or-screen-title">Today</p>
          <p class="or-screen-row">7,204 steps</p>
          <p class="or-screen-row">3 reminders</p>
          <p class="or-screen-row">2 messages</p>
        </div>
        <div class="or-rotate-notice" role="alert">
          <span class="or-rotate-icon" aria-hidden="true">⟳</span>
          <p>Please rotate your device to landscape to continue.</p>
        </div>
      </div>
    </div>

    <button class="or-rotate-btn" type="button" @click="landscape = !landscape">
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
  .or-demo {
    display: grid;
    gap: var(--space-3);
  }

  .or-caption {
    font-size: var(--text-sm);
    color: var(--color-text-subtle);
  }

  .or-stage {
    display: flex;
    justify-content: center;
    padding: var(--space-2);
  }

  .or-device {
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

  /* Rotating swaps the device's dimensions. The .is-landscape class lives
     on the demo root, so the device is targeted as a descendant. */
  .is-landscape .or-device {
    inline-size: 17rem;
    block-size: 11rem;
  }

  .or-screen {
    display: grid;
    gap: var(--space-2);
    align-content: start;
    padding: var(--space-3);
    border-radius: var(--radius-md);
    background-color: var(--color-surface);
  }

  .or-screen-title {
    font-size: var(--text-lg);
    font-weight: 600;
  }

  .or-screen-row {
    font-size: var(--text-sm);
    color: var(--color-text-subtle);
  }

  .or-rotate-notice {
    /* Hidden by default — the app works in every orientation. */
    display: none;
    place-content: center;
    justify-items: center;
    gap: var(--space-2);
    padding: var(--space-3);
    text-align: center;
    font-size: var(--text-sm);
  }

  .or-rotate-icon {
    font-size: var(--text-3xl);
  }

  /* The regression: the app only supports landscape, so in portrait it
     blocks the content behind a "rotate your device" wall. */
  .is-broken:not(.is-landscape) {
    .or-screen {
      display: none;
    }

    .or-rotate-notice {
      display: grid;
    }
  }

  .or-rotate-btn {
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
