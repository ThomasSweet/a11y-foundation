<template>
  <div class="scroll-driven-demo">
    <section class="scroll-driven-block">
      <h5 class="scroll-driven-heading">Progress mirrors the gesture</h5>
      <div
        class="scroll-driven-region"
        tabindex="0"
        role="region"
        aria-label="Scrollable example text with reading progress"
      >
        <div class="scroll-driven-progress" aria-hidden="true"></div>
        <div class="scroll-driven-text">
          <p v-for="n in 4" :key="n">
            Scroll this box: the progress bar at the top is driven by the
            scroll position of this container, in pure CSS. No scroll
            listeners, no layout thrash, and it runs off the main thread.
          </p>
        </div>
      </div>
    </section>

    <section class="scroll-driven-block">
      <h5 class="scroll-driven-heading">A reveal moves content, so it carries its own gate</h5>
      <label class="scroll-driven-toggle">
        <input class="scroll-driven-toggle-input" type="checkbox" />
        Simulate: I prefer reduced motion
      </label>
      <div
        class="scroll-driven-region"
        tabindex="0"
        role="region"
        aria-label="Scrollable list whose rows slide in as they enter"
      >
        <ul class="scroll-driven-rows" role="list">
          <li v-for="row in rows" :key="row" class="scroll-driven-row">{{ row }}</li>
        </ul>
      </div>
      <p class="scroll-driven-note">
        A timeline-driven animation ignores <code>animation-duration</code>,
        so the usual global reset, every duration forced to 0.01ms, never
        reaches it. The progress bar tracks your own gesture one to one,
        like the scrollbar thumb, so this site leaves it running: a
        judgement call, not an exemption. A reveal moves content, so it
        sits inside
        <code>prefers-reduced-motion: no-preference</code>. With the
        preference set, or in a browser without scroll-driven animations,
        the rows are simply there.
      </p>
    </section>
  </div>
</template>

<script setup lang="ts">
const rows = [
  'A scroll timeline ignores animation-duration',
  'So a global 0.01ms reset never reaches it',
  'The reveal sits inside its own motion gate',
  'Fill mode none: the resting state is the visible one',
  'The range ends once the row is fully in view',
  'Without support, the rows are simply there',
  'With the preference set, nothing slides and nothing fades',
  'Progress follows you, a reveal moves content',
]
</script>

<style scoped lang="scss">
@layer components {
  .scroll-driven-demo {
    display: grid;
    gap: var(--space-6);
  }

  .scroll-driven-block {
    display: grid;
    gap: var(--space-2);
  }

  .scroll-driven-heading {
    font-size: var(--text-sm);
    font-weight: 600;
    color: var(--color-text-subtle);
  }

  .scroll-driven-region {
    position: relative;
    max-block-size: 10rem;
    overflow-y: auto;
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);

    @include high-contrast {
      border-color: currentcolor;
    }
  }

  .scroll-driven-progress {
    position: sticky;
    inset-block-start: 0;
    block-size: var(--space-1);
    background-color: var(--color-primary);
    transform-origin: 0 50%;
    display: none;

    @supports (animation-timeline: scroll()) {
      display: block;
      animation: scroll-driven-grow linear both;
      animation-timeline: scroll(nearest);
    }

    @include forced-colors {
      background-color: Highlight;
    }
  }

  .scroll-driven-text {
    display: grid;
    gap: var(--space-3);
    padding: var(--space-3) var(--space-4);
    font-size: var(--text-sm);
    color: var(--color-text-subtle);
  }

  .scroll-driven-toggle {
    display: none;
    align-items: center;
    gap: var(--space-2);
    justify-self: start;
    font-size: var(--text-sm);
    font-weight: 600;
  }

  .scroll-driven-rows {
    display: grid;
    gap: var(--space-2);
    margin: 0;
    padding: var(--space-3) var(--space-4);
  }

  .scroll-driven-row {
    padding: var(--space-2) var(--space-3);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-sm);
    background-color: var(--color-surface);
    font-size: var(--text-sm);

    @include high-contrast {
      border-color: currentcolor;
    }
  }

  @media (prefers-reduced-motion: no-preference) {
    @supports (animation-timeline: view()) {
      .scroll-driven-toggle {
        display: inline-flex;
      }

      .scroll-driven-row {
        animation: scroll-driven-reveal linear none;
        animation-timeline: view();
        animation-range: entry 0% entry 100%;
      }

      .scroll-driven-block:has(.scroll-driven-toggle-input:checked) .scroll-driven-row {
        animation: none;
      }
    }
  }

  .scroll-driven-note {
    font-size: var(--text-sm);
    color: var(--color-text-subtle);
  }

  @keyframes scroll-driven-grow {
    from {
      transform: scaleX(0);
    }

    to {
      transform: scaleX(1);
    }
  }

  @keyframes scroll-driven-reveal {
    from {
      opacity: 0;
      translate: 0 1.5rem;
    }
  }
}
</style>
