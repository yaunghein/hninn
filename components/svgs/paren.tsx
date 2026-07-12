import { textColorClass, type Color } from '@/lib/constants/colors'
import { cn } from '@/lib/utils/cn'

type ParenProps = {
  side: 'left' | 'right'
  color?: Color
  className?: string
}

/** Pill-end bracket matching the Figma button caps */
export default function Paren({
  side,
  color = 'sand',
  className,
}: ParenProps) {
  return (
    <svg
      viewBox="0 0 46 45"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(textColorClass[color], 'size-11.5 shrink-0', className)}
      aria-hidden
    >
      <path
        d={
          side === 'left'
            ? 'M40 1.5H22.5C11.2 1.5 2 10.7 2 22.5S11.2 43.5 22.5 43.5H40'
            : 'M6 1.5H23.5C34.8 1.5 44 10.7 44 22.5S34.8 43.5 23.5 43.5H6'
        }
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
