<template>
  <div class="bypass-demo" :class="{ 'is-broken': broken }">
    <p class="bypass-caption">
      Tab into this mock page. Compliant, the very first tab stop is a skip
      link — one Enter and you're past the whole navigation block. Broken,
      the skip link is gone: count the tab stops to reach the content, then
      imagine paying them on every page of a site.
    </p>

    <div class="bypass-page">
      <a class="bypass-skip" href="#bypass-content">Skip to content</a>
      <nav class="bypass-nav" aria-label="Mock site">
        <a v-for="item in navItems" :key="item" class="bypass-nav-link" href="#bypass-noop">
          {{ item }}
        </a>
      </nav>
      <div id="bypass-content" class="bypass-content" tabindex="-1">
        <p class="bypass-content-title">Main content</p>
        <p class="bypass-content-text">
          The skip link lands you here — focus and all.
          <a class="bypass-content-link" href="#bypass-noop">Carry on reading</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  broken: { type: Boolean, default: false },
})

const navItems = ['Home', 'Products', 'Pricing', 'Docs', 'Blog', 'Contact']
</script>

<style scoped lang="scss">
@layer components {
  .bypass-demo {
    display: grid;
    gap: var(--space-3);
  }

  .bypass-caption {
    font-size: var(--text-sm);
    color: var(--color-text-subtle);
  }

  .bypass-page {
    position: relative;
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    overflow: clip;

    @include high-contrast {
      border-color: currentcolor;
    }
  }

  .bypass-skip {
    position: absolute;
    inset-block-start: var(--space-2);
    inset-inline-start: var(--space-2);
    z-index: 1;
    padding: var(--space-2) var(--space-3);
    border-radius: var(--radius-md);
    background-color: var(--color-primary);
    color: var(--color-primary-text);
    font-size: var(--text-sm);
    font-weight: 600;
    text-decoration: none;
    clip-path: inset(50%);

    &:focus-visible {
      clip-path: none;
    }
  }

  .bypass-nav {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-1);
    padding: var(--space-2) var(--space-3);
    border-block-end: 1px solid var(--color-border);
    background-color: var(--color-bg-subtle);
  }

  .bypass-nav-link {
    padding: var(--space-1) var(--space-2);
    border-radius: var(--radius-sm);
    color: var(--color-text);
    font-size: var(--text-sm);
    text-decoration: none;

    @include can-hover {
      &:hover {
        background-color: var(--color-bg);
      }
    }
  }

  .bypass-content {
    display: grid;
    gap: var(--space-1);
    padding: var(--space-3);
  }

  .bypass-content-title {
    font-weight: 600;
  }

  .bypass-content-text {
    font-size: var(--text-sm);
    color: var(--color-text-subtle);
  }

  .bypass-content-link {
    color: var(--color-primary);
  }

  /* The regression: the bypass mechanism disappears — every nav link becomes
     a mandatory tab stop on the way to the content. */
  .is-broken .bypass-skip {
    display: none;
  }
}
</style>
