import Link from 'next/link'
import type { MouseEventHandler } from 'react'

import { Paren } from '@/components/svgs'
import {
  groupHoverTextColorClass,
  hoverBgColorClass,
  textColorClass,
  type Color,
} from '@/lib/constants/colors'
import { cn } from '@/lib/utils/cn'

type ButtonBaseProps = {
  label: string
  /** Shapes, rest text, and hover background */
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
    'group inline-flex w-fit items-center rounded-full transition-all duration-300',
    hoverBgColorClass[color],
    className,
  )

  const content = (
    <>
      <Paren
        side="left"
        color={color}
        className="transition-transform duration-300 group-hover:opacity-0"
      />
      <span
        className={cn(
          'px-6 text-base font-bold uppercase leading-[1.6] tracking-[0.02em] transition-all duration-300 group-hover:px-3',
          textColorClass[color],
          groupHoverTextColorClass[hoverColor],
        )}
      >
        {label}
      </span>
      <Paren
        side="right"
        color={color}
        className="transition-transform duration-300 group-hover:opacity-0"
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
