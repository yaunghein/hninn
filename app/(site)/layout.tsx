import { Navbar, PageLoader, SiteFooter, SmoothScroll } from '@/components/common'
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
  const [{ data: navbarData }, { data: footerData }] = await Promise.all([
    sanityFetch({ query: NAVBAR_QUERY }),
    sanityFetch({ query: FOOTER_QUERY }),
  ])
  const navbar = toNavbarContent(navbarData as NavbarData)
  const footer = toFooterContent(footerData as FooterData)

  return (
    <SmoothScroll>
      <PageLoader />
      <Navbar {...navbar} />
      <main className="flex-1">{children}</main>
      <SiteFooter {...footer} />
    </SmoothScroll>
  )
}
