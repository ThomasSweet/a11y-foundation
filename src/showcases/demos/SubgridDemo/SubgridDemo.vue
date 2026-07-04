<template>
  <div class="subgrid-grid">
    <article v-for="card in cards" :key="card.title" class="subgrid-card">
      <h5 class="subgrid-title">{{ card.title }}</h5>
      <p class="subgrid-text">{{ card.text }}</p>
      <p class="subgrid-meta">{{ card.meta }}</p>
    </article>
  </div>
</template>

<script setup lang="ts">
// Deliberately uneven lengths — that's what makes the row alignment visible.
const cards = [
  {
    title: 'Short',
    text: 'One line of text.',
    meta: 'Aligned footer',
  },
  {
    title: 'A noticeably longer card title that wraps',
    text: 'Medium amount of body text across a couple of lines.',
    meta: 'Aligned footer',
  },
  {
    title: 'Mid title',
    text: 'The longest body text of the three cards, so without subgrid this footer would sit lower than its neighbors.',
    meta: 'Aligned footer',
  },
]
</script>

<style scoped lang="scss">
@layer components {
  .subgrid-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 10rem), 1fr));
    gap: var(--space-3);
  }

  .subgrid-card {
    display: grid;
    /* Each card spans and adopts three parent rows, so title/text/meta line up
       across cards regardless of content length. (Subgrid hit Baseline Mar 2026
       — no @supports fallback needed.) */
    grid-row: span 3;
    grid-template-rows: subgrid;
    gap: var(--space-2);
    padding: var(--space-3);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    background-color: var(--color-bg-subtle);

    @include high-contrast {
      border-color: currentcolor;
    }
  }

  .subgrid-title {
    font-size: var(--text-base);
  }

  .subgrid-text {
    font-size: var(--text-sm);
    color: var(--color-text-subtle);
  }

  .subgrid-meta {
    align-self: end;
    font-size: var(--text-sm);
    font-weight: 600;
  }
}
</style>
