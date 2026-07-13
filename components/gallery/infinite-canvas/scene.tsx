'use client'

import {
  KeyboardControls,
  Stats,
  useKeyboardControls,
  useProgress,
} from '@react-three/drei'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'

import { useCanvasConfig } from '@/components/gallery/infinite-canvas/config-context'
import { getTexture } from '@/components/gallery/infinite-canvas/texture-manager'
import { useIsTouchDevice } from '@/components/gallery/infinite-canvas/use-is-touch-device'
import type {
  ChunkData,
  PlaneData,
} from '@/components/gallery/infinite-canvas/utils'
import {
  generateChunkPlanesCached,
  getChunkUpdateThrottleMs,
  shouldThrottleUpdate,
} from '@/components/gallery/infinite-canvas/utils'
import { clamp, lerp } from '@/lib/utils/math'
import { cn } from '@/lib/utils/cn'
import type { GalleryMediaItem } from '@/types/gallery'

const PLANE_GEOMETRY = new THREE.PlaneGeometry(1, 1)

const KEYBOARD_MAP = [
  { name: 'forward', keys: ['w', 'W', 'ArrowUp'] },
  { name: 'backward', keys: ['s', 'S', 'ArrowDown'] },
  { name: 'left', keys: ['a', 'A', 'ArrowLeft'] },
  { name: 'right', keys: ['d', 'D', 'ArrowRight'] },
  { name: 'up', keys: ['e', 'E'] },
  { name: 'down', keys: ['q', 'Q'] },
]

type KeyboardKeys = {
  forward: boolean
  backward: boolean
  left: boolean
  right: boolean
  up: boolean
  down: boolean
}

type CameraGridState = {
  cx: number
  cy: number
  cz: number
  camZ: number
}

function getTouchDistance(touches: Touch[]) {
  if (touches.length < 2) return 0
  const [t1, t2] = touches
  const dx = t1.clientX - t2.clientX
  const dy = t1.clientY - t2.clientY
  return Math.sqrt(dx * dx + dy * dy)
}

