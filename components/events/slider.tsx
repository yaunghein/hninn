'use client'

import { useMemo } from 'react'
import Image from 'next/image'
import { Autoplay, FreeMode } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'

import type { EventsImage } from '@/types/events'

type EventsSliderProps = {
  images: EventsImage[]
}

/** Loop + slidesPerView:auto needs enough slide width; duplicate the set. */
function slidesForLoop(images: EventsImage[]) {
  if (images.length === 0) return []
  const minSlides = Math.max(12, images.length * 3)
  const copies = Math.ceil(minSlides / images.length)
  return Array.from({ length: copies }, (_, copy) =>
    images.map((image, imageIndex) => ({
      image,
      key: `${copy}-${imageIndex}-${image.src}`,
    })),
  ).flat()
}

export default function EventsSlider({ images }: EventsSliderProps) {
  const slides = useMemo(() => slidesForLoop(images), [images])

  return (
    <Swiper
      className="w-full [&_.swiper-wrapper]:ease-linear!"
      modules={[Autoplay, FreeMode]}
      freeMode={{
        enabled: true,
        momentum: false,
      }}
      loop={slides.length >= 2}
      loopAdditionalSlides={images.length}
      slidesPerView="auto"
      spaceBetween={12}
      breakpoints={{
        480: {
          spaceBetween: 24,
        },
      }}
      grabCursor
      allowTouchMove
      watchOverflow={false}
      speed={6000}
      autoplay={{
        delay: 0,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }}
    >
      {slides.map(({ image, key }) => (
        <SwiperSlide key={key} className="w-[48vh]! xs:w-[56vh]!">
          <div className="relative aspect-[1.34/1] h-full overflow-hidden">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="25.625rem"
              className="object-cover"
              placeholder={image.blurDataURL ? 'blur' : 'empty'}
              blurDataURL={image.blurDataURL}
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
