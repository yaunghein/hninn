/**
 * This route is responsible for the built-in authoring environment using Sanity Studio.
 * All routes under your studio path is handled by this file using Next.js' catch-all routes:
 * https://nextjs.org/docs/routing/dynamic-routes#catch-all-routes
 *
 * You can learn more about the next-sanity package here:
 * https://github.com/sanity-io/next-sanity
 */

import type { Metadata, Viewport } from 'next'
import {
  metadata as studioMetadata,
  viewport as studioViewport,
} from 'next-sanity/studio'
import { NextStudio } from 'next-sanity/studio'
import config from '../../../sanity.config'

export const dynamic = 'force-static'

export const metadata: Metadata = {
  ...studioMetadata,
  title: {
    absolute: 'Hninn Studio',
  },
  description: 'Hninn content studio',
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
}

export const viewport: Viewport = {
  ...studioViewport,
}

export default function StudioPage() {
  return <NextStudio config={config} />
}
