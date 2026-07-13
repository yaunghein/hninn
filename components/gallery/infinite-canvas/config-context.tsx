'use client'

import { createContext, useContext, type ReactNode } from 'react'

import type { InfiniteCanvasConfig } from '@/types/gallery'
import {
  buildChunkOffsets,
  DEFAULT_INFINITE_CANVAS_CONFIG,
  type ChunkOffset,
} from '@/lib/gallery/canvas-config'

type CanvasRuntime = {
  config: InfiniteCanvasConfig
  chunkOffsets: ChunkOffset[]
}

const CanvasConfigContext = createContext<CanvasRuntime>({
  config: DEFAULT_INFINITE_CANVAS_CONFIG,
  chunkOffsets: buildChunkOffsets(
    DEFAULT_INFINITE_CANVAS_CONFIG.renderDistance,
    DEFAULT_INFINITE_CANVAS_CONFIG.chunkFadeMargin,
  ),
})

export function CanvasConfigProvider({
  config,
  children,
}: {
  config: InfiniteCanvasConfig
  children: ReactNode
}) {
  const chunkOffsets = buildChunkOffsets(
    config.renderDistance,
    config.chunkFadeMargin,
  )

  return (
    <CanvasConfigContext.Provider value={{ config, chunkOffsets }}>
      {children}
    </CanvasConfigContext.Provider>
  )
}

export function useCanvasConfig() {
  return useContext(CanvasConfigContext)
}
