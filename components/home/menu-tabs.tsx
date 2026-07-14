'use client'

import { useSyncExternalStore } from 'react'

import { cn } from '@/lib/utils/cn'
import { useHomeMenuStore } from '@/stores/home-menu'
import type { HomeMenuItem } from '@/types/home'

type MenuTabsProps = {
  items: HomeMenuItem[]
  onSelect: (index: number) => void
  onPrev: () => void
  onNext: () => void
}

function subscribeDesktop(onChange: () => void) {
  const mq = window.matchMedia('(min-width: 480px)')
  mq.addEventListener('change', onChange)
  return () => mq.removeEventListener('change', onChange)
}

function getDesktopSnapshot() {
  return window.matchMedia('(min-width: 480px)').matches
}

export default function MenuTabs({
  items,
  onSelect,
  onPrev,
  onNext,
}: MenuTabsProps) {
  const activeIndex = useHomeMenuStore((s) => s.activeIndex)
  const progress = useHomeMenuStore((s) => s.progress)
  const isDesktop = useSyncExternalStore(
    subscribeDesktop,
    getDesktopSnapshot,
    () => true,
  )
  const visibleCount = isDesktop ? 3 : 1
  const maxStart = Math.max(0, items.length - visibleCount)
  const windowStart = Math.min(
    Math.max(0, activeIndex - visibleCount + 1),
    maxStart,
  )

  const visibleItems = items.slice(windowStart, windowStart + visibleCount)

  return (
    <div className="border-y border-olive/40">
      <div className="flex h-10 xs:h-11 items-stretch">
        <div
          className="flex min-w-0 flex-1"
          role="tablist"
          aria-label="Menu items"
        >
          {visibleItems.map((item, visibleIndex) => {
            const index = windowStart + visibleIndex
            const isActive = index === activeIndex
            const fill = isActive ? progress : 0

            return (
              <div
                key={`${item.name}-${index}`}
                className="flex min-w-0 flex-1"
              >
                {visibleIndex > 0 && (
                  <div
                    className="w-px shrink-0 self-stretch bg-olive/40"
                    aria-hidden
                  />
                )}
                <button
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-label={item.name}
                  onClick={() => onSelect(index)}
                  className="relative flex min-w-0 flex-1 cursor-pointer items-center justify-center overflow-hidden px-3"
                >
                  <span
                    className="absolute inset-y-0 left-0 w-full origin-left bg-peach-light will-change-transform"
                    style={{
                      transform: `scaleX(${fill})`,
                      opacity: fill > 0 ? 1 : 0,
                    }}
                    aria-hidden
                  />
                  <span className="relative z-10 truncate text-[0.8rem] xs:text-sm font-medium leading-[1.39] text-taupe">
                    {item.name}
                  </span>
                </button>
              </div>
            )
          })}
        </div>

        <div className="flex shrink-0">
          <div className="w-px self-stretch bg-olive/40" aria-hidden />
          <button
            type="button"
            aria-label="Previous menu item"
            onClick={onPrev}
            className="flex w-14 xs:w-16 cursor-pointer items-center justify-center text-olive transition-opacity hover:opacity-70"
          >
            <Chevron direction="left" />
          </button>
          <div className="w-px self-stretch bg-olive/40" aria-hidden />
          <button
            type="button"
            aria-label="Next menu item"
            onClick={onNext}
            className="flex w-14 xs:w-16 cursor-pointer items-center justify-center text-olive transition-opacity hover:opacity-70"
          >
            <Chevron direction="right" />
          </button>
        </div>
      </div>
    </div>
  )
}

function Chevron({ direction }: { direction: 'left' | 'right' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={cn('size-5', direction === 'left' && 'rotate-180')}
      aria-hidden
    >
      <path
        d="M9 5l7 7-7 7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
