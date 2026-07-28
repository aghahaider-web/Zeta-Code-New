// sanity/schemas/case-study.ts — Section 5.2 mini case study template
import { defineType, defineField } from 'sanity';
export default defineType({
  name: 'caseStudy', title: 'Case Study', type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: r => r.required() }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'title' }, validation: r => r.required() }),
    defineField({ name: 'clientIndustry', type: 'string' }),
    defineField({ name: 'projectType', type: 'string' }),
    defineField({ name: 'summary', type: 'text', rows: 3 }),
    defineField({ name: 'challenge', type: 'text', rows: 3 }),
    defineField({ name: 'strategicResponse', type: 'text', rows: 3 }),
    defineField({ name: 'scope', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'screenshots', type: 'array', of: [{ type: 'image' }] }),
    defineField({ name: 'outcome', type: 'text', rows: 3,
      description: 'Only include verified, client-approved outcomes. Leave blank if not shareable — use scope/approach framing instead.' }),
    defineField({ name: 'clientPermissionGranted', type: 'boolean', initialValue: false }),
    defineField({ name: 'logoPermissionGranted', type: 'boolean', initialValue: false }),
    defineField({ name: 'relatedService', type: 'string' }),
    defineField({ name: 'relatedIndustry', type: 'string' }),
    defineField({ name: 'seoTitle', type: 'string' }),
    defineField({ name: 'metaDescription', type: 'text', rows: 2 }),
    defineField({ name: 'ogImage', type: 'image' }),
    defineField({ name: 'lastReviewed', type: 'date' }),
  ],
});
