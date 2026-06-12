<template>
  <button type="button" class="button" :class="`button--${variant}`">
    <slot />
  </button>
</template>

<script setup>
defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary'].includes(value),
  },
})
</script>

<style scoped lang="scss">
/* All SFC styles live in the components layer so the utilities and
   preferences layers can override them — see layers.css. */
@layer components {
  .button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-2);
    min-block-size: 44px;
    padding: var(--space-2) var(--space-4);
    border: 2px solid transparent;
    border-radius: var(--radius-md);
    font-weight: 600;
    cursor: pointer;
    /* Motion tokens are zeroed under prefers-reduced-motion, so this
       transition needs no reduced-motion override. */
    transition:
      background-color var(--duration-fast) var(--easing-standard),
      border-color var(--duration-fast) var(--easing-standard);

    &--primary {
      background-color: var(--color-primary);
      color: var(--color-primary-text);
    }

    &--secondary {
      background-color: transparent;
      border-color: var(--color-border);
      color: var(--color-text);
    }

    @include can-hover {
      &--primary:hover {
        background-color: var(--color-primary-hover);
      }

      &--secondary:hover {
        background-color: var(--color-bg-subtle);
      }
    }

    @include touch-primary {
      min-block-size: 48px;
      padding-block: var(--space-3);
    }

    @include high-contrast {
      border-color: currentcolor;
    }

    @include forced-colors {
      border-color: ButtonText;
    }
  }
}
</style>
