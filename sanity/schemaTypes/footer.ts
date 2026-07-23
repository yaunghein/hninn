import { EarthGlobeIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

import { linkHrefField } from './fields'

export const footer = defineType({
  name: 'footer',
  title: 'Footer',
  type: 'document',
  icon: EarthGlobeIcon,
  fields: [
    defineField({
      name: 'social',
      title: 'Social links',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            linkHrefField(),
          ],
          preview: {
            select: { title: 'label', subtitle: 'href' },
          },
        }),
      ],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'hours',
      title: 'Hours',
      type: 'text',
      rows: 3,
      description: 'Use a new line for each line of text.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'legal',
      title: 'Legal links',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            linkHrefField(),
          ],
          preview: {
            select: { title: 'label', subtitle: 'href' },
          },
        }),
      ],
      validation: (rule) => rule.required().min(1),
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Footer' }
    },
  },
})
