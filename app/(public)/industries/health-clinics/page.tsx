// app/(public)/industries/health-clinics/page.tsx
import type { Metadata } from 'next';
import { Button } from '@/components/ui/Button';
import { SectionLabel } from '@/components/ui/SectionLabel';
export const metadata: Metadata = {
  title: 'Web Design for Clinics & Health Businesses',
  description: 'Conversion-focused, appointment-ready websites for clinics and health/wellness businesses.',
};
const W: React.CSSProperties = { maxWidth: '1280px', margin: '0 auto', padding: '0 var(--space-5)' };
const failures = ['Booking buried behind phone-only contact','No visible practitioner credentials or clinic information','Generic medical stock imagery that reduces perceived authenticity','Unclear treatment or service descriptions'];
const trust = ['Visible practitioner credentials upfront','Clear treatment descriptions','Transparent appointment process','Fast, accessible booking path — no patient health data collected via public forms'];
export default function HealthClinicsPage() {
  return (
    <main>
      <section style={{ padding: 'var(--space-8) var(--space-5) var(--space-7)' }}>
        <div style={{ ...W, maxWidth: '800px' }}>
          <SectionLabel>Health & clinics</SectionLabel>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', lineHeight: 'var(--leading-tight)', margin: 'var(--space-2) 0 var(--space-4)' }}>
            Websites that make booking simple and credibility immediate.
          </h1>
          <p style={{ fontSize: 'var(--text-md)', lineHeight: 'var(--leading-normal)', color: 'var(--color-ink-muted)', marginBottom: 'var(--space-5)' }}>
            Patients search, check credibility, and look for an easy way to book — often all in a single
            session. Health decisions carry higher trust sensitivity than most categories.
            A weak or confusing website sends them to the next result.
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
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', marginBottom: 'var(--space-3)' }}>What health-sector buyers need</h2>
            <ul style={{ listStyle: 'none' }}>
              {trust.map(t => <li key={t} style={{ fontSize: 'var(--text-sm)', lineHeight: 'var(--leading-normal)', marginBottom: 'var(--space-1)', paddingLeft: 'var(--space-2)', borderLeft: '2px solid var(--color-lime)' }}>{t}</li>)}
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
