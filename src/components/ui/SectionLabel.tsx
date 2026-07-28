// src/components/ui/SectionLabel.tsx
// Eyebrow/label text — olive, small caps feel, never lime (Section 2.2)
export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p style={{
      fontFamily: 'var(--font-body)', fontSize: 'var(--text-xs)',
      color: 'var(--color-olive)', letterSpacing: '0.1em',
      textTransform: 'uppercase', fontWeight: 500,
      marginBottom: 'var(--space-2)',
    }}>
      {children}
    </p>
  );
}
