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
    // ARCH: opacity:1 on the h1 — parent must be visible. Only the spans
    // start at opacity:0; GSAP animates them. Previously h1 itself was
    // also opacity:0 and was never animated, leaving the heading invisible.
    <h1 ref={ref} id="hero-heading" style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-3xl)', lineHeight: 'var(--leading-tight)', color: 'var(--color-ink)', margin: 'var(--space-2) 0 var(--space-3)', overflow: 'hidden', opacity: 1 }}>
      <span className="hero-line" style={{ display: 'block', opacity: 0 }}>Stop settling for</span>
      <span className="hero-line" style={{ display: 'block', opacity: 0 }}>brochure websites.</span>
    </h1>
  );
}