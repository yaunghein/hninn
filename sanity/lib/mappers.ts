import type { ConceptContent } from '@/types/concept'
import type { ContactContent } from '@/types/contact'
import type { EventsContent } from '@/types/events'
import { urlFor } from '@/sanity/lib/image'

type SanityLink = {
  label: string
  href: string
} | null

type SanityImage = {
  asset?: {
    _id: string
    url?: string
    metadata?: { lqip?: string | null } | null
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
