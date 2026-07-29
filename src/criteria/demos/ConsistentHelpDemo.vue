<template>
  <div class="consistent-help-demo" :class="{ 'is-broken': broken }">
    <p class="consistent-help-caption">
      Three pages from the same site. Follow the highlighted help link across
      them — the question is not whether help exists, but whether you have to
      hunt for it again on every page.
    </p>

    <div class="consistent-help-pages">
      <article
        v-for="page in pages"
        :key="page.title"
        class="consistent-help-page"
        :aria-label="`Page: ${page.title}`"
      >
        <div class="consistent-help-page-head">
          <span class="consistent-help-page-title">{{ page.title }}</span>
          <span class="consistent-help-link consistent-help-link-head">Help</span>
        </div>

        <div class="consistent-help-page-body">
          <span class="consistent-help-page-line" aria-hidden="true"></span>
          <!-- Mid-content, so the broken state reads as "buried" rather than
               landing a few pixels off the footer slot. -->
          <span class="consistent-help-link consistent-help-link-body">Help</span>
          <span class="consistent-help-page-line" aria-hidden="true"></span>
          <span
            class="consistent-help-page-line consistent-help-page-line-short"
            aria-hidden="true"
          ></span>
        </div>

        <div class="consistent-help-page-foot">
          <span class="consistent-help-page-foot-item">About</span>
          <span class="consistent-help-link consistent-help-link-foot">Help</span>
          <span class="consistent-help-page-foot-item">Terms</span>
        </div>
      </article>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  broken: { type: Boolean, default: false },
})

const pages = [{ title: 'Products' }, { title: 'Pricing' }, { title: 'Account' }]
</script>

<style scoped lang="scss">
@layer components {
  .consistent-help-demo {
    container-type: inline-size;
    display: grid;
    gap: var(--space-3);
  }

  .consistent-help-caption {
    font-size: var(--text-sm);
    color: var(--color-text-subtle);
  }

  .consistent-help-pages {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: var(--space-3);

    @container (width < 26rem) {
      grid-template-columns: 1fr;
    }
  }

  .consistent-help-page {
    display: grid;
    grid-template-rows: auto 1fr auto;
    gap: var(--space-2);
    min-block-size: 9rem;
    padding: var(--space-2);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    background-color: var(--color-surface);

    @include high-contrast {
      border-color: currentcolor;
    }
  }

  .consistent-help-page-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-2);
    padding-block-end: var(--space-1);
    border-block-end: 1px solid var(--color-border);

    @include high-contrast {
      border-color: currentcolor;
    }
  }

  .consistent-help-page-title {
    font-size: var(--text-sm);
    font-weight: 700;
  }

  .consistent-help-page-body {
    display: grid;
    align-content: start;
    gap: var(--space-2);
  }

  .consistent-help-page-line {
    block-size: 0.5rem;
    border-radius: var(--radius-full);
    background-color: var(--color-border);

    @include forced-colors {
      border: 1px solid GrayText;
    }
  }

  .consistent-help-page-line-short {
    inline-size: 60%;
  }

  .consistent-help-page-foot {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--space-2);
    padding-block-start: var(--space-1);
    border-block-start: 1px solid var(--color-border);

    @include high-contrast {
      border-color: currentcolor;
    }
  }

  .consistent-help-page-foot-item {
    font-size: var(--text-sm);
    color: var(--color-text-subtle);
  }

  .consistent-help-link {
    inline-size: fit-content;
    padding: 2px var(--space-2);
    border: 1px solid var(--color-primary);
    border-radius: var(--radius-full);
    font-size: var(--text-sm);
    font-weight: 600;
    color: var(--color-primary);

    @include high-contrast {
      border-color: currentcolor;
      color: currentcolor;
    }
  }

  .consistent-help-link-head,
  .consistent-help-link-body {
    display: none;
  }

  .consistent-help-link-foot {
    display: block;
  }

  .is-broken .consistent-help-page:nth-child(2) {
    .consistent-help-link-foot {
      display: none;
    }

    .consistent-help-link-head {
      display: block;
    }
  }

  .is-broken .consistent-help-page:nth-child(3) {
    .consistent-help-link-foot {
      display: none;
    }

    .consistent-help-link-body {
      display: block;
    }
  }
}
</style>
