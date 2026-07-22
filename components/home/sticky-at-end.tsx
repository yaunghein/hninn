'use client'

import { useLayoutEffect, useRef, type ReactNode } from 'react'

import { cn } from '@/lib/utils/cn'

type StickyAtEndProps = {
  children: ReactNode
  className?: string
}

/** Scrolls normally, then sticks once the bottom of the block hits the viewport bottom. */
export default function StickyAtEnd({ children, className }: StickyAtEndProps) {
  const ref = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const node = ref.current
    if (!node) return

    const syncTop = () => {
      node.style.top = `calc(100dvh - ${node.offsetHeight}px)`
    }

    syncTop()

    const observer = new ResizeObserver(syncTop)
    observer.observe(node)
    window.addEventListener('resize', syncTop)

    return () => {
      observer.disconnect()
      window.removeEventListener('resize', syncTop)
    }
  }, [])

  return (
    <div ref={ref} className={cn('sticky', className)}>
      {children}
    </div>
  )
}
