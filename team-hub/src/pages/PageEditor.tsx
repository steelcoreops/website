import { Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router';
import { BlockListEditor } from '../components/blocks/BlockEditor';
import { PageArticle } from '../components/PageArticle';
import { Button, Card, Checkbox, Field, Input, Label, Notice, Select, Spinner, Textarea } from '../components/ui';
import { slugify } from '../lib/format';
import { UploadSpace, uploadsAvailable } from '../lib/storage';
import { supabase } from '../lib/supabase';
import type { Block, Page } from '../lib/types';
import { NotFound } from './NotFound';
import { useSpace } from './SpaceLayout';

type Draft = {
  topic_id: string | null;
  title: string;
  slug: string;
  eyebrow: string;
  summary: string;
  blocks: Block[];
  published: boolean;
  requires_ack: boolean;
  sort: number;
};

const emptyDraft = (sort: number, topic_id: string | null): Draft => ({ topic_id, title: '', slug: '', eyebrow: '', summary: '', blocks: [], published: false, requires_ack: false, sort });

export function PageEditor() {
  const { pageSlug } = useParams();
  const { space, topics, pages, reload } = useSpace();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const isNew = !pageSlug;
  const startTopic = topics.find((t) => t.id === params.get('topic'))?.id ?? null;

  const [pageId, setPageId] = useState<string | null>(null);
  const [updatedAt, setUpdatedAt] = useState<string | undefined>();
  const [version, setVersion] = useState(1);
  const [askAgain, setAskAgain] = useState(false);
  const [draft, setDraft] = useState<Draft | null | undefined>(
    isNew ? emptyDraft(pages.filter((p) => p.topic_id === startTopic).length + 1, startTopic) : undefined,
  );
  const [slugTouched, setSlugTouched] = useState(!isNew);
  const [dirty, setDirty] = useState(false);
  const [tab, setTab] = useState<'edit' | 'preview'>('edit');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isNew) return;
    supabase
      .from('pages')
      .select('*')
      .eq('space_id', space.id)
      .eq('slug', pageSlug!)
      .maybeSingle()
      .then(({ data }) => {
        const p = data as Page | null;
        if (!p) return setDraft(null);
        setPageId(p.id);
        setUpdatedAt(p.updated_at);
        setVersion(p.version);
        setDraft({
          topic_id: p.topic_id,
          title: p.title,
          slug: p.slug,
          eyebrow: p.eyebrow ?? '',
          summary: p.summary ?? '',
          blocks: p.blocks,
          published: p.published,
          requires_ack: p.requires_ack,
          sort: p.sort,
        });
      });
  }, [isNew, space.id, pageSlug]);

  useEffect(() => {
    if (!dirty) return;
    const warn = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, [dirty]);

  if (draft === undefined) return <Spinner />;
  if (draft === null) return <NotFound />;

  const update = (patch: Partial<Draft>) => {
    setDraft({ ...draft, ...patch });
    setDirty(true);
  };

  const setTitle = (title: string) => update(slugTouched ? { title } : { title, slug: slugify(title) });

  const save = async () => {
    setError('');
    if (!draft.title.trim()) return setError('Give the page a title.');
    const slug = slugify(draft.slug || draft.title);
    if (!slug || slug === 'new') return setError('Choose a different web address.');

    setSaving(true);
    const payload = {
      space_id: space.id,
      topic_id: draft.topic_id,
      title: draft.title.trim(),
      slug,
      eyebrow: draft.eyebrow.trim() || null,
      summary: draft.summary.trim() || null,
      blocks: draft.blocks,
      published: draft.published,
      requires_ack: draft.requires_ack,
      version: pageId && draft.requires_ack && askAgain ? version + 1 : version,
      sort: draft.sort,
    };
    const query = pageId ? supabase.from('pages').update(payload).eq('id', pageId) : supabase.from('pages').insert(payload);
    const { data, error } = await query.select().single();
    setSaving(false);

    if (error) {
      setError(error.code === '23505' ? 'Another page in this space already uses that web address.' : error.message);
      return;
    }
    setDirty(false);
    setAskAgain(false);
    await reload();
    navigate(`/s/${space.slug}/${(data as Page).slug}`);
  };

  const remove = async () => {
    if (!pageId || !confirm(`Delete “${draft.title}”? This cannot be undone.`)) return;
    const { error } = await supabase.from('pages').delete().eq('id', pageId);
    if (error) return setError(error.message);
    setDirty(false);
    await reload();
    navigate(`/s/${space.slug}`);
  };

  const cancel = () => {
    if (dirty && !confirm('Discard your unsaved changes?')) return;
    navigate(isNew ? `/s/${space.slug}` : `/s/${space.slug}/${pageSlug}`);
  };

  return (
    <div className="pb-24">
      <div className="bg-paper border-b border-line md:sticky md:top-16 z-[25]">
        <div className="max-w-[1000px] mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex border-2 border-steel-dark rounded-sm overflow-hidden" role="tablist">
            {(['edit', 'preview'] as const).map((t) => (
              <button
                key={t}
                type="button"
                role="tab"
                aria-selected={tab === t}
                onClick={() => setTab(t)}
                className={`px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.14em] ${tab === t ? 'bg-steel-dark text-white' : 'bg-white text-steel-dark hover:bg-cloud'}`}
              >
                {t}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3">
            {dirty && <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-rust-dark">Unsaved</span>}
            <Button variant="ghost" onClick={cancel}>
              Cancel
            </Button>
            <Button onClick={save} disabled={saving}>
              {saving ? 'Saving…' : isNew ? 'Create page' : 'Save'}
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 pt-8">
        {error && (
          <div className="mb-6">
            <Notice tone="error">{error}</Notice>
          </div>
        )}

        {tab === 'preview' ? (
          <div className="max-w-[800px] mx-auto">
            <PageArticle
              title={draft.title}
              eyebrow={draft.eyebrow}
              summary={draft.summary}
              blocks={draft.blocks}
              spaceName={space.name}
              updatedAt={updatedAt}
              published={draft.published}
            />
          </div>
        ) : (
          <div className="space-y-8">
            <Card className="p-5 md:p-6">
              <Label className="text-rust-base mb-5">{isNew ? `New page in ${space.name}` : 'Page settings'}</Label>
              <div className="grid md:grid-cols-2 gap-5">
                <Field label="Title">
                  <Input value={draft.title} onChange={(e) => setTitle(e.target.value)} autoFocus={isNew} />
                </Field>
                <Field label="Web address" hint={`/s/${space.slug}/${slugify(draft.slug || draft.title) || '…'}`}>
                  <Input
                    value={draft.slug}
                    onChange={(e) => {
                      setSlugTouched(true);
                      update({ slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-') });
                    }}
                  />
                </Field>
                <Field label="Topic" hint="Where the page sits in the sidebar.">
                  <Select value={draft.topic_id ?? ''} onChange={(e) => update({ topic_id: e.target.value || null })}>
                    <option value="">No topic (Other pages)</option>
                    {topics.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.name}
                      </option>
                    ))}
                  </Select>
                </Field>
                <Field label="Eyebrow" hint="Small label above the title, e.g. “Delivery Partners”.">
                  <Input value={draft.eyebrow} onChange={(e) => update({ eyebrow: e.target.value })} />
                </Field>
                <Field label="Order" hint="Lower numbers come first within the topic.">
                  <Input type="number" value={draft.sort} onChange={(e) => update({ sort: Number(e.target.value) || 0 })} />
                </Field>
                <div className="md:col-span-2">
                  <Field label="Summary" hint="One or two sentences. Shown under the title and on the space's cards.">
                    <Textarea rows={2} value={draft.summary} onChange={(e) => update({ summary: e.target.value })} />
                  </Field>
                </div>
              </div>
              <div className="mt-5 pt-5 border-t border-line flex flex-wrap items-end justify-between gap-4">
                <div className="flex flex-col gap-3">
                  <Checkbox
                    checked={draft.published}
                    onChange={(published) => update({ published })}
                    label={
                      <span>
                        <strong>Published</strong>
                        <span className="text-steel-base"> · visible to everyone in {space.name}. Untick to keep it as a draft.</span>
                      </span>
                    }
                  />
                  <Checkbox
                    checked={draft.requires_ack}
                    onChange={(requires_ack) => update({ requires_ack })}
                    label={
                      <span>
                        <strong>Needs acknowledgement</strong>
                        <span className="text-steel-base"> · members confirm they have read it, and we keep a dated record.</span>
                      </span>
                    }
                  />
                  {pageId && draft.requires_ack && (
                    <div className="pl-6">
                      <Checkbox
                        checked={askAgain}
                        onChange={(v) => {
                          setAskAgain(v);
                          setDirty(true);
                        }}
                        label={
                          <span>
                            <strong>Ask everyone to acknowledge again</strong>
                            <span className="text-steel-base"> · for significant changes. Leave unticked for typo fixes. Earlier sign-offs are kept.</span>
                          </span>
                        }
                      />
                    </div>
                  )}
                </div>
                {pageId && (
                  <Button variant="danger" onClick={remove}>
                    <Trash2 size={14} /> Delete page
                  </Button>
                )}
              </div>
            </Card>

            <div>
              <Label className="text-steel-base mb-3">Content</Label>
              <UploadSpace.Provider value={uploadsAvailable ? space.id : null}>
                <BlockListEditor blocks={draft.blocks} onChange={(blocks) => update({ blocks })} />
              </UploadSpace.Provider>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
