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

      <div className="mt-20 flex flex-col items-center gap-10 px-6 md:flex-row md:items-end md:justify-between md:px-[12.5%]">
        <Button
          label={cta.label}
          href={cta.href}
          color={cta.color}
          hoverColor={cta.hoverColor}
        />
        <p className="max-w-84 pb-24 text-base leading-[1.39] text-olive md:pb-0">
          {description}
        </p>
      </div>
    </section>
  )
}