function MediaPlane({
  position,
  scale,
  media,
  chunkCx,
  chunkCy,
  chunkCz,
  cameraGridRef,
}: {
  position: THREE.Vector3
  scale: THREE.Vector3
  media: GalleryMediaItem
  chunkCx: number
  chunkCy: number
  chunkCz: number
  cameraGridRef: React.RefObject<CameraGridState>
}) {
  const { config } = useCanvasConfig()
  const meshRef = useRef<THREE.Mesh>(null)
  const materialRef = useRef<THREE.MeshBasicMaterial>(null)
  const localState = useRef({ opacity: 0, frame: 0, ready: false })
  const [texture, setTexture] = useState<THREE.Texture | null>(null)
  const [readyUrl, setReadyUrl] = useState<string | null>(null)
  const mediaUrl = media.url

  // Reset when media identity changes (allowed during render).
  const [activeUrl, setActiveUrl] = useState(mediaUrl)
  if (mediaUrl !== activeUrl) {
    setActiveUrl(mediaUrl)
    setTexture(null)
    setReadyUrl(null)
  }

  const isReady = readyUrl === mediaUrl && texture !== null

  useFrame(() => {
    const material = materialRef.current
    const mesh = meshRef.current
    const state = localState.current
    if (!material || !mesh) return

    state.frame = (state.frame + 1) & 1
    if (state.opacity < config.invisThreshold && !mesh.visible && state.frame === 0) {
      return
    }

    const cam = cameraGridRef.current
    const dist = Math.max(
      Math.abs(chunkCx - cam.cx),
      Math.abs(chunkCy - cam.cy),
      Math.abs(chunkCz - cam.cz),
    )
    const absDepth = Math.abs(position.z - cam.camZ)

    if (absDepth > config.depthFadeEnd + 50) {
      state.opacity = 0
      material.opacity = 0
      material.depthWrite = false
      mesh.visible = false
      return
    }

    const gridFade =
      dist <= config.renderDistance
        ? 1
        : Math.max(
            0,
            1 -
              (dist - config.renderDistance) /
                Math.max(config.chunkFadeMargin, 0.0001),
          )

    const depthFade =
      absDepth <= config.depthFadeStart
        ? 1
        : Math.max(
            0,
            1 -
              (absDepth - config.depthFadeStart) /
                Math.max(config.depthFadeEnd - config.depthFadeStart, 0.0001),
          )

    const target = Math.min(gridFade, depthFade * depthFade)
    state.opacity =
      target < config.invisThreshold && state.opacity < config.invisThreshold
        ? 0
        : lerp(state.opacity, target, 0.18)

    const isFullyOpaque = state.opacity > 0.99
    material.opacity = isFullyOpaque ? 1 : state.opacity
    material.depthWrite = isFullyOpaque
    mesh.visible = state.opacity > config.invisThreshold
  })

  const displayScale = useMemo(() => {
    if (media.width && media.height) {
      const aspect = media.width / media.height
      return new THREE.Vector3(scale.y * aspect, scale.y, 1)
    }
    return scale
  }, [media.width, media.height, scale])

  useEffect(() => {
    let canceled = false
    const state = localState.current
    state.ready = false
    state.opacity = 0

    const material = materialRef.current
    if (material) {
      material.opacity = 0
      material.depthWrite = false
      material.map = null
    }

    getTexture(media, config.textureAnisotropy, (tex) => {
      queueMicrotask(() => {
        if (canceled) return
        state.ready = true
        setTexture(tex)
        setReadyUrl(media.url)
      })
    })

    return () => {
      canceled = true
    }
  }, [media, config.textureAnisotropy])

  useEffect(() => {
    const material = materialRef.current
    const mesh = meshRef.current
    const state = localState.current
    if (!material || !mesh || !texture || !isReady || !state.ready) return

    material.map = texture
    material.opacity = state.opacity
    material.depthWrite = state.opacity >= 1
    mesh.scale.copy(displayScale)
  }, [displayScale, texture, isReady])

  if (!texture || !isReady) return null

  return (
    <mesh
      ref={meshRef}
      position={position}
      scale={displayScale}
      visible={false}
      geometry={PLANE_GEOMETRY}
    >
      <meshBasicMaterial
        ref={materialRef}
        transparent
        opacity={0}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

function Chunk({
  cx,
  cy,
  cz,
  media,
  cameraGridRef,
}: {
  cx: number
  cy: number
  cz: number
  media: GalleryMediaItem[]
  cameraGridRef: React.RefObject<CameraGridState>
}) {
  const { config } = useCanvasConfig()
  const [planes, setPlanes] = useState<PlaneData[] | null>(null)

  useEffect(() => {
    let canceled = false
    const run = () => {
      if (!canceled) setPlanes(generateChunkPlanesCached(cx, cy, cz, config))
    }

    if (typeof requestIdleCallback !== 'undefined') {
      const id = requestIdleCallback(run, { timeout: 100 })
      return () => {
        canceled = true
        cancelIdleCallback(id)
      }
    }

    const id = setTimeout(run, 0)
    return () => {
      canceled = true
      clearTimeout(id)
    }
  }, [cx, cy, cz, config])

  if (!planes) return null

  return (
    <group>
      {planes.map((plane) => {
        const mediaItem = media[plane.mediaIndex % media.length]
        if (!mediaItem) return null

        return (
          <MediaPlane
            key={plane.id}
            position={plane.position}
            scale={plane.scale}
            media={mediaItem}
            chunkCx={cx}
            chunkCy={cy}
            chunkCz={cz}
            cameraGridRef={cameraGridRef}
          />
        )
      })}
    </group>
  )
}

type ControllerState = {
  velocity: { x: number; y: number; z: number }
  targetVel: { x: number; y: number; z: number }
  basePos: { x: number; y: number; z: number }
  drift: { x: number; y: number }
  mouse: { x: number; y: number }
  lastMouse: { x: number; y: number }
  scrollAccum: number
  isDragging: boolean
  lastTouches: Touch[]
  lastTouchDist: number
  lastChunkKey: string
  lastChunkUpdate: number
  pendingChunk: { cx: number; cy: number; cz: number } | null
}

function createInitialState(camZ: number): ControllerState {
  return {
    velocity: { x: 0, y: 0, z: 0 },
    targetVel: { x: 0, y: 0, z: 0 },
    basePos: { x: 0, y: 0, z: camZ },
    drift: { x: 0, y: 0 },
    mouse: { x: 0, y: 0 },
    lastMouse: { x: 0, y: 0 },
    scrollAccum: 0,
    isDragging: false,
    lastTouches: [],
    lastTouchDist: 0,
    lastChunkKey: '',
    lastChunkUpdate: 0,
    pendingChunk: null,
  }
}

function buildInitialChunks(
  offsets: { dx: number; dy: number; dz: number }[],
): ChunkData[] {
  return offsets.map((o) => ({
    key: `${o.dx},${o.dy},${o.dz}`,
    cx: o.dx,
    cy: o.dy,
    cz: o.dz,
  }))
}

function SceneController({
  media,
  onTextureProgress,
  setCursor,
}: {
  media: GalleryMediaItem[]
  onTextureProgress?: (progress: number) => void
  setCursor: (cursor: string) => void
}) {
  const { config, chunkOffsets } = useCanvasConfig()
  const { camera, gl } = useThree()
  const isTouchDevice = useIsTouchDevice()
  const [, getKeys] = useKeyboardControls<keyof KeyboardKeys>()
  const state = useRef<ControllerState>(
    createInitialState(config.initialCameraZ),
  )
  const cameraGridRef = useRef<CameraGridState>({
    cx: 0,
    cy: 0,
    cz: 0,
    camZ: camera.position.z,
  })
  const [chunks, setChunks] = useState<ChunkData[]>(() =>
    buildInitialChunks(chunkOffsets),
  )
  const { progress } = useProgress()
  const maxProgress = useRef(0)

  useEffect(() => {
    const rounded = Math.round(progress)
    if (rounded > maxProgress.current) {
      maxProgress.current = rounded
      onTextureProgress?.(rounded)
    }
  }, [progress, onTextureProgress])

  useEffect(() => {
    const canvas = gl.domElement
    const s = state.current

    const onMouseDown = (e: MouseEvent) => {
      s.isDragging = true
      s.lastMouse = { x: e.clientX, y: e.clientY }
      setCursor('grabbing')
    }

    const onMouseUp = () => {
      s.isDragging = false
      setCursor('grab')
    }

    const onMouseLeave = () => {
      s.mouse = { x: 0, y: 0 }
      s.isDragging = false
      setCursor('grab')
    }

    const onMouseMove = (e: MouseEvent) => {
      s.mouse = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      }

      if (s.isDragging) {
        s.targetVel.x -= (e.clientX - s.lastMouse.x) * config.dragSensitivity
        s.targetVel.y += (e.clientY - s.lastMouse.y) * config.dragSensitivity
        s.lastMouse = { x: e.clientX, y: e.clientY }
      }
    }

    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      s.scrollAccum += e.deltaY * config.wheelSensitivity
    }

    const onTouchStart = (e: TouchEvent) => {
      e.preventDefault()
      s.lastTouches = Array.from(e.touches)
      s.lastTouchDist = getTouchDistance(s.lastTouches)
      setCursor('grabbing')
    }

    const onTouchMove = (e: TouchEvent) => {
      e.preventDefault()
      const touches = Array.from(e.touches)

      if (touches.length === 1 && s.lastTouches.length >= 1) {
        const [touch] = touches
        const [last] = s.lastTouches
        if (touch && last) {
          s.targetVel.x -=
            (touch.clientX - last.clientX) * config.touchDragSensitivity
          s.targetVel.y +=
            (touch.clientY - last.clientY) * config.touchDragSensitivity
        }
      } else if (touches.length === 2 && s.lastTouchDist > 0) {
        const dist = getTouchDistance(touches)
        s.scrollAccum += (s.lastTouchDist - dist) * config.pinchSensitivity
        s.lastTouchDist = dist
      }

      s.lastTouches = touches
    }

    const onTouchEnd = (e: TouchEvent) => {
      s.lastTouches = Array.from(e.touches)
      s.lastTouchDist = getTouchDistance(s.lastTouches)
      setCursor('grab')
    }

    canvas.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mouseup', onMouseUp)
    window.addEventListener('mousemove', onMouseMove)
    canvas.addEventListener('mouseleave', onMouseLeave)
    canvas.addEventListener('wheel', onWheel, { passive: false })
    canvas.addEventListener('touchstart', onTouchStart, { passive: false })
    canvas.addEventListener('touchmove', onTouchMove, { passive: false })
    canvas.addEventListener('touchend', onTouchEnd, { passive: false })

    return () => {
      canvas.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mouseup', onMouseUp)
      window.removeEventListener('mousemove', onMouseMove)
      canvas.removeEventListener('mouseleave', onMouseLeave)
      canvas.removeEventListener('wheel', onWheel)
      canvas.removeEventListener('touchstart', onTouchStart)
      canvas.removeEventListener('touchmove', onTouchMove)
      canvas.removeEventListener('touchend', onTouchEnd)
    }
  }, [gl, config, setCursor])

  useFrame(() => {
    const s = state.current
    const now = performance.now()
    const { forward, backward, left, right, up, down } = getKeys()

    if (forward) s.targetVel.z -= config.keyboardSpeed
    if (backward) s.targetVel.z += config.keyboardSpeed
    if (left) s.targetVel.x -= config.keyboardSpeed
    if (right) s.targetVel.x += config.keyboardSpeed
    if (down) s.targetVel.y -= config.keyboardSpeed
    if (up) s.targetVel.y += config.keyboardSpeed

    const isZooming =
      Math.abs(s.velocity.z) > config.zoomingVelocityThreshold
    const zoomFactor = clamp(
      s.basePos.z / config.zoomFactorDivisor,
      config.zoomFactorMin,
      config.zoomFactorMax,
    )
    const driftAmount = config.driftBase * zoomFactor
    const driftLerp = isZooming
      ? config.driftLerpZooming
      : config.driftLerpNormal

    if (!s.isDragging) {
      if (isTouchDevice) {
        s.drift.x = lerp(s.drift.x, 0, driftLerp)
        s.drift.y = lerp(s.drift.y, 0, driftLerp)
      } else {
        s.drift.x = lerp(s.drift.x, s.mouse.x * driftAmount, driftLerp)
        s.drift.y = lerp(s.drift.y, s.mouse.y * driftAmount, driftLerp)
      }
    }

    s.targetVel.z += s.scrollAccum
    s.scrollAccum *= config.scrollAccumDecay

    s.targetVel.x = clamp(s.targetVel.x, -config.maxVelocity, config.maxVelocity)
    s.targetVel.y = clamp(s.targetVel.y, -config.maxVelocity, config.maxVelocity)
    s.targetVel.z = clamp(s.targetVel.z, -config.maxVelocity, config.maxVelocity)

    s.velocity.x = lerp(s.velocity.x, s.targetVel.x, config.velocityLerp)
    s.velocity.y = lerp(s.velocity.y, s.targetVel.y, config.velocityLerp)
    s.velocity.z = lerp(s.velocity.z, s.targetVel.z, config.velocityLerp)

    s.basePos.x += s.velocity.x
    s.basePos.y += s.velocity.y
    s.basePos.z += s.velocity.z

    camera.position.set(
      s.basePos.x + s.drift.x,
      s.basePos.y + s.drift.y,
      s.basePos.z,
    )

    s.targetVel.x *= config.velocityDecay
    s.targetVel.y *= config.velocityDecay
    s.targetVel.z *= config.velocityDecay

    const cx = Math.floor(s.basePos.x / config.chunkSize)
    const cy = Math.floor(s.basePos.y / config.chunkSize)
    const cz = Math.floor(s.basePos.z / config.chunkSize)

    cameraGridRef.current = { cx, cy, cz, camZ: s.basePos.z }

    const key = `${cx},${cy},${cz}`
    if (key !== s.lastChunkKey) {
      s.pendingChunk = { cx, cy, cz }
      s.lastChunkKey = key
    }

    const throttleMs = getChunkUpdateThrottleMs(
      config,
      isZooming,
      Math.abs(s.velocity.z),
    )

    if (
      s.pendingChunk &&
      shouldThrottleUpdate(s.lastChunkUpdate, throttleMs, now)
    ) {
      const { cx: ucx, cy: ucy, cz: ucz } = s.pendingChunk
      s.pendingChunk = null
      s.lastChunkUpdate = now

      setChunks(
        chunkOffsets.map((o) => ({
          key: `${ucx + o.dx},${ucy + o.dy},${ucz + o.dz}`,
          cx: ucx + o.dx,
          cy: ucy + o.dy,
          cz: ucz + o.dz,
        })),
      )
    }
  })

  return (
    <>
      {chunks.map((chunk) => (
        <Chunk
          key={chunk.key}
          cx={chunk.cx}
          cy={chunk.cy}
          cz={chunk.cz}
          media={media}
          cameraGridRef={cameraGridRef}
        />
      ))}
    </>
  )
}

