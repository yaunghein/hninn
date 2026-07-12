import { Button } from '@/components/common'
import FactBlock from '@/components/home/fact-block'
import PatternBackdrop from '@/components/home/pattern-backdrop'
import type { GeneralFactsContent } from '@/types/home'

type GeneralFactsProps = GeneralFactsContent

export default function GeneralFacts({ facts, cta }: GeneralFactsProps) {
  return (
    <section className="relative overflow-hidden bg-olive pt-24 pb-20">
      <PatternBackdrop color="olive-dark" />

      <div className="relative z-10 flex flex-col gap-30">
        {facts.map((fact) => (
          <FactBlock key={fact.title} {...fact} />
        ))}
      </div>

      <div className="relative z-10 mt-16 flex justify-center">
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
