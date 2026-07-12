import HomeHero from '@/app/components/home/hero'
import type { HomeHeroContent } from '@/app/types/home'

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

export default function Home() {
  return <HomeHero {...homeHero} />
}
