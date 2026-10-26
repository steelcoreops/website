import { useCallback, useEffect, useMemo, useState } from 'react';
import { Outlet, useOutletContext, useParams } from 'react-router';
import { Dot, SpaceSidebar } from '../components/SpaceSidebar';
import { Spinner } from '../components/ui';
import { ackStatus, needsAck, PAGE_SUMMARY_COLUMNS } from '../lib/acks';
import { useAuth } from '../lib/auth';
import { supabase } from '../lib/supabase';
import { groupPages, sortTopics } from '../lib/topics';
import type { Acknowledgement, PageSummary, Space, Topic } from '../lib/types';
import { NotFound } from './NotFound';

/**
 * pages is in reading order (topic by topic), so previous / next follow the sidebar.
 * acks holds the signed-in person's own acknowledgements, for pages in this space.
 */
type SpaceContext = { space: Space; topics: Topic[]; pages: PageSummary[]; acks: Acknowledgement[]; reload: () => Promise<void> };

export const useSpace = () => useOutletContext<SpaceContext>();

export function SpaceLayout() {
  const { spaceSlug } = useParams();
  const { isAdmin, profile } = useAuth();
  const userId = profile?.id;
  const [space, setSpace] = useState<Space | null | undefined>(undefined);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [pages, setPages] = useState<PageSummary[]>([]);
  const [acks, setAcks] = useState<Acknowledgement[]>([]);

  const reload = useCallback(async () => {
    const { data: s } = await supabase.from('spaces').select('*').eq('slug', spaceSlug!).maybeSingle();
    if (!s) {
      setSpace(null);
      return;
    }
    const [{ data: t }, { data: p }] = await Promise.all([
      supabase.from('topics').select('*').eq('space_id', s.id),
      supabase.from('pages').select(PAGE_SUMMARY_COLUMNS).eq('space_id', s.id).order('sort').order('title'),
    ]);
    const list = (p as PageSummary[]) ?? [];
    const ackIds = list.filter((x) => x.requires_ack).map((x) => x.id);
    const { data: a } = ackIds.length
      ? await supabase.from('acknowledgements').select('*').eq('user_id', userId!).in('page_id', ackIds)
      : { data: [] };
    setTopics(sortTopics((t as Topic[]) ?? []));
    setPages(list);
    setAcks((a as Acknowledgement[]) ?? []);
    setSpace(s as Space);
  }, [spaceSlug, userId]);

  useEffect(() => {
    setSpace(undefined);
    reload();
  }, [reload]);

  const groups = useMemo(() => groupPages(topics, pages), [topics, pages]);
  const ordered = useMemo(() => groups.flatMap((g) => g.pages), [groups]);

  if (space === undefined) return <Spinner />;
  if (space === null) return <NotFound />;

  return (
    <div className="md:flex max-w-[1400px] mx-auto">
      <SpaceSidebar
        spaceName={space.name}
        spaceHref={`/s/${space.slug}`}
        groups={groups}
        pageHref={(p) => `/s/${space.slug}/${p.slug}`}
        marker={(p) =>
          !p.published ? <Dot title="Draft" /> : !isAdmin && needsAck(ackStatus(p, acks)) ? <Dot title="Needs your acknowledgement" /> : null
        }
        adminLinks={isAdmin ? { newPage: `/s/${space.slug}/new`, topics: `/s/${space.slug}?topics=edit` } : undefined}
      />
      <div className="flex-1 min-w-0">
        <Outlet context={{ space, topics, pages: ordered, acks, reload } satisfies SpaceContext} />
      </div>
    </div>
  );
}
