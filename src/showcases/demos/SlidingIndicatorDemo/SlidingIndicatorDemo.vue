<template>
  <div class="slide-demo">
    <p class="slide-caption">
      A view switcher where the pill slides between options as one continuous
      object — no per-item opacity fade. It's pure CSS: <code>:has()</code>
      reads which radio is checked and the motion tokens drive the slide
      (so it's instant under reduced motion). Real radios underneath —
      arrow-key navigable and announced as a radio group.
    </p>

    <fieldset class="segmented">
      <legend class="visually-hidden">Choose a view</legend>
      <div class="segmented-track" :style="{ '--n': options.length }">
        <span class="segmented-indicator" aria-hidden="true"></span>
        <label v-for="opt in options" :key="opt" class="segmented-opt">
          <input
            v-model="view"
            type="radio"
            :name="groupName"
            :value="opt"
            class="visually-hidden"
          />
          <span class="segmented-label">{{ opt }}</span>
        </label>
      </div>
    </fieldset>
  </div>
</template>

<script setup lang="ts">
import { ref, useId } from 'vue'

const groupName = useId()
const options = ['List', 'Grid', 'Board']
const view = ref(options[0])
</script>

<style scoped lang="scss">
@layer components {
  .slide-demo {
    display: grid;
    gap: var(--space-4);
  }

  .slide-caption {
    font-size: var(--text-sm);
    color: var(--color-text-subtle);
  }

  .segmented {
    margin: 0;
    padding: 0;
    border: 0;
  }

  .segmented-track {
    position: relative;
    display: grid;
    grid-template-columns: repeat(var(--n), 1fr);
    justify-self: start;
    padding: var(--space-1);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-full);
    background-color: var(--color-bg-subtle);

    @include high-contrast {
      border-color: currentcolor;
    }
  }

  /* The one continuous object. Its width is a single cell; translating by
     i × 100% steps it from option to option. The transition uses a motion
     token, which preferences.css zeroes under reduced motion — so the slide
     becomes an instant jump with no per-component override. */
  .segmented-indicator {
    position: absolute;
    z-index: 0;
    inset-block: var(--space-1);
    inset-inline-start: var(--space-1);
    inline-size: calc((100% - var(--space-2)) / var(--n));
    border-radius: var(--radius-full);
    background-color: var(--color-surface);
    box-shadow: var(--shadow-sm);
    transform: translateX(calc(var(--i, 0) * 100%));
    transition: transform var(--duration-normal) var(--easing-standard);

    @include forced-colors {
      border: 1px solid ButtonText;
    }
  }

  /* :has() maps the checked radio to the indicator's slot index. */
  .segmented-track:has(.segmented-opt:nth-of-type(1) input:checked) { --i: 0; }
  .segmented-track:has(.segmented-opt:nth-of-type(2) input:checked) { --i: 1; }
  .segmented-track:has(.segmented-opt:nth-of-type(3) input:checked) { --i: 2; }
  .segmented-track:has(.segmented-opt:nth-of-type(4) input:checked) { --i: 3; }

  .segmented-opt {
    position: relative;
    z-index: 1;
    display: grid;
    place-items: center;
    min-block-size: 40px;
    padding-inline: var(--space-4);
    border-radius: var(--radius-full);
    cursor: pointer;

    /* Focus ring rides on the option, since the radio itself is hidden. */
    &:has(input:focus-visible) {
      outline: var(--focus-ring-width) solid var(--focus-ring-color);
      outline-offset: 2px;
    }
  }

  .segmented-label {
    font-size: var(--text-sm);
    font-weight: 500;
    color: var(--color-text-subtle);
  }

  /* The selected option's label firms up — state isn't carried by the pill
     position alone. */
  .segmented-opt:has(input:checked) .segmented-label {
    font-weight: 600;
    color: var(--color-text);
  }
}
</style>
