import { GalleryTabs } from '@/components/gallery'
import type { GalleryTab } from '@/components/gallery'

const tabs: GalleryTab[] = [
  { id: 'all', label: 'All' },
  { id: 'event', label: 'Event' },
  { id: 'interior', label: 'Interior' },
  { id: 'dishes', label: 'Dishes' },
  { id: 'pets', label: 'Pets' },
]

export default function GalleryPage() {
  return (
    <div className="min-h-dvh bg-sand">
      <GalleryTabs tabs={tabs} />
    </div>
  )
}
