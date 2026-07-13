import Image from 'next/image'

import { Button } from '@/components/common'
import type { HomeFindUsContent } from '@/types/home'

type HomeFindUsProps = HomeFindUsContent

export default function HomeFindUs({ title, map, cta }: HomeFindUsProps) {
  return (
    <section className="grid bg-brown-muted xs:grid-cols-2">
      <div className="relative w-full xs:aspect-1/1.23">
        <Image
          src={map.src}
          alt={map.alt}
          fill
          sizes="(max-width: 479px) 100vw, 50vw"
          className="object-cover object-bottom"
        />
      </div>

      <div className="flex flex-col items-center justify-center gap-8 px-6 py-10 xs:gap-30 xs:py-24">
        <h2 className="max-w-92 text-center text-3xl font-semibold uppercase leading-none tracking-[-0.02em] text-peach-light xs:text-5xl xs:leading-[1.15] xs:tracking-tight">
          {title}
        </h2>
        <Button
          label={cta.label}
          href={cta.href}
          color={cta.color}
          hoverColor={cta.hoverColor}
        />
      </div>
    </section>
  )
}
