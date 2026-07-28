// app/api/slots/route.ts — returns open slots for the booking widget
// RLS policy "public_read_open_slots" handles access at DB layer
import { NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase-server';

export async function GET() {
  const db = supabaseServer();
  const { data, error } = await db
    .from('time_slots')
    .select('id, start_utc, end_utc')
    .eq('status', 'open')
    .order('start_utc', { ascending: true });

  if (error) return NextResponse.json({ error: 'Failed to load slots' }, { status: 500 });
  return NextResponse.json(data ?? []);
}
