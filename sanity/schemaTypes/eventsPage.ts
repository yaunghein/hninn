import { ConfettiIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

import { seoField } from './seoType'

function linkHrefField(description?: string) {
  return defineField({
    name: 'href',
    title: 'Link',
    type: 'string',
    description:
      description ??
      'Internal: path starting with / (e.g. /contact). External: http(s)://… or www.…',
    validation: (rule) => rule.required(),
  })
}

export const eventsPage = defineType({
  name: 'eventsPage',
  title: 'Events Page',
  type: 'document',
  icon: ConfettiIcon,
  fields: [
    seoField,
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'cta',
      title: 'CTA',
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
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'images',
      title: 'Gallery images',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'alt',
              title: 'Alternative text',
              type: 'string',
              validation: (rule) =>
                rule.required().warning('Alt text is important for accessibility'),
            }),
          ],
        }),
      ],
      validation: (rule) => rule.required().min(1),
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Events Page' }
    },
  },
})
