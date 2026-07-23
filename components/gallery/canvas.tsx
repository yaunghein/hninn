'use client'

import { useEffect, useMemo, useState } from 'react'

import GalleryLoader from '@/components/gallery/loader'
import { InfiniteCanvas } from '@/components/gallery/infinite-canvas'
import type {
  GalleryMediaItem,
  InfiniteCanvasConfig,
} from '@/types/gallery'

type GalleryCanvasProps = {
  images: GalleryMediaItem[]
  activeId: string
  config?: Partial<InfiniteCanvasConfig>
}

type GalleryCanvasInnerProps = {
  media: GalleryMediaItem[]
  config?: Partial<InfiniteCanvasConfig>
}

function GalleryCanvasInner({ media, config }: GalleryCanvasInnerProps) {
  const urls = useMemo(() => media.map((item) => item.url), [media])
  const [progress, setProgress] = useState(0)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let canceled = false
    let loaded = 0
    const total = urls.length

    const finishEmpty = () => {
      if (canceled) return
      setProgress(100)
      setReady(true)
    }

    if (total === 0) {
      queueMicrotask(finishEmpty)
      return () => {
        canceled = true
      }
    }

    const bump = () => {
      if (canceled) return
      loaded += 1
      setProgress(Math.round((loaded / total) * 100))
      if (loaded >= total) setReady(true)
    }

    for (const url of urls) {
      const img = new Image()
      img.onload = bump
      img.onerror = bump
      img.src = url
    }

    return () => {
      canceled = true
    }
  }, [urls])

  return (
    <div className="absolute inset-0">
      <GalleryLoader progress={progress} visible={!ready} />
      {ready ? <InfiniteCanvas media={media} config={config} /> : null}
    </div>
  )
}

export default function GalleryCanvas({
  images,
  config,
  activeId,
}: GalleryCanvasProps) {
  const media = useMemo(() => {
    if (activeId === 'all') return images
    const filtered = images.filter((item) => item.category === activeId)
    return filtered.length > 0 ? filtered : images
  }, [images, activeId])

  return (
    <GalleryCanvasInner key={activeId} media={media} config={config} />
  )
}
