// app/(public)/book-a-call/page.tsx
// Section 6.2 — Booking flow. Slots admin-created, UTC-stored, visitor timezone shown.
// No external calendar sync, no public user accounts.
'use client';
import type { Metadata } from 'next';
import { useState, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/Button';
import { SectionLabel } from '@/components/ui/SectionLabel';

const W: React.CSSProperties = { maxWidth: '640px', margin: '0 auto', padding: '0 var(--space-5)' };
const inputStyle: React.CSSProperties = {
  width: '100%', padding: '0.625rem 0.75rem',
  border: '1px solid var(--color-border)', borderRadius: '4px',
  fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-2)',
};

type Slot = { id: string; start_utc: string; end_utc: string };

export default function BookACallPage() {
  const [slots, setSlots] = useState<Slot[]>([]);
  const [selected, setSelected] = useState('');
  const [tz] = useState(() => Intl.DateTimeFormat().resolvedOptions().timeZone);
  const [form, setForm] = useState({ full_name: '', business_email: '', company_name: '', honeypot: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'done' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  // ⚡ Bolt: Cache formatter to avoid expensive re-instantiation in loops
  const dateFormatter = useMemo(() => new Intl.DateTimeFormat('en-GB', {
    timeZone: tz,
    dateStyle: 'medium',
    timeStyle: 'short'
  }), [tz]);

  useEffect(() => {
    fetch('/api/slots')
      .then(r => r.json())
      .then(data => {
        // Ensure data is an array; if API returns error object or null, default to empty array
        if (Array.isArray(data)) setSlots(data);
        else setSlots([]);
      })
      .catch(() => setSlots([])); // Network error or JSON parse error
  }, []);

  function formatSlot(utc: string) {
    return dateFormatter.format(new Date(utc));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selected) { setErrorMsg('Please select a time slot.'); return; }
    setStatus('submitting');
    const res = await fetch('/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, slot_id: selected, visitor_timezone: tz }),
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
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)', marginBottom: 'var(--space-3)' }}>Your call is confirmed.</h1>
        <p style={{ fontSize: 'var(--text-base)', color: 'var(--color-ink-muted)', lineHeight: 'var(--leading-normal)' }}>
          Check your email for a confirmation. We'll be in touch with meeting details.
          Need to make a change? Reply to the confirmation email.
        </p>
      </div>
    </main>
  );

  return (
    <main style={{ padding: 'var(--space-8) var(--space-5) var(--space-7)' }}>
      <div style={W}>
        <SectionLabel>Discovery call</SectionLabel>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', lineHeight: 'var(--leading-tight)', margin: 'var(--space-2) 0 var(--space-4)' }}>
          Book a discovery call.
        </h1>
        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-olive)', marginBottom: 'var(--space-4)' }}>
          Times shown in your local timezone: <strong>{tz}</strong>
        </p>
        <form onSubmit={handleSubmit} noValidate>
          {/* Honeypot — hidden from real users, Section 6.5 */}
          <input name="honeypot" value={form.honeypot} onChange={e => setForm(f => ({ ...f, honeypot: e.target.value }))}
            style={{ display: 'none' }} tabIndex={-1} aria-hidden="true" />

          <fieldset style={{ border: 'none', padding: 0, marginBottom: 'var(--space-4)' }}>
            <legend style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-md)', marginBottom: 'var(--space-3)', fontWeight: 600 }}>
              Select a time
            </legend>
            {slots.length === 0
              ? <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-olive)' }}>No slots currently available. Please check back or request a proposal instead.</p>
              : <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 'var(--space-1)' }}>
                  {slots.map(s => (
                    <label key={s.id} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: 'var(--text-sm)', padding: '0.5rem', border: `1px solid ${selected === s.id ? 'var(--color-ink)' : 'var(--color-border)'}`, borderRadius: '4px', minHeight: '44px' }}>
                      <input type="radio" name="slot" value={s.id} checked={selected === s.id} onChange={() => setSelected(s.id)} style={{ accentColor: 'var(--color-ink)' }} />
                      {formatSlot(s.start_utc)}
                    </label>
                  ))}
                </div>
            }
          </fieldset>

          <label htmlFor="bc-name" style={{ display: 'block', fontSize: 'var(--text-sm)', fontWeight: 500, marginBottom: '4px' }}>Full name</label>
          <input id="bc-name" type="text" required value={form.full_name} onChange={e => setForm(f => ({ ...f, full_name: e.target.value }))} style={inputStyle} />

          <label htmlFor="bc-email" style={{ display: 'block', fontSize: 'var(--text-sm)', fontWeight: 500, marginBottom: '4px' }}>Business email</label>
          <input id="bc-email" type="email" required value={form.business_email} onChange={e => setForm(f => ({ ...f, business_email: e.target.value }))} style={inputStyle} />

          <label htmlFor="bc-company" style={{ display: 'block', fontSize: 'var(--text-sm)', fontWeight: 500, marginBottom: '4px' }}>Company name</label>
          <input id="bc-company" type="text" value={form.company_name} onChange={e => setForm(f => ({ ...f, company_name: e.target.value }))} style={inputStyle} />

          {(status === 'error' || errorMsg) && (
            <p role="alert" style={{ color: '#B91C1C', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-2)' }}>{errorMsg}</p>
          )}
          <button type="submit" disabled={status === 'submitting'} aria-busy={status === 'submitting'} style={{ minHeight: '44px', padding: '0 1.75rem', background: 'var(--color-lime)', color: 'var(--color-ink)', border: 'none', borderRadius: '2px', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 'var(--text-sm)', cursor: 'pointer', marginTop: 'var(--space-2)' }}>
            {status === 'submitting' ? 'Booking…' : 'Confirm booking'}
          </button>
        </form>
        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-olive)', marginTop: 'var(--space-4)' }}>
          Not ready to book? <a href="/request-a-proposal" style={{ color: 'var(--color-ink)', fontWeight: 600 }}>Request a proposal instead.</a>
        </p>
      </div>
    </main>
  );
}
