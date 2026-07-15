import { ConceptHero } from '@/components/concept'
import { sanityFetch } from '@/sanity/lib/live'
import {
  toConceptContent,
  type ConceptPageData,
} from '@/sanity/lib/mappers'
import { CONCEPT_PAGE_QUERY } from '@/sanity/lib/queries'
import { notFound } from 'next/navigation'

export default async function ConceptPage() {
  const { data } = await sanityFetch({ query: CONCEPT_PAGE_QUERY })

  if (!data) {
    notFound()
  }

  const concept = toConceptContent(data as ConceptPageData)

  return <ConceptHero {...concept} />
}
