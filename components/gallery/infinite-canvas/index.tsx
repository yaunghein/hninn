'use client'

import dynamic from 'next/dynamic'
import { useMemo } from 'react'

import { CanvasConfigProvider } from '@/components/gallery/infinite-canvas/config-context'
import { mergeCanvasConfig } from '@/lib/gallery/canvas-config'
import type { InfiniteCanvasProps } from '@/types/gallery'

const InfiniteCanvasScene = dynamic(
  () =>
    import('@/components/gallery/infinite-canvas/scene').then(
      (mod) => mod.InfiniteCanvasScene,
    ),
  { ssr: false },
)

export function InfiniteCanvas({
  media,
  config: configOverrides,
  onTextureProgress,
  className,
}: InfiniteCanvasProps) {
  const config = useMemo(
    () => mergeCanvasConfig(configOverrides),
    [configOverrides],
  )

  if (!media.length) return null

  return (
    <CanvasConfigProvider config={config}>
      <InfiniteCanvasScene
        media={media}
        onTextureProgress={onTextureProgress}
        className={className}
      />
    </CanvasConfigProvider>
  )
}
