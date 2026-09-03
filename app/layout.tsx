import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import { draftMode } from 'next/headers'
import { VisualEditing } from 'next-sanity/visual-editing'

import { DisableDraftMode } from '@/components/common'
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
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : 'https://www.hninnbkk.com')

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: '/',
  },
  title: {
    default: 'Hninn',
    template: '%s | Hninn',
  },
  description:
    'A cozy, pet-friendly space serving contemporary Burmese brunch in Phetchaburi, Bangkok.',
  openGraph: {
    url: '/',
    siteName: 'Hninn',
    type: 'website',
    images: [
      {
        url: '/open-graph.jpg',
        width: 1200,
        height: 630,
        alt: 'Hninn',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/open-graph.jpg'],
  },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const isDraftMode = (await draftMode()).isEnabled

  return (
    <html lang="en" className={`${poppins.variable} h-full antialiased`}>
      <meta name="apple-mobile-web-app-title" content="Hninn" />
      <body className="flex min-h-full flex-col bg-cream font-sans text-brown">
        {/* <GridGuide /> */}
        {children}
        <SanityLive />
        {isDraftMode ? (
          <>
            <DisableDraftMode />
            <VisualEditing />
          </>
        ) : null}
      </body>
    </html>
  )
}
