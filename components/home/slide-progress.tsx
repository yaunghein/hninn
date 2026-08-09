'use client'

import { homeSlideRevealTransitionStyle } from '@/lib/constants/home-slider'
import { cn } from '@/lib/utils/cn'
import { useHomeSliderStore } from '@/stores/home-slider'

type SlideProgressProps = {
  count: number
  className?: string
  onSelect?: (index: number) => void
}

export default function SlideProgress({
  count,
  className,
  onSelect,
}: SlideProgressProps) {
  const activeIndex = useHomeSliderStore((s) => s.activeIndex)
  const progress = useHomeSliderStore((s) => s.progress)

  return (
    <div
      className={cn('flex w-32 items-center gap-1', className)}
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
            onClick={(event) => {
              event.stopPropagation()
              onSelect?.(index)
            }}
            className="flex shrink-0 basis-5 cursor-pointer items-center -my-3 py-3 transition-[flex-grow]"
            style={{
              ...homeSlideRevealTransitionStyle,
              flexGrow: isActive ? 1 : 0,
            }}
          >
            <span className="h-0.5 w-full overflow-hidden bg-white/35">
              <span
                className="block h-full origin-left bg-white will-change-transform"
                style={{ transform: `scaleX(${fill})` }}
              />
            </span>
          </button>
        )
      })}
    </div>
  )
}
