<template>
  <fieldset class="has-demo">
    <legend>Notification channel</legend>
    <label v-for="option in options" :key="option" class="choice">
      <input v-model="picked" type="radio" :name="groupName" :value="option" />
      <span>{{ option }}</span>
    </label>
  </fieldset>
</template>

<script setup>
import { ref, useId } from 'vue'

const groupName = useId()
const options = ['Email', 'SMS', 'None']
const picked = ref('Email')
</script>

<style scoped lang="scss">
@layer components {
  .has-demo {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-3);
    border: 0;
    padding: 0;

    legend {
      margin-block-end: var(--space-2);
      font-weight: 600;
    }
  }

  /* The card highlights when the radio INSIDE it is checked or focused —
     parent styling from child state, no JS, and the native radio keeps
     all of its semantics and keyboard behavior. */
  .choice {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    padding: var(--space-2) var(--space-4);
    border: 2px solid var(--color-border);
    border-radius: var(--radius-md);
    cursor: pointer;

    &:has(:checked) {
      border-color: var(--color-primary);
      background-color: var(--color-bg-subtle);
    }

    &:has(:focus-visible) {
      outline: var(--focus-ring-width) solid var(--focus-ring-color);
      outline-offset: var(--focus-ring-offset);
    }

    @include high-contrast {
      border-color: currentcolor;
    }
  }
}
</style>
