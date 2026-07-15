import { HeartIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

import { seoField } from './seoType'

export const conceptPage = defineType({
  name: 'conceptPage',
  title: 'Concept Page',
  type: 'document',
  icon: HeartIcon,
  fields: [
    seoField,
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'blocks',
      title: 'Content blocks',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'body',
              title: 'Body',
              type: 'text',
              rows: 5,
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: { title: 'title', subtitle: 'body' },
          },
        }),
      ],
      validation: (rule) => rule.required().min(1),
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Concept Page' }
    },
  },
})
