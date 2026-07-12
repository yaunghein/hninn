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

const PATTERN_ROWS = 8

export default function Navbar({
  hours,
  gallery,
  reservation,
  menuLinks,
}: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      {menuOpen && (
        <div
          className="fixed bottom-22 left-1/2 z-50 w-[min(23.25rem,calc(100%-2.5rem))] -translate-x-1/2 overflow-hidden rounded-lg border-2 border-olive-light bg-olive px-2.5 py-13"
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
          'fixed bottom-6 left-1/2 z-50 flex h-14 -translate-x-1/2 items-center justify-between border-2 px-5 py-2',
          menuOpen
            ? 'w-[min(23.25rem,calc(100%-2.5rem))] rounded-lg border-olive-light bg-olive'
            : 'w-[min(54.0625rem,calc(100%-2.5rem))] rounded-full border-sand bg-cream',
        )}
        aria-label="Primary"
      >
        <Link
          href="/"
          className="flex w-21 shrink-0 items-start pb-0.5 pl-2"
          aria-label="Hninn home"
          onClick={() => setMenuOpen(false)}
        >
          <Logo
            color={menuOpen ? 'cream' : 'olive'}
            className="h-[1.2rem] w-19"
          />
        </Link>

        <p
          className={cn(
            'hidden flex-col text-xs font-medium uppercase leading-[1.2] tracking-[0.02em] sm:flex',
            menuOpen ? 'text-cream' : 'text-olive',
          )}
        >
          <span className="whitespace-nowrap">{hours[0]}</span>
          <span className="whitespace-nowrap">{hours[1]}</span>
        </p>

        {!menuOpen && (
          <div className="flex items-center gap-3">
            <Link
              href={gallery.href}
              className="rounded-[1.25rem] border border-olive bg-olive px-6 py-2 text-sm font-bold uppercase leading-[1.6] tracking-[0.02em] text-sand transition-all duration-300 hover:bg-olive-dark"
            >
              {gallery.label}
            </Link>
            <Link
              href={reservation.href}
              className="hidden rounded-[1.25rem] border border-olive px-6 py-2 text-sm font-bold uppercase leading-[1.6] tracking-[0.02em] text-olive transition-all duration-300 hover:bg-olive-dark hover:text-sand md:inline-flex"
            >
              {reservation.label}
            </Link>
          </div>
        )}

        <button
          type="button"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
          className="flex size-9 shrink-0 cursor-pointer items-center justify-center transition-opacity hover:opacity-70"
        >
          <Menu color={menuOpen ? 'cream' : 'olive'} open={menuOpen} />
        </button>
      </nav>
    </>
  )
}
