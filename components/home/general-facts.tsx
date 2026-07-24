import { Button } from '@/components/common'
import FactBlock from '@/components/home/fact-block'
import PatternBackdrop from '@/components/home/pattern-backdrop'
import type { GeneralFactsContent } from '@/types/home'

type GeneralFactsProps = GeneralFactsContent

export default function GeneralFacts({ facts, cta }: GeneralFactsProps) {
  return (
    <section className="relative bg-olive">
      <div className="sticky top-0 inset-0 h-dvh">
        <PatternBackdrop color="olive-dark" />
      </div>

      <div className="mt-[-100dvh] py-13 xs:py-24">
        <div className="relative z-10 flex flex-col gap-13 xs:gap-30">
          {facts.map((fact) => (
            <FactBlock key={fact.title} {...fact} />
          ))}
        </div>

        <div className="relative z-10 mt-13 flex justify-center xs:mt-16 pb-16 xs:pb-8">
          <Button
            label={cta.label}
            href={cta.href}
            color={cta.color}
            hoverColor={cta.hoverColor}
          />
        </div>
      </div>
    </section>
  )
}
