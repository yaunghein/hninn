import Link from 'next/link'

import { Logo, Pattern } from '@/components/svgs'

export type FooterLink = {
  label: string
  href: string
}

export type FooterContent = {
  social: FooterLink[]
  address: string
  hours: string
  legal: FooterLink[]
  copyright: string
}

type FooterProps = FooterContent

export default function Footer({
  social,
  address,
  hours,
  legal,
  copyright,
}: FooterProps) {
  const [instagram, facebook, tiktok] = social
  const [terms, privacy] = legal

  return (
    <footer className="bg-peach-light text-brown-muted">
      <div className="overflow-hidden pt-13 xs:pt-23">
        <Pattern color="brown-muted" opacity={0.2} className="w-[175vw]" />
      </div>

      <div className="grid grid-cols-1 gap-x-3 px-6 pb-24 pt-8 text-sm leading-[1.39] xs:grid-cols-8 xs:pt-13">
        <nav
          className="flex justify-between xs:contents"
          aria-label="Social"
        >
          {instagram && (
            <Link
              href={instagram.href}
              className="transition-opacity hover:opacity-70 xs:col-start-3"
            >
              {instagram.label}
            </Link>
          )}
          {facebook && (
            <Link
              href={facebook.href}
              className="transition-opacity hover:opacity-70 xs:col-start-6"
            >
              {facebook.label}
            </Link>
          )}
          {tiktok && (
            <Link
              href={tiktok.href}
              className="transition-opacity hover:opacity-70 xs:col-start-8 xs:justify-self-end"
            >
              {tiktok.label}
            </Link>
          )}
        </nav>

        <p className="mt-13 max-w-62 leading-[1.4] xs:col-span-2 xs:col-start-3 xs:mt-23">
          {address}
        </p>
        <p className="mt-6 max-w-44.5 whitespace-pre-line leading-[1.4] xs:col-span-2 xs:col-start-6 xs:mt-23">
          {hours}
        </p>

        <nav
          className="mt-13 flex justify-between xs:mt-0 xs:contents"
          aria-label="Legal"
        >
          {terms && (
            <Link
              href={terms.href}
              className="transition-opacity hover:opacity-70 xs:col-start-3 xs:mt-6"
            >
              {terms.label}
            </Link>
          )}
          {privacy && (
            <Link
              href={privacy.href}
              className="transition-opacity hover:opacity-70 xs:col-start-6 xs:mt-6"
            >
              {privacy.label}
            </Link>
          )}
        </nav>

        <div className="col-span-full mt-8 flex flex-col gap-3 xs:mt-23">
          <Logo color="brown-muted" className="w-full" />
          <p className="text-left xs:text-center">{copyright}</p>
        </div>
      </div>
    </footer>
  )
}
