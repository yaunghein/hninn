import GeneralFacts from '@/app/components/home/general-facts'
import HomeHero from '@/app/components/home/hero'
import HomeMenu from '@/app/components/home/menu'
import type {
  GeneralFactsContent,
  HomeHeroContent,
  HomeMenuContent,
} from '@/app/types/home'

const sharedImage = {
  src: '/images/home_slider_1.jpg',
  alt: 'Hninn dining room with an olive tree at the center table',
}

const menuImage = {
  src: '/images/home_menu_1.png',
  alt: 'Hninn dish with tea service',
}

const menuImage2 = {
  src: '/images/home_menu_2.png',
  alt: 'Hninn dish with tea service',
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

const homeMenu: HomeMenuContent = {
  title: 'Bright, Bold, and Brunch-Ready',
  description:
    "See what you'd like to try before you even walk through the doors.",
  duration: 4000,
  items: [
    {
      name: 'Signature Tea Leaf Salad',
      src: menuImage.src,
      alt: menuImage.alt,
    },
    {
      name: "Hninn's Brunch Mohinga",
      src: menuImage2.src,
      alt: menuImage2.alt,
    },
    {
      name: 'Signature House Blend Coffee',
      src: menuImage.src,
      alt: menuImage.alt,
    },
    {
      name: 'Signature Tea Leaf Salad 2',
      src: menuImage2.src,
      alt: menuImage2.alt,
    },
    {
      name: "Hninn's Brunch Mohinga 2",
      src: menuImage.src,
      alt: menuImage.alt,
    },
    {
      name: 'Signature House Blend Coffee 2',
      src: menuImage2.src,
      alt: menuImage2.alt,
    },
  ],
  cta: {
    label: 'Explore the Full Menu',
    href: '/menu',
    color: 'olive',
    hoverColor: 'cream',
  },
}

export default function Home() {
  return (
    <>
      <HomeHero {...homeHero} />
      <GeneralFacts {...generalFacts} />
      <HomeMenu {...homeMenu} />
    </>
  )
}
