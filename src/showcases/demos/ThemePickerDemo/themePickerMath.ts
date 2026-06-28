/**
 * themePickerMath — the colour math behind ThemePickerDemo's contrast read-out.
 * Extracted so it can be unit-tested in isolation (it backs the demo's promise
 * that the lightness clamp keeps the label at WCAG AA for any hue). The clamp
 * itself runs in CSS (.theme-picker-preview); this mirrors it in JS only to
 * compute an honest read-out.
 */

// Fixed chroma keeps the demo focused on the lightness↔contrast relationship
// (and stays mostly in sRGB gamut). Mirrors the value used in the stylesheet.
export const CHROMA = 0.15
// Lightness threshold the engine uses to flip the label black/white, and the
// safe bounds the clamp snaps to. Mirrors .theme-picker-preview in the stylesheet.
export const FLIP = 0.62
export const DARK_MAX = 0.45 // darkest-safe ceiling for a white label
export const LIGHT_MIN = 0.78 // lightest-safe floor for a black label

// OKLCH → linear sRGB (the standard OKLab matrices), for an honest contrast
// read. Out-of-gamut channels are clipped to [0,1], which approximates the
// browser's gamut mapping closely enough for a teaching figure.
export function oklchToLinear(L: number, C: number, hDeg: number): number[] {
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

export function relLuminance(L: number, C: number, h: number): number {
  const [r, g, b] = oklchToLinear(L, C, h).map((v) => Math.min(1, Math.max(0, v)))
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

export function contrast(a: number, b: number): number {
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05)
}

export interface ContrastResult {
  ratio: string // e.g. "4.03"
  passes: boolean // ≥ 4.5:1 (WCAG AA, normal text)
}

export interface PickReport {
  appliedPct: number
  bypassed: boolean
  // The FALLBACK path: a plain black/white label (the engine's flip, used where
  // contrast-color() isn't supported). This is the path the lightness clamp
  // exists to keep safe — so its pass/fail is the demo's real subject.
  fallback: ContrastResult
  // What a contrast-color()-capable browser actually PAINTS: whichever of
  // black/white contrasts best. A second safety net layered on top of the clamp
  // — which is why the rendered button can look fine even when `fallback` fails.
  rendered: ContrastResult
}

function result(ratio: number): ContrastResult {
  return { ratio: ratio.toFixed(2), passes: ratio >= 4.5 }
}

/**
 * Assess a picked accent (hue + lightness %, clamp on/off): snap a mid-range
 * pick to the nearest safe extreme unless the clamp is bypassed, then report
 * BOTH the fallback (black/white flip) contrast and the contrast-color()
 * (best-of-black/white) contrast for the resulting label.
 */
export function assessPick({
  h,
  l,
  bypass,
}: {
  h: number
  l: number
  bypass: boolean
}): PickReport {
  const raw = l / 100
  const safe = raw < FLIP ? Math.min(raw, DARK_MAX) : Math.max(raw, LIGHT_MIN)
  const applied = bypass ? raw : safe

  const bgLum = relLuminance(applied, CHROMA, h)
  const white = contrast(1, bgLum)
  const black = contrast(0, bgLum)

  return {
    appliedPct: Math.round(applied * 100),
    bypassed: bypass,
    // The flip picks white below the threshold, black above — same rule the
    // engine applies to --color-primary-text in the no-contrast-color path.
    fallback: result(applied < FLIP ? white : black),
    // contrast-color() picks whichever side contrasts more.
    rendered: result(Math.max(white, black)),
  }
}
