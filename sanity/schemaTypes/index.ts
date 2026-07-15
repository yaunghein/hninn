import { type SchemaTypeDefinition } from 'sanity'

import { conceptPage } from './conceptPage'
import { contactPage } from './contactPage'
import { eventsPage } from './eventsPage'
import { galleryPage } from './galleryPage'
import { homePage } from './homePage'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [homePage, conceptPage, contactPage, eventsPage, galleryPage],
}
