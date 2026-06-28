<template>
  <div class="non-text-contrast-demo" :class="{ 'is-broken': broken }">
    <p class="non-text-contrast-caption">
      These controls are outlined only by their borders. Below 3:1 those
      boundaries melt into the background — the inputs are still there, but
      can you see where they are?
    </p>

    <div class="non-text-contrast-fields">
      <input
        class="non-text-contrast-input"
        type="text"
        placeholder="Search"
        aria-label="Search"
      />
      <button class="non-text-contrast-btn" type="button">Filter</button>
      <ul class="non-text-contrast-chips" aria-label="Quick filters">
        <li v-for="chip in chips" :key="chip" class="non-text-contrast-chip">{{ chip }}</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
defineProps({
  broken: { type: Boolean, default: false },
})

const chips = ['Unread', 'Starred']
</script>

<style scoped lang="scss">
@layer components {
  .non-text-contrast-demo {
    /* Shared control border. Compliant ~3.5:1 vs the surface in both themes;
       broken drops it to ~1.2:1. Hardcoded because the ratio IS the demo's
       subject, not a design token. */
    --demo-border: light-dark(#8a8a8a, #8f8f8f);

    display: grid;
    gap: var(--space-3);
  }

  .non-text-contrast-caption {
    font-size: var(--text-sm);
    color: var(--color-text-subtle);
  }

  .non-text-contrast-fields {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--space-3);
  }

  .non-text-contrast-input {
    min-block-size: 44px;
    padding: var(--space-2) var(--space-3);
    border: 1px solid var(--demo-border);
    border-radius: var(--radius-md);
    background-color: var(--color-surface);
    color: var(--color-text);

    @include forced-colors {
      /* Forced-colors safety net: overrides author colours, so controls stay visible. */
      border-color: ButtonText;
    }
  }

  .non-text-contrast-btn {
    min-block-size: 44px;
    padding: var(--space-2) var(--space-4);
    border: 1px solid var(--demo-border);
    border-radius: var(--radius-md);
    background-color: transparent;
    color: var(--color-text);
    font-weight: 600;
    cursor: pointer;

    @include forced-colors {
      border-color: ButtonText;
    }
  }

  .non-text-contrast-chips {
    display: flex;
    gap: var(--space-2);
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .non-text-contrast-chip {
    padding: var(--space-1) var(--space-3);
    border: 1px solid var(--demo-border);
    border-radius: var(--radius-full);
    color: var(--color-text);
    font-size: var(--text-sm);

    @include forced-colors {
      border-color: ButtonText;
    }
  }

  /* The regression: wash the shared border down to ~1.2:1. Nothing else
     changes — only the boundary's contrast fails. */
  .is-broken {
    --demo-border: light-dark(#ededed, #292929);
  }
}
</style>
