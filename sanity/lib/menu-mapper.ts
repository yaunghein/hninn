import { stegaClean } from 'next-sanity'

import { DEFAULT_TAB_ID } from '@/lib/utils/tab-query'
import { uniqueSlug } from '@/lib/utils/slugify'
import { urlFor } from '@/sanity/lib/image'
import type { MenuItem, MenuPageContent } from '@/types/menu'

const FALLBACK_IMAGE_SRC = '/images/home_good_food_3.jpg'

type SanityMenuImage = {
  asset?: {
    _id: string
    url?: string
    metadata?: {
      lqip?: string | null
    } | null
  } | null
  hotspot?: unknown
  crop?: unknown
  caption?: string | null
} | null

type SanityMenuItem = {
  _key?: string
  name?: string | null
  description?: string | null
  price?: string | null
  image?: SanityMenuImage
}

type SanityMenuCategory = {
  _key?: string
  name?: string | null
  items?: SanityMenuItem[] | null
}

export type MenuPageData = {
  categories?: SanityMenuCategory[] | null
}

const FALLBACK_CATEGORIES: {
  id: string
  name: string
  items: Omit<MenuItem, 'categoryId' | 'id'>[]
}[] = [
  {
    id: 'breakfast',
    name: 'Breakfast',
    items: [
      {
        name: 'Chicken Curry With Paratha',
        description:
          'Slow-cooked chicken curry served with flaky house paratha.',
        price: '380 THB',
        image: {
          src: FALLBACK_IMAGE_SRC,
          alt: 'Chicken curry with paratha',
        },
      },
      {
        name: 'Burnt Malai E Kyar',
        description: null,
        price: '180 THB',
        image: {
          src: '/images/home_good_food_1.jpg',
          alt: 'Burnt malai e kyar',
        },
      },
    ],
  },
  {
    id: 'entree',
    name: 'Entrée',
    items: [
      {
        name: 'Samosa Thoke',
        description:
          'Crispy samosas tossed in a bright, herbaceous thoke dressing.',
        price: '310 THB',
        image: {
          src: '/images/home_good_food_2.jpg',
          alt: 'Samosa thoke',
        },
      },
      {
        name: 'Shan Noodle Pasta',
        description: null,
        price: '340 THB',
        image: {
          src: '/images/home_good_food_4.jpg',
          alt: 'Shan noodle pasta',
        },
      },
    ],
  },
]

function fallbackMenuContent(): MenuPageContent {
  const tabs = [
    { id: DEFAULT_TAB_ID, label: 'All' },
    ...FALLBACK_CATEGORIES.map((category) => ({
      id: category.id,
      label: category.name,
    })),
  ]

  const items = FALLBACK_CATEGORIES.flatMap((category) =>
    category.items.map((item, index) => ({
      ...item,
      id: `${category.id}-${index}`,
      categoryId: category.id,
    })),
  )

  return { tabs, items }
}

function mapMenuImage(
  image: SanityMenuImage | undefined,
  fallbackName: string,
): MenuItem['image'] {
  if (!image?.asset) {
    return {
      src: FALLBACK_IMAGE_SRC,
      alt: fallbackName,
    }
  }

  return {
    src: urlFor(image).width(900).height(1200).fit('crop').url(),
    alt: stegaClean(image.caption) || fallbackName,
    lqip: image.asset.metadata?.lqip ?? undefined,
  }
}

export function toMenuContent(data: MenuPageData | null): MenuPageContent {
  const categories = (data?.categories ?? []).filter(
    (category): category is SanityMenuCategory & { _key: string; name: string } =>
      Boolean(category?._key && category?.name),
  )

  if (categories.length === 0) {
    return fallbackMenuContent()
  }

  const usedIds = new Set<string>([DEFAULT_TAB_ID])
  const categoryIds = new Map<string, string>()

  for (const category of categories) {
    categoryIds.set(
      stegaClean(category._key),
      uniqueSlug(stegaClean(category.name), usedIds),
    )
  }

  const tabs = [
    { id: DEFAULT_TAB_ID, label: 'All' },
    ...categories.map((category) => ({
      id: categoryIds.get(stegaClean(category._key))!,
      label: category.name,
    })),
  ]

  const items: MenuItem[] = categories.flatMap((category) => {
    const categoryId = categoryIds.get(stegaClean(category._key))!

    return (category.items ?? [])
      .filter(
        (item): item is SanityMenuItem & { _key: string; name: string } =>
          Boolean(item?._key && item?.name),
      )
      .map((item) => {
        const name = stegaClean(item.name)

        return {
          id: stegaClean(item._key),
          categoryId,
          name,
          description: item.description?.trim()
            ? stegaClean(item.description)
            : null,
          price: item.price?.trim() ? stegaClean(item.price) : null,
          image: mapMenuImage(item.image, name),
        }
      })
  })

  if (items.length === 0) {
    return fallbackMenuContent()
  }

  return { tabs, items }
}
