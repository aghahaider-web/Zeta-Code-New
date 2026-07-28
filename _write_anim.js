const fs = require('fs');
const path = require('path');
const base = 'C:\\Users\\Haider\\ZetaCode';

// ── SmoothScroll ──────────────────────────────────────────────────────────────
fs.writeFileSync(path.join(base, 'src/components/layout/SmoothScroll.tsx'), `
'use client';
import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const lenis = new Lenis({ duration: 1.2, easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true });
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
    lenis.on('scroll', ScrollTrigger.update);
    return () => { lenis.destroy(); };
  }, []);
  return <>{children}</>;
}
`.trim());

// ── AnimateIn ─────────────────────────────────────────────────────────────────
fs.writeFileSync(path.join(base, 'src/components/ui/AnimateIn.tsx'), `
'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

type Props = { children: React.ReactNode; delay?: number; y?: number; duration?: number; className?: string; style?: React.CSSProperties; };

export function AnimateIn({ children, delay = 0, y = 40, duration = 0.9, className, style }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { el.style.opacity = '1'; return; }
    gsap.fromTo(el, { opacity: 0, y }, { opacity: 1, y: 0, duration, delay, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' } });
    return () => { ScrollTrigger.getAll().filter(st => st.trigger === el).forEach(st => st.kill()); };
  }, [delay, y, duration]);
  return <div ref={ref} className={className} style={{ opacity: 0, ...style }}>{children}</div>;
}
`.trim());

// ── StaggerIn ─────────────────────────────────────────────────────────────────
fs.writeFileSync(path.join(base, 'src/components/ui/StaggerIn.tsx'), `
'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

type Props = { children: React.ReactNode; stagger?: number; y?: number; duration?: number; style?: React.CSSProperties; className?: string; };

export function StaggerIn({ children, stagger = 0.12, y = 30, duration = 0.8, style, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const kids = Array.from(el.children) as HTMLElement[];
    if (reduced) { kids.forEach(c => c.style.opacity = '1'); return; }
    gsap.fromTo(kids, { opacity: 0, y }, { opacity: 1, y: 0, duration, stagger, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' } });
    return () => { ScrollTrigger.getAll().filter(st => st.trigger === el).forEach(st => st.kill()); };
  }, [stagger, y, duration]);
  return <div ref={ref} className={className} style={style}>{children}</div>;
}
`.trim());

// ── MagneticButton ────────────────────────────────────────────────────────────
fs.writeFileSync(path.join(base, 'src/components/ui/MagneticButton.tsx'), `
'use client';
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import Link from 'next/link';
import type { ReactNode } from 'react';

type Props = { href: string; variant?: 'primary' | 'secondary'; children: ReactNode; };

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
`.trim());

// ── HeroHeadline ──────────────────────────────────────────────────────────────
fs.writeFileSync(path.join(base, 'src/components/ui/HeroHeadline.tsx'), `
'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export function HeroHeadline() {
  const ref = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { el.style.opacity='1'; return; }
    const lines = Array.from(el.querySelectorAll('.hero-line')) as HTMLElement[];
    gsap.fromTo(lines, { opacity: 0, y: 60, skewY: 3 }, { opacity: 1, y: 0, skewY: 0, duration: 1, stagger: 0.15, ease: 'power4.out', delay: 0.1 });
  }, []);
  return (
    <h1 ref={ref} id="hero-heading" style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-3xl)', lineHeight: 'var(--leading-tight)', color: 'var(--color-ink)', margin: 'var(--space-3) 0 var(--space-4)', overflow: 'hidden', opacity: 0 }}>
      <span className="hero-line" style={{ display: 'block', opacity: 0 }}>Stop settling for</span>
      <span className="hero-line" style={{ display: 'block', opacity: 0 }}>brochure websites.</span>
    </h1>
  );
}
`.trim());

console.log('All animation components written.');
