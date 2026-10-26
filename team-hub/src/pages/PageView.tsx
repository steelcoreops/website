import { ArrowLeft, ArrowRight, Pencil } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import { AckPanel } from '../components/AckPanel';
import { AckSummary } from '../components/AckSummary';
import { PageArticle } from '../components/PageArticle';
import { buttonClass, Spinner } from '../components/ui';
import { ackStatus } from '../lib/acks';
import { useAuth } from '../lib/auth';
import { supabase } from '../lib/supabase';
import type { Page } from '../lib/types';
import { NotFound } from './NotFound';
import { useSpace } from './SpaceLayout';

export function PageView() {
  const { pageSlug } = useParams();
  const { space, topics, pages, acks, reload } = useSpace();
  const { isAdmin } = useAuth();
  const [page, setPage] = useState<Page | null | undefined>(undefined);

  useEffect(() => {
    setPage(undefined);
    supabase
      .from('pages')
      .select('*')
      .eq('space_id', space.id)
      .eq('slug', pageSlug!)
      .maybeSingle()
      .then(({ data }) => setPage((data as Page | null) ?? null));
  }, [space.id, pageSlug]);

  useEffect(() => {
    if (page) document.title = `${page.title} · Steel Core Team Hub`;
  }, [page]);

  if (page === undefined) return <Spinner />;
  if (page === null) return <NotFound />;

  const index = pages.findIndex((p) => p.id === page.id);
  const prev = index > 0 ? pages[index - 1] : undefined;
  const next = index >= 0 ? pages[index + 1] : undefined;

  return (
    <div className="max-w-[800px] mx-auto px-4 sm:px-6 py-10 md:py-14 pb-24">
      {isAdmin && (
        <div className="flex justify-end mb-6">
          <Link to={`/s/${space.slug}/${page.slug}/edit`} className={buttonClass('outline')}>
            <Pencil size={14} /> Edit page
          </Link>
        </div>
      )}

      <PageArticle
        title={page.title}
        eyebrow={page.eyebrow}
        summary={page.summary}
        blocks={page.blocks}
        spaceName={[space.name, topics.find((t) => t.id === page.topic_id)?.name].filter(Boolean).join(' · ')}
        updatedAt={page.updated_at}
        published={page.published}
      />

      {isAdmin ? (
        <AckSummary page={page} />
      ) : (
        <AckPanel
          title={page.title}
          status={ackStatus(page, acks)}
          onAcknowledge={async () => {
            const { error } = await supabase.rpc('acknowledge_page', { pid: page.id });
            if (error) throw new Error(error.message);
            await reload();
          }}
        />
      )}

      {(prev || next) && (
        <nav className="grid grid-cols-2 gap-4 mt-16 pt-6 border-t border-line">
          <div>
            {prev && (
              <Link to={`/s/${space.slug}/${prev.slug}`} className="group block">
                <span className="flex items-center gap-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-steel-base">
                  <ArrowLeft size={13} /> Previous
                </span>
                <span className="block font-bold mt-1 group-hover:text-rust-dark">{prev.title}</span>
              </Link>
            )}
          </div>
          <div className="text-right">
            {next && (
              <Link to={`/s/${space.slug}/${next.slug}`} className="group block">
                <span className="flex items-center justify-end gap-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-steel-base">
                  Next <ArrowRight size={13} />
                </span>
                <span className="block font-bold mt-1 group-hover:text-rust-dark">{next.title}</span>
              </Link>
            )}
          </div>
        </nav>
      )}
    </div>
  );
}
