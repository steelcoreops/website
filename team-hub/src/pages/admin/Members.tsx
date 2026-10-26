import { Search, UserPlus } from 'lucide-react';
import { useCallback, useEffect, useMemo, useState, type FormEvent } from 'react';
import { Badge, Button, Card, Checkbox, Eyebrow, Field, Input, Label, Notice, Select, Spinner, Title } from '../../components/ui';
import { membersApi } from '../../lib/api';
import { useAuth } from '../../lib/auth';
import { formatDate } from '../../lib/format';
import { supabase } from '../../lib/supabase';
import type { Profile, Role, Space } from '../../lib/types';

type Activity = { id: string; last_sign_in_at: string | null; email_confirmed_at: string | null };
type Member = Profile & { spaceIds: string[]; lastSignIn: string | null };
type Status = 'active' | 'invited' | 'revoked';

const statusOf = (m: Member): Status => (!m.active ? 'revoked' : m.lastSignIn ? 'active' : 'invited');

const ROLE_OPTIONS: { value: Role; label: string }[] = [
  { value: 'member', label: 'Member: sees the spaces they are given' },
  { value: 'admin', label: 'Steel Core team: sees and edits everything' },
];

export function Members() {
  const { profile: me } = useAuth();
  const [members, setMembers] = useState<Member[] | null>(null);
  const [spaces, setSpaces] = useState<Space[]>([]);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<Status | 'all'>('all');
  const [showInvite, setShowInvite] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);
  const [notice, setNotice] = useState<{ tone: 'ok' | 'error'; text: string } | null>(null);

  const load = useCallback(async () => {
    const [p, m, s, a] = await Promise.all([
      supabase.from('profiles').select('*').order('created_at'),
      supabase.from('space_members').select('space_id, user_id'),
      supabase.from('spaces').select('*').order('sort').order('name'),
      supabase.rpc('member_activity'),
    ]);
    const err = p.error ?? m.error ?? s.error ?? a.error;
    if (err) setNotice({ tone: 'error', text: err.message });
    const links = (m.data ?? []) as { space_id: string; user_id: string }[];
    const activity = new Map(((a.data ?? []) as Activity[]).map((x) => [x.id, x.last_sign_in_at]));
    setSpaces((s.data ?? []) as Space[]);
    setMembers(
      ((p.data ?? []) as Profile[]).map((profile) => ({
        ...profile,
        spaceIds: links.filter((l) => l.user_id === profile.id).map((l) => l.space_id),
        lastSignIn: activity.get(profile.id) ?? null,
      })),
    );
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return (members ?? []).filter(
      (m) =>
        (filter === 'all' || statusOf(m) === filter) &&
        (!q || [m.full_name, m.email, m.organisation].some((v) => v?.toLowerCase().includes(q))),
    );
  }, [members, query, filter]);

  const run = async (label: string, fn: () => Promise<void>) => {
    setNotice(null);
    try {
      await fn();
      setNotice({ tone: 'ok', text: label });
      await load();
    } catch (e) {
      setNotice({ tone: 'error', text: (e as Error).message });
    }
  };

  if (!members) return <Spinner />;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-16">
      <div className="flex flex-wrap items-end justify-between gap-6 mb-10">
        <div>
          <Eyebrow className="mb-6">Admin</Eyebrow>
          <Title text="People and access" className="text-[clamp(32px,5vw,48px)] mb-4" />
          <p className="text-steel-base max-w-[60ch]">
            Invite people, choose which spaces they see, and remove access when an engagement ends. Removing access takes effect
            immediately.
          </p>
        </div>
        <Button onClick={() => setShowInvite((v) => !v)}>
          <UserPlus size={15} /> Invite someone
        </Button>
      </div>

      {notice && (
        <div className="mb-6">
          <Notice tone={notice.tone}>{notice.text}</Notice>
        </div>
      )}

      {showInvite && (
        <InviteForm
          spaces={spaces}
          onCancel={() => setShowInvite(false)}
          onInvite={(body) =>
            run(`Invite sent to ${body.email}.`, async () => {
              await membersApi({ action: 'invite', ...body });
              setShowInvite(false);
            })
          }
        />
      )}

      <div className="flex flex-wrap gap-3 mb-4">
        <div className="relative flex-1 min-w-[220px]">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-steel-base" />
          <Input placeholder="Search name, email or organisation" value={query} onChange={(e) => setQuery(e.target.value)} className="pl-9" />
        </div>
        <Select value={filter} onChange={(e) => setFilter(e.target.value as Status | 'all')} className="!w-auto">
          <option value="all">Everyone ({members.length})</option>
          <option value="active">Active</option>
          <option value="invited">Invited, not signed in yet</option>
          <option value="revoked">Access removed</option>
        </Select>
      </div>

      <Card>
        <div className="hidden md:grid grid-cols-[1.6fr_1fr_1.4fr_auto] gap-4 px-5 py-3 border-b border-line bg-paper">
          {['Person', 'Access', 'Spaces', ''].map((h) => (
            <Label key={h} className="text-steel-base">
              {h}
            </Label>
          ))}
        </div>
        {visible.length === 0 && <p className="px-5 py-8 text-sm text-steel-base">No one matches.</p>}
        {visible.map((m) => (
          <div key={m.id} className="border-b border-line last:border-b-0">
            <MemberRow
              member={m}
              spaces={spaces}
              isMe={m.id === me?.id}
              onEdit={() => setEditing(editing === m.id ? null : m.id)}
              onRevoke={() =>
                confirm(`Remove access for ${m.email}? They will be signed out and blocked straight away.`) &&
                run(`Access removed for ${m.email}.`, () => membersApi({ action: 'revoke', user_id: m.id }))
              }
              onRestore={() => run(`Access restored for ${m.email}.`, () => membersApi({ action: 'restore', user_id: m.id }))}
              onDelete={() =>
                confirm(`Delete ${m.email} entirely? Their account is removed and cannot be recovered. To keep a record, remove access instead.`) &&
                run(`${m.email} deleted.`, () => membersApi({ action: 'delete', user_id: m.id }))
              }
            />
            {editing === m.id && (
              <EditMember
                member={m}
                spaces={spaces}
                isMe={m.id === me?.id}
                onDone={() => setEditing(null)}
                onSave={(patch) =>
                  run(`Saved changes for ${m.email}.`, async () => {
                    await saveMember(m.id, patch);
                    setEditing(null);
                  })
                }
              />
            )}
          </div>
        ))}
      </Card>
    </div>
  );
}

