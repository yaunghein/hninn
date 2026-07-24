'use client'

import { useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import type { Swiper as SwiperInstance } from 'swiper'
import { Autoplay, EffectFade } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/effect-fade'

import SlideProgress from '@/components/home/slide-progress'
import { Logo } from '@/components/svgs'
import { useHomeSliderStore } from '@/stores/home-slider'
import { bgColorClass } from '@/lib/constants/colors'
import {
  HOME_SLIDE_REVEAL_DURATION,
  HOME_SLIDE_REVEAL_EASE,
  homeSlideRevealTransitionStyle,
} from '@/lib/constants/home-slider'
import { cn } from '@/lib/utils/cn'
import type { HomeSlide } from '@/types/home'

type ImageSliderProps = {
  slides: HomeSlide[]
  duration: number
}

function stackSlides(swiper: SwiperInstance) {
  swiper.slides.forEach((slide, index) => {
    const el = slide as HTMLElement
    if (index === swiper.activeIndex) {
      el.style.zIndex = '2'
    } else if (index === swiper.previousIndex) {
      el.style.zIndex = '1'
    } else {
      el.style.zIndex = '0'
    }
  })
}

function revealSlide(slideEl: HTMLElement | undefined, instant = false) {
  if (!slideEl) return

  const mask = slideEl.querySelector<HTMLElement>('[data-slide-mask]')
  const media = slideEl.querySelector<HTMLElement>('[data-slide-media]')
  if (!mask || !media) return

  gsap.killTweensOf([mask, media])

  const reduceMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)',
  ).matches

  if (instant || reduceMotion) {
    gsap.set(mask, { clipPath: 'inset(0% 0% 0% 0%)' })
    gsap.set(media, { scale: 1, filter: 'blur(0px)' })
    return
  }

  gsap.fromTo(
    mask,
    { clipPath: 'inset(0% 0% 0% 100%)' },
    {
      clipPath: 'inset(0% 0% 0% 0%)',
      duration: HOME_SLIDE_REVEAL_DURATION,
      ease: HOME_SLIDE_REVEAL_EASE,
    },
  )

  gsap.fromTo(
    media,
    { scale: 1.14, filter: 'blur(0.25rem)' },
    {
      scale: 1,
      filter: 'blur(0px)',
      duration: HOME_SLIDE_REVEAL_DURATION,
      ease: HOME_SLIDE_REVEAL_EASE,
      force3D: true,
    },
  )
}

export default function ImageSlider({ slides, duration }: ImageSliderProps) {
  const swiperRef = useRef<SwiperInstance | null>(null)
  const readyRef = useRef(false)
  const activeIndex = useHomeSliderStore((s) => s.activeIndex)
  const setActiveIndex = useHomeSliderStore((s) => s.setActiveIndex)
  const setProgress = useHomeSliderStore((s) => s.setProgress)
  const slide = slides[activeIndex] ?? slides[0]

  return (
    <div className="relative flex w-full flex-col overflow-hidden bg-black xs:h-full">
      <div
        className={cn(
          'px-6 pt-6 pb-20 transition-colors xs:hidden',
          bgColorClass[slide.background],
        )}
        style={homeSlideRevealTransitionStyle}
      >
        <div className="aspect-[3.95/1] w-full">
          <Logo
            color={slide.text}
            className="w-full transition-colors"
            style={homeSlideRevealTransitionStyle}
          />
        </div>
      </div>

      <div className="relative aspect-[1/1.35] w-full xs:aspect-auto xs:min-h-0 xs:flex-1">
        <Swiper
          className="home-swiper absolute inset-0 h-full w-full [&_.swiper-slide]:h-full [&_.swiper-slide]:opacity-100! [&_.swiper-wrapper]:h-full"
          modules={[Autoplay, EffectFade]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          // Instant Swiper transition — GSAP owns the visual reveal.
          // Non-zero fade speed + opacity override blocks transitionend and
          // leaves swiper.animating stuck, which kills autoplay.
          speed={0}
          loop
          allowTouchMove
          autoplay={{
            delay: duration,
            disableOnInteraction: false,
            waitForTransition: false,
          }}
          onSwiper={(swiper) => {
            swiperRef.current = swiper
            stackSlides(swiper)
            revealSlide(swiper.slides[swiper.activeIndex] as HTMLElement, true)
            readyRef.current = true
          }}
          onSlideChangeTransitionStart={(swiper) => {
            if (!readyRef.current) return
            stackSlides(swiper)
            // Start colors + media reveal in the same frame
            setActiveIndex(swiper.realIndex)
            revealSlide(swiper.slides[swiper.activeIndex] as HTMLElement)
          }}
          onAutoplayTimeLeft={(_swiper, _timeLeft, percentage) => {
            setProgress(1 - percentage)
          }}
        >
          {slides.map((item, index) => (
            <SwiperSlide
              key={`${item.src}-${index}`}
              className="relative h-full w-full"
            >
              <div
                data-slide-mask
                className="absolute inset-0 h-full w-full will-change-[clip-path]"
              >
                <div
                  data-slide-media
                  className="relative h-full w-full origin-center will-change-transform"
                >
                  <Image
                    src={item.src}
                    alt={item.caption}
                    fill
                    priority={index === 0}
                    sizes="(max-width: 479px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
              </div>
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
            className="mt-3 hidden w-full max-w-2xl transition-colors xs:block"
            style={homeSlideRevealTransitionStyle}
          />
        </div>
      </div>
    </div>
  )
}
