export const colors = [
  'cream',
  'sand',
  'olive',
  'olive-light',
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
  peach: 'bg-peach',
  'peach-light': 'bg-peach-light',
  brown: 'bg-brown',
  'brown-muted': 'bg-brown-muted',
  white: 'bg-white',
  black: 'bg-black',
  transparent: 'bg-transparent',
  current: 'bg-current',
} as const satisfies Record<Color, string>
