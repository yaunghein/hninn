'use client'

import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect } from 'react'

import MenuCard from '@/components/menu/card'
import MenuEmpty from '@/components/menu/empty'
import { useMenuStore } from '@/stores/menu'
import type { MenuItem, MenuTab } from '@/types/menu'

type MenuGridProps = {
  tabs: MenuTab[]
  items: MenuItem[]
}

export default function MenuGrid({ tabs, items }: MenuGridProps) {
  const activeId = useMenuStore((state) => state.activeId)

  const visibleItems =
    activeId === 'all'
      ? items
      : items.filter((item) => item.categoryId === activeId)

  const activeLabel =
    tabs.find((tab) => tab.id === activeId)?.label ?? 'All'

  useEffect(() => {
    ScrollTrigger.refresh()
  }, [activeId, visibleItems.length])

  if (visibleItems.length === 0) {
    return <MenuEmpty categoryLabel={activeLabel} />
  }

  return (
    <div className="grid grid-cols-1 gap-px bg-cream xs:grid-cols-4">
      {visibleItems.map((item) => (
        <MenuCard key={item.id} item={item} />
      ))}
    </div>
  )
}
