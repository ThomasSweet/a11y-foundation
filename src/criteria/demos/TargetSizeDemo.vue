<template>
  <div class="target-size-demo" :class="{ 'is-broken': broken }">
    <p class="target-size-caption">
      A formatting toolbar — toggle each control. With the rule off, the
      same buttons shrink and crowd together: try hitting them now.
    </p>
    <div class="target-size-toolbar" role="group" aria-label="Text formatting">
      <button
        v-for="tool in tools"
        :key="tool.id"
        type="button"
        class="target-size-btn"
        :class="{ 'is-active': active[tool.id] }"
        :aria-pressed="active[tool.id] ? 'true' : 'false'"
        :aria-label="tool.label"
        @click="active[tool.id] = !active[tool.id]"
      >
        <span v-if="tool.glyph" class="target-size-glyph" aria-hidden="true">{{ tool.glyph }}</span>
        <svg v-else class="target-size-icon" viewBox="0 0 24 24" aria-hidden="true">
          <path :d="tool.d" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

defineProps({
  broken: { type: Boolean, default: false },
})

interface Tool {
  id: string
  label: string
  glyph?: string
  d?: string
}

const tools: Tool[] = [
  { id: 'bold', glyph: 'B', label: 'Bold' },
  { id: 'italic', glyph: 'I', label: 'Italic' },
  { id: 'underline', glyph: 'U', label: 'Underline' },
  {
    id: 'link',
    label: 'Insert link',
    d: 'M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71 M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71',
  },
  {
    id: 'list',
    label: 'Bulleted list',
    d: 'M4.5 6h.01 M9.5 6H20 M4.5 12h.01 M9.5 12H20 M4.5 18h.01 M9.5 18H20',
  },
]

const active = reactive<Record<string, boolean>>({})
</script>

<style scoped lang="scss">
@layer components {
  .target-size-demo {
    display: grid;
    gap: var(--space-3);
  }

  .target-size-caption {
    font-size: var(--text-sm);
    color: var(--color-text-subtle);
  }

  .target-size-toolbar {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-2);
  }

  .target-size-btn {
    /* Compliant: 44px here (the 2.5.5 AAA / platform best practice; the
       2.5.8 AA floor is 24px), with real spacing between targets. */
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-inline-size: 44px;
    min-block-size: 44px;
    padding: var(--space-2);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    background-color: var(--color-surface);
    color: var(--color-text);
    font-weight: 600;
    cursor: pointer;

    &.is-active {
      border-color: var(--color-primary);
      background-color: var(--color-bg-subtle);
    }

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

  .target-size-glyph {
    line-height: 1;
  }

  .target-size-icon {
    inline-size: 1.1em;
    block-size: 1.1em;
    fill: none;
    stroke: currentcolor;
    stroke-width: 2.2;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  /* The regression: drop well under 24px and remove spacing, so targets are
     cramped and easy to mis-tap; only 2.5.8 is violated. */
  .is-broken {
    .target-size-toolbar {
      gap: 0;
    }

    .target-size-btn {
      min-inline-size: 16px;
      min-block-size: 16px;
      padding: 0;
      font-size: var(--text-sm);
    }
  }
}
</style>
