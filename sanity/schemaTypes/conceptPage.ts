import { HeartIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

import { altImageFields, imageFieldDescription } from './fields'
import { seoField } from './seoType'

const storyBlockFields = [
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
    rows: 3,
    validation: (rule) => rule.required(),
  }),
  defineField({
    name: 'width',
    title: 'Body width (rem)',
    type: 'number',
    description: 'Unitless rem value, e.g. 18.3125 → 18.3125rem',
    validation: (rule) => rule.required().positive(),
  }),
]

const storyParagraphFields = [
  defineField({
    name: 'body',
    title: 'Body',
    type: 'text',
    rows: 4,
    validation: (rule) => rule.required(),
  }),
  defineField({
    name: 'width',
    title: 'Body width (rem)',
    type: 'number',
    description: 'Optional unitless rem value. Leave empty for full width.',
    validation: (rule) => rule.positive(),
  }),
]

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
            defineField({
              name: 'contentType',
              title: 'Content type',
              type: 'string',
              options: {
                list: [
                  { title: 'Titled blocks', value: 'blocks' },
                  { title: 'Quote paragraphs', value: 'paragraphs' },
                ],
                layout: 'radio',
              },
              initialValue: 'blocks',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'blocks',
              title: 'Blocks',
              type: 'array',
              hidden: ({ parent }) => parent?.contentType !== 'blocks',
              of: [
                defineArrayMember({
                  type: 'object',
                  fields: storyBlockFields,
                  preview: {
                    select: { title: 'title', subtitle: 'body' },
                  },
                }),
              ],
              validation: (rule) =>
                rule.custom((value, context) => {
                  const parent = context.parent as { contentType?: string }
                  if (parent?.contentType !== 'blocks') return true
                  if (!value?.length) return 'Add at least one block'
                  return true
                }),
            }),
            defineField({
              name: 'paragraphs',
              title: 'Paragraphs',
              type: 'array',
              hidden: ({ parent }) => parent?.contentType !== 'paragraphs',
              of: [
                defineArrayMember({
                  type: 'object',
                  fields: storyParagraphFields,
                  preview: {
                    select: { title: 'body' },
                  },
                }),
              ],
              validation: (rule) =>
                rule.custom((value, context) => {
                  const parent = context.parent as { contentType?: string }
                  if (parent?.contentType !== 'paragraphs') return true
                  if (!value?.length) return 'Add at least one paragraph'
                  return true
                }),
            }),
          ],
          preview: {
            select: {
              title: 'title',
              tone: 'tone',
              media: 'image',
            },
            prepare({ title, tone, media }) {
              return {
                title: title?.replace(/\n/g, ' ') || 'Story section',
                subtitle: tone ? `Tone: ${tone}` : undefined,
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
      return { title: 'Concept Page' }
    },
  },
})
