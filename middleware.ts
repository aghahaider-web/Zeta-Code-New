// middleware.ts â€” Route protection for dashboard + studio (Section 7.1/7.2)
// Runs at the edge before every matching request.
import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        get: (name) => req.cookies.get(name)?.value,
        set: (name, value, options) => { res.cookies.set({ name, value, ...options }); },
        remove: (name, options) => { res.cookies.set({ name, value: '', ...options }); },
      },
    }
  );

  const { data: { session } } = await supabase.auth.getSession();

  const isLoginRoute = req.nextUrl.pathname.startsWith('/dashboard/login');

  const isProtected =
    (req.nextUrl.pathname.startsWith('/dashboard') && !isLoginRoute) ||
    req.nextUrl.pathname.startsWith('/studio');

  if (isProtected && !session) {
    const loginUrl = req.nextUrl.clone();
    loginUrl.pathname = '/dashboard/login';
    return NextResponse.redirect(loginUrl);
  }

  return res;
}

export const config = {
  matcher: ['/dashboard/:path*', '/studio/:path*'],
};


