<template>
  <div class="content-stress-demo">
    <fieldset class="content-stress-control">
      <legend class="content-stress-legend">Content source</legend>
      <label v-for="v in variants" :key="v.id" class="content-stress-option">
        <input v-model="activeId" type="radio" name="content-stress" :value="v.id" />
        {{ v.label }}
      </label>
    </fieldset>

    <div class="content-stress-stage">
      <article class="content-stress-card" :dir="active.dir" :lang="active.lang">
        <div class="content-stress-avatar" aria-hidden="true">{{ active.initials }}</div>
        <div class="content-stress-body">
          <p class="content-stress-tag">{{ active.tag }}</p>
          <h4 class="content-stress-title">{{ active.title }}</h4>
          <p class="content-stress-byline">{{ active.byline }}</p>
        </div>
        <button class="content-stress-action" type="button">{{ active.action }}</button>
      </article>
    </div>

    <p class="content-stress-note">{{ active.note }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

interface Variant {
  id: string
  label: string
  dir: 'ltr' | 'rtl'
  lang: string
  initials: string
  tag: string
  title: string
  byline: string
  action: string
  note: string
}

const variants: Variant[] = [
  {
    id: 'designed',
    label: 'As designed',
    dir: 'ltr',
    lang: 'en',
    initials: 'DR',
    tag: 'Recipe',
    title: 'Quick weeknight pasta',
    byline: 'By Dana Reeves · 12 min read',
    action: 'Save',
    note: 'The card the designer signed off — short, tidy, and deceptive. Real content never stays this polite.',
  },
  {
    id: 'long',
    label: 'Long content',
    dir: 'ltr',
    lang: 'en',
    initials: 'AKV',
    tag: 'Longform investigation',
    title:
      'How I learned to stop worrying and love the fact that a CMS will eventually feed every component a title exactly this long',
    byline: 'By Dr. Alexandra Konstantinopoulos-Vandenberg · 47 min read',
    action: 'Save for later',
    note: 'The title wraps, the button grows with its label instead of clipping it, and nothing escapes the card — min-inline-size: 0 on the text column does the quiet work.',
  },
  {
    id: 'german',
    label: 'German',
    dir: 'ltr',
    lang: 'de',
    initials: 'ML',
    tag: 'Rezept',
    title: 'Streichholzschächtelchen und die Donaudampfschifffahrtsgesellschaft: ein Küchenexperiment',
    byline: 'Von Frau Müller-Lüdenscheidt · 12 Min. Lesezeit',
    action: 'Speichern',
    note: 'Compound words are unbreakable by default. hyphens: auto splits them correctly — but only because the card carries lang="de"; the hyphenation dictionary follows the language, not the layout.',
  },
  {
    id: 'arabic',
    label: 'Arabic (RTL)',
    dir: 'rtl',
    lang: 'ar',
    initials: 'دن',
    tag: 'وصفة',
    title: 'معكرونة سريعة لأمسيات الأسبوع المزدحمة',
    byline: 'بقلم دانا ريفز · ١٢ دقيقة قراءة',
    action: 'حفظ',
    note: 'One dir="rtl" and the whole card mirrors — accent bar, avatar, button — because every offset in it is a logical property. And :dir(rtl) removes the title’s letter-spacing: Arabic script joins its letters, so tracking that flatters Latin type would tear it apart.',
  },
]

const activeId = ref('designed')
const active = computed(() => variants.find((v) => v.id === activeId.value) ?? variants[0])
</script>

<style scoped lang="scss">
@layer components {
  .content-stress-demo {
    display: grid;
    gap: var(--space-4);
  }

  .content-stress-control {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-2) var(--space-4);
    align-items: center;
    margin: 0;
    padding: var(--space-2) var(--space-4);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-full);
  }

  .content-stress-legend {
    float: inline-start;
    padding-inline-end: var(--space-2);
    font-size: var(--text-sm);
    font-weight: 600;
  }

  .content-stress-option {
    display: inline-flex;
    align-items: center;
    gap: var(--space-1);
    font-size: var(--text-sm);
  }

  .content-stress-stage {
    container-type: inline-size;
  }

  .content-stress-card {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr) auto;
    gap: var(--space-3);
    align-items: start;
    padding: var(--space-4);
    border: 1px solid var(--color-border);
    border-inline-start: 4px solid var(--color-primary);
    border-radius: var(--radius-md);
    background-color: var(--color-bg-subtle);

    @include high-contrast {
      border-color: currentcolor;
    }
  }

  .content-stress-avatar {
    display: grid;
    place-items: center;
    inline-size: var(--space-12);
    block-size: var(--space-12);
    border-radius: var(--radius-full);
    background-color: var(--color-primary);
    color: var(--color-primary-text);
    font-size: var(--text-sm);
    font-weight: 700;
  }

  .content-stress-body {
    display: grid;
    gap: var(--space-1);
    min-inline-size: 0;
  }

  .content-stress-tag {
    font-size: var(--text-sm);
    font-weight: 600;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: var(--color-text-subtle);
  }

  .content-stress-title {
    font-size: var(--text-lg);
    letter-spacing: 0.01em;
    text-wrap: balance;
    hyphens: auto;

    &:dir(rtl) {
      letter-spacing: 0;
    }
  }

  .content-stress-byline {
    font-size: var(--text-sm);
    color: var(--color-text-subtle);
  }

  .content-stress-action {
    padding: var(--space-2) var(--space-4);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-full);
    background-color: var(--color-bg);
    color: var(--color-text);
    font: inherit;
    font-size: var(--text-sm);
    font-weight: 600;
    cursor: pointer;

    @include can-hover {
      &:hover {
        border-color: var(--color-text-subtle);
      }
    }
  }

  .content-stress-note {
    min-block-size: 3lh;
    font-size: var(--text-sm);
    color: var(--color-text-subtle);
  }
}
</style>
