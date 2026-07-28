// app/(public)/services/paid-acquisition/page.tsx
import type { Metadata } from 'next';
import { Button } from '@/components/ui/Button';
import { SectionLabel } from '@/components/ui/SectionLabel';
export const metadata: Metadata = {
  title: 'Paid Acquisition for Service Businesses',
  description: 'Managed paid search and social campaigns for service businesses, delivered through vetted specialist partners.',
};
const W: React.CSSProperties = { maxWidth: '1280px', margin: '0 auto', padding: '0 var(--space-5)' };
export default function PaidAcquisitionPage() {
  return (
    <main>
      <section style={{ padding: 'var(--space-8) var(--space-5) var(--space-7)' }}>
        <div style={{ ...W, maxWidth: '800px' }}>
          <SectionLabel>Managed paid acquisition</SectionLabel>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', lineHeight: 'var(--leading-tight)', margin: 'var(--space-2) 0 var(--space-4)' }}>
            Paid acquisition managed end-to-end.
          </h1>
          <p style={{ fontSize: 'var(--text-md)', lineHeight: 'var(--leading-normal)', color: 'var(--color-ink-muted)', marginBottom: 'var(--space-4)' }}>
            Paid traffic sent to a weak page wastes budget. This service pairs acquisition with a
            site already built to convert — strategy, creative direction, and transparent reporting.
          </p>
          <div style={{ background: 'var(--color-lime)', padding: 'var(--space-3)', borderRadius: '4px', marginBottom: 'var(--space-5)', display: 'flex', gap: 'var(--space-2)', alignItems: 'flex-start' }}>
            <span aria-hidden="true" style={{ fontWeight: 700 }}>Partner disclosure:</span>
            <p style={{ fontSize: 'var(--text-sm)', lineHeight: 'var(--leading-normal)', color: 'var(--color-ink)', margin: 0 }}>
              ZetaCode owns strategy, quality control, reporting, and client communication.
              Campaign execution is delivered by vetted specialist partners. This is not performed
              in-house, and we don't represent it as such.
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
