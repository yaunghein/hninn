'use client'

import { useState } from 'react'
import Link from 'next/link'

import { Logo, Menu, Pattern } from '@/components/svgs'
import { cn } from '@/lib/utils/cn'

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

  return (
    <div
      className={cn(
        'fixed bottom-6 xs:bottom-6 left-1/2 z-50 -translate-x-1/2',
        // Mobile inset matches grid guide (px-6 × 2 = 3rem)
        menuOpen
          ? 'w-[calc(100%-3rem)] xs:w-[min(23.25rem,calc(100%-3rem))]'
          : 'w-[calc(100%-3rem)] xs:w-[min(54.0625rem,calc(100%-3rem))]',
      )}
    >
      {menuOpen && (
        <div
          className="absolute bottom-16 w-full overflow-hidden rounded-lg border-2 border-olive-light bg-olive px-2.5 py-13"
          role="dialog"
          aria-label="Site menu"
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
                onClick={() => setMenuOpen(false)}
                className="transition-opacity hover:opacity-70"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}

      <nav
        className={cn(
          'relative flex h-12 xs:h-14 w-full items-center justify-between border-2 px-1.25 xs:px-5',
          menuOpen
            ? 'rounded-lg border-olive-light bg-olive'
            : 'rounded-[1.75rem] border-sand bg-cream',
        )}
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
          onClick={() => setMenuOpen(false)}
        >
          <Logo
            color={menuOpen ? 'cream' : 'olive'}
            className="h-[1.2rem] w-19"
          />
        </Link>

        {/* Hours: desktop always; mobile only when menu is open */}
        <p
          className={cn(
            'flex-col text-xs font-medium uppercase leading-[1.2] tracking-[0.02em]',
            menuOpen ? 'flex text-cream' : 'hidden text-olive xs:flex',
          )}
        >
          <span className="whitespace-nowrap">{hours[0]}</span>
          <span className="whitespace-nowrap">{hours[1]}</span>
        </p>

        {!menuOpen && (
          <>
            <NavCta
              href={reservation.href}
              label={reservation.label}
              className="xs:hidden"
            />

            <div className="hidden items-center gap-3 xs:flex">
              <NavCta href={gallery.href} label={gallery.label} filled />
              <NavCta href={reservation.href} label={reservation.label} />
            </div>
          </>
        )}

        {/* Same footprint as the absolute toggle so layout stays stable */}
        <div className="size-9 shrink-0" aria-hidden />

        <button
          type="button"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
          className="absolute top-1/2 right-2 flex size-8 xs:size-9 -translate-y-1/2 cursor-pointer items-center justify-center transition-opacity hover:opacity-70 xs:right-5"
        >
          <Menu color={menuOpen ? 'cream' : 'olive'} open={menuOpen} />
        </button>
      </nav>
    </div>
  )
}
