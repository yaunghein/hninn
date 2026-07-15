import type { Metadata } from 'next'
import { ContactHero } from '@/components/contact'
import { Footer } from '@/components/common'
import type { FooterContent } from '@/components/common/footer'
import { sanityFetch } from '@/sanity/lib/live'
import {
  toContactContent,
  type ContactPageData,
} from '@/sanity/lib/mappers'
import { CONTACT_PAGE_QUERY } from '@/sanity/lib/queries'
import { buildPageMetadata, type PageSeo } from '@/sanity/lib/seo'
import { notFound } from 'next/navigation'

const footer: FooterContent = {
  social: [
    { label: 'Instagram', href: 'https://instagram.com' },
    { label: 'Facebook', href: 'https://facebook.com' },
    { label: 'Tiktok', href: 'https://tiktok.com' },
  ],
  address: '1980 Phetchaburi Rd, Bang Kapi, Huai Khwang, Bangkok 10310',
  hours: '7:00 AM – 9:00 PM\n(Closed Wednesdays)',
  legal: [
    { label: 'Terms & Conditions', href: '/terms' },
    { label: 'Privacy Policy', href: '/privacy' },
  ],
  copyright: '© 2026 Hninn. All rights reserved.',
}

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

  return (
    <>
      <ContactHero {...contact} />
      <Footer {...footer} />
    </>
  )
}
