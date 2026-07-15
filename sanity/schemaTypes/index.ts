import { type SchemaTypeDefinition } from 'sanity'

import { conceptPage } from './conceptPage'
import { contactPage } from './contactPage'
import { eventsPage } from './eventsPage'
import { galleryPage } from './galleryPage'
import { homePage } from './homePage'
import { seoType } from './seoType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [seoType, homePage, conceptPage, contactPage, eventsPage, galleryPage],
}
