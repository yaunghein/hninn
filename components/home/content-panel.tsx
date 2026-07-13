'use client'

import { Pattern } from '@/components/svgs'
import { cn } from '@/lib/utils/cn'
import { useHomeSliderStore } from '@/stores/home-slider'
import { bgColorClass } from '@/lib/constants/colors'
import type { HomeHeroContent } from '@/types/home'

type ContentPanelProps = {
  title: string
  description: string
  slides: HomeHeroContent['slides']
}

export default function ContentPanel({
  title,
  description,
  slides,
}: ContentPanelProps) {
  const activeIndex = useHomeSliderStore((s) => s.activeIndex)
  const slide = slides[activeIndex] ?? slides[0]

  return (
    <div
      className={cn(
        'relative flex h-full min-h-0 flex-col overflow-hidden transition-colors duration-1000 ease-in-out',
        bgColorClass[slide.background],
      )}
    >
      <div className="relative flex flex-col z-10 flex-1 px-6 pt-6 pb-28">
        <h1 className="text-5xl font-semibold uppercase leading-[1.15] tracking-tight text-brown">
          {title}
        </h1>
        <p className="my-auto max-w-lg text-base leading-snug text-brown ml-39 translate-y-10">
          {description}
        </p>
      </div>

      <div className="pointer-events-none overflow-hidden mb-13">
        <div className="w-[173vw] -translate-x-12">
          <Pattern
            color={slide.pattern}
            className="transition-colors duration-1000 ease-in-out"
          />
        </div>
      </div>
    </div>
  )
}
