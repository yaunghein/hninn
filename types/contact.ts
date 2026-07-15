import type { Color } from '@/lib/constants/colors'

export type ContactLink = {
  label: string
  href: string
}

export type ContactContent = {
  title: string
  bookCta: {
    label: string
    href: string
    color: Color
    hoverColor: Color
  }
  contacts: ContactLink[]
  social: ContactLink[]
  hours: {
    open: string
    closed: string
  }
  location: {
    title: string
    directionsCta: {
      label: string
      href: string
      color: Color
      hoverColor: Color
    }
    map: {
      src: string
      alt: string
      blurDataURL?: string
    }
  }
}
