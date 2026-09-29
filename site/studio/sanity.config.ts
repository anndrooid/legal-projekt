import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {DocumentTextIcon, UsersIcon} from '@sanity/icons'
import {schemaTypes} from './src/schemaTypes'

// Identyfikator projektu nie jest tajny — domyślne wartości pozwalają działać bez pliku .env
const projectId = process.env.SANITY_STUDIO_PROJECT_ID || 'oxgkyhdv'
const dataset = process.env.SANITY_STUDIO_DATASET || 'production'

export default defineConfig({
  name: 'zmw-legal',
  title: 'ZMW Legal',
  projectId,
  dataset,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Treści')
          .items([
            S.listItem()
              .title('Zespół')
              .icon(UsersIcon)
              .child(
                S.documentTypeList('person')
                  .title('Zespół')
                  .defaultOrdering([{field: 'order', direction: 'asc'}]),
              ),
            S.listItem()
              .title('Aktualności')
              .icon(DocumentTextIcon)
              .child(
                S.documentTypeList('article')
                  .title('Aktualności')
                  .defaultOrdering([{field: 'publishedAt', direction: 'desc'}]),
              ),
          ]),
    }),
  ],
  schema: {types: schemaTypes},
})
