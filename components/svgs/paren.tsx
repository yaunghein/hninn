import { textColorClass, type Color } from '@/lib/constants/colors'
import { cn } from '@/lib/utils/cn'

type ParenProps = {
  side: 'left' | 'right'
  color?: Color
  className?: string
}

/** Pill-end bracket matching the Figma button caps (mobile → desktop) */
export default function Paren({ side, color = 'sand', className }: ParenProps) {
  return (
    <svg
      viewBox="0 0 32.689 35.08"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(
        textColorClass[color],
        'h-8 w-7.75 shrink-0 xs:h-11.25 xs:w-11.5',
        className,
      )}
      aria-hidden
    >
      <path
        d={
          side === 'left'
            ? 'M32.689 1.5H17.54C8.681 1.5 1.5 8.681 1.5 17.54S8.681 33.58 17.54 33.58H32.689'
            : 'M0 33.58H15.149C24.008 33.58 31.189 26.399 31.189 17.54S24.008 1.5 15.149 1.5H0'
        }
        stroke="currentColor"
        strokeWidth="3"
        vectorEffect="non-scaling-stroke"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
