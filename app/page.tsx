import GeneralFacts from '@/app/components/home/general-facts'
import HomeHero from '@/app/components/home/hero'
import type { GeneralFactsContent, HomeHeroContent } from '@/app/types/home'

const sharedImage = {
  src: '/images/home_slider_1.jpg',
  alt: 'Hninn dining room with an olive tree at the center table',
}

const homeHero: HomeHeroContent = {
  title: 'A Modern Taste of Myanmar, Right Here in Bangkok',
  description:
    'Welcome to Hninn. A cozy, pet-friendly space serving up contemporary Burmese brunch, specialty coffee, and warm hospitality in the heart of Phetchaburi.',
  duration: 3000,
  slides: [
    {
      src: '/images/home_slider_1.jpg',
      caption: 'Hninn dining room with an olive tree at the center table',
      background: 'peach',
      pattern: 'sand',
      logo: 'cream',
    },
    {
      src: '/images/home_slider_1.jpg',
      caption: 'Hninn dining room with an olive tree at the center table',
      background: 'peach-light',
      pattern: 'brown-muted',
      logo: 'cream',
    },
    {
      src: '/images/home_slider_1.jpg',
      caption: 'Hninn dining room with an olive tree at the center table',
      background: 'cream',
      pattern: 'olive',
      logo: 'cream',
    },
    {
      src: '/images/home_slider_1.jpg',
      caption: 'Hninn dining room with an olive tree at the center table',
      background: 'sand',
      pattern: 'peach',
      logo: 'cream',
    },
  ],
}

const generalFacts: GeneralFactsContent = {
  facts: [
    {
      title: 'Good Food',
      titleAlign: 'left',
      offset: 'left',
      leftImages: [sharedImage, sharedImage],
      rightImages: [sharedImage, sharedImage],
    },
    {
      title: 'Amazing Space',
      titleLines: ['Amazing', 'Space'],
      titleAlign: 'right',
      offset: 'right',
      leftImages: [sharedImage, sharedImage],
      rightImages: [sharedImage, sharedImage],
    },
    {
      title: 'Paws Included',
      titleLines: ['Paws', 'Included'],
      titleAlign: 'left',
      offset: 'left',
      leftImages: [sharedImage, sharedImage],
      rightImages: [sharedImage, sharedImage],
    },
  ],
  cta: {
    label: 'Explore Gallery',
    href: '/gallery',
    color: 'sand',
    hoverColor: 'olive',
  },
}

export default function Home() {
  return (
    <>
      <HomeHero {...homeHero} />
      <GeneralFacts {...generalFacts} />
    </>
  )
}
