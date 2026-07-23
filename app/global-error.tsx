'use client'

import { Poppins } from 'next/font/google'
import { useEffect } from 'react'

import { Button, ErrorContent } from '@/components/common'

import './globals.css'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
})

/** Root-layout error boundary — must define its own html/body. */
export default function GlobalError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string }
  unstable_retry: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <html lang="en" className={`${poppins.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-cream font-sans text-brown">
        <main className="flex-1">
          <ErrorContent
            actions={
              <>
                <Button
                  label="Try again"
                  color="olive"
                  hoverColor="cream"
                  onClick={() => unstable_retry()}
                />
                <Button
                  label="Back home"
                  href="/"
                  color="olive"
                  hoverColor="cream"
                />
              </>
            }
          />
        </main>
        <title>Something went wrong | Hninn</title>
      </body>
    </html>
  )
}
