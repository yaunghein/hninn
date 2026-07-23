import { bgColorClass, type Color } from '@/lib/constants/colors'
import { cn } from '@/lib/utils/cn'

/** Motif viewBox 1440×54 */
const PATTERN_ASPECT = 54 / 1440

const TILE_SIZE = `100cqw calc(100cqw * ${PATTERN_ASPECT})`

type PatternBackdropProps = {
  color?: Color
  /** Classes for the tiled layer (size / offset). Must oversize past the clip. */
  className?: string
}

/**
 * Single-layer tiled brand motif. Tile size is locked to container width via
 * `cqw` so mask-repeat has an explicit height. The layer is oversized (not
 * `inset-0` + translate) so offsets never leave empty edges inside the clip.
 */
export default function PatternBackdrop({
  color = 'olive-dark',
  className,
}: PatternBackdropProps) {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
    >
      <div
        className={cn(
          '@container absolute opacity-20',
          className ??
            '-top-4 left-[-4%] h-[calc(100%+2rem)] w-[250%] xs:left-0 xs:w-[110%]',
        )}
      >
        <div
          className={cn('size-full', bgColorClass[color])}
          style={{
            WebkitMaskImage: 'url(/images/pattern.svg)',
            maskImage: 'url(/images/pattern.svg)',
            WebkitMaskRepeat: 'repeat',
            maskRepeat: 'repeat',
            WebkitMaskSize: TILE_SIZE,
            maskSize: TILE_SIZE,
          }}
        />
      </div>
    </div>
  )
}
