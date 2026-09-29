import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {defineDocuments, defineLocations, presentationTool} from 'sanity/presentation'
import {DocumentTextIcon, UsersIcon} from '@sanity/icons'
import {schemaTypes} from './src/schemaTypes'

// Environment variables for project configuration
const projectId = process.env.SANITY_STUDIO_PROJECT_ID || 'your-projectID'
const dataset = process.env.SANITY_STUDIO_DATASET || 'production'

// Presentation Preview URL
const previewUrl = process.env.SANITY_STUDIO_PREVIEW_URL || 'http://localhost:4321'

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
    presentationTool({
      previewUrl,
      resolve: {
        // Adres w podglądzie -> dokument w Studio
        mainDocuments: defineDocuments([
          {
            route: '/zespol/:slug',
            filter: ({params}) => `_type == "person" && slug.current == "${params.slug}"`,
          },
          {
            route: '/aktualnosci/:slug',
            filter: ({params}) => `_type == "article" && slug.current == "${params.slug}"`,
          },
        ]),
        // Dokument w Studio -> adres podglądu
        locations: {
          person: defineLocations({
            select: {title: 'name', slug: 'slug.current'},
            resolve: (doc) => ({
              locations: doc?.slug
                ? [
                    {title: doc.title || 'Profil', href: `/zespol/${doc.slug}`},
                    {title: 'Nasz Zespół', href: '/nasz-zespol'},
                  ]
                : [],
            }),
          }),
          article: defineLocations({
            select: {title: 'title', slug: 'slug.current'},
            resolve: (doc) => ({
              locations: doc?.slug
                ? [
                    {title: doc.title || 'Artykuł', href: `/aktualnosci/${doc.slug}`},
                    {title: 'Aktualności', href: '/aktualnosci'},
                  ]
                : [],
            }),
          }),
        },
      },
    }),
    visionTool(),
  ],
  schema: {types: schemaTypes},
})
