import { AppLink, Button, GoogleMap } from '@/components/common'
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
    <section className="grid min-h-dvh xs:grid-cols-2">
      <div className="h-dvh xs:h-auto flex flex-col items-center bg-olive px-6 pbb-18 pt-13 text-sand xs:pb-32 xs:pt-26.5">
        <h1 className="max-w-66 text-center text-[2rem] font-semibold uppercase leading-none tracking-[-0.02em] xs:max-w-none xs:whitespace-nowrap xs:text-[3.25rem]">
          {title}
        </h1>

        <Button
          label={bookCta.label}
          href={bookCta.href}
          color={bookCta.color}
          hoverColor={bookCta.hoverColor}
          className="mt-13 xs:mt-24.5"
        />

        <div className="mt-27 sm:mt-35 flex w-full flex-col xs:mt-24 gap-20 xs:gap-23">
          <ul className="grid grid-cols-2 gap-4 text-center text-sm leading-normal">
            {contacts.map((item) => (
              <li key={item.label}>
                <AppLink
                  href={item.href}
                  className="transition-opacity hover:opacity-70"
                >
                  {item.label}
                </AppLink>
              </li>
            ))}
          </ul>

          <ul className="grid grid-cols-3 gap-4 text-sm leading-normal">
            {social.map((item) => (
              <li
                key={item.label}
                className="first-of-type:text-left text-center last-of-type:text-right"
              >
                <AppLink
                  href={item.href}
                  className="transition-opacity hover:opacity-70"
                >
                  {item.label}
                </AppLink>
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-20 flex-1 flex items-center justify-center xs:flex-0 mb-25 max-w-48 text-center text-sm leading-normal xs:mt-auto xs:mb-6">
          <span>{hours.open} </span>
          <span className="italic">{hours.closed}</span>
        </p>
      </div>

      <div className="flex flex-col bg-sand">
        <div className="flex flex-col items-center px-6 pb-20 pt-20 xs:pb-16 xs:pt-18">
          <h2 className="max-w-66 text-center text-[2rem] font-semibold uppercase leading-none tracking-[-0.02em] text-olive xs:max-w-100.25 xs:text-[3.25rem] xs:leading-[1.15]">
            {location.title}
          </h2>

          <Button
            label={location.directionsCta.label}
            href={location.directionsCta.href}
            color={location.directionsCta.color}
            hoverColor={location.directionsCta.hoverColor}
            className="mt-13 xs:mt-16"
          />
        </div>

        <div className="relative h-100 w-full xs:h-auto xs:min-h-125 xs:flex-1">
          <GoogleMap className="absolute inset-0" />
        </div>
      </div>
    </section>
  )
}
