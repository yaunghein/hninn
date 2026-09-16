import { HeartIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

import { altImageFields, imageFieldDescription } from './fields'
import { seoField } from './seoType'

export const conceptPage = defineType({
  name: 'conceptPage',
  title: 'About Page',
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
      title: 'Hero content blocks',
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
    defineField({
      name: 'stories',
      title: 'Story sections',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Heading',
              type: 'text',
              rows: 2,
              description: 'Use a line break for multi-line headings.',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'titleWidth',
              title: 'Heading width (rem)',
              type: 'number',
              description: 'Unitless rem value, e.g. 23.5625 → 23.5625rem',
              validation: (rule) => rule.required().positive(),
            }),
            defineField({
              name: 'subtitle',
              title: 'Subtitle',
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
            defineField({
              name: 'quote',
              title: 'Quote',
              type: 'text',
              rows: 3,
              description: 'Optional pull quote shown under the body.',
            }),
            defineField({
              name: 'quoteAttribution',
              title: 'Quote attribution',
              type: 'string',
              hidden: ({ parent }) => !parent?.quote,
            }),
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              description: imageFieldDescription,
              options: { hotspot: true },
              fields: altImageFields(),
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'contentSide',
              title: 'Content side (desktop)',
              type: 'string',
              options: {
                list: [
                  { title: 'Right', value: 'right' },
                  { title: 'Left', value: 'left' },
                ],
                layout: 'radio',
              },
              initialValue: 'right',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'tone',
              title: 'Panel tone',
              type: 'string',
              options: {
                list: [
                  { title: 'Sand', value: 'sand' },
                  { title: 'Peach', value: 'peach' },
                  { title: 'Olive', value: 'olive' },
                ],
                layout: 'radio',
              },
              initialValue: 'sand',
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'subtitle',
              media: 'image',
            },
            prepare({ title, subtitle, media }) {
              return {
                title: title?.replace(/\n/g, ' ') || 'Story section',
                subtitle,
                media,
              }
            },
          },
        }),
      ],
      validation: (rule) => rule.required().min(1),
    }),
  ],
  preview: {
    prepare() {
      return { title: 'About Page' }
    },
  },
})
