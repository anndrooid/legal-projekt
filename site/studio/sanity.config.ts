import {defineConfig} from 'sanity'
import {structureTool, type StructureBuilder} from 'sanity/structure'
import {documentInternationalization} from '@sanity/document-internationalization'
import {DocumentTextIcon, UsersIcon} from '@sanity/icons'
import {schemaTypes} from './src/schemaTypes'
import {LANGUAGES} from './src/schemaTypes/constants'

// Identyfikator projektu nie jest tajny — domyślne wartości pozwalają działać bez pliku .env
const projectId = process.env.SANITY_STUDIO_PROJECT_ID || 'oxgkyhdv'
const dataset = process.env.SANITY_STUDIO_DATASET || 'production'

const TRANSLATED_TYPES = ['person', 'article']

// Lista dokumentów danego typu w jednym języku; „+” tworzy dokument od razu w tym języku
const languageList = (
  S: StructureBuilder,
  type: string,
  lang: {id: string; title: string},
  title: string,
  ordering: {field: string; direction: 'asc' | 'desc'},
) =>
  S.listItem()
    .title(`${title} (${lang.id.toUpperCase()})`)
    .schemaType(type)
    .child(
      S.documentList()
        .title(`${title} – ${lang.title}`)
        .schemaType(type)
        .filter('_type == $type && language == $lang')
        .params({type, lang: lang.id})
        .defaultOrdering([ordering])
        .initialValueTemplates([S.initialValueTemplateItem(`${type}-parameterized`, {languageId: lang.id})]),
    )

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
                S.list()
                  .title('Zespół')
                  .items(LANGUAGES.map((l) => languageList(S, 'person', l, 'Zespół', {field: 'order', direction: 'asc'}))),
              ),
            S.listItem()
              .title('Aktualności')
              .icon(DocumentTextIcon)
              .child(
                S.list()
                  .title('Aktualności')
                  .items(
                    LANGUAGES.map((l) =>
                      languageList(S, 'article', l, 'Aktualności', {field: 'publishedAt', direction: 'desc'}),
                    ),
                  ),
              ),
          ]),
    }),
    documentInternationalization({
      supportedLanguages: LANGUAGES,
      schemaTypes: TRANSLATED_TYPES,
    }),
  ],
  schema: {
    types: schemaTypes,
    // Nowe dokumenty tworzymy tylko z list językowych (z ustawionym językiem)
    templates: (prev) => prev.filter((t) => !TRANSLATED_TYPES.includes(t.id)),
  },
})
