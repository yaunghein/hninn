import type { ConceptContent } from '@/types/concept'
import type { ContactContent } from '@/types/contact'
import type { EventsContent } from '@/types/events'
import type { GalleryContent, GalleryMediaItem } from '@/types/gallery'
import { urlFor } from '@/sanity/lib/image'

type SanityLink = {
  label: string
  href: string
} | null

type SanityImage = {
  asset?: {
    _id: string
    url?: string
    metadata?: {
      lqip?: string | null
      dimensions?: {
        width?: number | null
        height?: number | null
      } | null
    } | null
  } | null
  hotspot?: unknown
  crop?: unknown
  alt?: string | null
} | null

export type ConceptPageData = {
  title?: string | null
  blocks?:
    | {
        title?: string | null
        body?: string | null
      }[]
    | null
}

export type ContactPageData = {
  title?: string | null
  bookCta?: SanityLink
  contacts?: SanityLink[] | null
  social?: SanityLink[] | null
  hours?: {
    open?: string | null
    closed?: string | null
  } | null
  location?: {
    title?: string | null
    directionsCta?: SanityLink
    map?: SanityImage
  } | null
}

export type EventsPageData = {
  title?: string | null
  description?: string | null
  cta?: SanityLink
  images?: SanityImage[] | null
}

export type GalleryPageData = {
  blocks?:
    | {
        _key?: string
        name?: string | null
        images?: SanityImage[] | null
      }[]
    | null
}

const FALLBACK_MAP = {
  src: '/images/contact_map.jpg',
  alt: 'Map showing Hninn on Phetchaburi Road near Saen Saep canal',
} as const

const FALLBACK_EVENT_IMAGES = [
  {
    src: '/images/home_amazing_space_1.jpg',
    alt: 'Hninn dining room set for a private gathering',
  },
  {
    src: '/images/home_amazing_space_2.jpg',
    alt: 'Long table with candles ready for an event',
  },
  {
    src: '/images/home_amazing_space_3.jpg',
    alt: 'Decorated corner of the Hninn dining space',
  },
  {
    src: '/images/home_amazing_space_4.jpg',
    alt: 'Table setting details at Hninn',
  },
  {
    src: '/images/home_paws_included_1.jpg',
    alt: 'Pet-friendly seating for a casual gathering',
  },
  {
    src: '/images/home_slider_1.jpg',
    alt: 'Hninn interior with olive tree centerpiece',
  },
] as const

const FALLBACK_GALLERY_BLOCKS: {
  id: string
  name: string
  images: Omit<GalleryMediaItem, 'category'>[]
}[] = [
  {
    id: 'event',
    name: 'Event',
    images: [
      {
        url: '/images/home_slider_1.jpg',
        width: 1440,
        height: 1712,
        alt: 'Hninn dining room',
      },
    ],
  },
  {
    id: 'dishes',
    name: 'Dishes',
    images: [
      {
        url: '/images/home_good_food_1.jpg',
        width: 1232,
        height: 1648,
        alt: 'Hninn dish plated with fresh herbs',
      },
      {
        url: '/images/home_good_food_2.jpg',
        width: 1232,
        height: 1648,
        alt: 'Hninn brunch spread',
      },
      {
        url: '/images/home_good_food_3.jpg',
        width: 1232,
        height: 1648,
        alt: 'Close-up of a Hninn specialty dish',
      },
      {
        url: '/images/home_good_food_4.jpg',
        width: 1232,
        height: 1648,
        alt: 'Hninn tea and food pairing',
      },
      {
        url: '/images/home_menu_1.png',
        width: 1380,
        height: 1018,
        alt: 'Hninn dish with tea service',
      },
      {
        url: '/images/home_menu_2.png',
        width: 1378,
        height: 1018,
        alt: 'Hninn plated dish',
      },
    ],
  },
  {
    id: 'interior',
    name: 'Interior',
    images: [
      {
        url: '/images/home_amazing_space_1.jpg',
        width: 1232,
        height: 1648,
        alt: 'Hninn dining room interior',
      },
      {
        url: '/images/home_amazing_space_2.jpg',
        width: 1232,
        height: 1648,
        alt: 'Hninn seating and ambiance',
      },
      {
        url: '/images/home_amazing_space_3.jpg',
        width: 1232,
        height: 1648,
        alt: 'Hninn cafe space detail',
      },
      {
        url: '/images/home_amazing_space_4.jpg',
        width: 1232,
        height: 1648,
        alt: 'Hninn restaurant atmosphere',
      },
    ],
  },
  {
    id: 'pets',
    name: 'Pets',
    images: [
      {
        url: '/images/home_paws_included_1.jpg',
        width: 1232,
        height: 1648,
        alt: 'Dog-friendly moment at Hninn',
      },
      {
        url: '/images/home_paws_included_2.jpg',
        width: 1232,
        height: 1648,
        alt: 'Pet visiting Hninn with guests',
      },
      {
        url: '/images/home_paws_included_3.jpg',
        width: 1232,
        height: 1648,
        alt: 'Pet-friendly seating at Hninn',
      },
      {
        url: '/images/home_paws_included_4.jpg',
        width: 1232,
        height: 1648,
        alt: 'Welcome for pets at Hninn',
      },
    ],
  },
]

