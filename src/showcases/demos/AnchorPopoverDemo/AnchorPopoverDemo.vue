<template>
  <div class="anchor-demo">
    <!-- popover + popovertarget: open/close, Esc, light-dismiss, aria-expanded
         all from the platform — zero JS. Attrs fall through to AppButton's <button>. -->
    <AppButton
      variant="secondary"
      class="anchor-trigger"
      :popovertarget="popoverId"
    >
      Toggle popover
    </AppButton>

    <div :id="popoverId" popover class="anchor-panel">
      <p>
        With anchor positioning, this panel is tethered to the button —
        and <code>position-try-fallbacks</code> flips it across any
        viewport edge it would otherwise overflow (try scrolling it to a
        corner). Without support, it falls back to the popover default
        (centered), still fully functional.
      </p>
    </div>
  </div>
</template>

<script setup>
import { useId } from 'vue'

import AppButton from '../../../components/AppButton/AppButton.vue'

const popoverId = useId()
</script>

<style scoped lang="scss">
@layer components {
  .anchor-trigger {
    anchor-name: --showcase-anchor;
  }

  .anchor-panel {
    /* Base styles double as the fallback presentation: an unanchored
       popover uses the UA default (fixed, centered) and stays usable. */
    max-inline-size: 36ch;
    padding: var(--space-3) var(--space-4);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    background-color: var(--color-surface);
    box-shadow: var(--shadow-md);
    font-size: var(--text-sm);

    /* The enhancement, only where the feature exists. */
    @supports (anchor-name: --a) {
      /* Keep `position: fixed`, NOT absolute. Absolute would resolve against
         .app-shell (positioned, full-page-tall), so the panel never overflows
         the viewport edge and the flip fallbacks never fire. */
      position: fixed;
      position-anchor: --showcase-anchor;
      position-area: block-end span-inline-end;
      /* Clear the UA centering (inset:0; margin:auto) or it fights position-area. */
      inset: auto;
      /* Try until one fits: flip block, flip inline, then both for the corner. */
      position-try-fallbacks: flip-block, flip-inline, flip-block flip-inline;
      margin: var(--space-2) 0 0;
    }

    @include high-contrast {
      border-color: currentcolor;
    }
  }
}
</style>
