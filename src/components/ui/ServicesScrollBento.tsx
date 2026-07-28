'use client';
// src/components/ui/ServicesScrollBento.tsx
// MOTION: hover/focus-triggered expansion — each card grows from its
// resting grid box into a large fixed overlay panel carrying a real
// content brief, then contracts on pointer-leave/blur.
// ARCH: rebuilt from a scroll-scrubbed pinned timeline to a discrete
// state-driven transition. The scrubbed version tied animation progress
// directly to scroll position, meaning the user could stop scrolling at
// any arbitrary point mid-tween — including frames where the panel had
// grown but its content was still at opacity 0, reading as a broken/empty
// box. A discrete trigger (hover/focus) always plays a complete, uninter-
// ruptible tween — GSAP's tween-overwrite handles rapid re-triggering
// cleanly, so there is no reachable "empty frame" state.
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

type CardData = {
  title: string;
  desc: string;
  href: string;
  flag?: string | null;
  // BRAND: the expanded brief — content that does not exist at rest. Its
  // arrival IS the transformation; without it the zoom is decorative.
  brief: {
    deliverables: string[];
    process: string;
    proof: string;
    cta: string;
    // BRAND: the real work sequence for this specific service — order
    // carries information here (each step depends on the last), which is
    // exactly the case where a numbered flow is earned rather than
    // decorative. Four steps per service, distinct per offer, not a
    // reused generic template.
    workflow: { label: string; detail: string }[];
  };
};

type Props = {
  cards: CardData[];
};

// BRAND: conv + care are the studio's two premium, direct-delivery offers
// (full builds, ongoing retainer). Equal-length, both wider than the
// partner-led pair — asymmetric hierarchy signals which two are primary
// without needing a label to say so.
// ARCH: order matches page.tsx cards array — [conversion, seo, paid, care].
// gridTemplateAreas below is updated to "conv seo" / "paid care" accordingly.
const AREA_MAP = ['conv', 'seo', 'paid', 'care'] as const;

