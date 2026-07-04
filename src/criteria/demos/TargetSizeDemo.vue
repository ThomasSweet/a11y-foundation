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
        <span aria-hidden="true">{{ tool.glyph }}</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

defineProps({
  broken: { type: Boolean, default: false },
})

const tools = [
  { id: 'bold', glyph: 'B', label: 'Bold' },
  { id: 'italic', glyph: 'I', label: 'Italic' },
  { id: 'underline', glyph: 'U', label: 'Underline' },
  { id: 'link', glyph: '🔗', label: 'Insert link' },
  { id: 'list', glyph: '☰', label: 'Bulleted list' },
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
