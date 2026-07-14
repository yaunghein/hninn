'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import FactImage from '@/components/home/fact-image'
import { cn } from '@/lib/utils/cn'
import type { GeneralFact, GeneralFactImage } from '@/types/home'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const PARALLAX_Y_DESKTOP = '8rem'
const PARALLAX_Y_MOBILE = '4rem'

type FactBlockProps = GeneralFact

type MobileImage = GeneralFactImage & {
  side: 'left' | 'right'
  key: string
}

/** Interleave columns into the zigzag reading order from the mobile design */
function getMobileStack(
  offset: 'left' | 'right',
  leftImages: GeneralFactImage[],
  rightImages: GeneralFactImage[],
): MobileImage[] {
  const stack: MobileImage[] = []
  const length = Math.max(leftImages.length, rightImages.length)

  for (let index = 0; index < length; index++) {
    if (offset === 'left') {
      if (rightImages[index]) {
        stack.push({
          ...rightImages[index],
          side: 'right',
          key: `right-${index}`,
        })
      }
      if (leftImages[index]) {
        stack.push({
          ...leftImages[index],
          side: 'left',
          key: `left-${index}`,
        })
      }
    } else {
      if (leftImages[index]) {
        stack.push({
          ...leftImages[index],
          side: 'left',
          key: `left-${index}`,
        })
      }
      if (rightImages[index]) {
        stack.push({
          ...rightImages[index],
          side: 'right',
          key: `right-${index}`,
        })
      }
    }
  }

  return stack
}

function parallaxRange(
  offset: 'left' | 'right',
  side: 'left' | 'right',
  travel: string,
) {
  // Offset-left: left rises, right falls. Offset-right: reverse.
  const leftRising = offset === 'left'
  const rises = side === 'left' ? leftRising : !leftRising

  return rises
    ? { from: travel, to: `-${travel}` }
    : { from: `-${travel}`, to: travel }
}

export default function FactBlock({
  title,
  titleLines,
  titleAlign,
  offset,
  leftImages,
  rightImages,
}: FactBlockProps) {
  const lines = titleLines ?? [title]
  const mobileStack = getMobileStack(offset, leftImages, rightImages)
  const rootRef = useRef<HTMLDivElement>(null)
  const leftRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const root = rootRef.current
      if (!root) return

      const mm = gsap.matchMedia()

      mm.add(
        {
          isMobile:
            '(max-width: 479px) and (prefers-reduced-motion: no-preference)',
          isDesktop:
            '(min-width: 480px) and (prefers-reduced-motion: no-preference)',
        },
        (context) => {
          const { isMobile, isDesktop } = context.conditions!
          const scrollTrigger = {
            trigger: root,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          } as const

          if (isDesktop) {
            const left = leftRef.current
            const right = rightRef.current
            if (!left || !right) return

            const leftRange = parallaxRange(offset, 'left', PARALLAX_Y_DESKTOP)
            const rightRange = parallaxRange(
              offset,
              'right',
              PARALLAX_Y_DESKTOP,
            )

            gsap.fromTo(
              left,
              { y: leftRange.from },
              {
                y: leftRange.to,
                ease: 'none',
                force3D: true,
                scrollTrigger: { ...scrollTrigger },
              },
            )

            gsap.fromTo(
              right,
              { y: rightRange.from },
              {
                y: rightRange.to,
                ease: 'none',
                force3D: true,
                scrollTrigger: { ...scrollTrigger },
              },
            )
          }

          if (isMobile) {
            const leftItems = gsap.utils.toArray<HTMLElement>(
              '[data-parallax="left"]',
              root,
            )
            const rightItems = gsap.utils.toArray<HTMLElement>(
              '[data-parallax="right"]',
              root,
            )

            const leftRange = parallaxRange(offset, 'left', PARALLAX_Y_MOBILE)
            const rightRange = parallaxRange(offset, 'right', PARALLAX_Y_MOBILE)

            if (leftItems.length) {
              gsap.fromTo(
                leftItems,
                { y: leftRange.from },
                {
                  y: leftRange.to,
                  ease: 'none',
                  force3D: true,
                  scrollTrigger: { ...scrollTrigger },
                },
              )
            }

            if (rightItems.length) {
              gsap.fromTo(
                rightItems,
                { y: rightRange.from },
                {
                  y: rightRange.to,
                  ease: 'none',
                  force3D: true,
                  scrollTrigger: { ...scrollTrigger },
                },
              )
            }
          }
        },
      )
    },
    { scope: rootRef, dependencies: [offset] },
  )

  return (
    <div ref={rootRef} className="relative">
      <h2
        className={cn(
          'pointer-events-none absolute top-0 z-10 px-6 text-6xl font-semibold uppercase leading-none tracking-[-0.02em] text-cream xs:top-32 xs:text-8xl',
          titleAlign === 'left' ? 'left-0 text-left' : 'right-0 text-right',
        )}
      >
        {lines.map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
      </h2>

      {/* Mobile: single-column zigzag (Figma 700:1325) */}
      <div className="flex flex-col gap-6 px-6 pt-32 xs:hidden">
        {mobileStack.map((image) => (
          <div
            key={image.key}
            data-parallax={image.side}
            className={cn(
              'w-3/4 will-change-transform',
              image.side === 'left' ? 'mr-auto' : 'ml-auto',
            )}
          >
            <FactImage src={image.src} alt={image.alt} />
          </div>
        ))}
      </div>

      {/* Desktop: two-column staggered grid */}
      <div className="hidden grid-cols-2 gap-x-5 px-8 xs:grid">
        <div
          ref={leftRef}
          className={cn(
            'flex flex-col gap-10 will-change-transform pr-2.5 pl-8',
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
            'flex flex-col gap-10 will-change-transform pl-2.5 pr-8',
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
