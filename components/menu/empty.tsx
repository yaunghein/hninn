import { ChefToque } from '@/components/svgs'

type MenuEmptyProps = {
  categoryLabel: string
}

export default function MenuEmpty({ categoryLabel }: MenuEmptyProps) {
  const isAll = categoryLabel.toLowerCase() === 'all'

  return (
    <section
      className="flex min-h-[45dvh] flex-col items-center justify-center gap-4 px-6 py-20 text-center xs:min-h-[55dvh] xs:gap-5 xs:py-28"
      aria-live="polite"
    >
      <ChefToque color="olive" className="size-16 xs:size-20" />
      <p className="text-xs font-bold uppercase leading-[1.6] tracking-[0.02em] text-olive xs:text-sm">
        Still in the kitchen
      </p>
      <h2 className="max-w-md text-2xl font-semibold uppercase leading-none tracking-[-0.02em] text-olive xs:max-w-lg xs:text-4xl xs:tracking-tight">
        {isAll ? 'The table isn’t set yet' : `${categoryLabel}, almost ready`}
      </h2>
      <p className="max-w-80 text-xs leading-[1.39] text-taupe xs:max-w-92 xs:text-sm">
        {isAll
          ? 'Our contemporary Burmese brunch is simmering. Pull up a chair a little later — warm plates are on the way.'
          : `We’re still finishing this part of the menu. Wander through another tab, or come back soon for something bright, bold, and brunch-ready.`}
      </p>
    </section>
  )
}
