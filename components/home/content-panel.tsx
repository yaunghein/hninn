'use client'

import { Pattern } from '@/components/svgs'
import { cn } from '@/lib/utils/cn'
import { useHomeSliderStore } from '@/stores/home-slider'
import { bgColorClass, textColorClass } from '@/lib/constants/colors'
import { homeSlideRevealTransitionStyle } from '@/lib/constants/home-slider'
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
        'relative flex min-h-0 flex-col overflow-hidden transition-colors xs:h-full',
        bgColorClass[slide.background],
      )}
      style={homeSlideRevealTransitionStyle}
    >
      <div className="relative z-10 flex flex-1 flex-col justify-between xs:justify-start px-6 pt-7 xs:pt-6 pb-24 xs:pb-28 aspect-square xs:aspect-auto">
        <h1
          className={cn(
            'text-3xl font-semibold uppercase leading-none tracking-[-0.02em] transition-colors xs:text-5xl xs:leading-[1.15] xs:tracking-tight',
            textColorClass[slide.text],
          )}
          style={homeSlideRevealTransitionStyle}
        >
          {title}
        </h1>
        <p
          className={cn(
            'max-w-full pl-21 text-[0.81rem] leading-[1.39] transition-colors xs:my-auto xs:ml-39 xs:max-w-lg xs:translate-y-10 xs:pl-0 xs:text-base xs:leading-snug',
            textColorClass[slide.text],
          )}
          style={homeSlideRevealTransitionStyle}
        >
          {description}
        </p>
      </div>

      <div className="pointer-events-none mb-13 hidden overflow-hidden xs:block">
        <div className="w-[173vw] -translate-x-12">
          <Pattern
            color={slide.text}
            opacity={0.2}
            className="transition-colors"
            style={homeSlideRevealTransitionStyle}
          />
        </div>
      </div>
    </div>
  )
}
