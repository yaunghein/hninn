'use client'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useLayoutEffect, useRef, useState } from 'react'

import { Logo } from '@/components/svgs'
import {
  hasRecentPageLoader,
  markPageLoaderShown,
} from '@/lib/utils/page-loader-cookie'

gsap.registerPlugin(useGSAP)

export default function PageLoader() {
  const rootRef = useRef<HTMLDivElement>(null)
  const wipeRef = useRef<HTMLDivElement>(null)
  const [show, setShow] = useState(false)

  useLayoutEffect(() => {
    if (hasRecentPageLoader()) return
    markPageLoaderShown()
    // Show before paint when the cookie is missing (no cream flash when it exists).
    // eslint-disable-next-line react-hooks/set-state-in-effect -- mount-only cookie gate
    setShow(true)
  }, [])

  useGSAP(
    () => {
      if (!show) return

      const root = rootRef.current
      const wipe = wipeRef.current
      if (!root || !wipe) return

      document.documentElement.style.overflow = 'hidden'

      gsap
        .timeline({
          defaults: { ease: 'power2.inOut' },
          onComplete: () => {
            document.documentElement.style.overflow = ''
            setShow(false)
          },
        })
        .fromTo(
          wipe,
          { height: '100%' },
          { height: '0%', duration: 2.5, delay: 0.35 },
        )
        .to(root, { opacity: 0, duration: 1, delay: 0.2 })

      return () => {
        document.documentElement.style.overflow = ''
      }
    },
    { scope: rootRef, dependencies: [show] },
  )

  if (!show) return null

  return (
    <div ref={rootRef} className="fixed inset-0 z-100 bg-cream" aria-hidden>
      <div className="absolute inset-0 top-auto bottom-6 w-full aspect-[4.1/1] px-6">
        <Logo color="olive" className="w-full" />
        <div
          ref={wipeRef}
          className="absolute inset-x-0 top-0 h-full bg-cream"
          aria-hidden
        />
      </div>
    </div>
  )
}
