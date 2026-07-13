import * as THREE from 'three'

import type { GalleryMediaItem } from '@/types/gallery'

const textureCache = new Map<string, THREE.Texture>()
const loadCallbacks = new Map<string, Set<(tex: THREE.Texture) => void>>()
const loader = new THREE.TextureLoader()

function isTextureLoaded(tex: THREE.Texture): boolean {
  const img = tex.image as HTMLImageElement | undefined
  return (
    img instanceof HTMLImageElement && img.complete && img.naturalWidth > 0
  )
}

export function getTexture(
  item: GalleryMediaItem,
  anisotropy: number,
  onLoad?: (texture: THREE.Texture) => void,
): THREE.Texture {
  const key = item.url
  const existing = textureCache.get(key)

  if (existing) {
    if (onLoad) {
      if (isTextureLoaded(existing)) {
        onLoad(existing)
      } else {
        loadCallbacks.get(key)?.add(onLoad)
      }
    }
    return existing
  }

  const callbacks = new Set<(tex: THREE.Texture) => void>()
  if (onLoad) callbacks.add(onLoad)
  loadCallbacks.set(key, callbacks)

  const texture = loader.load(
    key,
    (tex) => {
      tex.minFilter = THREE.LinearMipmapLinearFilter
      tex.magFilter = THREE.LinearFilter
      tex.generateMipmaps = true
      tex.anisotropy = anisotropy
      tex.colorSpace = THREE.SRGBColorSpace
      tex.needsUpdate = true

      loadCallbacks.get(key)?.forEach((cb) => {
        try {
          cb(tex)
        } catch (err) {
          console.error('Texture callback failed:', err)
        }
      })
      loadCallbacks.delete(key)
    },
    undefined,
    (err) => console.error('Texture load failed:', key, err),
  )

  textureCache.set(key, texture)
  return texture
}
