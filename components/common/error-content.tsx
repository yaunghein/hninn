import type { ReactNode } from 'react'

import { KitchenAlert } from '@/components/svgs'

type ErrorContentProps = {
  actions: ReactNode
}

/** Shared 500 / runtime error empty state — mirrors menu empty + 404 layout. */
export default function ErrorContent({ actions }: ErrorContentProps) {
  return (
    <section
      className="flex min-h-[45dvh] flex-col items-center justify-center gap-4 bg-cream px-6 py-20 text-center xs:min-h-[55dvh] xs:gap-5 xs:py-28"
      aria-labelledby="error-heading"
    >
      <KitchenAlert color="olive" className="size-16 xs:size-20" />
      <p className="text-xs font-bold uppercase leading-[1.6] tracking-[0.02em] text-olive xs:text-sm">
        Something went wrong
      </p>
      <h1
        id="error-heading"
        className="max-w-md text-2xl font-semibold uppercase leading-none tracking-[-0.02em] text-olive xs:max-w-lg xs:text-4xl xs:tracking-tight"
      >
        The wok got a little too hot
      </h1>
      <p className="max-w-80 text-xs leading-[1.39] text-taupe xs:max-w-92 xs:text-sm">
        We hit an unexpected kitchen mishap. Give it another try, or head home
        while we cool things down.
      </p>
      <div className="mt-1 flex flex-col items-center gap-3 xs:flex-row xs:gap-5">
        {actions}
      </div>
    </section>
  )
}