export function ServicesScrollBento({ cards }: Props) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const overlayRefs = useRef<(HTMLDivElement | null)[]>([]);
  const scrimRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const reducedRef = useRef(false);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    reducedRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    // ARCH: disable overlay expansion on touch devices — the hover-based
    // expand/contract interaction has no equivalent on mobile. Cards remain
    // fully tappable links; the overlay enhancement is pointer-only.
    if (window.matchMedia('(hover: none)').matches) {
      reducedRef.current = true;
    }
  }, []);

  // ARCH: opens the overlay for `activeIndex`. Single effect keyed on
  // activeIndex — the open path only; close is handled by a separate
  // effect below keyed on the *previous* value, so open/close never race.
  useEffect(() => {
    const scrim = scrimRef.current;
    if (!scrim || reducedRef.current || activeIndex === null) return;

    const card = cardRefs.current[activeIndex];
    const overlay = overlayRefs.current[activeIndex];
    if (!card || !overlay) return;

    const ctx = gsap.context(() => {
      const r = card.getBoundingClientRect();
      const briefItems = Array.from(overlay.querySelectorAll<HTMLElement>('[data-brief-item]'));

      // PERF: kill in-flight tweens before starting new ones — handles
      // rapid re-trigger (pointer skimming across cards) without queued
      // animations fighting each other.
      gsap.killTweensOf([card, overlay, scrim, ...briefItems]);

      gsap.set(overlay, {
        top: r.top, left: r.left, width: r.width, height: r.height,
        xPercent: 0, yPercent: 0,
        autoAlpha: 1, pointerEvents: 'auto',
      });
      gsap.set(briefItems, { autoAlpha: 0, y: 12 });

      gsap.timeline()
        .to(card, {
          autoAlpha: 0.15, scale: 0.96, transformOrigin: 'center center',
          duration: 0.32, ease: 'power2.out',
        }, 0)
        .to(scrim, { autoAlpha: 1, pointerEvents: 'auto', duration: 0.32, ease: 'power2.out' }, 0)
        .to(overlay, {
          top: '50%', left: '50%', xPercent: -50, yPercent: -50,
          width: 'min(84vw, 980px)', height: 'min(84vh, 640px)',
          duration: 0.55, ease: 'power3.out',
        }, 0)
        // Brief content arrives once the panel is substantially open.
        // Because this tween always runs to completion (never interrupted
        // by scroll position), there is no reachable frame where the box
        // is large and its content is still invisible.
        .to(briefItems, {
          autoAlpha: 1, y: 0, duration: 0.4, stagger: 0.035, ease: 'power2.out',
        }, 0.3);
    }, sectionRef);

    return () => ctx.revert();
  }, [activeIndex]);

  // Close effect: reverses whichever card was active a moment ago back to
  // its current resting rect. Keyed on the *previous* activeIndex via ref
  // so switching directly from card A to card B closes A cleanly while B
  // opens in the effect above, without the two fighting over the scrim.
  const prevActiveRef = useRef<number | null>(null);
  useEffect(() => {
    const prev = prevActiveRef.current;
    prevActiveRef.current = activeIndex;
    if (prev === null || prev === activeIndex || reducedRef.current) return;

    const card = cardRefs.current[prev];
    const overlay = overlayRefs.current[prev];
    const scrim = scrimRef.current;
    if (!card || !overlay || !scrim) return;

    const briefItems = Array.from(overlay.querySelectorAll<HTMLElement>('[data-brief-item]'));
    gsap.killTweensOf([card, overlay, ...briefItems]);

    const r = card.getBoundingClientRect();
    const tl = gsap.timeline({
      onComplete: () => gsap.set(overlay, { autoAlpha: 0, pointerEvents: 'none' }),
    });
    tl.to(briefItems, {
      autoAlpha: 0, y: -8, duration: 0.18, stagger: 0.02, ease: 'power1.in',
    }, 0)
      .to(overlay, {
        top: r.top, left: r.left, xPercent: 0, yPercent: 0,
        width: r.width, height: r.height,
        duration: 0.42, ease: 'power3.inOut',
      }, 0.05)
      .to(card, {
        autoAlpha: 1, scale: 1, duration: 0.42, ease: 'power3.inOut',
      }, 0.05);

    // Only drop the scrim if nothing new opened right behind this close.
    if (activeIndex === null) {
      tl.to(scrim, { autoAlpha: 0, pointerEvents: 'none', duration: 0.28, ease: 'power1.in' }, 0.1);
    }
  }, [activeIndex]);

  const openCard = (i: number) => {
    if (closeTimerRef.current) { clearTimeout(closeTimerRef.current); closeTimerRef.current = null; }
    setActiveIndex(i);
  };
  const closeCard = () => {
    // Small delay absorbs the pointer gap between a card and its overlay
    // (overlay sits outside the card's DOM subtree) so moving from one
    // onto the other doesn't flicker closed-then-open.
    closeTimerRef.current = setTimeout(() => setActiveIndex(null), 60);
  };

  return (
    <div
      ref={sectionRef}
      className="services-bento"
      style={{
        position: 'relative',
        display: 'grid',
        gap: 'var(--space-3)',
        gridTemplateColumns: '1.6fr 1fr',
        gridTemplateRows: '1fr 1fr',
        gridTemplateAreas: `"conv seo" "paid care"`,
      }}
      onMouseLeave={closeCard}
    >
      {/* SECURITY: scrim is decorative-only, no href/user data — no
          injection surface. aria-hidden; accessible copy lives in overlay. */}
      <div
        ref={scrimRef}
        aria-hidden="true"
        style={{
          position: 'fixed', inset: 0, background: 'rgba(11,11,13,0.72)',
          zIndex: 40, backdropFilter: 'blur(6px)', opacity: 0, pointerEvents: 'none',
        }}
      />

      {cards.map((s, i) => (
        <a
          key={s.href}
          href={s.href}
          ref={(el) => { cardRefs.current[i] = el; }}
          onMouseEnter={() => openCard(i)}
          onFocus={() => openCard(i)}
          onBlur={closeCard}
          className="services-bento-card"
          style={{
            gridArea: AREA_MAP[i],
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            textDecoration: 'none',
            border: '1px solid var(--color-border)',
            padding: 'var(--space-4)',
            color: 'var(--color-ink)',
            background: 'var(--color-canvas)',
            willChange: 'opacity, transform',
          }}
        >
          {s.flag && (
            <span style={{ display: 'inline-block', fontSize: 'var(--text-xs)', background: 'var(--color-lime)', color: 'var(--color-ink)', padding: '2px 8px', borderRadius: '2px', marginBottom: 'var(--space-1)', fontWeight: 600 }}>
              {s.flag}
            </span>
          )}
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', marginBottom: 'var(--space-1)' }}>{s.title}</h3>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-ink-muted)', lineHeight: 'var(--leading-normal)' }}>{s.desc}</p>
        </a>
      ))}

      {/* Overlay panels — one per card. Visual-only enhancement layered on
          top of the always-focusable resting <a>; overlays never become
          the sole path to the link, so no focus-trap/ARIA state machine
          is required here. */}
      {cards.map((s, i) => (
        <div
          key={`overlay-${s.href}`}
          ref={(el) => { overlayRefs.current[i] = el; }}
          aria-hidden="true"
          onMouseEnter={() => openCard(i)}
          onMouseLeave={closeCard}
          style={{
            position: 'fixed',
            zIndex: 50,
            background: 'var(--color-canvas)',
            border: '1px solid var(--color-border)',
            padding: 'clamp(1.5rem, 3vw, var(--space-5))',
            // ARCH: fixed no-scroll panel — content is sized to fit at
            // rest rather than relying on overflow. overflow hidden is
            // safe now that copy has been cut to fit the 84vh/640px cap.
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 40px 80px -20px rgba(11,11,13,0.45)',
            opacity: 0,
            pointerEvents: 'none',
          }}
        >
          {s.flag && (
            <span data-brief-item style={{ display: 'inline-block', fontSize: 'var(--text-xs)', fontFamily: 'var(--font-body)', background: 'var(--color-lime)', color: 'var(--color-ink)', padding: '2px 8px', borderRadius: '2px', marginBottom: 'var(--space-1)', fontWeight: 600, width: 'fit-content' }}>
              {s.flag}
            </span>
          )}
          {/* BRAND: title centered within the panel — anchors the expanded
              state as its own composed moment. */}
          <h3 data-brief-item style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem, 3.5vw, var(--text-xl))', marginBottom: 'var(--space-1)', color: 'var(--color-ink)', textAlign: 'center' }}>
            {s.title}
          </h3>
          <p data-brief-item style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--color-ink-muted)', lineHeight: 'var(--leading-snug)', maxWidth: '520px', marginBottom: 'var(--space-2)', textAlign: 'center' }}>
            {s.desc}
          </p>
          <ul data-brief-item style={{ listStyle: 'none', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '6px', marginBottom: 'var(--space-3)', maxWidth: '640px' }}>
            {s.brief.deliverables.map((d) => (
              <li key={d} style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-xs)', border: '1px solid var(--color-border)', padding: '3px 9px', color: 'var(--color-ink)' }}>{d}</li>
            ))}
          </ul>

          {/* BRAND/ARCH: workflow as a route map — nodes are waypoints,
              connected by a single long horizontal line with a travel
              direction, not a stack of boxed cards. Numbering is earned
              here: each step is a genuine dependency on the last. */}
          <div
            data-brief-item
            style={{
              position: 'relative',
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
              maxWidth: '900px',
              marginBottom: 'var(--space-3)',
              padding: '0 8px',
            }}
          >
            {/* the route line — sits behind the waypoint dots, spans edge
                to edge of the node row so each connector reads as one
                continuous path rather than four short arrows. */}
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                top: '5px',
                left: 'calc(4% + 4px)',
                right: 'calc(4% + 4px)',
                height: '1px',
                background: 'repeating-linear-gradient(to right, var(--color-border) 0 6px, transparent 6px 11px)',
              }}
            />
            {s.brief.workflow.map((step) => (
              <div key={step.label} style={{ position: 'relative', width: '23%', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                {/* waypoint marker */}
                <span
                  aria-hidden="true"
                  style={{
                    width: '11px', height: '11px', borderRadius: '50%',
                    background: 'var(--color-lime)', border: '1px solid var(--color-ink)',
                    marginBottom: '10px', flexShrink: 0,
                  }}
                />
                <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--color-ink)', marginBottom: '2px' }}>
                  {step.label}
                </span>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-xs)', color: 'var(--color-ink-muted)', lineHeight: 'var(--leading-snug)' }}>
                  {step.detail}
                </span>
              </div>
            ))}
          </div>

          <p data-brief-item style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-xs)', color: 'var(--color-olive)', marginBottom: '2px', textAlign: 'center', maxWidth: '560px' }}>
            {s.brief.process}
          </p>
          <p data-brief-item style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--color-ink)', marginBottom: 'var(--space-2)', textAlign: 'center', maxWidth: '560px' }}>
            {s.brief.proof}
          </p>
          <span data-brief-item style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--color-ink)', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', width: 'fit-content' }}>
            {s.brief.cta} →
          </span>
        </div>
      ))}
    </div>
  );
}
