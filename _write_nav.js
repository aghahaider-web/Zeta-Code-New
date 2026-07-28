const fs = require('fs');
const path = require('path');
const base = 'C:\\Users\\Haider\\ZetaCode';

// ── Nav ───────────────────────────────────────────────────────────────────────
fs.writeFileSync(path.join(base, 'src/components/layout/Nav.tsx'), `
'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { MagneticButton } from '@/components/ui/MagneticButton';

const LINKS = [
  { href: '/services', label: 'Services' },
  { href: '/industries', label: 'Industries' },
  { href: '/work', label: 'Work' },
  { href: '/about', label: 'About' },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);
  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 100, background: scrolled ? 'rgba(245,244,237,0.85)' : 'var(--color-canvas)', backdropFilter: scrolled ? 'blur(12px)' : 'none', WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none', borderBottom: scrolled ? '1px solid var(--color-border)' : '1px solid transparent', padding: '0 var(--space-5)', transition: 'background 300ms ease, border-color 300ms ease' }}>
      <nav aria-label="Main navigation" style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: 'var(--space-5)', height: scrolled ? '56px' : '64px', transition: 'height 300ms cubic-bezier(0.4,0,0.2,1)' }}>
        <Link href="/" aria-label="ZetaCode home" style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-md)', fontWeight: 600, color: 'var(--color-ink)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', minHeight: '44px' }}>ZetaCode</Link>
        <div style={{ display: 'flex', gap: 'var(--space-4)', marginLeft: 'auto', alignItems: 'center' }}>
          {LINKS.map(({ href, label }) => (
            <Link key={href} href={href} className="nav-link" style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--color-ink)', textDecoration: 'none', fontWeight: 500, display: 'inline-flex', alignItems: 'center', minHeight: '44px', position: 'relative' }}>{label}</Link>
          ))}
          <MagneticButton href="/book-a-call" variant="primary">Book a discovery call</MagneticButton>
        </div>
      </nav>
    </header>
  );
}
`.trim());

// ── Public layout with SmoothScroll ──────────────────────────────────────────
fs.writeFileSync(path.join(base, 'app/(public)/layout.tsx'), `
import { Nav } from '@/components/layout/Nav';
import { Footer } from '@/components/layout/Footer';
import { SmoothScroll } from '@/components/layout/SmoothScroll';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <SmoothScroll>
      <Nav />
      {children}
      <Footer />
    </SmoothScroll>
  );
}
`.trim());

console.log('Nav + Layout written.');
