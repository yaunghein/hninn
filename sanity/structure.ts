import {
  CommentIcon,
  ConfettiIcon,
  HeartIcon,
  ImagesIcon,
} from '@sanity/icons'
import type { StructureResolver } from 'sanity/structure'

const singletonTypes = new Set([
  'conceptPage',
  'contactPage',
  'eventsPage',
  'galleryPage',
])

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Concept Page')
        .id('conceptPage')
        .icon(HeartIcon)
        .child(S.document().schemaType('conceptPage').documentId('conceptPage')),
      S.listItem()
        .title('Events Page')
        .id('eventsPage')
        .icon(ConfettiIcon)
        .child(S.document().schemaType('eventsPage').documentId('eventsPage')),
      S.listItem()
        .title('Gallery Page')
        .id('galleryPage')
        .icon(ImagesIcon)
        .child(S.document().schemaType('galleryPage').documentId('galleryPage')),
      S.listItem()
        .title('Contact Page')
        .id('contactPage')
        .icon(CommentIcon)
        .child(S.document().schemaType('contactPage').documentId('contactPage')),
      ...S.documentTypeListItems().filter(
        (item) => !singletonTypes.has(item.getId() ?? ''),
      ),
    ])
