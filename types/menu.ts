import type { Color } from '@/lib/constants/colors'

export type MenuItem = {
  id: string
  categoryId: string
  name: string
  description: string | null
  price: string | null
  image: {
    src: string
    alt: string
    lqip?: string
  }
}

export type MenuTab = {
  id: string
  label: string
}

export type MenuCta = {
  label: string
  href: string
  color: Color
  hoverColor: Color
}

export type MenuPageContent = {
  cta: MenuCta
  tabs: MenuTab[]
  items: MenuItem[]
}
