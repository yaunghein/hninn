import { stegaClean } from 'next-sanity'

import { colors, type Color } from '@/lib/constants/colors'
import { urlFor } from '@/sanity/lib/image'
import type {
  GeneralFact,
  GeneralFactImage,
  GeneralFactsContent,
  HomeFindUsContent,
  HomeHeroContent,
  HomeMenuContent,
  HomeMenuImage,
  HomeMenuItem,
  HomeSlide,
} from '@/types/home'

type SanityImage = {
  asset?: {
    _id: string
    url?: string
    metadata?: {
      lqip?: string | null
      dimensions?: {
        width?: number | null
        height?: number | null
        aspectRatio?: number | null
      } | null
    } | null
  } | null
  hotspot?: unknown
  crop?: unknown
  alt?: string | null
  caption?: string | null
} | null

type SanityLink = {
  label?: string | null
  href?: string | null
} | null

export type HomePageData = {
  hero?: {
    title?: string | null
    description?: string | null
    duration?: number | null
    slides?:
      | {
          image?: SanityImage
          background?: string | null
          text?: string | null
          logo?: string | null
          /** @deprecated use `text` */
          pattern?: string | null
        }[]
      | null
  } | null
  generalFacts?: {
    facts?:
      | {
          title?: string | null
          titleLines?: string[] | null
          titleAlign?: string | null
          offset?: string | null
          leftImages?: SanityImage[] | null
          rightImages?: SanityImage[] | null
        }[]
      | null
    cta?: SanityLink
  } | null
  menu?: {
    title?: string | null
    description?: string | null
    duration?: number | null
    items?:
      | {
          name?: string | null
          images?:
            | {
                image?: SanityImage
                caption?: string | null
              }[]
            | null
          /** @deprecated use `images` */
          image?: SanityImage
        }[]
      | null
    cta?: SanityLink
  } | null
  findUs?: {
    title?: string | null
    cta?: SanityLink
  } | null
}

export type HomePageContent = {
  hero: HomeHeroContent
  generalFacts: GeneralFactsContent
  menu: HomeMenuContent
  findUs: HomeFindUsContent
}

const colorSet = new Set<string>(colors)

function asColor(value: string | null | undefined, fallback: Color): Color {
  const cleaned = value ? stegaClean(value) : value
  return cleaned && colorSet.has(cleaned) ? (cleaned as Color) : fallback
}

function asAlign(value: string | null | undefined): 'left' | 'right' {
  return stegaClean(value ?? '') === 'right' ? 'right' : 'left'
}

function imageSrc(image: SanityImage, width: number, fallback: string) {
  return image?.asset ? urlFor(image).width(width).url() : fallback
}

function mapFactImages(
  images: SanityImage[] | null | undefined,
  fallbacks: GeneralFactImage[],
): GeneralFactImage[] {
  const mapped = (images ?? [])
    .map((image, index) => {
      const fallback = fallbacks[index]
      if (image?.asset) {
        return {
          src: urlFor(image).width(1200).url(),
          alt: image.alt ?? fallback?.alt ?? 'Hninn',
        }
      }
      if (!fallback) return null
      return {
        src: fallback.src,
        alt: image?.alt ?? fallback.alt,
      }
    })
    .filter((image): image is GeneralFactImage => Boolean(image))

  return mapped.length > 0 ? mapped : fallbacks
}

const FALLBACK_HERO: HomeHeroContent = {
  title: 'A Modern Taste of Myanmar, Right Here in Bangkok',
  description:
    'Welcome to Hninn. A cozy, pet-friendly space serving up contemporary Burmese brunch, specialty coffee, and warm hospitality in the heart of Phetchaburi.',
  duration: 3000,
  slides: [
    {
      src: '/images/home_slider_1.jpg',
      caption: 'Hninn dining room with an olive tree at the center table',
      background: 'peach-light',
      text: 'brown-muted',
      logo: 'cream',
    },
    {
      src: '/images/home_good_food_2.jpg',
      caption: 'Hninn dining room with an olive tree at the center table',
      background: 'sand',
      text: 'brown',
      logo: 'cream',
    },
    {
      src: '/images/home_amazing_space_2.jpg',
      caption: 'Hninn dining room with an olive tree at the center table',
      background: 'cream',
      text: 'olive',
      logo: 'cream',
    },
    {
      src: '/images/home_paws_included_1.jpg',
      caption: 'Hninn dining room with an olive tree at the center table',
      background: 'sand',
      text: 'brown',
      logo: 'brown',
    },
  ],
}

