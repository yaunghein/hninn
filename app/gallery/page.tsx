import { GalleryCanvas, GalleryTabs } from '@/components/gallery'
import type { GalleryTab } from '@/components/gallery'
import type { GalleryMediaItem, InfiniteCanvasConfig } from '@/types/gallery'

const tabs: GalleryTab[] = [
  { id: 'all', label: 'All' },
  { id: 'event', label: 'Event' },
  { id: 'interior', label: 'Interior' },
  { id: 'dishes', label: 'Dishes' },
  { id: 'pets', label: 'Pets' },
]

/** Portrait gallery photos from /public/images (maps excluded). */
const galleryImages: GalleryMediaItem[] = [
  {
    url: '/images/home_slider_1.jpg',
    width: 1440,
    height: 1712,
    category: 'event',
    alt: 'Hninn dining room',
  },
  {
    url: '/images/home_good_food_1.jpg',
    width: 1232,
    height: 1648,
    category: 'dishes',
    alt: 'Hninn dish plated with fresh herbs',
  },
  {
    url: '/images/home_good_food_2.jpg',
    width: 1232,
    height: 1648,
    category: 'dishes',
    alt: 'Hninn brunch spread',
  },
  {
    url: '/images/home_good_food_3.jpg',
    width: 1232,
    height: 1648,
    category: 'dishes',
    alt: 'Close-up of a Hninn specialty dish',
  },
  {
    url: '/images/home_good_food_4.jpg',
    width: 1232,
    height: 1648,
    category: 'dishes',
    alt: 'Hninn tea and food pairing',
  },
  {
    url: '/images/home_menu_1.png',
    width: 1380,
    height: 1018,
    category: 'dishes',
    alt: 'Hninn dish with tea service',
  },
  {
    url: '/images/home_menu_2.png',
    width: 1378,
    height: 1018,
    category: 'dishes',
    alt: 'Hninn plated dish',
  },
  {
    url: '/images/home_amazing_space_1.jpg',
    width: 1232,
    height: 1648,
    category: 'interior',
    alt: 'Hninn dining room interior',
  },
  {
    url: '/images/home_amazing_space_2.jpg',
    width: 1232,
    height: 1648,
    category: 'interior',
    alt: 'Hninn seating and ambiance',
  },
  {
    url: '/images/home_amazing_space_3.jpg',
    width: 1232,
    height: 1648,
    category: 'interior',
    alt: 'Hninn cafe space detail',
  },
  {
    url: '/images/home_amazing_space_4.jpg',
    width: 1232,
    height: 1648,
    category: 'interior',
    alt: 'Hninn restaurant atmosphere',
  },
  {
    url: '/images/home_paws_included_1.jpg',
    width: 1232,
    height: 1648,
    category: 'pets',
    alt: 'Dog-friendly moment at Hninn',
  },
  {
    url: '/images/home_paws_included_2.jpg',
    width: 1232,
    height: 1648,
    category: 'pets',
    alt: 'Pet visiting Hninn with guests',
  },
  {
    url: '/images/home_paws_included_3.jpg',
    width: 1232,
    height: 1648,
    category: 'pets',
    alt: 'Pet-friendly seating at Hninn',
  },
  {
    url: '/images/home_paws_included_4.jpg',
    width: 1232,
    height: 1648,
    category: 'pets',
    alt: 'Welcome for pets at Hninn',
  },
]

/** Override any default from `lib/gallery/canvas-config.ts`. */
const canvasConfig: Partial<InfiniteCanvasConfig> = {
  backgroundColor: '#fcf2dc',
  fogColor: '#fcf2dc',
  showControls: false,
  showFps: false,
  chunkSize: 180,
  itemsPerChunk: 8,
  planeSizeMin: 38,
  planeSizeRange: 32,
  initialCameraZ: 42,
}

export default function GalleryPage() {
  return (
    <div className="flex min-h-dvh flex-col bg-cream">
      <GalleryTabs tabs={tabs} />
      <div className="relative min-h-[calc(100dvh-2.75rem)] flex-1">
        <GalleryCanvas images={galleryImages} config={canvasConfig} />
      </div>
    </div>
  )
}
