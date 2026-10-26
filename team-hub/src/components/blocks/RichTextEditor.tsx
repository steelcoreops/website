import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import Underline from '@tiptap/extension-underline';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import {
  Bold,
  Heading2,
  Heading3,
  Image as ImageIcon,
  Italic,
  Link as LinkIcon,
  List,
  ListOrdered,
  Minus,
  Quote,
  Redo,
  Strikethrough,
  Underline as UnderlineIcon,
  Undo,
  Unlink,
} from 'lucide-react';
import { useRef, useState, type ReactNode } from 'react';
import { signedUrls, uploadFile, useUploadSpace } from '../../lib/storage';

/** Images keep their storage path in data-path, so the page can swap in a fresh signed link each time it is viewed. */
const StoredImage = Image.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      path: {
        default: null,
        parseHTML: (el) => el.getAttribute('data-path'),
        renderHTML: (attrs) => (attrs.path ? { 'data-path': attrs.path } : {}),
      },
    };
  },
});

function ToolbarButton({ onClick, active, disabled, title, children }: { onClick: () => void; active?: boolean; disabled?: boolean; title: string; children: ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      aria-label={title}
      aria-pressed={active}
      className={`p-2 rounded-sm transition-colors disabled:opacity-30 ${active ? 'bg-steel-dark text-white' : 'text-steel-base hover:text-steel-dark hover:bg-paper'}`}
    >
      {children}
    </button>
  );
}

const Divider = () => <div className="w-px h-5 bg-line mx-1 self-center" />;

export function RichTextEditor({ value, onChange }: { value: string; onChange: (html: string) => void }) {
  const spaceId = useUploadSpace();
  const fileInput = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [2, 3] } }),
      Underline,
      StoredImage,
      Link.configure({ openOnClick: false, autolink: true, defaultProtocol: 'https' }),
      Placeholder.configure({ placeholder: 'Start writing…' }),
    ],
    content: value,
    onUpdate: ({ editor }) => onChange(editor.isEmpty ? '' : editor.getHTML()),
    editorProps: { attributes: { class: 'md rich min-h-[180px] px-4 py-3 focus:outline-none' } },
  });

  if (!editor) return null;

  const addImage = async (file: File) => {
    if (!spaceId) return;
    setError('');
    setUploading(true);
    try {
      const stored = await uploadFile(spaceId, file);
      const url = (await signedUrls([stored.path])).get(stored.path);
      if (url) editor.chain().focus().insertContent({ type: 'image', attrs: { src: url, alt: '', path: stored.path } }).run();
    } catch (e) {
      setError((e as Error).message);
    }
    setUploading(false);
  };

  return (
    <div className="border-2 border-line rounded-sm bg-white focus-within:border-steel-base transition-colors">
      <div className="flex flex-wrap items-center gap-0.5 p-1.5 border-b border-line bg-paper sticky top-0 z-10">
        <ToolbarButton onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()} title="Undo">
          <Undo size={15} />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()} title="Redo">
          <Redo size={15} />
        </ToolbarButton>
        <Divider />
        <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive('heading', { level: 2 })} title="Heading">
          <Heading2 size={15} />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive('heading', { level: 3 })} title="Subheading">
          <Heading3 size={15} />
        </ToolbarButton>
        <Divider />
        <ToolbarButton onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive('bold')} title="Bold">
          <Bold size={15} />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive('italic')} title="Italic">
          <Italic size={15} />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleUnderline().run()} active={editor.isActive('underline')} title="Underline">
          <UnderlineIcon size={15} />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleStrike().run()} active={editor.isActive('strike')} title="Strikethrough">
          <Strikethrough size={15} />
        </ToolbarButton>
        <Divider />
        <ToolbarButton onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive('bulletList')} title="Bullet list">
          <List size={15} />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive('orderedList')} title="Numbered list">
          <ListOrdered size={15} />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive('blockquote')} title="Quote">
          <Quote size={15} />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().setHorizontalRule().run()} title="Divider line">
          <Minus size={15} />
        </ToolbarButton>
        <Divider />
        <ToolbarButton
          onClick={() => {
            const current = editor.getAttributes('link').href as string | undefined;
            const input = window.prompt('Link address', current ?? 'https://');
            if (input === null) return;
            const href = input.trim();
            if (!href || href === 'https://') return void editor.chain().focus().extendMarkRange('link').unsetLink().run();
            const full = /^(https?:|mailto:|tel:|\/)/i.test(href) ? href : `https://${href}`;
            if (editor.state.selection.empty && !editor.isActive('link')) {
              editor.chain().focus().insertContent({ type: 'text', text: href, marks: [{ type: 'link', attrs: { href: full } }] }).run();
            } else {
              editor.chain().focus().extendMarkRange('link').setLink({ href: full }).run();
            }
          }}
          active={editor.isActive('link')}
          title="Add or edit link"
        >
          <LinkIcon size={15} />
        </ToolbarButton>
        {editor.isActive('link') && (
          <ToolbarButton onClick={() => editor.chain().focus().extendMarkRange('link').unsetLink().run()} title="Remove link">
            <Unlink size={15} />
          </ToolbarButton>
        )}
        <ToolbarButton
          onClick={() => fileInput.current?.click()}
          disabled={!spaceId || uploading}
          title={spaceId ? (uploading ? 'Uploading…' : 'Insert image') : 'Image uploads work once the hub is connected'}
        >
          <ImageIcon size={15} />
        </ToolbarButton>
        <input
          ref={fileInput}
          type="file"
          accept="image/*"
          hidden
          onChange={(e) => {
            const file = e.target.files?.[0];
            e.target.value = '';
            if (file) addImage(file);
          }}
        />
        {uploading && <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-steel-base ml-2">Uploading…</span>}
      </div>
      <EditorContent editor={editor} />
      {error && <p className="px-4 pb-3 text-sm text-danger">{error}</p>}
    </div>
  );
}
