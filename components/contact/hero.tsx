import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/components/common'
import type { ContactContent } from '@/types/contact'

type ContactHeroProps = ContactContent

export default function ContactHero({
  title,
  bookCta,
  contacts,
  social,
  hours,
  location,
}: ContactHeroProps) {
  return (
    <section className="grid min-h-dvh md:grid-cols-2">
      <div className="flex flex-col items-center bg-olive px-6 pb-32 pt-18 text-sand md:pt-26.5">
        <h1 className="text-center text-[3.25rem] font-semibold uppercase leading-none tracking-[-0.02em]">
          {title}
        </h1>

        <Button
          label={bookCta.label}
          href={bookCta.href}
          color={bookCta.color}
          hoverColor={bookCta.hoverColor}
          className="mt-24.5"
        />

        <div className="mt-24 flex w-full flex-col gap-23">
          <ul className="grid grid-cols-2 gap-4 text-center text-sm leading-normal">
            {contacts.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="transition-opacity hover:opacity-70"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <ul className="grid grid-cols-3 gap-4 text-sm leading-normal">
            {social.map((item) => (
              <li
                key={item.label}
                className="first-of-type:text-left text-center last-of-type:text-right"
              >
                <Link
                  href={item.href}
                  className="transition-opacity hover:opacity-70"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-auto mb-6 max-w-48 text-center text-sm leading-normal">
          <span>{hours.open} </span>
          <span className="italic">{hours.closed}</span>
        </p>
      </div>

      <div className="flex flex-col bg-sand">
        <div className="flex flex-col items-center px-6 pb-16 pt-18">
          <h2 className="max-w-100.25 text-center text-[3.25rem] font-semibold uppercase leading-[1.15] tracking-[-0.02em] text-olive">
            {location.title}
          </h2>

          <Button
            label={location.directionsCta.label}
            href={location.directionsCta.href}
            color={location.directionsCta.color}
            hoverColor={location.directionsCta.hoverColor}
            className="mt-16"
          />
        </div>

        <div className="relative min-h-125 flex-1">
          <Image
            src={location.map.src}
            alt={location.map.alt}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-[center_35%]"
            priority
          />
        </div>
      </div>
    </section>
  )
}
