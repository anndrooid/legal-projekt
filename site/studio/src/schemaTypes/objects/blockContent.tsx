import {defineType, defineArrayMember, defineField} from 'sanity'

/**
 * Treść sformatowana artykułu (Aktualności).
 * Style odpowiadają klasom z makiety artykul.html.
 */
export default defineType({
  title: 'Treść',
  name: 'blockContent',
  type: 'array',
  of: [
    defineArrayMember({
      title: 'Akapit',
      type: 'block',
      styles: [
        {title: 'Akapit', value: 'normal'},
        {title: 'Akapit wprowadzający (większy)', value: 'lead'},
        {title: 'Śródtytuł', value: 'h2'},
      ],
      lists: [{title: 'Lista punktowana', value: 'bullet'}],
      marks: {
        decorators: [
          {title: 'Pogrubienie', value: 'strong'},
          {title: 'Kursywa', value: 'em'},
        ],
        annotations: [
          {
            title: 'Link',
            name: 'link',
            type: 'object',
            fields: [{title: 'Adres URL', name: 'href', type: 'url'}],
          },
        ],
      },
    }),
    defineArrayMember({
      name: 'quote',
      title: 'Cytat',
      type: 'object',
      fields: [
        defineField({name: 'text', title: 'Treść cytatu', type: 'text', rows: 3}),
        defineField({name: 'cite', title: 'Źródło', type: 'string'}),
      ],
      preview: {
        select: {title: 'text', subtitle: 'cite'},
        prepare: ({title, subtitle}) => ({title: `„${title}”`, subtitle}),
      },
    }),
    defineArrayMember({
      name: 'image',
      title: 'Obraz',
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({name: 'alt', title: 'Tekst alternatywny', type: 'string'}),
        defineField({name: 'caption', title: 'Podpis', type: 'string'}),
      ],
    }),
  ],
})
