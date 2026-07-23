import type { Metadata } from 'next'
import { GalleryCanvas, GalleryTabs } from '@/components/gallery'
import { resolveTabId, TAB_QUERY_KEY } from '@/lib/utils/tab-query'
import { sanityFetch } from '@/sanity/lib/live'
import {
  toGalleryContent,
  type GalleryPageData,
} from '@/sanity/lib/mappers'
import { GALLERY_PAGE_QUERY } from '@/sanity/lib/queries'
import { buildPageMetadata, type PageSeo } from '@/sanity/lib/seo'
import type { InfiniteCanvasConfig } from '@/types/gallery'
import { notFound } from 'next/navigation'

/** Override any default from `lib/gallery/canvas-config.ts`. */
const canvasConfig: Partial<InfiniteCanvasConfig> = {
  backgroundColor: '#fcf2dc',
  fogColor: '#fcf2dc',
  showControls: false,
  showFps: false,
  chunkSize: 160,
  renderDistance: 1,
  chunkFadeMargin: 1,
  itemsPerChunk: 6,
  planeSizeMin: 28,
  planeSizeRange: 24,
  initialCameraZ: 100,
  dprDesktopMax: 1.25,
  textureAnisotropy: 2,
}

export async function generateMetadata(): Promise<Metadata> {
  const { data } = await sanityFetch({
    query: GALLERY_PAGE_QUERY,
    stega: false,
  })
  return buildPageMetadata((data as { seo?: PageSeo } | null)?.seo, {
    path: '/gallery',
  })
}

export default async function GalleryPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const [{ data }, params] = await Promise.all([
    sanityFetch({ query: GALLERY_PAGE_QUERY }),
    searchParams,
  ])

  if (!data) {
    notFound()
  }

  const { tabs, images } = toGalleryContent(data as GalleryPageData)
  const activeId = resolveTabId(
    params[TAB_QUERY_KEY],
    tabs.map((tab) => tab.id),
  )

  return (
    <div className="flex min-h-dvh flex-col bg-cream">
      <GalleryTabs tabs={tabs} activeId={activeId} />
      <div className="relative min-h-[calc(100dvh-2.75rem)] flex-1">
        <GalleryCanvas
          images={images}
          activeId={activeId}
          config={canvasConfig}
        />
      </div>
    </div>
  )
}
