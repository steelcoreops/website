import { useCallback, useEffect, useState, type FormEvent } from 'react';
import { Link } from 'react-router';
import { Button, Card, Eyebrow, Field, Input, Label, Notice, Spinner, Textarea, Title } from '../../components/ui';
import { slugify } from '../../lib/format';
import { supabase } from '../../lib/supabase';
import type { Space } from '../../lib/types';

type SpaceRow = Space & { pageCount: number; memberCount: number };

export function Spaces() {
  const [spaces, setSpaces] = useState<SpaceRow[] | null>(null);
  const [notice, setNotice] = useState<{ tone: 'ok' | 'error'; text: string } | null>(null);

  const load = useCallback(async () => {
    const [s, p, m] = await Promise.all([
      supabase.from('spaces').select('*').order('sort').order('name'),
      supabase.from('pages').select('space_id'),
      supabase.from('space_members').select('space_id'),
    ]);
    const count = (rows: { space_id: string }[] | null, id: string) => (rows ?? []).filter((r) => r.space_id === id).length;
    setSpaces(((s.data ?? []) as Space[]).map((sp) => ({ ...sp, pageCount: count(p.data, sp.id), memberCount: count(m.data, sp.id) })));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const save = async (id: string | null, values: Pick<Space, 'name' | 'slug' | 'description' | 'sort'>) => {
    setNotice(null);
    const payload = { ...values, slug: slugify(values.slug || values.name), description: values.description?.trim() || null };
    const { error } = id ? await supabase.from('spaces').update(payload).eq('id', id) : await supabase.from('spaces').insert(payload);
    if (error) {
      setNotice({ tone: 'error', text: error.code === '23505' ? 'Another space already uses that web address.' : error.message });
      return false;
    }
    setNotice({ tone: 'ok', text: `Saved ${values.name}.` });
    await load();
    return true;
  };

  const remove = async (space: SpaceRow) => {
    const warning = space.pageCount ? ` Its ${space.pageCount} page${space.pageCount === 1 ? '' : 's'} will be deleted too.` : '';
    if (!confirm(`Delete the ${space.name} space?${warning} This cannot be undone.`)) return;
    const { error } = await supabase.from('spaces').delete().eq('id', space.id);
    setNotice(error ? { tone: 'error', text: error.message } : { tone: 'ok', text: `Deleted ${space.name}.` });
    await load();
  };

  if (!spaces) return <Spinner />;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-16">
      <Eyebrow className="mb-6">Admin</Eyebrow>
      <Title text="Spaces" className="text-[clamp(32px,5vw,48px)] mb-4" />
      <p className="text-steel-base max-w-[60ch] mb-10">
        A space is a separate area with its own pages, for example Delivery Partners or Employees. People only see the spaces you add
        them to under People. The Steel Core team sees everything.
      </p>

      {notice && (
        <div className="mb-6">
          <Notice tone={notice.tone}>{notice.text}</Notice>
        </div>
      )}

      <div className="space-y-4">
        {spaces.map((s) => (
          <SpaceForm key={s.id} space={s} onSave={(v) => save(s.id, v)} onDelete={() => remove(s)} />
        ))}
        <SpaceForm key={`new-${spaces.length}`} onSave={(v) => save(null, { ...v, sort: v.sort || spaces.length + 1 })} />
      </div>
    </div>
  );
}

function SpaceForm({
  space,
  onSave,
  onDelete,
}: {
  space?: SpaceRow;
  onSave: (values: Pick<Space, 'name' | 'slug' | 'description' | 'sort'>) => Promise<boolean>;
  onDelete?: () => void;
}) {
  const [name, setName] = useState(space?.name ?? '');
  const [slug, setSlug] = useState(space?.slug ?? '');
  const [description, setDescription] = useState(space?.description ?? '');
  const [sort, setSort] = useState(space?.sort ?? 0);
  const [busy, setBusy] = useState(false);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    await onSave({ name: name.trim(), slug, description, sort });
    setBusy(false);
  };

  return (
    <Card className={`p-5 md:p-6 ${space ? '' : 'border-2 border-dashed !border-line bg-transparent'}`}>
      <form onSubmit={submit} className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Label className="text-rust-base">{space ? space.name : 'New space'}</Label>
          {space && (
            <div className="flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.1em] text-steel-base">
              <span>{space.pageCount} pages</span>
              <span>{space.memberCount} members</span>
              <Link to={`/s/${space.slug}`} className="font-bold text-steel-dark hover:text-rust-dark">
                Open
              </Link>
            </div>
          )}
        </div>
        <div className="grid sm:grid-cols-[2fr_2fr_1fr] gap-4">
          <Field label="Name">
            <Input
              required
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (!space) setSlug(slugify(e.target.value));
              }}
            />
          </Field>
          <Field label="Web address" hint={`/s/${slugify(slug || name) || '…'}`}>
            <Input value={slug} onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-'))} />
          </Field>
          <Field label="Order">
            <Input type="number" value={sort} onChange={(e) => setSort(Number(e.target.value) || 0)} />
          </Field>
        </div>
        <Field label="Description" hint="Shown on the hub card.">
          <Textarea rows={2} value={description} onChange={(e) => setDescription(e.target.value)} />
        </Field>
        <div className="flex flex-wrap justify-between gap-3">
          <Button type="submit" variant={space ? 'secondary' : 'primary'} disabled={busy}>
            {busy ? 'Saving…' : space ? 'Save' : 'Create space'}
          </Button>
          {onDelete && (
            <Button variant="danger" onClick={onDelete}>
              Delete space
            </Button>
          )}
        </div>
      </form>
    </Card>
  );
}
