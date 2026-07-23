import { Button } from '@/components/common'
import { LostMap } from '@/components/svgs'

/** Shared 404 empty state — mirrors the menu empty layout. */
export default function NotFoundContent() {
  return (
    <section
      className="flex min-h-[45dvh] flex-col items-center justify-center gap-4 bg-cream px-6 py-20 text-center xs:min-h-[55dvh] xs:gap-5 xs:py-28"
      aria-labelledby="not-found-heading"
    >
      <LostMap color="olive" className="size-16 xs:size-20" />
      <p className="text-xs font-bold uppercase leading-[1.6] tracking-[0.02em] text-olive xs:text-sm">
        Page not found
      </p>
      <h1
        id="not-found-heading"
        className="max-w-md text-2xl font-semibold uppercase leading-none tracking-[-0.02em] text-olive xs:max-w-lg xs:text-4xl xs:tracking-tight"
      >
        This table isn’t on the floor plan
      </h1>
      <p className="max-w-80 text-xs leading-[1.39] text-taupe xs:max-w-92 xs:text-sm">
        The page you’re looking for may have moved, or never existed. Let’s get
        you back to something bright, bold, and brunch-ready.
      </p>
      <Button
        label="Back home"
        href="/"
        color="olive"
        hoverColor="cream"
        className="mt-1"
      />
    </section>
  )
}
