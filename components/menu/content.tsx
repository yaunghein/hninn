'use client'

import { useTabQueryState } from '@/lib/hooks/use-tab-query-state'
import MenuGrid from '@/components/menu/grid'
import MenuTabs from '@/components/menu/tabs'
import type { MenuItem, MenuTab } from '@/types/menu'

type MenuContentProps = {
  tabs: MenuTab[]
  items: MenuItem[]
  initialActiveId: string
}

export default function MenuContent({
  tabs,
  items,
  initialActiveId,
}: MenuContentProps) {
  const { activeId, selectTab } = useTabQueryState(initialActiveId)

  return (
    <>
      <MenuTabs tabs={tabs} activeId={activeId} onSelect={selectTab} />
      <MenuGrid tabs={tabs} items={items} activeId={activeId} />
    </>
  )
}
