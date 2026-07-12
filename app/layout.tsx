import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'

import { Footer, Navbar } from '@/app/components/common'
import type { FooterContent } from '@/app/components/common/footer'
import type { NavbarContent } from '@/app/components/common/navbar'
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

const footer: FooterContent = {
  social: [
    { label: 'Instagram', href: 'https://instagram.com' },
    { label: 'Facebook', href: 'https://facebook.com' },
    { label: 'Tiktok', href: 'https://tiktok.com' },
  ],
  address: '1980 Phetchaburi Rd, Bang Kapi, Huai Khwang, Bangkok 10310',
  hours: '7:00 AM – 9:00 PM\n(Closed Wednesdays)',
  legal: [
    { label: 'Terms & Conditions', href: '/terms' },
    { label: 'Privacy Policy', href: '/privacy' },
  ],
  copyright: '© 2026 Hninn. All rights reserved.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${poppins.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-cream font-sans text-brown">
        <main className="flex-1">{children}</main>
        <Navbar {...navbar} />
        <Footer {...footer} />
      </body>
    </html>
  )
}
