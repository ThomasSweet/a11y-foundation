<template>
  <div class="focus-appearance-demo" :class="{ 'is-broken': broken }">
    <p class="focus-appearance-caption">
      Tab onto these buttons. Compliant, the focus indicator is thick and
      high-contrast — unmistakable. Broken, it shrinks to a faint 1px line
      you have to hunt for.
    </p>

    <div class="focus-appearance-buttons" role="group" aria-label="Example actions">
      <button v-for="action in actions" :key="action" class="focus-appearance-btn" type="button">
        {{ action }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  broken: { type: Boolean, default: false },
})

const actions = ['Save', 'Duplicate', 'Archive', 'Delete']
</script>

<style scoped lang="scss">
@layer components {
  .focus-appearance-demo {
    display: grid;
    gap: var(--space-3);
  }

  .focus-appearance-caption {
    font-size: var(--text-sm);
    color: var(--color-text-subtle);
  }

  .focus-appearance-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-3);
  }

  .focus-appearance-btn {
    min-block-size: 44px;
    padding: var(--space-2) var(--space-4);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    background-color: var(--color-surface);
    color: var(--color-text);
    font-weight: 600;
    cursor: pointer;

    /* Compliant: nothing here — the foundation's global *:focus-visible ring
       (preferences layer) already applies and meets 2.4.13. */

    @include high-contrast {
      border-color: currentcolor;
    }

    @include forced-colors {
      border-color: ButtonText;
    }
  }

  /* The regression: a hairline, zero-offset outline. The foundation's ring
     lives in the preferences layer (which wins over components), so defeating
     it takes !important — that it does IS the lesson: you must fight to fail. */
  .is-broken {
    .focus-appearance-btn:focus-visible {
      /* stylelint-disable declaration-no-important -- deliberately simulating the anti-pattern */
      outline: 1px solid var(--color-border) !important;
      outline-offset: 0 !important;
      /* stylelint-enable declaration-no-important */
    }
  }
}
</style>
