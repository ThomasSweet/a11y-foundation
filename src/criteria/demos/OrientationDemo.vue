<template>
  <div class="orientation-demo" :class="{ 'is-broken': broken, 'is-landscape': landscape }">
    <p class="orientation-caption">
      A small app in a device frame. The frame is a size container, and the
      app is styled with <code>@container (orientation: portrait)</code> and
      <code>(orientation: landscape)</code>. That stands in for the page-level
      <code>@media (orientation: …)</code>, because you cannot rotate your
      real screen on request. The button changes the shape of the frame and
      nothing else.
    </p>

    <div class="orientation-stage">
      <div class="orientation-device">
        <div
          class="orientation-screen"
          tabindex="0"
          role="group"
          aria-label="Device screen"
        >
          <div class="orientation-app">
            <div class="orientation-app-head">
              <p class="orientation-app-title">Today</p>
              <p class="orientation-app-layout orientation-app-layout-portrait">Portrait layout</p>
              <p class="orientation-app-layout orientation-app-layout-landscape">Landscape layout</p>
            </div>
            <ul class="orientation-app-list">
              <li>7,204 steps</li>
              <li>3 reminders</li>
              <li>2 messages</li>
            </ul>
          </div>
          <p class="orientation-notice">
            <span class="orientation-notice-icon" aria-hidden="true">⟳</span>
            Rotate your device to landscape to continue.
          </p>
        </div>
      </div>
    </div>

    <button class="orientation-rotate" type="button" @click="landscape = !landscape">
      {{ landscape ? 'Rotate to portrait' : 'Rotate to landscape' }}
    </button>
  </div>
</template>

<script setup lang="ts">
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
    grid-template-columns: minmax(0, 1fr);
    gap: var(--space-3);
  }

  .orientation-caption {
    font-size: var(--text-sm);
    color: var(--color-text-subtle);
  }

  .orientation-stage {
    display: flex;
    justify-content: center;
    align-items: start;
    padding: var(--space-2);
  }

  .orientation-device {
    container-type: size;
    display: grid;
    grid-template: minmax(0, 1fr) / minmax(0, 1fr);
    inline-size: min(11rem, 100%);
    aspect-ratio: 11 / 17;
    padding: var(--space-2);
    border: 2px solid var(--color-border);
    border-radius: var(--radius-lg);
    background-color: var(--color-bg-subtle);

    @include high-contrast {
      border-color: currentcolor;
    }
  }

  .is-landscape .orientation-device {
    inline-size: min(17rem, 100%);
    aspect-ratio: 17 / 11;
  }

  .orientation-screen {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    min-block-size: 0;
    overflow: auto;
    padding: var(--space-2);
    border: 1px solid transparent;
    border-radius: var(--radius-md);
    background-color: var(--color-surface);
  }

  .orientation-app {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: var(--space-2);
    align-content: start;
  }

  .orientation-app-head {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    gap: var(--space-1) var(--space-3);
  }

  .orientation-app-title {
    font-size: var(--text-lg);
    font-weight: 600;
    overflow-wrap: anywhere;
  }

  .orientation-app-layout {
    font-size: var(--text-sm);
    font-weight: 600;
    overflow-wrap: anywhere;
  }

  .orientation-app-layout-landscape {
    display: none;
  }

  .orientation-app-list {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: var(--space-2);
    margin: 0;
    padding: var(--space-2) 0 0;
    border-block-start: 1px solid var(--color-border);
    list-style: none;
    font-size: var(--text-sm);
    color: var(--color-text-subtle);
    overflow-wrap: anywhere;
  }

  .orientation-notice {
    display: none;
    grid-template-columns: minmax(0, 1fr);
    justify-items: center;
    align-content: center;
    gap: var(--space-1);
    font-size: var(--text-sm);
    text-align: center;
    overflow-wrap: anywhere;
  }

  .orientation-notice-icon {
    font-size: var(--text-2xl);
    line-height: 1;
  }

  .orientation-demo {
    @container (orientation: landscape) {
      .orientation-app-layout-portrait {
        display: none;
      }

      .orientation-app-layout-landscape {
        display: block;
      }

      .orientation-app-list {
        grid-template-columns: repeat(auto-fit, minmax(min(100%, 4.5rem), 1fr));
      }
    }
  }

  .orientation-demo.is-broken {
    @container (orientation: portrait) {
      .orientation-app {
        display: none;
      }

      .orientation-notice {
        display: grid;
      }
    }
  }

  .orientation-rotate {
    justify-self: start;
    max-inline-size: 100%;
    min-block-size: 44px;
    padding: var(--space-2) var(--space-4);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    background-color: var(--color-surface);
    color: var(--color-text);
    font-weight: 600;
    overflow-wrap: anywhere;
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
