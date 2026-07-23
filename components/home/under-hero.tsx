'use client'

import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react'

import { cn } from '@/lib/utils/cn'

type UnderHeroProps = {
  hero: ReactNode
  children: ReactNode
}

/**
 * Hero scrolls away on top. Children stay fixed underneath until the hero is
 * fully out of view, then rejoin normal document flow via `display: contents`
 * so nested sticky (e.g. StickyAtEnd) is not trapped in a short wrapper.
 */
export default function UnderHero({ hero, children }: UnderHeroProps) {
  const heroRef = useRef<HTMLDivElement>(null)
  const factsRef = useRef<HTMLDivElement>(null)
  const [heroHeight, setHeroHeight] = useState(0)
  const [factsHeight, setFactsHeight] = useState(0)
  const [pinned, setPinned] = useState(true)

  useLayoutEffect(() => {
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
  }, [])

  useEffect(() => {
    if (!heroHeight) return

    const syncPin = () => {
      setPinned(window.scrollY < heroHeight)
    }

    syncPin()
    window.addEventListener('scroll', syncPin, { passive: true })
    return () => window.removeEventListener('scroll', syncPin)
  }, [heroHeight])

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
