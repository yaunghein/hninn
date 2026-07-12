import Image from 'next/image'

type FactImageProps = {
  src: string
  alt: string
}

export default function FactImage({ src, alt }: FactImageProps) {
  return (
    <div className="relative aspect-0.75/1 overflow-hidden">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, 45vw"
        className="object-cover"
      />
    </div>
  )
}
