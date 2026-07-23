import type { Metadata } from 'next'

import { Navbar, NotFoundContent, SiteFooter } from '@/components/common'
import { sanityFetch } from '@/sanity/lib/live'
import { FOOTER_QUERY, NAVBAR_QUERY } from '@/sanity/lib/queries'
import {
  toFooterContent,
  toNavbarContent,
  type FooterData,
  type NavbarData,
} from '@/sanity/lib/site-mapper'

export const metadata: Metadata = {
  title: 'Page not found',
  description:
    'This page doesn’t exist. Head back to Hninn for contemporary Burmese brunch in Bangkok.',
}

/** Root 404 for unmatched URLs (root layout only — include site chrome here). */
export default async function RootNotFound() {
  const [{ data: navbarData }, { data: footerData }] = await Promise.all([
    sanityFetch({ query: NAVBAR_QUERY }),
    sanityFetch({ query: FOOTER_QUERY }),
  ])
  const navbar = toNavbarContent(navbarData as NavbarData)
  const footer = toFooterContent(footerData as FooterData)

  return (
    <>
      <Navbar {...navbar} />
      <main className="flex-1">
        <NotFoundContent />
      </main>
      <SiteFooter {...footer} />
    </>
  )
}
