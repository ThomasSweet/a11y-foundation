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
    id: 'media-pseudo-classes-baseline',
    date: '2026-08-25',
    area: 'Showcase',
    title: 'Media state pseudo-classes reach Baseline',
    lead: 'Chrome 152 shipped the ',
    linkText: 'media state pseudo-classes',
    href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:playing',
    tail: ', the third engine, so :playing and :paused now work everywhere without script.',
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
