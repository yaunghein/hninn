import Image from 'next/image'

import { Button } from '@/components/common'
import type { HomeFindUsContent } from '@/types/home'

type HomeFindUsProps = HomeFindUsContent

export default function HomeFindUs({ title, map, cta }: HomeFindUsProps) {
  return (
    <section className="grid bg-brown-muted md:grid-cols-2">
      <div className="relative aspect-[1/1.23] w-full">
        <Image
          src={map.src}
          alt={map.alt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover object-bottom"
        />
      </div>

      <div className="flex flex-col items-center justify-center gap-30 px-6 py-24">
        <h2 className="max-w-92 text-center text-5xl font-semibold uppercase leading-[1.15] tracking-tight text-peach-light">
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
