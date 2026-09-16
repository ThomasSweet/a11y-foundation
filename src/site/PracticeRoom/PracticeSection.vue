<template>
  <section class="practice-section" :aria-labelledby="id">
    <h2 :id="id" class="practice-section-h2">{{ title }}</h2>
    <slot />
  </section>
</template>

<script setup lang="ts">
defineProps<{ id: string; title: string }>()
</script>

<style scoped lang="scss">
@layer components {
  .practice-section {
    margin-block-start: var(--space-16);
    max-inline-size: 68ch;
  }

  .practice-section-h2 {
    margin: 0 0 var(--space-4);
    font-size: var(--text-2xl);
    letter-spacing: -0.01em;
    color: var(--bp-ink);
    scroll-margin-block-start: var(--space-8);
  }

  .practice-section > :slotted(p) {
    margin-block: var(--space-4) 0;
    max-inline-size: 62ch;
    line-height: var(--leading-normal);
    color: var(--bp-ink-2);
  }
}
</style>
