import { GalleryCanvas, GalleryTabs } from '@/components/gallery'
import { sanityFetch } from '@/sanity/lib/live'
import {
  toGalleryContent,
  type GalleryPageData,
} from '@/sanity/lib/mappers'
import { GALLERY_PAGE_QUERY } from '@/sanity/lib/queries'
import type { InfiniteCanvasConfig } from '@/types/gallery'
import { notFound } from 'next/navigation'

/** Override any default from `lib/gallery/canvas-config.ts`. */
const canvasConfig: Partial<InfiniteCanvasConfig> = {
  backgroundColor: '#fcf2dc',
  fogColor: '#fcf2dc',
  showControls: false,
  showFps: false,
  chunkSize: 160,
  itemsPerChunk: 8,
  planeSizeMin: 28,
  planeSizeRange: 24,
  initialCameraZ: 100,
}

export default async function GalleryPage() {
  const { data } = await sanityFetch({ query: GALLERY_PAGE_QUERY })

  if (!data) {
    notFound()
  }

  const { tabs, images } = toGalleryContent(data as GalleryPageData)

  return (
    <div className="flex min-h-dvh flex-col bg-cream">
      <GalleryTabs tabs={tabs} />
      <div className="relative min-h-[calc(100dvh-2.75rem)] flex-1">
        <GalleryCanvas images={images} config={canvasConfig} />
      </div>
    </div>
  )
}