function fallbackGalleryContent(): GalleryContent {
  const images = FALLBACK_GALLERY_BLOCKS.flatMap((block) =>
    block.images.map((image) => ({
      ...image,
      category: block.id,
    })),
  )

  return {
    tabs: [
      { id: 'all', label: 'All' },
      ...FALLBACK_GALLERY_BLOCKS.map((block) => ({
        id: block.id,
        label: block.name,
      })),
    ],
    images,
  }
}

function mapGalleryImage(
  image: SanityImage,
  category: string,
  fallback?: Omit<GalleryMediaItem, 'category'>,
): GalleryMediaItem | null {
  if (image?.asset) {
    return {
      url: urlFor(image).width(1600).url(),
      width: image.asset.metadata?.dimensions?.width ?? fallback?.width ?? 1232,
      height:
        image.asset.metadata?.dimensions?.height ?? fallback?.height ?? 1648,
      category,
      alt: image.alt ?? fallback?.alt,
    }
  }

  if (!fallback) return null

  return {
    url: fallback.url,
    width: fallback.width,
    height: fallback.height,
    category,
    alt: image?.alt ?? fallback.alt,
  }
}

function isLink(link: SanityLink): link is { label: string; href: string } {
  return Boolean(link?.label && link?.href)
}

export function toConceptContent(data: ConceptPageData): ConceptContent {
  return {
    title: data.title ?? 'The Heart of Hninn',
    blocks: (data.blocks ?? [])
      .filter((block): block is { title: string; body: string } =>
        Boolean(block?.title && block?.body),
      )
      .map((block) => ({
        title: block.title,
        body: block.body,
      })),
  }
}

export function toContactContent(data: ContactPageData): ContactContent {
  const mapAsset = data.location?.map?.asset
  const mapSrc = mapAsset
    ? urlFor(data.location!.map!).width(1600).url()
    : FALLBACK_MAP.src

  return {
    title: data.title ?? 'Get in Touch',
    bookCta: {
      label: data.bookCta?.label ?? 'Book a Table',
      href: data.bookCta?.href ?? '/reservation',
      color: 'sand',
      hoverColor: 'olive',
    },
    contacts: (data.contacts ?? []).filter(isLink),
    social: (data.social ?? []).filter(isLink),
    hours: {
      open: data.hours?.open ?? 'Open Daily 7:00 – 23:00',
      closed: data.hours?.closed ?? 'Closed on Wednesdays',
    },
    location: {
      title: data.location?.title ?? 'Find Us in Phetchaburi',
      directionsCta: {
        label: data.location?.directionsCta?.label ?? 'Get Directions',
        href:
          data.location?.directionsCta?.href ??
          'https://maps.google.com/?q=Hninn+Phetchaburi+Bangkok',
        color: 'olive',
        hoverColor: 'sand',
      },
      map: {
        src: mapSrc,
        alt: data.location?.map?.alt ?? FALLBACK_MAP.alt,
        blurDataURL: data.location?.map?.asset?.metadata?.lqip ?? undefined,
      },
    },
  }
}

export function toEventsContent(data: EventsPageData): EventsContent {
  const images = (data.images ?? [])
    .map((image, index) => {
      if (image?.asset) {
        return {
          src: urlFor(image).width(1200).url(),
          alt: image.alt ?? FALLBACK_EVENT_IMAGES[index]?.alt ?? 'Event image',
          blurDataURL: image.asset.metadata?.lqip ?? undefined,
        }
      }

      const fallback = FALLBACK_EVENT_IMAGES[index]
      if (!fallback) return null

      return {
        src: fallback.src,
        alt: image?.alt ?? fallback.alt,
      }
    })
    .filter(
      (image): image is { src: string; alt: string; blurDataURL?: string } =>
        Boolean(image),
    )

  return {
    title: data.title ?? 'Host Your Event at Hninn',
    description:
      data.description ??
      'Whether it’s an intimate birthday brunch, a casual team get-together, or even a puppy playdate, our space is perfect for private and semi-private gatherings. We offer a relaxed atmosphere and customizable menus featuring our signature modern Burmese dishes and specialty drinks.',
    cta: {
      label: data.cta?.label ?? 'Inquire Now',
      href: data.cta?.href ?? '/contact',
      color: 'brown-muted',
      hoverColor: 'cream',
    },
    images: images.length > 0 ? images : [...FALLBACK_EVENT_IMAGES],
  }
}

export function toGalleryContent(data: GalleryPageData): GalleryContent {
  const blocks = (data.blocks ?? []).filter(
    (
      block,
    ): block is {
      _key: string
      name: string
      images?: SanityImage[] | null
    } => Boolean(block?._key && block?.name),
  )

  if (blocks.length === 0) {
    return fallbackGalleryContent()
  }

  const tabs = [
    { id: 'all', label: 'All' },
    ...blocks.map((block) => ({
      id: block._key,
      label: block.name,
    })),
  ]

  const images = blocks.flatMap((block, blockIndex) => {
    const fallbackBlock = FALLBACK_GALLERY_BLOCKS[blockIndex]
    const blockImages = block.images ?? []

    return blockImages
      .map((image, imageIndex) =>
        mapGalleryImage(image, block._key, fallbackBlock?.images[imageIndex]),
      )
      .filter((image): image is GalleryMediaItem => Boolean(image))
  })

  return {
    tabs,
    images: images.length > 0 ? images : fallbackGalleryContent().images,
  }
}
