import MenuSlider from '@/components/home/menu-slider'
import type { HomeMenuContent } from '@/types/home'

type HomeMenuProps = HomeMenuContent

export default function HomeMenu({
  title,
  description,
  items,
  duration,
  cta,
}: HomeMenuProps) {
  return (
    <section className="bg-cream py-20 xs:pt-0 xs:pb-24">
      <MenuSlider
        title={title}
        description={description}
        items={items}
        duration={duration}
        cta={cta}
      />
    </section>
  )
}
