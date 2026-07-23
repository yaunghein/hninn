import type { Metadata } from 'next'
import { MenuGrid, MenuHeader, MenuTabs } from '@/components/menu'
import {
  toMenuContent,
  type MenuPageData,
} from '@/sanity/lib/menu-mapper'
import { sanityFetch } from '@/sanity/lib/live'
import { MENU_PAGE_QUERY } from '@/sanity/lib/queries'
import { buildPageMetadata, type PageSeo } from '@/sanity/lib/seo'

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
  const { data } = await sanityFetch({ query: MENU_PAGE_QUERY })
  const { tabs, items } = toMenuContent(data as MenuPageData | null)

  return (
    <div className="bg-cream">
      <MenuHeader />
      <MenuTabs tabs={tabs} />
      <MenuGrid tabs={tabs} items={items} />
    </div>
  )
}
