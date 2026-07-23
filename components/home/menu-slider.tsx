'use client'

import { useMemo, useRef } from 'react'
import Image from 'next/image'
import type { Swiper as SwiperInstance } from 'swiper'
import { Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'

import MenuTabs from '@/components/home/menu-tabs'
import { useHomeMenuStore } from '@/stores/home-menu'
import type { HomeMenuItem } from '@/types/home'

type MenuSliderProps = {
  title: string
  description: string
  items: HomeMenuItem[]
  duration: number
}

type FlatSlide = {
  src: string
  alt: string
  lqip?: string
  aspectRatio: number
  menuIndex: number
  localImageIndex: number
  key: string
}

const XS_BREAKPOINT = 480
const FALLBACK_ASPECT_RATIO = 1.36

/** Keep one side as 1 for CSS aspect-ratio (avoids large W/H numbers). */
function aspectRatioCss(ratio: number) {
  if (ratio >= 1) return `${ratio} / 1`
  return `1 / ${1 / ratio}`
}

function flattenItems(items: HomeMenuItem[]) {
  return items.flatMap((item, menuIndex) =>
    item.images.map((image, localImageIndex) => ({
      src: image.src,
      alt: image.alt,
      aspectRatio: image.aspectRatio ?? FALLBACK_ASPECT_RATIO,
      ...(image.lqip ? { lqip: image.lqip } : {}),
      menuIndex,
      localImageIndex,
    })),
  )
}

/** Loop needs enough slides; duplicate the flattened set. */
function slidesForLoop(flat: Omit<FlatSlide, 'key'>[]): FlatSlide[] {
  if (flat.length === 0) return []
  const minSlides = Math.max(16, flat.length * 3)
  const copies = Math.ceil(minSlides / flat.length)
  return Array.from({ length: copies }, (_, copy) =>
    flat.map((slide, slideIndex) => ({
      ...slide,
      key: `${copy}-${slide.menuIndex}-${slide.localImageIndex}-${slideIndex}`,
    })),
  ).flat()
}

function firstSlideIndexForMenu(items: HomeMenuItem[], menuIndex: number) {
  let index = 0
  for (let i = 0; i < menuIndex; i++) {
    index += items[i]?.images.length ?? 0
  }
  return index
}

function tabProgress(
  localImageIndex: number,
  imageCount: number,
  slidesPerGroup: number,
  autoplayFraction: number,
) {
  const group = Math.max(1, slidesPerGroup)
  const steps = Math.max(1, Math.ceil(imageCount / group))
  const stepIndex = Math.floor(localImageIndex / group)
  return Math.min(1, Math.max(0, (stepIndex + autoplayFraction) / steps))
}

export default function MenuSlider({
  title,
  description,
  items,
  duration,
}: MenuSliderProps) {
  const swiperRef = useRef<SwiperInstance | null>(null)
  const autoplayFractionRef = useRef(0)
  const syncTab = useHomeMenuStore((s) => s.syncTab)

  const flat = useMemo(() => flattenItems(items), [items])
  const slides = useMemo(() => slidesForLoop(flat), [flat])
  const flatCount = flat.length

  function toFlatIndex(realIndex: number) {
    return flatCount === 0 ? 0 : realIndex % flatCount
  }

  function slidesPerGroupOf(swiper: SwiperInstance) {
    const value = swiper.params.slidesPerGroup
    return typeof value === 'number' && value > 0 ? value : 1
  }

  function syncFromSwiper(swiper: SwiperInstance, autoplayFraction?: number) {
    if (flatCount === 0) return

    const fraction =
      autoplayFraction === undefined
        ? autoplayFractionRef.current
        : autoplayFraction
    if (autoplayFraction !== undefined) {
      autoplayFractionRef.current = autoplayFraction
    }

    const slide = flat[toFlatIndex(swiper.realIndex)]
    if (!slide) return

    const imageCount = items[slide.menuIndex]?.images.length ?? 1
    syncTab(
      slide.menuIndex,
      tabProgress(
        slide.localImageIndex,
        imageCount,
        slidesPerGroupOf(swiper),
        fraction,
      ),
    )
  }

  return (
    <div className="flex flex-col">
      <div className="order-2 xs:order-1">
        <MenuTabs
          items={items}
          onSelect={(menuIndex) =>
            swiperRef.current?.slideToLoop(
              firstSlideIndexForMenu(items, menuIndex),
            )
          }
          onPrev={() => swiperRef.current?.slidePrev()}
          onNext={() => swiperRef.current?.slideNext()}
        />
      </div>

      <div className="order-1 flex flex-col gap-13 px-6 pt-6 pb-8 xs:order-2 xs:mt-20 xs:gap-0 xs:p-0">
        <h2 className="text-3xl font-semibold uppercase leading-none tracking-[-0.02em] text-olive xs:max-w-lg xs:px-6 xs:text-5xl xs:leading-[1.15] xs:tracking-tight">
          {title}
        </h2>
        <p className="max-w-45.5 self-end text-sm leading-[1.39] text-olive xs:hidden">
          {description}
        </p>
      </div>

      <div className="order-3 mt-6 overflow-hidden xs:mt-20">
        <Swiper
          className="home-menu-swiper w-full [&_.swiper-wrapper]:items-start [&_.swiper-wrapper]:pl-6 [&_.swiper-slide]:h-auto"
          modules={[Autoplay]}
          loop={slides.length >= 2}
          loopAdditionalSlides={flatCount}
          // Mobile: auto width so pl-6 + next-slide peek match desktop feel
          slidesPerView="auto"
          slidesPerGroup={1}
          spaceBetween={12}
          autoHeight
          breakpoints={{
            [XS_BREAKPOINT]: {
              slidesPerView: 4.15,
              slidesPerGroup: 2,
            },
          }}
          grabCursor
          allowTouchMove
          watchOverflow={false}
          speed={1000}
          autoplay={{
            delay: duration,
            disableOnInteraction: false,
            waitForTransition: false,
          }}
          onSwiper={(swiper) => {
            swiperRef.current = swiper
            syncFromSwiper(swiper, 0)
          }}
          onSlideChange={(swiper) => {
            syncFromSwiper(swiper, 0)
            swiper.updateAutoHeight(1000)
          }}
          onAutoplayTimeLeft={(swiper, _timeLeft, percentage) => {
            syncFromSwiper(swiper, 1 - percentage)
          }}
          onBreakpoint={(swiper) => {
            syncFromSwiper(swiper)
            swiper.updateAutoHeight()
          }}
        >
          {slides.map((slide) => (
            <SwiperSlide
              key={slide.key}
              className="w-[calc(100vw-3rem)]! xs:w-[23.6%]!"
            >
              <div
                className="relative w-full overflow-hidden"
                style={{ aspectRatio: aspectRatioCss(slide.aspectRatio) }}
              >
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  sizes="(max-width: 479px) 100vw, 25vw"
                  className="object-cover"
                  placeholder={slide.lqip ? 'blur' : 'empty'}
                  blurDataURL={slide.lqip}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}
