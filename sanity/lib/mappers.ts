import type { ContactContent } from '@/types/contact'
import { urlFor } from '@/sanity/lib/image'

type SanityLink = {
  label: string
  href: string
} | null

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
    map?: {
      asset?: { _id: string; url?: string } | null
      hotspot?: unknown
      crop?: unknown
      alt?: string | null
    } | null
  } | null
}

const FALLBACK_MAP = {
  src: '/images/contact_map.jpg',
  alt: 'Map showing Hninn on Phetchaburi Road near Saen Saep canal',
} as const

function isLink(link: SanityLink): link is { label: string; href: string } {
  return Boolean(link?.label && link?.href)
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
      },
    },
  }
}
