<template>
  <a
    class="glossary-ref"
    :href="`/glossary.html#${id}`"
    :interestfor="cardId"
    :style="{ 'anchor-name': anchorName }"
  ><slot /></a><span
    :id="cardId"
    popover="hint"
    class="glossary-ref-card"
    :style="{ 'position-anchor': anchorName }"
  ><strong class="glossary-ref-card-term">{{ entry.term }}</strong>{{ entry.def }}</span>
</template>

<script setup lang="ts">
import { computed, useId } from 'vue'
import { glossaryTerms } from './terms'

const props = defineProps<{ id: string }>()

const uid = useId().replace(/[^a-zA-Z0-9-]/g, '-')
const cardId = `glossary-ref-${uid}`
const anchorName = `--glossary-ref-${uid}`
const entry = computed(() => glossaryTerms.find((t) => t.id === props.id)!)
</script>

<style scoped lang="scss">
@layer components {
  .glossary-ref {
    color: inherit;
    text-decoration: underline dotted var(--color-primary) 1px;
    text-underline-offset: 0.2em;

    &:hover {
      text-decoration-style: solid;
    }
  }

  .glossary-ref-card {
    position-area: block-end;
    position-try-fallbacks: flip-block;
    margin: var(--space-2);
    max-inline-size: 20rem;
    padding: var(--space-2) var(--space-3);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    background-color: var(--color-surface);
    box-shadow: var(--shadow-lg);
    color: var(--color-text-subtle);
    font-size: var(--text-sm);
    text-align: start;

    @include high-contrast {
      border-color: currentcolor;
    }
  }

  .glossary-ref-card-term {
    display: block;
    margin-block-end: var(--space-1);
    color: var(--color-text);
  }
}
</style>
