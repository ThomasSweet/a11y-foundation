<template>
  <div class="sg-grid">
    <article v-for="card in cards" :key="card.title" class="sg-card">
      <h5 class="sg-title">{{ card.title }}</h5>
      <p class="sg-text">{{ card.text }}</p>
      <p class="sg-meta">{{ card.meta }}</p>
    </article>
  </div>
</template>

<script setup>
// Deliberately uneven content lengths — that's what makes the row
// alignment visible. Without subgrid, each card sizes its own rows.
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
  .sg-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 10rem), 1fr));
    gap: var(--space-3);
  }

  .sg-card {
    display: grid;
    /* Each card spans three of the parent grid's rows and adopts them, so
       title/text/meta line up ACROSS cards regardless of content length.
       (Subgrid reached Baseline — widely available — in March 2026, so this
       no longer needs an @supports fallback; baseline-watch confirmed it.) */
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

  .sg-title {
    font-size: var(--text-base);
  }

  .sg-text {
    font-size: var(--text-sm);
    color: var(--color-text-subtle);
  }

  .sg-meta {
    align-self: end;
    font-size: var(--text-sm);
    font-weight: 600;
  }
}
</style>
