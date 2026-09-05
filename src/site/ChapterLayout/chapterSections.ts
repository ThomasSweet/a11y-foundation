import type { InjectionKey } from 'vue'

export interface ChapterSectionEntry {
  id: string
  title: string
  railLabel?: string
}

export interface ChapterSectionRegistry {
  register: (entry: ChapterSectionEntry) => number
}

export const chapterSectionsKey: InjectionKey<ChapterSectionRegistry> =
  Symbol('chapter-sections')

export const railFrom = (entries: ChapterSectionEntry[]) =>
  entries.map((e) => ({ id: e.id, label: e.railLabel ?? e.title }))
