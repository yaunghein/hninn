import { EventsHero } from '@/components/events'
import { sanityFetch } from '@/sanity/lib/live'
import {
  toEventsContent,
  type EventsPageData,
} from '@/sanity/lib/mappers'
import { EVENTS_PAGE_QUERY } from '@/sanity/lib/queries'
import { notFound } from 'next/navigation'

export default async function EventsPage() {
  const { data } = await sanityFetch({ query: EVENTS_PAGE_QUERY })

  if (!data) {
    notFound()
  }

  const events = toEventsContent(data as EventsPageData)

  return <EventsHero {...events} />
}
