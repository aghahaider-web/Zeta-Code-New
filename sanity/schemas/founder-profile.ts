// sanity/schemas/founder-profile.ts
import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'founderProfile',
  title: 'Founder Profile',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      validation: r => r.required(),
    }),
    defineField({
      name: 'portrait',
      type: 'image',
      description: 'Real founder portrait only — no stock photos.',
    }),
    defineField({
      name: 'bio',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Principles and working approach. Not self-promotional.',
    }),
    defineField({
      name: 'portraitPermission',
      type: 'boolean',
      initialValue: false,
    }),
  ],
});
