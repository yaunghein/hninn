import { CommentIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

import { imageFieldDescription } from './fields'
import { seoField } from './seoType'

function linkHrefField(description?: string) {
  return defineField({
    name: 'href',
    title: 'Link',
    type: 'string',
    description:
      description ??
      'Internal: path starting with / (e.g. /reservation). External: http(s)://… or www.…',
    validation: (rule) => rule.required(),
  })
}

export const contactPage = defineType({
  name: 'contactPage',
  title: 'Contact Page',
  type: 'document',
  icon: CommentIcon,
  fields: [
    seoField,
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'bookCta',
      title: 'Book CTA',
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
      name: 'contacts',
      title: 'Contact Links',
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
            linkHrefField(
              'Internal path (/…), external URL (http(s)://… or www.…), or tel:/mailto:',
            ),
          ],
          preview: {
            select: { title: 'label', subtitle: 'href' },
          },
        }),
      ],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'social',
      title: 'Social Links',
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
      name: 'hours',
      title: 'Hours',
      type: 'object',
      fields: [
        defineField({
          name: 'open',
          title: 'Open hours',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'closed',
          title: 'Closed note',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'directionsCta',
          title: 'Directions CTA',
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
          name: 'map',
          title: 'Map image',
          type: 'image',
          description: imageFieldDescription,
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
          validation: (rule) => rule.required(),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Contact Page' }
    },
  },
})
