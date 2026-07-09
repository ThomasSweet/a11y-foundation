<template>
  <article class="showcase" :aria-labelledby="headingId">
    <header class="showcase-header">
      <component :is="headingTag" :id="headingId" class="showcase-title">
        {{ title }}
      </component>
    </header>

    <p class="showcase-summary">{{ summary }}</p>

    <p v-if="payoff" class="showcase-payoff">
      <svg class="showcase-payoff-icon" viewBox="0 -960 960 960" aria-hidden="true">
        <path
          d="M480-720q-33 0-56.5-23.5T400-800q0-33 23.5-56.5T480-880q33 0 56.5 23.5T560-800q0 33-23.5 56.5T480-720ZM360-80v-520q-60-5-122-15t-118-25l20-80q78 21 166 30.5t174 9.5q86 0 174-9.5T820-720l20 80q-56 15-118 25t-122 15v520h-80v-240h-80v240h-80Z"
        />
      </svg>
      <span class="visually-hidden">Accessibility payoff:</span>
      <span>{{ payoff }}</span>
    </p>

    <BaselineBadge v-if="baseline" :info="baseline" />

    <p v-if="!supported" class="showcase-unsupported" role="note">
      Your browser doesn't support this yet — the demo below shows the
      fallback behavior instead. That's the point: everything here is
      written as a progressive enhancement.
    </p>

    <div class="showcase-demo">
      <slot />
    </div>

    <div v-if="hasSnippet || sourceHref" class="showcase-code-actions">
      <details v-if="hasSnippet" class="showcase-code">
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

      <a
        v-if="sourceHref"
        class="showcase-source"
        :href="sourceHref"
        target="_blank"
        rel="noreferrer"
      >
        <svg class="showcase-source-glyph" viewBox="0 0 24 24" aria-hidden="true">
          <path
            fill="currentColor"
            d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.51 11.51 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.91 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222 0 1.606-.015 2.898-.015 3.293 0 .322.216.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
          />
        </svg>
        <span>View source</span>
        <span class="visually-hidden"> on GitHub (opens in a new tab)</span>
      </a>
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
    /** The card's accessibility-payoff line — who this helps and how. */
    payoff?: string
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
    /** GitHub URL to the demo's full source folder (the panel above is an excerpt). */
    sourceHref?: string
  }>(),
  {
    supports: '',
    payoff: '',
    links: () => [],
    headingLevel: 4,
    snippetHtml: '',
    snippetCss: '',
    snippetJs: '',
    sourceHref: '',
  },
)

const headingId = useId()
const headingTag = computed(() => `h${props.headingLevel}`)
const hasSnippet = computed(() =>
  Boolean(props.snippetHtml || props.snippetCss || props.snippetJs),
)
const supported = computed(() => {
  if (props.detect) return props.detect()
  return props.supports ? CSS.supports(props.supports) : true
})
</script>

<style scoped lang="scss" src="./ShowcaseFrame.scss"></style>
