<template>
  <div class="tp-demo">
    <p class="tp-caption">
      Pick an accent and drag its lightness. The whole palette is derived from
      that one seed, and the button label is protected <strong>two ways</strong>:
      a <strong>pure-CSS clamp</strong> keeps even the plain black/white
      <em>fallback</em> at WCAG AA, and <code>contrast-color()</code> (where
      supported) picks the best label on top. Flip <em>bypass</em> to drop the
      clamp and watch the fallback fail — while <code>contrast-color()</code>
      quietly rescues the rendered label.
    </p>

    <div class="tp-grid">
      <div class="tp-controls">
        <label class="tp-field">
          <span class="tp-label">
            Accent hue <output class="tp-out">{{ pickH }}°</output>
          </span>
          <input
            v-model.number="pickH"
            class="tp-range tp-hue"
            type="range"
            min="0"
            max="360"
            step="1"
          />
        </label>

        <label class="tp-field">
          <span class="tp-label">
            Accent lightness <output class="tp-out">{{ pickL }}%</output>
          </span>
          <input
            v-model.number="pickL"
            class="tp-range"
            type="range"
            min="0"
            max="100"
            step="1"
          />
        </label>

        <label class="tp-check">
          <input v-model="bypass" type="checkbox" />
          Bypass the safety clamp
        </label>

        <div class="tp-presets">
          <span class="tp-presets-label">CVD-robust presets</span>
          <div class="tp-chips">
            <button
              v-for="p in presets"
              :key="p.name"
              type="button"
              class="tp-chip"
              @click="apply(p)"
            >
              {{ p.name }}
            </button>
          </div>
        </div>
      </div>

      <!-- Live preview. Only --pick-* and --bypass are set inline; the clamp
           math and --seed-accent live in CSS, so the theme really is derived
           in the cascade, not in JS. -->
      <article
        class="surface tp-preview"
        :style="{ '--pick-h': pickH, '--pick-l': pickL, '--bypass': bypass ? 1 : 0 }"
      >
        <p class="surface-title">Live preview</p>
        <p class="surface-text">Body copy and a primary action, themed from one seed.</p>
        <div class="tp-actions">
          <AppButton variant="primary">Primary</AppButton>
          <AppButton variant="secondary">Secondary</AppButton>
        </div>
      </article>
    </div>

    <dl class="tp-report" :class="{ 'is-fail': !report.fallback.passes }">
      <div class="tp-stat">
        <dt>Applied</dt>
        <dd>{{ report.appliedPct }}% L</dd>
      </div>
      <div class="tp-stat">
        <dt>Fallback label</dt>
        <dd>{{ report.fallback.ratio }}:1 · {{ report.fallback.passes ? 'AA ✓' : 'fails AA' }}</dd>
      </div>
      <div v-if="supportsContrastColor" class="tp-stat">
        <dt>Rendered (<code>contrast-color</code>)</dt>
        <dd>{{ report.rendered.ratio }}:1 · {{ report.rendered.passes ? 'AA ✓' : 'fails AA' }}</dd>
      </div>
    </dl>
    <p class="tp-note" role="status">{{ note }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

import AppButton from '../../components/AppButton/AppButton.vue'
// The contrast maths lives in a sibling module so it can be unit-tested; this
// component just feeds it the picked values (see themePickerMath.test.ts).
import { assessPick } from './themePickerMath'

const pickH = ref(265)
const pickL = ref(60) // starts inside the dead zone, so the clamp visibly acts
const bypass = ref(false)

// Accents mirror the .theme-* CVD presets in theming.css (the picker varies
// only the accent, so the surface stays the default here).
const presets = [
  { name: 'Cobalt', h: 255, l: 48 },
  { name: 'Teal', h: 195, l: 45 },
  { name: 'Amber', h: 80, l: 82 },
]
function apply(p: { h: number; l: number }) {
  pickH.value = p.h
  pickL.value = p.l
  bypass.value = false
}

const report = computed(() =>
  assessPick({ h: pickH.value, l: pickL.value, bypass: bypass.value }),
)

// Detect the second safety net so the read-out can be honest about what THIS
// browser paints: with contrast-color() the rendered label is best-of-black/
// white; without it, the plain fallback flip is all there is.
const supportsContrastColor =
  typeof CSS !== 'undefined' && CSS.supports('color', 'contrast-color(red)')

const note = computed(() => {
  const r = report.value
  if (!r.bypassed) {
    return 'Clamped into the safe range — even the black/white fallback meets WCAG AA at every hue, with no help from contrast-color().'
  }
  if (r.fallback.passes) {
    return 'Unclamped — this particular pick’s fallback happens to pass too.'
  }
  return supportsContrastColor
    ? 'Unclamped: the black/white fallback can’t reach AA here, so contrast-color() is rescuing the rendered label in this browser — but the clamp is what guarantees it everywhere, support or not. Turn the clamp back on.'
    : 'Unclamped: the black/white fallback can’t reach AA here, and this browser has no contrast-color() to fall back on, so the label really is failing. Turn the clamp back on.'
})
</script>

<style scoped lang="scss">
@layer components {
  .tp-demo {
    display: grid;
    gap: var(--space-4);
  }

  .tp-caption {
    font-size: var(--text-sm);
    color: var(--color-text-subtle);
  }

  .tp-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 15rem), 1fr));
    gap: var(--space-4);
    align-items: start;
  }

  .tp-controls {
    display: grid;
    gap: var(--space-4);
    align-content: start;
  }

  .tp-field {
    display: grid;
    gap: var(--space-2);
  }

  .tp-label {
    display: flex;
    justify-content: space-between;
    gap: var(--space-2);
    font-size: var(--text-sm);
    font-weight: 600;
  }

  .tp-out {
    font-family: var(--font-mono);
    font-weight: 400;
    color: var(--color-text-subtle);
  }

  .tp-range {
    inline-size: 100%;
    accent-color: var(--color-primary);
  }

  /* A hue wheel as the track — communicates what the slider controls. */
  .tp-hue {
    block-size: 0.5rem;
    border-radius: var(--radius-full);
    appearance: none;
    background: linear-gradient(
      to right,
      oklch(65% 0.15 0deg),
      oklch(65% 0.15 60deg),
      oklch(65% 0.15 120deg),
      oklch(65% 0.15 180deg),
      oklch(65% 0.15 240deg),
      oklch(65% 0.15 300deg),
      oklch(65% 0.15 360deg)
    );

    @include forced-colors {
      background: ButtonText;
    }
  }

  .tp-check {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    font-size: var(--text-sm);
  }

  .tp-presets {
    display: grid;
    gap: var(--space-2);
  }

  .tp-presets-label {
    font-size: var(--text-sm);
    font-weight: 600;
  }

  .tp-chips {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-2);
  }

  .tp-chip {
    padding: var(--space-1) var(--space-3);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-full);
    background-color: var(--color-surface);
    color: var(--color-text);
    font: inherit;
    font-size: var(--text-sm);
    cursor: pointer;

    @include can-hover {
      &:hover {
        background-color: var(--color-bg-subtle);
      }
    }

    @include high-contrast {
      border-color: currentcolor;
    }
  }

  /* The live preview surface. We set ONLY the picked inputs inline; everything
     below is the cascade doing the work:
       1. raw lightness from the slider (0–1),
       2. a step (no JS) that's 1 when the accent is on the dark side,
       3. snap a mid-range pick to the nearest safe extreme — dark accents cap
          at DARK_MAX (white label safe), light accents floor at LIGHT_MIN
          (black label safe); the muddy middle is squeezed out,
       4. bypass blends back to the raw value to expose the unsafe pick.
     Overriding --seed-accent here (components layer) beats theming.css's
     default (themes layer), and the engine's derivations pick it up. */
  .tp-preview {
    --raw-l: calc(var(--pick-l) / 100);
    /* A big multiplier turns the sign of (0.62 − L) into a 0/1 step. */
    --is-dark: clamp(0, (0.62 - var(--raw-l)) * 100000, 1);
    --safe-l: calc(var(--is-dark) * min(var(--raw-l), 0.45) + (1 - var(--is-dark)) * max(var(--raw-l), 0.78));
    --final-l: calc(
      var(--bypass) * var(--raw-l) + (1 - var(--bypass)) * var(--safe-l)
    );
    --seed-accent: oklch(var(--final-l) 0.15 var(--pick-h));

    display: grid;
    gap: var(--space-2);
    align-content: start;
  }

  .tp-actions {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-2);
    margin-block-start: var(--space-1);
  }

  .tp-report {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-2) var(--space-6);
    margin: 0;
    padding: var(--space-3);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    background-color: var(--color-bg-subtle);

    &.is-fail {
      border-color: var(--color-error);
    }
  }

  .tp-stat {
    display: grid;
    gap: 2px;

    dt {
      font-size: var(--text-sm);
      color: var(--color-text-subtle);
    }

    dd {
      margin: 0;
      font-family: var(--font-mono);
      font-weight: 600;
    }
  }

  .tp-note {
    font-size: var(--text-sm);
    color: var(--color-text-subtle);
  }
}
</style>
