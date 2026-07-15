import { type SchemaTypeDefinition } from 'sanity'

import { conceptPage } from './conceptPage'
import { contactPage } from './contactPage'
import { eventsPage } from './eventsPage'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [conceptPage, contactPage, eventsPage],
}
