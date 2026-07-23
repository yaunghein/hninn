import type { Metadata } from 'next'

import { NotFoundContent } from '@/components/common'

export const metadata: Metadata = {
  title: 'Page not found',
  description:
    'This page doesn’t exist. Head back to Hninn for contemporary Burmese brunch in Bangkok.',
}

/** Shown when `notFound()` is called inside a site route (keeps navbar + footer). */
export default function SiteNotFound() {
  return <NotFoundContent />
}
