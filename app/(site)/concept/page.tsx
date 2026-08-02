import type { Metadata } from 'next'
import { ConceptHero, ConceptStory } from '@/components/concept'
import { sanityFetch } from '@/sanity/lib/live'
import { toConceptContent, type ConceptPageData } from '@/sanity/lib/mappers'
import { CONCEPT_PAGE_QUERY } from '@/sanity/lib/queries'
import { buildPageMetadata, type PageSeo } from '@/sanity/lib/seo'
import type { ConceptStoryContent } from '@/types/concept'
import { notFound } from 'next/navigation'

const story: ConceptStoryContent = {
  title: 'About The\nrestaurant',
  imageSrc: '/images/concept-1.webp',
  blocks: [
    {
      title: 'Our Home',
      body: 'We are proudly situated at our Phetchaburi location.',
      width: 18.3125,
    },
    {
      title: 'Our Vibe',
      body: 'We strive to make sure our physical and digital spaces feel warm, modern, and inviting.',
      width: 21.1875,
    },
    {
      title: 'When to Visit',
      body: 'Guests can easily find our hours of 7 AM to 9 PM and clearly see that we are closed on Wednesdays.',
      width: 19.1875,
    },
  ],
}

export async function generateMetadata(): Promise<Metadata> {
  const { data } = await sanityFetch({
    query: CONCEPT_PAGE_QUERY,
    stega: false,
  })
  return buildPageMetadata((data as { seo?: PageSeo } | null)?.seo, {
    path: '/concept',
  })
}

export default async function ConceptPage() {
  const { data } = await sanityFetch({ query: CONCEPT_PAGE_QUERY })

  if (!data) {
    notFound()
  }

  const concept = toConceptContent(data as ConceptPageData)

  return (
    <>
      <ConceptHero {...concept} />
      <ConceptStory {...story} />
    </>
  )
}
