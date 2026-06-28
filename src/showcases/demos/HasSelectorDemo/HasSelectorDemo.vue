<template>
  <div class="selector">
    <p class="selector-caption">
      Tick a row: <code>.row:has(:checked)</code> styles the row from its
      checkbox's <em>checked</em> state — something no upward selector can do,
      and unlike <code>:focus-within</code> the highlight <em>persists</em>
      after focus leaves. Focus itself is handled by <code>:focus-within</code>
      — the lighter, right tool for that job. Two states, two selectors.
    </p>

    <ul class="selector-list">
      <li v-for="task in tasks" :key="task" class="selector-row">
        <label class="selector-label">
          <input v-model="selected" type="checkbox" :value="task" />
          <span>{{ task }}</span>
        </label>
      </li>
    </ul>

    <p class="selector-count" role="status">{{ selected.length }} selected</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const tasks = [
  'Review pull request',
  'Update the changelog',
  'Deploy to staging',
  'Notify the team',
]
const selected = ref<string[]>([])
</script>

<style scoped lang="scss">
@layer components {
  .selector {
    display: grid;
    gap: var(--space-4);
  }

  .selector-caption {
    font-size: var(--text-sm);
    color: var(--color-text-subtle);
  }

  .selector-list {
    display: grid;
    gap: var(--space-2);
    max-inline-size: 30rem;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .selector-row {
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    transition:
      border-color var(--duration-fast) var(--easing-standard),
      background-color var(--duration-fast) var(--easing-standard);

    /* Transient: a soft backdrop while focused — the job :focus-within is for.
       The checkbox keeps its own native focus ring. */
    &:focus-within {
      background-color: var(--color-bg-subtle);
    }

    /* Persistent: selected via :has(:checked) — what :focus-within can't do. */
    &:has(:checked) {
      border-color: var(--color-primary);
      background-color: var(--color-bg-subtle);
    }

    @include high-contrast {
      border-color: currentcolor;
    }
  }

  .selector-label {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    padding: var(--space-3);
    cursor: pointer;
  }

  .selector-count {
    font-size: var(--text-sm);
    font-weight: 600;
    color: var(--color-text-subtle);
  }
}
</style>
