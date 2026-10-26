import { useState, type FormEvent } from 'react';
import { Navigate, useLocation } from 'react-router';
import { StandalonePage } from '../components/Shell';
import { Button, Field, Input, Notice, Spinner } from '../components/ui';
import { useAuth } from '../lib/auth';
import { supabase } from '../lib/supabase';

export function Login() {
  const { loading, session } = useAuth();
  const location = useLocation();
  const from = (location.state as { from?: string } | null)?.from ?? '/';

  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [stage, setStage] = useState<'email' | 'sent'>('email');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(() => {
    // Expired or already-used links come back with the reason in the URL hash.
    const hash = new URLSearchParams(window.location.hash.slice(1));
    return hash.get('error_description')?.replace(/\+/g, ' ') ?? '';
  });

  if (loading) return <Spinner />;
  if (session) return <Navigate to={from} replace />;

  const sendLink = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError('');
    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim().toLowerCase(),
      options: { shouldCreateUser: false, emailRedirectTo: window.location.origin },
    });
    setBusy(false);
    // Unknown emails get the same response as known ones, so the form never reveals who has access.
    if (error && error.status === 429) {
      setError('Too many attempts. Wait a minute and try again.');
      return;
    }
    setStage('sent');
  };

  const verifyCode = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError('');
    const { error } = await supabase.auth.verifyOtp({ email: email.trim().toLowerCase(), token: code.trim(), type: 'email' });
    setBusy(false);
    if (error) setError('That code did not work. Check it, or request a new one.');
  };

  return (
    <StandalonePage eyebrow="Team Hub" title="Sign in">
      {stage === 'email' ? (
        <form onSubmit={sendLink} className="space-y-5">
          <p className="text-steel-base">For the Steel Core team and our delivery partners. Enter the email address we invited.</p>
          {error && <Notice tone="error">{error}</Notice>}
          <Field label="Email">
            <Input type="email" required autoComplete="email" autoFocus value={email} onChange={(e) => setEmail(e.target.value)} />
          </Field>
          <Button type="submit" disabled={busy} className="w-full">
            {busy ? 'Sending…' : 'Email me a sign-in link'}
          </Button>
        </form>
      ) : (
        <form onSubmit={verifyCode} className="space-y-5">
          <Notice tone="ok">
            If <strong>{email}</strong> has access, a sign-in email is on its way. Click the link in it, or enter the code below.
          </Notice>
          {error && <Notice tone="error">{error}</Notice>}
          <Field label="Code from the email">
            <Input
              inputMode="numeric"
              autoComplete="one-time-code"
              pattern="[0-9]{6,8}"
              required
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="font-mono tracking-[0.3em] text-lg"
            />
          </Field>
          <Button type="submit" disabled={busy} className="w-full">
            {busy ? 'Checking…' : 'Sign in'}
          </Button>
          <button type="button" onClick={() => setStage('email')} className="block mx-auto text-sm text-steel-base underline underline-offset-4">
            Use a different email
          </button>
        </form>
      )}
    </StandalonePage>
  );
}
