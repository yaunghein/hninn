import { CommentIcon, ConfettiIcon, HeartIcon } from '@sanity/icons'
import type { StructureResolver } from 'sanity/structure'

const singletonTypes = new Set(['conceptPage', 'contactPage', 'eventsPage'])

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
        .title('Contact Page')
        .id('contactPage')
        .icon(CommentIcon)
        .child(S.document().schemaType('contactPage').documentId('contactPage')),
      ...S.documentTypeListItems().filter(
        (item) => !singletonTypes.has(item.getId() ?? ''),
      ),
    ])
