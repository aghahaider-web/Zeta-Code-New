// app/(public)/services/seo/page.tsx
import type { Metadata } from 'next';
import { Button } from '@/components/ui/Button';
import { SectionLabel } from '@/components/ui/SectionLabel';
export const metadata: Metadata = {
  title: 'SEO for Service Businesses',
  description: 'Technical SEO foundations and managed ongoing SEO for service businesses, delivered through vetted specialist partners.',
};
const W: React.CSSProperties = { maxWidth: '1280px', margin: '0 auto', padding: '0 var(--space-5)' };
export default function SeoPage() {
  return (
    <main>
      <section style={{ padding: 'var(--space-8) var(--space-5) var(--space-7)' }}>
        <div style={{ ...W, maxWidth: '800px' }}>
          <SectionLabel>Managed SEO</SectionLabel>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', lineHeight: 'var(--leading-tight)', margin: 'var(--space-2) 0 var(--space-4)' }}>
            SEO built for qualified organic enquiries.
          </h1>
          <p style={{ fontSize: 'var(--text-md)', lineHeight: 'var(--leading-normal)', color: 'var(--color-ink-muted)', marginBottom: 'var(--space-4)' }}>
            Focused on the searches your actual buyers use — not vanity traffic.
            Qualified visibility built over 6–12 months through useful content and strong technical foundations.
          </p>
          <div style={{ background: 'var(--color-lime)', padding: 'var(--space-3)', borderRadius: '4px', marginBottom: 'var(--space-5)', display: 'flex', gap: 'var(--space-2)', alignItems: 'flex-start' }}>
            <span aria-hidden="true" style={{ fontWeight: 700 }}>Partner disclosure:</span>
            <p style={{ fontSize: 'var(--text-sm)', lineHeight: 'var(--leading-normal)', color: 'var(--color-ink)', margin: 0 }}>
              ZetaCode owns strategy, quality control, reporting, and client communication.
              Ongoing SEO execution is delivered by vetted specialist partners working under ZetaCode's
              direction. This is not performed in-house, and we don't represent it as such.
            </p>
          </div>
          <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
            <Button href="/book-a-call">Book a discovery call</Button>
            <Button href="/request-a-proposal" variant="secondary">Request a proposal</Button>
          </div>
        </div>
      </section>
    </main>
  );
}
