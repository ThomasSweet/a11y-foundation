<template>
  <div class="input-purpose-demo" :class="{ 'is-broken': broken }">
    <p class="input-purpose-caption">
      If your browser has your details saved, click into each field and watch
      what it offers. The two states look identical — only one of them tells
      the browser what it's asking for.
    </p>

    <div class="input-purpose-twin input-purpose-tokened">
      <label class="input-purpose-field">
        Full name
        <input type="text" autocomplete="name" />
      </label>
      <label class="input-purpose-field">
        Email
        <input type="email" autocomplete="email" />
      </label>
      <label class="input-purpose-field">
        Street address
        <input type="text" autocomplete="street-address" />
      </label>
      <p class="input-purpose-markup"><code>&lt;input type="email" autocomplete="email"&gt;</code></p>
    </div>

    <div class="input-purpose-twin input-purpose-anonymous">
      <label class="input-purpose-field">
        Full name
        <input type="text" />
      </label>
      <label class="input-purpose-field">
        Email
        <input type="email" />
      </label>
      <label class="input-purpose-field">
        Street address
        <input type="text" />
      </label>
      <p class="input-purpose-markup"><code>&lt;input type="email"&gt;</code></p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  broken: { type: Boolean, default: false },
})
</script>

<style scoped lang="scss">
@layer components {
  .input-purpose-demo {
    display: grid;
    gap: var(--space-3);
  }

  .input-purpose-caption {
    font-size: var(--text-sm);
    color: var(--color-text-subtle);
  }

  .input-purpose-twin {
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

  .input-purpose-field {
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

  .input-purpose-markup {
    font-size: var(--text-sm);
    color: var(--color-text-subtle);
  }

  .input-purpose-anonymous {
    display: none;
  }

  .is-broken .input-purpose-tokened {
    display: none;
  }

  .is-broken .input-purpose-anonymous {
    display: grid;
  }
}
</style>
