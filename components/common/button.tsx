import Link from 'next/link'
import type { MouseEventHandler } from 'react'

import { Paren } from '@/components/svgs'
import {
  bgColorClass,
  groupHoverTextColorClass,
  textColorClass,
  type Color,
} from '@/lib/constants/colors'
import { cn } from '@/lib/utils/cn'

type ButtonBaseProps = {
  label: string
  /** Paren + text color; also the hover fill */
  color?: Color
  /** Text color on hover */
  hoverColor?: Color
  className?: string
}

type ButtonAsLink = ButtonBaseProps & {
  href: string
  onClick?: MouseEventHandler<HTMLAnchorElement>
}

type ButtonAsButton = ButtonBaseProps & {
  href?: undefined
  onClick: MouseEventHandler<HTMLButtonElement>
}

export type ButtonProps = ButtonAsLink | ButtonAsButton

function isLinkButton(props: ButtonProps): props is ButtonAsLink {
  return typeof props.href === 'string'
}

export default function Button(props: ButtonProps) {
  const { label, color = 'olive', hoverColor = 'sand', className } = props

  const classes = cn(
    'group relative inline-flex w-fit items-center overflow-hidden rounded-full',
    className,
  )

  const content = (
    <>
      <span
        className={cn(
          'pointer-events-none absolute inset-y-0 left-0 w-[60%] origin-left scale-x-0 rounded-full transition-transform duration-300 ease-out group-hover:scale-x-100',
          bgColorClass[color],
        )}
        aria-hidden
      />
      <span
        className={cn(
          'pointer-events-none absolute inset-y-0 right-0 w-[60%] origin-right scale-x-0 rounded-full transition-transform duration-300 ease-out group-hover:scale-x-100',
          bgColorClass[color],
        )}
        aria-hidden
      />

      <Paren
        side="left"
        color={color}
        className="relative z-10 transition-opacity duration-300 group-hover:opacity-0"
      />
      <span
        className={cn(
          'relative z-10 px-6 text-base font-bold uppercase leading-[1.6] tracking-[0.02em] transition-all duration-300 group-hover:px-6',
          textColorClass[color],
          groupHoverTextColorClass[hoverColor],
        )}
      >
        {label}
      </span>
      <Paren
        side="right"
        color={color}
        className="relative z-10 transition-opacity duration-300 group-hover:opacity-0"
      />
    </>
  )

  if (isLinkButton(props)) {
    return (
      <Link href={props.href} onClick={props.onClick} className={classes}>
        {content}
      </Link>
    )
  }

  return (
    <button type="button" onClick={props.onClick} className={classes}>
      {content}
    </button>
  )
}
