import { Button } from '@/components/common'
import EventsSlider from '@/components/events/slider'
import type { EventsContent } from '@/types/events'

type EventsHeroProps = EventsContent

export default function EventsHero({
  title,
  description,
  cta,
  images,
}: EventsHeroProps) {
  return (
    <section className="flex min-h-dvh flex-col bg-peach-light pb-25 xs:pb-20">
      <div className="flex w-full flex-col items-center px-6 pt-13 text-center xs:pt-18">
        <h1 className="max-w-66 text-[2rem] font-semibold uppercase leading-none tracking-[-0.02em] text-brown-muted xs:max-w-none xs:whitespace-nowrap xs:text-[3.25rem]">
          {title}
        </h1>
        <p className="mx-auto mt-8 max-w-148 text-[0.85rem] xs:text-sm leading-normal text-brown-muted xs:mt-13 xs:px-0">
          {description}
        </p>

        <Button
          label={cta.label}
          href={cta.href}
          color={cta.color}
          hoverColor={cta.hoverColor}
          className="mt-12"
        />
      </div>

      <div className="mt-13 xs:flex-1 xs:grid xs:place-items-center">
        <EventsSlider images={images} />
      </div>
    </section>
  )
}
