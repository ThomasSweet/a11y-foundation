<template>
  <div class="anchor-demo">
    <!-- popover + popovertarget: open/close, Esc-to-dismiss, light
         dismiss, and aria-expanded all come from the platform — zero JS.
         Attributes fall through to AppButton's <button>. -->
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
        and <code>position-try-fallbacks</code> flips it when there's no
        room. Without support, it falls back to the popover default
        (centered), still fully functional.
      </p>
    </div>
  </div>
</template>

<script setup>
import { useId } from 'vue'

import AppButton from '../../components/AppButton.vue'

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
      position: absolute;
      position-anchor: --showcase-anchor;
      position-area: block-end span-inline-end;
      position-try-fallbacks: flip-block;
      margin-block-start: var(--space-2);
    }

    @include high-contrast {
      border-color: currentcolor;
    }
  }
}
</style>
