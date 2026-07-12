import { ContactHero } from '@/components/contact'
import type { ContactContent } from '@/types/contact'

const contact: ContactContent = {
  title: 'Get in Touch',
  bookCta: {
    label: 'Book a Table',
    href: '/reservation',
    color: 'sand',
    hoverColor: 'olive',
  },
  contacts: [
    { label: 'Hotline', href: 'tel:+6620000000' },
    { label: 'Email', href: 'mailto:hello@hninn.com' },
  ],
  social: [
    { label: 'Instagram', href: 'https://instagram.com' },
    { label: 'Facebook', href: 'https://facebook.com' },
    { label: 'Tiktok', href: 'https://tiktok.com' },
  ],
  hours: {
    open: 'Open Daily 7:00 – 23:00',
    closed: 'Closed on Wednesdays',
  },
  location: {
    title: 'Find Us in Phetchaburi',
    directionsCta: {
      label: 'Get Directions',
      href: 'https://maps.google.com/?q=Hninn+Phetchaburi+Bangkok',
      color: 'olive',
      hoverColor: 'sand',
    },
    map: {
      src: '/images/contact_map.jpg',
      alt: 'Map showing Hninn on Phetchaburi Road near Saen Saep canal',
    },
  },
}

export default function ContactPage() {
  return <ContactHero {...contact} />
}
