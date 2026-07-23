import type { Metadata } from 'next'
import HomeFindUs from '@/components/home/find-us'
import GeneralFacts from '@/components/home/general-facts'
import HomeHero from '@/components/home/hero'
import HomeMenu from '@/components/home/menu'
import StickyAtEnd from '@/components/home/sticky-at-end'
import UnderHero from '@/components/home/under-hero'
import { toHomeContent, type HomePageData } from '@/sanity/lib/home-mapper'
import { HOME_PAGE_QUERY } from '@/sanity/lib/home-query'
import { sanityFetch } from '@/sanity/lib/live'
import { buildPageMetadata, type PageSeo } from '@/sanity/lib/seo'
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
    path: '/home2',
    absoluteTitle: true,
  })
}

/** Experimental home — UnderHero pin + StickyAtEnd scroll tricks */
export default async function Home2() {
  const { data } = await sanityFetch({ query: HOME_PAGE_QUERY })

  if (!data) {
    notFound()
  }

  const { hero, generalFacts, menu, findUs } = toHomeContent(
    data as HomePageData,
  )

  return (
    <div className="relative">
      <UnderHero hero={<HomeHero {...hero} />}>
        <StickyAtEnd className="z-0">
          <GeneralFacts {...generalFacts} />
        </StickyAtEnd>
      </UnderHero>
      <div className="relative z-20">
        <HomeMenu {...menu} />
        <HomeFindUs {...findUs} />
      </div>
    </div>
  )
}
