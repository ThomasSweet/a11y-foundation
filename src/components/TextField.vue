<script setup>
import { computed, useId } from 'vue'

const props = defineProps({
  label: { type: String, required: true },
  hint: { type: String, default: '' },
  error: { type: String, default: '' },
  type: { type: String, default: 'text' },
})

const model = defineModel({ type: String, default: '' })

const inputId = useId()
const hintId = useId()
const errorId = useId()

// Hint and error are announced by screen readers because they're linked
// via aria-describedby — placing text near an input isn't enough.
const describedBy = computed(() => {
  const ids = []
  if (props.hint) ids.push(hintId)
  if (props.error) ids.push(errorId)
  return ids.join(' ') || undefined
})
</script>

<template>
  <div class="field">
    <label class="field-label" :for="inputId">{{ label }}</label>
    <p v-if="hint" :id="hintId" class="field-hint">{{ hint }}</p>
    <input
      :id="inputId"
      v-model="model"
      class="field-input"
      :type="type"
      :aria-describedby="describedBy"
      :aria-invalid="error ? true : undefined"
    />
    <p v-if="error" :id="errorId" class="field-error">{{ error }}</p>
  </div>
</template>

<style scoped lang="scss">
@layer components {
  .field {
    display: grid;
    gap: var(--space-1);
    max-inline-size: 40ch;
  }

  .field-label {
    font-weight: 600;
  }

  .field-hint {
    font-size: var(--text-sm);
    color: var(--color-text-subtle);
  }

  .field-input {
    min-block-size: 44px;
    padding: var(--space-2) var(--space-3);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    background-color: var(--color-surface);
    color: var(--color-text);

    &[aria-invalid='true'] {
      border-color: var(--color-error);
      border-width: 2px;
    }
  }

  .field-error {
    font-size: var(--text-sm);
    font-weight: 600;
    color: var(--color-error);

    /* Color is stripped in forced-colors mode — the prefix below keeps
       the error state perceivable without it. */
    &::before {
      content: '⚠ ';
    }
  }
}
</style>
