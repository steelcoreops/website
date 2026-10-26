import type { Block, BlockType } from './types';

export const BLOCK_TYPES: { type: BlockType; label: string; hint: string }[] = [
  { type: 'rich', label: 'Rich text', hint: 'Write freely: headings, lists, links, images' },
  { type: 'text', label: 'Section', hint: 'Numbered heading with text, or plain text with no heading' },
  { type: 'callout', label: 'Callout', hint: 'A rule or key point, rust edge' },
  { type: 'panels', label: 'Two panels', hint: 'Side-by-side boxes, e.g. ours / yours' },
  { type: 'checklist', label: 'Checklist', hint: 'Numbered steps or a template outline' },
  { type: 'people', label: 'People', hint: 'Team cards with photo, remit and contact' },
  { type: 'contacts', label: 'Contact list', hint: 'Label and value rows' },
  { type: 'alert', label: 'Alert box', hint: 'Dark box for urgent or important info' },
  { type: 'files', label: 'Downloads', hint: 'Upload files: PDFs, templates, contracts' },
  { type: 'links', label: 'Links', hint: 'Cards linking out to tools and documents' },
  { type: 'embed', label: 'Embed', hint: 'Loom, YouTube, Vimeo, Google Docs, Slides, Figma' },
];

export const blockLabel = (type: BlockType) => BLOCK_TYPES.find((b) => b.type === type)?.label ?? type;

export function newBlock(type: BlockType): Block {
  const id = crypto.randomUUID();
  switch (type) {
    case 'text':
      return { id, type, heading: '', body: '' };
    case 'callout':
      return { id, type, label: '', body: '' };
    case 'alert':
      return { id, type, label: 'Urgent', heading: '', body: '' };
    case 'panels':
      return { id, type, panels: [{ title: '', body: '' }, { title: '', body: '' }] };
    case 'checklist':
      return { id, type, title: '', items: [{ label: '', note: '' }] };
    case 'people':
      return { id, type, people: [{ name: '', role: '', remit: '', photo: '', slack: '', email: '' }] };
    case 'contacts':
      return { id, type, rows: [{ label: '', value: '' }] };
    case 'rich':
      return { id, type, html: '' };
    case 'files':
      return { id, type, title: '', files: [] };
    case 'links':
      return { id, type, title: '', links: [{ label: '', url: '', note: '' }] };
    case 'embed':
      return { id, type, url: '', caption: '' };
  }
}