type InfiniteCanvasSceneProps = {
  media: GalleryMediaItem[]
  onTextureProgress?: (progress: number) => void
  className?: string
}

export function InfiniteCanvasScene({
  media,
  onTextureProgress,
  className,
}: InfiniteCanvasSceneProps) {
  const { config } = useCanvasConfig()
  const isTouchDevice = useIsTouchDevice()
  const [cursor, setCursor] = useState('grab')
  const dpr = Math.min(
    typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1,
    isTouchDevice ? config.dprTouchMax : config.dprDesktopMax,
  )

  if (!media.length) return null

  return (
    <KeyboardControls map={KEYBOARD_MAP}>
      <div
        className={cn('absolute inset-0 touch-none', className)}
        style={{ cursor }}
      >
        <Canvas
          camera={{
            position: [0, 0, config.initialCameraZ],
            fov: config.cameraFov,
            near: config.cameraNear,
            far: config.cameraFar,
          }}
          dpr={dpr}
          flat
          gl={{
            antialias: config.antialias,
            powerPreference: 'high-performance',
          }}
          className="absolute inset-0 size-full touch-none"
          style={{ backgroundColor: config.backgroundColor }}
        >
          <color attach="background" args={[config.backgroundColor]} />
          <fog
            attach="fog"
            args={[config.fogColor, config.fogNear, config.fogFar]}
          />
          <SceneController
            key={`${config.renderDistance}-${config.chunkFadeMargin}-${config.chunkSize}-${config.initialCameraZ}`}
            media={media}
            onTextureProgress={onTextureProgress}
            setCursor={setCursor}
          />
          {config.showFps ? (
            <Stats className="top-3! right-3! left-auto!" />
          ) : null}
        </Canvas>

        {config.showControls ? (
          <div className="absolute bottom-3 right-3 z-10 rounded-lg bg-cream/90 px-3 py-2 text-xs text-brown shadow-sm">
            {isTouchDevice ? (
              <>
                <b>Drag</b> Pan · <b>Pinch</b> Zoom
              </>
            ) : (
              <>
                <b>WASD</b> Move · <b>QE</b> Up/Down · <b>Scroll</b> Zoom
              </>
            )}
          </div>
        ) : null}
      </div>
    </KeyboardControls>
  )
}
