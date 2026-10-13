<template>
  <div class="focus-obscured-demo" :class="{ 'is-broken': broken }">
    <p class="focus-obscured-caption">
      A sticky bar sits at the top of this scrolling panel. Tab down to the
      last link, then Shift+Tab back up: the links you return to come from
      above, from behind the bar.
    </p>

    <div class="focus-obscured-viewport">
      <div class="focus-obscured-bar">Sticky toolbar</div>
      <nav class="focus-obscured-list" aria-label="Settings">
        <a v-for="item in items" :key="item" class="focus-obscured-link" href="#focus-obscured-noop">
          {{ item }}
        </a>
      </nav>
    </div>
  </div>
</template>

<script setup lang="ts">
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
  .focus-obscured-demo {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: var(--space-3);
  }

  .focus-obscured-caption {
    font-size: var(--text-sm);
    color: var(--color-text-subtle);
  }

  .focus-obscured-viewport {
    position: relative;
    max-block-size: 12.5rem;
    overflow-y: auto;
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);

    @include high-contrast {
      border-color: currentcolor;
    }
  }

  .focus-obscured-bar {
    position: sticky;
    inset-block-start: 0;
    z-index: 1;
    padding: var(--space-2) var(--space-3);
    border-block-end: 1px solid var(--color-border);
    background-color: var(--color-bg-subtle);
    font-weight: 600;
  }

  .focus-obscured-list {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    padding: calc(var(--focus-ring-width) + var(--focus-ring-offset));
  }

  .focus-obscured-link {
    --focus-ring-offset: var(--focus-ring-offset-inset);

    scroll-margin-block:
      calc(var(--space-12) + var(--focus-ring-width) + var(--focus-ring-offset))
      calc(var(--focus-ring-width) + var(--focus-ring-offset));
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

  .is-broken {
    .focus-obscured-bar {
      padding-block: var(--space-4);
    }

    .focus-obscured-link {
      scroll-margin-block-start: 0;
    }
  }
}
</style>