const FALLBACK_FACTS: GeneralFactsContent = {
  facts: [
    {
      title: 'Good Food',
      titleAlign: 'left',
      offset: 'left',
      leftImages: [
        {
          src: '/images/home_good_food_1.jpg',
          alt: 'Hninn dish plated with fresh herbs',
        },
        {
          src: '/images/home_good_food_2.jpg',
          alt: 'Hninn brunch spread on the table',
        },
      ],
      rightImages: [
        {
          src: '/images/home_good_food_3.jpg',
          alt: 'Close-up of a Hninn specialty dish',
        },
        {
          src: '/images/home_good_food_4.jpg',
          alt: 'Hninn tea and food pairing',
        },
      ],
    },
    {
      title: 'Amazing Space',
      titleLines: ['Amazing', 'Space'],
      titleAlign: 'right',
      offset: 'right',
      leftImages: [
        {
          src: '/images/home_amazing_space_1.jpg',
          alt: 'Hninn dining room interior',
        },
        {
          src: '/images/home_amazing_space_2.jpg',
          alt: 'Hninn seating and ambiance',
        },
      ],
      rightImages: [
        {
          src: '/images/home_amazing_space_3.jpg',
          alt: 'Hninn cafe space detail',
        },
        {
          src: '/images/home_amazing_space_4.jpg',
          alt: 'Hninn restaurant atmosphere',
        },
      ],
    },
    {
      title: 'Paws Included',
      titleLines: ['Paws', 'Included'],
      titleAlign: 'left',
      offset: 'left',
      leftImages: [
        {
          src: '/images/home_paws_included_1.jpg',
          alt: 'Dog-friendly moment at Hninn',
        },
        {
          src: '/images/home_paws_included_2.jpg',
          alt: 'Pet visiting Hninn with guests',
        },
      ],
      rightImages: [
        {
          src: '/images/home_paws_included_3.jpg',
          alt: 'Pet-friendly seating at Hninn',
        },
        {
          src: '/images/home_paws_included_4.jpg',
          alt: 'Welcome for pets at Hninn',
        },
      ],
    },
  ],
  cta: {
    label: 'Explore Gallery',
    href: '/gallery',
    color: 'sand',
    hoverColor: 'olive',
  },
}

const FALLBACK_MENU: HomeMenuContent = {
  title: 'Bright, Bold, and Brunch-Ready',
  description:
    "See what you'd like to try before you even walk through the doors.",
  duration: 3000,
  items: [
    {
      name: 'Signature Tea Leaf Salad',
      images: [
        {
          src: '/images/home_menu_1.png',
          alt: 'Signature Tea Leaf Salad',
          aspectRatio: 1.36,
        },
        {
          src: '/images/home_menu_2.png',
          alt: 'Signature Tea Leaf Salad plating',
          aspectRatio: 1.36,
        },
      ],
    },
    {
      name: "Hninn's Brunch Mohinga",
      images: [
        {
          src: '/images/home_menu_2.png',
          alt: "Hninn's Brunch Mohinga",
        },
        {
          src: '/images/home_menu_1.png',
          alt: "Hninn's Brunch Mohinga bowl",
        },
      ],
    },
    {
      name: 'Signature House Blend Coffee',
      images: [
        {
          src: '/images/home_menu_1.png',
          alt: 'Signature House Blend Coffee',
        },
        {
          src: '/images/home_menu_2.png',
          alt: 'Signature House Blend Coffee service',
        },
      ],
    },
    {
      name: 'Signature Tea Leaf Salad 2',
      images: [
        {
          src: '/images/home_menu_2.png',
          alt: 'Signature Tea Leaf Salad 2',
        },
        {
          src: '/images/home_menu_1.png',
          alt: 'Signature Tea Leaf Salad 2 plating',
        },
      ],
    },
    {
      name: "Hninn's Brunch Mohinga 2",
      images: [
        {
          src: '/images/home_menu_1.png',
          alt: "Hninn's Brunch Mohinga 2",
        },
        {
          src: '/images/home_menu_2.png',
          alt: "Hninn's Brunch Mohinga 2 bowl",
        },
      ],
    },
    {
      name: 'Signature House Blend Coffee 2',
      images: [
        {
          src: '/images/home_menu_2.png',
          alt: 'Signature House Blend Coffee 2',
        },
        {
          src: '/images/home_menu_1.png',
          alt: 'Signature House Blend Coffee 2 service',
        },
      ],
    },
  ],
  cta: {
    label: 'Explore Gallery',
    href: '/menu',
    color: 'olive',
    hoverColor: 'cream',
  },
}

