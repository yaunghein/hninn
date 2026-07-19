'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'

import { Logo, Menu, Pattern } from '@/components/svgs'
import { colorTokens } from '@/lib/constants/colors'
import { cn } from '@/lib/utils/cn'

gsap.registerPlugin(useGSAP, SplitText)

export type NavbarLink = {
  label: string
  href: string
}

export type NavbarContent = {
  hours: [string, string]
  gallery: NavbarLink
  reservation: NavbarLink
  menuLinks: NavbarLink[]
}

type NavbarProps = NavbarContent

const PATTERN_ROWS = 9
const SPRING = 'elastic.out(1, 0.75)'
const EASE_OUT = 'power2.out'
const EASE_IO = 'power3.inOut'

function NavCta({
  href,
  label,
  filled = false,
  className,
}: {
  href: string
  label: string
  filled?: boolean
  className?: string
}) {
  return (
    <Link
      href={href}
      className={cn(
        'group relative inline-flex h-9 items-center justify-center overflow-hidden border border-olive px-4 font-bold uppercase leading-[1.6] tracking-[0.02em] xs:h-10 rounded-[1.25rem] xs:px-6 text-[0.8rem] xs:text-sm',
        filled && 'bg-olive',
        className,
      )}
    >
      <span
        className="pointer-events-none absolute inset-y-0 left-0 w-[65%] origin-left scale-x-0 rounded-full bg-olive-dark transition-transform duration-300 ease-out group-hover:scale-x-100"
        aria-hidden
      />
      <span
        className="pointer-events-none absolute inset-y-0 right-0 w-[65%] origin-right scale-x-0 rounded-full bg-olive-dark transition-transform duration-300 ease-out group-hover:scale-x-100"
        aria-hidden
      />
      <span
        className={cn(
          'relative z-10 whitespace-nowrap transition-colors duration-300',
          filled ? 'text-sand' : 'text-olive group-hover:text-sand',
        )}
      >
        {label}
      </span>
    </Link>
  )
}

