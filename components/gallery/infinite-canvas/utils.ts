import * as THREE from 'three'

import type { InfiniteCanvasConfig } from '@/types/gallery'
import { hashString, seededRandom } from '@/lib/utils/math'

export type PlaneData = {
  id: string
  position: THREE.Vector3
  scale: THREE.Vector3
  mediaIndex: number
}

export type ChunkData = {
  key: string
  cx: number
  cy: number
  cz: number
}

const planeCaches = new WeakMap<object, Map<string, PlaneData[]>>()

function getCache(config: InfiniteCanvasConfig) {
  let cache = planeCaches.get(config)
  if (!cache) {
    cache = new Map()
    planeCaches.set(config, cache)
  }
  return cache
}

function touchPlaneCache(cache: Map<string, PlaneData[]>, key: string) {
  const value = cache.get(key)
  if (!value) return
  cache.delete(key)
  cache.set(key, value)
}

function evictPlaneCache(
  cache: Map<string, PlaneData[]>,
  maxSize: number,
) {
  while (cache.size > maxSize) {
    const firstKey = cache.keys().next().value as string | undefined
    if (!firstKey) break
    cache.delete(firstKey)
  }
}

export function getChunkUpdateThrottleMs(
  config: InfiniteCanvasConfig,
  isZooming: boolean,
  zoomSpeed: number,
): number {
  if (zoomSpeed > config.fastZoomSpeedThreshold) {
    return config.throttleFastZoomMs
  }
  if (isZooming) {
    return config.throttleZoomingMs
  }
  return config.throttleIdleMs
}

export function generateChunkPlanes(
  cx: number,
  cy: number,
  cz: number,
  config: InfiniteCanvasConfig,
): PlaneData[] {
  const planes: PlaneData[] = []
  const seed = hashString(`${cx},${cy},${cz}`)
  const { chunkSize, itemsPerChunk, planeSizeMin, planeSizeRange } = config

  for (let i = 0; i < itemsPerChunk; i++) {
    const s = seed + i * 1000
    const r = (n: number) => seededRandom(s + n)
    const size = planeSizeMin + r(4) * planeSizeRange

    planes.push({
      id: `${cx}-${cy}-${cz}-${i}`,
      position: new THREE.Vector3(
        cx * chunkSize + r(0) * chunkSize,
        cy * chunkSize + r(1) * chunkSize,
        cz * chunkSize + r(2) * chunkSize,
      ),
      scale: new THREE.Vector3(size, size, 1),
      mediaIndex: Math.floor(r(5) * 1_000_000),
    })
  }

  return planes
}

export function generateChunkPlanesCached(
  cx: number,
  cy: number,
  cz: number,
  config: InfiniteCanvasConfig,
): PlaneData[] {
  const cache = getCache(config)
  const key = `${cx},${cy},${cz}`
  const cached = cache.get(key)

  if (cached) {
    touchPlaneCache(cache, key)
    return cached
  }

  const planes = generateChunkPlanes(cx, cy, cz, config)
  cache.set(key, planes)
  evictPlaneCache(cache, config.maxPlaneCache)
  return planes
}

export function shouldThrottleUpdate(
  lastUpdateTime: number,
  throttleMs: number,
  currentTime: number,
): boolean {
  return currentTime - lastUpdateTime >= throttleMs
}
