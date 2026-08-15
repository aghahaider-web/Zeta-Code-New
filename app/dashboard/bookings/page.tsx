// app/dashboard/bookings/page.tsx
export const metadata = { robots: { index: false, follow: false } };
import { supabaseDashboard } from '@/lib/supabase-server';

export default async function BookingsPage() {
  const db = supabaseDashboard();
  const { data: bookings } = await db
    .from('bookings')
    .select('id,booking_state,visitor_timezone,created_at,lead_id,slot_id,leads(full_name,business_email),time_slots(start_utc,end_utc)')
    .order('created_at', { ascending: false });

  return (
    <main style={{ padding: '2rem', fontFamily: 'var(--font-body)' }}>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)', marginBottom: '1.5rem' }}>
        Bookings
      </h1>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 'var(--text-sm)' }}>
        <thead>
          <tr>{['Name','Email','Slot (UTC)','State','Timezone'].map(h =>
            <th key={h} style={{ textAlign:'left', padding:'0.5rem', borderBottom:'1px solid var(--color-border)' }}>{h}</th>
          )}</tr>
        </thead>
        <tbody>
          {bookings && bookings.length > 0 ? (
            bookings.map((b: any) => (
              <tr key={b.id}>
                <td style={{ padding:'0.5rem' }}>{b.leads?.full_name}</td>
                <td style={{ padding:'0.5rem' }}>{b.leads?.business_email}</td>
                <td style={{ padding:'0.5rem' }}>{b.time_slots?.start_utc}</td>
                <td style={{ padding:'0.5rem' }}>{b.booking_state}</td>
                <td style={{ padding:'0.5rem' }}>{b.visitor_timezone}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-ink-muted)' }}>
                <p style={{ marginBottom: '0.5rem' }}>No bookings found.</p>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </main>
  );
}
