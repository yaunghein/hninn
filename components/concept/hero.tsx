import { Pattern } from '@/components/svgs'
import type { ConceptContent } from '@/types/concept'

type ConceptHeroProps = ConceptContent

export default function ConceptHero({ title, blocks }: ConceptHeroProps) {
  return (
    <section className="flex xs:min-h-dvh flex-col bg-brown pb-32 xs:pb-40">
      <div className="overflow-hidden py-8 xs:py-13" aria-hidden>
        <Pattern
          color="peach"
          opacity={0.2}
          className="h-21.5 w-auto max-w-none aspect-[26.67/1] xs:h-auto xs:w-[175vw] -translate-x-13.25 xs:translate-x-0"
        />
      </div>

      <div className="mx-auto w-full max-w-216.25 px-6 pt-6 xs:pt-7.5">
        <h1 className="mx-auto max-w-59 text-center text-[2rem] font-semibold uppercase leading-none tracking-[-0.02em] text-peach xs:max-w-none xs:text-[5.75rem]">
          {title}
        </h1>
      </div>

      <div className="mx-auto mt-12 grid w-full max-w-260 gap-6 px-6 xs:mt-28 xs:grid-cols-2 xs:gap-8">
        {blocks.map((block) => (
          <article key={block.title} className="flex flex-col gap-3 text-cream">
            <h2 className="text-base font-semibold uppercase leading-normal">
              {block.title}
            </h2>
            <p className="text-sm leading-normal xs:pr-7">{block.body}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
