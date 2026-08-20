// app/(public)/request-a-proposal/page.tsx — Section 6.3 full field capture
'use client';
import { useState, useEffect } from 'react';
import { SectionLabel } from '@/components/ui/SectionLabel';

const W: React.CSSProperties = { maxWidth: '720px', margin: '0 auto', padding: '0 var(--space-5)' };
const inp: React.CSSProperties = { width: '100%', padding: '0.625rem 0.75rem', border: '1px solid var(--color-border)', borderRadius: '4px', fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-2)' };
const lbl: React.CSSProperties = { display: 'block', fontSize: 'var(--text-sm)', fontWeight: 500, marginBottom: '4px' };

const BUDGETS = ['Under $1,500','$1,500–$3,000','$3,000–$5,000','$5,000–$10,000','$10,000+','Not sure yet'] as const;
const BUDGET_MAP: Record<string, string> = {
  'Under $1,500': 'under_1500', '$1,500–$3,000': '1500_3000', '$3,000–$5,000': '3000_5000',
  '$5,000–$10,000': '5000_10000', '$10,000+': '10000_plus', 'Not sure yet': 'not_sure',
};
const SERVICES = ['Conversion website','SEO','Paid acquisition','Care plan'];

export default function RequestProposalPage() {
  const [tz] = useState(() => Intl.DateTimeFormat().resolvedOptions().timeZone);
  const [utmData, setUtmData] = useState({ utm_source: '', utm_medium: '', utm_campaign: '', utm_term: '', utm_content: '', referrer: '', landing_page: '' });
  const [form, setForm] = useState({ full_name: '', business_email: '', company_name: '', country: '', website_url: '', industry: '', services_interested: [] as string[], business_challenge: '', primary_objective: '', budget_band: '', desired_timeline: '', project_details: '', consent_given: false, honeypot: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'done' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setUtmData({
      utm_source: params.get('utm_source') ?? '', utm_medium: params.get('utm_medium') ?? '',
      utm_campaign: params.get('utm_campaign') ?? '', utm_term: params.get('utm_term') ?? '',
      utm_content: params.get('utm_content') ?? '', referrer: document.referrer,
      landing_page: window.location.pathname,
    });
  }, []);

  function toggleService(s: string) {
    setForm(f => ({ ...f, services_interested: f.services_interested.includes(s) ? f.services_interested.filter(x => x !== s) : [...f.services_interested, s] }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.consent_given) { setErrorMsg('Please confirm your consent before submitting.'); return; }
    if (form.services_interested.length === 0) { setErrorMsg('Please select at least one service.'); return; }
    setStatus('submitting'); setErrorMsg('');
    const res = await fetch('/api/proposals', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, budget_band: BUDGET_MAP[form.budget_band] ?? 'not_sure', browser_timezone: tz, ...utmData }),
    });
    if (res.ok) { setStatus('done'); } else {
      const d = await res.json();
      setErrorMsg(d.error ?? 'Something went wrong. Please try again.');
      setStatus('error');
    }
  }

  if (status === 'done') return (
    <main style={{ padding: 'var(--space-8) var(--space-5)' }}>
      <div style={W}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)', marginBottom: 'var(--space-3)' }}>Request received.</h1>
        <p style={{ fontSize: 'var(--text-base)', color: 'var(--color-ink-muted)', lineHeight: 'var(--leading-normal)' }}>
          We'll respond within one business day. This confirms receipt only — not a proposal or commitment.
          If you need to correct anything, reply to the confirmation email.
        </p>
      </div>
    </main>
  );

  return (
    <main style={{ padding: 'var(--space-8) var(--space-5) var(--space-7)' }}>
      <div style={W}>
        <SectionLabel>Request a proposal</SectionLabel>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', lineHeight: 'var(--leading-tight)', margin: 'var(--space-2) 0 var(--space-4)' }}>
          Tell us about your project.
        </h1>
        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-olive)', marginBottom: 'var(--space-5)' }}>
          We respond to all proposal requests within one business day.
        </p>
        <form onSubmit={handleSubmit} noValidate>
          <input name="honeypot" value={form.honeypot} onChange={e => setForm(f => ({ ...f, honeypot: e.target.value }))} style={{ display: 'none' }} tabIndex={-1} aria-hidden="true" />

          <label htmlFor="rp-name" style={lbl}>Full name *</label>
          <input id="rp-name" type="text" required value={form.full_name} onChange={e => setForm(f => ({ ...f, full_name: e.target.value }))} style={inp} />

          <label htmlFor="rp-email" style={lbl}>Business email *</label>
          <input id="rp-email" type="email" required value={form.business_email} onChange={e => setForm(f => ({ ...f, business_email: e.target.value }))} style={inp} />

          <label htmlFor="rp-company" style={lbl}>Company name *</label>
          <input id="rp-company" type="text" required value={form.company_name} onChange={e => setForm(f => ({ ...f, company_name: e.target.value }))} style={inp} />

          <label htmlFor="rp-country" style={lbl}>Country / market *</label>
          <input id="rp-country" type="text" required value={form.country} onChange={e => setForm(f => ({ ...f, country: e.target.value }))} style={inp} />

          <label htmlFor="rp-url" style={lbl}>Current website URL (if applicable)</label>
          <input id="rp-url" type="url" value={form.website_url} onChange={e => setForm(f => ({ ...f, website_url: e.target.value }))} style={inp} placeholder="https://" />

          <label htmlFor="rp-industry" style={lbl}>Industry *</label>
          <input id="rp-industry" type="text" required value={form.industry} onChange={e => setForm(f => ({ ...f, industry: e.target.value }))} style={inp} />

          <fieldset style={{ border: 'none', padding: 0, marginBottom: 'var(--space-2)' }}>
            <legend style={lbl}>Services of interest *</legend>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-1)', marginBottom: 'var(--space-2)' }}>
              {SERVICES.map(s => (
                <label key={s} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: 'var(--text-sm)', padding: '6px 12px', border: `1px solid ${form.services_interested.includes(s) ? 'var(--color-ink)' : 'var(--color-border)'}`, borderRadius: 'var(--radius-sm)', cursor: 'pointer', minHeight: '44px' }}>
                  <input type="checkbox" checked={form.services_interested.includes(s)} onChange={() => toggleService(s)} style={{ accentColor: 'var(--color-ink)' }} />
                  {s}
                </label>
              ))}
            </div>
          </fieldset>

          <label htmlFor="rp-challenge" style={lbl}>Current business challenge *</label>
          <textarea id="rp-challenge" required rows={3} value={form.business_challenge} onChange={e => setForm(f => ({ ...f, business_challenge: e.target.value }))} style={{ ...inp, resize: 'vertical' }} />

          <label htmlFor="rp-objective" style={lbl}>Primary objective *</label>
          <input id="rp-objective" type="text" required value={form.primary_objective} onChange={e => setForm(f => ({ ...f, primary_objective: e.target.value }))} style={inp} />

          <label htmlFor="rp-budget" style={lbl}>Approximate budget range *</label>
          <select id="rp-budget" required value={form.budget_band} onChange={e => setForm(f => ({ ...f, budget_band: e.target.value }))} style={{ ...inp, background: 'white' }}>
            <option value="">Select a range</option>
            {BUDGETS.map(b => <option key={b} value={b}>{b}</option>)}
          </select>

          <label htmlFor="rp-timeline" style={lbl}>Desired timeline *</label>
          <input id="rp-timeline" type="text" required value={form.desired_timeline} onChange={e => setForm(f => ({ ...f, desired_timeline: e.target.value }))} style={inp} placeholder="e.g. 4–6 weeks, ASAP, Q1 2026" />

          <label htmlFor="rp-details" style={lbl}>Project details (optional)</label>
          <textarea id="rp-details" rows={4} value={form.project_details} onChange={e => setForm(f => ({ ...f, project_details: e.target.value }))} style={{ ...inp, resize: 'vertical' }} />

          <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', fontSize: 'var(--text-sm)', lineHeight: 'var(--leading-normal)', marginBottom: 'var(--space-4)', cursor: 'pointer' }}>
            <input type="checkbox" required checked={form.consent_given} onChange={e => setForm(f => ({ ...f, consent_given: e.target.checked }))} style={{ marginTop: '3px', accentColor: 'var(--color-ink)', minWidth: '16px' }} />
            I agree to ZetaCode storing this information to respond to my enquiry. See our <a href="/privacy" style={{ color: 'var(--color-ink)', fontWeight: 600 }}>privacy policy</a>.
          </label>

          {errorMsg && <p role="alert" style={{ color: '#B91C1C', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-2)' }}>{errorMsg}</p>}

          <button type="submit" disabled={status === 'submitting'} aria-busy={status === 'submitting'} style={{ minHeight: '44px', padding: '0 1.75rem', background: 'var(--color-lime)', color: 'var(--color-ink)', border: 'none', borderRadius: 'var(--radius-sm)', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 'var(--text-sm)', cursor: 'pointer' }}>
            {status === 'submitting' ? 'Sending…' : 'Submit request'}
          </button>
        </form>
      </div>
    </main>
  );
}
