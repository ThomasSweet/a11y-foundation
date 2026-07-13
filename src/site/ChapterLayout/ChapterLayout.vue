<template>
  <SiteFrame>
    <div class="chapter">
      <aside class="chapter-rail">
        <p class="chapter-rail-title">Legend</p>
        <nav class="chapter-switch" aria-label="Chapters">
          <a
            v-for="c in pillars"
            :key="c.id"
            class="chapter-switch-link"
            :class="{ 'is-current': c.id === id }"
            :href="c.href"
            :aria-current="c.id === id ? 'page' : undefined"
          >
            <span class="chapter-switch-n">{{ c.no }}</span>
            <span>{{ c.short }}</span>
          </a>
        </nav>
        <nav v-if="sections.length" class="chapter-sections" aria-label="Sections in this chapter">
          <a
            v-for="(s, i) in sections"
            :key="s.id"
            class="chapter-section-link"
            :href="`#${s.id}`"
            :style="{ animationTimeline: `--chapter-sec-${i + 1}` }"
          >
            {{ s.label }}
          </a>
        </nav>
      </aside>

      <div class="chapter-body">
        <header class="chapter-head">
          <p class="chapter-eyebrow">Drawing {{ pillar.no }} · {{ specLabel }}</p>
          <div class="chapter-headrow">
            <span class="chapter-no">{{ pillar.no }}</span>
            <span class="chapter-mark" aria-hidden="true" v-html="pillarIcons[pillar.icon]"></span>
            <h1 class="chapter-title">{{ pillar.title }}</h1>
          </div>
        </header>

        <div class="chapter-content">
          <slot />
        </div>
      </div>
    </div>

    <template #prevnext>
      <div class="chapter-prevnext">
        <a v-if="prev" class="chapter-nav chapter-nav-prev" :href="prev.href">
          <span class="chapter-nav-k">← Previous drawing</span>
          <span class="chapter-nav-t">{{ prev.no }} · {{ prev.title }}</span>
        </a>
        <span v-else></span>
        <a v-if="next" class="chapter-nav chapter-nav-next" :href="next.href">
          <span class="chapter-nav-k">Next drawing →</span>
          <span class="chapter-nav-t">{{ next.no }} · {{ next.title }}</span>
        </a>
      </div>
    </template>
  </SiteFrame>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import SiteFrame from '../SiteFrame/SiteFrame.vue'
import { pillars } from '../pillars'
import { pillarIcons } from '../../icons/pillarIcons'

const props = defineProps<{
  /** Matches a pillars[].id. */
  id: string
  sections?: { id: string; label: string }[]
}>()

const sections = computed(() => props.sections ?? [])
const index = computed(() => pillars.findIndex((p) => p.id === props.id))
const pillar = computed(() => pillars[index.value])
const prev = computed(() => pillars[index.value - 1])
const next = computed(() => pillars[index.value + 1])
const specLabel = computed(() => pillar.value.eyebrow.split('·').slice(1).join('·').trim())
</script>

<style scoped lang="scss" src="./ChapterLayout.scss"></style>
