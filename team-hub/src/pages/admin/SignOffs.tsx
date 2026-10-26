import { Download } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router';
import { Badge, Button, Card, Checkbox, Eyebrow, Label, Notice, Spinner, Title } from '../../components/ui';
import { ackStatus, PAGE_SUMMARY_COLUMNS, type AckStatus } from '../../lib/acks';
import { formatDate } from '../../lib/format';
import { supabase } from '../../lib/supabase';
import type { Acknowledgement, PageSummary, Profile, Space } from '../../lib/types';

type AckPageRow = PageSummary & { space_id: string };
type Data = { spaces: Space[]; pages: AckPageRow[]; links: { space_id: string; user_id: string }[]; people: Profile[]; acks: Acknowledgement[] };

const STATUS_LABEL: Record<AckStatus['state'], string> = {
  none: '',
  pending: 'Outstanding',
  outdated: 'Signed an earlier version',
  done: 'Acknowledged',
};

export function SignOffs() {
  const [data, setData] = useState<Data | null>(null);
  const [error, setError] = useState('');
  const [outstandingOnly, setOutstandingOnly] = useState(false);

  useEffect(() => {
    (async () => {
      const [s, p, m, u, a] = await Promise.all([
        supabase.from('spaces').select('*').order('sort').order('name'),
        supabase.from('pages').select(`${PAGE_SUMMARY_COLUMNS}, space_id`).eq('requires_ack', true).order('sort'),
        supabase.from('space_members').select('space_id, user_id'),
        supabase.from('profiles').select('*').eq('role', 'member').eq('active', true),
        supabase.from('acknowledgements').select('*'),
      ]);
      const err = s.error ?? p.error ?? m.error ?? u.error ?? a.error;
      if (err) setError(err.message);
      setData({
        spaces: (s.data ?? []) as Space[],
        pages: (p.data ?? []) as AckPageRow[],
        links: m.data ?? [],
        people: ((u.data ?? []) as Profile[]).sort((x, y) => (x.full_name || x.email).localeCompare(y.full_name || y.email)),
        acks: (a.data ?? []) as Acknowledgement[],
      });
    })();
  }, []);

  // One group per space that has pages needing sign-off, with the active members of that space.
  const groups = useMemo(() => {
    if (!data) return [];
    return data.spaces
      .map((space) => {
        const pages = data.pages.filter((p) => p.space_id === space.id);
        const memberIds = new Set(data.links.filter((l) => l.space_id === space.id).map((l) => l.user_id));
        const rows = data.people
          .filter((person) => memberIds.has(person.id))
          .map((person) => ({ person, statuses: pages.map((page) => ackStatus(page, data.acks, person.id)) }));
        return { space, pages, rows };
      })
      .filter((g) => g.pages.length > 0);
  }, [data]);

  const download = () => {
    const lines = [['Space', 'Page', 'Current version', 'Name', 'Email', 'Organisation', 'Status', 'Version signed', 'Acknowledged at']];
    for (const { space, pages, rows } of groups) {
      for (const { person } of rows) {
        for (const page of pages) {
          const signed = data!.acks.filter((a) => a.page_id === page.id && a.user_id === person.id).sort((x, y) => y.version - x.version);
          const status = ackStatus(page, data!.acks, person.id);
          const base = [space.name, page.title, String(page.version), person.full_name ?? '', person.email, person.organisation ?? ''];
          if (signed.length === 0) lines.push([...base, page.published ? STATUS_LABEL.pending : 'Draft', '', '']);
          // Every signed version is listed, so the export is a full history rather than a snapshot.
          for (const a of signed) {
            lines.push([...base, a.version === page.version ? STATUS_LABEL[status.state] : 'Superseded', String(a.version), a.acknowledged_at]);
          }
        }
      }
    }
    // A leading ' stops spreadsheet apps treating a name like "=SUM(…)" as a formula.
    const cell = (v: string) => `"${(/^[=+\-@]/.test(v) ? `'${v}` : v).replace(/"/g, '""')}"`;
    const csv = lines.map((l) => l.map(cell).join(',')).join('\r\n');
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }));
    const link = Object.assign(document.createElement('a'), { href: url, download: `steel-core-sign-offs-${new Date().toISOString().slice(0, 10)}.csv` });
    link.click();
    URL.revokeObjectURL(url);
  };

  if (!data) return <Spinner />;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-16">
      <div className="flex flex-wrap items-end justify-between gap-6 mb-10">
        <div>
          <Eyebrow className="mb-6">Admin</Eyebrow>
          <Title text="Sign-offs" className="text-[clamp(32px,5vw,48px)] mb-4" />
          <p className="text-steel-base max-w-[60ch]">
            Who has read and acknowledged each page that needs it. Tick <strong>Needs acknowledgement</strong> when editing a page to add it
            here.
          </p>
        </div>
        <Button variant="outline" onClick={download} disabled={groups.length === 0}>
          <Download size={15} /> Download CSV
        </Button>
      </div>

      {error && (
        <div className="mb-6">
          <Notice tone="error">{error}</Notice>
        </div>
      )}

      {groups.length === 0 ? (
        <Notice>No pages need acknowledging yet.</Notice>
      ) : (
        <>
          <div className="mb-6">
            <Checkbox checked={outstandingOnly} onChange={setOutstandingOnly} label="Only show people with something outstanding" />
          </div>
          <div className="space-y-10">
            {groups.map(({ space, pages, rows }) => {
              const shown = outstandingOnly ? rows.filter((r) => r.statuses.some((s) => s.state === 'pending' || s.state === 'outdated')) : rows;
              return (
                <section key={space.id}>
                  <Label className="text-rust-base mb-3">{space.name}</Label>
                  <Card className="overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                      <thead>
                        <tr className="bg-paper border-b border-line text-left">
                          <th className="px-5 py-3 font-mono text-[11px] font-bold uppercase tracking-[0.15em] text-steel-base">Person</th>
                          {pages.map((p) => (
                            <th key={p.id} className="px-4 py-3 align-bottom min-w-[150px]">
                              <Link to={`/s/${space.slug}/${p.slug}`} className="font-bold text-steel-dark hover:text-rust-dark">
                                {p.title}
                              </Link>
                              <span className="block font-mono text-[10.5px] text-steel-base font-normal">
                                v{p.version}
                                {!p.published && ' · draft'}
                              </span>
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {shown.length === 0 && (
                          <tr>
                            <td colSpan={pages.length + 1} className="px-5 py-6 text-steel-base">
                              {rows.length === 0 ? 'No members in this space yet.' : 'Everyone is up to date.'}
                            </td>
                          </tr>
                        )}
                        {shown.map(({ person, statuses }) => (
                          <tr key={person.id} className="border-b border-line last:border-b-0">
                            <td className="px-5 py-3">
                              <div className="font-bold">{person.full_name || person.email}</div>
                              {person.organisation && <div className="text-steel-base text-[13px]">{person.organisation}</div>}
                            </td>
                            {statuses.map((s, i) => (
                              <td key={pages[i]!.id} className="px-4 py-3">
                                {s.state === 'done' ? (
                                  <Badge tone="ok">{formatDate(s.at)}</Badge>
                                ) : s.state === 'outdated' ? (
                                  <Badge tone="rust">Earlier version</Badge>
                                ) : s.state === 'pending' ? (
                                  <Badge>Outstanding</Badge>
                                ) : (
                                  <span className="text-steel-base">–</span>
                                )}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </Card>
                </section>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
