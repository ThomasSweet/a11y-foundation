/**
 * Criteria registry — the "guidelines, alive" section.
 *
 * Each entry is a WCAG success criterion that this foundation already
 * satisfies, paired with a live demo whose compliance can be toggled OFF
 * (the "break it" switch in CriterionFrame) so the visitor *feels* what the
 * criterion prevents — not just reads its definition.
 *
 * To add a criterion:
 *   1. Build a demo in ./demos/ that is compliant by default and accepts a
 *      `broken` prop; in its scoped styles, an `.is-broken` block regresses
 *      ONLY the behaviour this criterion governs (keep semantics intact).
 *   2. Add an entry here. App.vue renders the list.
 *
 * Scope discipline: prefer criteria that (a) the foundation already
 * implements and (b) are recent additions (WCAG 2.1 / 2.2) — the "new"
 * material that design-system docs rarely cover. Don't try to cover all
 * ~80 criteria.
 *
 * Sources: https://www.w3.org/WAI/WCAG22/Understanding/
 */

import TargetSizeDemo from './demos/TargetSizeDemo.vue'
import ReflowDemo from './demos/ReflowDemo.vue'
import NonTextContrastDemo from './demos/NonTextContrastDemo.vue'
import FocusObscuredDemo from './demos/FocusObscuredDemo.vue'
import FocusAppearanceDemo from './demos/FocusAppearanceDemo.vue'
import AnimationDemo from './demos/AnimationDemo.vue'
import OrientationDemo from './demos/OrientationDemo.vue'
import type { Component } from 'vue'

export interface Criterion {
  id: string
  name: string
  level: 'A' | 'AA' | 'AAA'
  version: string
  principle: 'Perceivable' | 'Operable' | 'Understandable' | 'Robust'
  requirement: string
  breakLabel?: string
  restoreLabel?: string
  passText: string
  failText: string
  links?: { label: string; href: string }[]
  component: Component
}

