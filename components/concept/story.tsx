'use client'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'
import { useRef } from 'react'

import type { ConceptStoryContent } from '@/types/concept'

gsap.registerPlugin(useGSAP, ScrollTrigger)

type ConceptStoryProps = ConceptStoryContent

export default function ConceptStory({
  title,
  imageSrc,
  imageAlt = '',
  blocks,
}: ConceptStoryProps) {
  const rootRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const root = rootRef.current
      if (!root) return

      const trigger = root.querySelector<HTMLElement>(
        '#concept-scroll-trigger-1',
      )
      const imageWrapper = root.querySelector<HTMLElement>(
        '#concept-scroll-image-wrapper-1',
      )
      const imageInner = root.querySelector<HTMLElement>(
        '#concept-scroll-image-wrapper-inner-1',
      )
      const header = root.querySelector<HTMLElement>(
        '#concept-scroll-header-container-1',
      )
      const headerWrapper = root.querySelector<HTMLElement>(
        '#concept-scroll-header-wrapper-1',
      )
      const content = root.querySelector<HTMLElement>(
        '#concept-scroll-content-1',
      )

      if (
        !trigger ||
        !imageWrapper ||
        !imageInner ||
        !header ||
        !headerWrapper ||
        !content
      )
        return

      gsap.set(imageInner, { y: '8rem', scale: 1.5 })
      gsap.set(content, { xPercent: 100 })

      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger,
          start: 'top bottom',
          end: 'bottom bottom',
          scrub: 1.2,
        },
      })

      tl.to(imageInner, { y: 0 })
        .to(headerWrapper, { fontSize: '3.25rem' }, '<')
        .to({}, { duration: 0.1 })
        .to(header, { width: '50%' })
        .to(content, { xPercent: 0 }, '<')
        .to(imageWrapper, { width: '75%' }, '<')
        .to(imageInner, { scale: 1.1 }, '<')
        .to(imageInner, { scale: 1 }, '<50%')
    },
    { scope: rootRef },
  )

  return (
    <section ref={rootRef}>
      <div id="concept-scroll-trigger-1" className="relative h-[300svh]">
        <div
          id="concept-scroll-sticky-container-1"
          className="sticky top-0 h-svh w-full"
        >
          <div
            id="concept-scroll-image-wrapper-1"
            className="relative h-full w-full overflow-hidden"
          >
            <div
              id="concept-scroll-image-wrapper-inner-1"
              className="relative h-full w-full"
            >
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                className="object-cover"
              />
            </div>
          </div>
          <div className="absolute inset-0 bg-brown/40" />
          <div
            id="concept-scroll-header-container-1"
            className="absolute inset-y-0 left-0 flex h-svh w-full flex-col items-center justify-center text-center text-sand"
          >
            <h2
              id="concept-scroll-header-wrapper-1"
              className="whitespace-pre-line text-[5.75rem] font-bold uppercase leading-none"
            >
              {title}
            </h2>
          </div>
          <div
            id="concept-scroll-content-1"
            className="absolute inset-y-0 right-0 flex h-svh w-1/2 flex-col items-center justify-center bg-sand px-10 py-10 text-center text-brown"
          >
            <div
              id="concept-scroll-content-text-1"
              className="flex w-84.75 flex-col items-center gap-20"
            >
              {blocks.map((block) => (
                <article
                  key={block.title}
                  className="flex w-full flex-col items-center gap-1"
                >
                  <h3 className="text-base font-semibold uppercase leading-normal">
                    {block.title}
                  </h3>
                  <p
                    className="text-sm leading-normal"
                    style={{ width: `${block.width}rem` }}
                  >
                    {block.body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
