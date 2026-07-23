import type { Metadata } from 'next'
import { ContactHero } from '@/components/contact'
import { sanityFetch } from '@/sanity/lib/live'
import {
  toContactContent,
  type ContactPageData,
} from '@/sanity/lib/mappers'
import { CONTACT_PAGE_QUERY } from '@/sanity/lib/queries'
import { buildPageMetadata, type PageSeo } from '@/sanity/lib/seo'
import { notFound } from 'next/navigation'

export async function generateMetadata(): Promise<Metadata> {
  const { data } = await sanityFetch({
    query: CONTACT_PAGE_QUERY,
    stega: false,
  })
  return buildPageMetadata((data as { seo?: PageSeo } | null)?.seo, {
    path: '/contact',
  })
}

export default async function ContactPage() {
  const { data } = await sanityFetch({ query: CONTACT_PAGE_QUERY })

  if (!data) {
    notFound()
  }

  const contact = toContactContent(data as ContactPageData)

  return <ContactHero {...contact} />
}
