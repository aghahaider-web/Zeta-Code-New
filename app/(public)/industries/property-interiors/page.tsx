// app/(public)/industries/property-interiors/page.tsx
import type { Metadata } from 'next';
import { Button } from '@/components/ui/Button';
import { SectionLabel } from '@/components/ui/SectionLabel';
export const metadata: Metadata = {
  title: 'Web Design for Property & Interior Firms',
  description: 'Conversion-focused websites for real estate, architecture, and interior design firms. Portfolio-led, credibility-first.',
};
const W: React.CSSProperties = { maxWidth: '1280px', margin: '0 auto', padding: '0 var(--space-5)' };
const failures = ['Portfolio work shown without process or scope context','No distinction between service tiers','Weak first-contact path — unclear what happens next','Design that doesn\'t reflect the firm\'s actual aesthetic standard'];
const trust = ['Real project documentation, not stock imagery','Clear process explanation and service tiers','Credentials and relevant experience visible early','Responsive initial-consult booking path'];
export default function PropertyInteriorsPage() {
  return (
    <main>
      <section style={{ padding: 'var(--space-8) var(--space-5) var(--space-7)' }}>
        <div style={{ ...W, maxWidth: '800px' }}>
          <SectionLabel>Property & interiors</SectionLabel>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', lineHeight: 'var(--leading-tight)', margin: 'var(--space-2) 0 var(--space-4)' }}>
            Websites that reflect the standard of your work.
          </h1>
          <p style={{ fontSize: 'var(--text-md)', lineHeight: 'var(--leading-normal)', color: 'var(--color-ink-muted)', marginBottom: 'var(--space-5)' }}>
            Clients making high-value, emotionally significant decisions need to see taste,
            capability, and process clarity before they commit. A generic site reads as low-credibility —
            and that's the shortlist you won't make.
          </p>
          <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
            <Button href="/book-a-call">Book a discovery call</Button>
            <Button href="/request-a-proposal" variant="secondary">Request a proposal</Button>
          </div>
        </div>
      </section>
      <section style={{ background: 'var(--color-white)', padding: 'var(--space-6) var(--space-5)' }}>
        <div style={{ ...W, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-6)' }}>
          <div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', marginBottom: 'var(--space-3)' }}>Common failures in this sector</h2>
            <ul style={{ listStyle: 'none' }}>
              {failures.map(f => <li key={f} style={{ fontSize: 'var(--text-sm)', lineHeight: 'var(--leading-normal)', marginBottom: 'var(--space-1)', color: 'var(--color-ink-muted)' }}>— {f}</li>)}
            </ul>
          </div>
          <div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', marginBottom: 'var(--space-3)' }}>What these buyers need</h2>
            <ul style={{ listStyle: 'none' }}>
              {trust.map(t => <li key={t} style={{ fontSize: 'var(--text-sm)', lineHeight: 'var(--leading-normal)', marginBottom: 'var(--space-1)', paddingLeft: 'var(--space-2)', borderLeft: '2px solid var(--color-lime)' }}>{t}</li>)}
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
