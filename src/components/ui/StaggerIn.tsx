'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

type Props = { children: React.ReactNode; stagger?: number; y?: number; duration?: number; scale?: number; style?: React.CSSProperties; className?: string; };

export function StaggerIn({ children, stagger = 0.12, y = 30, duration = 0.8, scale, style, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const kids = Array.from(el.children) as HTMLElement[];
    if (reduced) { kids.forEach(c => { c.style.opacity = '1'; c.style.transform = 'none'; }); return; }
    /* MOTION: scale is optional — when set, cards grow in from `scale` to 1
       alongside the existing y-rise, giving the "opening" feel (Replit bento
       reference) rather than a flat fade-up. transformOrigin kept at center
       so growth reads as the card itself expanding, not sliding from a corner. */
    gsap.fromTo(
      kids,
      { opacity: 0, y, ...(scale !== undefined ? { scale, transformOrigin: 'center center' } : {}) },
      { opacity: 1, y: 0, ...(scale !== undefined ? { scale: 1 } : {}), duration, stagger, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' } }
    );
    return () => { ScrollTrigger.getAll().filter(st => st.trigger === el).forEach(st => st.kill()); };
  }, [stagger, y, duration, scale]);
  return <div ref={ref} className={className} style={style}>{children}</div>;
}