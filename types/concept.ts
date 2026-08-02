export type ConceptBlock = {
  title: string
  body: string
}

export type ConceptContent = {
  title: string
  blocks: ConceptBlock[]
}

export type ConceptStoryBlock = {
  title: string
  body: string
  /** Description width in rem (unitless, e.g. `18.3125` → `18.3125rem`) */
  width: number
}

export type ConceptStoryContent = {
  title: string
  imageSrc: string
  imageAlt?: string
  blocks: ConceptStoryBlock[]
}
