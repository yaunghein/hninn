import type { Metadata } from 'next'
import { ConceptHero, ConceptStory } from '@/components/concept'
import { sanityFetch } from '@/sanity/lib/live'
import {
  toConceptContent,
  toConceptStories,
  type ConceptPageData,
} from '@/sanity/lib/mappers'
import { CONCEPT_PAGE_QUERY } from '@/sanity/lib/queries'
import { buildPageMetadata, type PageSeo } from '@/sanity/lib/seo'
import { notFound } from 'next/navigation'

export async function generateMetadata(): Promise<Metadata> {
  const { data } = await sanityFetch({
    query: CONCEPT_PAGE_QUERY,
    stega: false,
  })
  return buildPageMetadata((data as { seo?: PageSeo } | null)?.seo, {
    path: '/about',
  })
}

export default async function AboutPage() {
  const { data } = await sanityFetch({ query: CONCEPT_PAGE_QUERY })

  if (!data) {
    notFound()
  }

  const page = data as ConceptPageData
  const about = toConceptContent(page)
  const stories = toConceptStories(page)

  return (
    <>
      <ConceptHero {...about} />
      {stories.map((story) => (
        <ConceptStory key={story.id} {...story} />
      ))}
    </>
  )
}
