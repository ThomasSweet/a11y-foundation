<template>
  <article class="criterion" :aria-labelledby="headingId">
    <header class="criterion-header">
      <component :is="headingTag" :id="headingId" class="criterion-title">
        <span class="criterion-id">{{ id }}</span> {{ name }}
      </component>
      <!-- Metadata as text chips — never color-only; the words carry it. -->
      <ul class="criterion-tags" aria-label="Criterion metadata">
        <li class="tag tag--principle">{{ principle }}</li>
        <li class="tag">Level {{ level }}</li>
        <li class="tag">{{ version }}</li>
      </ul>
    </header>

    <p class="criterion-requirement">{{ requirement }}</p>

    <!-- The demo is compliant by default. `broken` is handed to the demo
         via the slot prop so it can regress its OWN styles; the wrapper
         class is just for the frame's danger outline. -->
    <div class="criterion-demo" :class="{ 'is-broken': broken }">
      <slot :broken="broken" />
    </div>

    <div class="criterion-control">
      <label class="break-toggle">
        <input v-model="broken" type="checkbox" />
        <span>{{ broken ? restoreLabel : breakLabel }}</span>
      </label>
      <!-- role="status" announces the pass/fail change to screen readers,
           so the state of the demo is itself perceivable. -->
      <p class="criterion-status" :class="{ 'is-failing': broken }" role="status">
        {{ broken ? failText : passText }}
      </p>
    </div>

    <ul v-if="links.length" class="criterion-links">
      <li v-for="link in links" :key="link.href">
        <a :href="link.href" target="_blank" rel="noreferrer">
          {{ link.label }}
          <span class="visually-hidden">(opens in a new tab)</span>
        </a>
      </li>
    </ul>
  </article>
</template>

<script setup>
import { computed, ref, useId } from 'vue'

const props = defineProps({
  id: { type: String, required: true }, // e.g. "2.5.8"
  name: { type: String, required: true },
  level: { type: String, required: true }, // "A" | "AA" | "AAA"
  version: { type: String, required: true }, // e.g. "WCAG 2.2"
  principle: { type: String, required: true }, // Perceivable | Operable | …
  requirement: { type: String, required: true },
  // What the toggle does, and what it says once broken.
  breakLabel: { type: String, default: 'Break this rule' },
  restoreLabel: { type: String, default: 'Restore compliance' },
  // Each criterion explains its own pass / fail state — the failure text
  // is the teaching moment, so it's required content, not boilerplate.
  passText: { type: String, required: true },
  failText: { type: String, required: true },
  links: { type: Array, default: () => [] },
  headingLevel: { type: Number, default: 3 },
})

const broken = ref(false)
const headingId = useId()
const headingTag = computed(() => `h${props.headingLevel}`)
</script>

<style scoped lang="scss">
@layer components {
  .criterion {
    display: grid;
    gap: var(--space-3);
    padding: var(--space-4);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    background-color: var(--color-surface);

    @include high-contrast {
      border-color: currentcolor;
    }
  }

  .criterion-header {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    gap: var(--space-2) var(--space-3);
  }

  .criterion-title {
    font-size: var(--text-xl);
  }

  .criterion-id {
    font-family: var(--font-mono);
    color: var(--color-text-subtle);
  }

  .criterion-tags {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-2);
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .tag {
    padding: var(--space-1) var(--space-2);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-full);
    font-size: var(--text-sm);

    &--principle {
      font-weight: 600;
    }

    @include high-contrast {
      border-color: currentcolor;
    }

    @include forced-colors {
      border-color: ButtonText;
    }
  }

  .criterion-requirement {
    color: var(--color-text-subtle);
  }

  .criterion-demo {
    padding: var(--space-4);
    border: 1px dashed var(--color-border);
    border-radius: var(--radius-md);

    /* Redundant-with-text danger cue when the rule is off. */
    &.is-broken {
      border-style: dashed;
      border-color: var(--color-error);
    }
  }

  .criterion-control {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--space-3);
  }

  .break-toggle {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    padding: var(--space-2) var(--space-3);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    font-weight: 600;
    cursor: pointer;

    @include can-hover {
      &:hover {
        background-color: var(--color-bg-subtle);
      }
    }

    @include high-contrast {
      border-color: currentcolor;
    }
  }

  .criterion-status {
    flex: 1;
    min-inline-size: 18ch;
    font-size: var(--text-sm);
    color: var(--color-text-subtle);

    &.is-failing {
      color: var(--color-text);
    }
  }

  .criterion-links {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-4);
    margin: 0;
    padding: 0;
    list-style: none;
    font-size: var(--text-sm);
  }
}
</style>
