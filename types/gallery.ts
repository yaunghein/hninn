export type GalleryCategory = 'all' | 'event' | 'interior' | 'dishes' | 'pets'

export type GalleryMediaItem = {
  url: string
  width: number
  height: number
  category: Exclude<GalleryCategory, 'all'>
  alt?: string
}

/** All tunable infinite-canvas settings. Override any field from the page. */
export type InfiniteCanvasConfig = {
  // World / chunks
  chunkSize: number
  renderDistance: number
  chunkFadeMargin: number
  itemsPerChunk: number
  planeSizeMin: number
  planeSizeRange: number
  maxPlaneCache: number

  // Camera
  initialCameraZ: number
  cameraFov: number
  cameraNear: number
  cameraFar: number

  // Look
  fogNear: number
  fogFar: number
  backgroundColor: string
  fogColor: string

  // Motion
  maxVelocity: number
  keyboardSpeed: number
  velocityLerp: number
  velocityDecay: number
  depthFadeStart: number
  depthFadeEnd: number
  invisThreshold: number

  // Interaction
  dragSensitivity: number
  touchDragSensitivity: number
  wheelSensitivity: number
  pinchSensitivity: number
  driftBase: number
  driftLerpNormal: number
  driftLerpZooming: number
  zoomFactorMin: number
  zoomFactorMax: number
  zoomFactorDivisor: number
  scrollAccumDecay: number

  // Chunk update throttling (ms)
  throttleIdleMs: number
  throttleZoomingMs: number
  throttleFastZoomMs: number
  fastZoomSpeedThreshold: number
  zoomingVelocityThreshold: number

  // Rendering
  dprDesktopMax: number
  dprTouchMax: number
  textureAnisotropy: number
  antialias: boolean

  // UI
  showFps: boolean
  showControls: boolean
}

export type InfiniteCanvasProps = {
  media: GalleryMediaItem[]
  config?: Partial<InfiniteCanvasConfig>
  onTextureProgress?: (progress: number) => void
  className?: string
}
