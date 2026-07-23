'use client'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useLenis } from 'lenis/react'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'

import { Logo } from '@/components/svgs'
import {
  HOME_SLIDE_REVEAL_DURATION,
  HOME_SLIDE_REVEAL_EASE,
} from '@/lib/constants/home-slider'
import { markPageLoaderShown } from '@/lib/utils/page-loader-cookie'

gsap.registerPlugin(useGSAP)

type PageLoaderProps = {
  /** From server cookie check — true means cover content on first paint. */
  showInitially: boolean
}

export default function PageLoader({ showInitially }: PageLoaderProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const wipeRef = useRef<HTMLDivElement>(null)
  const lenis = useLenis()
  const [show, setShow] = useState(showInitially)

  useLayoutEffect(() => {
    if (!showInitially) return
    markPageLoaderShown()
  }, [showInitially])

  useEffect(() => {
    if (!lenis) return
    if (show) lenis.stop()
    else lenis.start()
  }, [lenis, show])

  useGSAP(
    () => {
      if (!show) return

      const root = rootRef.current
      const wipe = wipeRef.current
      if (!root || !wipe) return

      gsap
        .timeline({
          defaults: { ease: 'power2.inOut' },
          onComplete: () => {
            setShow(false)
          },
        })
        .fromTo(
          wipe,
          { height: '100%' },
          { height: '0%', duration: 2.5, delay: 0.35 },
        )
        .fromTo(
          root,
          { clipPath: 'inset(0% 0% 0% 0%)' },
          {
            clipPath: 'inset(0% 0% 100% 0%)',
            duration: HOME_SLIDE_REVEAL_DURATION + 0.75,
            ease: HOME_SLIDE_REVEAL_EASE,
            delay: 0.2,
          },
        )
    },
    { scope: rootRef, dependencies: [show] },
  )

  if (!show) return null

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-100 bg-cream will-change-[clip-path]"
      aria-hidden
    >
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
