import ContentPanel from '@/app/components/home/content-panel'
import ImageSlider from '@/app/components/home/image-slider'
import type { HomeHeroContent } from '@/app/types/home'

type HomeHeroProps = HomeHeroContent

export default function HomeHero({
  title,
  description,
  slides,
  duration,
}: HomeHeroProps) {
  return (
    <section className="grid h-dvh grid-cols-2 overflow-hidden">
      <ImageSlider slides={slides} duration={duration} />
      <ContentPanel title={title} description={description} slides={slides} />
    </section>
  )
}
