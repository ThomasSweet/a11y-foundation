<template>
  <SiteFrame>
    <p class="hub-eyebrow">Drawing 00 · the through-line</p>
    <h1 class="hub-title">Built in, not <span class="hub-strike">bolted&nbsp;on</span></h1>
    <p class="hub-lede">
      How much of accessibility the modern web platform handles
      <strong>natively</strong> — with little to no JavaScript. One argument, in
      four parts. Start anywhere; the thread runs through all of them.
    </p>

    <div class="hub-index" aria-hidden="true">
      <span class="hub-index-k">Index</span>
      <span v-for="p in plates" :key="p.href" class="hub-index-item">
        <span class="hub-index-sep"></span>{{ p.no }} {{ p.tag }}
      </span>
    </div>

    <nav class="hub-plates" aria-label="Chapters">
      <a
        v-for="p in plates"
        :key="p.href"
        class="hub-plate"
        :href="p.href"
        :style="{ viewTransitionName: `${p.vt}-plate` }"
      >
        <span class="hub-plate-top">
          <span class="hub-plate-no">{{ p.no }}</span>
          <span
            class="hub-plate-icon"
            :style="{ viewTransitionName: `${p.vt}-mark` }"
            aria-hidden="true"
            v-html="pillarIcons[p.icon]"
          ></span>
        </span>
        <span class="hub-plate-spec">{{ p.spec }}</span>
        <span class="hub-plate-title">{{ p.title }}</span>
        <span class="hub-plate-desc">{{ p.desc }}</span>
        <span class="hub-plate-enter">Enter drawing →</span>
      </a>
    </nav>

    <template #footer-extra>
      <div class="hub-author">
        <span class="hub-author-avatar" aria-hidden="true"></span>
        <p class="hub-author-bio">
          Built by <strong>Thomas Sweet</strong> — a front-end developer
          sharpening an accessibility-first craft in the open, one experiment at
          a time. This whole site is the sketchbook. ☕
        </p>
      </div>
    </template>
  </SiteFrame>
</template>

<script setup lang="ts">
import SiteFrame from '../SiteFrame/SiteFrame.vue'
import { pillarIcons, type PillarIconName } from '../../icons/pillarIcons'

interface Plate {
  no: string
  href: string
  icon: PillarIconName
  tag: string
  spec: string
  title: string
  desc: string
  vt: string
}

const plates: Plate[] = [
  { no: '01', href: '/standard.html', icon: 'standard', tag: 'standard', spec: 'The requirement', title: 'The standard', desc: 'What WCAG asks for, arranged along the timeline it grew on.', vt: 'vt-standard' },
  { no: '02', href: '/craft.html', icon: 'craft', tag: 'craft', spec: 'Shipping today', title: 'The craft', desc: 'Meeting the bar with modern CSS and native HTML.', vt: 'vt-craft' },
  { no: '03', href: '/showcase.html', icon: 'next', tag: 'css', spec: 'Arriving next', title: 'CSS showcase', desc: 'Modern CSS worth knowing, grouped by Baseline support.', vt: 'vt-showcase' },
  { no: '04', href: '/proof.html', icon: 'proof', tag: 'proof', spec: 'The proof', title: 'The proof', desc: 'Testing that it holds up — a layered job, not a scanner.', vt: 'vt-proof' },
]
</script>

<style scoped lang="scss" src="./HubView.scss"></style>
