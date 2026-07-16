import type { Metadata } from 'next'
import { ContactHero } from '@/components/contact'
import { Footer } from '@/components/common'
import { sanityFetch } from '@/sanity/lib/live'
import {
  toContactContent,
  type ContactPageData,
} from '@/sanity/lib/mappers'
import { CONTACT_PAGE_QUERY, FOOTER_QUERY } from '@/sanity/lib/queries'
import { buildPageMetadata, type PageSeo } from '@/sanity/lib/seo'
import { toFooterContent } from '@/sanity/lib/site-mapper'
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
  const [{ data }, { data: footerData }] = await Promise.all([
    sanityFetch({ query: CONTACT_PAGE_QUERY }),
    sanityFetch({ query: FOOTER_QUERY }),
  ])

  if (!data) {
    notFound()
  }

  const contact = toContactContent(data as ContactPageData)
  const footer = toFooterContent(footerData)

  return (
    <>
      <ContactHero {...contact} />
      <Footer {...footer} />
    </>
  )
}
