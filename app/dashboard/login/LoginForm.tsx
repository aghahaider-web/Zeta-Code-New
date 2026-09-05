'use client';
import { useState } from 'react';
import { createBrowserClient } from '@supabase/ssr';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
  );

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) { setError(error.message); return; }
    // Hard navigate so middleware re-evaluates the new cookie
    window.location.replace('/dashboard');
  }

  return (
    <main style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', background:'var(--color-canvas)' }}>
      <form onSubmit={handleLogin} style={{ width:'100%', maxWidth:400, padding:'2rem' }}>
        <h1 style={{ fontFamily:'var(--font-display)', fontSize:'var(--text-xl)', marginBottom:'1.5rem' }}>
          Sign in
        </h1>
        {error && (
          <p role="alert" style={{ color:'#B91C1C', marginBottom:'1rem', fontSize:'var(--text-sm)' }}>{error}</p>
        )}
        <label htmlFor="email" style={{ display:'block', fontSize:'var(--text-sm)', fontWeight: 500, marginBottom:'0.25rem' }}>Email <span aria-hidden="true" style={{ color: '#B91C1C' }}>*</span></label>
        <input
          id="email" type="email" required aria-required="true" value={email}
          onChange={e => setEmail(e.target.value)}
          style={{ width:'100%', padding:'0.5rem', marginBottom:'1rem', border:'1px solid var(--color-border)', borderRadius:4 }}
        />
        <label htmlFor="password" style={{ display:'block', fontSize:'var(--text-sm)', fontWeight: 500, marginBottom:'0.25rem' }}>Password <span aria-hidden="true" style={{ color: '#B91C1C' }}>*</span></label>
        <input
          id="password" type="password" required aria-required="true" value={password}
          onChange={e => setPassword(e.target.value)}
          style={{ width:'100%', padding:'0.5rem', marginBottom:'1.5rem', border:'1px solid var(--color-border)', borderRadius:4 }}
        />
        <button
          type="submit"
          disabled={loading}
          aria-busy={loading}
          style={{ width:'100%', padding:'0.75rem', background:'var(--color-ink)', color:'var(--color-canvas)', border:'none', borderRadius:4, cursor: loading ? 'wait' : 'pointer', fontFamily:'var(--font-body)', opacity: loading ? 0.7 : 1, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
        >
          {loading ? (
            <>
              <svg className="animate-spin" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56" /></svg>
              Signing in…
            </>
          ) : 'Sign in'}
        </button>
        <p style={{ fontSize:'var(--text-sm)', color:'var(--color-olive)', marginTop:'1rem' }}>
          MFA is enforced for all team accounts. You will be prompted for a second factor after sign-in.
        </p>
      </form>
    </main>
  );
}
