import type { Color } from '@/app/lib/constants/colors'

export type HomeSlide = {
  src: string
  caption: string
  background: Color
  pattern: Color
  logo: Color
}

export type HomeHeroContent = {
  title: string
  description: string
  slides: HomeSlide[]
  /** Autoplay delay in ms — also drives progress fill duration */
  duration: number
}

export type GeneralFactImage = {
  src: string
  alt: string
}

export type GeneralFact = {
  title: string
  /** Split title across lines when provided */
  titleLines?: string[]
  titleAlign: 'left' | 'right'
  /** Column that starts lower in the staggered grid */
  offset: 'left' | 'right'
  leftImages: GeneralFactImage[]
  rightImages: GeneralFactImage[]
}

export type GeneralFactsContent = {
  facts: GeneralFact[]
  cta: {
    label: string
    href: string
    color: Color
    hoverColor: Color
  }
}
