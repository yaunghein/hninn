'use client'

import { useRef } from 'react'
import Image from 'next/image'
import type { Swiper as SwiperInstance } from 'swiper'
import { Autoplay, EffectFade } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/effect-fade'

import SlideProgress from '@/components/home/slide-progress'
import { Logo } from '@/components/svgs'
import { useHomeSliderStore } from '@/stores/home-slider'
import { bgColorClass } from '@/lib/constants/colors'
import { cn } from '@/lib/utils/cn'
import type { HomeSlide } from '@/types/home'

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
    <div className="relative flex min-h-dvh bg-black w-full flex-col overflow-hidden xs:h-full">
      <div
        className={cn(
          'px-6 pt-6 pb-20 flex-1 transition-colors duration-1000 ease-in-out xs:hidden',
          bgColorClass[slide.background],
        )}
      >
        <div className="aspect-[3.95/1] w-full">
          <Logo
            color="brown"
            className="w-full transition-colors duration-1000 ease-in-out"
          />
        </div>
      </div>

      <div className="relative aspect-[1/1.35] w-full xs:aspect-auto xs:min-h-0 xs:flex-1">
        <Swiper
          className="home-swiper absolute inset-0 h-full w-full [&_.swiper-slide]:h-full [&_.swiper-wrapper]:h-full"
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
                sizes="(max-width: 479px) 100vw, 50vw"
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
            className="mt-3 hidden w-full max-w-2xl transition-colors duration-1000 ease-in-out xs:block"
          />
        </div>
      </div>
    </div>
  )
}
