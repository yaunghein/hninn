import { type SchemaTypeDefinition } from 'sanity'

import { conceptPage } from './conceptPage'
import { contactPage } from './contactPage'
import { eventsPage } from './eventsPage'
import { galleryPage } from './galleryPage'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [conceptPage, contactPage, eventsPage, galleryPage],
}
