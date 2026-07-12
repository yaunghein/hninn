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
