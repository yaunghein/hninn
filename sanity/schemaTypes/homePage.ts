import { HomeIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

import {
  altImageFields,
  brandColorOptions,
  ctaFields,
  imageFieldDescription,
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
    { name: 'hero', title: 'Hero' },
    { name: 'facts', title: 'General facts' },
    { name: 'menu', title: 'Menu' },
    { name: 'findUs', title: 'Find us' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      group: 'seo',
      options: {
        collapsible: true,
        collapsed: false,
      },
    }),
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
                  description: imageFieldDescription,
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
                colorField('text', 'Text color'),
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
                  description: imageFieldDescription,
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
                  description: imageFieldDescription,
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
          description:
            'Autoplay interval between steps. Desktop: one menu per step. Mobile: one image per step (tab progress fills across that menu’s images).',
          type: 'number',
          initialValue: 3000,
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
                  name: 'images',
                  title: 'Images',
                  type: 'array',
                  of: [
                    defineArrayMember({
                      type: 'object',
                      fields: [
                        defineField({
                          name: 'image',
                          title: 'Image',
                          type: 'image',
                          description: imageFieldDescription,
                          options: { hotspot: true },
                          validation: (rule) => rule.required(),
                        }),
                        defineField({
                          name: 'caption',
                          title: 'Caption',
                          type: 'string',
                          description:
                            'Used as image alt text on the site (not shown as visible UI).',
                          validation: (rule) =>
                            rule
                              .required()
                              .warning(
                                'Caption is used as alt text for accessibility',
                              ),
                        }),
                        defineField({
                          name: 'size',
                          title: 'Size',
                          type: 'string',
                          description:
                            'Desktop layout only. Normal = 1 column, Wide = 2 columns. Aim for ~4 columns total per menu.',
                          options: {
                            list: [
                              { title: 'Normal', value: 'normal' },
                              { title: 'Wide', value: 'wide' },
                            ],
                            layout: 'radio',
                          },
                          initialValue: 'normal',
                        }),
                      ],
                      preview: {
                        select: {
                          title: 'caption',
                          media: 'image',
                          size: 'size',
                        },
                        prepare({ title, media, size }) {
                          const label = size === 'wide' ? 'Wide' : 'Normal'
                          return {
                            title: title || 'Image',
                            subtitle: label,
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
                select: {
                  title: 'name',
                  media: 'images.0.image',
                  legacyMedia: 'image',
                  // Preview select often won't pass a real array for `images`;
                  // count via item keys instead.
                  i0: 'images.0._key',
                  i1: 'images.1._key',
                  i2: 'images.2._key',
                  i3: 'images.3._key',
                  i4: 'images.4._key',
                  i5: 'images.5._key',
                  i6: 'images.6._key',
                  i7: 'images.7._key',
                  i8: 'images.8._key',
                  i9: 'images.9._key',
                  i10: 'images.10._key',
                  i11: 'images.11._key',
                },
                prepare({ title, media, legacyMedia, ...rest }) {
                  const count = Object.entries(rest).filter(
                    ([key, value]) => /^i\d+$/.test(key) && Boolean(value),
                  ).length

                  return {
                    title: title || 'Untitled',
                    subtitle:
                      count > 0
                        ? `${count} image${count === 1 ? '' : 's'}`
                        : legacyMedia
                          ? 'Add images (legacy photo only)'
                          : '0 images',
                    media: media || legacyMedia,
                  }
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
          title: 'Map image (Deprecated)',
          type: 'image',
          description:
            'No longer used — the site embeds Google Maps instead. Safe to clear.',
          deprecated: {
            reason: 'Replaced by an embedded Google Map on the site.',
          },
          readOnly: true,
          hidden: ({ value }) => value === undefined,
          initialValue: undefined,
          options: { hotspot: true },
          fields: altImageFields(),
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
