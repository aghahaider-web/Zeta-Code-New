// app/(public)/work/page.tsx — Work/case studies index with hero section.
// ARCH: Hero intro + substantive copy explaining the case study approach,
// then case study cards below. Left-aligned (matching homepage/services/industries).
// H1 uses ServicesHeadline component with line-by-line GSAP animation.
import type { Metadata } from 'next';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { ServicesHeadline } from '@/components/ui/ServicesHeadline';

export const metadata: Metadata = {
  title: 'Selected Work',
  description: 'A small set of ZetaCode website projects, shown with real scope and approach.',
};

const W: React.CSSProperties = { maxWidth: '1280px', margin: '0 auto', padding: '0 var(--space-5)' };

export default function WorkPage() {
  return (
    <main>
      {/* Hero section — left-aligned intro + copy */}
      <section style={{ padding: 'var(--space-4) var(--space-5) var(--space-7)' }}>
        <div style={{ ...W, maxWidth: '800px', marginBottom: 'var(--space-7)' }}>
          <SectionLabel>Selected work</SectionLabel>
          <ServicesHeadline />
          <p style={{ fontSize: 'var(--text-md)', lineHeight: 'var(--leading-normal)', color: 'var(--color-ink-muted)', marginBottom: 'var(--space-5)' }}>
            A small set of projects, shown with honest scope and approach — not vanity metrics or invented outcomes.
          </p>
          <p style={{ fontSize: 'var(--text-base)', lineHeight: 'var(--leading-normal)', color: 'var(--color-ink-muted)' }}>
            Every case study here represents a real client challenge, our strategic approach, and the actual deliverables we shipped. 
            We show scope because it matters — a 2-week build for a trade contractor requires different thinking than a 6-week project for a design studio. 
            Client permissions and privacy guide what we can publicly discuss. Case studies are added as projects complete and approvals are confirmed.
          </p>
        </div>
      </section>

      {/* Case study cards rendered here from Sanity once Phase 1 assets confirmed */}
      <section style={{ padding: 'var(--space-6) var(--space-5)' }}>
        <div style={W}>
          <div style={{ padding: 'var(--space-5)', border: '1px solid var(--color-border)', background: 'var(--color-white)', textAlign: 'center' }}>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-ink-muted)' }}>
              Case studies and project details coming as client permissions are confirmed.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
