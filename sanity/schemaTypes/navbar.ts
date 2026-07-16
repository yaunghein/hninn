import { MenuIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

import { ctaFields, linkHrefField } from './fields'

export const navbar = defineType({
  name: 'navbar',
  title: 'Navbar',
  type: 'document',
  icon: MenuIcon,
  fields: [
    defineField({
      name: 'hours',
      title: 'Hours',
      type: 'object',
      fields: [
        defineField({
          name: 'line1',
          title: 'Line 1',
          type: 'string',
          description: 'e.g. Open 7:00 - 23:00',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'line2',
          title: 'Line 2',
          type: 'string',
          description: 'e.g. closed on wed',
          validation: (rule) => rule.required(),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'gallery',
      title: 'Gallery CTA',
      type: 'object',
      fields: ctaFields(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'reservation',
      title: 'Reservation CTA',
      type: 'object',
      fields: ctaFields(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'menuLinks',
      title: 'Menu links',
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
      return { title: 'Navbar' }
    },
  },
})
