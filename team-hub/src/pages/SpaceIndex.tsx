import { Plus, Settings2 } from 'lucide-react';
import { Link, useSearchParams } from 'react-router';
import { HubCard } from '../components/HubCard';
import { TopicManager } from '../components/TopicManager';
import { Badge, Button, Eyebrow, Notice, Title } from '../components/ui';
import { ackStatus, needsAck } from '../lib/acks';
import { useAuth } from '../lib/auth';
import { pad } from '../lib/format';
import { groupPages } from '../lib/topics';
import type { PageSummary } from '../lib/types';
import { useSpace } from './SpaceLayout';

export function SpaceIndex() {
  const { space, topics, pages, acks, reload } = useSpace();
  const { isAdmin } = useAuth();
  const [params, setParams] = useSearchParams();
  const managing = isAdmin && params.get('topics') === 'edit';
  const toAck = isAdmin ? [] : pages.filter((p) => needsAck(ackStatus(p, acks)));
  const groups = groupPages(topics, pages);

  const badge = (p: PageSummary) => {
    if (!p.published) return <Badge tone="rust">Draft</Badge>;
    if (isAdmin) return p.requires_ack && <Badge>Needs sign-off</Badge>;
    const s = ackStatus(p, acks);
    if (needsAck(s)) return <Badge tone="rust">To acknowledge</Badge>;
    if (s.state === 'done') return <Badge tone="ok">Acknowledged</Badge>;
    return null;
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-10 py-12 md:py-16">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <Eyebrow className="mb-6">Space</Eyebrow>
          <Title text={space.name} className="text-[clamp(34px,6vw,56px)] mb-5" />
          {space.description && <p className="text-lg text-steel-base max-w-[56ch]">{space.description}</p>}
        </div>
        {isAdmin && !managing && (
          <Button variant="outline" onClick={() => setParams({ topics: 'edit' })}>
            <Settings2 size={14} /> Manage topics
          </Button>
        )}
      </div>

      {managing && <TopicManager spaceId={space.id} topics={topics} onChanged={reload} onClose={() => setParams({})} />}

      {toAck.length > 0 && (
        <div className="mt-10">
          <Notice>
            {toAck.length === 1 ? 'One page needs' : `${toAck.length} pages need`} your acknowledgement:{' '}
            {toAck.map((p, i) => (
              <span key={p.id}>
                {i > 0 && ', '}
                <Link to={`/s/${space.slug}/${p.slug}`} className="font-bold underline underline-offset-2">
                  {p.title}
                </Link>
              </span>
            ))}
            . Read each one, then confirm at the bottom of the page.
          </Notice>
        </div>
      )}

      {pages.length === 0 && !isAdmin && (
        <div className="mt-10">
          <Notice>Nothing has been published here yet.</Notice>
        </div>
      )}

      {groups.map(({ topic, pages: list }) =>
        list.length === 0 && !isAdmin ? null : (
          <section key={topic?.id ?? 'none'} className="mt-14">
            <div className="flex items-baseline gap-3 pb-3 mb-5 border-b border-line">
              <h2 className="font-bold tracking-[-0.01em] text-xl md:text-2xl">{topic?.name ?? 'Other pages'}</h2>
              <span className="text-[13px] text-steel-base">
                {list.length} page{list.length === 1 ? '' : 's'}
              </span>
            </div>
            {topic?.description && <p className="text-steel-base -mt-2 mb-5 max-w-[60ch]">{topic.description}</p>}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {list.map((p, i) => (
                <HubCard key={p.id} to={`/s/${space.slug}/${p.slug}`} label={pad(i + 1)} title={p.title} summary={p.summary} badge={badge(p)} />
              ))}
              {isAdmin && (
                <Link
                  to={`/s/${space.slug}/new${topic ? `?topic=${topic.id}` : ''}`}
                  className="flex flex-col items-center justify-center gap-2 min-h-[140px] border-2 border-dashed border-line hover:border-rust-base text-steel-base hover:text-rust-dark rounded-sm transition-colors"
                >
                  <Plus size={20} />
                  <span className="text-[13px] font-bold">New page{topic ? ` in ${topic.name}` : ''}</span>
                </Link>
              )}
            </div>
          </section>
        ),
      )}

      {isAdmin && topics.length === 0 && pages.length === 0 && (
        <div className="mt-12">
          <Notice>Start by adding a topic, then add pages to it. Or add a page straight away and file it under a topic later.</Notice>
        </div>
      )}
    </div>
  );
}
