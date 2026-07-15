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

export const metadata: Metadata = {
  title: 'Hninn',
  description: 'The Restaurant',
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
