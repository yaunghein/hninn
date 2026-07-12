import Link from 'next/link'

import { Logo, Pattern } from '@/app/components/svgs'

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
  return (
    <footer className="bg-peach-light text-brown-muted">
      <div className="overflow-hidden pt-23">
        <Pattern color="brown-muted" opacity={0.2} className="w-[175vw]" />
      </div>

      <div className="flex flex-col gap-13 px-6 pb-24 pt-13">
        <div className="flex flex-col gap-23 text-sm leading-[1.39] md:pl-88">
          <nav
            className="grid grid-cols-1 gap-4 md:grid-cols-3"
            aria-label="Social"
          >
            {social.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="transition-opacity hover:opacity-70 md:last:text-right"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <p className="max-w-62 leading-[1.4]">{address}</p>
              <p className="max-w-44.5 whitespace-pre-line leading-[1.4]">
                {hours}
              </p>
            </div>
            <nav
              className="grid grid-cols-1 gap-4 md:grid-cols-3"
              aria-label="Legal"
            >
              {legal.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="transition-opacity hover:opacity-70"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <Logo color="brown-muted" className="w-full" />
          <p className="text-center text-sm leading-[1.39]">{copyright}</p>
        </div>
      </div>
    </footer>
  )
}
