import { ChevronDown, ChevronUp, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { supabase } from '../lib/supabase';
import type { Topic } from '../lib/types';
import { Button, Card, IconButton, Input, Label, Notice } from './ui';

/** Admin panel on a space's front page: add, rename, describe, reorder and delete topics. */
export function TopicManager({ spaceId, topics, onChanged, onClose }: { spaceId: string; topics: Topic[]; onChanged: () => Promise<void>; onClose: () => void }) {
  const [error, setError] = useState('');
  const [newName, setNewName] = useState('');

  const run = async (op: PromiseLike<{ error: { message: string } | null }>) => {
    setError('');
    const { error } = await op;
    if (error) setError(error.message);
    await onChanged();
  };

  // Rewrites every topic's sort so the order is always 1, 2, 3…
  const reorder = (from: number, to: number) => {
    const next = [...topics];
    const [item] = next.splice(from, 1);
    next.splice(to, 0, item!);
    return run(Promise.all(next.map((t, i) => supabase.from('topics').update({ sort: i + 1 }).eq('id', t.id))).then((rs) => rs.find((r) => r.error) ?? { error: null }));
  };

  const add = async () => {
    if (!newName.trim()) return;
    await run(supabase.from('topics').insert({ space_id: spaceId, name: newName.trim(), sort: topics.length + 1 }));
    setNewName('');
  };

  return (
    <Card className="mt-10">
      <div className="px-5 py-3 border-b border-line bg-paper flex items-center justify-between gap-3">
        <Label className="text-rust-base">Topics in this space</Label>
        <Button variant="ghost" onClick={onClose}>
          Done
        </Button>
      </div>
      <div className="p-5 space-y-3">
        <p className="text-sm text-steel-base">
          Topics group pages in the sidebar, for example Onboarding, Policies or Tools. Choose a page's topic when you edit it. Deleting a topic
          keeps its pages; they move to “Other pages”.
        </p>
        {error && <Notice tone="error">{error}</Notice>}
        {topics.map((t, i) => (
          <TopicRow
            key={t.id}
            topic={t}
            first={i === 0}
            last={i === topics.length - 1}
            onUp={() => reorder(i, i - 1)}
            onDown={() => reorder(i, i + 1)}
            onSave={(patch) => run(supabase.from('topics').update(patch).eq('id', t.id))}
            onDelete={() => confirm(`Delete the “${t.name}” topic? Its pages are kept.`) && run(supabase.from('topics').delete().eq('id', t.id))}
          />
        ))}
        <form
          className="flex gap-2 pt-2"
          onSubmit={(e) => {
            e.preventDefault();
            add();
          }}
        >
          <Input value={newName} placeholder="New topic name" onChange={(e) => setNewName(e.target.value)} />
          <Button type="submit" variant="secondary" disabled={!newName.trim()}>
            <Plus size={14} /> Add
          </Button>
        </form>
      </div>
    </Card>
  );
}

function TopicRow({
  topic,
  first,
  last,
  onUp,
  onDown,
  onSave,
  onDelete,
}: {
  topic: Topic;
  first: boolean;
  last: boolean;
  onUp: () => void;
  onDown: () => void;
  onSave: (patch: Pick<Topic, 'name' | 'description'>) => void;
  onDelete: () => void;
}) {
  const [name, setName] = useState(topic.name);
  const [description, setDescription] = useState(topic.description ?? '');
  const changed = name.trim() !== topic.name || description.trim() !== (topic.description ?? '');

  return (
    <div className="border border-line rounded-sm p-3 flex flex-wrap items-start gap-2">
      <div className="flex-1 min-w-[200px] grid sm:grid-cols-[1fr_1.6fr] gap-2">
        <Input value={name} aria-label="Topic name" onChange={(e) => setName(e.target.value)} />
        <Input value={description} aria-label="Topic description" placeholder="Short description (optional)" onChange={(e) => setDescription(e.target.value)} />
      </div>
      <div className="flex items-center">
        {changed && (
          <Button variant="secondary" className="!px-3 mr-1" disabled={!name.trim()} onClick={() => onSave({ name: name.trim(), description: description.trim() || null })}>
            Save
          </Button>
        )}
        <IconButton label="Move up" disabled={first} onClick={onUp}>
          <ChevronUp size={16} />
        </IconButton>
        <IconButton label="Move down" disabled={last} onClick={onDown}>
          <ChevronDown size={16} />
        </IconButton>
        <IconButton label="Delete topic" className="hover:!text-danger" onClick={onDelete}>
          <Trash2 size={15} />
        </IconButton>
      </div>
    </div>
  );
}
