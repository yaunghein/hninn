import type { Color } from '@/lib/constants/colors'

export type EventsImage = {
  src: string
  alt: string
  blurDataURL?: string
}

export type EventsContent = {
  title: string
  description: string
  cta: {
    label: string
    href: string
    color: Color
    hoverColor: Color
  }
  images: EventsImage[]
}
