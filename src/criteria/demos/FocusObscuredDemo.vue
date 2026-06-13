<template>
  <div class="fo-demo" :class="{ 'is-broken': broken }">
    <p class="fo-caption">
      Tab through the links below. A sticky bar sits at the top of this
      scrolling panel — when the rule is broken it overlaps whatever you
      tab to near the top, so keyboard users lose sight of their own focus.
    </p>

    <div class="fo-viewport">
      <div class="fo-bar">Sticky toolbar</div>
      <nav class="fo-list" aria-label="Settings">
        <a v-for="item in items" :key="item" class="fo-link" href="#fo-noop">
          {{ item }}
        </a>
      </nav>
    </div>
  </div>
</template>

<script setup>
defineProps({
  broken: { type: Boolean, default: false },
})

const items = [
  'Profile',
  'Account',
  'Notifications',
  'Privacy',
  'Billing',
  'Connected apps',
  'Security',
  'Danger zone',
]
</script>

<style scoped lang="scss">
@layer components {
  .fo-demo {
    display: grid;
    gap: var(--space-3);
  }

  .fo-caption {
    font-size: var(--text-sm);
    color: var(--color-text-subtle);
  }

  .fo-viewport {
    position: relative;
    max-block-size: 12rem;
    overflow-y: auto;
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);

    @include high-contrast {
      border-color: currentcolor;
    }
  }

  .fo-bar {
    position: sticky;
    inset-block-start: 0;
    z-index: 1;
    padding: var(--space-2) var(--space-3);
    border-block-end: 1px solid var(--color-border);
    background-color: var(--color-bg-subtle);
    font-weight: 600;
  }

  .fo-list {
    display: grid;
  }

  .fo-link {
    /* The fix: scroll-margin keeps a focused link clear of the sticky bar
       when it's scrolled into view, so the focus ring is never obscured. */
    scroll-margin-block-start: var(--space-12);
    padding: var(--space-3);
    border-block-end: 1px solid var(--color-border);
    color: var(--color-text);
    text-decoration: none;

    &:last-child {
      border-block-end: 0;
    }

    @include can-hover {
      &:hover {
        background-color: var(--color-bg-subtle);
      }
    }
  }

  /* The regression: drop the scroll offset so a link tabbed to near the
     top scrolls flush under the sticky bar — the focus ring ends up hidden
     behind it. Nothing else changes; focus still moves correctly, you just
     can't see where it is. */
  .is-broken {
    .fo-link {
      scroll-margin-block-start: 0;
    }
  }
}
</style>