export const criteria: Criterion[] = [
  {
    id: '2.5.8',
    name: 'Target Size (Minimum)',
    level: 'AA',
    version: 'WCAG 2.2',
    principle: 'Operable',
    requirement:
      'Pointer targets are at least 24×24 CSS pixels, unless spacing or an ' +
      'equivalent alternative makes them easy to activate. Added in WCAG ' +
      '2.2 (2023) — small targets hurt people with motor impairments and ' +
      'anyone on a moving bus.',
    breakLabel: 'Break this rule',
    restoreLabel: 'Restore compliance',
    passText:
      'Meets 2.5.8 — comfortably sized (44px here; the AA floor is 24px) ' +
      'and spaced, so the controls are easy to hit.',
    failText:
      '⚠ Failing 2.5.8 — the controls are now ~16px and touching, so ' +
      'they’re easy to mis-tap. Feel how much harder the toolbar is to use.',
    links: [
      {
        label: 'WCAG: Understanding 2.5.8',
        href: 'https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html',
      },
    ],
    component: TargetSizeDemo,
  },
  {
    id: '1.4.10',
    name: 'Reflow',
    level: 'AA',
    version: 'WCAG 2.1',
    principle: 'Perceivable',
    requirement:
      'Content reflows into a single column at 320 CSS pixels (≈400% zoom ' +
      'on a 1280px screen) with no loss of information and no two-' +
      'dimensional scrolling. Added in WCAG 2.1 (2018) — for low-vision ' +
      'users who magnify heavily.',
    breakLabel: 'Break this rule',
    restoreLabel: 'Restore compliance',
    passText:
      'Meets 1.4.10 — the layout reflows to one column and fits the narrow ' +
      'viewport. Only vertical scrolling, however tight the space.',
    failText:
      '⚠ Failing 1.4.10 — fixed widths push the content past the viewport, ' +
      'so you must scroll horizontally to read. At 400% zoom that makes it ' +
      'unusable.',
    links: [
      {
        label: 'WCAG: Understanding 1.4.10',
        href: 'https://www.w3.org/WAI/WCAG22/Understanding/reflow.html',
      },
    ],
    component: ReflowDemo,
  },
  {
    id: '1.4.11',
    name: 'Non-text Contrast',
    level: 'AA',
    version: 'WCAG 2.1',
    principle: 'Perceivable',
    requirement:
      'The visual boundaries and states of UI components (and meaningful ' +
      'graphics) need at least 3:1 contrast against adjacent colors. Added ' +
      'in WCAG 2.1 (2018) — so controls stay perceivable for low-vision ' +
      'users and in glare or poor lighting.',
    breakLabel: 'Break this rule',
    restoreLabel: 'Restore compliance',
    passText:
      'Meets 1.4.11 — the control borders sit at ~3.5:1 against the ' +
      'background, so every field, button, and chip is clearly delineated.',
    failText:
      '⚠ Failing 1.4.11 — the borders drop to ~1.2:1 and melt into the ' +
      'background. The controls still work, but you can’t see where they ' +
      'are. (Forced-colors mode would override this — a separate safety net.)',
    links: [
      {
        label: 'WCAG: Understanding 1.4.11',
        href: 'https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html',
      },
    ],
    component: NonTextContrastDemo,
  },
  {
    id: '2.4.11',
    name: 'Focus Not Obscured (Minimum)',
    level: 'AA',
    version: 'WCAG 2.2',
    principle: 'Operable',
    requirement:
      'When an element receives keyboard focus, it is not entirely hidden ' +
      'by author-created content like a sticky header. Added in WCAG 2.2 ' +
      '(2023) — sticky bars routinely swallow the focused control, ' +
      'stranding keyboard users.',
    breakLabel: 'Break this rule',
    restoreLabel: 'Restore compliance',
    passText:
      'Meets 2.4.11 — scroll-margin keeps each focused link clear of the ' +
      'sticky bar, so the focus ring is always visible.',
    failText:
      '⚠ Failing 2.4.11 — links tabbed to near the top scroll flush under ' +
      'the sticky bar, hiding the focus ring. Tab through and watch your ' +
      'focus disappear behind it.',
    links: [
      {
        label: 'WCAG: Understanding 2.4.11',
        href: 'https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html',
      },
    ],
    component: FocusObscuredDemo,
  },
  {
    id: '2.4.13',
    name: 'Focus Appearance',
    level: 'AAA',
    version: 'WCAG 2.2',
    principle: 'Operable',
    requirement:
      'The keyboard focus indicator is large enough and contrasts enough to ' +
      'be easily seen. Added in WCAG 2.2 (2023) at level AAA — a focus ring ' +
      'that technically exists but is faint still fails real keyboard users.',
    breakLabel: 'Break this rule',
    restoreLabel: 'Restore compliance',
    passText:
      'Meets 2.4.13 — a thick, offset, high-contrast ring (the project’s ' +
      'focus tokens) that’s impossible to miss.',
    failText:
      '⚠ Failing 2.4.13 — the indicator shrinks to a faint 1px line with no ' +
      'offset. Focus still moves, but you have to hunt for it.',
    links: [
      {
        label: 'WCAG: Understanding 2.4.13',
        href: 'https://www.w3.org/WAI/WCAG22/Understanding/focus-appearance.html',
      },
    ],
    component: FocusAppearanceDemo,
  },
  {
    id: '2.3.3',
    name: 'Animation from Interactions',
    level: 'AAA',
    version: 'WCAG 2.1',
    principle: 'Operable',
    requirement:
      'Motion animation triggered by interaction can be turned off, unless ' +
      'the motion is essential. Added in WCAG 2.1 (2018) at level AAA — ' +
      'large transitions trigger nausea and vertigo for people with ' +
      'vestibular disorders.',
    breakLabel: 'Break this rule',
    restoreLabel: 'Restore compliance',
    passText:
      'Meets 2.3.3 — when reduced motion is preferred (the toggle, or your ' +
      'OS setting), the panel just appears; the slide is removed.',
    failText:
      '⚠ Failing 2.3.3 — the panel slides on every reload even with reduced ' +
      'motion preferred. Turn on the simulated preference and reload: it ' +
      'keeps moving.',
    links: [
      {
        label: 'WCAG: Understanding 2.3.3',
        href: 'https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html',
      },
    ],
    component: AnimationDemo,
  },
  {
    id: '1.3.4',
    name: 'Orientation',
    level: 'AA',
    version: 'WCAG 2.1',
    principle: 'Perceivable',
    requirement:
      'Content does not lock to a single display orientation — portrait or ' +
      'landscape — unless essential. Added in WCAG 2.1 (2018) — people whose ' +
      'device is mounted in a fixed orientation (e.g. on a wheelchair) can’t ' +
      'just rotate it.',
    breakLabel: 'Break this rule',
    restoreLabel: 'Restore compliance',
    passText:
      'Meets 1.3.4 — the app works in both portrait and landscape. Rotate ' +
      'the device and the content simply adapts.',
    failText:
      '⚠ Failing 1.3.4 — in portrait the app blocks you with “rotate your ' +
      'device”. Anyone whose device is fixed in portrait is locked out.',
    links: [
      {
        label: 'WCAG: Understanding 1.3.4',
        href: 'https://www.w3.org/WAI/WCAG22/Understanding/orientation.html',
      },
    ],
    component: OrientationDemo,
  },
]


/* ===========================================================================
   WCAG timeline — the narrative spine. Each era groups the criteria above by
   their `version`; eras with no demos (the 2.0 foundation, the 3.0 draft)
   carry a `note` instead. This is what turns the flat list into the "watch
   the standard grow" story.
=========================================================================== */

export interface WcagEra {
  id: string
  label: string
  year: string
  summary: string
  /** Matches Criterion.version for grouping; null for eras with no demos. */
  version: string | null
  /** Shown when the era has no demo criteria of its own. */
  note?: string
}

export const wcagTimeline: WcagEra[] = [
  {
    id: 'wcag20',
    label: 'WCAG 2.0',
    year: '2008',
    version: null,
    summary:
      'The bedrock — the four POUR principles everything since still rests on.',
    note: 'No demo here: 2.0 is the foundation the criteria below extend.',
  },
  {
    id: 'wcag21',
    label: 'WCAG 2.1',
    year: '2018',
    version: 'WCAG 2.1',
    summary:
      'The mobile and low-vision era — smartphones and magnification forced ' +
      'the standard to grow.',
  },
  {
    id: 'wcag22',
    label: 'WCAG 2.2',
    year: '2023',
    version: 'WCAG 2.2',
    summary:
      'Focus visibility, dragging alternatives, target size, and cognitive / ' +
      'authentication needs.',
  },
  {
    id: 'wcag30',
    label: 'WCAG 3.0',
    year: 'draft',
    version: null,
    summary:
      'The next chapter — from binary A/AA/AAA pass-fail toward graded, ' +
      'outcome-based scoring.',
    note: 'Still a working draft: a different model, not just more criteria.',
  },
]
