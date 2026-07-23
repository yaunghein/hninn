import { BasketIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

import { imageFieldDescription } from './fields'
import { seoField } from './seoType'

export const menuPage = defineType({
  name: 'menuPage',
  title: 'Menu Page',
  type: 'document',
  icon: BasketIcon,
  fields: [
    seoField,
    defineField({
      name: 'categories',
      title: 'Menu categories',
      description:
        'Each category becomes a tab. The All tab on the site combines every category’s items.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'menuCategory',
          fields: [
            defineField({
              name: 'name',
              title: 'Category name',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'items',
              title: 'Menu items',
              description:
                'Optional. Leave empty to show the coming-soon state for this category.',
              type: 'array',
              of: [
                defineArrayMember({
                  type: 'object',
                  name: 'menuItem',
                  fields: [
                    defineField({
                      name: 'name',
                      title: 'Name',
                      type: 'string',
                      validation: (rule) => rule.required(),
                    }),
                    defineField({
                      name: 'description',
                      title: 'Description',
                      description: 'Optional. Hidden on the site when empty.',
                      type: 'text',
                      rows: 3,
                    }),
                    defineField({
                      name: 'price',
                      title: 'Price',
                      description:
                        'Optional. e.g. “380 THB”. Hidden on the site when empty.',
                      type: 'string',
                    }),
                    defineField({
                      name: 'image',
                      title: 'Image',
                      description: imageFieldDescription,
                      type: 'image',
                      options: { hotspot: true },
                      fields: [
                        defineField({
                          name: 'caption',
                          title: 'Caption',
                          type: 'string',
                        }),
                      ],
                    }),
                  ],
                  preview: {
                    select: {
                      title: 'name',
                      subtitle: 'price',
                      media: 'image',
                    },
                  },
                }),
              ],
            }),
          ],
          preview: {
            select: {
              title: 'name',
              items: 'items',
            },
            prepare({ title, items }) {
              const count = Array.isArray(items) ? items.length : 0
              return {
                title: title || 'Untitled category',
                subtitle: `${count} item${count === 1 ? '' : 's'}`,
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
      return { title: 'Menu Page' }
    },
  },
})
