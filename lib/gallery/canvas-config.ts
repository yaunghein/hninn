import type { InfiniteCanvasConfig } from '@/types/gallery'

/** Defaults ported from the infinite-canvas example — override per page. */
export const DEFAULT_INFINITE_CANVAS_CONFIG: InfiniteCanvasConfig = {
  chunkSize: 110,
  renderDistance: 2,
  chunkFadeMargin: 1,
  itemsPerChunk: 5,
  planeSizeMin: 12,
  planeSizeRange: 8,
  maxPlaneCache: 256,

  initialCameraZ: 50,
  cameraFov: 60,
  cameraNear: 1,
  cameraFar: 500,

  fogNear: 120,
  fogFar: 320,
  backgroundColor: '#fcf2dc',
  fogColor: '#fcf2dc',

  maxVelocity: 3.2,
  keyboardSpeed: 0.18,
  velocityLerp: 0.16,
  velocityDecay: 0.9,
  depthFadeStart: 140,
  depthFadeEnd: 260,
  invisThreshold: 0.01,

  dragSensitivity: 0.025,
  touchDragSensitivity: 0.02,
  wheelSensitivity: 0.006,
  pinchSensitivity: 0.006,
  driftBase: 8,
  driftLerpNormal: 0.12,
  driftLerpZooming: 0.2,
  zoomFactorMin: 0.3,
  zoomFactorMax: 2,
  zoomFactorDivisor: 50,
  scrollAccumDecay: 0.8,

  throttleIdleMs: 100,
  throttleZoomingMs: 400,
  throttleFastZoomMs: 500,
  fastZoomSpeedThreshold: 1,
  zoomingVelocityThreshold: 0.05,

  dprDesktopMax: 1.5,
  dprTouchMax: 1.25,
  textureAnisotropy: 4,
  antialias: false,

  showFps: false,
  showControls: false,
}

export function mergeCanvasConfig(
  overrides?: Partial<InfiniteCanvasConfig>,
): InfiniteCanvasConfig {
  return { ...DEFAULT_INFINITE_CANVAS_CONFIG, ...overrides }
}

export type ChunkOffset = {
  dx: number
  dy: number
  dz: number
  dist: number
}

export function buildChunkOffsets(
  renderDistance: number,
  chunkFadeMargin: number,
): ChunkOffset[] {
  const maxDist = renderDistance + chunkFadeMargin
  const offsets: ChunkOffset[] = []

  for (let dx = -maxDist; dx <= maxDist; dx++) {
    for (let dy = -maxDist; dy <= maxDist; dy++) {
      for (let dz = -maxDist; dz <= maxDist; dz++) {
        const dist = Math.max(Math.abs(dx), Math.abs(dy), Math.abs(dz))
        if (dist > maxDist) continue
        offsets.push({ dx, dy, dz, dist })
      }
    }
  }

  return offsets
}
