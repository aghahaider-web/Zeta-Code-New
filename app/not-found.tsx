// app/not-found.tsx — Section 3.1: helpful 404 with recovery paths
import { Button } from '@/components/ui/Button';
export default function NotFound() {
  return (
    <main style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', padding: 'var(--space-7) var(--space-5)' }}>
      <div style={{ maxWidth: '560px' }}>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-xs)', color: 'var(--color-olive)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 'var(--space-2)' }}>404</p>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', lineHeight: 'var(--leading-tight)', marginBottom: 'var(--space-3)' }}>
          This page doesn't exist.
        </h1>
        <p style={{ fontSize: 'var(--text-base)', color: 'var(--color-ink-muted)', lineHeight: 'var(--leading-normal)', marginBottom: 'var(--space-5)' }}>
          It may have moved. Try one of the routes below, or go back to the homepage.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)', marginBottom: 'var(--space-5)' }}>
          {[['Services', '/services'], ['Industries', '/industries'], ['Work', '/work'], ['About', '/about']].map(([l, h]) => (
            <a key={h} href={h} style={{ fontSize: 'var(--text-sm)', color: 'var(--color-ink)', textDecoration: 'none', fontWeight: 500, display: 'inline-flex', alignItems: 'center', minHeight: '44px' }}>{l} →</a>
          ))}
        </div>
        <Button href="/">Back to homepage</Button>
      </div>
    </main>
  );
}
