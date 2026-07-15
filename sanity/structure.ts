import { CommentIcon, HeartIcon } from '@sanity/icons'
import type { StructureResolver } from 'sanity/structure'

const singletonTypes = new Set(['conceptPage', 'contactPage'])

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
        .title('Contact Page')
        .id('contactPage')
        .icon(CommentIcon)
        .child(S.document().schemaType('contactPage').documentId('contactPage')),
      ...S.documentTypeListItems().filter(
        (item) => !singletonTypes.has(item.getId() ?? ''),
      ),
    ])
