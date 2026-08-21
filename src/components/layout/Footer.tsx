// src/components/layout/Footer.tsx — Section 3.2 footer groups
import Link from 'next/link';
import type { Route } from 'next';

const groups = [
  { heading: 'Services', links: [
    { label: 'Conversion websites', href: '/services/conversion-websites' },
    { label: 'SEO', href: '/services/seo' },
    { label: 'Paid acquisition', href: '/services/paid-acquisition' },
    { label: 'Care plan', href: '/care-plan' },
  ]},
  { heading: 'Industries', links: [
    { label: 'Construction & trades', href: '/industries/construction-trades' },
    { label: 'Property & interiors', href: '/industries/property-interiors' },
    { label: 'Health & clinics', href: '/industries/health-clinics' },
  ]},
  { heading: 'Company', links: [
    { label: 'About', href: '/about' },
    { label: 'Work', href: '/work' },
  ]},
  { heading: 'Legal', links: [
    { label: 'Privacy', href: '/privacy' },
    { label: 'Cookies', href: '/cookies' },
    { label: 'Terms', href: '/terms' },
  ]},
];

// SECURITY: hardcoded, studio-owned destinations only — no user-supplied
// or CMS-driven href here, so there's no injection surface. External
// targets get rel="noopener noreferrer" to block tabnabbing via
// window.opener and to withhold referrer data from third parties.
const socials = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/zetacode' },
  { label: 'Instagram', href: 'https://www.instagram.com/zetacode.tech' },
  { label: 'X', href: 'https://x.com/zetacode' },
];

const linkStyle: React.CSSProperties = {
  display: 'block', color: 'var(--color-canvas)', textDecoration: 'none',
  fontFamily: 'var(--font-body)', fontSize: 'var(--text-base)',
  marginBottom: '2px', opacity: 0.72, minHeight: '44px', lineHeight: '44px',
  transition: 'opacity var(--duration-fast) var(--ease-standard)',
};

export function Footer() {
  return (
    // BRAND: --color-ink (#1C1D18), not --color-charcoal (#20211C) — the
    // CTA section directly above this uses charcoal; sharing that same
    // tone here left the two sections reading as one undifferentiated
    // dark block with no seam. Ink is close in value but genuinely
    // distinct, so the footer registers as its own zone without breaking
    // the dark-mode continuity of the page's closing run.
    <footer style={{ background: 'var(--color-ink)', padding: 'var(--space-7) var(--space-5) var(--space-4)' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {/* BRAND: lime top rule signals the section boundary explicitly,
            rather than relying on a low-contrast background shift alone
            to do all the work. */}
        <div style={{ height: '2px', background: 'var(--color-lime)', width: '48px', marginBottom: 'var(--space-5)' }} />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--space-5)', marginBottom: 'var(--space-5)' }}>
          {groups.map(g => (
            <div key={g.heading}>
              <p style={{ color: 'var(--color-lime)', fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-xs)', fontWeight: 600, letterSpacing: '0.08em',
                textTransform: 'uppercase', marginBottom: 'var(--space-2)' }}>
                {g.heading}
              </p>
              {g.links.map(l => <Link key={l.href} href={l.href as Route} className="footer-link" style={linkStyle}>{l.label}</Link>)}
            </div>
          ))}
        </div>

        {/* Wordmark + social row — its own tier above the legal bar, so the
            studio name and social links read as the closing brand moment
            rather than being crammed into the copyright line. */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexWrap: 'wrap', gap: 'var(--space-3)',
          borderTop: '1px solid var(--color-border-dark)', paddingTop: 'var(--space-4)',
          marginBottom: 'var(--space-3)',
        }}>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', color: 'var(--color-canvas)' }}>
            ZetaCode
          </p>
          <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
            {socials.map(s => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Zeta Code on ${s.label}`}
                className="footer-link"
                style={{
                  fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)',
                  color: 'var(--color-canvas)', textDecoration: 'none', opacity: 0.72,
                  minHeight: '44px', minWidth: '44px', display: 'inline-flex',
                  alignItems: 'center', justifyContent: 'center',
                  transition: 'opacity var(--duration-fast) var(--ease-standard)',
                }}
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>

        <div style={{ borderTop: '1px solid var(--color-border-dark)', paddingTop: 'var(--space-3)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <p style={{ fontFamily: 'var(--font-body)', color: 'var(--color-olive)', fontSize: 'var(--text-xs)' }}>
            © {new Date().getFullYear()} ZetaCode. All rights reserved.
          </p>
          <p style={{ fontFamily: 'var(--font-body)', color: 'var(--color-olive)', fontSize: 'var(--text-xs)' }}>
            zetacode.tech
          </p>
        </div>
      </div>
    </footer>
  );
}
