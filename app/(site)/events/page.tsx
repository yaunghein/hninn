import { EventsHero } from '@/components/events'
import type { EventsContent } from '@/types/events'

const events: EventsContent = {
  title: 'Host Your Event at Hninn',
  description:
    'Whether it’s an intimate birthday brunch, a casual team get-together, or even a puppy playdate, our space is perfect for private and semi-private gatherings. We offer a relaxed atmosphere and customizable menus featuring our signature modern Burmese dishes and specialty drinks.',
  cta: {
    label: 'Inquire Now',
    href: '/contact',
    color: 'brown-muted',
    hoverColor: 'cream',
  },
  images: [
    {
      src: '/images/home_amazing_space_1.jpg',
      alt: 'Hninn dining room set for a private gathering',
    },
    {
      src: '/images/home_amazing_space_2.jpg',
      alt: 'Long table with candles ready for an event',
    },
    {
      src: '/images/home_amazing_space_3.jpg',
      alt: 'Decorated corner of the Hninn dining space',
    },
    {
      src: '/images/home_amazing_space_4.jpg',
      alt: 'Table setting details at Hninn',
    },
    {
      src: '/images/home_paws_included_1.jpg',
      alt: 'Pet-friendly seating for a casual gathering',
    },
    {
      src: '/images/home_slider_1.jpg',
      alt: 'Hninn interior with olive tree centerpiece',
    },
  ],
}

export default function EventsPage() {
  return <EventsHero {...events} />
}
