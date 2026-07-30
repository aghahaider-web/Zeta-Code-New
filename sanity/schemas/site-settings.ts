// sanity/schemas/site-settings.ts
import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'siteTitle',
      type: 'string',
    }),
    defineField({
      name: 'defaultMetaDescription',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'ogImage',
      type: 'image',
    }),
    defineField({
      name: 'proposalResponsePromise',
      type: 'string',
      initialValue: 'one business day',
      description: 'Used in confirmation copy. Do not change without reviewing all confirmation emails.',
    }),
  ],
  __experimental_actions: ['update', 'publish'],
});
