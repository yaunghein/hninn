export type ConceptBlock = {
  title: string
  body: string
}

export type ConceptContent = {
  title: string
  blocks: ConceptBlock[]
}

export type ConceptStoryQuote = {
  text: string
  attribution?: string
}

export type ConceptStoryTone = 'sand' | 'peach' | 'olive'

export type ConceptStoryContent = {
  id: string
  title: string
  /** Heading max-width in rem (unitless, e.g. `23.5625` → `23.5625rem`) */
  titleWidth: number
  subtitle: string
  body: string
  quote?: ConceptStoryQuote
  imageSrc: string
  imageAlt?: string
  /** Sanity LQIP data URL for Next.js blur placeholder */
  imageLqip?: string
  /** Which side the content panel sits on (desktop). Default `right`. */
  contentSide?: 'left' | 'right'
  tone?: ConceptStoryTone
}
