import { Pattern } from '@/components/svgs'
import type { ConceptContent } from '@/types/concept'

type ConceptHeroProps = ConceptContent

export default function ConceptHero({ title, blocks }: ConceptHeroProps) {
  return (
    <section className="flex min-h-dvh flex-col bg-brown pb-40">
      <div className="overflow-hidden py-13" aria-hidden>
        <Pattern color="peach" opacity={0.2} className="w-[175vw]" />
      </div>

      <div className="mx-auto w-full max-w-216.25 px-6 pt-7.5">
        <h1 className="text-center text-5xl font-semibold uppercase leading-none tracking-[-0.02em] text-peach sm:text-7xl md:text-[5.75rem]">
          {title}
        </h1>
      </div>

      <div className="mx-auto mt-24 grid w-full max-w-260 gap-10 px-6 md:mt-28 md:grid-cols-2 md:gap-8">
        {blocks.map((block) => (
          <article key={block.title} className="flex flex-col gap-3 text-cream">
            <h2 className="text-base font-semibold uppercase leading-normal">
              {block.title}
            </h2>
            <p className="text-sm leading-normal">{block.body}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
