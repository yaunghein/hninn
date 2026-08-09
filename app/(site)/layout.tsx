import { cookies } from 'next/headers'

import {
  // GridGuide,
  Navbar,
  PageLoader,
  SiteFooter,
  SmoothScroll,
} from '@/components/common'
import {
  hasRecentPageLoader,
  PAGE_LOADER_COOKIE,
} from '@/lib/utils/page-loader-cookie'
import { sanityFetch } from '@/sanity/lib/live'
import { FOOTER_QUERY, NAVBAR_QUERY } from '@/sanity/lib/queries'
import {
  toFooterContent,
  toNavbarContent,
  type FooterData,
  type NavbarData,
} from '@/sanity/lib/site-mapper'

export default async function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const cookieStore = await cookies()
  const showLoader = !hasRecentPageLoader(
    cookieStore.get(PAGE_LOADER_COOKIE)?.value,
  )

  const [{ data: navbarData }, { data: footerData }] = await Promise.all([
    sanityFetch({ query: NAVBAR_QUERY }),
    sanityFetch({ query: FOOTER_QUERY }),
  ])
  const navbar = toNavbarContent(navbarData as NavbarData)
  const footer = toFooterContent(footerData as FooterData)

  return (
    <SmoothScroll>
      {/* <GridGuide /> */}
      <PageLoader showInitially={showLoader} />
      <Navbar {...navbar} />
      <main className="flex-1">{children}</main>
      <SiteFooter {...footer} />
    </SmoothScroll>
  )
}
