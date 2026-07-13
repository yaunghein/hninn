import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'

import { Navbar, GridGuide } from '@/components/common'
import type { NavbarContent } from '@/components/common/navbar'
import './globals.css'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Hninn',
  description: 'The Restaurant',
}

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${poppins.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-cream font-sans text-brown">
        <GridGuide />
        <main className="flex-1">{children}</main>
        <Navbar {...navbar} />
      </body>
    </html>
  )
}
