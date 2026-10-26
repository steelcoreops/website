// Vercel function: member actions that need the Supabase service key.
// Every call must carry the signed-in user's access token, and that user must be an active admin.

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const FOREVER = '876000h'; // ~100 years; Supabase has no permanent ban, so this stands in for one.
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const json = (status: number, body: unknown) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' } });

type Body = {
  action?: string;
  user_id?: string;
  email?: string;
  full_name?: string;
  organisation?: string;
  role?: string;
  space_ids?: string[];
};

export async function POST(req: Request): Promise<Response> {
  if (!SUPABASE_URL || !SERVICE_KEY) return json(500, { error: 'The server is missing its Supabase settings.' });

  const admin = createClient(SUPABASE_URL, SERVICE_KEY, { auth: { persistSession: false, autoRefreshToken: false } });

  const token = req.headers.get('authorization')?.replace(/^Bearer\s+/i, '');
  if (!token) return json(401, { error: 'Not signed in.' });
  const { data: auth } = await admin.auth.getUser(token);
  if (!auth.user) return json(401, { error: 'Your session has expired. Sign in again.' });
  const { data: caller } = await admin.from('profiles').select('id, role, active').eq('id', auth.user.id).maybeSingle();
  if (!caller || caller.role !== 'admin' || !caller.active) return json(403, { error: 'Only the Steel Core team can do this.' });

  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return json(400, { error: 'Invalid request.' });
  }

  if (body.action === 'invite') {
    const email = String(body.email ?? '').trim().toLowerCase();
    if (!EMAIL.test(email)) return json(400, { error: 'Enter a valid email address.' });
    const role = body.role === 'admin' ? 'admin' : 'member';
    const fullName = String(body.full_name ?? '').trim() || null;
    const siteUrl = process.env.SITE_URL || new URL(req.url).origin;

    const { data, error } = await admin.auth.admin.inviteUserByEmail(email, { data: { full_name: fullName }, redirectTo: siteUrl });
    if (error || !data.user) {
      const exists = error?.status === 422 || /already/i.test(error?.message ?? '');
      return json(exists ? 409 : 500, {
        error: exists ? 'That email already has an account. Find them in the list and restore or edit their access.' : error?.message ?? 'Invite failed.',
      });
    }

    const userId = data.user.id;
    const { error: profileError } = await admin.from('profiles').upsert({
      id: userId,
      email,
      full_name: fullName,
      organisation: String(body.organisation ?? '').trim() || null,
      role,
      active: true,
    });
    if (profileError) return json(500, { error: profileError.message });

    const spaceIds = Array.isArray(body.space_ids) ? body.space_ids.filter((id) => typeof id === 'string') : [];
    if (role === 'member' && spaceIds.length) {
      const { error: linkError } = await admin.from('space_members').insert(spaceIds.map((space_id) => ({ space_id, user_id: userId })));
      if (linkError) return json(500, { error: linkError.message });
    }
    return json(200, { ok: true, user_id: userId });
  }

  const userId = String(body.user_id ?? '');
  if (!userId) return json(400, { error: 'Missing user.' });
  if (userId === caller.id && body.action !== 'restore') return json(400, { error: 'You cannot remove your own access.' });

  switch (body.action) {
    case 'revoke': {
      // Flip the flag first: row-level security blocks content on it immediately, even before the ban lands.
      const { error } = await admin.from('profiles').update({ active: false }).eq('id', userId);
      if (error) return json(500, { error: error.message });
      const ban = await admin.auth.admin.updateUserById(userId, { ban_duration: FOREVER });
      if (ban.error) return json(500, { error: ban.error.message });
      return json(200, { ok: true });
    }
    case 'restore': {
      const unban = await admin.auth.admin.updateUserById(userId, { ban_duration: 'none' });
      if (unban.error) return json(500, { error: unban.error.message });
      const { error } = await admin.from('profiles').update({ active: true }).eq('id', userId);
      if (error) return json(500, { error: error.message });
      return json(200, { ok: true });
    }
    case 'delete': {
      const { error } = await admin.auth.admin.deleteUser(userId);
      if (error) return json(500, { error: error.message });
      return json(200, { ok: true });
    }
    default:
      return json(400, { error: 'Unknown action.' });
  }
}
