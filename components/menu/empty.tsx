import { ChefToque } from '@/components/svgs'

type MenuEmptyProps = {
  categoryLabel: string
}

export default function MenuEmpty({ categoryLabel }: MenuEmptyProps) {
  const isAll = categoryLabel.toLowerCase() === 'all'

  return (
    <section
      className="flex min-h-[55dvh] flex-col items-center justify-center gap-5 px-6 py-28 text-center xs:min-h-[65dvh] xs:gap-6 xs:py-36"
      aria-live="polite"
    >
      <ChefToque color="olive" className="size-24 xs:size-28" />
      <p className="text-sm font-bold uppercase leading-[1.6] tracking-[0.02em] text-olive xs:text-base">
        Still in the kitchen
      </p>
      <h2 className="max-w-lg text-3xl font-semibold uppercase leading-none tracking-[-0.02em] text-olive xs:text-5xl xs:tracking-tight">
        {isAll ? 'The table isn’t set yet' : `${categoryLabel}, almost ready`}
      </h2>
      <p className="max-w-92 text-sm leading-[1.39] text-taupe xs:max-w-md xs:text-base">
        {isAll
          ? 'Our contemporary Burmese brunch is simmering. Pull up a chair a little later — warm plates are on the way.'
          : `We’re still finishing this part of the menu. Wander through another tab, or come back soon for something bright, bold, and brunch-ready.`}
      </p>
    </section>
  )
}
