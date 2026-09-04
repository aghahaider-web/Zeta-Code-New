// app/dashboard/leads/page.tsx — Lead list (Section 7.4)
// Supports search, status filter, sorting. No lead deletion — archive only.
export const metadata = { robots: { index: false, follow: false } };
import { supabaseDashboard } from '@/lib/supabase-server';
import Link from 'next/link';

const STATUSES = [
  'new','contacted','qualified','discovery_booked','proposal_in_progress',
  'proposal_sent','won','lost','nurture','archived',
] as const;

// Cache Intl.DateTimeFormat to avoid recreating it in the render loop, which blocks the main thread
const dateFormatter = new Intl.DateTimeFormat();

export default async function LeadsPage({
  searchParams,
}: { searchParams: { status?: string; q?: string } }) {
  const db = supabaseDashboard();
  let query = db.from('leads').select('id,full_name,business_email,company_name,status,budget_band,created_at')
    .order('created_at', { ascending: false });

  if (searchParams.status) query = query.eq('status', searchParams.status);
  if (searchParams.q) query = query.ilike('full_name', `%${searchParams.q}%`);

  const { data: leads } = await query;

  return (
    <main style={{ padding: '2rem', fontFamily: 'var(--font-body)' }}>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)', marginBottom: '1.5rem' }}>
        Leads
      </h1>
      <form style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', alignItems: 'center' }}>
        <input name="q" defaultValue={searchParams.q} placeholder="Search by name" aria-label="Search leads by name"
          style={{ padding: '0.5rem', border: '1px solid var(--color-border)', borderRadius: 4, flex: 1, maxWidth: '300px' }} />
        <select name="status" defaultValue={searchParams.status} aria-label="Filter leads by status" style={{ padding: '0.5rem', border: '1px solid var(--color-border)', borderRadius: 4, background: 'var(--color-white)' }}>
          <option value="">All statuses</option>
          {STATUSES.map(s => <option key={s} value={s}>{s.replace(/_/g,' ')}</option>)}
        </select>
        <button type="submit" style={{ minHeight: '44px', padding: '0 1.5rem', background: 'var(--color-ink)', color: 'var(--color-canvas)', border: 'none', borderRadius: '4px', fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: 'var(--text-sm)', cursor: 'pointer' }}>Filter</button>
      </form>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 'var(--text-sm)' }}>
        <thead>
          <tr>{['Name','Email','Company','Status','Budget','Date'].map(h =>
            <th key={h} style={{ textAlign:'left', padding:'0.5rem', borderBottom:'1px solid var(--color-border)' }}>{h}</th>
          )}</tr>
        </thead>
        <tbody>
          {leads && leads.length > 0 ? (
            leads.map(l => (
              <tr key={l.id}>
                <td style={{ padding:'0.5rem' }}><Link href={`/dashboard/leads/${l.id}`}>{l.full_name}</Link></td>
                <td style={{ padding:'0.5rem' }}>{l.business_email}</td>
                <td style={{ padding:'0.5rem' }}>{l.company_name}</td>
                <td style={{ padding:'0.5rem' }}>{l.status}</td>
                <td style={{ padding:'0.5rem' }}>{l.budget_band}</td>
                <td style={{ padding:'0.5rem' }}>{dateFormatter.format(new Date(l.created_at))}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-ink-muted)' }}>
                <p style={{ marginBottom: '0.5rem' }}>No leads found.</p>
                {(searchParams.q || searchParams.status) && (
                  <Link href="/dashboard/leads" style={{ color: 'var(--color-ink)', textDecoration: 'underline', fontWeight: 500 }}>
                    Clear filters
                  </Link>
                )}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </main>
  );
}
