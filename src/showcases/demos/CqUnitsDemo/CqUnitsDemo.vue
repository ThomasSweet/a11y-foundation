<template>
  <div class="cq-units">
    <label class="cq-units-control">
      Container width
      <input v-model="width" type="range" min="30" max="100" step="1" />
      <span aria-hidden="true">{{ width }}%</span>
    </label>

    <div class="cq-units-stage" :style="{ inlineSize: `${width}%` }">
      <article class="cq-units-card">
        <p class="cq-units-label">Uptime this quarter</p>
        <p class="cq-units-stat">99.98%</p>
        <p class="cq-units-note">
          Every size in here is <code>clamp(rem, cqi, rem)</code> — type,
          spacing, the swatch. Drag the slider: nothing snaps, it scales.
        </p>
      </article>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const width = ref(100)
</script>

<style scoped lang="scss">
@layer components {
  .cq-units {
    display: grid;
    gap: var(--space-4);
  }

  .cq-units-control {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--space-3);
    font-size: var(--text-sm);

    input {
      flex: 1;
      min-inline-size: 8rem;
    }
  }

  .cq-units-stage {
    container-type: inline-size;
    min-inline-size: min(100%, 12rem);
  }

  /* No thresholds anywhere: every value scales in proportion to the
     container, clamped in rem so user font-size settings stay respected. */
  .cq-units-card {
    display: grid;
    gap: clamp(0.25rem, 2cqi, 0.75rem);
    padding: clamp(0.75rem, 6cqi, 2.5rem);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    background-color: var(--color-bg-subtle);

    @include high-contrast {
      border-color: currentcolor;
    }
  }

  .cq-units-label {
    font-size: clamp(0.75rem, 3.5cqi, 1rem);
    font-weight: 600;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: var(--color-text-subtle);
  }

  .cq-units-stat {
    font-size: clamp(1.75rem, 14cqi, 4.5rem);
    font-weight: 800;
    line-height: 1;
    letter-spacing: -0.02em;
    color: var(--color-primary);
  }

  .cq-units-note {
    max-inline-size: 40ch;
    font-size: clamp(0.8rem, 3cqi, 0.95rem);
    color: var(--color-text-subtle);
  }
}
</style>
