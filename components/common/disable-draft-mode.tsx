'use client'

import { useIsPresentationTool } from 'next-sanity/hooks'

export default function DisableDraftMode() {
  const isPresentationTool = useIsPresentationTool()

  // Hide when inside Presentation Tool — Studio controls draft mode there
  if (isPresentationTool) return null

  return (
    <a
      href="/api/draft-mode/disable"
      className="fixed bottom-4 right-4 z-50 border border-olive bg-cream px-4 py-2 text-sm font-medium text-olive transition-colors hover:bg-olive hover:text-cream"
    >
      Disable draft mode
    </a>
  )
}
