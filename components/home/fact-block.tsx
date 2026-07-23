'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import FactImage from '@/components/home/fact-image'
import { cn } from '@/lib/utils/cn'
import type { GeneralFact, GeneralFactImage } from '@/types/home'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const PARALLAX_DESKTOP = 10
/** Mobile: yPercent travel — even/odd stack indices for depth (same direction) */
const PARALLAX_MOBILE_Y = [22, 9] as const

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

function parallaxDesktop(
  items: HTMLElement[],
  offset: 'left' | 'right',
  side: 'left' | 'right',
  travelRem: number,
  trigger: HTMLElement,
) {
  const travel = `${travelRem}rem`
  const { from, to } = parallaxRange(offset, side, travel)

  items.forEach((item) => {
    gsap.fromTo(
      item,
      { y: from },
      {
        y: to,
        ease: 'none',
        force3D: true,
        scrollTrigger: {
          trigger,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.2,
        },
      },
    )
  })
}

/**
 * Mobile zigzag: every card rises (never against scroll), but even/odd
 * cards use different travel so neighbors drift apart — that's the depth.
 * Each card drives its own trigger so motion happens while it's on screen.
 */
function parallaxMobile(items: HTMLElement[]) {
  items.forEach((item, index) => {
    const travel = PARALLAX_MOBILE_Y[index % 2]!

    gsap.fromTo(
      item,
      { yPercent: travel },
      {
        yPercent: -travel,
        ease: 'none',
        force3D: true,
        scrollTrigger: {
          trigger: item,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
          invalidateOnRefresh: true,
        },
      },
    )
  })
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

          if (isMobile) {
            const scope = root.querySelector<HTMLElement>(
              '[data-parallax-scope="mobile"]',
            )
            if (!scope) return

            parallaxMobile(
              gsap.utils.toArray<HTMLElement>('[data-parallax]', scope),
            )
            return
          }

          if (!isDesktop) return

          const scope = root.querySelector<HTMLElement>(
            '[data-parallax-scope="desktop"]',
          )
          if (!scope) return

          parallaxDesktop(
            gsap.utils.toArray<HTMLElement>('[data-parallax="left"]', scope),
            offset,
            'left',
            PARALLAX_DESKTOP,
            root,
          )
          parallaxDesktop(
            gsap.utils.toArray<HTMLElement>('[data-parallax="right"]', scope),
            offset,
            'right',
            PARALLAX_DESKTOP,
            root,
          )
        },
      )

      return () => mm.revert()
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
      <div
        data-parallax-scope="mobile"
        className="flex flex-col gap-6 px-6 pt-32 xs:hidden"
      >
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
      <div
        data-parallax-scope="desktop"
        className="hidden grid-cols-2 gap-x-5 px-8 xs:grid pt-53"
      >
        <div
          className={cn(
            'flex flex-col gap-10 pr-2.5 pl-52',
            offset === 'left' && 'pt-16',
          )}
        >
          {leftImages.map((image, index) => (
            <div
              key={`${image.src}-left-${index}`}
              data-parallax="left"
              className="will-change-transform"
            >
              <FactImage src={image.src} alt={image.alt} />
            </div>
          ))}
        </div>

        <div
          className={cn(
            'flex flex-col gap-10 pl-2.5 pr-52',
            offset === 'right' && 'pt-16',
          )}
        >
          {rightImages.map((image, index) => (
            <div
              key={`${image.src}-right-${index}`}
              data-parallax="right"
              className="will-change-transform"
            >
              <FactImage src={image.src} alt={image.alt} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
