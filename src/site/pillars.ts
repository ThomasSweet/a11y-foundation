import type { PillarIconName } from '../icons/pillarIcons'

/** The four chapters, in reading order — shared by the hub, the chapter rail,
 *  and prev/next. `vt-{id}-*` names drive the cross-document morph. */
export interface Pillar {
  id: string
  no: string
  short: string
  title: string
  eyebrow: string
  icon: PillarIconName
  href: string
}

export const pillars: Pillar[] = [
  {
    id: 'standard',
    no: '01',
    short: 'Standard',
    title: 'The standard',
    eyebrow: '01 · The requirement',
    icon: 'standard',
    href: '/standard.html',
  },
  {
    id: 'craft',
    no: '02',
    short: 'Craft',
    title: 'The craft',
    eyebrow: "02 · The platform's answer · shipping today",
    icon: 'craft',
    href: '/craft.html',
  },
  {
    id: 'showcase',
    no: '03',
    short: 'CSS',
    title: 'CSS showcase',
    eyebrow: "03 · The platform's answer · arriving next",
    icon: 'next',
    href: '/showcase.html',
  },
  {
    id: 'proof',
    no: '04',
    short: 'Proof',
    title: 'The proof',
    eyebrow: '04 · The proof',
    icon: 'proof',
    href: '/proof.html',
  },
]
