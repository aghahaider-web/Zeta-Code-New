// app/dashboard/availability/page.tsx — Admin manages slots (Section 6.2)
// No public user account, no external calendar sync at launch.
export const metadata = { robots: { index: false, follow: false } };
import { supabaseDashboard } from '@/lib/supabase-server';

export default async function AvailabilityPage() {
  const db = supabaseDashboard();
  const { data: slots } = await db
    .from('time_slots').select('*').order('start_utc', { ascending: true });

  return (
    <main style={{ padding: '2rem', fontFamily: 'var(--font-body)' }}>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)', marginBottom: '1.5rem' }}>
        Availability
      </h1>
      <p style={{ color: 'var(--color-olive)', marginBottom: '1.5rem', fontSize: 'var(--text-sm)' }}>
        Slots are created by the admin team. All times stored in UTC; visitor sees their local timezone.
        No external calendar sync at launch — manage exceptions manually.
      </p>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 'var(--text-sm)' }}>
        <thead>
          <tr>{['Start (UTC)','End (UTC)','Status','Capacity'].map(h =>
            <th key={h} style={{ textAlign:'left', padding:'0.5rem', borderBottom:'1px solid var(--color-border)' }}>{h}</th>
          )}</tr>
        </thead>
        <tbody>
          {slots && slots.length > 0 ? (
            slots.map(s => (
              <tr key={s.id}>
                <td style={{ padding:'0.5rem' }}>{s.start_utc}</td>
                <td style={{ padding:'0.5rem' }}>{s.end_utc}</td>
                <td style={{ padding:'0.5rem' }}>{s.status}</td>
                <td style={{ padding:'0.5rem' }}>{s.capacity}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-ink-muted)' }}>
                <p style={{ marginBottom: '0.5rem' }}>No availability slots found.</p>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </main>
  );
}