const FALLBACK_FIND_US: HomeFindUsContent = {
  title: 'Find Us in Phetchaburi',
  cta: {
    label: 'Get Direction',
    href: 'https://maps.google.com/?q=Hninn+Contemporary+Burmese+Bangkok',
    color: 'peach-light',
    hoverColor: 'brown-muted',
  },
}

function toHero(data: HomePageData['hero']): HomeHeroContent {
  const fallback = FALLBACK_HERO
  const slides = (data?.slides ?? [])
    .map((slide, index): HomeSlide | null => {
      const fallbackSlide = fallback.slides[index]
      const image = slide.image
      if (image?.asset) {
        return {
          src: urlFor(image).width(1800).url(),
          caption:
            image.caption ??
            fallbackSlide?.caption ??
            'Hninn dining room with an olive tree at the center table',
          background: asColor(slide.background, fallbackSlide?.background ?? 'sand'),
          text: asColor(
            slide.text ?? slide.pattern,
            fallbackSlide?.text ?? 'brown',
          ),
          logo: asColor(slide.logo, fallbackSlide?.logo ?? 'cream'),
        }
      }
      if (!fallbackSlide) return null
      return {
        ...fallbackSlide,
        caption: image?.caption ?? fallbackSlide.caption,
        background: asColor(slide.background, fallbackSlide.background),
        text: asColor(slide.text ?? slide.pattern, fallbackSlide.text),
        logo: asColor(slide.logo, fallbackSlide.logo),
      }
    })
    .filter((slide): slide is HomeSlide => Boolean(slide))

  return {
    title: data?.title ?? fallback.title,
    description: data?.description ?? fallback.description,
    duration: data?.duration ?? fallback.duration,
    slides: slides.length > 0 ? slides : fallback.slides,
  }
}

function toGeneralFacts(
  data: HomePageData['generalFacts'],
): GeneralFactsContent {
  const fallback = FALLBACK_FACTS
  const facts = (data?.facts ?? [])
    .map((fact, index): GeneralFact | null => {
      const fallbackFact = fallback.facts[index]
      if (!fact?.title && !fallbackFact) return null

      const title = fact.title ?? fallbackFact?.title ?? ''
      const titleLines = (fact.titleLines ?? fallbackFact?.titleLines)?.filter(
        Boolean,
      )

      return {
        title,
        ...(titleLines && titleLines.length > 0 ? { titleLines } : {}),
        titleAlign: asAlign(fact.titleAlign ?? fallbackFact?.titleAlign),
        offset: asAlign(fact.offset ?? fallbackFact?.offset),
        leftImages: mapFactImages(
          fact.leftImages,
          fallbackFact?.leftImages ?? [],
        ),
        rightImages: mapFactImages(
          fact.rightImages,
          fallbackFact?.rightImages ?? [],
        ),
      }
    })
    .filter((fact): fact is GeneralFact => Boolean(fact?.title))

  return {
    facts: facts.length > 0 ? facts : fallback.facts,
    cta: {
      label: data?.cta?.label ?? fallback.cta.label,
      href: data?.cta?.href ?? fallback.cta.href,
      color: fallback.cta.color,
      hoverColor: fallback.cta.hoverColor,
    },
  }
}

