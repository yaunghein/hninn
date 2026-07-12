'use client'

import { cn } from '@/app/lib/utils/cn'
import { useHomeSliderStore } from '@/app/stores/home-slider'

type SlideProgressProps = {
  count: number
  className?: string
  onSelect?: (index: number) => void
}

export default function SlideProgress({ count, className, onSelect }: SlideProgressProps) {
  const activeIndex = useHomeSliderStore((s) => s.activeIndex)
  const progress = useHomeSliderStore((s) => s.progress)

  return (
    <div
      className={cn('flex w-46 items-center gap-1', className)}
      role="tablist"
      aria-label="Slide progress"
    >
      {Array.from({ length: count }, (_, index) => {
        const isActive = index === activeIndex
        const fill = isActive ? progress : index < activeIndex ? 1 : 0

        return (
          <button
            key={index}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-label={`Go to slide ${index + 1}`}
            onClick={() => onSelect?.(index)}
            className={cn(
              'h-0.5 cursor-pointer overflow-hidden rounded-full bg-white/35 transition-[flex-grow,width] duration-700 ease-in-out',
              isActive ? 'min-w-0 flex-1' : 'w-5 shrink-0',
            )}
          >
            <span
              className="block h-full origin-left rounded-full bg-white will-change-transform"
              style={{ transform: `scaleX(${fill})` }}
            />
          </button>
        )
      })}
    </div>
  )
}
