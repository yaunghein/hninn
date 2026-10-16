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

export type ConceptStoryImage = {
  src: string
  alt: string
  /** Sanity LQIP data URL for Next.js blur placeholder */
  lqip?: string
}

export type ConceptStoryContent = {
  id: string
  title: string
  /** Heading max-width in rem (unitless, e.g. `23.5625` → `23.5625rem`) */
  titleWidth: number
  subtitle: string
  body: string
  /** Text box width in rem (unitless, e.g. `24` → `24rem`) */
  width: number
  quote?: ConceptStoryQuote
  /** 1–3 images; desktop shows them side by side, mobile shows the first */
  images: ConceptStoryImage[]
  /** Which side the content panel sits on (desktop). Default `right`. */
  contentSide?: 'left' | 'right'
  tone?: ConceptStoryTone
}
