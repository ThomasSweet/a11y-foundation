<template>
  <div class="placeholder">
    <p class="placeholder-label">To build</p>
    <p class="placeholder-todo">{{ todo }}</p>
    <pre v-if="hint" class="placeholder-hint"><code>{{ hint }}</code></pre>
  </div>
</template>

<script setup>
// Stand-in for showcases that don't have a demo yet — registered in
// registry.js with a `todo` describing what to build and an optional
// `hint` with starting CSS. Replace with a real demo component, keep
// the registry entry.
defineProps({
  todo: { type: String, required: true },
  hint: { type: String, default: '' },
})
</script>

<style scoped lang="scss">
@layer components {
  .placeholder {
    display: grid;
    gap: var(--space-2);
    font-size: var(--text-sm);
  }

  .placeholder-label {
    justify-self: start;
    padding: var(--space-1) var(--space-2);
    border: 1px dashed var(--color-border);
    border-radius: var(--radius-sm);
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--color-text-subtle);

    @include high-contrast {
      border-color: currentcolor;
    }
  }

  .placeholder-todo {
    color: var(--color-text-subtle);
  }

  .placeholder-hint {
    padding: var(--space-3);
    border-radius: var(--radius-sm);
    background-color: var(--color-bg-subtle);
    overflow-x: auto;
  }
}
</style>
