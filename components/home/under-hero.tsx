'use client'

import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react'

import { cn } from '@/lib/utils/cn'

type UnderHeroProps = {
  hero: ReactNode
  children: ReactNode
}

/**
 * Hero scrolls away on top; children stay fixed underneath until the hero is
 * gone, then rejoin flow via `display: contents`.
 *
 * An in-flow `[data-under-hero-flow]` sentinel marks where children live in the
 * document so ScrollTrigger parallax can scrub against stable geometry while
 * the visual layer is `position: fixed`. The spacer ↔ contents swap keeps
 * document height stable, so no ScrollTrigger refresh is needed on the
 * handoff — a refresh would snap in-flight scrub easing.
 *
 * When unpinned, the outer wrapper is also `contents` so StickyAtEnd’s
 * containing block is the page shell — facts can stick while menu / find-us
 * scroll over them.
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
    <div
      data-under-hero={pinned ? 'pinned' : 'flow'}
      className={cn(!pinned && 'contents')}
    >
      <div ref={heroRef} className="relative z-10">
        {hero}
      </div>
      {/* Stable in-flow anchor for ScrollTrigger while the visual layer is fixed */}
      <div data-under-hero-flow className="relative h-0 w-full" aria-hidden />
      {pinned ? (
        <div style={{ height: factsHeight }} aria-hidden />
      ) : null}
      <div
        ref={factsRef}
        className={cn(pinned ? 'fixed inset-x-0 top-0 z-0' : 'contents')}
      >
        {children}
      </div>
    </div>
  )
}
