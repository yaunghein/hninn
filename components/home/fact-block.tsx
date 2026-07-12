'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import FactImage from '@/components/home/fact-image'
import { cn } from '@/lib/utils/cn'
import type { GeneralFact } from '@/types/home'

gsap.registerPlugin(useGSAP, ScrollTrigger)

/** Vertical travel for opposite-column parallax */
const PARALLAX_Y = '8rem'

type FactBlockProps = GeneralFact

export default function FactBlock({
  title,
  titleLines,
  titleAlign,
  offset,
  leftImages,
  rightImages,
}: FactBlockProps) {
  const lines = titleLines ?? [title]
  const rootRef = useRef<HTMLDivElement>(null)
  const leftRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const left = leftRef.current
      const right = rightRef.current
      if (!left || !right) return

      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const scrollTrigger = {
          trigger: rootRef.current,
          start: 'top bottom',
          end: 'bottom top',
          // Number = seconds to catch up — smoother than scrub: true
          scrub: 1.2,
        } as const

        // Offset-left: left rises, right falls. Offset-right (middle): reverse.
        const leftFrom = offset === 'right' ? `-${PARALLAX_Y}` : PARALLAX_Y
        const leftTo = offset === 'right' ? PARALLAX_Y : `-${PARALLAX_Y}`
        const rightFrom = offset === 'right' ? PARALLAX_Y : `-${PARALLAX_Y}`
        const rightTo = offset === 'right' ? `-${PARALLAX_Y}` : PARALLAX_Y

        gsap.fromTo(
          left,
          { y: leftFrom },
          {
            y: leftTo,
            ease: 'none',
            force3D: true,
            scrollTrigger: { ...scrollTrigger },
          },
        )

        gsap.fromTo(
          right,
          { y: rightFrom },
          {
            y: rightTo,
            ease: 'none',
            force3D: true,
            scrollTrigger: { ...scrollTrigger },
          },
        )
      })
    },
    { scope: rootRef, dependencies: [offset] },
  )

  return (
    <div ref={rootRef} className="relative">
      <h2
        className={cn(
          'pointer-events-none absolute top-32 z-10 px-6 text-8xl font-semibold uppercase leading-none tracking-[-0.02em] text-cream',
          titleAlign === 'left' ? 'left-0 text-left' : 'right-0 text-right',
        )}
      >
        {lines.map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
      </h2>

      <div className="grid grid-cols-2 gap-x-10 px-21">
        <div
          ref={leftRef}
          className={cn(
            'flex flex-col gap-10 will-change-transform',
            offset === 'left' && 'pt-53',
          )}
        >
          {leftImages.map((image, index) => (
            <FactImage
              key={`${image.src}-left-${index}`}
              src={image.src}
              alt={image.alt}
            />
          ))}
        </div>

        <div
          ref={rightRef}
          className={cn(
            'flex flex-col gap-10 will-change-transform',
            offset === 'right' && 'pt-53',
          )}
        >
          {rightImages.map((image, index) => (
            <FactImage
              key={`${image.src}-right-${index}`}
              src={image.src}
              alt={image.alt}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
