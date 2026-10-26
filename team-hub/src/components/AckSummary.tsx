import { ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { ackStatus } from '../lib/acks';
import { formatDate } from '../lib/format';
import { supabase } from '../lib/supabase';
import type { Acknowledgement, Page, Profile } from '../lib/types';
import { Badge, Card, Label } from './ui';

type Row = { person: Profile; status: ReturnType<typeof ackStatus> };

/** Admin view at the foot of a page: who in the space has signed the current version. */
export function AckSummary({ page }: { page: Page }) {
  const [rows, setRows] = useState<Row[] | null>(null);

  useEffect(() => {
    (async () => {
      const [m, a] = await Promise.all([
        supabase.from('space_members').select('profiles(*)').eq('space_id', page.space_id),
        supabase.from('acknowledgements').select('*').eq('page_id', page.id),
      ]);
      const people = ((m.data ?? []) as unknown as { profiles: Profile }[])
        .map((x) => x.profiles)
        .filter((p) => p.active && p.role === 'member')
        .sort((x, y) => (x.full_name || x.email).localeCompare(y.full_name || y.email));
      const acks = (a.data ?? []) as Acknowledgement[];
      setRows(people.map((person) => ({ person, status: ackStatus(page, acks, person.id) })));
    })();
  }, [page]);

  if (!page.requires_ack || !rows) return null;

  const done = rows.filter((r) => r.status.state === 'done').length;

  return (
    <Card className="mt-14">
      <div className="px-5 py-4 border-b border-line bg-paper flex flex-wrap items-center justify-between gap-3">
        <div>
          <Label className="text-rust-base mb-1">Sign-offs · version {page.version}</Label>
          <div className="font-bold text-steel-dark">
            {rows.length === 0 ? 'No members in this space yet' : `${done} of ${rows.length} have acknowledged`}
          </div>
          {!page.published && <div className="text-sm text-steel-base">Members can acknowledge once the page is published.</div>}
        </div>
        <Link to="/admin/sign-offs" className="inline-flex items-center gap-1.5 text-[13px] font-bold text-steel-base hover:text-rust-dark">
          All sign-offs <ArrowRight size={13} />
        </Link>
      </div>
      {rows.map(({ person, status }) => (
        <div key={person.id} className="px-5 py-3 border-b border-line last:border-b-0 flex flex-wrap items-center justify-between gap-2 text-sm">
          <span>
            <strong>{person.full_name || person.email}</strong>
            {person.organisation && <span className="text-steel-base"> · {person.organisation}</span>}
          </span>
          {status.state === 'done' ? (
            <Badge tone="ok">{formatDate(status.at)}</Badge>
          ) : status.state === 'outdated' ? (
            <Badge tone="rust">Signed an earlier version</Badge>
          ) : (
            <Badge>Outstanding</Badge>
          )}
        </div>
      ))}
    </Card>
  );
}
