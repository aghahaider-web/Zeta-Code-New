// app/dashboard/page.tsx — Dashboard home (Section 7.1)
// Noindex enforced via layout metadata. Auth gate: middleware.ts
import { supabaseDashboard } from '@/lib/supabase-server';
import { redirect } from 'next/navigation';
export const metadata = { robots: { index: false, follow: false } };

export default async function DashboardHome() {
  const db = supabaseDashboard();
  const { data: { session } } = await db.auth.getSession();
  if (!session) redirect('/dashboard/login');

  const [{ count: newLeads }, { count: bookings }] = await Promise.all([
    db.from('leads').select('*', { count: 'exact', head: true }).eq('status', 'new'),
    db.from('bookings').select('*', { count: 'exact', head: true }).eq('booking_state', 'confirmed'),
  ]);

  return (
    <main style={{ padding: '2rem', fontFamily: 'var(--font-body)' }}>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)' }}>
        Dashboard
      </h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginTop: '2rem' }}>
        <StatCard label="New leads" value={newLeads ?? 0} />
        <StatCard label="Confirmed bookings" value={bookings ?? 0} />
      </div>
      <nav style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
        <a href="/dashboard/leads">Leads</a>
        <a href="/dashboard/bookings">Bookings</a>
        <a href="/dashboard/availability">Availability</a>
      </nav>
    </main>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div style={{ border: '1px solid var(--color-border)', borderRadius: 4, padding: '1.5rem' }}>
      <p style={{ color: 'var(--color-olive)', fontSize: 'var(--text-sm)' }}>{label}</p>
      <p style={{ fontSize: 'var(--text-xl)', fontFamily: 'var(--font-display)' }}>{value}</p>
    </div>
  );
}
