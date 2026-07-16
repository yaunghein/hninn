import { Navbar } from '@/components/common'
import { sanityFetch } from '@/sanity/lib/live'
import { NAVBAR_QUERY } from '@/sanity/lib/queries'
import { toNavbarContent } from '@/sanity/lib/site-mapper'

export default async function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const { data } = await sanityFetch({ query: NAVBAR_QUERY })
  const navbar = toNavbarContent(data)

  return (
    <>
      <Navbar {...navbar} />
      <main className="flex-1">{children}</main>
    </>
  )
}
