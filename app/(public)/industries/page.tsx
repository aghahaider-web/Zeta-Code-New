// app/(public)/industries/page.tsx — Industries index with hero section.
// ARCH: Hero intro + substantive copy explaining the target verticals, then
// the industry grid below. Left-aligned (matching homepage/services hero).
// H1 uses ServicesHeadline component with line-by-line GSAP animation.
import type { Metadata } from 'next';
import Link from 'next/link';
import type { Route } from 'next';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { ServicesHeadline } from '@/components/ui/ServicesHeadline';

export const metadata: Metadata = {
  title: 'Industries',
  description: 'Service businesses we build for: construction and trades, property and interiors, health and clinics, gyms, law firms, and ambitious small businesses.',
};

const W: React.CSSProperties = { maxWidth: '1280px', margin: '0 auto', padding: '0 var(--space-5)' };

const INDUSTRIES = [
  {
    area: 'const',
    title: 'Construction & Trades',
    desc: 'Contractors, builders, renovators, and installers who need to win trust before they win the quote. Your website is your first sales meeting — it needs to establish credibility, showcase quality, and make the next step clear.',
    href: '/industries/construction-trades',
  },
  {
    area: 'prop',
    title: 'Property & Interiors',
    desc: 'Real estate agents, architects, and interior design firms whose website should reflect the standard of their work. Visual communication matters, but only when paired with a clear value proposition and a path to the consultation.',
    href: '/industries/property-interiors',
  },
  {
    area: 'health',
    title: 'Health & Clinics',
    desc: 'Clinics, wellness practices, and appointment-driven health businesses where trust and booking simplicity decide the conversion. Patients need reassurance before they commit — your site is where that reassurance starts.',
    href: '/industries/health-clinics',
  },
  {
    area: 'gyms',
    title: 'Gyms & Fitness',
    desc: 'Fitness studios, personal training businesses, and wellness centers competing on experience and results. A strong web presence turns membership interest into sign-ups and creates a first impression that carries through to the gym floor.',
    href: '/industries/gyms',
  },
  {
    area: 'law',
    title: 'Law Firms & Legal Services',
    desc: 'Law practices and legal service providers where prospect trust is earned through clarity, expertise, and transparent communication. Your site needs to explain complex services simply and prove you\'re the right choice.',
    href: '/industries/law-firms',
  },
  {
    area: 'small',
    title: 'Small Businesses & Professional Services',
    desc: 'Ambitious small business owners and service professionals who compete against larger players. A well-built website levels the playing field by showcasing your unique value, building personal connection, and converting serious prospects.',
    href: '/industries/small-business',
  },
];

export default function IndustriesPage() {
  return (
    <main>
      {/* Hero section — left-aligned intro + copy */}
      <section style={{ padding: 'var(--space-4) var(--space-5) var(--space-7)' }}>
        <div style={{ ...W, maxWidth: '800px', marginBottom: 'var(--space-7)' }}>
          <SectionLabel>Who we build for</SectionLabel>
          <ServicesHeadline />
          <p style={{ fontSize: 'var(--text-md)', lineHeight: 'var(--leading-normal)', color: 'var(--color-ink-muted)', marginBottom: 'var(--space-5)' }}>
            We work with service businesses that compete on trust, expertise, and the quality of their work — not commodity pricing.
          </p>
          <p style={{ fontSize: 'var(--text-base)', lineHeight: 'var(--leading-normal)', color: 'var(--color-ink-muted)' }}>
            Whether you're in construction, property, health, fitness, professional services, or running an ambitious small business, your website needs to do more than list what you do. 
            It needs to earn trust, explain why you're different, and guide serious prospects toward conversation. 
            We've built dozens of sites across these verticals, and we understand the specific trust-building and conversion challenges each one faces.
          </p>
        </div>
      </section>

      {/* Industries grid */}
      <section style={{ padding: 'var(--space-6) var(--space-5)' }}>
        <div style={W}>
          <div
            className="industries-grid"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: 'var(--space-4)' }}
          >
            {INDUSTRIES.map((ind) => (
              <Link
                key={ind.href}
                href={ind.href as Route}
                className="industries-card group"
                style={{
                  display: 'block',
                  border: '1px solid var(--color-border)',
                  background: 'var(--color-white)',
                  padding: 'var(--space-5)',
                  textDecoration: 'none',
                  color: 'inherit',
                  transition: `border-color var(--duration-fast) var(--ease-standard)`,
                }}
              >
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', marginBottom: 'var(--space-2)' }}>
                  {ind.title}
                </h2>
                <p style={{ fontSize: 'var(--text-base)', lineHeight: 'var(--leading-normal)', color: 'var(--color-ink-muted)', marginBottom: 'var(--space-3)' }}>
                  {ind.desc}
                </p>
                <span style={{ fontSize: 'var(--text-xs)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  Explore industry →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
