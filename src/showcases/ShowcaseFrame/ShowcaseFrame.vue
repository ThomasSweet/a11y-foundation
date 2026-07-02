<template>
  <article class="showcase" :aria-labelledby="headingId">
    <header class="showcase-header">
      <component :is="headingTag" :id="headingId" class="showcase-title">
        {{ title }}
      </component>
    </header>

    <p class="showcase-summary">{{ summary }}</p>

    <BaselineBadge v-if="baseline" :info="baseline" />

    <p v-if="!supported" class="showcase-unsupported" role="note">
      Your browser doesn't support this yet — the demo below shows the
      fallback behavior instead. That's the point: everything here is
      written as a progressive enhancement.
    </p>

    <div class="showcase-demo">
      <slot />
    </div>

    <details v-if="snippetHtml || snippetCss || snippetJs" class="showcase-code">
      <summary class="showcase-code-summary">
        <svg
          class="showcase-code-glyph"
          viewBox="0 0 24 24"
          aria-hidden="true"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <polyline points="9 8 5 12 9 16" />
          <polyline points="15 8 19 12 15 16" />
        </svg>
        <span class="showcase-code-label showcase-code-label-show">Show the code</span>
        <span class="showcase-code-label showcase-code-label-hide">Hide the code</span>
        <svg
          class="showcase-code-chevron"
          viewBox="0 0 24 24"
          aria-hidden="true"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </summary>
      <div class="showcase-code-body">
        <CodeBlock v-if="snippetHtml" label="HTML" :code="snippetHtml" />
        <CodeBlock v-if="snippetCss" label="CSS" :code="snippetCss" />
        <CodeBlock v-if="snippetJs" label="JS" :code="snippetJs" />
      </div>
    </details>

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
import CodeBlock from '../CodeBlock/CodeBlock.vue'
import BaselineBadge from '../BaselineBadge/BaselineBadge.vue'
import type { BaselineInfo } from '../registry'

interface ShowcaseLink {
  label: string
  href: string
}

const props = withDefaults(
  defineProps<{
    title: string
    summary: string
    /** CSS.supports() condition for the feature, e.g. "container-type: inline-size". */
    supports?: string
    /** JS feature test for APIs CSS.supports() can't express (View Transitions,
        Custom Highlight API). Takes precedence over `supports` when present. */
    detect?: () => boolean
    /** Baseline status line (from baseline-data.json); omitted = no badge. */
    baseline?: BaselineInfo
    links?: ShowcaseLink[]
    /** Match the surrounding document outline (4 = under an h3 group). */
    headingLevel?: number
    /** Portable markup excerpt (raw string) for the "Show the code" panel. */
    snippetHtml?: string
    /** Portable CSS excerpt (raw string) for the "Show the code" panel. */
    snippetCss?: string
    /** Portable JS excerpt (raw string) — only for genuine JS-API features. */
    snippetJs?: string
  }>(),
  {
    supports: '',
    links: () => [],
    headingLevel: 4,
    snippetHtml: '',
    snippetCss: '',
    snippetJs: '',
  },
)

const headingId = useId()
const headingTag = computed(() => `h${props.headingLevel}`)
const supported = computed(() => {
  if (props.detect) return props.detect()
  return props.supports ? CSS.supports(props.supports) : true
})
</script>

<style scoped lang="scss" src="./ShowcaseFrame.scss"></style>
