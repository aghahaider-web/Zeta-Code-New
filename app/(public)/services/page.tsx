// app/(public)/services/page.tsx — Services index with hero section.
// ARCH: Hero intro + substantive copy explaining the ecosystem, then the
// 2x2 bento card grid below. Text is left-aligned (matching homepage hero).
// H1 uses ServicesHeadline component with line-by-line GSAP animation.
import type { Metadata } from 'next';
import Link from 'next/link';
import type { Route } from 'next';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { ServicesHeadline } from '@/components/ui/ServicesHeadline';

export const metadata: Metadata = {
  title: 'Services',
  description: 'A complete digital ecosystem for service businesses. Strategy, design, traffic, and long-term care.',
};

const W: React.CSSProperties = { maxWidth: '1280px', margin: '0 auto', padding: '0 var(--space-5)' };

const SERVICES = [
  {
    area: 'conv',
    title: 'Conversion Websites',
    desc: 'Editorial, strategy-first websites designed to clarify your value and capture demand.',
    href: '/services/conversion-websites',
  },
  {
    area: 'seo',
    title: 'SEO Management',
    desc: 'Technical and content-led search strategy for long-term organic traffic. Delivered by vetted specialist partners.',
    href: '/services/seo',
  },
  {
    area: 'paid',
    title: 'Paid Acquisition',
    desc: 'Direct-response campaigns across Search and Social to drive immediate pipeline. Managed by vetted partners.',
    href: '/services/paid-acquisition',
  },
  {
    area: 'care',
    title: 'Care Plan',
    desc: 'Post-launch technical reliability, security updates, and conversion improvements.',
    href: '/care-plan',
  },
];

export default function ServicesPage() {
  return (
    <main>
      {/* Hero section — left-aligned intro + copy */}
      <section style={{ padding: 'var(--space-4) var(--space-5) var(--space-7)' }}>
        <div style={{ ...W, maxWidth: '800px', marginBottom: 'var(--space-7)' }}>
          <SectionLabel>What we do</SectionLabel>
          <ServicesHeadline />
          <p style={{ fontSize: 'var(--text-md)', lineHeight: 'var(--leading-normal)', color: 'var(--color-ink-muted)', marginBottom: 'var(--space-5)' }}>
            A complete digital ecosystem for service businesses — strategy and design, traffic, and long-term care.
          </p>
          <p style={{ fontSize: 'var(--text-base)', lineHeight: 'var(--leading-normal)', color: 'var(--color-ink-muted)' }}>
            Most service businesses rely on passive websites that list offerings but don't guide buyers through a decision. 
            We build the opposite: sites that establish trust, clarify your unique value, and turn visitor attention into qualified conversations.
            Whether you need a high-converting web presence, organic visibility, paid pipeline, or ongoing technical care — we've designed each service to work as part of one integrated system.
          </p>
        </div>
      </section>

      {/* Services grid */}
      <section style={{ padding: 'var(--space-6) var(--space-5)' }}>
        <div style={W}>
          <div
            className="services-bento"
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateAreas: '"conv seo" "paid care"', gap: 'var(--space-4)' }}
          >
            {SERVICES.map((s) => (
              <Link
                key={s.href}
                href={s.href as Route}
                className="services-bento-card group"
                style={{
                  gridArea: s.area,
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
                  {s.title}
                </h2>
                <p style={{ fontSize: 'var(--text-base)', lineHeight: 'var(--leading-normal)', color: 'var(--color-ink-muted)', marginBottom: 'var(--space-3)' }}>
                  {s.desc}
                </p>
                <span style={{ fontSize: 'var(--text-xs)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  Explore service →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
