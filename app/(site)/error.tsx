'use client'

import { useEffect } from 'react'

import { Button, ErrorContent } from '@/components/common'

/** Segment error UI for site routes (navbar/footer stay from the parent layout). */
export default function SiteError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string }
  unstable_retry: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <ErrorContent
      actions={
        <>
          <Button
            label="Try again"
            color="olive"
            hoverColor="cream"
            onClick={() => unstable_retry()}
          />
          <Button label="Back home" href="/" color="olive" hoverColor="cream" />
        </>
      }
    />
  )
}
