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

    /* Compliant: nothing here. The foundation's global *:focus-visible ring
       (preferences layer — the thick, offset, high-contrast token ring)
       already applies and easily meets 2.4.13. */

    @include high-contrast {
      border-color: currentcolor;
    }

    @include forced-colors {
      border-color: ButtonText;
    }
  }

  /* The regression: a hairline, low-contrast, zero-offset outline. Because
     the foundation's ring lives in the preferences layer (which wins over
     components), the only way to defeat it is the classic anti-pattern —
     overriding with !important. That this takes !important IS the lesson:
     the foundation protects the ring; you have to actively fight it to fail. */
  .is-broken {
    .fa-btn:focus-visible {
      /* stylelint-disable declaration-no-important -- deliberately simulating the anti-pattern */
      outline: 1px solid var(--color-border) !important;
      outline-offset: 0 !important;
      /* stylelint-enable declaration-no-important */
    }
  }
}
</style>