function imageAspectRatio(image: SanityImage, fallback = 1.36) {
  const dimensions = image?.asset?.metadata?.dimensions
  const fromMeta = dimensions?.aspectRatio
  if (typeof fromMeta === 'number' && fromMeta > 0) return fromMeta

  const width = dimensions?.width
  const height = dimensions?.height
  if (
    typeof width === 'number' &&
    typeof height === 'number' &&
    width > 0 &&
    height > 0
  ) {
    return width / height
  }

  return fallback
}

function mapMenuImages(
  entry:
    | {
        images?:
          | {
              image?: SanityImage
              caption?: string | null
            }[]
          | null
        image?: SanityImage
      }
    | null
    | undefined,
  name: string,
  fallbackImages: HomeMenuImage[],
): HomeMenuImage[] {
  const fromList = (entry?.images ?? [])
    .map((row, index): HomeMenuImage | null => {
      const fallbackImage = fallbackImages[index] ?? fallbackImages[0]
      const image = row.image
      if (!image?.asset) {
        if (!fallbackImage) return null
        return {
          src: fallbackImage.src,
          alt: row.caption ?? fallbackImage.alt,
          aspectRatio: fallbackImage.aspectRatio ?? 1.36,
          ...(fallbackImage.lqip ? { lqip: fallbackImage.lqip } : {}),
        }
      }

      const mapped: HomeMenuImage = {
        src: urlFor(image).width(1200).url(),
        alt: row.caption ?? fallbackImage?.alt ?? name,
        aspectRatio: imageAspectRatio(image, fallbackImage?.aspectRatio ?? 1.36),
      }
      const lqip = image.asset?.metadata?.lqip
      if (lqip) mapped.lqip = lqip
      return mapped
    })
    .filter((image): image is HomeMenuImage => Boolean(image))

  if (fromList.length > 0) return fromList

  // Legacy single image until content is moved into `images`
  const legacyImage = entry?.image
  const legacyAsset = legacyImage?.asset
  if (legacyImage && legacyAsset) {
    const mapped: HomeMenuImage = {
      src: urlFor(legacyImage).width(1200).url(),
      alt: legacyImage.caption ?? legacyImage.alt ?? name,
      aspectRatio: imageAspectRatio(legacyImage),
    }
    const lqip = legacyAsset.metadata?.lqip
    if (lqip) mapped.lqip = lqip
    return [mapped]
  }

  return fallbackImages
}

function toMenu(data: HomePageData['menu']): HomeMenuContent {
  const fallback = FALLBACK_MENU
  const items = (data?.items ?? [])
    .map((item, index): HomeMenuItem | null => {
      const fallbackItem = fallback.items[index]
      const name = item.name ?? fallbackItem?.name
      if (!name) return null

      const images = mapMenuImages(
        item,
        name,
        fallbackItem?.images ?? [],
      )
      if (images.length === 0) return null

      return { name, images }
    })
    .filter((item): item is HomeMenuItem => Boolean(item))

  return {
    title: data?.title ?? fallback.title,
    description: data?.description ?? fallback.description,
    duration: data?.duration ?? fallback.duration,
    items: items.length > 0 ? items : fallback.items,
    cta: {
      label: data?.cta?.label ?? fallback.cta.label,
      href: data?.cta?.href ?? fallback.cta.href,
      color: fallback.cta.color,
      hoverColor: fallback.cta.hoverColor,
    },
  }
}

function toFindUs(data: HomePageData['findUs']): HomeFindUsContent {
  const fallback = FALLBACK_FIND_US
  return {
    title: data?.title ?? fallback.title,
    cta: {
      label: data?.cta?.label ?? fallback.cta.label,
      href: data?.cta?.href ?? fallback.cta.href,
      color: fallback.cta.color,
      hoverColor: fallback.cta.hoverColor,
    },
  }
}

export function toHomeContent(data: HomePageData): HomePageContent {
  return {
    hero: toHero(data.hero),
    generalFacts: toGeneralFacts(data.generalFacts),
    menu: toMenu(data.menu),
    findUs: toFindUs(data.findUs),
  }
}
