// src/lib/supabase-server.ts
// Server-side Supabase client — uses service role for API routes that need
// to write past RLS (public booking/proposal inserts). Never expose this
// key to the client. Section 11.3 — secrets stay in deployment env only.
import { createClient } from '@supabase/supabase-js';

export function supabaseServer() {
  return createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );
}

// Dashboard-authenticated client — respects RLS via user's own session.
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export function supabaseDashboard() {
  const cookieStore = cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        get: (name: string) => cookieStore.get(name)?.value,
      },
    }
  );
}

