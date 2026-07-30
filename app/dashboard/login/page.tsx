// app/dashboard/login/page.tsx — Supabase email/password + MFA (Section 7.2)
// ARCH: segment config (`dynamic`) can only be exported from a Server
// Component — it cannot live in a 'use client' file. This page stays a
// plain server component solely to carry that config; the actual form,
// state, and createBrowserClient() call live in ./LoginForm (client).
// force-dynamic matters here specifically because createBrowserClient()
// runs unconditionally in the client component's render body — without
// this, Next's build-time static-optimization pass would still attempt
// to produce an HTML shell for this route and, with no env vars present
// in the build environment, that construction throws and fails the whole
// production build instead of just this page at request time. Auth pages
// are inherently per-request anyway, so there is no static-generation
// benefit being given up here.
import { LoginForm } from './LoginForm';

export const dynamic = 'force-dynamic';

export default function LoginPage() {
  return <LoginForm />;
}
