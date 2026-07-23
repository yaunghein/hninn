'use client'

import { cn } from '@/lib/utils/cn'

export type GalleryTab = {
  id: string
  label: string
}

type GalleryTabsProps = {
  tabs: GalleryTab[]
  activeId: string
  onSelect: (id: string) => void
}

export default function GalleryTabs({
  tabs,
  activeId,
  onSelect,
}: GalleryTabsProps) {
  return (
    <div className="border-b border-sand bg-cream">
      <div
        className="flex h-11 items-stretch overflow-x-auto scrollbar-none [&::-webkit-scrollbar]:hidden"
        role="tablist"
        aria-label="Gallery categories"
      >
        {tabs.map((tab, index) => {
          const isActive = tab.id === activeId

          return (
            <div key={tab.id} className="flex shrink-0 xs:min-w-0 xs:flex-1">
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
                onClick={() => onSelect(tab.id)}
                className={cn(
                  'flex min-w-28 cursor-pointer items-center justify-center whitespace-nowrap px-6 text-sm font-medium leading-[1.39] transition-colors xs:min-w-0 xs:flex-1 xs:px-3',
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
