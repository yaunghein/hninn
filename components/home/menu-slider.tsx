'use client'

import { useMemo, useRef, useState, useSyncExternalStore } from 'react'
import Image from 'next/image'
import type { Swiper as SwiperInstance } from 'swiper'
import { Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'

import MenuTabs from '@/components/home/menu-tabs'
import { cn } from '@/lib/utils/cn'
import { useHomeMenuStore } from '@/stores/home-menu'
import type { HomeMenuImage, HomeMenuItem } from '@/types/home'

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

type MenuLoopSlide = {
  item: HomeMenuItem
  menuIndex: number
  key: string
}

const XS_BREAKPOINT = 480
const FALLBACK_ASPECT_RATIO = 1.36

/** Keep one side as 1 for CSS aspect-ratio (avoids large W/H numbers). */
function aspectRatioCss(ratio: number) {
  if (ratio >= 1) return `${ratio} / 1`
  return `1 / ${1 / ratio}`
}

function subscribeDesktop(onChange: () => void) {
  const mq = window.matchMedia(`(min-width: ${XS_BREAKPOINT}px)`)
  mq.addEventListener('change', onChange)
  return () => mq.removeEventListener('change', onChange)
}

function getDesktopSnapshot() {
  return window.matchMedia(`(min-width: ${XS_BREAKPOINT}px)`).matches
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

/** Same loop padding for desktop menu-unit slides. */
function menusForLoop(items: HomeMenuItem[]): MenuLoopSlide[] {
  if (items.length === 0) return []
  const minSlides = Math.max(8, items.length * 3)
  const copies = Math.ceil(minSlides / items.length)
  return Array.from({ length: copies }, (_, copy) =>
    items.map((item, menuIndex) => ({
      item,
      menuIndex,
      key: `${copy}-${menuIndex}-${item.name}`,
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

function mobileTabProgress(
  localImageIndex: number,
  imageCount: number,
  autoplayFraction: number,
) {
  const steps = Math.max(1, imageCount)
  return Math.min(1, Math.max(0, (localImageIndex + autoplayFraction) / steps))
}

function MenuImage({
  image,
  className,
  sizes,
}: {
  image: Pick<HomeMenuImage, 'src' | 'alt' | 'lqip' | 'aspectRatio'>
  className?: string
  sizes: string
}) {
  const aspectRatio = image.aspectRatio ?? FALLBACK_ASPECT_RATIO

  return (
    <div
      className={cn('relative overflow-hidden', className)}
      style={{ aspectRatio: aspectRatioCss(aspectRatio) }}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes={sizes}
        className="object-cover"
        placeholder={image.lqip ? 'blur' : 'empty'}
        blurDataURL={image.lqip}
      />
    </div>
  )
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
  // Snapshot once — don't subscribe; progress ticks must not re-render Swiper.
  const [initialMenuIndex] = useState(
    () => useHomeMenuStore.getState().activeIndex,
  )

  const isDesktop = useSyncExternalStore(
    subscribeDesktop,
    getDesktopSnapshot,
    () => true,
  )

  const flat = useMemo(() => flattenItems(items), [items])
  const mobileSlides = useMemo(() => slidesForLoop(flat), [flat])
  const desktopSlides = useMemo(() => menusForLoop(items), [items])
  const flatCount = flat.length
  const menuCount = items.length
  const startMenuIndex = Math.min(initialMenuIndex, Math.max(0, menuCount - 1))

  function toFlatIndex(realIndex: number) {
    return flatCount === 0 ? 0 : realIndex % flatCount
  }

  function toMenuIndex(realIndex: number) {
    return menuCount === 0 ? 0 : realIndex % menuCount
  }

  function syncDesktop(swiper: SwiperInstance, autoplayFraction?: number) {
    if (menuCount === 0) return

    const fraction =
      autoplayFraction === undefined
        ? autoplayFractionRef.current
        : autoplayFraction
    if (autoplayFraction !== undefined) {
      autoplayFractionRef.current = autoplayFraction
    }

    syncTab(toMenuIndex(swiper.realIndex), fraction)
  }

  function syncMobile(swiper: SwiperInstance, autoplayFraction?: number) {
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
      mobileTabProgress(slide.localImageIndex, imageCount, fraction),
    )
  }

  function handleSelect(menuIndex: number) {
    const swiper = swiperRef.current
    if (!swiper) return

    if (isDesktop) {
      swiper.slideToLoop(menuIndex)
      return
    }

    swiper.slideToLoop(firstSlideIndexForMenu(items, menuIndex))
  }

  return (
    <div className="flex flex-col">
      <div className="order-2 xs:order-1">
        <MenuTabs
          items={items}
          onSelect={handleSelect}
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
        {isDesktop ? (
          <Swiper
            key="desktop"
            className="home-menu-swiper w-full [&_.swiper-wrapper]:items-start [&_.swiper-slide]:h-auto"
            modules={[Autoplay]}
            loop={desktopSlides.length >= 2}
            loopAdditionalSlides={menuCount}
            slidesPerView={1}
            spaceBetween={0}
            autoHeight
            initialSlide={startMenuIndex}
            grabCursor
            allowTouchMove
            watchOverflow={false}
            speed={2000}
            autoplay={{
              delay: duration,
              disableOnInteraction: false,
              waitForTransition: true,
            }}
            onSwiper={(swiper) => {
              swiperRef.current = swiper
              syncDesktop(swiper, 0)
            }}
            onSlideChange={(swiper) => {
              syncDesktop(swiper, 0)
            }}
            onSlideChangeTransitionEnd={(swiper) => {
              swiper.updateAutoHeight()
            }}
            onAutoplayTimeLeft={(swiper, _timeLeft, percentage) => {
              syncDesktop(swiper, 1 - percentage)
            }}
          >
            {desktopSlides.map(({ item, key }) => (
              <SwiperSlide key={key}>
                <div className="grid grid-cols-4 gap-3 px-6">
                  {item.images.map((image, imageIndex) => (
                    <MenuImage
                      key={`${key}-${imageIndex}-${image.src}`}
                      image={image}
                      className={cn(
                        'w-full',
                        image.size === 'wide' ? 'col-span-2' : 'col-span-1',
                      )}
                      sizes={
                        image.size === 'wide'
                          ? '(max-width: 479px) 100vw, 50vw'
                          : '(max-width: 479px) 100vw, 25vw'
                      }
                    />
                  ))}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <Swiper
            key="mobile"
            className="home-menu-swiper w-full [&_.swiper-wrapper]:items-start [&_.swiper-wrapper]:pl-6 [&_.swiper-slide]:h-auto"
            modules={[Autoplay]}
            loop={mobileSlides.length >= 2}
            loopAdditionalSlides={flatCount}
            slidesPerView="auto"
            slidesPerGroup={1}
            spaceBetween={12}
            autoHeight
            initialSlide={firstSlideIndexForMenu(items, startMenuIndex)}
            grabCursor
            allowTouchMove
            watchOverflow={false}
            speed={2000}
            autoplay={{
              delay: duration,
              disableOnInteraction: false,
              waitForTransition: true,
            }}
            onSwiper={(swiper) => {
              swiperRef.current = swiper
              syncMobile(swiper, 0)
            }}
            onSlideChange={(swiper) => {
              syncMobile(swiper, 0)
            }}
            onSlideChangeTransitionEnd={(swiper) => {
              swiper.updateAutoHeight()
            }}
            onAutoplayTimeLeft={(swiper, _timeLeft, percentage) => {
              syncMobile(swiper, 1 - percentage)
            }}
          >
            {mobileSlides.map((slide) => (
              <SwiperSlide key={slide.key} className="w-[calc(100vw-3rem)]!">
                <MenuImage image={slide} className="w-full" sizes="100vw" />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </div>
  )
}
