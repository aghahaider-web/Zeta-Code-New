// sanity/schemas/founder-profile.ts
import { defineType, defineField } from 'sanity';
export default defineType({
  name: 'founderProfile', title: 'Founder Profile', type: 'document',
  fields: [
    defineField({ name: 'name', type: 'string', validation: r => r.required() }),
    defineField({ name: 'portrait', type: 'image',
      description: 'Real founder portrait only — no stock photos.' }),
    defineField({ name: 'bio', type: 'array', of: [{ type: 'block' }],
      description: 'Principles and working approach. Not self-promotional.' }),
    defineField({ name: 'portraitPermission', type: 'boolean', initialValue: false }),
  ],
});

// sanity/schemas/faq-item.ts
import { defineType as dT, defineField as dF } from 'sanity';
export default dT({
  name: 'faqItem', title: 'FAQ Item', type: 'document',
  fields: [
    dF({ name: 'question', type: 'string', validation: r => r.required() }),
    dF({ name: 'answer', type: 'array', of: [{ type: 'block' }] }),
    dF({ name: 'relatedService', type: 'string' }),
  ],
});
