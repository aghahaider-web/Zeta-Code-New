// sanity/schemas/service.ts
import { defineType, defineField } from 'sanity';
export default defineType({
  name: 'service', title: 'Service', type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: r => r.required() }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'title' }, validation: r => r.required() }),
    defineField({ name: 'summary', type: 'text', rows: 3 }),
    defineField({ name: 'body', type: 'array', of: [{ type: 'block' }] }),
    defineField({ name: 'partnerDelivered', type: 'boolean', initialValue: false,
      description: 'If true, partner disclosure section will render on the page.' }),
    defineField({ name: 'seoTitle', type: 'string' }),
    defineField({ name: 'metaDescription', type: 'text', rows: 2 }),
    defineField({ name: 'ogImage', type: 'image' }),
    defineField({ name: 'lastReviewed', type: 'date' }),
    defineField({ name: 'internalOwner', type: 'string' }),
  ],
});
