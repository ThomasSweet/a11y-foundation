export type RevisionArea = 'Standard' | 'Craft' | 'Showcase' | 'Proof' | 'Site'

export interface Revision {
  id: string
  date: string
  area: RevisionArea
  title: string
  lead: string
  linkText: string
  href: string
  tail: string
}

export const revisionsShown = 6

export const revisions: Revision[] = [
  {
    id: 'glass-contrast',
    date: '2026-10-12',
    area: 'Craft',
    title: 'Glass that keeps its contrast',
    lead: 'A new craft section on ',
    linkText: 'glass surfaces',
    href: '/craft.html#craft-glass',
    tail: ': the alpha of the tint decides whether text on a translucent bar stays readable, and the site’s own glass token went up to 90% after it was measured.',
  },
  {
    id: 'more-contrast',
    date: '2026-10-12',
    area: 'Craft',
    title: 'More contrast, on request',
    lead: 'A new craft section on ',
    linkText: 'prefers-contrast',
    href: '/craft.html#craft-more-contrast',
    tail: ': tick one box to see what Increase Contrast on macOS and iOS changes here, and copy the token overrides that do it.',
  },
  {
    id: 'contained-focus-ring',
    date: '2026-10-12',
    area: 'Craft',
    title: 'Containment clips the focus ring',
    lead: 'The ',
    linkText: 'defensive layouts section',
    href: '/craft.html#craft-defensive',
    tail: ' gained a figure: paint containment, content-visibility and overflow all cut a focus ring at the padding edge, and padding of ring width plus offset keeps it whole.',
  },
  {
    id: 'customizable-select-safari-27',
    date: '2026-09-14',
    area: 'Showcase',
    title: 'Safari 27 ships Customizable <select>',
    lead: 'Safari 27 ships ',
    linkText: 'Customizable <select>',
    href: '/showcase.html#showcase-customizable-select',
    tail: ', so that showcase now runs in two engines.',
  },
  {
    id: 'submit-button-alive',
    date: '2026-09-21',
    area: 'Craft',
    title: 'Keep the submit button alive',
    lead: 'The ',
    linkText: 'validation section',
    href: '/craft.html#craft-validation',
    tail: ' now keeps its submit button live: dimmed while the form is invalid, a button looks dead from first paint, and disabled, it also takes away the browser’s own report of what is wrong.',
  },
  {
    id: 'scrollbar-tint',
    date: '2026-09-16',
    area: 'Craft',
    title: 'Scrollbars tinted, never thinned',
    lead: 'The craft chapter’s ',
    linkText: 'scrollbar section',
    href: '/craft.html#craft-scrollbar',
    tail: ' now tints every thumb on the site from the page’s own tokens at 3:1 and turns it to the accent while keyboard focus is inside, so the thumb says which region the arrow keys will scroll.',
  },
  {
    id: 'scroll-state-scrollable',
    date: '2026-09-16',
    area: 'Showcase',
    title: 'Scroll-state queries gain the scrollable state',
    lead: 'The ',
    linkText: 'scroll-state showcase',
    href: '/showcase.html#showcase-scroll-state',
    tail: ' gained its third state: a strip shades its edges only while there is more to scroll that way, a hint that never lies at the end.',
  },
  {
    id: 'listening-room',
    date: '2026-09-15',
    area: 'Proof',
    title: 'The listening room',
    lead: 'The ',
    linkText: 'listening room',
    href: '/listening-room.html',
    tail: ': a press kit a scanner passes, eleven barriers you hear before you see, answers included.',
  },
  {
    id: 'standards-map',
    date: '2026-09-13',
    area: 'Standard',
    title: 'The legal map became a standards map',
    lead: 'The legal map became a ',
    linkText: 'standards map',
    href: '/standard.html#demo-legal',
    tail: ': laws sit in the row of the WCAG version they cite, and each opens to show how many layers sit between it and the criterion you test.',
  },
  {
    id: 'scroll-reveal-motion-gate',
    date: '2026-09-18',
    area: 'Showcase',
    title: 'Scroll-driven reveals carry their own motion gate',
    lead: 'The ',
    linkText: 'scroll-driven animations showcase',
    href: '/showcase.html#showcase-scroll-driven-animations',
    tail: ' gained a reveal and the rule behind it: a global duration reset never reaches a scroll timeline, so every reveal needs its own prefers-reduced-motion gate.',
  },
  {
    id: 'wcag-3-september-draft',
    date: '2026-09-10',
    area: 'Standard',
    title: 'A new WCAG 3.0 working draft',
    lead: 'A new ',
    linkText: 'WCAG 3.0 working draft',
    href: 'https://www.w3.org/TR/2026/WD-wcag-3.0-20260910/',
    tail: ': one bar of core requirements, with supplemental requirements and assertions as extras you report. The timeline entry follows it.',
  },
  {
    id: 'en-301-549-v4',
    date: '2026-09-07',
    area: 'Standard',
    title: 'EN 301 549 V4.1.1 is published',
    lead: 'ETSI published ',
    linkText: 'EN 301 549 V4.1.1',
    href: 'https://accessible-eu-centre.ec.europa.eu/content-corner/news/european-accessibility-standard-en-301-549-has-been-updated-2026-09-07_en',
    tail: ', quoting WCAG 2.2 AA. Until the Official Journal cites it, 2.1 AA stays the bar on the map.',
  },
  {
    id: 'firefox-155-typed-attr',
    date: '2026-09-01',
    area: 'Showcase',
    title: 'Firefox 155 ships typed attr()',
    lead: 'Firefox 155 ships ',
    linkText: 'typed attr()',
    href: '/showcase.html#showcase-advanced-attr',
    tail: ', so that showcase now runs in two engines; Safari has it in Technology Preview.',
  },
  {
    id: 'audit-room',
    date: '2026-08-01',
    area: 'Proof',
    title: 'The audit room',
    lead: 'The ',
    linkText: 'audit room',
    href: '/audit-room.html',
    tail: ': a page broken on purpose, twelve barriers, answers included.',
  },
]
