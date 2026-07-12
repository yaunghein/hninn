import { Button } from '@/components/common'
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
    <section className="bg-cream pb-24">
      <MenuSlider title={title} items={items} duration={duration} />

      <div className="mt-20 flex px-6">
        <div className="w-1/2 flex items-end justify-center">
          <Button
            label={cta.label}
            href={cta.href}
            color={cta.color}
            hoverColor={cta.hoverColor}
          />
        </div>
        <div className="w-1/2 flex items-center justify-center pb-24">
          <p className="md:mr-46 ml-auto max-w-84 text-base leading-[1.39] text-olive">
            {description}
          </p>
        </div>
      </div>
    </section>
  )
}
