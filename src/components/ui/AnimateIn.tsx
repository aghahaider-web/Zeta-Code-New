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
    // ARCH: capture the ScrollTrigger instance at creation so cleanup kills
    // exactly this trigger, not any other trigger that happens to share the
    // same DOM element. The previous filter(st => st.trigger === el) approach
    // iterated ALL global ScrollTrigger instances and could kill unrelated ones.
    let st: ScrollTrigger | undefined;
    gsap.fromTo(el, { opacity: 0, y }, {
      opacity: 1, y: 0, duration, delay, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none',
        onInit: (self) => { st = self; },
      },
    });
    return () => { st?.kill(); };
  }, [delay, y, duration]);
  return <div ref={ref} className={className} style={{ opacity: 0, ...style }}>{children}</div>;
}