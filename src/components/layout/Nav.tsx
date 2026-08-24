'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import { MagneticButton } from '@/components/ui/MagneticButton';
import type { Route } from 'next';

const LINKS: { href: Route; label: string }[] = [
  { href: '/services', label: 'Services' },
  { href: '/industries', label: 'Industries' },
  { href: '/work', label: 'Work' },
  { href: '/about', label: 'About' },
];

export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  // Close on Escape or outside click
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') { setMenuOpen(false); toggleRef.current?.focus(); } };
    const onOutside = (e: MouseEvent) => {
      if (drawerRef.current && !drawerRef.current.contains(e.target as Node) &&
          toggleRef.current && !toggleRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onOutside);
    return () => { document.removeEventListener('keydown', onKey); document.removeEventListener('mousedown', onOutside); };
  }, [menuOpen]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
      <header style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: scrolled ? 'rgba(245,244,237,0.92)' : 'var(--color-canvas)',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--color-border)' : '1px solid transparent',
        padding: '0 var(--space-5)',
        transition: 'background 300ms ease, border-color 300ms ease',
      }}>
        <nav
          aria-label="Main navigation"
          style={{
            maxWidth: '1280px', margin: '0 auto',
            display: 'flex', alignItems: 'center',
            height: scrolled ? '56px' : '64px',
            transition: 'height 300ms cubic-bezier(0.4,0,0.2,1)',
          }}
        >
          <Link
            href="/"
            aria-label="ZetaCode home"
            aria-current={pathname === '/' ? 'page' : undefined}
            style={{
              fontFamily: 'var(--font-display)', fontSize: 'var(--text-md)',
              fontWeight: 600, color: 'var(--color-ink)', textDecoration: 'none',
              display: 'inline-flex', alignItems: 'center', minHeight: '44px',
            }}
          >
            ZetaCode
          </Link>

          {/* Desktop links */}
          <div className="nav-desktop-links" style={{ display: 'flex', gap: 'var(--space-4)', marginLeft: 'auto', alignItems: 'center' }}>
            {LINKS.map(({ href, label }) => {
              const isActive = pathname.startsWith(href);
              return (
                <Link
                  key={href} href={href}
                  aria-current={isActive ? 'page' : undefined}
                  style={{
                    fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)',
                    color: 'var(--color-ink)', textDecoration: isActive ? 'underline' : 'none', textDecorationColor: isActive ? 'var(--color-lime)' : 'transparent', textDecorationThickness: isActive ? '2px' : '0px', textUnderlineOffset: '4px', fontWeight: 500,
                    display: 'inline-flex', alignItems: 'center', minHeight: '44px',
                  }}
                >
                  {label}
                </Link>
              );
            })}
            <MagneticButton href="/book-a-call" variant="primary">Book a discovery call</MagneticButton>
          </div>

          {/* Mobile hamburger */}
          <button
            ref={toggleRef}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav-drawer"
            onClick={() => setMenuOpen(v => !v)}
            className="nav-hamburger"
            style={{
              marginLeft: 'auto', background: 'none', border: 'none',
              cursor: 'pointer', padding: '10px', minHeight: '44px', minWidth: '44px',
              display: 'none', flexDirection: 'column', justifyContent: 'center',
              alignItems: 'center', gap: '5px', color: 'var(--color-ink)',
            }}
          >
            <span style={{
              display: 'block', width: '22px', height: '2px', background: 'currentColor',
              borderRadius: '1px', transition: 'transform 240ms ease',
              transform: menuOpen ? 'translateY(7px) rotate(45deg)' : 'none',
            }} />
            <span style={{
              display: 'block', width: '22px', height: '2px', background: 'currentColor',
              borderRadius: '1px', transition: 'opacity 240ms ease',
              opacity: menuOpen ? 0 : 1,
            }} />
            <span style={{
              display: 'block', width: '22px', height: '2px', background: 'currentColor',
              borderRadius: '1px', transition: 'transform 240ms ease',
              transform: menuOpen ? 'translateY(-7px) rotate(-45deg)' : 'none',
            }} />
          </button>
        </nav>
      </header>

      {/* Mobile drawer */}
      <div
        id="mobile-nav-drawer"
        ref={drawerRef}
        role="dialog"
        aria-label="Mobile navigation"
        aria-modal="true"
        aria-hidden={!menuOpen}
        style={{
          position: 'fixed', inset: 0, zIndex: 99,
          background: 'var(--color-canvas)',
          display: 'flex', flexDirection: 'column',
          padding: 'var(--space-8) var(--space-5) var(--space-5)',
          transform: menuOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 320ms cubic-bezier(0.4,0,0.2,1)',
          visibility: menuOpen ? 'visible' : 'hidden',
          pointerEvents: menuOpen ? 'auto' : 'none',
        }}
      >
        <nav aria-label="Mobile navigation links">
          {LINKS.map(({ href, label }) => {
            const isActive = pathname.startsWith(href);
            return (
              <Link
                key={href} href={href}
                onClick={() => setMenuOpen(false)}
                aria-current={isActive ? 'page' : undefined}
                style={{
                  display: 'block', fontFamily: 'var(--font-display)',
                  fontSize: 'var(--text-xl)', color: 'var(--color-ink)',
                  textDecoration: isActive ? 'underline' : 'none', textDecorationColor: isActive ? 'var(--color-lime)' : 'transparent', textDecorationThickness: isActive ? '2px' : '0px', textUnderlineOffset: '4px', padding: 'var(--space-2) 0',
                  borderBottom: '1px solid var(--color-border)',
                  lineHeight: 'var(--leading-snug)',
                }}
              >
                {label}
              </Link>
            );
          })}
        </nav>
        <div style={{ marginTop: 'var(--space-5)', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
          <Link href="/book-a-call" onClick={() => setMenuOpen(false)} style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            minHeight: '52px', background: 'var(--color-lime)', color: 'var(--color-ink)',
            fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', fontWeight: 600,
            textDecoration: 'none', borderRadius: '2px',
          }}>
            Book a discovery call
          </Link>
          <Link href="/request-a-proposal" onClick={() => setMenuOpen(false)} style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            minHeight: '52px', border: '1px solid var(--color-ink)',
            color: 'var(--color-ink)', fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-sm)', fontWeight: 600,
            textDecoration: 'none', borderRadius: '2px',
          }}>
            Request a proposal
          </Link>
        </div>
      </div>
    </>
  );
}
