import { defineField, defineType } from 'sanity'

export const seoType = defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      description: 'Overrides the page title in search and social previews if set',
      type: 'string',
      validation: (rule) => rule.max(70).warning('Keep under ~60–70 characters'),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      description: 'Meta description for search and social previews',
      type: 'text',
      rows: 3,
      validation: (rule) =>
        rule.max(160).warning('Keep under ~150–160 characters'),
    }),
    defineField({
      name: 'ogImage',
      title: 'Open Graph image',
      description: 'Social sharing image (1200×630 recommended)',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
})

export const seoField = defineField({
  name: 'seo',
  title: 'SEO',
  type: 'seo',
  options: {
    collapsible: true,
    collapsed: true,
  },
})
