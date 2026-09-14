// app/(public)/about/page.tsx — About ZetaCode page.
// ARCH: Hero intro + animated headline, founder introduction, principles grid,
// and footer CTA. Left-aligned (matching homepage/services/industries/work).
// H1 uses ServicesHeadline component with line-by-line GSAP animation.
import type { Metadata } from 'next';
import Link from 'next/link';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { ServicesHeadline } from '@/components/ui/ServicesHeadline';

export const metadata: Metadata = {
  title: 'About ZetaCode',
  description: 'Strategy before screens — the principles and approach behind ZetaCode\'s conversion-led websites.',
};

const W: React.CSSProperties = { maxWidth: '1280px', margin: '0 auto', padding: '0 var(--space-5)' };

const PRINCIPLES = [
  { title: 'A website is not a brochure', body: 'It has to earn attention, establish trust, and guide a decision — not just exist.' },
  { title: 'Strategy before screens', body: 'Messaging, structure, and user journey come before visual styling. Always.' },
  { title: 'Better leads over more noise', body: 'The goal is qualified enquiries. Vanity traffic doesn\'t pay anyone\'s bills.' },
  { title: 'Build for the business you want', body: 'The website should make you look as credible as the service you actually provide.' },
  { title: 'Improvement continues after launch', body: 'A care plan keeps the site technically sound and commercially useful over time.' },
];

export default function AboutPage() {
  return (
    <main>
      {/* Hero section — left-aligned intro + copy */}
      <section style={{ padding: 'var(--space-4) var(--space-5) var(--space-7)' }}>
        <div style={{ ...W, maxWidth: '800px', marginBottom: 'var(--space-7)' }}>
          <SectionLabel>About ZetaCode</SectionLabel>
          <ServicesHeadline />
          <p style={{ fontSize: 'var(--text-md)', lineHeight: 'var(--leading-normal)', color: 'var(--color-ink-muted)', marginBottom: 'var(--space-5)' }}>
            ZetaCode was built to challenge the idea that web development has to be slow, expensive, or disconnected from business outcomes.
          </p>
          <p style={{ fontSize: 'var(--text-base)', lineHeight: 'var(--leading-normal)', color: 'var(--color-ink-muted)' }}>
            [Founder introduction — background, reason for starting ZetaCode, working approach, and philosophy.
            This space is reserved for real, authentic voice explaining who you are and why you built this.
            Focus on principles and working approach, not self-promotion. Populate before launch with your own story.]
          </p>
        </div>
      </section>

      {/* Principles section */}
      <section style={{ background: 'var(--color-white)', padding: 'var(--space-6) var(--space-5)' }}>
        <div style={W}>
          <div style={{ maxWidth: '800px', marginBottom: 'var(--space-6)' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', marginBottom: 'var(--space-2)' }}>How we work</h2>
            <p style={{ fontSize: 'var(--text-base)', lineHeight: 'var(--leading-normal)', color: 'var(--color-ink-muted)' }}>
              These five principles guide every project.
            </p>
          </div>
          <div className="about-principles-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 'var(--space-5)' }}>
            {PRINCIPLES.map((p, idx) => (
              <div key={p.title} style={{ gridColumn: idx >= 3 ? 'span 3' : 'span 2', borderTop: '2px solid var(--color-lime)', paddingTop: 'var(--space-3)', textAlign: 'center' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-md)', marginBottom: 'var(--space-2)', color: 'var(--color-ink)' }}>
                  {p.title}
                </h3>
                <p style={{ fontSize: 'var(--text-base)', lineHeight: 'var(--leading-normal)', color: 'var(--color-ink-muted)' }}>
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section style={{ padding: 'var(--space-6) var(--space-5)' }}>
        <div style={{ ...W, maxWidth: '600px' }}>
          <Link
            href="/book-a-call"
            className="about-cta"
            style={{
              display: 'inline-block',
              background: 'var(--color-lime)',
              color: 'var(--color-ink)',
              padding: 'var(--space-3) var(--space-4)',
              fontSize: 'var(--text-base)',
              fontWeight: 600,
              textDecoration: 'none',
              borderRadius: '2px',
              transition: `background var(--duration-fast) var(--ease-standard)`,
            }}
          >
            Ready to talk? Book a discovery call
          </Link>
        </div>
      </section>
    </main>
  );
}
