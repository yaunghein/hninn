'use client'

import { useRef } from 'react'

import ContentPanel from '@/components/home/content-panel'
import ImageSlider, {
  type ImageSliderControls,
} from '@/components/home/image-slider'
import type { HomeHeroContent } from '@/types/home'

type HomeHeroProps = HomeHeroContent

const DRAG_THRESHOLD_PX = 8

export default function HomeHero({
  title,
  description,
  slides,
  duration,
}: HomeHeroProps) {
  const sliderRef = useRef<ImageSliderControls>(null)
  const pointerRef = useRef({ x: 0, y: 0, dragged: false })

  return (
    <section
      className="flex cursor-pointer flex-col overflow-hidden xs:grid xs:h-dvh xs:grid-cols-2"
      onPointerDown={(event) => {
        pointerRef.current = {
          x: event.clientX,
          y: event.clientY,
          dragged: false,
        }
        sliderRef.current?.armClick()
      }}
      onPointerMove={(event) => {
        const dx = Math.abs(event.clientX - pointerRef.current.x)
        const dy = Math.abs(event.clientY - pointerRef.current.y)
        if (dx > DRAG_THRESHOLD_PX || dy > DRAG_THRESHOLD_PX) {
          pointerRef.current.dragged = true
        }
      }}
      onClick={() => {
        if (pointerRef.current.dragged) return
        if (!sliderRef.current?.shouldAdvanceOnClick()) return
        sliderRef.current.slideNext()
      }}
    >
      <ImageSlider ref={sliderRef} slides={slides} duration={duration} />
      <ContentPanel title={title} description={description} slides={slides} />
    </section>
  )
}
