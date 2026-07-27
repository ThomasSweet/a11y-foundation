<template>
  <SiteFrame>
    <h1 class="glossary-title">Glossary</h1>
    <p class="glossary-lede">
      Every trade abbreviates, and this one is worse than most. Here is the
      vocabulary the site leans on — short, honest definitions for anyone new
      to accessibility or to the newest CSS. Every term can be linked to
      directly.
    </p>

    <dl class="glossary-list">
      <div v-for="t in terms" :key="t.id" :id="t.id" class="glossary-entry">
        <dt class="glossary-entry-term">{{ t.term }}</dt>
        <dd class="glossary-entry-def">{{ t.def }}</dd>
      </div>
    </dl>
  </SiteFrame>
</template>

<script setup lang="ts">
import SiteFrame from '../SiteFrame/SiteFrame.vue'
import { glossaryTerms } from '../../glossary/terms'

const terms = [...glossaryTerms].sort((a, b) => a.term.localeCompare(b.term))
</script>

<style scoped lang="scss">
@layer components {
  .glossary-title {
    margin: 0;
    max-inline-size: 15ch;
    font-size: var(--text-display-sm);
    line-height: 1.05;
    letter-spacing: -0.02em;
    text-wrap: balance;
    color: var(--bp-ink);
  }

  .glossary-lede {
    max-inline-size: 58ch;
    margin-block: var(--space-4) 0;
    font-size: var(--text-lg);
    line-height: var(--leading-normal);
    color: var(--bp-ink-2);
  }

  .glossary-list {
    display: grid;
    gap: var(--space-4);
    max-inline-size: 68ch;
    margin-block: var(--space-8) var(--space-6);
  }

  .glossary-entry {
    padding: var(--space-3) var(--space-4);
    border: 1px solid var(--bp-line-strong);
    border-radius: var(--radius-md);
    background-color: var(--bp-sheet);
    /* Deep links land clear of the viewport edge. */
    scroll-margin-block-start: var(--space-8);

    @include high-contrast {
      border-color: currentcolor;
    }
  }

  .glossary-entry:target {
    border-color: var(--bp-accent);
    background-color: var(--bp-accent-soft);
  }

  .glossary-entry-term {
    font-weight: 700;
    color: var(--bp-ink);
  }

  .glossary-entry-def {
    margin: var(--space-1) 0 0;
    font-size: var(--text-sm);
    line-height: var(--leading-normal);
    color: var(--bp-ink-2);
  }
}
</style>
