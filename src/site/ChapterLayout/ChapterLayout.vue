<template>
  <SiteFrame :sheet="sheetNo" :sheet-title="pillar.title">
    <div class="chapter">
      <aside class="chapter-rail">
        <p class="chapter-rail-title">Contents</p>
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
            :style="{ '--section-timeline': `--chapter-sec-${i + 1}` }"
          >
            {{ s.label }}
          </a>
        </nav>
      </aside>

      <div class="chapter-body">
        <header class="chapter-head">
          <div class="chapter-headrow-wrap">
            <div class="chapter-headrow">
              <span class="chapter-no">{{ pillar.no }}</span>
              <!-- eslint-disable-next-line vue/no-v-html -- build-time icon map, never user input -->
              <span class="chapter-mark" aria-hidden="true" v-html="pillarIcons[pillar.icon]"></span>
              <h1 class="chapter-title">{{ pillar.title }}</h1>
            </div>
            <span class="chapter-dim" aria-hidden="true"></span>
          </div>
        </header>

        <div class="chapter-content">
          <slot />
        </div>
      </div>
    </div>

    <nav class="chapter-bar" aria-label="Chapter shortcuts">
      <a class="chapter-bar-link" href="/">
        <span class="chapter-bar-n" aria-hidden="true">←</span>
        <span>Index</span>
      </a>
      <a
        v-for="c in pillars"
        :key="c.id"
        class="chapter-bar-link"
        :class="{ 'is-current': c.id === id }"
        :href="c.href"
        :aria-current="c.id === id ? 'page' : undefined"
      >
        <span class="chapter-bar-n" aria-hidden="true">{{ c.no }}</span>
        <span>{{ c.short }}</span>
      </a>
    </nav>

    <template #prevnext>
      <nav class="chapter-prevnext" aria-label="Adjacent chapters">
        <a v-if="prev" class="chapter-nav" :href="prev.href">
          <span class="chapter-nav-k">← Previous</span>
          <span class="chapter-nav-t">{{ prev.no }} · {{ prev.title }}</span>
        </a>
        <a v-if="next" class="chapter-nav chapter-nav-next" :href="next.href">
          <span class="chapter-nav-k">Next →</span>
          <span class="chapter-nav-t">{{ next.no }} · {{ next.title }}</span>
        </a>
      </nav>
    </template>
  </SiteFrame>
</template>

<script setup lang="ts">
import { computed, provide, ref } from 'vue'
import SiteFrame from '../SiteFrame/SiteFrame.vue'
import { pillars } from '../pillars'
import { pillarIcons } from '../../icons/pillarIcons'
import { chapterSectionsKey, type ChapterSectionEntry } from './chapterSections'

const props = defineProps<{
  /** Matches a pillars[].id. */
  id: string
  /** Only for pages that don't compose ChapterSection (the showcase's tier
      groups); sections registered by ChapterSection children win otherwise. */
  sections?: { id: string; label: string }[]
}>()

const registered = ref<ChapterSectionEntry[]>([])

provide(chapterSectionsKey, {
  register: (entry) => {
    const existing = registered.value.findIndex((e) => e.id === entry.id)
    if (existing !== -1) {
      registered.value[existing] = entry
      return existing + 1
    }
    return registered.value.push(entry)
  },
})

const sections = computed(() =>
  props.sections?.length
    ? props.sections
    : registered.value.map((e) => ({ id: e.id, label: e.railLabel ?? e.title })),
)
const index = computed(() => pillars.findIndex((p) => p.id === props.id))
const pillar = computed(() => pillars[index.value])
const prev = computed(() => pillars[index.value - 1])
const next = computed(() => pillars[index.value + 1])
const sheetNo = computed(() => `${pillar.value.no} / ${String(pillars.length).padStart(2, '0')}`)
</script>

<style scoped lang="scss" src="./ChapterLayout.scss"></style>
