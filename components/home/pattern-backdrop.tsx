import { Pattern } from '@/components/svgs'
import type { Color } from '@/lib/constants/colors'

const PATTERN_ROWS = 150

type PatternBackdropProps = {
  color?: Color
}

export default function PatternBackdrop({
  color = 'olive-dark',
}: PatternBackdropProps) {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
    >
      <div className="flex w-[250%] xs:w-[110%] translate-x-[-4%] -translate-y-4 flex-col">
        {Array.from({ length: PATTERN_ROWS }, (_, index) => (
          <Pattern key={index} color={color} opacity={0.2} />
        ))}
      </div>
    </div>
  )
}
