/** Per-section reference links rendered by CraftLinks under each craft demo. */
export interface CraftLink {
  label: string
  href: string
}

export const craftLinks = {
  validation: [
    {
      label: 'MDN: :user-invalid',
      href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/:user-invalid',
    },
    {
      label: 'WCAG 3.3.1 Error Identification',
      href: 'https://www.w3.org/WAI/WCAG22/Understanding/error-identification.html',
    },
  ],
  lightDark: [
    {
      label: 'MDN: light-dark()',
      href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/light-dark',
    },
  ],
  dialog: [
    {
      label: 'MDN: <dialog>',
      href: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog',
    },
  ],
  motion: [
    {
      label: 'MDN: prefers-reduced-motion',
      href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion',
    },
    {
      label: 'WCAG 2.3.3 Animation from Interactions',
      href: 'https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html',
    },
  ],
  targets: [
    {
      label: 'WCAG 2.5.8 Target Size',
      href: 'https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html',
    },
    {
      label: 'MDN: forced-colors',
      href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/@media/forced-colors',
    },
  ],
  defensive: [
    {
      label: 'Defensive CSS (Ahmad Shadeed)',
      href: 'https://defensivecss.dev/',
    },
  ],
  contentStress: [
    {
      label: 'MDN: hyphens',
      href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/hyphens',
    },
    {
      label: 'MDN: logical properties',
      href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_logical_properties_and_values',
    },
  ],
  loading: [
    {
      label: 'MDN: aria-busy',
      href: 'https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-busy',
    },
  ],
  truncation: [
    {
      label: 'MDN: -webkit-line-clamp',
      href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/-webkit-line-clamp',
    },
    {
      label: 'MDN: ::details-content',
      href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/::details-content',
    },
  ],
  scrollbar: [
    {
      label: 'MDN: scrollbar-gutter',
      href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/scrollbar-gutter',
    },
    {
      label: 'WCAG 2.1.1 Keyboard',
      href: 'https://www.w3.org/WAI/WCAG22/Understanding/keyboard.html',
    },
  ],
  hiding: [
    {
      label: 'MDN: inert',
      href: 'https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/inert',
    },
    {
      label: 'WebAIM: invisible content',
      href: 'https://webaim.org/techniques/css/invisiblecontent/',
    },
  ],
  textSpacing: [
    {
      label: 'WCAG 1.4.12 Text Spacing',
      href: 'https://www.w3.org/WAI/WCAG22/Understanding/text-spacing.html',
    },
  ],
} satisfies Record<string, CraftLink[]>
