'use client'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'
import { useRef } from 'react'

import PatternBackdrop from '@/components/home/pattern-backdrop'
import { cn } from '@/lib/utils/cn'
import type { MenuItem } from '@/types/menu'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const PANEL_DURATION = 0.75
const PANEL_EASE = 'power3.out'

/** How far past the viewport bottom the card bottom must go before the panel shows (mobile). */
const MOBILE_PANEL_REVEAL_OFFSET = '75rem'

type MenuCardProps = {
  item: MenuItem
}

export default function MenuCard({ item }: MenuCardProps) {
  const cardRef = useRef<HTMLElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const image = item.image
  const hasDescription = Boolean(item.description?.trim())

  useGSAP(
    () => {
      const card = cardRef.current
      const panel = panelRef.current
      if (!card || !panel) return

      const reduceMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches

      const showPanel = () => {
        gsap.killTweensOf(panel)
        if (reduceMotion) {
          gsap.set(panel, { autoAlpha: 1, y: 0 })
          return
        }
        gsap.to(panel, {
          autoAlpha: 1,
          y: 0,
          duration: PANEL_DURATION,
          ease: PANEL_EASE,
          overwrite: 'auto',
        })
      }

      const hidePanel = () => {
        gsap.killTweensOf(panel)
        if (reduceMotion) {
          gsap.set(panel, { autoAlpha: 0, y: 16 })
          return
        }
        gsap.to(panel, {
          autoAlpha: 0,
          y: 16,
          duration: PANEL_DURATION,
          ease: PANEL_EASE,
          overwrite: 'auto',
        })
      }

      gsap.set(panel, { autoAlpha: 0, y: 16 })

      const mm = gsap.matchMedia()

      mm.add('(max-width: 479px)', () => {
        ScrollTrigger.create({
          trigger: card,
          start: `bottom+=${MOBILE_PANEL_REVEAL_OFFSET} bottom`,
          onEnter: showPanel,
          onLeaveBack: hidePanel,
        })
      })

      mm.add('(min-width: 480px)', () => {
        gsap.set(panel, { autoAlpha: 0, y: 16 })
        card.addEventListener('mouseenter', showPanel)
        card.addEventListener('mouseleave', hidePanel)
        card.addEventListener('focusin', showPanel)
        card.addEventListener('focusout', hidePanel)

        return () => {
          card.removeEventListener('mouseenter', showPanel)
          card.removeEventListener('mouseleave', hidePanel)
          card.removeEventListener('focusin', showPanel)
          card.removeEventListener('focusout', hidePanel)
        }
      })

      return () => mm.revert()
    },
    { scope: cardRef, dependencies: [item.id] },
  )

  return (
    <article ref={cardRef} className="relative aspect-0.75/1 overflow-hidden">
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes="(min-width: 480px) 25vw, 100vw"
        className="object-cover"
        placeholder={image.lqip ? 'blur' : 'empty'}
        blurDataURL={image.lqip}
      />

      <div
        ref={panelRef}
        className="invisible absolute inset-x-0 bottom-0 translate-y-4 p-4 opacity-0"
      >
        <div
          className={cn(
            'relative overflow-hidden rounded-lg border border-olive-light bg-olive text-cream px-4 py-4',
            hasDescription
              ? 'flex flex-col gap-2.5'
              : 'flex items-center justify-between gap-4',
          )}
        >
          <div className="w-[140%] xs:w-[320%] opacity-50 absolute inset-0">
            <PatternBackdrop color="olive-dark" />
          </div>

          <div
            className={cn(
              'relative z-10 flex gap-4',
              hasDescription
                ? 'items-start justify-between'
                : 'min-w-0 flex-1 items-center justify-between',
            )}
          >
            <h2
              className={cn(
                'uppercase leading-[1.39]',
                hasDescription
                  ? 'text-sm font-bold'
                  : 'min-w-0 text-sm font-medium',
              )}
            >
              {item.name}
            </h2>
            {item.price ? (
              <p className="shrink-0 text-sm font-bold leading-[1.39]">
                {item.price}
              </p>
            ) : null}
          </div>

          {hasDescription ? (
            <p className="relative z-10 text-xs italic leading-normal">
              {item.description}
            </p>
          ) : null}
        </div>
      </div>
    </article>
  )
}
