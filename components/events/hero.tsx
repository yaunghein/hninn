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
    <section className="flex min-h-dvh flex-col bg-peach-light pb-20">
      <div className="flex w-full flex-col items-center px-6 pt-18 text-center">
        <h1 className="text-[3.25rem] font-semibold uppercase leading-none tracking-[-0.02em] text-brown-muted">
          {title}
        </h1>
        <p className="mx-auto mt-13 max-w-148 text-sm leading-normal text-brown-muted">
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

      <div className="flex-1 grid place-items-center">
        <EventsSlider images={images} />
      </div>
    </section>
  )
}
