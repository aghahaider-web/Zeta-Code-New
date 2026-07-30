// app/api/bookings/route.ts
// Section 6.2 — Booking Flow. Server verifies slot availability before
// creating a booking. Idempotent: relies on unique(slot_id) constraint.
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { supabaseServer } from '@/lib/supabase-server';

// ARCH: explicit — this route mutates live booking/lead/slot state and
// must never be statically cached or evaluated outside a real request.
export const dynamic = 'force-dynamic';

const bookingSchema = z.object({
  slot_id: z.string().uuid(),
  full_name: z.string().min(1).max(200),
  business_email: z.string().email(),
  company_name: z.string().max(200).optional(),
  visitor_timezone: z.string(),
  honeypot: z.string().max(0), // must stay empty — Section 6.5 anti-spam
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsed = bookingSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid submission' }, { status: 400 });
  }
  if (parsed.data.honeypot.length > 0) {
    return NextResponse.json({ error: 'Rejected' }, { status: 400 });
  }

  const db = supabaseServer();
  const { slot_id, full_name, business_email, company_name, visitor_timezone } = parsed.data;

  // Re-verify slot is still open server-side (never trust client state)
  const { data: slot, error: slotErr } = await db
    .from('time_slots').select('*').eq('id', slot_id).eq('status', 'open').single();

  if (slotErr || !slot) {
    return NextResponse.json({ error: 'Slot no longer available' }, { status: 409 });
  }

  // Create lead record
  const { data: lead, error: leadErr } = await db.from('leads').insert({
    full_name, business_email, company_name,
    status: 'discovery_booked', source: 'booking_flow',
    browser_timezone: visitor_timezone,
  }).select().single();

  if (leadErr || !lead) {
    return NextResponse.json({ error: 'Failed to create lead' }, { status: 500 });
  }

  // Atomic-ish booking creation: unique(slot_id) constraint prevents
  // double-booking race conditions at the database level.
  const { data: booking, error: bookingErr } = await db.from('bookings').insert({
    lead_id: lead.id, slot_id, visitor_timezone, booking_state: 'confirmed',
  }).select().single();

  if (bookingErr) {
    return NextResponse.json({ error: 'Slot was just taken' }, { status: 409 });
  }

  await db.from('time_slots').update({ status: 'booked' }).eq('id', slot_id);

  await db.from('lead_activity').insert({
    lead_id: lead.id, action_type: 'booking_created', actor: 'system',
  });

  // Transactional email + internal alert handled by /lib/notifications
  // (Resend integration — see src/lib/notifications.ts). Failure here
  // must not fail the booking itself — logged to notification_log with
  // a retry procedure per Section 6.5.
  try {
    const { sendBookingConfirmation, notifyTeamOfBooking } = await import('@/lib/notifications');
    await sendBookingConfirmation(business_email, full_name, slot);
    await notifyTeamOfBooking(lead, slot);
  } catch (e) {
    await db.from('notification_log').insert({
      event: 'booking_confirmation', recipient: business_email,
      delivery_state: 'failed', failure_details: String(e),
    });
  }

  return NextResponse.json({ booking_id: booking.id, status: 'confirmed' });
}
