// sanity/schemas/legal-page.ts
import { defineType, defineField } from 'sanity';
export default defineType({
  name: 'legalPage', title: 'Legal Page', type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: r => r.required() }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'title' }, validation: r => r.required() }),
    defineField({ name: 'body', type: 'array', of: [{ type: 'block' }] }),
    defineField({ name: 'lastReviewed', type: 'date' }),
    defineField({ name: 'internalOwner', type: 'string' }),
  ],
});
