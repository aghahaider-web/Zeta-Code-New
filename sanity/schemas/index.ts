// sanity/schemas/index.ts — Document type registry (Section 8.2)
import service from './service';
import industry from './industry';
import caseStudy from './case-study';
import founderProfile from './founder-profile';
import faqItem from './faq-item';
import siteSettings from './site-settings';
import legalPage from './legal-page';

export const schemaTypes = [
  siteSettings, service, industry, caseStudy,
  founderProfile, faqItem, legalPage,
];
