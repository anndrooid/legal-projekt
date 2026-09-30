import {defineArrayMember, defineField, defineType} from 'sanity'
import {DocumentTextIcon} from '@sanity/icons'
import {ARTICLE_CATEGORIES, PRACTICES} from '../constants'

/**
 * Artykuł w Aktualnościach — makiety aktualnosci.html (karta) i artykul.html (podstrona).
 */
export default defineType({
  name: 'article',
  title: 'Aktualność',
  type: 'document',
  icon: DocumentTextIcon,
  groups: [
    {name: 'content', title: 'Treść', default: true},
    {name: 'details', title: 'Szczegóły'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({
      // Ustawiane automatycznie przez wtyczkę tłumaczeń (pl / en)
      name: 'language',
      type: 'string',
      readOnly: true,
      hidden: true,
    }),
    defineField({
      name: 'title',
      title: 'Tytuł',
      type: 'string',
      group: 'content',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Adres strony',
      type: 'slug',
      group: 'content',
      description: 'Końcówka adresu: /aktualnosci/…',
      options: {source: 'title', maxLength: 96},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Data publikacji',
      type: 'date',
      group: 'content',
      options: {dateFormat: 'D MMMM YYYY'},
      initialValue: () => new Date().toISOString().slice(0, 10),
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Kategoria',
      type: 'string',
      group: 'content',
      options: {list: ARTICLE_CATEGORIES, layout: 'radio', direction: 'horizontal'},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Zajawka',
      type: 'text',
      rows: 3,
      group: 'content',
      description: 'Krótki opis na liście aktualności i jako wstęp artykułu.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'cover',
      title: 'Zdjęcie główne',
      type: 'image',
      group: 'content',
      description: 'Opcjonalne — bez zdjęcia karta na liście wyświetla się w wersji tekstowej.',
      options: {hotspot: true},
      fields: [defineField({name: 'alt', title: 'Tekst alternatywny', type: 'string'})],
    }),
    defineField({
      name: 'body',
      title: 'Treść artykułu',
      type: 'blockContent',
      group: 'content',
    }),
    defineField({
      name: 'featured',
      title: 'Wyróżniony',
      type: 'boolean',
      group: 'details',
      description: 'Wyświetlany jako duża karta na górze listy. Jeśli wyróżnionych jest kilka, pokazuje się najnowszy.',
      initialValue: false,
    }),
    defineField({
      name: 'source',
      title: 'Źródło',
      type: 'string',
      group: 'details',
      description: 'Np. „Chambers and Partners”',
    }),
    defineField({
      name: 'people',
      title: 'Wyróżnieni / powiązani prawnicy',
      type: 'array',
      group: 'details',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'personMention',
          fields: [
            defineField({name: 'person', title: 'Prawnik', type: 'reference', to: [{type: 'person'}]}),
            defineField({name: 'note', title: 'Dopisek', type: 'string', description: 'Np. „Band 1”'}),
          ],
          preview: {
            select: {title: 'person.name', subtitle: 'note', media: 'person.photo'},
          },
        }),
      ],
    }),
    defineField({
      name: 'practice',
      title: 'Praktyka',
      type: 'string',
      group: 'details',
      options: {list: PRACTICES},
    }),
    defineField({
      name: 'tags',
      title: 'Tagi',
      type: 'array',
      group: 'details',
      of: [{type: 'string'}],
      options: {layout: 'tags'},
    }),
    defineField({name: 'seo', title: 'SEO', type: 'seo', group: 'seo'}),
  ],
  orderings: [
    {title: 'Data publikacji (najnowsze)', name: 'dateDesc', by: [{field: 'publishedAt', direction: 'desc'}]},
  ],
  preview: {
    select: {title: 'title', date: 'publishedAt', category: 'category', media: 'cover', featured: 'featured'},
    prepare: ({title, date, category, media, featured}) => ({
      title: featured ? `★ ${title}` : title,
      subtitle: [category, date].filter(Boolean).join(' · '),
      media,
    }),
  },
})
