import { supabase } from './supabase';
import type { Role } from './types';

type MembersAction =
  | { action: 'invite'; email: string; full_name: string; organisation: string; role: Role; space_ids: string[] }
  | { action: 'revoke' | 'restore' | 'delete'; user_id: string };

// Actions that need the Supabase service key run in the Vercel function at /api/members.
export async function membersApi(body: MembersAction): Promise<void> {
  const { data } = await supabase.auth.getSession();
  const res = await fetch('/api/members', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${data.session?.access_token ?? ''}` },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const payload = (await res.json().catch(() => null)) as { error?: string } | null;
    throw new Error(payload?.error ?? `Request failed (${res.status})`);
  }
}
