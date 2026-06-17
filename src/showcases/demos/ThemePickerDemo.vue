<template>
  <div class="tp-demo">
    <p class="tp-caption">
      Pick an accent and drag its lightness. The engine derives the whole
      palette from that one seed — and a <strong>pure-CSS clamp</strong> snaps
      the lightness out of the “muddy middle” into a range where the button
      label is guaranteed to hit WCAG AA. You can’t drag it into an
      inaccessible state; flip <em>bypass</em> to see what that would look like.
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

    <dl class="tp-report" :class="{ 'is-fail': report.fails }">
      <div class="tp-stat">
        <dt>Picked</dt>
        <dd>{{ pickL }}% L</dd>
      </div>
      <div class="tp-stat">
        <dt>Applied</dt>
        <dd>{{ report.appliedPct }}% L</dd>
      </div>
      <div class="tp-stat">
        <dt>Label contrast</dt>
        <dd>{{ report.ratio }}:1 · {{ report.verdict }}</dd>
      </div>
    </dl>
    <p class="tp-note" role="status">{{ report.message }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

import AppButton from '../../components/AppButton/AppButton.vue'

// Fixed chroma keeps the demo focused on the lightness↔contrast relationship
// (and stays mostly in sRGB gamut). Mirrors the value used in the stylesheet.
const CHROMA = 0.15
// Lightness threshold the engine uses to flip the label black/white, and the
// safe bounds the clamp snaps to. Mirrors .tp-preview in the stylesheet.
const FLIP = 0.62
const DARK_MAX = 0.45 // darkest-safe ceiling for a white label
const LIGHT_MIN = 0.78 // lightest-safe floor for a black label

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

// OKLCH → linear sRGB (the standard OKLab matrices), for an honest contrast
// read-out. Out-of-gamut channels are clipped to [0,1], which approximates
// the browser's gamut mapping closely enough for a teaching figure.
function oklchToLinear(L: number, C: number, hDeg: number): number[] {
  const h = (hDeg * Math.PI) / 180
  const a = C * Math.cos(h)
  const b = C * Math.sin(h)
  const l_ = L + 0.3963377774 * a + 0.2158037573 * b
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b
  const s_ = L - 0.0894841775 * a - 1.291485548 * b
  const l = l_ ** 3
  const m = m_ ** 3
  const s = s_ ** 3
  return [
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
  ]
}
function relLuminance(L: number, C: number, h: number): number {
  const [r, g, b] = oklchToLinear(L, C, h).map((v) => Math.min(1, Math.max(0, v)))
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}
function contrast(a: number, b: number): number {
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05)
}

const report = computed(() => {
  const raw = pickL.value / 100
  const safe = raw < FLIP ? Math.min(raw, DARK_MAX) : Math.max(raw, LIGHT_MIN)
  const applied = bypass.value ? raw : safe

  const bgLum = relLuminance(applied, CHROMA, pickH.value)
  // The label flips to white below the threshold, black above — same rule the
  // engine applies to --color-primary-text.
  const textLum = applied < FLIP ? 1 : 0
  const ratio = contrast(textLum, bgLum)
  const pass = ratio >= 4.5

  return {
    appliedPct: Math.round(applied * 100),
    ratio: ratio.toFixed(2),
    verdict: pass ? 'AA ✓' : 'fails AA',
    fails: !pass,
    message: bypass.value
      ? pass
        ? 'Unclamped — and this particular pick happens to pass.'
        : 'Unclamped: a mid-lightness accent can’t make a readable label against black or white. Turn the clamp back on.'
      : 'Clamped into the safe range — the label meets WCAG AA at every hue.',
  }
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
