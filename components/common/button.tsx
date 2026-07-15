import type { MouseEventHandler } from 'react'

import AppLink from '@/components/common/app-link'
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
    'group relative inline-flex w-fit items-center rounded-full',
    className,
  )

  const content = (
    <>
      <span
        className="pointer-events-none absolute inset-0 overflow-hidden rounded-full"
        aria-hidden
      >
        <span
          className={cn(
            'absolute inset-y-0 left-0 w-[60%] origin-left scale-x-0 rounded-full transition-transform duration-300 ease-out group-hover:scale-x-100',
            bgColorClass[color],
          )}
        />
        <span
          className={cn(
            'absolute inset-y-0 right-0 w-[60%] origin-right scale-x-0 rounded-full transition-transform duration-300 ease-out group-hover:scale-x-100',
            bgColorClass[color],
          )}
        />
      </span>

      <Paren
        side="left"
        color={color}
        className="relative z-10 transition-opacity duration-300 group-hover:opacity-0"
      />
      <span
        className={cn(
          'relative z-10 whitespace-nowrap px-4 text-sm font-bold uppercase leading-[1.6] tracking-[0.02em] transition-colors duration-300 xs:px-6 xs:text-base',
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
      <AppLink href={props.href} onClick={props.onClick} className={classes}>
        {content}
      </AppLink>
    )
  }

  return (
    <button type="button" onClick={props.onClick} className={classes}>
      {content}
    </button>
  )
}
