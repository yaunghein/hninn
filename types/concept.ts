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

export type ConceptStoryParagraph = {
  body: string
  /** Paragraph width in rem (unitless). Omit for full width. */
  width?: number
}

export type ConceptStoryTone = 'sand' | 'peach' | 'olive'

export type ConceptStoryContent = {
  id: string
  title: string
  /** Heading max-width in rem (unitless, e.g. `23.5625` → `23.5625rem`) */
  titleWidth: number
  imageSrc: string
  imageAlt?: string
  /** Which side the content panel sits on (desktop). Default `right`. */
  contentSide?: 'left' | 'right'
  tone?: ConceptStoryTone
  blocks?: ConceptStoryBlock[]
  /** Quote-style body copy (used instead of blocks when present). */
  paragraphs?: ConceptStoryParagraph[]
}
