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

/** Loop + slidesPerView:auto needs enough slide width; duplicate the set. */
function slidesForLoop(items: HomeMenuItem[]) {
  if (items.length === 0) return []
  const minSlides = Math.max(16, items.length * 3)
  const copies = Math.ceil(minSlides / items.length)
  return Array.from({ length: copies }, (_, copy) =>
    items.map((item, itemIndex) => ({
      item,
      itemIndex,
      key: `${copy}-${itemIndex}-${item.name}`,
    })),
  ).flat()
}

export default function MenuSlider({
  title,
  description,
  items,
  duration,
}: MenuSliderProps) {
  const swiperRef = useRef<SwiperInstance | null>(null)
  const setActiveIndex = useHomeMenuStore((s) => s.setActiveIndex)
  const setProgress = useHomeMenuStore((s) => s.setProgress)
  const slides = useMemo(() => slidesForLoop(items), [items])
  const itemCount = items.length

  function toItemIndex(realIndex: number) {
    return itemCount === 0 ? 0 : realIndex % itemCount
  }

  return (
    <div className="flex flex-col">
      <div className="order-2 xs:order-1">
        <MenuTabs
          items={items}
          onSelect={(index) => swiperRef.current?.slideToLoop(index)}
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

      <div className="order-3 mt-6 xs:mt-20">
        <Swiper
          className="home-menu-swiper w-full [&_.swiper-wrapper]:px-2.5 xs:[&_.swiper-wrapper]:px-6 [&_.swiper-slide]:h-auto"
          modules={[Autoplay]}
          loop={slides.length >= 2}
          loopAdditionalSlides={itemCount}
          slidesPerView="auto"
          slidesPerGroup={1}
          spaceBetween={12}
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
          }}
          onSlideChange={(swiper) => {
            setActiveIndex(toItemIndex(swiper.realIndex))
          }}
          onAutoplayTimeLeft={(_swiper, _timeLeft, percentage) => {
            setProgress(1 - percentage)
          }}
        >
          {slides.map(({ item, key }) => (
            <SwiperSlide key={key} className="w-[17.3rem]! xs:w-[43.13rem]!">
              <div className="relative aspect-277/415 w-full overflow-hidden xs:aspect-1.36/1">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 479px) 17.3rem, 43.13rem"
                  className="object-cover"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}