type MemberPatch = { full_name: string; organisation: string; role: Role; spaceIds: string[] };

async function saveMember(id: string, patch: MemberPatch) {
  const { error } = await supabase
    .from('profiles')
    .update({ full_name: patch.full_name.trim() || null, organisation: patch.organisation.trim() || null, role: patch.role })
    .eq('id', id);
  if (error) throw error;
  const del = await supabase.from('space_members').delete().eq('user_id', id);
  if (del.error) throw del.error;
  if (patch.role === 'member' && patch.spaceIds.length) {
    const ins = await supabase.from('space_members').insert(patch.spaceIds.map((space_id) => ({ space_id, user_id: id })));
    if (ins.error) throw ins.error;
  }
}

function MemberRow({
  member: m,
  spaces,
  isMe,
  onEdit,
  onRevoke,
  onRestore,
  onDelete,
}: {
  member: Member;
  spaces: Space[];
  isMe: boolean;
  onEdit: () => void;
  onRevoke: () => void;
  onRestore: () => void;
  onDelete: () => void;
}) {
  const status = statusOf(m);
  const linkClass = 'font-mono text-[11px] font-bold uppercase tracking-[0.12em] hover:underline underline-offset-4 disabled:opacity-40';
  return (
    <div className={`grid md:grid-cols-[1.6fr_1fr_1.4fr_auto] gap-x-4 gap-y-3 px-5 py-4 items-center ${status === 'revoked' ? 'bg-paper/60' : ''}`}>
      <div className="min-w-0">
        <div className="font-bold truncate">
          {m.full_name || m.email}
          {isMe && <span className="font-normal text-steel-base"> (you)</span>}
        </div>
        <div className="text-sm text-steel-base truncate">
          {m.email}
          {m.organisation && <> · {m.organisation}</>}
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-1.5">
        {m.role === 'admin' ? <Badge tone="dark">Steel Core</Badge> : <Badge>Member</Badge>}
        {status === 'active' && <Badge tone="ok">Active</Badge>}
        {status === 'invited' && <Badge tone="rust">Invited</Badge>}
        {status === 'revoked' && <Badge tone="danger">Removed</Badge>}
        {m.lastSignIn && <span className="basis-full text-xs text-steel-base">Last in {formatDate(m.lastSignIn)}</span>}
      </div>
      <div className="flex flex-wrap gap-1.5">
        {m.role === 'admin' ? (
          <span className="text-sm text-steel-base">All spaces</span>
        ) : m.spaceIds.length ? (
          spaces.filter((s) => m.spaceIds.includes(s.id)).map((s) => <Badge key={s.id}>{s.name}</Badge>)
        ) : (
          <span className="text-sm text-steel-base">None yet</span>
        )}
      </div>
      <div className="flex flex-wrap gap-4 md:justify-end">
        <button type="button" className={`${linkClass} text-steel-dark`} onClick={onEdit}>
          Edit
        </button>
        {status === 'revoked' ? (
          <button type="button" className={`${linkClass} text-ok`} onClick={onRestore}>
            Restore
          </button>
        ) : (
          <button type="button" className={`${linkClass} text-rust-dark`} onClick={onRevoke} disabled={isMe}>
            Remove access
          </button>
        )}
        <button type="button" className={`${linkClass} text-danger`} onClick={onDelete} disabled={isMe}>
          Delete
        </button>
      </div>
    </div>
  );
}