export default function Navbar({
  hours,
  gallery,
  reservation,
  menuLinks,
}: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const playOpenRef = useRef(() => {})
  const playCloseRef = useRef(() => {})

  useGSAP(
    () => {
      const q = gsap.utils.selector(rootRef)
      const ctas = q('#navbar-ctas')[0] as HTMLElement | undefined
      const menu = q('#navbar-menu')[0] as HTMLElement | undefined
      const links = q('.nav-menu-link')
      if (!ctas || !menu || !links.length) return

      const ctasWidth = ctas.offsetWidth
      gsap.set(ctas, { width: ctasWidth, overflow: 'hidden' })

      const split = SplitText.create(links, {
        type: 'lines',
        mask: 'lines',
        aria: 'auto',
      })

      gsap.set(menu, {
        transformOrigin: '50% 100%',
        scale: 0.75,
        autoAlpha: 0,
        pointerEvents: 'none',
      })
      gsap.set(split.lines, { yPercent: 100 })

      let active: gsap.core.Timeline | null = null
      const isDesktop = () => window.matchMedia('(min-width: 480px)').matches
      const navEase = () => (isDesktop() ? SPRING : EASE_OUT)
      const navDuration = () => (isDesktop() ? 0.75 : 0.35)

      playOpenRef.current = () => {
        active?.kill()
        active = gsap.timeline()

        const ease = navEase()
        const duration = navDuration()
        const desktop = isDesktop()

        if (desktop) {
          active.to(
            '#navbar-ctas',
            {
              autoAlpha: 0,
              scale: 0.9,
              width: 0,
              duration: 0.7,
              ease,
            },
            0,
          )
        } else {
          // Hide content immediately so no clipped CTA sliver shows while width collapses
          gsap.set('#navbar-ctas', { autoAlpha: 0 })
          active.to(
            '#navbar-ctas',
            {
              width: 0,
              scale: 0.9,
              duration,
              ease: EASE_OUT,
            },
            0,
          )
        }

        active.to(
          '#navbar-bar',
          {
            backgroundColor: colorTokens.olive,
            borderColor: colorTokens['olive-light'],
            borderRadius: '0.5rem',
            duration,
            ease,
          },
          0,
        )

        if (desktop) {
          active.to(
            '#navbar',
            {
              maxWidth: '23.25rem',
              duration,
              ease,
            },
            0,
          )
        }

        active.fromTo(
          menu,
          { scale: 0.75, autoAlpha: 0 },
          {
            scale: 1,
            autoAlpha: 1,
            duration: 0.75,
            ease: SPRING,
            pointerEvents: 'auto',
          },
          0,
        )

        active.fromTo(
          split.lines,
          { yPercent: 110 },
          {
            yPercent: 0,
            duration: 1.2,
            ease: 'power3.out',
            stagger: 0.05,
          },
          0,
        )
      }

      playCloseRef.current = () => {
        active?.kill()
        active = gsap.timeline({
          onComplete: () => {
            gsap.set(menu, { pointerEvents: 'none' })
          },
        })

        const ease = navEase()
        const duration = navDuration()
        const desktop = isDesktop()

        active.to(
          split.lines,
          {
            yPercent: 100,
            duration: 0.32,
            ease: EASE_IO,
            stagger: 0.04,
          },
          0,
        )

        active.to(
          menu,
          {
            scale: 0.75,
            autoAlpha: 0,
            duration: 0.175,
            ease: EASE_OUT,
          },
          0,
        )

        if (desktop) {
          active.to(
            '#navbar-ctas',
            {
              autoAlpha: 1,
              scale: 1,
              width: ctasWidth,
              duration: 0.7,
              ease,
            },
            0,
          )
        } else {
          // Expand first while invisible, then fade in so CTAs don't clip mid-grow
          active.to(
            '#navbar-ctas',
            {
              width: ctasWidth,
              scale: 1,
              duration,
              ease: EASE_OUT,
            },
            0,
          )
          active.to(
            '#navbar-ctas',
            {
              autoAlpha: 1,
              duration: 0.15,
              ease: EASE_OUT,
            },
            duration * 0.55,
          )
        }

        active.to(
          '#navbar-bar',
          {
            backgroundColor: colorTokens.cream,
            borderColor: colorTokens.sand,
            borderRadius: '1.75rem',
            duration,
            ease,
          },
          0,
        )

        if (desktop) {
          active.to(
            '#navbar',
            {
              maxWidth: '54.0625rem',
              duration,
              ease,
            },
            0,
          )
        }
      }

      return () => {
        active?.kill()
        split.revert()
      }
    },
    { scope: rootRef },
  )

  function handleToggle() {
    setMenuOpen((open) => {
      if (open) playCloseRef.current()
      else playOpenRef.current()
      return !open
    })
  }

  function handleClose() {
    if (!menuOpen) return
    playCloseRef.current()
    setMenuOpen(false)
  }

  return (
    <div ref={rootRef}>
      <div className="fixed bottom-6 left-1/2 z-50 w-[calc(100%-3rem)] -translate-x-1/2">
        {/* Kept outside #navbar so width isn't tied to the bar's maxWidth spring */}
        <div
          id="navbar-menu"
          className="invisible pointer-events-none absolute right-0 bottom-14 xs:bottom-16 left-0 mx-auto w-full origin-bottom scale-75 overflow-hidden rounded-lg border-2 border-olive-light bg-olive px-2.5 py-13 opacity-0 xs:w-93"
          role="dialog"
          aria-label="Site menu"
          aria-hidden={!menuOpen}
        >
          <div
            className="pointer-events-none absolute inset-0 overflow-hidden opacity-20"
            aria-hidden
          >
            <div className="flex w-[420%] translate-x-[-8%] translate-y-[-6%] flex-col">
              {Array.from({ length: PATTERN_ROWS }, (_, index) => (
                <Pattern key={index} color="olive-dark" />
              ))}
            </div>
          </div>

          <nav className="relative flex flex-col items-center gap-8 text-center text-2xl font-semibold uppercase leading-none text-sand">
            {menuLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={handleClose}
                className="nav-menu-link transition-opacity hover:opacity-70"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div id="navbar" className="mx-auto w-full xs:max-w-216.25">
          <nav
            id="navbar-bar"
            className="relative flex h-12 w-full items-center justify-between rounded-[1.75rem] border-2 border-sand bg-cream px-1.25 xs:h-14 xs:px-5"
            aria-label="Primary"
          >
            {/* Logo: desktop always; mobile only when menu is open */}
            <Link
              href="/"
              className={cn(
                'w-21 shrink-0 items-start pb-0.5 pl-2',
                menuOpen ? 'flex' : 'hidden xs:flex',
              )}
              aria-label="Hninn home"
              onClick={handleClose}
            >
              <Logo
                color={menuOpen ? 'cream' : 'olive'}
                className="h-[1.2rem] w-19"
              />
            </Link>

            {/* Hours: desktop always; mobile only when menu is open */}
            <p
              className={cn(
                'flex-col text-xs font-medium uppercase leading-[1.2] tracking-[0.02em] absolute xs:static left-[54%] top-1/2 -translate-y-1/2 -translate-x-1/2 xs:translate-x-0 xs:translate-y-0',
                menuOpen ? 'flex text-cream' : 'hidden text-olive xs:flex',
              )}
            >
              <span className="whitespace-nowrap">{hours[0]}</span>
              <span className="whitespace-nowrap">{hours[1]}</span>
            </p>

            <div
              id="navbar-ctas"
              className="flex shrink-0 items-center overflow-hidden"
            >
              <NavCta
                href={reservation.href}
                label={reservation.label}
                className="nav-cta xs:hidden"
              />

              <div className="hidden items-center gap-3 xs:flex">
                <NavCta
                  href={gallery.href}
                  label={gallery.label}
                  filled
                  className="nav-cta"
                />
                <NavCta
                  href={reservation.href}
                  label={reservation.label}
                  className="nav-cta"
                />
              </div>
            </div>

            {/* Same footprint as the absolute toggle so layout stays stable */}
            <div className="size-9 shrink-0" aria-hidden />

            <button
              type="button"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              onClick={handleToggle}
              className="absolute top-1/2 right-2 flex size-8 -translate-y-1/2 cursor-pointer items-center justify-center transition-opacity hover:opacity-70 xs:right-5 xs:size-9"
            >
              <Menu color={menuOpen ? 'cream' : 'olive'} open={menuOpen} />
            </button>
          </nav>
        </div>
      </div>
    </div>
  )
}
