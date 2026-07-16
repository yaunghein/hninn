import { type SchemaTypeDefinition } from 'sanity'

import { conceptPage } from './conceptPage'
import { contactPage } from './contactPage'
import { eventsPage } from './eventsPage'
import { footer } from './footer'
import { galleryPage } from './galleryPage'
import { homePage } from './homePage'
import { navbar } from './navbar'
import { seoType } from './seoType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    seoType,
    navbar,
    footer,
    homePage,
    conceptPage,
    contactPage,
    eventsPage,
    galleryPage,
  ],
}
