import {defineArrayMember, defineField, defineType} from 'sanity'
import {UserIcon} from '@sanity/icons'
import {PRACTICES, TIERS} from '../constants'

/**
 * Profil prawnika — odwzorowanie makiety profil-zawadzka.html
 * oraz karty w siatce nasz-zespol.html.
 */
export default defineType({
  name: 'person',
  title: 'Prawnik',
  type: 'document',
  icon: UserIcon,
  groups: [
    {name: 'basic', title: 'Podstawowe', default: true},
    {name: 'profile', title: 'Profil (akordeony)'},
    {name: 'publications', title: 'Publikacje'},
  ],
  fields: [
    defineField({
      name: 'name',
      title: 'Imię i nazwisko (z tytułem)',
      type: 'string',
      group: 'basic',
      description: 'Np. „Prof. Anna Zawadzka”',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Adres strony',
      type: 'slug',
      group: 'basic',
      description: 'Końcówka adresu: /zespol/…',
      options: {source: 'name', maxLength: 96},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Stanowisko',
      type: 'string',
      group: 'basic',
      description: 'Np. „Managing Partner”, „Senior Associate”',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tier',
      title: 'Grupa w siatce zespołu',
      type: 'string',
      group: 'basic',
      options: {list: TIERS, layout: 'radio', direction: 'horizontal'},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Kolejność',
      type: 'number',
      group: 'basic',
      description: 'Mniejsza liczba = wyżej w siatce zespołu.',
      initialValue: 100,
    }),
    defineField({
      name: 'photo',
      title: 'Zdjęcie',
      type: 'image',
      group: 'basic',
      description: 'Portret pionowy. Ustaw punkt centralny (hotspot) na twarzy.',
      options: {hotspot: true},
    }),
    defineField({
      name: 'practices',
      title: 'Praktyki',
      type: 'array',
      group: 'basic',
      of: [{type: 'string'}],
      options: {list: PRACTICES},
    }),
    defineField({
      name: 'specialization',
      title: 'Specjalizacja (karta w siatce)',
      type: 'string',
      group: 'basic',
      description: 'Np. „Rozwiązywanie Sporów · Prawo korporacyjne”',
    }),
    defineField({
      name: 'tags',
      title: 'Tagi w nagłówku profilu',
      type: 'array',
      group: 'basic',
      of: [{type: 'string'}],
      options: {layout: 'tags'},
    }),
    defineField({
      name: 'lead',
      title: 'Opis w nagłówku profilu',
      type: 'text',
      rows: 3,
      group: 'basic',
    }),
    defineField({name: 'email', title: 'E-mail', type: 'string', group: 'basic'}),
    defineField({
      name: 'phone',
      title: 'Telefon',
      type: 'string',
      group: 'basic',
      initialValue: '+48 22 319 47 60',
    }),
    defineField({name: 'linkedin', title: 'LinkedIn (URL)', type: 'url', group: 'basic'}),

    // --- Akordeony profilu ---
    defineField({
      name: 'bioHeading',
      title: 'Nagłówek sekcji bio',
      type: 'string',
      group: 'profile',
      description: 'Np. „O Profesor Zawadzkiej”',
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'array',
      group: 'profile',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [{title: 'Akapit', value: 'normal'}],
          lists: [],
          marks: {
            decorators: [
              {title: 'Pogrubienie', value: 'strong'},
              {title: 'Kursywa', value: 'em'},
            ],
            annotations: [],
          },
        }),
      ],
    }),
    defineField({
      name: 'experience',
      title: 'Doświadczenie zawodowe',
      type: 'array',
      group: 'profile',
      of: [{type: 'text', rows: 2}],
    }),
    defineField({
      name: 'awards',
      title: 'Wyróżnienia i rankingi',
      type: 'array',
      group: 'profile',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'award',
          fields: [
            defineField({name: 'text', title: 'Wyróżnienie', type: 'string'}),
            defineField({name: 'years', title: 'Lata', type: 'string', description: 'Np. „2024, 2023”'}),
          ],
          preview: {select: {title: 'text', subtitle: 'years'}},
        }),
      ],
    }),
    defineField({
      name: 'otherActivities',
      title: 'Pozostała działalność',
      type: 'array',
      group: 'profile',
      of: [{type: 'text', rows: 2}],
    }),
    defineField({
      name: 'education',
      title: 'Wykształcenie',
      type: 'array',
      group: 'profile',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'educationItem',
          fields: [
            defineField({name: 'degree', title: 'Stopień / tytuł', type: 'string'}),
            defineField({name: 'institution', title: 'Uczelnia / instytucja', type: 'string'}),
            defineField({name: 'note', title: 'Dopisek', type: 'string', description: 'Np. temat pracy, promotor'}),
            defineField({name: 'year', title: 'Rok', type: 'string'}),
          ],
          preview: {select: {title: 'degree', subtitle: 'year'}},
        }),
      ],
    }),
    defineField({
      name: 'languages',
      title: 'Języki',
      type: 'array',
      group: 'profile',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'language',
          fields: [
            defineField({name: 'name', title: 'Język', type: 'string'}),
            defineField({name: 'level', title: 'Poziom (opis)', type: 'string', description: 'Np. „Biegły (C2)”'}),
            defineField({
              name: 'dots',
              title: 'Poziom (kropki 1–5)',
              type: 'number',
              options: {list: [1, 2, 3, 4, 5], layout: 'radio', direction: 'horizontal'},
              initialValue: 3,
            }),
          ],
          preview: {select: {title: 'name', subtitle: 'level'}},
        }),
      ],
    }),

    // --- Publikacje ---
    defineField({
      name: 'publications',
      title: 'Najnowsze publikacje',
      type: 'array',
      group: 'publications',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'publication',
          fields: [
            defineField({name: 'cover', title: 'Okładka', type: 'image'}),
            defineField({name: 'tag', title: 'Rodzaj', type: 'string', description: 'Np. „Monografia”'}),
            defineField({name: 'title', title: 'Tytuł', type: 'string'}),
            defineField({name: 'meta', title: 'Wydawnictwo, miejsce, rok', type: 'string'}),
          ],
          preview: {select: {title: 'title', subtitle: 'meta', media: 'cover'}},
        }),
      ],
    }),
  ],
  orderings: [
    {title: 'Kolejność w zespole', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]},
    {title: 'Nazwisko', name: 'nameAsc', by: [{field: 'name', direction: 'asc'}]},
  ],
  preview: {
    select: {title: 'name', subtitle: 'role', media: 'photo'},
  },
})
