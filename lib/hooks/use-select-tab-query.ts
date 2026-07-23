'use client'

import { useCallback } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import {
  DEFAULT_TAB_ID,
  TAB_QUERY_KEY,
} from '@/lib/utils/tab-query'

/** Update `?tab=` in the URL without scrolling. Default tab omits the param. */
export function useSelectTabQuery(fallback: string = DEFAULT_TAB_ID) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  return useCallback(
    (id: string) => {
      const params = new URLSearchParams(searchParams.toString())
      if (id === fallback) params.delete(TAB_QUERY_KEY)
      else params.set(TAB_QUERY_KEY, id)

      const qs = params.toString()
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false })
    },
    [fallback, pathname, router, searchParams],
  )
}
