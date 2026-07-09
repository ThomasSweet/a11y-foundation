<template>
  <div class="code-compare">
    <div
      class="code-compare-item code-compare-item--mistake"
      role="group"
      :aria-labelledby="mistakeId"
    >
      <p :id="mistakeId" class="code-compare-label">
        <svg
          class="code-compare-icon"
          viewBox="0 0 24 24"
          aria-hidden="true"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
        <span>{{ mistakeLabel }}</span>
      </p>
      <CodeBlock :label="language" :code="mistake" :copyable="false" />
    </div>

    <div
      class="code-compare-item code-compare-item--craft"
      role="group"
      :aria-labelledby="craftId"
    >
      <p :id="craftId" class="code-compare-label">
        <svg
          class="code-compare-icon"
          viewBox="0 0 24 24"
          aria-hidden="true"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
        <span>{{ craftLabel }}</span>
      </p>
      <CodeBlock :label="language" :code="craft" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useId } from 'vue'
import CodeBlock from '../../showcases/CodeBlock/CodeBlock.vue'

withDefaults(
  defineProps<{
    /** Language label handed to CodeBlock: 'CSS' | 'HTML' | 'JS'. */
    language: string
    /** The inaccessible pattern, shown first. */
    mistake: string
    /** The accessible pattern that replaces it. */
    craft: string
    mistakeLabel?: string
    craftLabel?: string
  }>(),
  {
    mistakeLabel: 'Common mistake',
    craftLabel: 'The craft',
  },
)

// Each side is a labelled group so the two same-language "Copy" buttons and
// code panels aren't indistinguishable to a screen reader navigating them.
const mistakeId = useId()
const craftId = useId()
</script>

<style scoped lang="scss" src="./CodeCompare.scss"></style>
