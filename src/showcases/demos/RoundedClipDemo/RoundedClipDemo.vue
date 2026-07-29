<template>
  <div class="rounded-clip-demo">
    <div class="rounded-clip-pair">
      <figure class="rounded-clip-half">
        <img
          class="rounded-clip-image"
          :src="exportedTag"
          alt="Detail A — a label exported as an image"
          width="132"
          height="36"
        />
        <figcaption class="rounded-clip-caption">
          The old way: an exported image. Switch the theme — it stays lit.
          Zoom — the text can't reflow. A translator can't touch it.
        </figcaption>
      </figure>

      <figure class="rounded-clip-half">
        <p class="rounded-clip-tag">Detail A</p>
        <figcaption class="rounded-clip-caption">
          Real text under a rounded clip. It re-inks with every theme, wraps
          under zoom, translates, and reads aloud.
        </figcaption>
      </figure>
    </div>

    <div class="rounded-clip-focus">
      <label class="rounded-clip-break">
        <input class="rounded-clip-break-input" type="checkbox" />
        Break it: clip the link element itself
      </label>

      <a
        class="rounded-clip-link"
        href="https://developer.mozilla.org/en-US/docs/Web/CSS/basic-shape/polygon"
      >
        <span class="rounded-clip-link-tag">Read the spec</span>
      </a>

      <p class="rounded-clip-note">
        Tab to the link: the ring follows the arrow because it is drawn on
        the unclipped <code>&lt;a&gt;</code> — drop-shadows tracing the
        clipped child's silhouette, something <code>outline</code> can never
        do. Break it and the clip, now on the link itself, cuts the ring
        away with everything else the element paints. The clip is the hit
        area too — a pointed tag is pointed for the pointer.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
/* A stand-in for a designer's asset export: baked colors, baked text. */
const exportedTag =
  'data:image/svg+xml,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="132" height="36">' +
      '<path d="M8 0 H118 L132 18 L118 36 H8 A8 8 0 0 1 0 28 V8 A8 8 0 0 1 8 0 Z" fill="#d8e4f7"/>' +
      '<text x="14" y="23" font-family="ui-monospace, SFMono-Regular, Menlo, monospace" font-size="13" letter-spacing="0.5" fill="#274b8f">DETAIL A</text>' +
      '</svg>',
  )
</script>

<style scoped lang="scss">
@layer components {
  .rounded-clip-demo {
    display: grid;
    gap: var(--space-6);
  }

  .rounded-clip-pair {
    display: grid;
    gap: var(--space-4);
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 14rem), 1fr));
  }

  .rounded-clip-half {
    display: grid;
    gap: var(--space-2);
    justify-items: start;
    margin: 0;
    min-inline-size: 0;
  }

  .rounded-clip-image {
    display: block;
  }

  .rounded-clip-caption,
  .rounded-clip-note {
    font-size: var(--text-sm);
    color: var(--color-text-subtle);
  }

  .rounded-clip-tag,
  .rounded-clip-link-tag {
    display: inline-block;
    margin: 0;
    padding: var(--space-1) var(--space-3);
    border-radius: var(--radius-md);
    background-color: color-mix(in oklab, var(--color-primary) 14%, var(--color-surface));
    font-family: var(--font-mono);
    font-size: var(--text-sm);
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: var(--color-text);

    @include forced-colors {
      border: 1px solid;
    }
  }

  @supports (clip-path: polygon(round 1px, 0 0, 1% 0, 0 1%)) {
    .rounded-clip-tag,
    .rounded-clip-link-tag {
      border-radius: 0;
      padding-inline-end: calc(var(--space-3) + 14px);
      clip-path: polygon(
        round 8px,
        0 0,
        calc(100% - 14px) 0,
        100% 50%,
        calc(100% - 14px) 100%,
        0 100%
      );

      /* Forced colors override the fill the shape is cut from — fall back
         to the bordered chip instead of an invisible outline. */
      @include forced-colors {
        border-radius: var(--radius-md);
        padding-inline-end: var(--space-3);
        clip-path: none;
      }
    }

    .rounded-clip-demo:has(.rounded-clip-break-input:checked) {
      .rounded-clip-link {
        clip-path: polygon(
          round 8px,
          0 0,
          calc(100% - 14px) 0,
          100% 50%,
          calc(100% - 14px) 100%,
          0 100%
        );

        @include forced-colors {
          clip-path: none;
        }
      }

      .rounded-clip-link-tag {
        clip-path: none;
      }
    }

    /* The ring that follows the shape: four drop-shadows on the UNclipped
       parent trace the child's clipped silhouette — outline draws the border
       box and never can. The preferences-layer ring beats any components
       outline: none by design, so it is re-inked transparent on this one
       element instead, with the visible colour captured on the parent first.
       Forced colors are excluded: the system ring stays in charge there.
       On the broken link the clip runs after filters, so even this ring is
       cut away — which is the lesson. */
    @media (forced-colors: none) {
      .rounded-clip-focus {
        --rounded-clip-ring: var(--focus-ring-color);
      }

      .rounded-clip-link:focus-visible {
        --focus-ring-color: transparent;

        filter: drop-shadow(var(--focus-ring-width) 0 0 var(--rounded-clip-ring))
          drop-shadow(calc(-1 * var(--focus-ring-width)) 0 0 var(--rounded-clip-ring))
          drop-shadow(0 var(--focus-ring-width) 0 var(--rounded-clip-ring))
          drop-shadow(0 calc(-1 * var(--focus-ring-width)) 0 var(--rounded-clip-ring));
      }
    }
  }

  .rounded-clip-focus {
    display: grid;
    gap: var(--space-3);
    justify-items: start;
  }

  .rounded-clip-break {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    font-size: var(--text-sm);
    font-weight: 600;

    /* Nested so the emitted rule always follows the display above —
       a sibling block at equal specificity loses to source order. */
    @supports not (clip-path: polygon(round 1px, 0 0, 1% 0, 0 1%)) {
      display: none;
    }
  }

  .rounded-clip-link {
    display: inline-block;
    text-decoration: none;
  }
}
</style>
