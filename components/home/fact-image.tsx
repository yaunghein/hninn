import Image from 'next/image'

import { aspectRatioCss } from '@/lib/utils/math'
import type { GeneralFactImage } from '@/types/home'

type FactImageProps = GeneralFactImage

export default function FactImage({ src, alt, aspectRatio }: FactImageProps) {
  return (
    <div
      className="relative overflow-hidden"
      style={{ aspectRatio: aspectRatioCss(aspectRatio) }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 479px) 60vw, 45vw"
        className="object-cover"
      />
    </div>
  )
}
