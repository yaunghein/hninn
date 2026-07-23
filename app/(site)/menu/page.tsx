import type { Metadata } from 'next'
import { MenuGrid, MenuHeader, MenuTabs } from '@/components/menu'
import {
  toMenuContent,
  type MenuPageData,
} from '@/sanity/lib/menu-mapper'
import { sanityFetch } from '@/sanity/lib/live'
import { MENU_PAGE_QUERY } from '@/sanity/lib/queries'
import { buildPageMetadata, type PageSeo } from '@/sanity/lib/seo'
import { resolveTabId, TAB_QUERY_KEY } from '@/lib/utils/tab-query'

export async function generateMetadata(): Promise<Metadata> {
  const { data } = await sanityFetch({
    query: MENU_PAGE_QUERY,
    stega: false,
  })
  return buildPageMetadata((data as { seo?: PageSeo } | null)?.seo, {
    path: '/menu',
  })
}

export default async function MenuPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const [{ data }, params] = await Promise.all([
    sanityFetch({ query: MENU_PAGE_QUERY }),
    searchParams,
  ])
  const { tabs, items } = toMenuContent(data as MenuPageData | null)
  const activeId = resolveTabId(
    params[TAB_QUERY_KEY],
    tabs.map((tab) => tab.id),
  )

  return (
    <div className="bg-cream">
      <MenuHeader />
      <MenuTabs tabs={tabs} activeId={activeId} />
      <MenuGrid tabs={tabs} items={items} activeId={activeId} />
    </div>
  )
}
