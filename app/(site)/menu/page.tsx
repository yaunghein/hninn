import type { Metadata } from 'next'
import { Footer } from '@/components/common'
import { MenuGrid, MenuHeader, MenuTabs } from '@/components/menu'
import {
  toMenuContent,
  type MenuPageData,
} from '@/sanity/lib/menu-mapper'
import { sanityFetch } from '@/sanity/lib/live'
import { FOOTER_QUERY, MENU_PAGE_QUERY } from '@/sanity/lib/queries'
import { buildPageMetadata, type PageSeo } from '@/sanity/lib/seo'
import { toFooterContent, type FooterData } from '@/sanity/lib/site-mapper'

export async function generateMetadata(): Promise<Metadata> {
  const { data } = await sanityFetch({
    query: MENU_PAGE_QUERY,
    stega: false,
  })
  return buildPageMetadata((data as { seo?: PageSeo } | null)?.seo, {
    path: '/menu',
  })
}

export default async function MenuPage() {
  const [{ data }, { data: footerData }] = await Promise.all([
    sanityFetch({ query: MENU_PAGE_QUERY }),
    sanityFetch({ query: FOOTER_QUERY }),
  ])

  const { tabs, items } = toMenuContent(data as MenuPageData | null)
  const footer = toFooterContent(footerData as FooterData)

  return (
    <div className="bg-cream">
      <MenuHeader />
      <MenuTabs tabs={tabs} />
      <MenuGrid tabs={tabs} items={items} />
      <Footer {...footer} />
    </div>
  )
}
