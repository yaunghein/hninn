'use client'

import { Pattern } from '@/components/svgs'
import { cn } from '@/lib/utils/cn'
import { useHomeSliderStore } from '@/stores/home-slider'
import { bgColorClass, textColorClass } from '@/lib/constants/colors'
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
        'relative flex min-h-0 flex-col overflow-hidden transition-colors duration-1000 ease-in-out xs:h-full',
        bgColorClass[slide.background],
      )}
    >
      <div className="relative z-10 flex flex-1 flex-col gap-50 px-6 pt-6 pb-8 xs:gap-0 xs:pb-28">
        <h1
          className={cn(
            'text-3xl font-semibold uppercase leading-none tracking-[-0.02em] transition-colors duration-1000 ease-in-out xs:text-5xl xs:leading-[1.15] xs:tracking-tight',
            textColorClass[slide.pattern],
          )}
        >
          {title}
        </h1>
        <p
          className={cn(
            'max-w-70 pl-23.75 text-sm leading-[1.39] transition-colors duration-1000 ease-in-out xs:my-auto xs:ml-39 xs:max-w-lg xs:translate-y-10 xs:pl-0 xs:text-base xs:leading-snug',
            textColorClass[slide.pattern],
          )}
        >
          {description}
        </p>
      </div>

      <div className="pointer-events-none mb-13 hidden overflow-hidden xs:block">
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
