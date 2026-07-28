'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export function ServicesHeadline() {
  const ref = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { el.style.opacity='1'; return; }
    const lines = Array.from(el.querySelectorAll('.services-line')) as HTMLElement[];
    gsap.fromTo(lines, { opacity: 0, y: 60, skewY: 3 }, { opacity: 1, y: 0, skewY: 0, duration: 1, stagger: 0.15, ease: 'power4.out', delay: 0.1 });
  }, []);
  return (
    <h1 ref={ref} style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', lineHeight: 'var(--leading-tight)', color: 'var(--color-ink)', margin: 'var(--space-2) 0 var(--space-4)', overflow: 'hidden', opacity: 1 }}>
      <span className="services-line" style={{ display: 'block', opacity: 0 }}>Our Services</span>
    </h1>
  );
}
