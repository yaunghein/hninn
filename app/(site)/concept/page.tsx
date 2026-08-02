import type { Metadata } from 'next'
import { ConceptHero, ConceptStory } from '@/components/concept'
import { sanityFetch } from '@/sanity/lib/live'
import { toConceptContent, type ConceptPageData } from '@/sanity/lib/mappers'
import { CONCEPT_PAGE_QUERY } from '@/sanity/lib/queries'
import { buildPageMetadata, type PageSeo } from '@/sanity/lib/seo'
import type { ConceptStoryContent } from '@/types/concept'
import { notFound } from 'next/navigation'

const stories: ConceptStoryContent[] = [
  {
    id: 'restaurant',
    title: 'About The\nrestaurant',
    titleWidth: 23.5625,
    imageSrc: '/images/concept-1.webp',
    contentSide: 'right',
    tone: 'sand',
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
  },
  {
    id: 'food',
    title: 'What Makes Our Food\nUnique',
    titleWidth: 29.3125,
    imageSrc: '/images/concept-2.webp',
    contentSide: 'left',
    tone: 'peach',
    blocks: [
      {
        title: 'The Cuisine',
        body: 'We proudly focus on a unique modern Burmese brunch experience.',
        width: 18.3125,
      },
      {
        title: 'The Menu',
        body: 'Guests can comfortably browse our signature dishes, coffee, and drinks, easily spotting what they want to try.',
        width: 21.1875,
      },
    ],
  },
  {
    id: 'founder',
    title: 'The Story Behind\nthe Founder',
    titleWidth: 32.625,
    imageSrc: '/images/concept-3.webp',
    contentSide: 'right',
    tone: 'olive',
    paragraphs: [
      {
        body: "“Hello! I'm Hninn. I created this café because I wanted to share my love for my culinary heritage with a contemporary, everyday twist.",
      },
      {
        body: 'My ultimate goal is to welcome you into a cozy, pet-friendly atmosphere where every meal feels like a gathering among close friends.”',
        width: 20.625,
      },
    ],
  },
]

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
      {stories.map((story) => (
        <ConceptStory key={story.id} {...story} />
      ))}
    </>
  )
}
