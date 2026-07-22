import ContentPanel from '@/components/home/content-panel'
import ImageSlider from '@/components/home/image-slider'
import type { HomeHeroContent } from '@/types/home'

type HomeHeroProps = HomeHeroContent

export default function HomeHero({
  title,
  description,
  slides,
  duration,
}: HomeHeroProps) {
  return (
    <section className="flex flex-col overflow-hidden xs:grid xs:h-dvh xs:grid-cols-2">
      <ImageSlider slides={slides} duration={duration} />
      <ContentPanel title={title} description={description} slides={slides} />
    </section>
  )
}
