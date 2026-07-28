// app/(public)/industries/construction-trades/page.tsx
import type { Metadata } from 'next';
import { Button } from '@/components/ui/Button';
import { SectionLabel } from '@/components/ui/SectionLabel';
export const metadata: Metadata = {
  title: 'Web Design for Construction & Trades Businesses',
  description: 'Conversion-focused websites for contractors, builders, renovators, and installers. Built around how homeowners actually choose a contractor.',
};
const W: React.CSSProperties = { maxWidth: '1280px', margin: '0 auto', padding: '0 var(--space-5)' };
const failures = ['Photo galleries with no project scope or challenge context','No visible licensing, insurance, or experience signals','Quote requests buried behind a generic contact form','No clear service-area information'];
const trust = ['Visible licensing and insurance information','Real project photos with scope context','Defined service area','Structured quote-request path that mirrors how clients brief a job'];
export default function ConstructionTradesPage() {
  return (
    <main>
      <section style={{ padding: 'var(--space-8) var(--space-5) var(--space-7)' }}>
        <div style={{ ...W, maxWidth: '800px' }}>
          <SectionLabel>Construction & trades</SectionLabel>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', lineHeight: 'var(--leading-tight)', margin: 'var(--space-2) 0 var(--space-4)' }}>
            Websites built for how construction clients decide.
          </h1>
          <p style={{ fontSize: 'var(--text-md)', lineHeight: 'var(--leading-normal)', color: 'var(--color-ink-muted)', marginBottom: 'var(--space-5)' }}>
            Homeowners and commercial clients compare 3–5 contractors before requesting a quote.
            Trust shortens that list fast. A generic website doesn't give them a reason to put you on it.
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
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', marginBottom: 'var(--space-3)' }}>Where most trade websites lose the job</h2>
            <ul style={{ listStyle: 'none' }}>
              {failures.map(f => <li key={f} style={{ fontSize: 'var(--text-sm)', lineHeight: 'var(--leading-normal)', marginBottom: 'var(--space-1)', color: 'var(--color-ink-muted)' }}>— {f}</li>)}
            </ul>
          </div>
          <div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', marginBottom: 'var(--space-3)' }}>What trust-sensitive buyers need to see</h2>
            <ul style={{ listStyle: 'none' }}>
              {trust.map(t => <li key={t} style={{ fontSize: 'var(--text-sm)', lineHeight: 'var(--leading-normal)', marginBottom: 'var(--space-1)', paddingLeft: 'var(--space-2)', borderLeft: '2px solid var(--color-lime)' }}>{t}</li>)}
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
