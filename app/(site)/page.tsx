import HomeFindUs from '@/components/home/find-us'
import GeneralFacts from '@/components/home/general-facts'
import HomeHero from '@/components/home/hero'
import HomeMenu from '@/components/home/menu'
import { Footer } from '@/components/common'
import type { FooterContent } from '@/components/common/footer'
import {
  toHomeContent,
  type HomePageData,
} from '@/sanity/lib/home-mapper'
import { HOME_PAGE_QUERY } from '@/sanity/lib/home-query'
import { sanityFetch } from '@/sanity/lib/live'
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

export default async function Home() {
  const { data } = await sanityFetch({ query: HOME_PAGE_QUERY })

  if (!data) {
    notFound()
  }

  const { hero, generalFacts, menu, findUs } = toHomeContent(
    data as HomePageData,
  )

  return (
    <>
      <HomeHero {...hero} />
      <GeneralFacts {...generalFacts} />
      <HomeMenu {...menu} />
      <HomeFindUs {...findUs} />
      <Footer {...footer} />
    </>
  )
}
