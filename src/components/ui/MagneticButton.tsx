'use client';
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import Link from 'next/link';
import type { ReactNode } from 'react';
import type { Route } from 'next';

type Props = { href: Route; variant?: 'primary' | 'secondary'; children: ReactNode; };

const base: React.CSSProperties = { display: 'inline-flex', alignItems: 'center', justifyContent: 'center', minHeight: '44px', padding: '0 1.75rem', fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', fontWeight: 600, letterSpacing: '0.01em', textDecoration: 'none', borderRadius: 'var(--radius-sm)', willChange: 'transform' };
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
    const onMove = (e: MouseEvent) => {
      const r = wrap.getBoundingClientRect();
      gsap.to(btn, { x: (e.clientX - r.left - r.width/2) * 0.35, y: (e.clientY - r.top - r.height/2) * 0.35, duration: 0.4, ease: 'power2.out' });
    };
    const onLeave = () => gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.5)' });
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