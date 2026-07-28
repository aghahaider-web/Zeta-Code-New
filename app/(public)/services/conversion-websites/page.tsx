// app/(public)/services/conversion-websites/page.tsx
// ARCH: Left-aligned hero with animated headline, then included/excluded,
// investment/timeline, and FAQ sections. Matches pattern across all service pages.
import type { Metadata } from 'next';
import Link from 'next/link';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { ServicesHeadline } from '@/components/ui/ServicesHeadline';

export const metadata: Metadata = {
  title: 'Conversion Website Design & Development',
  description: 'Custom websites built around your buyer\'s decision journey. Strategy before screens. Projects from $1,500, typically 2–3 weeks.',
};

const W: React.CSSProperties = { maxWidth: '1280px', margin: '0 auto', padding: '0 var(--space-5)' };

const INCLUDED = [
  'Discovery and messaging strategy',
  'Information architecture and user journey mapping',
  'Custom visual design',
  'Full development build (Next.js, fast and accessible)',
  'Technical and on-page SEO foundations',
  'Booking and/or proposal conversion flow',
  'Launch QA: accessibility, performance, SEO, security',
];

const EXCLUDED = [
  'Ongoing SEO or paid acquisition delivery (see /services/seo)',
  'Post-launch maintenance (see /care-plan)',
  'Payment processing, client portals, or CRM replacement',
];

const FAQS = [
  { q: 'How is this different from a template website?', a: 'Templates start with a layout and fit your content into it. We start with your buyer\'s decision journey and build the structure around that.' },
  { q: 'What if I don\'t have final content ready?', a: 'We can work with a content-readiness plan during discovery, but delivery timelines depend directly on how quickly content and approvals come back.' },
  { q: 'Do you guarantee results?', a: 'No. We don\'t promise guaranteed rankings, leads, or revenue. We build the site to give you the best realistic chance at better enquiries, and we\'re transparent about what\'s proven versus projected.' },
  { q: 'Is $1,500 the final price?', a: 'No — it\'s the starting point. Final investment depends on your specific requirements, confirmed after discovery.' },
];

export default function ConversionWebsitesPage() {
  return (
    <main>
      {/* Hero section — left-aligned intro + copy */}
      <section style={{ padding: 'var(--space-4) var(--space-5) var(--space-7)' }}>
        <div style={{ ...W, maxWidth: '800px', marginBottom: 'var(--space-7)' }}>
          <SectionLabel>Flagship service</SectionLabel>
          <ServicesHeadline />
          <p style={{ fontSize: 'var(--text-md)', lineHeight: 'var(--leading-normal)', color: 'var(--color-ink-muted)', marginBottom: 'var(--space-5)' }}>
            A custom website built around one goal: turning the right visitors into qualified conversations.
            Strategy, structure, and message come before visual design.
          </p>
          <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
            <Link
              href="/book-a-call"
              style={{
                display: 'inline-block',
                background: 'var(--color-lime)',
                color: 'var(--color-ink)',
                padding: 'var(--space-3) var(--space-4)',
                fontSize: 'var(--text-base)',
                fontWeight: 600,
                textDecoration: 'none',
                borderRadius: 'var(--radius-sm)',
                transition: `background var(--duration-fast) var(--ease-standard)`,
              }}
            >
              Book a discovery call
            </Link>
            <Link
              href="/request-a-proposal"
              style={{
                display: 'inline-block',
                background: 'var(--color-white)',
                color: 'var(--color-ink)',
                border: '1px solid var(--color-border)',
                padding: 'var(--space-3) var(--space-4)',
                fontSize: 'var(--text-base)',
                fontWeight: 600,
                textDecoration: 'none',
                borderRadius: 'var(--radius-sm)',
                transition: `all var(--duration-fast) var(--ease-standard)`,
              }}
            >
              Request a proposal
            </Link>
          </div>
        </div>
      </section>

      {/* Included/Excluded section */}
      <section style={{ background: 'var(--color-white)', padding: 'var(--space-6) var(--space-5)' }}>
        <div style={{ ...W, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-6)' }}>
          <div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', marginBottom: 'var(--space-3)' }}>What\'s included</h2>
            <ul style={{ listStyle: 'none' }}>
              {INCLUDED.map(i => (
                <li key={i} style={{ fontSize: 'var(--text-sm)', lineHeight: 'var(--leading-normal)', marginBottom: 'var(--space-2)', paddingLeft: 'var(--space-3)', borderLeft: '2px solid var(--color-lime)' }}>
                  {i}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', marginBottom: 'var(--space-3)' }}>What\'s not included</h2>
            <ul style={{ listStyle: 'none' }}>
              {EXCLUDED.map(i => (
                <li key={i} style={{ fontSize: 'var(--text-sm)', lineHeight: 'var(--leading-normal)', marginBottom: 'var(--space-2)', color: 'var(--color-ink-muted)' }}>
                  {i}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Investment & timeline */}
      <section style={{ padding: 'var(--space-6) var(--space-5)' }}>
        <div style={{ ...W, maxWidth: '720px' }}>
          <SectionLabel>Investment & timeline</SectionLabel>
          <p style={{ fontSize: 'var(--text-base)', lineHeight: 'var(--leading-normal)', color: 'var(--color-ink-muted)' }}>
            Custom website projects start from $1,500. Focused projects typically launch in 2–3 weeks.
            Final scope, investment, and schedule are confirmed after discovery.
            Timelines depend on scope, timely content, and timely approval.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ background: 'var(--color-white)', padding: 'var(--space-6) var(--space-5)' }}>
        <div style={{ ...W, maxWidth: '720px' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', marginBottom: 'var(--space-4)' }}>Common questions</h2>
          {FAQS.map(f => (
            <details key={f.q} style={{ borderTop: '1px solid var(--color-border)', padding: 'var(--space-3) 0' }}>
              <summary style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 'var(--text-base)', cursor: 'pointer', listStyle: 'none', minHeight: '44px', display: 'flex', alignItems: 'center' }}>
                {f.q}
              </summary>
              <p style={{ fontSize: 'var(--text-sm)', lineHeight: 'var(--leading-normal)', color: 'var(--color-ink-muted)', marginTop: 'var(--space-2)' }}>
                {f.a}
              </p>
            </details>
          ))}
        </div>
      </section>
    </main>
  );
}
