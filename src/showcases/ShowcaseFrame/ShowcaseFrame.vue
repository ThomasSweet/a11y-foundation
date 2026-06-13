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

<script setup lang="ts">
import { computed, useId } from 'vue'

interface ShowcaseLink {
  label: string
  href: string
}

const props = withDefaults(
  defineProps<{
    title: string
    summary: string
    /**
     * 'stable'   — interoperable across current browsers (Baseline / past
     *              Interop rounds). Safe to rely on.
     * 'emerging' — current Interop focus area or partial support. Always
     *              ship behind @supports with a usable fallback.
     */
    status?: 'stable' | 'emerging'
    /**
     * A CSS.supports() condition for the feature being demonstrated, e.g.
     * "container-type: inline-size". Tells the visitor whether they're
     * seeing the feature or its fallback.
     */
    supports?: string
    links?: ShowcaseLink[]
    /** Match the surrounding document outline (4 = under an h3 group). */
    headingLevel?: number
  }>(),
  {
    status: 'stable',
    supports: '',
    links: () => [],
    headingLevel: 4,
  },
)

const headingId = useId()
const headingTag = computed(() => `h${props.headingLevel}`)
const supported = computed(() =>
  props.supports ? CSS.supports(props.supports) : true,
)
const statusLabel = computed(() =>
  props.status === 'stable' ? 'Widely supported' : 'Emerging',
)
</script>

<style scoped lang="scss" src="./ShowcaseFrame.scss"></style>
