'use client'

import { useMemo, useRef } from 'react'
import Image from 'next/image'
import type { Swiper as SwiperInstance } from 'swiper'
import { Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'

import MenuTabs from '@/app/components/home/menu-tabs'
import { useHomeMenuStore } from '@/app/stores/home-menu'
import type { HomeMenuItem } from '@/app/types/home'

type MenuSliderProps = {
  title: string
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
    <div>
      <MenuTabs
        items={items}
        onSelect={(index) => swiperRef.current?.slideToLoop(index)}
        onPrev={() => swiperRef.current?.slidePrev()}
        onNext={() => swiperRef.current?.slideNext()}
      />

      <h2 className="mt-20 max-w-lg px-6 text-5xl font-semibold uppercase leading-[1.15] tracking-tight text-olive">
        {title}
      </h2>

      <div className="mt-20">
        <Swiper
          className="home-menu-swiper w-full [&_.swiper-wrapper]:px-6 [&_.swiper-slide]:h-auto"
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
            <SwiperSlide key={key} className="w-[43.13rem]!">
              <div className="relative aspect-[1.36/1] w-full overflow-hidden">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="43.13rem"
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
