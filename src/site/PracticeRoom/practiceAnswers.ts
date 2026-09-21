export interface Answer {
  n: number
  hint: string
  what: string
  heard?: string
  shouldSay?: string
  criterion: string
  criterionHref: string
  caught: string
  fix: string
  fixLink?: { label: string; href: string }
}
