// app/(public)/care-plan/page.tsx
import type { Metadata } from 'next';
import { Button } from '@/components/ui/Button';
import { SectionLabel } from '@/components/ui/SectionLabel';
export const metadata: Metadata = {
  title: 'Website Care Plan',
  description: 'Ongoing technical reliability and conversion improvement after launch.',
};
const W: React.CSSProperties = { maxWidth: '1280px', margin: '0 auto', padding: '0 var(--space-5)' };
export default function CarePlanPage() {
  return (
    <main>
      <section style={{ padding: 'var(--space-8) var(--space-5) var(--space-7)' }}>
        <div style={{ ...W, maxWidth: '800px' }}>
          <SectionLabel>Optional ongoing support</SectionLabel>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', lineHeight: 'var(--leading-tight)', margin: 'var(--space-2) 0 var(--space-4)' }}>
            Launch is the start, not the finish line.
          </h1>
          <p style={{ fontSize: 'var(--text-md)', lineHeight: 'var(--leading-normal)', color: 'var(--color-ink-muted)', marginBottom: 'var(--space-4)' }}>
            Websites decay — content goes stale, dependencies age, conversion paths get overlooked
            as the business changes. The care plan catches this before it costs enquiries.
          </p>
          <ul style={{ listStyle: 'none', marginBottom: 'var(--space-5)' }}>
            {['Technical monitoring and updates','Performance and security checks','Conversion review and improvement recommendations','Priority response for fixes'].map(i => (
              <li key={i} style={{ fontSize: 'var(--text-sm)', lineHeight: 'var(--leading-normal)', marginBottom: 'var(--space-1)', paddingLeft: 'var(--space-2)', borderLeft: '2px solid var(--color-lime)' }}>{i}</li>
            ))}
          </ul>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-olive)', marginBottom: 'var(--space-4)' }}>
            The care plan is optional — for ZetaCode website clients only. Investment confirmed at proposal stage.
          </p>
          <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
            <Button href="/book-a-call">Book a discovery call</Button>
            <Button href="/request-a-proposal" variant="secondary">Request a proposal</Button>
          </div>
        </div>
      </section>
    </main>
  );
}
