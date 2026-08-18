'use client';
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import Link from 'next/link';
import type { ReactNode } from 'react';
import type { Route } from 'next';

type Props = { href: Route; variant?: 'primary' | 'secondary'; children: ReactNode; };

const base: React.CSSProperties = { display: 'inline-flex', alignItems: 'center', justifyContent: 'center', minHeight: '44px', padding: '0 1.75rem', fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', fontWeight: 600, letterSpacing: '0.01em', textDecoration: 'none', borderRadius: '2px', willChange: 'transform' };
const variants: Record<string, React.CSSProperties> = {
  primary: { ...base, background: 'var(--color-lime)', color: 'var(--color-ink)', border: 'none' },
  secondary: { ...base, background: 'transparent', color: 'var(--color-ink)', border: '1px solid var(--color-ink)' },
};

export function MagneticButton({ href, variant = 'primary', children }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLAnchorElement>(null);
  useEffect(() => {
    const wrap = wrapRef.current; const btn = btnRef.current;
    if (!wrap || !btn) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.matchMedia('(hover: none)').matches) return;

    // ⚡ Bolt: Use gsap.quickTo for high-frequency mousemove events
    // Calling gsap.to() on every mousemove creates a new tween object per frame,
    // causing unnecessary GC overhead. quickTo() reuses the same instance and is much faster.
    const xTo = gsap.quickTo(btn, 'x', { duration: 0.4, ease: 'power2.out' });
    const yTo = gsap.quickTo(btn, 'y', { duration: 0.4, ease: 'power2.out' });

    const onMove = (e: MouseEvent) => {
      const r = wrap.getBoundingClientRect();
      xTo((e.clientX - r.left - r.width/2) * 0.35);
      yTo((e.clientY - r.top - r.height/2) * 0.35);
    };
    const onLeave = () => {
      // ⚡ Bolt: Use regular gsap.to for the spring back so we can use a different ease (elastic)
      // which quickTo doesn't support changing dynamically.
      gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.5)' });
    };
    wrap.addEventListener('mousemove', onMove);
    wrap.addEventListener('mouseleave', onLeave);
    return () => { wrap.removeEventListener('mousemove', onMove); wrap.removeEventListener('mouseleave', onLeave); };
  }, []);
  return (
    <div ref={wrapRef} style={{ display: 'inline-block', padding: '8px' }}>
      <Link ref={btnRef} href={href} style={variants[variant]}>{children}</Link>
    </div>
  );
}
