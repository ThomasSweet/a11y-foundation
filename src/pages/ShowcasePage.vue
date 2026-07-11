<template>
  <ChapterLayout id="showcase" :sections="sections">
    <p class="chapter-intro">
      The same idea, looking forward: modern CSS worth knowing, grouped by
      where it stands across the current versions of Chrome, Firefox, and
      Safari — based on
      <a href="https://wpt.fyi/interop-2026">Interop</a> and Baseline.
      Everything is written as a progressive enhancement, so unsupported
      demos degrade instead of breaking.
    </p>

    <div class="demo">
      <fieldset class="showcase-filter">
        <legend class="showcase-filter-legend">Filter by topic</legend>
        <label class="showcase-filter-chip">
          <input type="radio" name="showcase-filter" value="all" checked />
          All
        </label>
        <label v-for="tag in showcaseTags" :key="tag" class="showcase-filter-chip">
          <input type="radio" name="showcase-filter" :value="tag" />
          {{ tag }}
        </label>
      </fieldset>

      <template v-for="group in groups" :key="group.tier">
        <div v-if="group.items.length" :id="`tier-${group.tier}`" class="showcase-group">
          <h3>{{ group.label }}</h3>
          <p>{{ group.blurb }}</p>
          <div class="showcase-list">
            <ShowcaseFrame
              v-for="item in group.items"
              :key="item.id"
              :id="`showcase-${item.id}`"
              :data-tags="item.tags.join(' ')"
              :title="item.title"
              :summary="item.summary"
              :payoff="item.payoff"
              :supports="item.supports"
              :detect="item.detect"
              :baseline="baselineData[item.id]"
              :links="item.links"
              :snippet-html="item.snippetHtml"
              :snippet-css="item.snippetCss"
              :snippet-js="item.snippetJs"
              :source-href="item.sourceHref"
            >
              <component :is="item.component" v-bind="item.props" />
            </ShowcaseFrame>
          </div>
        </div>
      </template>
    </div>

    <!-- Baseline icon sprite — the badges reference it with <use>; defined once. -->
    <div class="baseline-sprite" aria-hidden="true" v-html="baselineSprite"></div>
  </ChapterLayout>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import ChapterLayout from '../site/ChapterLayout/ChapterLayout.vue'
import ShowcaseFrame from '../showcases/ShowcaseFrame/ShowcaseFrame.vue'
import { showcases, type BaselineInfo } from '../showcases/registry'
import baselineDataJson from '../showcases/baseline-data.json'
import baselineSprite from '../showcases/BaselineBadge/baseline-sprite.svg?raw'

const baselineData = baselineDataJson as unknown as Record<string, BaselineInfo>

// Keep in sync with the $showcase-tags list in the styles below — the pure-CSS
// filter rules are generated from that list.
const showcaseTags = ['layout', 'scroll', 'forms', 'theming', 'typography', 'interaction', 'motion']

const groups = computed(() => [
  {
    tier: 'widely-available',
    label: 'Widely available',
    blurb:
      'Baseline widely available — in every engine for 30+ months. The foundation itself leans on these.',
    items: showcases.filter((s) => s.tier === 'widely-available'),
  },
  {
    tier: 'newly-available',
    label: 'Newly available',
    blurb:
      'Baseline newly available — interoperable everywhere, recently. Used with cheap fallbacks where it matters.',
    items: showcases.filter((s) => s.tier === 'newly-available'),
  },
  {
    tier: 'limited-availability',
    label: 'Limited availability — Interop focus areas',
    blurb:
      'Not yet in every engine. Demos only, always behind @supports — they degrade instead of breaking.',
    items: showcases.filter((s) => s.tier === 'limited-availability'),
  },
])

const sections = [
  { id: 'tier-widely-available', label: 'Widely available' },
  { id: 'tier-newly-available', label: 'Newly available' },
  { id: 'tier-limited-availability', label: 'Limited availability' },
]
</script>

<style scoped lang="scss">
@layer components {
  .showcase-list {
    display: grid;
    gap: var(--space-6);
  }

  .showcase-group {
    display: grid;
    gap: var(--space-6);
    scroll-margin-top: var(--space-6);
  }

  .showcase-filter {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-2);
    align-items: center;
    margin: 0;
    padding: 0;
    border: none;
  }

  .showcase-filter-legend {
    float: inline-start;
    padding: 0;
    padding-inline-end: var(--space-2);
    font-size: var(--text-sm);
    font-weight: 600;
  }

  .showcase-filter-chip {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    padding: var(--space-1) var(--space-3);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-full);
    font-size: var(--text-sm);
    text-transform: capitalize;
    cursor: pointer;

    &:has(input:checked) {
      border-color: var(--color-primary);
      background-color: color-mix(in oklab, var(--color-primary) 10%, transparent);
      font-weight: 600;
    }

    @include can-hover {
      &:hover {
        border-color: var(--color-text-subtle);
      }
    }

    @include high-contrast {
      border-color: currentcolor;
    }
  }

  .baseline-sprite {
    position: absolute;
    inline-size: 0;
    block-size: 0;
    overflow: hidden;
  }

  /* Pure-CSS catalog filter — keep in sync with showcaseTags in the script.
     Must live in `components` so the hide beats the cards' own display. */
  $showcase-tags: layout, scroll, forms, theming, typography, interaction, motion;

  @each $tag in $showcase-tags {
    .demo:has(.showcase-filter input[value='#{$tag}']:checked) {
      .showcase[data-tags]:not([data-tags~='#{$tag}']) {
        display: none;
      }

      .showcase-group:not(:has(.showcase[data-tags~='#{$tag}'])) {
        display: none;
      }
    }
  }
}
</style>
