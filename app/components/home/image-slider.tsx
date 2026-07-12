'use client'

import { useRef } from 'react'
import Image from 'next/image'
import type { Swiper as SwiperInstance } from 'swiper'
import { Autoplay, EffectFade } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/effect-fade'

import SlideProgress from '@/app/components/home/slide-progress'
import { Logo } from '@/app/components/svgs'
import { useHomeSliderStore } from '@/app/stores/home-slider'
import type { HomeSlide } from '@/app/types/home'

type ImageSliderProps = {
  slides: HomeSlide[]
  duration: number
}

export default function ImageSlider({ slides, duration }: ImageSliderProps) {
  const swiperRef = useRef<SwiperInstance | null>(null)
  const activeIndex = useHomeSliderStore((s) => s.activeIndex)
  const setActiveIndex = useHomeSliderStore((s) => s.setActiveIndex)
  const setProgress = useHomeSliderStore((s) => s.setProgress)
  const slide = slides[activeIndex] ?? slides[0]

  return (
    <div className="relative h-full min-h-0 w-full overflow-hidden">
      <Swiper
        className="home-swiper h-full w-full [&_.swiper-slide]:h-full [&_.swiper-wrapper]:h-full"
        modules={[Autoplay, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        speed={1000}
        loop
        allowTouchMove
        autoplay={{
          delay: duration,
          disableOnInteraction: false,
        }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper
        }}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        onAutoplayTimeLeft={(_swiper, _timeLeft, percentage) => {
          setProgress(1 - percentage)
        }}
      >
        {slides.map((item, index) => (
          <SwiperSlide
            key={`${item.src}-${index}`}
            className="relative h-full w-full"
          >
            <Image
              src={item.src}
              alt={item.caption}
              fill
              priority={index === 0}
              sizes="50vw"
              className="object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex flex-col items-center px-2.5 pt-3">
        <SlideProgress
          count={slides.length}
          className="pointer-events-auto"
          onSelect={(index) => {
            swiperRef.current?.slideToLoop(index)
          }}
        />
        <Logo
          color={slide.logo}
          className="mt-3 w-full max-w-2xl transition-colors duration-1000 ease-in-out"
        />
      </div>
    </div>
  )
}
