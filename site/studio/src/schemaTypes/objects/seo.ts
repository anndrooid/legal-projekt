import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  fields: [
    defineField({
      name: 'metaTitle',
      title: 'Tytuł w Google',
      type: 'string',
      description: 'Zastępuje tytuł w wynikach wyszukiwania i karcie przeglądarki. Zalecane: 50–60 znaków.',
      validation: (Rule) => Rule.max(60).warning('Dłuższe tytuły mogą zostać ucięte w Google.'),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Opis w Google',
      type: 'text',
      rows: 3,
      description: 'Zastępuje zajawkę w wynikach wyszukiwania i przy udostępnianiu. Zalecane: 120–160 znaków.',
      validation: (Rule) => Rule.max(160).warning('Dłuższe opisy mogą zostać ucięte w Google.'),
    }),
    defineField({
      name: 'ogImage',
      title: 'Obraz przy udostępnianiu',
      type: 'image',
      description: 'Zastępuje zdjęcie główne przy udostępnianiu (np. LinkedIn). Zalecane: 1200×630 px.',
      options: {hotspot: true},
    }),
  ],
  options: {collapsible: true, collapsed: true},
})
