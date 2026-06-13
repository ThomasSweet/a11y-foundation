<template>
  <div class="fa-demo" :class="{ 'is-broken': broken }">
    <p class="fa-caption">
      Tab onto these buttons. Compliant, the focus indicator is thick and
      high-contrast — unmistakable. Broken, it shrinks to a faint 1px line
      you have to hunt for.
    </p>

    <div class="fa-buttons" role="group" aria-label="Example actions">
      <button v-for="action in actions" :key="action" class="fa-btn" type="button">
        {{ action }}
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  broken: { type: Boolean, default: false },
})

const actions = ['Save', 'Duplicate', 'Archive', 'Delete']
</script>

<style scoped lang="scss">
@layer components {
  .fa-demo {
    display: grid;
    gap: var(--space-3);
  }

  .fa-caption {
    font-size: var(--text-sm);
    color: var(--color-text-subtle);
  }

  .fa-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-3);
  }

  .fa-btn {
    min-block-size: 44px;
    padding: var(--space-2) var(--space-4);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    background-color: var(--color-surface);
    color: var(--color-text);
    font-weight: 600;
    cursor: pointer;

    /* The fix: a thick, offset, high-contrast ring — the project's focus
       tokens. Easily meets 2.4.13's size and contrast expectations. */
    &:focus-visible {
      outline: var(--focus-ring-width) solid var(--focus-ring-color);
      outline-offset: var(--focus-ring-offset);
    }

    @include high-contrast {
      border-color: currentcolor;
    }

    @include forced-colors {
      border-color: ButtonText;
    }
  }

  /* The regression: a hairline, low-contrast, zero-offset outline that
     barely reads against the button. Focus still moves; it's just hard to
     locate — the failure 2.4.13 (and, at worst, 2.4.7) is meant to prevent. */
  .is-broken {
    .fa-btn:focus-visible {
      outline: 1px solid var(--color-border);
      outline-offset: 0;
    }
  }
}
</style>
