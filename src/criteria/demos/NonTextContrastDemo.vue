<template>
  <div class="ntc-demo" :class="{ 'is-broken': broken }">
    <p class="ntc-caption">
      These controls are outlined only by their borders. Below 3:1 those
      boundaries melt into the background — the inputs are still there, but
      can you see where they are?
    </p>

    <div class="ntc-fields">
      <input
        class="ntc-input"
        type="text"
        placeholder="Search"
        aria-label="Search"
      />
      <button class="ntc-btn" type="button">Filter</button>
      <ul class="ntc-chips" aria-label="Quick filters">
        <li v-for="chip in chips" :key="chip" class="ntc-chip">{{ chip }}</li>
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
  .ntc-demo {
    /* The single border color the controls share. Compliant value sits at
       ~3.5:1 against the surface in both themes; the broken override drops
       it to ~1.2:1. Hardcoded here because the contrast ratio IS the
       subject of the demo — not part of the design-token system. */
    --demo-border: light-dark(#8a8a8a, #8f8f8f);

    display: grid;
    gap: var(--space-3);
  }

  .ntc-caption {
    font-size: var(--text-sm);
    color: var(--color-text-subtle);
  }

  .ntc-fields {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--space-3);
  }

  .ntc-input {
    min-block-size: 44px;
    padding: var(--space-2) var(--space-3);
    border: 1px solid var(--demo-border);
    border-radius: var(--radius-md);
    background-color: var(--color-surface);
    color: var(--color-text);

    @include forced-colors {
      /* Forced-colors is the OS-level safety net: it overrides author
         colors entirely, so these controls stay visible no matter what. */
      border-color: ButtonText;
    }
  }

  .ntc-btn {
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

  .ntc-chips {
    display: flex;
    gap: var(--space-2);
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .ntc-chip {
    padding: var(--space-1) var(--space-3);
    border: 1px solid var(--demo-border);
    border-radius: var(--radius-full);
    color: var(--color-text);
    font-size: var(--text-sm);

    @include forced-colors {
      border-color: ButtonText;
    }
  }

  /* The regression: wash the shared border color down to ~1.2:1 against
     the surface. Nothing else changes — the controls keep their size,
     labels, and behaviour; only the contrast of their boundary fails. */
  .is-broken {
    --demo-border: light-dark(#ededed, #292929);
  }
}
</style>
