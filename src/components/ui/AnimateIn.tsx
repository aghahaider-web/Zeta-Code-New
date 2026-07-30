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
    // ARCH: this installed gsap version's shipped ScrollTrigger.Vars type
    // does not include onInit (removed from the type surface, though it
    // still exists at runtime) — using it fails the build under strict
    // mode. Reading .scrollTrigger off the returned Tween is the
    // type-safe equivalent: gsap always attaches the created ScrollTrigger
    // instance there, so cleanup still kills exactly this trigger and
    // nothing else that happens to share the same DOM element.
    const tween = gsap.fromTo(el, { opacity: 0, y }, {
      opacity: 1, y: 0, duration, delay, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' },
    });
    return () => { tween.scrollTrigger?.kill(); };
  }, [delay, y, duration]);
  return <div ref={ref} className={className} style={{ opacity: 0, ...style }}>{children}</div>;
}
