'use client'

import { cn } from '@/lib/utils/cn'
import { useGalleryStore } from '@/stores/gallery'

export type GalleryTab = {
  id: string
  label: string
}

type GalleryTabsProps = {
  tabs: GalleryTab[]
}

export default function GalleryTabs({ tabs }: GalleryTabsProps) {
  const activeId = useGalleryStore((s) => s.activeId)
  const setActiveId = useGalleryStore((s) => s.setActiveId)

  return (
    <div className="border-b border-sand bg-cream">
      <div
        className="flex h-11 items-stretch"
        role="tablist"
        aria-label="Gallery categories"
      >
        {tabs.map((tab, index) => {
          const isActive = tab.id === activeId

          return (
            <div key={tab.id} className="flex min-w-0 flex-1">
              {index > 0 && (
                <div
                  className="w-px shrink-0 self-stretch bg-sand"
                  aria-hidden
                />
              )}
              <button
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveId(tab.id)}
                className={cn(
                  'flex min-w-0 flex-1 cursor-pointer items-center justify-center px-3 text-sm font-medium leading-[1.39] transition-colors',
                  isActive
                    ? 'bg-olive text-sand'
                    : 'bg-cream text-olive hover:bg-olive/10',
                )}
              >
                {tab.label}
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
