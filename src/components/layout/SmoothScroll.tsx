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
    // ARCH: capture the ticker fn reference so we can remove it on cleanup.
    // Previously gsap.ticker.add received an anonymous fn — lenis.destroy()
    // stops Lenis but the ticker kept calling lenis.raf() every frame on a
    // destroyed instance, causing a memory + CPU leak on every unmount.
    const tickerFn = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tickerFn);
    gsap.ticker.lagSmoothing(0);
    lenis.on('scroll', ScrollTrigger.update);
    return () => { gsap.ticker.remove(tickerFn); lenis.destroy(); };
  }, []);
  return <>{children}</>;
}