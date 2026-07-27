import type { PillarIconName } from '../icons/pillarIcons'

/** The four chapters, in reading order — drives the chapter switcher, the
 *  mobile chapter bar, and prev/next. */
export interface Pillar {
  id: string
  no: string
  short: string
  title: string
  icon: PillarIconName
  href: string
}

export const pillars: Pillar[] = [
  {
    id: 'standard',
    no: '01',
    short: 'Standard',
    title: 'The standard',
    icon: 'standard',
    href: '/standard.html',
  },
  {
    id: 'craft',
    no: '02',
    short: 'Craft',
    title: 'The craft',
    icon: 'craft',
    href: '/craft.html',
  },
  {
    id: 'showcase',
    no: '03',
    short: 'CSS',
    title: 'CSS showcase',
    icon: 'next',
    href: '/showcase.html',
  },
  {
    id: 'proof',
    no: '04',
    short: 'Proof',
    title: 'The proof',
    icon: 'proof',
    href: '/proof.html',
  },
]
