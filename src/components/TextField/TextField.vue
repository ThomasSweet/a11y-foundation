<template>
  <div class="field">
    <label class="field-label" :for="inputId">
      {{ label }}
      <!-- aria-hidden: decorative; the input's `required` already conveys the state to AT. -->
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

<script setup lang="ts">
import { computed, useId } from 'vue'

const props = withDefaults(
  defineProps<{
    label: string
    hint?: string
    error?: string
    type?: string
    required?: boolean
    // Regex (HTML pattern) tightening native validation beyond the type; stays
    // in the constraint pipeline, so :user-invalid styling just works.
    pattern?: string
    // Shown in the browser's native validation popup when the pattern fails.
    title?: string
    // Defaults to a single space so :placeholder-shown can act as an
    // "is empty" detector in CSS (see the .field-input styles).
    placeholder?: string
  }>(),
  {
    hint: '',
    error: '',
    type: 'text',
    required: false,
    pattern: '',
    title: '',
    placeholder: ' ',
  },
)

const model = defineModel<string>({ default: '' })

const inputId = useId()
const hintId = useId()
const errorId = useId()

// Hint and error are announced by screen readers because they're linked
// via aria-describedby — placing text near an input isn't enough.
const describedBy = computed(() => {
  const ids: string[] = []
  if (props.hint) ids.push(hintId)
  if (props.error) ids.push(errorId)
  return ids.join(' ') || undefined
})
</script>

<style scoped lang="scss" src="./TextField.scss"></style>
