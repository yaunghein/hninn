'use client'

import { cn } from '@/lib/utils/cn'

type GalleryLoaderProps = {
  progress: number
  visible: boolean
}

export default function GalleryLoader({ progress, visible }: GalleryLoaderProps) {
  return (
    <div
      className={cn(
        'absolute inset-0 z-20 flex flex-col items-center justify-center bg-cream transition-opacity duration-500',
        visible ? 'opacity-100' : 'pointer-events-none opacity-0',
      )}
      aria-hidden={!visible}
      aria-busy={visible}
    >
      <div className="flex w-48 flex-col gap-3">
        <div className="h-px w-full overflow-hidden bg-olive/20">
          <div
            className="h-full bg-olive transition-[width] duration-200 ease-out"
            style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
          />
        </div>
        <p className="text-center text-xs tracking-[0.08em] text-olive/70 uppercase">
          Loading {Math.min(100, Math.max(0, progress))}%
        </p>
      </div>
    </div>
  )
}
