'use client'

import { useEffect, useState } from 'react'

import {
  DEFAULT_TAB_ID,
  TAB_QUERY_KEY,
} from '@/lib/utils/tab-query'

/**
 * Client tab state with URL sync via history.replaceState.
 * Updates feel instant — no Next.js navigation / RSC refetch.
 */
export function useTabQueryState(
  initialId: string,
  fallback: string = DEFAULT_TAB_ID,
) {
  const [activeId, setActiveId] = useState(initialId)

  useEffect(() => {
    setActiveId(initialId)
  }, [initialId])

  function selectTab(id: string) {
    setActiveId(id)

    const url = new URL(window.location.href)
    if (id === fallback) url.searchParams.delete(TAB_QUERY_KEY)
    else url.searchParams.set(TAB_QUERY_KEY, id)

    const next = `${url.pathname}${url.search}${url.hash}`
    window.history.replaceState(window.history.state, '', next)
  }

  return { activeId, selectTab }
}
