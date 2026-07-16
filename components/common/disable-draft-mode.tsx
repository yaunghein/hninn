'use client'

import { usePathname } from 'next/navigation'
import { useIsPresentationTool } from 'next-sanity/hooks'

import Button from '@/components/common/button'

export default function DisableDraftMode() {
  const isPresentationTool = useIsPresentationTool()
  const pathname = usePathname()

  // Hide when inside Presentation Tool — Studio controls draft mode there
  if (isPresentationTool) return null

  return (
    <Button
      label="Disable draft mode"
      className="cursor-pointer fixed bottom-4 right-4 z-50 scale-75 origin-bottom-right"
      onClick={() => {
        const redirect = encodeURIComponent(pathname || '/')
        window.location.assign(`/api/draft-mode/disable?redirect=${redirect}`)
      }}
    />
  )
}
