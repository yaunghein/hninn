import type { Metadata } from 'next'
import HomeFindUs from '@/components/home/find-us'
import GeneralFacts from '@/components/home/general-facts'
import HomeHero from '@/components/home/hero'
import HomeMenu from '@/components/home/menu'
import StickyAtEnd from '@/components/home/sticky-at-end'
import { Footer } from '@/components/common'
import {
  toHomeContent,
  type HomePageData,
} from '@/sanity/lib/home-mapper'
import { HOME_PAGE_QUERY } from '@/sanity/lib/home-query'
import { sanityFetch } from '@/sanity/lib/live'
import { FOOTER_QUERY } from '@/sanity/lib/queries'
import { buildPageMetadata, type PageSeo } from '@/sanity/lib/seo'
import { toFooterContent, type FooterData } from '@/sanity/lib/site-mapper'
import { notFound } from 'next/navigation'

async function getHomePage() {
  return sanityFetch({
    query: HOME_PAGE_QUERY,
    stega: false,
  })
}

export async function generateMetadata(): Promise<Metadata> {
  const { data } = await getHomePage()
  return buildPageMetadata((data as { seo?: PageSeo } | null)?.seo, {
    path: '/',
    absoluteTitle: true,
  })
}

export default async function Home() {
  const [{ data }, { data: footerData }] = await Promise.all([
    sanityFetch({ query: HOME_PAGE_QUERY }),
    sanityFetch({ query: FOOTER_QUERY }),
  ])

  if (!data) {
    notFound()
  }

  const { hero, generalFacts, menu, findUs } = toHomeContent(
    data as HomePageData,
  )
  const footer = toFooterContent(footerData as FooterData)

  return (
    <div className="relative">
      <StickyAtEnd className="z-0">
        <HomeHero {...hero} />
      </StickyAtEnd>
      <StickyAtEnd className="z-10">
        <GeneralFacts {...generalFacts} />
      </StickyAtEnd>
      <div className="relative z-20">
        <HomeMenu {...menu} />
        <HomeFindUs {...findUs} />
        <Footer {...footer} />
      </div>
    </div>
  )
}
