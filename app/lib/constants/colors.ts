export const colors = [
  'cream',
  'sand',
  'olive',
  'olive-light',
  'olive-dark',
  'peach',
  'peach-light',
  'brown',
  'brown-muted',
  'white',
  'black',
  'transparent',
  'current',
] as const

export type Color = (typeof colors)[number]

/** Statically analyzable so Tailwind emits the utilities */
export const textColorClass = {
  cream: 'text-cream',
  sand: 'text-sand',
  olive: 'text-olive',
  'olive-light': 'text-olive-light',
  'olive-dark': 'text-olive-dark',
  peach: 'text-peach',
  'peach-light': 'text-peach-light',
  brown: 'text-brown',
  'brown-muted': 'text-brown-muted',
  white: 'text-white',
  black: 'text-black',
  transparent: 'text-transparent',
  current: 'text-current',
} as const satisfies Record<Color, string>

export const bgColorClass = {
  cream: 'bg-cream',
  sand: 'bg-sand',
  olive: 'bg-olive',
  'olive-light': 'bg-olive-light',
  'olive-dark': 'bg-olive-dark',
  peach: 'bg-peach',
  'peach-light': 'bg-peach-light',
  brown: 'bg-brown',
  'brown-muted': 'bg-brown-muted',
  white: 'bg-white',
  black: 'bg-black',
  transparent: 'bg-transparent',
  current: 'bg-current',
} as const satisfies Record<Color, string>

export const hoverBgColorClass = {
  cream: 'hover:bg-cream',
  sand: 'hover:bg-sand',
  olive: 'hover:bg-olive',
  'olive-light': 'hover:bg-olive-light',
  'olive-dark': 'hover:bg-olive-dark',
  peach: 'hover:bg-peach',
  'peach-light': 'hover:bg-peach-light',
  brown: 'hover:bg-brown',
  'brown-muted': 'hover:bg-brown-muted',
  white: 'hover:bg-white',
  black: 'hover:bg-black',
  transparent: 'hover:bg-transparent',
  current: 'hover:bg-current',
} as const satisfies Record<Color, string>

export const groupHoverTextColorClass = {
  cream: 'group-hover:text-cream',
  sand: 'group-hover:text-sand',
  olive: 'group-hover:text-olive',
  'olive-light': 'group-hover:text-olive-light',
  'olive-dark': 'group-hover:text-olive-dark',
  peach: 'group-hover:text-peach',
  'peach-light': 'group-hover:text-peach-light',
  brown: 'group-hover:text-brown',
  'brown-muted': 'group-hover:text-brown-muted',
  white: 'group-hover:text-white',
  black: 'group-hover:text-black',
  transparent: 'group-hover:text-transparent',
  current: 'group-hover:text-current',
} as const satisfies Record<Color, string>
