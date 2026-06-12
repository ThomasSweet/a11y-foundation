<template>
  <article class="showcase" :aria-labelledby="headingId">
    <header class="showcase-header">
      <component :is="headingTag" :id="headingId" class="showcase-title">
        {{ title }}
      </component>
      <span class="badge" :class="`badge--${status}`">
        {{ statusLabel }}
      </span>
    </header>

    <p class="showcase-summary">{{ summary }}</p>

    <p v-if="!supported" class="showcase-unsupported" role="note">
      Your browser doesn't support this yet — the demo below shows the
      fallback behavior instead. That's the point: everything here is
      written as a progressive enhancement.
    </p>

    <div class="showcase-demo">
      <slot />
    </div>

    <ul v-if="links.length" class="showcase-links">
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
import { computed, useId } from 'vue'

const props = defineProps({
  title: { type: String, required: true },
  summary: { type: String, required: true },
  /**
   * 'stable'   — interoperable across current browsers (Baseline / past
   *              Interop rounds). Safe to rely on.
   * 'emerging' — current Interop focus area or partial support. Always
   *              ship behind @supports with a usable fallback.
   */
  status: {
    type: String,
    default: 'stable',
    validator: (value) => ['stable', 'emerging'].includes(value),
  },
  /**
   * A CSS.supports() condition for the feature being demonstrated, e.g.
   * "container-type: inline-size" or "selector(:has(a))". Used to tell
   * the visitor whether they're seeing the feature or its fallback.
   */
  supports: { type: String, default: '' },
  links: { type: Array, default: () => [] },
  /** Match the surrounding document outline (4 = under an h3 group). */
  headingLevel: { type: Number, default: 4 },
})

const headingId = useId()

const headingTag = computed(() => `h${props.headingLevel}`)

const supported = computed(() =>
  props.supports ? CSS.supports(props.supports) : true,
)

const statusLabel = computed(() =>
  props.status === 'stable' ? 'Widely supported' : 'Emerging',
)
</script>

<style scoped lang="scss">
@layer components {
  .showcase {
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

  .showcase-header {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--space-2) var(--space-3);
  }

  .showcase-title {
    font-size: var(--text-xl);
  }

  .badge {
    padding: var(--space-1) var(--space-2);
    border: 1px solid transparent;
    border-radius: var(--radius-full);
    font-size: var(--text-sm);
    font-weight: 600;

    /* Status is also conveyed by the label text, never by color alone. */
    &--stable {
      background-color: var(--color-bg-subtle);
      color: var(--color-text);
    }

    &--emerging {
      background-color: transparent;
      border-color: var(--color-warning);
      color: var(--color-text);
    }

    @include high-contrast {
      border-color: currentcolor;
    }

    @include forced-colors {
      border-color: ButtonText;
    }
  }

  .showcase-summary {
    color: var(--color-text-subtle);
  }

  .showcase-unsupported {
    padding: var(--space-2) var(--space-3);
    border-inline-start: 3px solid var(--color-info);
    background-color: var(--color-bg-subtle);
    font-size: var(--text-sm);
  }

  .showcase-demo {
    padding: var(--space-4);
    border: 1px dashed var(--color-border);
    border-radius: var(--radius-md);
  }

  .showcase-links {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-4);
    list-style: none;
    padding: 0;
    font-size: var(--text-sm);
  }
}
</style>
