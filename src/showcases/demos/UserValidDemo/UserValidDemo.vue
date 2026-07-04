<template>
  <div class="user-valid-demo">
    <p class="user-valid-caption">
      Both fields require an email address and use identical native validation.
      The difference is manners: <code>:invalid</code> scolds the left field
      before you've typed a thing, while <code>:user-invalid</code> /
      <code>:user-valid</code> stay quiet until you've actually been in the
      right field and left it — then judge what you typed.
    </p>

    <div class="user-valid-grid">
      <div class="user-valid-field">
        <label class="user-valid-label" :for="eagerId"><code>:invalid</code> — eager</label>
        <input
          :id="eagerId"
          class="user-valid-input user-valid-input-eager"
          type="email"
          required
          placeholder="you@example.com"
        />
        <p class="user-valid-hint">Flagged from first paint — you haven't done anything yet.</p>
      </div>

      <div class="user-valid-field">
        <label class="user-valid-label" :for="patientId"><code>:user-invalid</code> — patient</label>
        <input
          :id="patientId"
          class="user-valid-input user-valid-input-patient"
          type="email"
          required
          placeholder="you@example.com"
        />
        <p class="user-valid-hint">Neutral until you visit and leave; then valid turns green, invalid red.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useId } from 'vue'

const eagerId = useId()
const patientId = useId()
</script>

<style scoped lang="scss">
@layer components {
  .user-valid-demo {
    display: grid;
    gap: var(--space-4);
  }

  .user-valid-caption {
    font-size: var(--text-sm);
    color: var(--color-text-subtle);
  }

  .user-valid-grid {
    display: grid;
    gap: var(--space-4);
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 16rem), 1fr));
  }

  .user-valid-field {
    display: grid;
    gap: var(--space-2);
    align-content: start;
  }

  .user-valid-label {
    font-size: var(--text-sm);
    font-weight: 600;
  }

  .user-valid-input {
    padding: var(--space-2) var(--space-3);
    border: 2px solid var(--color-border);
    border-radius: var(--radius-md);
    background-color: var(--color-bg);
    color: var(--color-text);
    font: inherit;
  }

  .user-valid-input-eager:invalid {
    border-color: var(--color-error);
  }

  .user-valid-input-patient:user-invalid {
    border-color: var(--color-error);
  }

  .user-valid-input-patient:user-valid {
    border-color: var(--color-success);
  }

  .user-valid-hint {
    font-size: var(--text-sm);
    color: var(--color-text-subtle);
  }
}
</style>
