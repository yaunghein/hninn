import HomeFindUs from '@/app/components/home/find-us'
import GeneralFacts from '@/app/components/home/general-facts'
import HomeHero from '@/app/components/home/hero'
import HomeMenu from '@/app/components/home/menu'
import type {
  GeneralFactsContent,
  HomeFindUsContent,
  HomeHeroContent,
  HomeMenuContent,
} from '@/app/types/home'

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
      src: '/images/home_good_food_2.jpg',
      caption: 'Hninn dining room with an olive tree at the center table',
      background: 'peach-light',
      pattern: 'brown-muted',
      logo: 'cream',
    },
    {
      src: '/images/home_amazing_space_2.jpg',
      caption: 'Hninn dining room with an olive tree at the center table',
      background: 'cream',
      pattern: 'olive',
      logo: 'cream',
    },
    {
      src: '/images/home_paws_included_1.jpg',
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
      leftImages: [
        {
          src: '/images/home_good_food_1.jpg',
          alt: 'Hninn dish plated with fresh herbs',
        },
        {
          src: '/images/home_good_food_2.jpg',
          alt: 'Hninn brunch spread on the table',
        },
      ],
      rightImages: [
        {
          src: '/images/home_good_food_3.jpg',
          alt: 'Close-up of a Hninn specialty dish',
        },
        {
          src: '/images/home_good_food_4.jpg',
          alt: 'Hninn tea and food pairing',
        },
      ],
    },
    {
      title: 'Amazing Space',
      titleLines: ['Amazing', 'Space'],
      titleAlign: 'right',
      offset: 'right',
      leftImages: [
        {
          src: '/images/home_amazing_space_1.jpg',
          alt: 'Hninn dining room interior',
        },
        {
          src: '/images/home_amazing_space_2.jpg',
          alt: 'Hninn seating and ambiance',
        },
      ],
      rightImages: [
        {
          src: '/images/home_amazing_space_3.jpg',
          alt: 'Hninn cafe space detail',
        },
        {
          src: '/images/home_amazing_space_4.jpg',
          alt: 'Hninn restaurant atmosphere',
        },
      ],
    },
    {
      title: 'Paws Included',
      titleLines: ['Paws', 'Included'],
      titleAlign: 'left',
      offset: 'left',
      leftImages: [
        {
          src: '/images/home_paws_included_1.jpg',
          alt: 'Dog-friendly moment at Hninn',
        },
        {
          src: '/images/home_paws_included_2.jpg',
          alt: 'Pet visiting Hninn with guests',
        },
      ],
      rightImages: [
        {
          src: '/images/home_paws_included_3.jpg',
          alt: 'Pet-friendly seating at Hninn',
        },
        {
          src: '/images/home_paws_included_4.jpg',
          alt: 'Welcome for pets at Hninn',
        },
      ],
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

const homeFindUs: HomeFindUsContent = {
  title: 'Find Us in Phetchaburi',
  map: {
    src: '/images/home_map.jpg',
    alt: 'Map showing Hninn location in Phetchaburi',
  },
  cta: {
    label: 'Get Direction',
    href: 'https://maps.google.com/?q=Hninn+Contemporary+Burmese+Bangkok',
    color: 'peach-light',
    hoverColor: 'brown-muted',
  },
}

export default function Home() {
  return (
    <>
      <HomeHero {...homeHero} />
      <GeneralFacts {...generalFacts} />
      <HomeMenu {...homeMenu} />
      <HomeFindUs {...homeFindUs} />
    </>
  )
}
