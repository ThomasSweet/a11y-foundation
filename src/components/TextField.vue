<template>
  <div class="field">
    <label class="field-label" :for="inputId">
      {{ label }}
      <!-- Visual convention only; aria-hidden so screen readers don't read
           "star". The required state is already conveyed natively by the
           input's required attribute. -->
      <span v-if="required" class="field-required" aria-hidden="true">*</span>
    </label>
    <p v-if="hint" :id="hintId" class="field-hint">{{ hint }}</p>
    <input
      :id="inputId"
      v-model="model"
      class="field-input"
      :type="type"
      :required="required || undefined"
      :pattern="pattern || undefined"
      :title="title || undefined"
      :placeholder="placeholder"
      :aria-describedby="describedBy"
      :aria-invalid="error ? true : undefined"
    />
    <p v-if="error" :id="errorId" class="field-error">{{ error }}</p>
  </div>
</template>

<script setup>
import { computed, useId } from 'vue'

const props = defineProps({
  label: { type: String, required: true },
  hint: { type: String, default: '' },
  error: { type: String, default: '' },
  type: { type: String, default: 'text' },
  required: { type: Boolean, default: false },
  // A regex (HTML pattern syntax) to tighten native validation beyond what
  // the type alone checks — e.g. type="email" accepts "a@b", a pattern can
  // require a dotted domain. Stays in the native constraint pipeline, so
  // :user-invalid styling and the browser's validation message just work.
  pattern: { type: String, default: '' },
  // Describes the expected format; shown in the browser's native validation
  // popup when a pattern fails. Pair with a hint for the always-visible,
  // AT-linked version.
  title: { type: String, default: '' },
  // Defaults to a single space so :placeholder-shown can act as an
  // "is empty" detector in CSS (see the .field-input styles). Pass a real
  // placeholder to override — the empty-detection still works.
  placeholder: { type: String, default: ' ' },
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

  .field-required {
    margin-inline-start: var(--space-1);
    color: var(--color-error);
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

    /* Native validity from constraints (required, type="email", …).
       :user-* (not :valid/:invalid) only match AFTER the user has
       interacted, so pristine fields never flag. The thicker border on
       the invalid state is a non-color cue, so it survives forced-colors.

       Success only shows when the field has content: an empty optional
       field is technically valid, but a green "all good" border there is
       just noise. :placeholder-shown detects emptiness (hence the " "
       default placeholder); :where() keeps the selector's specificity flat
       so the explicit-error rule below still wins purely on source order. */
    &:user-valid:not(:where(:placeholder-shown)) {
      border-color: var(--color-success);
    }

    &:user-invalid {
      border-color: var(--color-error);
      border-width: 2px;
    }

    /* An explicit error (e.g. server-side) is authoritative — declared
       last so it wins over the native pseudo-classes above. */
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
