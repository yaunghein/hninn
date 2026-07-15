import { ImagesIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

export const galleryPage = defineType({
  name: 'galleryPage',
  title: 'Gallery Page',
  type: 'document',
  icon: ImagesIcon,
  fields: [
    defineField({
      name: 'blocks',
      title: 'Gallery tabs',
      description:
        'Each block becomes a tab. The All tab on the site combines every block’s images.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'galleryBlock',
          fields: [
            defineField({
              name: 'name',
              title: 'Tab name',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'images',
              title: 'Images',
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
                        rule
                          .required()
                          .warning('Alt text is important for accessibility'),
                    }),
                  ],
                  preview: {
                    select: {
                      title: 'alt',
                      media: 'asset',
                    },
                  },
                }),
              ],
              validation: (rule) => rule.required().min(1),
            }),
          ],
          preview: {
            select: {
              title: 'name',
              images: 'images',
            },
            prepare({ title, images }) {
              const count = Array.isArray(images) ? images.length : 0
              return {
                title: title || 'Untitled tab',
                subtitle: `${count} image${count === 1 ? '' : 's'}`,
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
      return { title: 'Gallery Page' }
    },
  },
})
