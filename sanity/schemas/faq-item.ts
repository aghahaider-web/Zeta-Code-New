// sanity/schemas/faq-item.ts
import { defineType, defineField } from 'sanity';
export default defineType({
  name: 'faqItem', title: 'FAQ Item', type: 'document',
  fields: [
    defineField({ name: 'question', type: 'string', validation: r => r.required() }),
    defineField({ name: 'answer', type: 'array', of: [{ type: 'block' }] }),
    defineField({ name: 'relatedService', type: 'string' }),
  ],
});
