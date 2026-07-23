import { textColorClass, type Color } from '@/lib/constants/colors'
import { cn } from '@/lib/utils/cn'

type KitchenAlertProps = {
  color?: Color
  className?: string
}

/** Warning triangle — server / kitchen mishap empty state. */
export default function KitchenAlert({
  color = 'olive',
  className,
}: KitchenAlertProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      className={cn(textColorClass[color], 'size-20', className)}
      aria-hidden
    >
      <path
        d="M12 9v4m0 4h.01M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
