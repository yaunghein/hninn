import { HomeIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

import {
  altImageFields,
  brandColorOptions,
  ctaFields,
} from './fields'

function colorField(name: string, title: string) {
  return defineField({
    name,
    title,
    type: 'string',
    options: {
      list: [...brandColorOptions],
      layout: 'dropdown',
    },
    validation: (rule) => rule.required(),
  })
}

export const homePage = defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  icon: HomeIcon,
  groups: [
    { name: 'hero', title: 'Hero', default: true },
    { name: 'facts', title: 'General facts' },
    { name: 'menu', title: 'Menu' },
    { name: 'findUs', title: 'Find us' },
  ],
  fields: [
    defineField({
      name: 'hero',
      title: 'Hero',
      type: 'object',
      group: 'hero',
      fields: [
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
          rows: 3,
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'duration',
          title: 'Slide duration (ms)',
          type: 'number',
          initialValue: 3000,
          validation: (rule) => rule.required().min(1000),
        }),
        defineField({
          name: 'slides',
          title: 'Slides',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              fields: [
                defineField({
                  name: 'image',
                  title: 'Image',
                  type: 'image',
                  options: { hotspot: true },
                  fields: [
                    defineField({
                      name: 'caption',
                      title: 'Caption',
                      type: 'string',
                      validation: (rule) => rule.required(),
                    }),
                  ],
                  validation: (rule) => rule.required(),
                }),
                colorField('background', 'Background color'),
                colorField('pattern', 'Pattern color'),
                colorField('logo', 'Logo color'),
              ],
              preview: {
                select: {
                  title: 'image.caption',
                  media: 'image',
                },
              },
            }),
          ],
          validation: (rule) => rule.required().min(1),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'generalFacts',
      title: 'General facts',
      type: 'object',
      group: 'facts',
      fields: [
        defineField({
          name: 'facts',
          title: 'Facts',
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
                  name: 'titleLines',
                  title: 'Title lines',
                  description: 'Optional line breaks for the display title',
                  type: 'array',
                  of: [{ type: 'string' }],
                }),
                defineField({
                  name: 'titleAlign',
                  title: 'Title align',
                  type: 'string',
                  options: {
                    list: [
                      { title: 'Left', value: 'left' },
                      { title: 'Right', value: 'right' },
                    ],
                    layout: 'radio',
                  },
                  initialValue: 'left',
                  validation: (rule) => rule.required(),
                }),
                defineField({
                  name: 'offset',
                  title: 'Stagger offset',
                  type: 'string',
                  options: {
                    list: [
                      { title: 'Left column lower', value: 'left' },
                      { title: 'Right column lower', value: 'right' },
                    ],
                    layout: 'radio',
                  },
                  initialValue: 'left',
                  validation: (rule) => rule.required(),
                }),
                defineField({
                  name: 'leftImages',
                  title: 'Left images',
                  type: 'array',
                  of: [
                    defineArrayMember({
                      type: 'image',
                      options: { hotspot: true },
                      fields: altImageFields(),
                    }),
                  ],
                  validation: (rule) => rule.required().min(1),
                }),
                defineField({
                  name: 'rightImages',
                  title: 'Right images',
                  type: 'array',
                  of: [
                    defineArrayMember({
                      type: 'image',
                      options: { hotspot: true },
                      fields: altImageFields(),
                    }),
                  ],
                  validation: (rule) => rule.required().min(1),
                }),
              ],
              preview: {
                select: { title: 'title' },
              },
            }),
          ],
          validation: (rule) => rule.required().min(1),
        }),
        defineField({
          name: 'cta',
          title: 'CTA',
          type: 'object',
          fields: ctaFields(),
          validation: (rule) => rule.required(),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'menu',
      title: 'Menu',
      type: 'object',
      group: 'menu',
      fields: [
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
          rows: 2,
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'duration',
          title: 'Slide duration (ms)',
          type: 'number',
          initialValue: 4000,
          validation: (rule) => rule.required().min(1000),
        }),
        defineField({
          name: 'items',
          title: 'Menu items',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              fields: [
                defineField({
                  name: 'name',
                  title: 'Name',
                  type: 'string',
                  validation: (rule) => rule.required(),
                }),
                defineField({
                  name: 'image',
                  title: 'Image',
                  type: 'image',
                  options: { hotspot: true },
                  fields: altImageFields(),
                  validation: (rule) => rule.required(),
                }),
              ],
              preview: {
                select: {
                  title: 'name',
                  media: 'image',
                },
              },
            }),
          ],
          validation: (rule) => rule.required().min(1),
        }),
        defineField({
          name: 'cta',
          title: 'CTA',
          type: 'object',
          fields: ctaFields(),
          validation: (rule) => rule.required(),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'findUs',
      title: 'Find us',
      type: 'object',
      group: 'findUs',
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'map',
          title: 'Map image',
          type: 'image',
          options: { hotspot: true },
          fields: altImageFields(),
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'cta',
          title: 'CTA',
          type: 'object',
          fields: ctaFields(),
          validation: (rule) => rule.required(),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Home Page' }
    },
  },
})
