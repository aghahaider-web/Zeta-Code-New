'use client';
export function SkipLink() {
  return (
    <a
      href="#main-content"
      style={{
        position: 'absolute',
        top: '-40px',
        left: 0,
        background: 'var(--color-ink)',
        color: 'var(--color-canvas)',
        padding: '8px',
        zIndex: 1000,
        transition: 'top 0.2s ease-out',
        textDecoration: 'none',
        fontWeight: 600,
        borderBottomRightRadius: '4px'
      }}
      onFocus={(e) => { e.currentTarget.style.top = '0'; e.currentTarget.style.outline = 'none'; }}
      onBlur={(e) => { e.currentTarget.style.top = '-40px'; }}
    >
      Skip to main content
    </a>
  );
}