function SpacePicker({ spaces, selected, onChange, disabled }: { spaces: Space[]; selected: string[]; onChange: (ids: string[]) => void; disabled: boolean }) {
  if (disabled) return <p className="text-sm text-steel-base">The Steel Core team sees every space.</p>;
  if (!spaces.length) return <p className="text-sm text-steel-base">No spaces yet. Create one under Spaces.</p>;
  return (
    <div className="flex flex-wrap gap-x-6 gap-y-2">
      {spaces.map((s) => (
        <Checkbox
          key={s.id}
          label={s.name}
          checked={selected.includes(s.id)}
          onChange={(on) => onChange(on ? [...selected, s.id] : selected.filter((id) => id !== s.id))}
        />
      ))}
    </div>
  );
}

function InviteForm({
  spaces,
  onInvite,
  onCancel,
}: {
  spaces: Space[];
  onInvite: (body: { email: string; full_name: string; organisation: string; role: Role; space_ids: string[] }) => Promise<void>;
  onCancel: () => void;
}) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [org, setOrg] = useState('');
  const [role, setRole] = useState<Role>('member');
  const [spaceIds, setSpaceIds] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    await onInvite({ email: email.trim(), full_name: name.trim(), organisation: org.trim(), role, space_ids: role === 'member' ? spaceIds : [] });
    setBusy(false);
  };

  return (
    <Card className="p-5 md:p-6 mb-8 border-2 !border-steel-dark">
      <form onSubmit={submit} className="space-y-5">
        <Label className="text-rust-base">Invite someone</Label>
        <div className="grid md:grid-cols-3 gap-4">
          <Field label="Email">
            <Input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
          </Field>
          <Field label="Full name">
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </Field>
          <Field label="Organisation" hint="Their agency or company, if any.">
            <Input value={org} onChange={(e) => setOrg(e.target.value)} />
          </Field>
        </div>
        <Field label="Role">
          <Select value={role} onChange={(e) => setRole(e.target.value as Role)}>
            {ROLE_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </Select>
        </Field>
        <div>
          <Label className="text-steel-base mb-2.5">Spaces</Label>
          <SpacePicker spaces={spaces} selected={spaceIds} onChange={setSpaceIds} disabled={role === 'admin'} />
        </div>
        <div className="flex gap-3 pt-2">
          <Button type="submit" disabled={busy}>
            {busy ? 'Sending…' : 'Send invite'}
          </Button>
          <Button variant="ghost" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </form>
    </Card>
  );
}

function EditMember({
  member,
  spaces,
  isMe,
  onSave,
  onDone,
}: {
  member: Member;
  spaces: Space[];
  isMe: boolean;
  onSave: (patch: MemberPatch) => Promise<void>;
  onDone: () => void;
}) {
  const [name, setName] = useState(member.full_name ?? '');
  const [org, setOrg] = useState(member.organisation ?? '');
  const [role, setRole] = useState<Role>(member.role);
  const [spaceIds, setSpaceIds] = useState(member.spaceIds);
  const [busy, setBusy] = useState(false);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    await onSave({ full_name: name, organisation: org, role, spaceIds });
    setBusy(false);
  };

  return (
    <form onSubmit={submit} className="px-5 pb-5 pt-1 space-y-4 bg-paper/60">
      <div className="grid md:grid-cols-3 gap-4">
        <Field label="Full name">
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </Field>
        <Field label="Organisation">
          <Input value={org} onChange={(e) => setOrg(e.target.value)} />
        </Field>
        <Field label="Role" hint={isMe ? 'You cannot change your own role.' : undefined}>
          <Select value={role} disabled={isMe} onChange={(e) => setRole(e.target.value as Role)}>
            {ROLE_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </Select>
        </Field>
      </div>
      <div>
        <Label className="text-steel-base mb-2.5">Spaces</Label>
        <SpacePicker spaces={spaces} selected={spaceIds} onChange={setSpaceIds} disabled={role === 'admin'} />
      </div>
      <div className="flex gap-3">
        <Button type="submit" variant="secondary" disabled={busy}>
          {busy ? 'Saving…' : 'Save'}
        </Button>
        <Button variant="ghost" onClick={onDone}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
