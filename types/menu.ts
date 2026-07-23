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

export type MenuPageContent = {
  tabs: MenuTab[]
  items: MenuItem[]
}
