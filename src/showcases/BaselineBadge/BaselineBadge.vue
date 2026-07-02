<template>
  <p class="baseline-badge" :data-level="levelKey">
    <span class="baseline-badge-status">
      <svg class="baseline-badge-icon" aria-hidden="true">
        <use :href="`#bl-${levelKey}`" />
      </svg>
      <strong class="baseline-badge-level">
        <template v-if="info.baseline === 'high'">Baseline · Widely available</template>
        <template v-else-if="info.baseline === 'low'">Baseline {{ lowYear }} · Newly available</template>
        <template v-else>Limited availability</template>
      </strong>
    </span>
    <span class="baseline-badge-browsers">
      <span v-for="b in browserSupport" :key="b.key" class="baseline-badge-browser">
        <svg class="baseline-badge-logo" aria-hidden="true">
          <use :href="`#bl-${b.key}`" />
        </svg>
        <svg class="baseline-badge-mark" :data-mark="b.version ? 'yes' : 'no'" aria-hidden="true">
          <use :href="b.version ? '#bl-available' : '#bl-unavailable'" />
        </svg>
        <span class="visually-hidden">
          {{ b.label }}: {{ b.version ? `supported since version ${b.version}` : 'not supported' }}
        </span>
      </span>
    </span>
  </p>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { BaselineInfo } from '../registry'

const props = defineProps<{ info: BaselineInfo }>()

const levelKey = computed(() =>
  props.info.baseline === 'high' ? 'widely' : props.info.baseline === 'low' ? 'newly' : 'limited',
)
const lowYear = computed(() => props.info.lowDate?.slice(0, 4) ?? '')
const browserSupport = computed(() =>
  (['chrome', 'edge', 'firefox', 'safari'] as const).map((key) => ({
    key,
    label: key[0].toUpperCase() + key.slice(1),
    version: props.info.support[key],
  })),
)
</script>

<style scoped lang="scss">
@layer components {
  .baseline-badge {
    /* Official Baseline palette (from the baseline-status widget). */
    --baseline-status-color-widely: light-dark(#1e8e3e, #24a446);
    --baseline-status-color-newly: light-dark(#1a73e8, #4185ff);
    --baseline-status-color-limited: light-dark(#ea8600, #f09418);
    --baseline-icon-widely-front: #1ea446;
    --baseline-icon-widely-back: light-dark(#c4eed0, #125225);
    --baseline-icon-newly-front: light-dark(#1b6ef3, #4185ff);
    --baseline-icon-newly-back: light-dark(#a8c7fa, #2d509e);
    --baseline-icon-limited-front: #f09409;
    --baseline-icon-limited-back: light-dark(#c6c6c6, #565656);

    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-2) var(--space-4);
    padding: var(--space-2) var(--space-3);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    font-size: var(--text-sm);

    /* Level is carried by the words; the tint is reinforcement only. */
    &[data-level='widely'] {
      background-color: color-mix(in oklab, var(--baseline-status-color-widely) 8%, var(--color-surface));
    }

    &[data-level='newly'] {
      background-color: color-mix(in oklab, var(--baseline-status-color-newly) 8%, var(--color-surface));
    }

    &[data-level='limited'] {
      background-color: var(--color-bg-subtle);
    }

    @include high-contrast {
      border-color: currentcolor;
    }

    @include forced-colors {
      border-color: ButtonText;
    }
  }

  .baseline-badge-status {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
  }

  .baseline-badge-icon {
    inline-size: 36px;
    block-size: 20px;
    flex-shrink: 0;
  }

  .baseline-badge-browsers {
    display: inline-flex;
    flex-wrap: wrap;
    gap: var(--space-3);
  }

  .baseline-badge-browser {
    display: inline-flex;
    align-items: center;
    gap: 2px;
  }

  .baseline-badge-logo {
    inline-size: 18px;
    block-size: 18px;
  }

  /* Marks are currentColor in the official artwork; green check / orange
     cross exactly as the widget colours them. */
  .baseline-badge-mark {
    inline-size: 15px;
    block-size: 18px;

    &[data-mark='yes'] {
      color: var(--baseline-status-color-widely);
    }

    &[data-mark='no'] {
      color: var(--baseline-status-color-limited);
    }
  }

  @include forced-colors {
    /* Brand colours are replaced; keep the marks legible via system ink. */
    .baseline-badge-mark {
      color: currentcolor !important;
    }
  }
}
</style>
