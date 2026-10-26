import { ChevronDown, ChevronUp, FileText, Plus, Trash2, Upload, X } from 'lucide-react';
import { useRef, useState, type ReactNode } from 'react';
import { BLOCK_TYPES, blockLabel, newBlock } from '../../lib/blocks';
import { embedUrl } from '../../lib/embed';
import { formatSize, uploadFile, useUploadSpace } from '../../lib/storage';
import type { Block, BlockType, StoredFile } from '../../lib/types';
import { Button, Field, IconButton, Input, Label, Notice, Select, Textarea } from '../ui';
import { RichTextEditor } from './RichTextEditor';

const move = <T,>(list: T[], from: number, to: number) => {
  const next = [...list];
  const [item] = next.splice(from, 1);
  next.splice(to, 0, item!);
  return next;
};

const MD_HINT = (
  <>
    <code>**bold**</code> · <code>- bullet</code> · <code>[link](https://…)</code> · <code>{'{{to confirm}}'}</code> highlights a detail still to fill in
  </>
);

function MarkdownField({ label, value, onChange, rows = 5 }: { label: string; value: string; onChange: (v: string) => void; rows?: number }) {
  return (
    <Field label={label} hint={MD_HINT}>
      <Textarea rows={rows} value={value} onChange={(e) => onChange(e.target.value)} />
    </Field>
  );
}

/** The ordered list of blocks on a page, with add, reorder and delete. */
export function BlockListEditor({ blocks, onChange }: { blocks: Block[]; onChange: (blocks: Block[]) => void }) {
  const insert = (type: BlockType, at: number) => {
    const next = [...blocks];
    next.splice(at, 0, newBlock(type));
    onChange(next);
  };
  const remove = (i: number) => {
    if (confirm(`Delete this ${blockLabel(blocks[i]!.type).toLowerCase()} block?`)) onChange(blocks.filter((_, j) => j !== i));
  };

  return (
    <div>
      <AddBlock onAdd={(t) => insert(t, 0)} compact={blocks.length > 0} />
      {blocks.map((block, i) => (
        <div key={block.id}>
          <div className="bg-white border-2 border-line rounded-sm focus-within:border-steel-base transition-colors">
            <div className="flex items-center justify-between gap-2 pl-4 pr-1.5 py-1.5 border-b border-line bg-paper">
              <Label className="text-steel-base">{blockLabel(block.type)}</Label>
              <div className="flex">
                <IconButton label="Move up" disabled={i === 0} onClick={() => onChange(move(blocks, i, i - 1))}>
                  <ChevronUp size={16} />
                </IconButton>
                <IconButton label="Move down" disabled={i === blocks.length - 1} onClick={() => onChange(move(blocks, i, i + 1))}>
                  <ChevronDown size={16} />
                </IconButton>
                <IconButton label="Delete block" className="hover:!text-danger" onClick={() => remove(i)}>
                  <Trash2 size={15} />
                </IconButton>
              </div>
            </div>
            <div className="p-4 md:p-5">
              <BlockForm block={block} onChange={(b) => onChange(blocks.map((x, j) => (j === i ? b : x)))} />
            </div>
          </div>
          <AddBlock onAdd={(t) => insert(t, i + 1)} compact />
        </div>
      ))}
    </div>
  );
}

function AddBlock({ onAdd, compact }: { onAdd: (type: BlockType) => void; compact: boolean }) {
  const [open, setOpen] = useState(!compact);
  if (!open) {
    return (
      <div className="group flex items-center py-2">
        <div className="flex-1 h-px bg-transparent group-hover:bg-line" />
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="mx-2 inline-flex items-center gap-1.5 px-2.5 py-1 text-[13px] font-bold text-steel-base/70 hover:text-rust-dark"
        >
          <Plus size={13} /> Add block
        </button>
        <div className="flex-1 h-px bg-transparent group-hover:bg-line" />
      </div>
    );
  }
  return (
    <div className="my-3 border-2 border-dashed border-line rounded-sm p-3">
      <div className="flex items-center justify-between mb-2 px-1">
        <Label className="text-steel-base">Add a block</Label>
        {compact && (
          <IconButton label="Close" onClick={() => setOpen(false)}>
            <X size={15} />
          </IconButton>
        )}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
        {BLOCK_TYPES.map((b) => (
          <button
            key={b.type}
            type="button"
            onClick={() => {
              onAdd(b.type);
              if (compact) setOpen(false);
            }}
            className="text-left bg-white border border-line hover:border-rust-base px-3 py-2.5 rounded-sm transition-colors"
          >
            <span className="block font-bold text-sm">{b.label}</span>
            <span className="block text-xs text-steel-base leading-snug mt-0.5">{b.hint}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

/** A repeatable list of rows (panels, checklist items, people, contacts). */
function Repeater<T>({
  items,
  onChange,
  make,
  render,
  noun,
  min = 0,
}: {
  items: T[];
  onChange: (items: T[]) => void;
  make: () => T;
  render: (item: T, set: (item: T) => void) => ReactNode;
  noun: string;
  min?: number;
}) {
  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <div key={i} className="border border-line rounded-sm">
          <div className="flex items-center justify-between pl-3 pr-1 py-1 border-b border-line">
            <span className="font-mono text-[11px] text-steel-base">
              {noun} {i + 1}
            </span>
            <div className="flex">
              <IconButton label="Move up" disabled={i === 0} onClick={() => onChange(move(items, i, i - 1))}>
                <ChevronUp size={15} />
              </IconButton>
              <IconButton label="Move down" disabled={i === items.length - 1} onClick={() => onChange(move(items, i, i + 1))}>
                <ChevronDown size={15} />
              </IconButton>
              <IconButton label={`Remove ${noun.toLowerCase()}`} disabled={items.length <= min} onClick={() => onChange(items.filter((_, j) => j !== i))}>
                <X size={15} />
              </IconButton>
            </div>
          </div>
          <div className="p-3 space-y-3">{render(item, (next) => onChange(items.map((x, j) => (j === i ? next : x))))}</div>
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...items, make()])}
        className="inline-flex items-center gap-1.5 text-[13px] font-bold text-rust-dark hover:text-steel-dark"
      >
        <Plus size={13} /> Add {noun.toLowerCase()}
      </button>
    </div>
  );
}

function BlockForm({ block, onChange }: { block: Block; onChange: (block: Block) => void }) {
  switch (block.type) {
    case 'text':
      return (
        <div className="space-y-4">
          <Field label="Heading" hint="Optional. With a heading this becomes a numbered section; leave blank for plain text.">
            <Input value={block.heading} onChange={(e) => onChange({ ...block, heading: e.target.value })} />
          </Field>
          <MarkdownField label="Text" rows={7} value={block.body} onChange={(body) => onChange({ ...block, body })} />
        </div>
      );

    case 'callout':
      return (
        <div className="space-y-4">
          <Field label="Label" hint="Optional, e.g. “The golden rule” or “In plain terms”.">
            <Input value={block.label} onChange={(e) => onChange({ ...block, label: e.target.value })} />
          </Field>
          <MarkdownField label="Text" value={block.body} onChange={(body) => onChange({ ...block, body })} />
        </div>
      );

    case 'alert':
      return (
        <div className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Label">
              <Input value={block.label} onChange={(e) => onChange({ ...block, label: e.target.value })} />
            </Field>
            <Field label="Heading">
              <Input value={block.heading} onChange={(e) => onChange({ ...block, heading: e.target.value })} />
            </Field>
          </div>
          <MarkdownField label="Text" value={block.body} onChange={(body) => onChange({ ...block, body })} />
        </div>
      );

    case 'panels':
      return (
        <Repeater
          noun="Panel"
          min={1}
          items={block.panels}
          onChange={(panels) => onChange({ ...block, panels })}
          make={() => ({ title: '', body: '' })}
          render={(p, set) => (
            <>
              <Field label="Title">
                <Input value={p.title} onChange={(e) => set({ ...p, title: e.target.value })} />
              </Field>
              <MarkdownField label="Text" value={p.body} onChange={(body) => set({ ...p, body })} />
            </>
          )}
        />
      );

    case 'checklist':
      return (
        <div className="space-y-4">
          <Field label="Title" hint="Shown in the dark header bar, e.g. “Your first week”.">
            <Input value={block.title} onChange={(e) => onChange({ ...block, title: e.target.value })} />
          </Field>
          <Repeater
            noun="Item"
            min={1}
            items={block.items}
            onChange={(items) => onChange({ ...block, items })}
            make={() => ({ label: '', note: '' })}
            render={(item, set) => (
              <div className="grid sm:grid-cols-2 gap-3">
                <Field label="Label">
                  <Input value={item.label} onChange={(e) => set({ ...item, label: e.target.value })} />
                </Field>
                <Field label="Note">
                  <Input value={item.note} onChange={(e) => set({ ...item, note: e.target.value })} />
                </Field>
              </div>
            )}
          />
        </div>
      );

    case 'people':
      return (
        <div className="space-y-4">
          <Field label="Layout">
            <Select value={block.layout ?? 'grid'} onChange={(e) => onChange({ ...block, layout: e.target.value as 'grid' | 'stacked' })}>
              <option value="grid">Side by side</option>
              <option value="stacked">Stacked, one per row</option>
            </Select>
          </Field>
          <Repeater
            noun="Person"
            min={1}
            items={block.people}
            onChange={(people) => onChange({ ...block, people })}
            make={() => ({ name: '', role: '', remit: '', photo: '', slack: '', email: '' })}
            render={(p, set) => (
              <>
                <div className="grid sm:grid-cols-2 gap-3">
                  <Field label="Name">
                    <Input value={p.name} onChange={(e) => set({ ...p, name: e.target.value })} />
                  </Field>
                  <Field label="Role">
                    <Input value={p.role} onChange={(e) => set({ ...p, role: e.target.value })} />
                  </Field>
                  <Field label="Slack">
                    <Input value={p.slack} placeholder="@name" onChange={(e) => set({ ...p, slack: e.target.value })} />
                  </Field>
                  <Field label="Email">
                    <Input type="email" value={p.email} onChange={(e) => set({ ...p, email: e.target.value })} />
                  </Field>
                </div>
                <Field label="Photo URL" hint="Optional. Leave blank to show initials. Files in /public/team work as /team/name.jpg.">
                  <Input value={p.photo} onChange={(e) => set({ ...p, photo: e.target.value })} />
                </Field>
                <MarkdownField label="What they look after" rows={3} value={p.remit} onChange={(remit) => set({ ...p, remit })} />
              </>
            )}
          />
        </div>
      );

    case 'rich':
      return <RichTextEditor value={block.html} onChange={(html) => onChange({ ...block, html })} />;

    case 'files':
      return (
        <div className="space-y-4">
          <Field label="Title" hint="Optional, e.g. “Templates” or “Contracts and policies”.">
            <Input value={block.title} onChange={(e) => onChange({ ...block, title: e.target.value })} />
          </Field>
          <FilesField files={block.files} onChange={(files) => onChange({ ...block, files })} />
        </div>
      );

    case 'links':
      return (
        <div className="space-y-4">
          <Field label="Title" hint="Optional, e.g. “Tools we use”.">
            <Input value={block.title} onChange={(e) => onChange({ ...block, title: e.target.value })} />
          </Field>
          <Repeater
            noun="Link"
            min={1}
            items={block.links}
            onChange={(links) => onChange({ ...block, links })}
            make={() => ({ label: '', url: '', note: '' })}
            render={(link, set) => (
              <>
                <div className="grid sm:grid-cols-2 gap-3">
                  <Field label="Label">
                    <Input value={link.label} placeholder="e.g. Time tracking" onChange={(e) => set({ ...link, label: e.target.value })} />
                  </Field>
                  <Field label="Address">
                    <Input
                      value={link.url}
                      placeholder="https://"
                      onChange={(e) => set({ ...link, url: e.target.value })}
                      onBlur={() => link.url.trim() && !/^(https?:|mailto:)/i.test(link.url.trim()) && set({ ...link, url: `https://${link.url.trim()}` })}
                    />
                  </Field>
                </div>
                <Field label="Note">
                  <Input value={link.note} placeholder="Optional, one line on what it is for" onChange={(e) => set({ ...link, note: e.target.value })} />
                </Field>
              </>
            )}
          />
        </div>
      );

    case 'embed': {
      const ok = embedUrl(block.url);
      return (
        <div className="space-y-4">
          <Field
            label="Share link"
            hint={
              !block.url.trim()
                ? 'Paste a Loom, YouTube, Vimeo, Google Docs, Slides, Sheets, Forms, Drive or Figma link. For Google files, share them with anyone who has the link.'
                : ok
                  ? 'Recognised. Check it in Preview.'
                  : 'Not a service we can embed, so it will show as a link instead.'
            }
          >
            <Input value={block.url} placeholder="https://www.loom.com/share/…" onChange={(e) => onChange({ ...block, url: e.target.value })} />
          </Field>
          <Field label="Caption">
            <Input value={block.caption} placeholder="Optional" onChange={(e) => onChange({ ...block, caption: e.target.value })} />
          </Field>
        </div>
      );
    }

    case 'contacts':
      return (
        <Repeater
          noun="Row"
          min={1}
          items={block.rows}
          onChange={(rows) => onChange({ ...block, rows })}
          make={() => ({ label: '', value: '' })}
          render={(row, set) => (
            <div className="grid sm:grid-cols-2 gap-3">
              <Field label="Label">
                <Input value={row.label} onChange={(e) => set({ ...row, label: e.target.value })} />
              </Field>
              <Field label="Value">
                <Input value={row.value} onChange={(e) => set({ ...row, value: e.target.value })} />
              </Field>
            </div>
          )}
        />
      );
  }
}

function FilesField({ files, onChange }: { files: StoredFile[]; onChange: (files: StoredFile[]) => void }) {
  const spaceId = useUploadSpace();
  const input = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(0);
  const [error, setError] = useState('');

  const add = async (list: File[]) => {
    if (!spaceId) return;
    setError('');
    setUploading(list.length);
    const added: StoredFile[] = [];
    for (const file of list) {
      try {
        added.push(await uploadFile(spaceId, file));
      } catch (e) {
        setError((e as Error).message);
      }
      setUploading((n) => n - 1);
    }
    onChange([...files, ...added]);
  };

  return (
    <div className="space-y-3">
      {files.map((file, i) => (
        <div key={file.path} className="flex items-center gap-3 border border-line rounded-sm pl-3 pr-1 py-1.5">
          <FileText size={16} className="text-rust-base flex-shrink-0" />
          <Input value={file.name} aria-label="File name shown on the page" className="!py-1.5 !border-transparent hover:!border-line" onChange={(e) => onChange(files.map((f, j) => (j === i ? { ...f, name: e.target.value } : f)))} />
          <span className="font-mono text-[11px] text-steel-base whitespace-nowrap">{formatSize(file.size)}</span>
          <IconButton label="Move up" disabled={i === 0} onClick={() => onChange(move(files, i, i - 1))}>
            <ChevronUp size={15} />
          </IconButton>
          <IconButton label="Remove file" onClick={() => onChange(files.filter((_, j) => j !== i))}>
            <X size={15} />
          </IconButton>
        </div>
      ))}
      {error && <Notice tone="error">{error}</Notice>}
      {spaceId ? (
        <>
          <Button variant="outline" onClick={() => input.current?.click()} disabled={uploading > 0}>
            <Upload size={14} /> {uploading > 0 ? `Uploading ${uploading}…` : 'Upload files'}
          </Button>
          <input
            ref={input}
            type="file"
            multiple
            hidden
            onChange={(e) => {
              const list = [...(e.target.files ?? [])];
              e.target.value = '';
              if (list.length) add(list);
            }}
          />
          <p className="text-xs text-steel-base">Up to 50 MB each. Only people who can see this space can download them.</p>
        </>
      ) : (
        <p className="text-sm text-steel-base">Uploads work once the hub is connected to its database.</p>
      )}
    </div>
  );
}
