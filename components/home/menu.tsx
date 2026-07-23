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
    <section className="bg-cream pb-13 xs:pb-24">
      <MenuSlider
        title={title}
        description={description}
        items={items}
        duration={duration}
      />

      <div className="mt-13 flex flex-col items-center justify-center gap-10 px-6 xs:mt-20 xs:flex-row xs:items-end xs:justify-between xs:px-[12.5%]">
        <Button
          label={cta.label}
          href={cta.href}
          color={cta.color}
          hoverColor={cta.hoverColor}
        />
        <p className="hidden max-w-84 text-base leading-[1.39] text-olive xs:block pb-28">
          {description}
        </p>
      </div>
    </section>
  )
}
