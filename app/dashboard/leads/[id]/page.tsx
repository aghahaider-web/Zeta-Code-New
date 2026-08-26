// app/dashboard/leads/[id]/page.tsx — Lead detail (Section 7.4)
export const metadata = { robots: { index: false, follow: false } };
import { supabaseDashboard } from '@/lib/supabase-server';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export default async function LeadDetail({ params }: { params: { id: string } }) {
  const db = supabaseDashboard();
  const { data: lead } = await db.from('leads').select('*').eq('id', params.id).single();
  if (!lead) notFound();

  const { data: notes } = await db.from('lead_notes').select('*')
    .eq('lead_id', params.id).order('created_at', { ascending: false });
  const { data: activity } = await db.from('lead_activity').select('*')
    .eq('lead_id', params.id).order('created_at', { ascending: false });

  const dateTimeFormatter = new Intl.DateTimeFormat('en-US', {
    year: 'numeric', month: 'numeric', day: 'numeric',
    hour: 'numeric', minute: 'numeric', second: 'numeric'
  });

  return (
    <main style={{ padding: '2rem', fontFamily: 'var(--font-body)', maxWidth: '900px' }}>
      <Link href="/dashboard/leads" style={{ fontSize: 'var(--text-sm)', color: 'var(--color-olive)' }}>
        ← Back to leads
      </Link>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)', margin: '1rem 0' }}>
        {lead.full_name}
      </h1>
      <dl style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem 2rem', marginBottom: '2rem' }}>
        {[
          ['Email', lead.business_email], ['Company', lead.company_name],
          ['Country', lead.country], ['Status', lead.status],
          ['Budget', lead.budget_band], ['Industry', lead.industry],
          ['Source', lead.source], ['UTM Source', lead.utm_source],
          ['Timezone', lead.browser_timezone], ['Created', dateTimeFormatter.format(new Date(lead.created_at))],
        ].map(([k, v]) => v ? (<><dt key={k} style={{ color:'var(--color-olive)', fontSize:'var(--text-sm)' }}>{k}</dt><dd key={`${k}v`}>{v}</dd></>) : null)}
      </dl>
      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontFamily:'var(--font-display)', fontSize:'var(--text-lg)', marginBottom:'1rem' }}>Brief</h2>
        <p>{lead.business_challenge}</p>
        {lead.project_details && <p style={{ marginTop:'0.5rem' }}>{lead.project_details}</p>}
      </section>
      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontFamily:'var(--font-display)', fontSize:'var(--text-lg)', marginBottom:'1rem' }}>Activity</h2>
        {activity?.map(a => (
          <p key={a.id} style={{ fontSize:'var(--text-sm)', color:'var(--color-olive)', marginBottom:'0.25rem' }}>
            {dateTimeFormatter.format(new Date(a.created_at))} — {a.action_type} ({a.actor})
          </p>
        ))}
      </section>
      <section>
        <h2 style={{ fontFamily:'var(--font-display)', fontSize:'var(--text-lg)', marginBottom:'1rem' }}>Notes</h2>
        {notes?.map(n => (
          <div key={n.id} style={{ borderLeft:'2px solid var(--color-border)', paddingLeft:'1rem', marginBottom:'1rem' }}>
            <p>{n.note_body}</p>
            <p style={{ fontSize:'var(--text-sm)', color:'var(--color-olive)' }}>{dateTimeFormatter.format(new Date(n.created_at))}</p>
          </div>
        ))}
      </section>
    </main>
  );
}
