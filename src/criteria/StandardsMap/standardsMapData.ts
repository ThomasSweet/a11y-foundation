export interface MapLayer {
  kind: string
  name: string
  note: string
}

export interface MapLaw {
  id: string
  version: string
  region: string
  name: string
  stamp: string
  href: string
  link: string
  layers: MapLayer[]
}

export const sourcesRead = '13 September 2026'

export const rowNotes: Record<string, string> = {
  wcag20: 'Also ISO/IEC 40500:2012, the same text as an ISO standard.',
  wcag21: 'The version most binding law cites today.',
  wcag22: 'The current recommendation since 2023.',
  wcag30: 'Nothing to cite yet; the next draft is due late 2026.',
}

export const arriving: Record<string, string> = {
  wcag22:
    'The European Union moves here once EN 301 549 V4.1.1 is cited in the ' +
    'Official Journal, expected late 2026.',
}

export const emptyRow =
  'No law points here yet. Law lags the standard by five to fifteen years, ' +
  'which is why the rows above still carry every binding requirement.'

export const laws: MapLaw[] = [
  {
    id: 'section-508',
    version: 'WCAG 2.0',
    region: 'United States · federal',
    name: 'Section 508',
    stamp: 'WCAG 2.0 AA',
    href: 'https://www.section508.gov/',
    link: 'The 508 Standards on section508.gov',
    layers: [
      {
        kind: 'Law',
        name: 'Rehabilitation Act, section 508',
        note: 'Federal agencies must buy and build accessible ICT.',
      },
      {
        kind: 'Standard',
        name: 'Revised 508 Standards, 2017 refresh',
        note: 'Written by the US Access Board; they incorporate WCAG by reference.',
      },
      {
        kind: 'Core',
        name: 'WCAG 2.0, level AA',
        note: 'Three layers deep.',
      },
    ],
  },
  {
    id: 'aoda',
    version: 'WCAG 2.0',
    region: 'Canada · Ontario',
    name: 'AODA',
    stamp: 'WCAG 2.0 AA',
    href: 'https://www.ontario.ca/laws/regulation/110191',
    link: 'Ontario Regulation 191/11 on ontario.ca',
    layers: [
      {
        kind: 'Law',
        name: 'Accessibility for Ontarians with Disabilities Act',
        note:
          'Its web regulation names the standard itself, minus the live-caption ' +
          'and audio-description criteria.',
      },
      {
        kind: 'Core',
        name: 'WCAG 2.0, level AA',
        note: 'Two layers deep.',
      },
    ],
  },
  {
    id: 'eaa',
    version: 'WCAG 2.1',
    region: 'European Union · products and services',
    name: 'European Accessibility Act',
    stamp: 'WCAG 2.1 AA',
    href: 'https://eur-lex.europa.eu/eli/dir/2019/882/oj',
    link: 'Directive 2019/882 on EUR-Lex',
    layers: [
      {
        kind: 'National law',
        name: 'Germany: Barrierefreiheitsstärkungsgesetz',
        note: 'Each member state transposes the directive into its own act.',
      },
      {
        kind: 'EU directive',
        name: 'Directive (EU) 2019/882, applies since 28 June 2025',
        note:
          'Sets the obligation and presumes conformity when you meet the ' +
          'harmonised standard.',
      },
      {
        kind: 'Harmonised standard',
        name: 'EN 301 549 V3.2.1',
        note:
          'Clauses 9 to 11 quote WCAG. V4.1.1 quotes 2.2 AA and awaits its ' +
          'Official Journal citation.',
      },
      {
        kind: 'Core',
        name: 'WCAG 2.1, level AA',
        note: 'Four layers deep.',
      },
    ],
  },
  {
    id: 'ada-title-ii',
    version: 'WCAG 2.1',
    region: 'United States · state and local government',
    name: 'ADA Title II web rule',
    stamp: 'WCAG 2.1 AA',
    href: 'https://www.ada.gov/resources/2024-03-08-web-rule/',
    link: 'The web rule on ada.gov',
    layers: [
      {
        kind: 'Regulation',
        name: 'DOJ rule of 2024, 28 CFR part 35',
        note:
          'Points at the standard directly. Deadlines April 2027 and April ' +
          '2028 under the interim rule of April 2026.',
      },
      {
        kind: 'Core',
        name: 'WCAG 2.1, level AA',
        note: 'Two layers deep.',
      },
    ],
  },
  {
    id: 'aca',
    version: 'WCAG 2.1',
    region: 'Canada · federal',
    name: 'Accessible Canada Act',
    stamp: 'WCAG 2.1 AA',
    href: 'https://gazette.gc.ca/rp-pr/p2/2025/2025-12-17/html/sor-dors255-eng.html',
    link: 'SOR/2025-255 in the Canada Gazette',
    layers: [
      {
        kind: 'Law and regulation',
        name: 'Accessible Canada Regulations, amended December 2025',
        note: 'Web content from December 2027, apps and documents from 2028.',
      },
      {
        kind: 'Standard',
        name: 'CAN/ASC-EN 301 549:2024',
        note: 'The Canadian adoption of EN 301 549 V3.2.1, word for word.',
      },
      {
        kind: 'Core',
        name: 'WCAG 2.1, level AA',
        note: 'Three layers deep.',
      },
    ],
  },
  {
    id: 'psbar',
    version: 'WCAG 2.2',
    region: 'United Kingdom · public sector',
    name: 'Public Sector Bodies Accessibility Regulations',
    stamp: 'WCAG 2.2 AA',
    href: 'https://www.legislation.gov.uk/uksi/2018/952/contents',
    link: 'The 2018 regulations on legislation.gov.uk',
    layers: [
      {
        kind: 'Regulation',
        name: 'PSBAR 2018, amended 2022',
        note:
          'Since 2022 the law names WCAG A and AA "as amended from time to ' +
          'time" instead of a fixed version; monitoring moved to 2.2 in ' +
          'October 2024.',
      },
      {
        kind: 'Core',
        name: 'WCAG 2.2, level AA',
        note: 'Two layers deep, and the first row to reach the current version.',
      },
    ],
  },
]
