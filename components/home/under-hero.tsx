'use client'

import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { cn } from '@/lib/utils/cn'

gsap.registerPlugin(ScrollTrigger)

type UnderHeroProps = {
  hero: ReactNode
  children: ReactNode
}

/**
 * Desktop: hero scrolls away on top; children stay fixed underneath until the
 * hero is gone, then rejoin flow via `display: contents`.
 *
 * Mobile: skip the fixed pin — it freezes element positions so ScrollTrigger
 * parallax never advances. Stack hero + children in normal document flow.
 */
export default function UnderHero({ hero, children }: UnderHeroProps) {
  const heroRef = useRef<HTMLDivElement>(null)
  const factsRef = useRef<HTMLDivElement>(null)
  const [heroHeight, setHeroHeight] = useState(0)
  const [factsHeight, setFactsHeight] = useState(0)
  const [pinned, setPinned] = useState(true)
  const [desktopPin, setDesktopPin] = useState(false)

  useLayoutEffect(() => {
    const mq = window.matchMedia('(min-width: 480px)')
    const sync = () => setDesktopPin(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  useLayoutEffect(() => {
    if (!desktopPin) return

    const heroNode = heroRef.current
    const factsNode = factsRef.current
    if (!heroNode || !factsNode) return

    const sync = () => {
      setHeroHeight(heroNode.offsetHeight)
      const measureTarget =
        (factsNode.firstElementChild as HTMLElement | null) ?? factsNode
      setFactsHeight(measureTarget.offsetHeight)
    }

    sync()
    const observer = new ResizeObserver(sync)
    observer.observe(heroNode)
    observer.observe(factsNode)
    if (factsNode.firstElementChild) {
      observer.observe(factsNode.firstElementChild)
    }
    return () => observer.disconnect()
  }, [desktopPin])

  useEffect(() => {
    if (!desktopPin || !heroHeight) return

    const syncPin = () => {
      setPinned(window.scrollY < heroHeight)
    }

    syncPin()
    window.addEventListener('scroll', syncPin, { passive: true })
    return () => window.removeEventListener('scroll', syncPin)
  }, [desktopPin, heroHeight])

  useEffect(() => {
    ScrollTrigger.refresh()
  }, [desktopPin, pinned])

  // Mobile: normal flow so fact-block parallax can scrub with scroll
  if (!desktopPin) {
    return (
      <>
        <div ref={heroRef} className="relative z-10">
          {hero}
        </div>
        <div ref={factsRef} className="relative z-0">
          {children}
        </div>
      </>
    )
  }

  return (
    <>
      <div ref={heroRef} className="relative z-10">
        {hero}
      </div>
      {pinned ? (
        <div style={{ height: factsHeight }} aria-hidden />
      ) : null}
      <div
        ref={factsRef}
        className={cn(pinned ? 'fixed inset-x-0 top-0 z-0' : 'contents')}
      >
        {children}
      </div>
    </>
  )
}
