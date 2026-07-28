// app/dashboard/leads/page.tsx — Lead list (Section 7.4)
// Supports search, status filter, sorting. No lead deletion — archive only.
export const metadata = { robots: { index: false, follow: false } };
import { supabaseDashboard } from '@/lib/supabase-server';

const STATUSES = [
  'new','contacted','qualified','discovery_booked','proposal_in_progress',
  'proposal_sent','won','lost','nurture','archived',
] as const;

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
      <form style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
        <input name="q" defaultValue={searchParams.q} placeholder="Search by name"
          style={{ padding: '0.5rem', border: '1px solid var(--color-border)', borderRadius: 4 }} />
        <select name="status" defaultValue={searchParams.status}>
          <option value="">All statuses</option>
          {STATUSES.map(s => <option key={s} value={s}>{s.replace(/_/g,' ')}</option>)}
        </select>
        <button type="submit">Filter</button>
      </form>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 'var(--text-sm)' }}>
        <thead>
          <tr>{['Name','Email','Company','Status','Budget','Date'].map(h =>
            <th key={h} style={{ textAlign:'left', padding:'0.5rem', borderBottom:'1px solid var(--color-border)' }}>{h}</th>
          )}</tr>
        </thead>
        <tbody>
          {leads?.map(l => (
            <tr key={l.id}>
              <td style={{ padding:'0.5rem' }}><a href={`/dashboard/leads/${l.id}`}>{l.full_name}</a></td>
              <td style={{ padding:'0.5rem' }}>{l.business_email}</td>
              <td style={{ padding:'0.5rem' }}>{l.company_name}</td>
              <td style={{ padding:'0.5rem' }}>{l.status}</td>
              <td style={{ padding:'0.5rem' }}>{l.budget_band}</td>
              <td style={{ padding:'0.5rem' }}>{new Date(l.created_at).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
