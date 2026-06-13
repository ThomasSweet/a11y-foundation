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

<script setup lang="ts">
import { computed, ref, useId } from 'vue'

interface CriterionLink {
  label: string
  href: string
}

const props = withDefaults(
  defineProps<{
    id: string // e.g. "2.5.8"
    name: string
    level: string // "A" | "AA" | "AAA"
    version: string // e.g. "WCAG 2.2"
    principle: string // Perceivable | Operable | …
    requirement: string
    // What the toggle does, and what it says once broken.
    breakLabel?: string
    restoreLabel?: string
    // Each criterion explains its own pass / fail state — the failure text
    // is the teaching moment.
    passText: string
    failText: string
    links?: CriterionLink[]
    headingLevel?: number
  }>(),
  {
    breakLabel: 'Break this rule',
    restoreLabel: 'Restore compliance',
    links: () => [],
    headingLevel: 3,
  },
)

const broken = ref(false)
const headingId = useId()
const headingTag = computed(() => `h${props.headingLevel}`)
</script>

<style scoped lang="scss" src="./CriterionFrame.scss"></style>
