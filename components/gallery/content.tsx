'use client'

import GalleryCanvas from '@/components/gallery/canvas'
import GalleryTabs, { type GalleryTab } from '@/components/gallery/tabs'
import { useTabQueryState } from '@/lib/hooks/use-tab-query-state'
import type { GalleryMediaItem, InfiniteCanvasConfig } from '@/types/gallery'

type GalleryContentProps = {
  tabs: GalleryTab[]
  images: GalleryMediaItem[]
  initialActiveId: string
  config?: Partial<InfiniteCanvasConfig>
}

export default function GalleryContent({
  tabs,
  images,
  initialActiveId,
  config,
}: GalleryContentProps) {
  const { activeId, selectTab } = useTabQueryState(initialActiveId)

  return (
    <>
      <GalleryTabs tabs={tabs} activeId={activeId} onSelect={selectTab} />
      <div className="relative min-h-[calc(100dvh-2.75rem)] flex-1">
        <GalleryCanvas images={images} activeId={activeId} config={config} />
      </div>
    </>
  )
}
