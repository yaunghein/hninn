import { bgColorClass, type Color } from '@/lib/constants/colors'
import { cn } from '@/lib/utils/cn'

/** Enough strips for tall sections; overflow is clipped. */
const PATTERN_ROWS = 80

type PatternBackdropProps = {
  color?: Color
}

/**
 * Tiled brand motif. Stacks one-tile masked strips so color stays dynamic and
 * the full height fills reliably (CSS mask-repeat on a single layer is flaky
 * for this SVG). The SVG asset is shared — keeps ISR HTML small.
 */
export default function PatternBackdrop({
  color = 'olive-dark',
}: PatternBackdropProps) {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
    >
      <div className="flex w-[250%] translate-x-[-4%] -translate-y-4 flex-col opacity-20 xs:w-[110%]">
        {Array.from({ length: PATTERN_ROWS }, (_, index) => (
          <div
            key={index}
            className={cn(
              'aspect-[26.67/1] w-full shrink-0',
              bgColorClass[color],
            )}
            style={{
              WebkitMaskImage: 'url(/images/pattern.svg)',
              maskImage: 'url(/images/pattern.svg)',
              WebkitMaskSize: '100% 100%',
              maskSize: '100% 100%',
              WebkitMaskRepeat: 'no-repeat',
              maskRepeat: 'no-repeat',
            }}
          />
        ))}
      </div>
    </div>
  )
}
