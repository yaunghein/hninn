import { textColorClass, type Color } from '@/app/lib/constants/colors'
import { cn } from '@/app/lib/utils/cn'

type MenuProps = {
  color?: Color
  open?: boolean
  className?: string
}

export default function Menu({
  color = 'olive',
  open = false,
  className,
}: MenuProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(textColorClass[color], 'size-8', className)}
      aria-hidden
    >
      <g
        className={cn(
          'transition-transform duration-300',
          open && '-rotate-45',
        )}
        style={{ transformOrigin: '9.776px 9.777px' }}
      >
        <path
          d="M14.2209 14.2214V9.77696C14.2209 7.32237 12.2311 5.33252 9.77648 5.33252C7.32188 5.33252 5.33203 7.32237 5.33203 9.77696L5.33203 14.2214"
          stroke="currentColor"
          strokeWidth="0.888889"
        />
        <path
          d="M5.33203 9.54305V13.7536V14.2214H14.2209V8.13954L11.9987 5.80036L9.33203 5.33252L6.66536 6.73603L5.33203 9.54305Z"
          fill="currentColor"
          className={cn('transition-opacity duration-300', open && 'opacity-0')}
        />
      </g>
      <g
        className={cn(
          'transition-transform duration-300',
          open && 'rotate-45',
        )}
        style={{ transformOrigin: '22.224px 9.777px' }}
      >
        <path
          d="M26.6682 14.2214V9.77696C26.6682 7.32237 24.6783 5.33252 22.2237 5.33252C19.7691 5.33252 17.7793 7.32237 17.7793 9.77696V14.2214"
          stroke="currentColor"
          strokeWidth="0.888889"
        />
      </g>
      <g
        className={cn(
          'transition-transform duration-300',
          open && '-rotate-135',
        )}
        style={{ transformOrigin: '9.776px 22.223px' }}
      >
        <path
          d="M14.2209 26.6679V22.2235C14.2209 19.7689 12.2311 17.7791 9.77648 17.7791C7.32188 17.7791 5.33203 19.7689 5.33203 22.2235L5.33203 26.6679"
          stroke="currentColor"
          strokeWidth="0.888889"
        />
      </g>
      <g
        className={cn(
          'transition-transform duration-300',
          open && 'rotate-135',
        )}
        style={{ transformOrigin: '22.224px 22.223px' }}
      >
        <path
          d="M26.6682 26.6679V22.2235C26.6682 19.7689 24.6783 17.7791 22.2237 17.7791C19.7691 17.7791 17.7793 19.7689 17.7793 22.2235V26.6679"
          stroke="currentColor"
          strokeWidth="0.888889"
        />
      </g>
    </svg>
  )
}
