import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'

import { SanityLive } from '@/sanity/lib/live'
import './globals.css'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
})

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'http://localhost:3000')

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Hninn',
    template: '%s | Hninn',
  },
  description:
    'A cozy, pet-friendly space serving contemporary Burmese brunch in Phetchaburi, Bangkok.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${poppins.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-cream font-sans text-brown">
        {/* <GridGuide /> */}
        {children}
        <SanityLive />
      </body>
    </html>
  )
}
