<template>
  <div class="theme-demo">
    <p class="theme-demo-caption">
      One engine, four themes. Each card sets just two seed colors; the full
      accessible palette — surfaces, borders, text, the focus ring — is
      derived with <code>color-mix()</code>, relative color syntax, and
      <code>contrast-color()</code>. Identical components, re-themed with zero
      component changes.
    </p>

    <div class="theme-grid">
      <article
        v-for="theme in themes"
        :key="theme.name"
        class="surface"
        :class="theme.class"
      >
        <p class="surface-title">{{ theme.name }}</p>
        <p class="surface-text">Two seeds in, a contrast-safe palette out.</p>
        <div class="surface-actions">
          <AppButton variant="primary">Primary</AppButton>
          <AppButton variant="secondary">Secondary</AppButton>
        </div>
      </article>
    </div>
  </div>
</template>

<script setup>
import AppButton from '../../components/AppButton/AppButton.vue'

const themes = [
  { name: 'Default', class: '' },
  { name: 'Ocean', class: 'theme-ocean' },
  { name: 'Midnight', class: 'theme-midnight' },
  { name: 'Sunset', class: 'theme-sunset' },
]
</script>

<style scoped lang="scss">
@layer components {
  .theme-demo {
    display: grid;
    gap: var(--space-4);
  }

  .theme-demo-caption {
    font-size: var(--text-sm);
    color: var(--color-text-subtle);
  }

  /* Intrinsic reflow — one column when tight, more when there's room. */
  .theme-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 12rem), 1fr));
    gap: var(--space-4);
  }

  /* .surface presentation (bg, border, padding, derived tokens) comes from
     theming.css; here we only lay out its contents. */
  .surface {
    display: grid;
    gap: var(--space-2);
    align-content: start;
  }

  .surface-title {
    font-size: var(--text-lg);
    font-weight: 600;
  }

  .surface-text {
    font-size: var(--text-sm);
    color: var(--color-text-subtle);
  }

  .surface-actions {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-2);
    margin-block-start: var(--space-1);
  }
}
</style>
