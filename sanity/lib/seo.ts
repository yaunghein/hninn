import type { Metadata } from 'next'
import type { SanityImageSource } from '@sanity/image-url'

import { urlFor } from '@/sanity/lib/image'

export type PageSeo = {
  title?: string | null
  description?: string | null
  ogImage?: SanityImageSource | null
}

const SITE_NAME = 'Hninn'
const DEFAULT_DESCRIPTION =
  'A cozy, pet-friendly space serving contemporary Burmese brunch in Phetchaburi, Bangkok.'

function hasImageAsset(image: unknown): image is SanityImageSource {
  return Boolean(
    image &&
      typeof image === 'object' &&
      'asset' in image &&
      (image as { asset?: unknown }).asset,
  )
}

export function buildPageMetadata(
  seo: PageSeo | null | undefined,
  options?: {
    /** Absolute path for this page, e.g. `/concept` */
    path?: string
    /** Use a full title without the root `%s | Hninn` template */
    absoluteTitle?: boolean
  },
): Metadata {
  const title = seo?.title?.trim() || SITE_NAME
  const description = seo?.description?.trim() || DEFAULT_DESCRIPTION

  const metadata: Metadata = {
    title: options?.absoluteTitle ? { absolute: title } : title,
    description,
    openGraph: {
      title,
      description,
      siteName: SITE_NAME,
      type: 'website',
      ...(options?.path ? { url: options.path } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  }

  if (hasImageAsset(seo?.ogImage)) {
    const url = urlFor(seo.ogImage).width(1200).height(630).fit('crop').url()
    metadata.openGraph = {
      ...metadata.openGraph,
      images: [{ url, width: 1200, height: 630, alt: title }],
    }
    metadata.twitter = {
      ...metadata.twitter,
      images: [url],
    }
  }

  return metadata
}
