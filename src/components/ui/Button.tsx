// src/components/ui/Button.tsx
// Blueprint Section 2.2 — lime accent for primary CTA only, ink for secondary.
// WCAG 2.2 AA contrast enforced. Min 44px touch target.
import Link from 'next/link';
import type { ReactNode } from 'react';
import type { Route } from 'next';

// ARCH: Explicit type export to ensure TypeScript compiler sees children property
export type ButtonProps = {
  href: Route;
  variant?: 'primary' | 'secondary';
  /* BRAND: 'dark' = button sits on a dark section (--color-charcoal, DARK const
     in page.tsx). Secondary previously hardcoded --color-ink border/text, which
     is near-black (#1C1D18) — on charcoal (#20211C) that's ~1:1 contrast and
     effectively invisible. Primary is unaffected: lime-on-ink always passes AA
     regardless of surface, so it doesn't need a theme prop. */
  theme?: 'light' | 'dark';
  children: ReactNode;
};

export function Button({ href, variant = 'primary', theme = 'light', children }: ButtonProps) {
  const base: React.CSSProperties = {
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    minHeight: '44px', padding: '0 1.75rem',
    fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)',
    fontWeight: 600, letterSpacing: '0.01em',
    textDecoration: 'none', borderRadius: '2px',
    transition: `background var(--duration-fast) var(--ease-standard),
                 color var(--duration-fast) var(--ease-standard),
                 outline-offset var(--duration-fast) var(--ease-standard)`,
  };
  const styles: Record<string, React.CSSProperties> = {
    primary: { ...base, background: 'var(--color-lime)', color: 'var(--color-ink)', border: 'none' },
    secondary: theme === 'dark'
      ? { ...base, background: 'transparent', color: 'var(--color-canvas)',
          border: '1px solid var(--color-canvas)' }
      : { ...base, background: 'transparent', color: 'var(--color-ink)',
          border: '1px solid var(--color-ink)' },
  };
  return <Link href={href} style={styles[variant]}>{children}</Link>;
}
