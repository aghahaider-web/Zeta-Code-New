// app/api/slots/route.ts — returns open slots for the booking widget
// RLS policy "public_read_open_slots" handles access at DB layer
import { NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase-server';

// ARCH: this route has no dynamic Next.js APIs in it (no cookies(),
// headers(), searchParams), so without this flag Next treats it as a
// static-optimization candidate and calls GET() *at build time* to cache
// the response. That means it tries to construct a Supabase client with
// zero request context and, if env vars aren't present in the build
// environment, the entire production build fails rather than just this
// endpoint failing at request time. Slot availability is inherently
// live data — it must never be statically cached in the first place.
export const dynamic = 'force-dynamic';

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
