<template>
  <div class="redundant-entry-demo" :class="{ 'is-broken': broken }">
    <p class="redundant-entry-caption">
      Step 1 already asked for the delivery address. Watch what step 2 does
      with that information — and what it costs you when the shortcut is gone.
    </p>

    <section class="redundant-entry-step" aria-label="Step 1: Delivery, completed">
      <p class="redundant-entry-step-title">Step 1 · Delivery — done</p>
      <dl class="redundant-entry-summary">
        <div class="redundant-entry-summary-row">
          <dt>Name</dt>
          <dd>Alex Muster</dd>
        </div>
        <div class="redundant-entry-summary-row">
          <dt>Street</dt>
          <dd>Musterstraße 12</dd>
        </div>
        <div class="redundant-entry-summary-row">
          <dt>City</dt>
          <dd>10115 Berlin</dd>
        </div>
      </dl>
    </section>

    <section class="redundant-entry-step" aria-label="Step 2: Billing">
      <p class="redundant-entry-step-title">Step 2 · Billing</p>

      <label class="redundant-entry-same">
        <input type="checkbox" checked />
        Use my delivery address
      </label>

      <div class="redundant-entry-refill">
        <label class="redundant-entry-field">
          Full name
          <input type="text" autocomplete="name" />
        </label>
        <label class="redundant-entry-field">
          Street address
          <input type="text" autocomplete="street-address" />
        </label>
        <label class="redundant-entry-field">
          City
          <input type="text" autocomplete="address-level2" />
        </label>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
defineProps({
  broken: { type: Boolean, default: false },
})
</script>

<style scoped lang="scss">
@layer components {
  .redundant-entry-demo {
    display: grid;
    gap: var(--space-3);
  }

  .redundant-entry-caption {
    font-size: var(--text-sm);
    color: var(--color-text-subtle);
  }

  .redundant-entry-step {
    display: grid;
    gap: var(--space-2);
    padding: var(--space-3) var(--space-4);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    background-color: var(--color-surface);

    @include high-contrast {
      border-color: currentcolor;
    }
  }

  .redundant-entry-step-title {
    font-size: var(--text-sm);
    font-weight: 700;
  }

  .redundant-entry-summary {
    display: grid;
    gap: var(--space-1);
    margin: 0;
    font-size: var(--text-sm);
  }

  .redundant-entry-summary-row {
    display: flex;
    gap: var(--space-2);

    dt {
      min-inline-size: 4rem;
      color: var(--color-text-subtle);
    }

    dd {
      margin: 0;
      font-weight: 600;
    }
  }

  .redundant-entry-same {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    font-size: var(--text-sm);
    font-weight: 600;
  }

  .redundant-entry-refill {
    display: grid;
    gap: var(--space-2);
  }

  .redundant-entry-field {
    display: grid;
    gap: var(--space-1);
    font-size: var(--text-sm);
    font-weight: 600;

    input {
      min-block-size: 44px;
      padding: var(--space-2) var(--space-3);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-md);
      background-color: var(--color-surface);
      color: var(--color-text);
      font-weight: 400;

      @include high-contrast {
        border-color: currentcolor;
      }
    }
  }

  /* Compliant: reusing the delivery address removes the duplicate questions —
     the information is "available to select" (3.3.7's own mechanism). */
  .redundant-entry-demo:not(.is-broken):has(.redundant-entry-same input:checked)
    .redundant-entry-refill {
    display: none;
  }

  /* The regression: only the reuse shortcut disappears; every question
     returns and must be answered from memory. */
  .is-broken .redundant-entry-same {
    display: none;
  }
}
</style>
