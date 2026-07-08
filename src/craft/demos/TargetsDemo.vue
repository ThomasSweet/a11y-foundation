<template>
  <div class="targets-demo">
    <section class="targets-panel" :class="{ 'is-touch': touch }">
      <label class="targets-toggle">
        <input v-model="touch" type="checkbox" />
        <span>Simulate: coarse pointer (touch)</span>
      </label>
      <article class="targets-card">
        <p class="targets-card-title">Weeknight pasta</p>
        <p class="targets-card-meta">Dana Reeves · 12 min</p>
        <div class="targets-actions" role="group" aria-label="Post actions">
          <button
            v-for="a in actions"
            :key="a.label"
            class="targets-action"
            type="button"
            :aria-label="a.label"
          >
            <svg class="targets-action-icon" viewBox="0 0 24 24" aria-hidden="true">
              <path :d="a.d" />
            </svg>
          </button>
        </div>
      </article>
      <p class="targets-readout" role="status">
        Hit area: <strong>{{ touch ? '44' : '24' }}px</strong> —
        {{ touch
          ? 'coarse pointers get the roomier target via touch-primary(); the icons stay put, the tap area grows around them.'
          : 'the AA floor (2.5.8) for a fine pointer. Simulate touch to see the tap targets grow.' }}
      </p>
    </section>

    <section class="targets-panel" :class="{ 'is-forced': forced }">
      <label class="targets-toggle">
        <input v-model="forced" type="checkbox" />
        <span>Preview: forced-colors mode</span>
      </label>
      <div class="targets-forced-row">
        <button class="targets-fc targets-fc-fill" type="button">Colour only</button>
        <button class="targets-fc targets-fc-border" type="button">Bordered</button>
      </div>
      <p class="targets-readout" role="status">
        {{ forced
          ? 'Backgrounds are replaced: the colour-only button lost its edges; the bordered one survives.'
          : 'Both look fine now. Preview forced colours to see which one disappears.' }}
      </p>
      <p class="targets-fine-print">
        A simulated preview — real forced-colors mode does this to every element
        on the page, not just these two.
      </p>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// Simulate the pointer type and forced-colors mode so the payoffs are visible
// in-page; the real (pointer: coarse) and forced-colors media queries drive
// the shipped behaviour.
const touch = ref(false)
const forced = ref(false)

const actions = [
  { label: 'Like', d: 'M12 21 4.3 13.3a4.6 4.6 0 0 1 6.5-6.5l1.2 1.2 1.2-1.2a4.6 4.6 0 0 1 6.5 6.5Z' },
  { label: 'Comment', d: 'M21 15a2 2 0 0 1-2 2H8l-4 4V5a2 2 0 0 1 2-2h13a2 2 0 0 1 2 2Z' },
  { label: 'Share', d: 'M4 12v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7 M16 6l-4-4-4 4 M12 2v13' },
  { label: 'Save', d: 'M19 21l-7-5-7 5V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1Z' },
]
</script>

<style scoped lang="scss">
@layer components {
  .targets-demo {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 15rem), 1fr));
    gap: var(--space-4);
  }

  .targets-panel {
    display: grid;
    gap: var(--space-3);
    align-content: start;
    padding: var(--space-4);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    background-color: var(--color-bg-subtle);

    @include high-contrast {
      border-color: currentcolor;
    }
  }

  .targets-toggle {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    justify-self: start;
    font-size: var(--text-sm);
    font-weight: 600;
    cursor: pointer;
  }

  .targets-card {
    display: grid;
    gap: 2px;
    padding: var(--space-3);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    background-color: var(--color-surface);

    @include high-contrast {
      border-color: currentcolor;
    }
  }

  .targets-card-title {
    font-weight: 600;
  }

  .targets-card-meta {
    font-size: var(--text-sm);
    color: var(--color-text-subtle);
  }

  .targets-actions {
    display: flex;
    margin-block-start: var(--space-2);
  }

  .targets-action {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    /* 24px is the 2.5.8 AA floor for a fine pointer; touch bumps the tap area
       to 44px, mirroring the touch-primary() mixin. The icon never resizes —
       only the hittable padding around it grows. */
    min-inline-size: 24px;
    min-block-size: 24px;
    border: none;
    border-radius: var(--radius-full);
    background: none;
    color: var(--color-text-subtle);
    cursor: pointer;
    transition:
      min-inline-size var(--duration-normal) var(--easing-standard),
      min-block-size var(--duration-normal) var(--easing-standard);

    @include can-hover {
      &:hover {
        color: var(--color-primary);
      }
    }
  }

  .targets-action-icon {
    inline-size: 1.25rem;
    block-size: 1.25rem;
    fill: none;
    stroke: currentcolor;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  .is-touch {
    .targets-action {
      min-inline-size: 44px;
      min-block-size: 44px;
    }
  }

  .targets-forced-row {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-2);
  }

  .targets-fc {
    min-block-size: 44px;
    padding: var(--space-2) var(--space-4);
    border-radius: var(--radius-md);
    color: var(--color-primary-text);
    font-weight: 600;
    cursor: pointer;
  }

  /* Relies on background colour alone — no border. */
  .targets-fc-fill {
    border: none;
    background-color: var(--color-primary);
  }

  /* Same fill, but a border does the load-bearing work. */
  .targets-fc-border {
    border: 2px solid var(--color-primary-hover);
    background-color: var(--color-primary);
  }

  /* Simulated forced colors: strip the custom fills to a neutral surface, as
     the real mode does. The colour-only button now blends into the panel;
     the bordered one keeps a visible outline. */
  .is-forced {
    /* Match the panel exactly, as the real mode collapses everything to one
       surface: the colour-only button dissolves into it, edges and all. */
    .targets-fc {
      background-color: var(--color-bg-subtle);
      color: var(--color-text);
    }

    .targets-fc-border {
      border-color: var(--color-text);
    }
  }

  .targets-readout {
    min-block-size: 3lh;
    font-size: var(--text-sm);
    color: var(--color-text-subtle);
  }

  .targets-fine-print {
    font-size: var(--text-sm);
    color: var(--color-text-subtle);
    opacity: 0.8;
  }
}
</style>
