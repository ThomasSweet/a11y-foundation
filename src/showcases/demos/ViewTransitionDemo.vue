<template>
  <div class="view-transition-demo">
    <p class="view-transition-caption">
      Switch the layout and the cards <em>morph</em> between arrangements
      instead of snapping — the browser tweens each shared element across the
      DOM change. One <code>startViewTransition()</code> call and a
      <code>view-transition-name</code> per card; no FLIP math, no animation
      library. It’s skipped entirely under reduced motion (the swap is still
      instant and correct) and where the API isn’t supported.
    </p>

    <div class="view-transition-bar">
      <div class="view-transition-toggle" role="group" aria-label="Layout">
        <button
          type="button"
          class="view-transition-btn"
          :aria-pressed="view === 'grid'"
          @click="setView('grid')"
        >
          Grid
        </button>
        <button
          type="button"
          class="view-transition-btn"
          :aria-pressed="view === 'list'"
          @click="setView('list')"
        >
          List
        </button>
      </div>
    </div>

    <ul class="view-transition-items" :class="`view-transition-items-${view}`" role="list">
      <li
        v-for="item in items"
        :key="item.id"
        class="view-transition-item"
        :style="{ viewTransitionName: `view-transition-${item.id}` }"
      >
        <span class="view-transition-item-icon" aria-hidden="true">{{ item.icon }}</span>
        <span class="view-transition-item-label">{{ item.label }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

type View = 'grid' | 'list'
const view = ref<View>('grid')

const items = [
  { id: 'tokens', icon: '◆', label: 'Design tokens' },
  { id: 'layers', icon: '▤', label: 'Cascade layers' },
  { id: 'prefs', icon: '☾', label: 'Preferences' },
  { id: 'motion', icon: '➤', label: 'Motion' },
]

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function setView(next: View) {
  if (next === view.value) return
  const apply = () => {
    view.value = next
  }
  const doc = document as Document & {
    startViewTransition?: (cb: () => unknown) => unknown
  }
  // Animate the morph only where the API exists and motion is welcome;
  // otherwise the layout still changes, just instantly.
  if (
    !prefersReducedMotion() &&
    document.visibilityState === 'visible' &&
    doc.startViewTransition
  ) {
    doc.startViewTransition(apply)
  } else {
    apply()
  }
}
</script>

<style scoped lang="scss">
@layer components {
  .view-transition-demo {
    display: grid;
    gap: var(--space-4);
  }

  .view-transition-caption {
    font-size: var(--text-sm);
    color: var(--color-text-subtle);
  }

  .view-transition-toggle {
    display: inline-flex;
    gap: var(--space-1);
    padding: var(--space-1);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-full);
    background-color: var(--color-bg-subtle);
  }

  .view-transition-btn {
    padding: var(--space-2) var(--space-4);
    border: 0;
    border-radius: var(--radius-full);
    background-color: transparent;
    color: var(--color-text-subtle);
    font: inherit;
    font-weight: 500;
    cursor: pointer;

    &[aria-pressed='true'] {
      background-color: var(--color-surface);
      color: var(--color-text);
      box-shadow: var(--shadow-sm);
    }

    &:focus-visible {
      outline: var(--focus-ring-width) solid var(--focus-ring-color);
      outline-offset: 2px;
    }

    @include forced-colors {
      &[aria-pressed='true'] {
        border: 1px solid Highlight;
        color: Highlight;
      }
    }
  }

  .view-transition-items {
    display: grid;
    gap: var(--space-3);
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .view-transition-items-grid {
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 9rem), 1fr));
  }

  .view-transition-items-list {
    grid-template-columns: 1fr;
  }

  .view-transition-item {
    display: flex;
    gap: var(--space-2);
    align-items: center;
    padding: var(--space-3) var(--space-4);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    background-color: var(--color-surface);

    @include high-contrast {
      border-color: currentcolor;
    }
  }

  .view-transition-items-grid .view-transition-item {
    flex-direction: column;
    text-align: center;
  }

  .view-transition-item-icon {
    font-size: var(--text-2xl);
    color: var(--color-primary);
  }

  .view-transition-item-label {
    font-size: var(--text-sm);
    font-weight: 500;
  }
}
</style>
