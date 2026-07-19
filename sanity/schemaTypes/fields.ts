import { defineField } from 'sanity'

import { colorTokens } from '@/lib/constants/colors'

/** Brand colors editors can pick for slide chrome (not utility tokens). */
const brandColorLabels = [
  { title: 'Cream', value: 'cream' },
  { title: 'Sand', value: 'sand' },
  { title: 'Olive', value: 'olive' },
  { title: 'Olive light', value: 'olive-light' },
  { title: 'Olive dark', value: 'olive-dark' },
  { title: 'Peach', value: 'peach' },
  { title: 'Peach light', value: 'peach-light' },
  { title: 'Brown', value: 'brown' },
  { title: 'Brown muted', value: 'brown-muted' },
  { title: 'Taupe', value: 'taupe' },
  { title: 'White', value: 'white' },
  { title: 'Black', value: 'black' },
] as const satisfies ReadonlyArray<{
  title: string
  value: keyof typeof colorTokens
}>

export const brandColorOptions = brandColorLabels.map(({ title, value }) => ({
  title: `${title} (${colorTokens[value]})`,
  value,
}))

export function linkHrefField(description?: string) {
  return defineField({
    name: 'href',
    title: 'Link',
    type: 'string',
    description:
      description ??
      'Internal: path starting with / (e.g. /gallery). External: http(s)://… or www.…',
    validation: (rule) => rule.required(),
  })
}

export function ctaFields() {
  return [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    linkHrefField(),
  ]
}

/** Shown on image fields to nudge editors toward smaller uploads. */
export const imageFieldDescription =
  'Prefer .webp for smaller files. You can convert images at https://towebp.io/'

export function altImageFields() {
  return [
    defineField({
      name: 'alt',
      title: 'Alternative text',
      type: 'string',
      validation: (rule) =>
        rule.required().warning('Alt text is important for accessibility'),
    }),
  ]
}
