import { CommentIcon } from '@sanity/icons'
import type { StructureResolver } from 'sanity/structure'

const singletonTypes = new Set(['contactPage'])

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Contact Page')
        .id('contactPage')
        .icon(CommentIcon)
        .child(S.document().schemaType('contactPage').documentId('contactPage')),
      ...S.documentTypeListItems().filter(
        (item) => !singletonTypes.has(item.getId() ?? ''),
      ),
    ])
