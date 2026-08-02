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
    path: '/concept',
  })
}

export default async function ConceptPage() {
  const { data } = await sanityFetch({ query: CONCEPT_PAGE_QUERY })

  if (!data) {
    notFound()
  }

  const page = data as ConceptPageData
  const concept = toConceptContent(page)
  const stories = toConceptStories(page)

  return (
    <>
      <ConceptHero {...concept} />
      {stories.map((story) => (
        <ConceptStory key={story.id} {...story} />
      ))}
    </>
  )
}
