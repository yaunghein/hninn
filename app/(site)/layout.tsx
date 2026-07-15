import { Navbar } from '@/components/common'
import type { NavbarContent } from '@/components/common/navbar'

const navbar: NavbarContent = {
  hours: ['Open 7:00 - 23:00', 'closed on wed'],
  gallery: { label: 'gallery', href: '/gallery' },
  reservation: { label: 'Make a reservation', href: '/reservation' },
  menuLinks: [
    { label: 'Menu', href: '/menu' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'Concept', href: '/concept' },
    { label: 'host an event', href: '/events' },
    { label: 'getting here', href: '/getting-here' },
    { label: 'contact', href: '/contact' },
  ],
}

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Navbar {...navbar} />
      <main className="flex-1">{children}</main>
    </>
  )
}
