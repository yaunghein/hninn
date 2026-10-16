'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import FactImage from '@/components/home/fact-image'
import { cn } from '@/lib/utils/cn'
import type { GeneralFact, GeneralFactImage } from '@/types/home'

gsap.registerPlugin(useGSAP, ScrollTrigger)

/** Desktop: rem travel — both columns rise, the leading one faster for depth */
const PARALLAX_DESKTOP = { lead: 14, trail: 4 } as const
/** Mobile: yPercent travel — even/odd stack indices for depth (same direction) */
const PARALLAX_MOBILE_Y = [14, 6] as const
/** Light trailing ease on top of Lenis — enough to settle, not enough to lag */
const PARALLAX_SCRUB = 0.6

type FactBlockProps = GeneralFact

type MobileImage = GeneralFactImage & {
  side: 'left' | 'right'
  id: string
}

/**
 * Interleave columns into the zigzag reading order from the mobile design.
 * Sides alternate by position (not source column) so unbalanced columns never
 * stack two images on the same side.
 */
function getMobileStack(
  offset: 'left' | 'right',
  leftImages: GeneralFactImage[],
  rightImages: GeneralFactImage[],
): MobileImage[] {
  const first = offset === 'left' ? rightImages : leftImages
  const second = offset === 'left' ? leftImages : rightImages
  const firstSide = offset === 'left' ? 'right' : 'left'
  const length = Math.max(first.length, second.length)

  const ordered = Array.from({ length }, (_, index) =>
    [first[index], second[index]].filter(
      (image): image is GeneralFactImage => Boolean(image),
    ),
  ).flat()

  return ordered.map((image, index) => ({
    ...image,
    side: (index % 2 === 0) === (firstSide === 'left') ? 'left' : 'right',
    id: `${index}-${image.src}`,
  }))
}

/**
 * Both columns rise (never against scroll) so neither looks stuck; the
 * offset side leads at a faster rate. Symmetric ±travel keeps the columns
 * aligned at the midpoint of the scroll range.
 */
function parallaxTravel(offset: 'left' | 'right', side: 'left' | 'right') {
  return side === offset ? PARALLAX_DESKTOP.lead : PARALLAX_DESKTOP.trail
}

/**
 * Scrub range for a parallax target. Prefer UnderHero's in-flow sentinel when
 * present so progress tracks document geometry while the facts layer is
 * `position: fixed` under the hero. The sentinel sits right after the hero, so
 * its document top is the scroll position where the hero is fully gone —
 * nothing moves before that.
 */
function scrubRange(target: HTMLElement) {
  const flow = target
    .closest('[data-under-hero]')
    ?.querySelector<HTMLElement>('[data-under-hero-flow]')
  const section = target.closest('section')

  if (!flow || !section) {
    return { trigger: target, start: 'top bottom', end: 'bottom top' }
  }

  const flowTop = () => flow.getBoundingClientRect().top + window.scrollY
  const offset = () =>
    target.getBoundingClientRect().top - section.getBoundingClientRect().top

  return {
    trigger: flow,
    start: () => flowTop() + Math.max(offset() - window.innerHeight, 0),
    end: () => flowTop() + offset() + target.offsetHeight,
  }
}

function parallaxDesktop(
  items: HTMLElement[],
  offset: 'left' | 'right',
  side: 'left' | 'right',
  root: HTMLElement,
) {
  const travel = parallaxTravel(offset, side)

  items.forEach((item) => {
    gsap.fromTo(
      item,
      { y: `${travel}rem` },
      {
        y: `-${travel}rem`,
        ease: 'none',
        force3D: true,
        scrollTrigger: {
          ...scrubRange(root),
          scrub: PARALLAX_SCRUB,
          invalidateOnRefresh: true,
        },
      },
    )
  })
}

/**
 * Mobile zigzag: every card rises (never against scroll), but even/odd
 * cards use different travel so neighbors drift apart — that's the depth.
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
          ...scrubRange(item),
          scrub: PARALLAX_SCRUB,
          invalidateOnRefresh: true,
        },
      },
    )
  })
}

export default function FactBlock({
  title,
  description,
  titleLines,
  titleAlign,
  offset,
  leftImages,
  rightImages,
}: FactBlockProps) {
  const lines = titleLines ?? [title]
  const mobileStack = getMobileStack(offset, leftImages, rightImages)
  // Unbalanced columns: center the shorter one between the longer one's images
  const balanced = leftImages.length === rightImages.length
  const centerLeft = leftImages.length < rightImages.length
  const centerRight = rightImages.length < leftImages.length
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
            root,
          )
          parallaxDesktop(
            gsap.utils.toArray<HTMLElement>('[data-parallax="right"]', scope),
            offset,
            'right',
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
      <header
        className={cn(
          'pointer-events-none relative z-10 flex flex-col gap-4 px-6 xs:absolute xs:top-32 xs:gap-6',
          titleAlign === 'left'
            ? 'left-0 items-start text-left'
            : 'right-0 items-end text-right',
        )}
      >
        <h2 className="text-4xl font-semibold uppercase leading-none tracking-[-0.02em] text-cream xs:text-6xl">
          {lines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h2>
        <p className="max-w-72 text-sm leading-[1.39] text-cream xs:max-w-lg xs:text-base xs:leading-snug">
          {description}
        </p>
      </header>

      {/* Mobile: single-column zigzag (Figma 700:1325) */}
      <div
        data-parallax-scope="mobile"
        className="flex flex-col px-6 pt-8 xs:hidden"
      >
        {mobileStack.map((image, index) => (
          <div
            key={image.id}
            data-parallax={image.side}
            className={cn(
              'relative w-[55%] will-change-transform',
              index > 0 && '-mt-24',
              image.side === 'left' ? 'mr-auto' : 'ml-auto',
            )}
            style={{ zIndex: index }}
          >
            <FactImage {...image} />
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
            balanced && offset === 'left' && 'pt-16',
            centerLeft && 'justify-center',
          )}
        >
          {leftImages.map((image, index) => (
            <div
              key={`${image.src}-left-${index}`}
              data-parallax="left"
              className="will-change-transform"
            >
              <FactImage {...image} />
            </div>
          ))}
        </div>

        <div
          className={cn(
            'flex flex-col gap-10 pl-2.5 pr-52',
            balanced && offset === 'right' && 'pt-16',
            centerRight && 'justify-center',
          )}
        >
          {rightImages.map((image, index) => (
            <div
              key={`${image.src}-right-${index}`}
              data-parallax="right"
              className="will-change-transform"
            >
              <FactImage {...image} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
