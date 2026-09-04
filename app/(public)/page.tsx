// app/(public)/page.tsx — Homepage, 12-section structure per blueprint Section 3.3
import type { Metadata } from 'next';
import { Button } from '@/components/ui/Button';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { ServicesScrollBento } from '@/components/ui/ServicesScrollBento';
import { HeroHeadline } from '@/components/ui/HeroHeadline';

export const metadata: Metadata = {
  title: 'ZetaCode — Conversion-Led Websites for Service Businesses',
  description: 'Strategy-led custom websites for construction, property, and health service businesses. Built to convert, not just exist.',
};

const W: React.CSSProperties = { maxWidth: '1280px', margin: '0 auto', padding: '0 var(--space-5)' };
const DARK: React.CSSProperties = { background: 'var(--color-charcoal)', color: 'var(--color-canvas)' };

export default function HomePage() {
  return (
    <main>

      {/* ── 2. HERO ── */}
      {/* PERF/BRAND: min-height uses dvh (not vh) so mobile browser chrome doesn't
          force a false overflow; 100dvh caps the block so it never exceeds the
          first viewport on load, with a floor so short landscape/tablet screens
          don't get crushed. Padding and inter-element gaps tightened from the
          --space-8/--space-7/--space-4/--space-5 luxury-editorial scale down to
          a faster rhythm that matches the fintech-snap trust line below it. */}
      <section
        aria-labelledby="hero-heading"
        style={{
          background: 'var(--color-canvas)',
          padding: 'var(--space-4) var(--space-5) var(--space-5)',
          minHeight: 'min(100dvh, 44rem)',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div style={{ ...W, maxWidth: '860px', width: '100%' }}>
          <SectionLabel>For service businesses that are done blending in.</SectionLabel>
          <HeroHeadline />
          <p
            style={{
              fontSize: 'var(--text-base)',
              lineHeight: 'var(--leading-normal)',
              color: 'var(--color-ink-muted)',
              maxWidth: '600px',
              marginBottom: 'var(--space-3)',
            }}
          >
            Your website is often the first real conversation a prospect has with your business.
            If it doesn't earn trust, explain your value, and make the next step obvious —
            it's losing you work you should be winning. ZetaCode builds strategy-led websites
            that turn interest into qualified enquiries.
          </p>
          <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap', marginBottom: 'var(--space-2)' }}>
            <Button href="/book-a-call" variant="primary">Book a discovery call</Button>
            <Button href="/request-a-proposal" variant="secondary">Request a proposal</Button>
          </div>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-olive)' }}>
            Custom website projects start from $1,500. Focused projects typically launch in 2–3 weeks.
          </p>
        </div>
      </section>

      {/* ── 3. PROBLEM CONTRAST ── */}
      <section aria-labelledby="problem-heading" style={{ background: 'var(--color-white)', padding: 'var(--space-7) var(--space-5)' }}>
        <div style={W}>
          <SectionLabel>The problem</SectionLabel>
          <h2 id="problem-heading" style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-3)', maxWidth: '700px' }}>
            Most websites don't fail loudly. They fail quietly.
          </h2>
          <p style={{ fontSize: 'var(--text-base)', lineHeight: 'var(--leading-normal)', color: 'var(--color-ink-muted)', maxWidth: '640px', marginBottom: 'var(--space-4)' }}>
            A brochure website sits there. It lists services instead of building a case.
            It shows a gallery instead of a decision path. Visitors leave without understanding
            why you're the right choice — and you never know they were there.
            A website that isn't built to convert isn't neutral. It's a cost.
          </p>
          <ul style={{ listStyle: 'none', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 'var(--space-3)' }}>
            {['Fails to clarify what makes you the right choice','Loses trust before attention runs out','Gives visitors no clear next step','Converts interest into nothing'].map(f => (
              <li key={f} style={{ borderLeft: '2px solid var(--color-lime)', paddingLeft: 'var(--space-2)', fontSize: 'var(--text-sm)', lineHeight: 'var(--leading-normal)', color: 'var(--color-ink)' }}>{f}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── 4. ZETACODE OUTCOME ── */}
      <section aria-labelledby="outcome-heading" style={{ ...DARK, padding: 'var(--space-7) var(--space-5)' }}>
        <div style={W}>
          <SectionLabel>What changes</SectionLabel>
          <h2 id="outcome-heading" style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-3)', maxWidth: '700px', color: 'var(--color-canvas)' }}>
            From passive website to active sales asset.
          </h2>
          <p style={{ fontSize: 'var(--text-base)', lineHeight: 'var(--leading-normal)', color: 'var(--color-canvas)', opacity: 0.8, maxWidth: '600px' }}>
            A ZetaCode site is built around one job: turning the right visitors into qualified
            conversations. That means a clear structure, a message that matches how your buyers
            actually decide, and a path from "just looking" to "let's talk" that doesn't rely on luck.
          </p>
        </div>
      </section>

      {/* ── 5. CORE SERVICES ── */}
      {/* BRAND/MOTION: pinned scroll-scrubbed bento — see ServicesScrollBento
          for full rationale. Uneven grid geometry (wide+narrow crossed,
          row 1 taller) preserved from the prior static version; square
          corners kept intentionally, no borderRadius. */}
      <section aria-labelledby="services-heading" style={{ background: 'var(--color-canvas)', padding: 'var(--space-7) var(--space-5)' }}>
        <div style={W}>
          <SectionLabel>What we do</SectionLabel>
          <h2 id="services-heading" style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)', marginBottom: 'var(--space-5)' }}>Core services</h2>
          <ServicesScrollBento
            cards={[
              {
                title: 'Conversion websites', desc: 'Strategy, design, and development built around your buyer\'s decision journey.', href: '/services/conversion-websites', flag: null,
                brief: {
                  deliverables: ['Strategy & messaging', 'UX architecture', 'Custom design', 'Launch QA'],
                  process: 'Discovery → structure → build, 2–3 weeks.',
                  proof: 'Built around how buyers actually decide, not a template funnel.',
                  cta: 'See the conversion-websites approach',
                  workflow: [
                    { label: 'Discovery', detail: 'Journey and offer mapped.' },
                    { label: 'Structure', detail: 'Architecture built around decisions.' },
                    { label: 'Design & build', detail: 'Design shipped straight to code.' },
                    { label: 'Launch QA', detail: 'Tested across devices, ready.' },
                  ],
                },
              },
              {
                title: 'SEO', desc: 'Technical foundations set by ZetaCode; ongoing execution delivered by vetted specialist partners, managed by ZetaCode.', href: '/services/seo', flag: 'Partner-led',
                brief: {
                  deliverables: ['Technical audit', 'On-page foundations', 'Partner execution', 'Monthly reporting'],
                  process: 'ZetaCode sets the baseline; a partner executes under our oversight.',
                  proof: 'One point of accountability, not two vendors to manage.',
                  cta: 'See how SEO is structured',
                  workflow: [
                    { label: 'Audit', detail: 'Speed and structure assessed.' },
                    { label: 'Foundations', detail: 'On-page fundamentals set right.' },
                    { label: 'Partner execution', detail: 'Specialist runs ongoing work.' },
                    { label: 'Monthly review', detail: 'Reporting checked by us.' },
                  ],
                },
              },
              {
                title: 'Paid acquisition', desc: 'Campaign strategy and reporting managed by ZetaCode, executed by vetted specialist partners.', href: '/services/paid-acquisition', flag: 'Partner-led',
                brief: {
                  deliverables: ['Channel strategy', 'Landing alignment', 'Partner campaigns', 'Performance reporting'],
                  process: 'Strategy stays with us; a partner runs execution.',
                  proof: 'Site and ad spend aligned, instead of fighting each other.',
                  cta: 'See how paid acquisition is managed',
                  workflow: [
                    { label: 'Channel strategy', detail: 'Platforms and budget set.' },
                    { label: 'Landing alignment', detail: 'Pages matched to campaigns.' },
                    { label: 'Partner execution', detail: 'Specialist runs the campaigns.' },
                    { label: 'Performance review', detail: 'Checked against real enquiries.' },
                  ],
                },
              },
              {
                title: 'Care plan', desc: 'Optional ongoing technical reliability and conversion improvement after launch.', href: '/care-plan', flag: null,
                brief: {
                  deliverables: ['Uptime monitoring', 'Content updates', 'Conversion reviews', 'Priority fixes'],
                  process: 'Optional monthly retainer, scoped to your site.',
                  proof: 'Launch is the start, not the finish line.',
                  cta: 'Learn about the care plan',
                  workflow: [
                    { label: 'Monitoring', detail: 'Uptime and security tracked.' },
                    { label: 'Content updates', detail: 'Pages kept current.' },
                    { label: 'Conversion review', detail: 'Funnel performance checked.' },
                    { label: 'Priority fixes', detail: 'Fast-tracked when needed.' },
                  ],
                },
              },
            ]}
          />
        </div>
      </section>

      {/* ── 6. INDUSTRY FIT ── */}
      <section aria-labelledby="industries-heading" style={{ background: 'var(--color-white)', padding: 'var(--space-7) var(--space-5)' }}>
        <div style={W}>
          <SectionLabel>Who we build for</SectionLabel>
          <h2 id="industries-heading" style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)', marginBottom: 'var(--space-5)' }}>Industries we know well</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-3)' }}>
            {[
              { title: 'Construction & trades', desc: 'Contractors, builders, renovators, and installers who need to win trust before they win the quote.', href: '/industries/construction-trades' },
              { title: 'Property & interiors', desc: 'Real estate, architecture, and interior design firms whose website should reflect the standard of their work.', href: '/industries/property-interiors' },
              { title: 'Health & clinics', desc: 'Clinics and appointment-driven health businesses where trust and booking simplicity decide the conversion.', href: '/industries/health-clinics' },
            ].map(i => (
              <a key={i.href} href={i.href} className="industries-card" style={{ display: 'block', textDecoration: 'none', background: 'var(--color-canvas)', border: '1px solid var(--color-border)', borderRadius: '4px', padding: 'var(--space-4)', color: 'var(--color-ink)', transition: 'border-color var(--duration-fast) var(--ease-standard)' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', marginBottom: 'var(--space-1)' }}>{i.title}</h3>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-ink-muted)', lineHeight: 'var(--leading-normal)' }}>{i.desc}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. PROCESS ── */}
      <section aria-labelledby="process-heading" style={{ background: 'var(--color-canvas)', padding: 'var(--space-7) var(--space-5)' }}>
        <div style={W}>
          <SectionLabel>How it works</SectionLabel>
          <h2 id="process-heading" style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)', marginBottom: 'var(--space-5)' }}>Strategy before screens.</h2>
          <ol style={{ listStyle: 'none', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 'var(--space-3)' }}>
            {['Discover','Clarify','Design','Build','Improve'].map((step, i) => (
              <li key={step} style={{ borderTop: '2px solid var(--color-lime)', paddingTop: 'var(--space-2)' }}>
                <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-olive)', display: 'block', marginBottom: '4px' }}>0{i + 1}</span>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-md)', fontWeight: 600 }}>{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── 8. SELECTED WORK ── */}
      <section aria-labelledby="work-heading" style={{ background: 'var(--color-white)', padding: 'var(--space-7) var(--space-5)' }}>
        <div style={W}>
          <SectionLabel>Selected work</SectionLabel>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', flexWrap: 'wrap', gap: 'var(--space-3)', marginBottom: 'var(--space-5)' }}>
            <h2 id="work-heading" style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)' }}>Real projects, real scope.</h2>
            <a href="/work" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontSize: 'var(--text-sm)', color: 'var(--color-ink)', fontWeight: 600, textDecoration: 'none', minHeight: '44px', flexShrink: 0 }}>
              View all work →
            </a>
          </div>
          {/* BRAND/PROOF: three reserved slots — communicate the structure of
              what's coming and reinforce the proof rules (Section 4.3): no
              invented testimonials, no concept work presented as paid projects.
              Each card will carry real scope, real screenshots, and verified
              client permission before it goes live. The placeholder text
              says exactly that — it's not a gap, it's the honesty principle
              made visible. */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-3)' }}>
            {[
              { industry: 'Construction & trades', type: 'Conversion website' },
              { industry: 'Property & interiors', type: 'Conversion website + SEO' },
              { industry: 'Health & clinics', type: 'Conversion website' },
            ].map((slot) => (
              <div
                key={slot.industry}
                style={{
                  border: '1px solid var(--color-border)',
                  borderTop: '2px solid var(--color-lime)',
                  padding: 'var(--space-4)',
                  background: 'var(--color-canvas)',
                  minHeight: '200px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-olive)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 'var(--space-1)' }}>
                    {slot.industry}
                  </p>
                  <p style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-md)', color: 'var(--color-ink)', marginBottom: 'var(--space-2)' }}>
                    {slot.type}
                  </p>
                </div>
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-olive)', lineHeight: 'var(--leading-normal)' }}>
                  Case study published once client permissions are confirmed.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 9. FOUNDER CREDIBILITY ── */}
      <section aria-labelledby="founder-heading" style={{ background: 'var(--color-canvas)', padding: 'var(--space-7) var(--space-5)' }}>
        <div style={{ ...W, maxWidth: '720px' }}>
          <SectionLabel>Who's behind this</SectionLabel>
          <h2 id="founder-heading" style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)', marginBottom: 'var(--space-3)' }}>
            Built by someone who's done this before.
          </h2>
          <p style={{ fontSize: 'var(--text-base)', lineHeight: 'var(--leading-normal)', color: 'var(--color-ink-muted)', marginBottom: 'var(--space-2)' }}>
            ZetaCode is a focused website studio. Every project is handled directly — no handoffs
            to junior staff, no bloated process, no creative theatre that doesn't serve the brief.
          </p>
          <p style={{ fontSize: 'var(--text-base)', lineHeight: 'var(--leading-normal)', color: 'var(--color-ink-muted)', marginBottom: 'var(--space-3)' }}>
            The working principle is simple: a website's job is to earn trust and guide a
            decision — not to impress designers or satisfy a brief for its own sake. Strategy
            comes before screens. Structure before styling. Business outcome before visual ambition.
          </p>
          <a href="/about" style={{ fontSize: 'var(--text-sm)', color: 'var(--color-ink)', fontWeight: 600, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', minHeight: '44px' }}>
            Read more about ZetaCode →
          </a>
        </div>
      </section>

      {/* ── 10. CARE PLAN ── */}
      <section aria-labelledby="care-heading" style={{ background: 'var(--color-white)', padding: 'var(--space-7) var(--space-5)' }}>
        <div style={W}>
          <SectionLabel>After launch</SectionLabel>
          <h2 id="care-heading" style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)', marginBottom: 'var(--space-3)' }}>
            Launch is the start, not the finish line.
          </h2>
          <p style={{ fontSize: 'var(--text-base)', lineHeight: 'var(--leading-normal)', color: 'var(--color-ink-muted)', maxWidth: '600px', marginBottom: 'var(--space-4)' }}>
            Websites drift — content goes stale, technical debt creeps in, conversion paths get
            overlooked. The optional care plan keeps your site technically reliable and commercially
            useful long after launch.
          </p>
          <a href="/care-plan" style={{ fontSize: 'var(--text-sm)', color: 'var(--color-ink)', fontWeight: 600, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', minHeight: '44px' }}>
            Learn about the care plan →
          </a>
        </div>
      </section>

      {/* ── 11. FINAL CONVERSION ── */}
      <section aria-labelledby="cta-heading" style={{ ...DARK, padding: 'var(--space-8) var(--space-5)' }}>
        <div style={{ ...W, maxWidth: '720px', textAlign: 'center' }}>
          <h2 id="cta-heading" style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', color: 'var(--color-canvas)', marginBottom: 'var(--space-3)' }}>
            Ready to stop settling?
          </h2>
          <p style={{ fontSize: 'var(--text-base)', color: 'var(--color-canvas)', opacity: 0.8, marginBottom: 'var(--space-5)' }}>
            Book a discovery call if you're ready to talk. Request a proposal if you need to brief us first.
            Proposal requests receive a response within one business day.
          </p>
          <div style={{ display: 'flex', gap: 'var(--space-2)', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button href="/book-a-call" variant="primary">Book a discovery call</Button>
            <Button href="/request-a-proposal" variant="secondary" theme="dark">Request a proposal</Button>
          </div>
        </div>
      </section>

    </main>
  );
}
