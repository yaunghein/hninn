import { type SchemaTypeDefinition } from 'sanity'

import { conceptPage } from './conceptPage'
import { contactPage } from './contactPage'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [conceptPage, contactPage],
}
