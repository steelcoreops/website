import { ArrowUpRight, Download, FileText, Mail, MessageSquare } from 'lucide-react';
import { useEffect, useState } from 'react';
import { embedUrl, isDocument } from '../../lib/embed';
import { initials, pad } from '../../lib/format';
import { renderInline, renderMarkdown, renderRich } from '../../lib/markdown';
import { downloadUrl, formatSize, signedUrls } from '../../lib/storage';
import type { Block, Person, StoredFile } from '../../lib/types';
import { Label } from '../ui';

export const Markdown = ({ source, invert = false, className = '' }: { source: string; invert?: boolean; className?: string }) => (
  <div className={`md ${invert ? 'on-dark' : ''} ${className}`} dangerouslySetInnerHTML={{ __html: renderMarkdown(source) }} />
);

/** Rich text, with uploaded images pointed at fresh signed links (stored links expire). */
function RichHtml({ html }: { html: string }) {
  const [out, setOut] = useState(() => renderRich(html));

  useEffect(() => {
    const clean = renderRich(html);
    setOut(clean);
    const doc = new DOMParser().parseFromString(clean, 'text/html');
    const imgs = [...doc.querySelectorAll<HTMLImageElement>('img[data-path]')];
    if (!imgs.length) return;
    let live = true;
    signedUrls(imgs.map((i) => i.dataset.path!)).then((urls) => {
      if (!live) return;
      imgs.forEach((img) => {
        const url = urls.get(img.dataset.path!);
        if (url) img.src = url;
      });
      setOut(doc.body.innerHTML);
    });
    return () => {
      live = false;
    };
  }, [html]);

  return <div className="md rich" dangerouslySetInnerHTML={{ __html: out }} />;
}

function FileRow({ file }: { file: StoredFile }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const open = async () => {
    setError('');
    setBusy(true);
    try {
      window.location.assign(await downloadUrl(file));
    } catch (e) {
      setError((e as Error).message);
    }
    setBusy(false);
  };
  return (
    <button type="button" onClick={open} disabled={busy} className="group w-full flex items-center gap-4 px-5 py-4 text-left border-t border-line first:border-t-0 hover:bg-paper transition-colors">
      <FileText size={20} className="text-rust-base flex-shrink-0" />
      <span className="flex-1 min-w-0">
        <span className="block font-bold text-[15px] truncate group-hover:text-rust-dark">{file.name}</span>
        <span className="block font-mono text-[11px] text-steel-base">{error || (busy ? 'Preparing download…' : formatSize(file.size))}</span>
      </span>
      <Download size={17} className="text-steel-base group-hover:text-rust-dark flex-shrink-0" />
    </button>
  );
}

const hostOf = (url: string) => {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
};

const BlockTitle = ({ text }: { text: string }) =>
  text.trim() ? <h3 className="font-display text-lg uppercase tracking-tight leading-tight mb-3">{text}</h3> : null;

const Inline = ({ source, className = '' }: { source: string; className?: string }) => (
  <span className={className} dangerouslySetInnerHTML={{ __html: renderInline(source) }} />
);

/** Renders a page's blocks. Sections with a heading are numbered in order. */
export function Blocks({ blocks }: { blocks: Block[] }) {
  let n = 0;
  return (
    <div className="space-y-8">
      {blocks.map((block) => {
        const num = block.type === 'text' && block.heading.trim() ? ++n : undefined;
        return <BlockView key={block.id} block={block} num={num} />;
      })}
    </div>
  );
}

function BlockView({ block, num }: { block: Block; num?: number }) {
  switch (block.type) {
    case 'text':
      return (
        <section className={num ? 'pt-4' : ''}>
          {num !== undefined && (
            <div className="flex items-baseline gap-3.5 mb-4 pb-3 border-b border-line">
              <span className="font-display text-base text-rust-base flex-shrink-0">{pad(num)}</span>
              <h2 className="font-display text-lg md:text-xl uppercase tracking-tight leading-tight">{block.heading}</h2>
            </div>
          )}
          {block.body.trim() && <Markdown source={block.body} />}
        </section>
      );

    case 'callout':
      return (
        <div className="border-l-4 border-rust-base bg-paper px-6 py-5">
          {block.label.trim() && <Label className="text-rust-base mb-2">{block.label}</Label>}
          <Markdown source={block.body} />
        </div>
      );

    case 'alert':
      return (
        <div className="bg-steel-dark text-white p-7 md:p-8 rounded-sm">
          {block.label.trim() && <Label className="text-rust-base mb-3">{block.label}</Label>}
          {block.heading.trim() && <h3 className="font-display text-xl md:text-2xl uppercase tracking-tight leading-none mb-4">{block.heading}</h3>}
          <Markdown source={block.body} invert />
        </div>
      );

    case 'panels':
      return (
        <div className="grid md:grid-cols-2 gap-4">
          {block.panels.map((panel, i) => {
            const dark = i === 0;
            return (
              <div key={i} className={`p-6 rounded-sm ${dark ? 'bg-steel-dark text-white' : 'bg-white border border-line'}`}>
                {panel.title.trim() && <Label className="text-rust-base mb-4">{panel.title}</Label>}
                <Markdown source={panel.body} invert={dark} className="text-[15px]" />
              </div>
            );
          })}
        </div>
      );

    case 'checklist':
      return (
        <div className="border-2 border-steel-dark bg-white rounded-sm overflow-hidden">
          {block.title.trim() && (
            <div className="bg-steel-dark text-white px-5 py-3">
              <Label>{block.title}</Label>
            </div>
          )}
          <ol>
            {block.items.map((item, i) => (
              <li key={i} className="grid grid-cols-[2.4rem_1fr] gap-2 px-5 py-3.5 border-t border-line first:border-t-0">
                <span className="font-display text-sm text-rust-base pt-0.5">{pad(i + 1)}</span>
                <span>
                  <Inline source={item.label} className="block font-bold text-[15.5px]" />
                  {item.note.trim() && <Inline source={item.note} className="block text-steel-base text-[14.5px] mt-0.5" />}
                </span>
              </li>
            ))}
          </ol>
        </div>
      );

    case 'people':
      return (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {block.people.map((person, i) => (
            <PersonCard key={i} person={person} />
          ))}
        </div>
      );

    case 'contacts':
      return (
        <div className="grid gap-2.5">
          {block.rows.map((row, i) => (
            <div key={i} className="flex flex-wrap items-baseline gap-x-6 gap-y-1 bg-white border border-line rounded-sm px-5 py-4">
              <span className="font-bold text-[15px] sm:min-w-[200px]">{row.label}</span>
              <Inline source={row.value} className="font-mono text-sm text-steel-base break-all select-all" />
            </div>
          ))}
        </div>
      );

    case 'rich':
      return block.html.trim() ? <RichHtml html={block.html} /> : null;

    case 'files':
      return (
        <div>
          <BlockTitle text={block.title} />
          {block.files.length > 0 && (
            <div className="bg-white border-2 border-steel-dark rounded-sm overflow-hidden">
              {block.files.map((file) => (
                <FileRow key={file.path} file={file} />
              ))}
            </div>
          )}
        </div>
      );

    case 'links':
      return (
        <div>
          <BlockTitle text={block.title} />
          <div className="grid sm:grid-cols-2 gap-3">
            {block.links
              .filter((l) => l.url.trim())
              .map((link, i) => (
                <a
                  key={i}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-3 bg-white border border-line hover:border-rust-base rounded-sm px-5 py-4 transition-colors"
                >
                  <span className="flex-1 min-w-0">
                    <span className="block font-bold text-[15px] group-hover:text-rust-dark">{link.label.trim() || hostOf(link.url)}</span>
                    {link.note.trim() && <span className="block text-sm text-steel-base leading-snug mt-0.5">{link.note}</span>}
                  </span>
                  <ArrowUpRight size={17} className="text-rust-base flex-shrink-0 mt-0.5" />
                </a>
              ))}
          </div>
        </div>
      );

    case 'embed': {
      const src = embedUrl(block.url);
      if (!src) {
        return block.url.trim() ? (
          <a href={block.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 font-bold text-rust-dark underline underline-offset-2">
            {block.caption.trim() || block.url} <ArrowUpRight size={15} />
          </a>
        ) : null;
      }
      return (
        <figure>
          <div className={`relative w-full bg-steel-dark border-2 border-steel-dark rounded-sm overflow-hidden ${isDocument(src) ? 'aspect-[4/5] sm:aspect-[4/3]' : 'aspect-video'}`}>
            <iframe
              src={src}
              title={block.caption.trim() || 'Embedded content'}
              className="absolute inset-0 w-full h-full"
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
              allowFullScreen
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
          {block.caption.trim() && <figcaption className="mt-2 text-sm text-steel-base">{block.caption}</figcaption>}
        </figure>
      );
    }
  }
}

function PersonCard({ person }: { person: Person }) {
  return (
    <div className="bg-white border border-line rounded-sm overflow-hidden flex flex-col">
      {person.photo.trim() ? (
        <img src={person.photo} alt="" className="w-full aspect-[4/3] object-cover object-top bg-paper" loading="lazy" />
      ) : (
        <div className="w-full aspect-[4/3] bg-steel-dark flex items-center justify-center">
          <span className="font-display text-4xl text-rust-base">{initials(person.name || '?')}</span>
        </div>
      )}
      <div className="p-6 flex flex-col flex-1">
        <h3 className="font-display text-lg uppercase tracking-tight leading-tight">{person.name}</h3>
        {person.role.trim() && <Label className="text-rust-base mt-1.5 mb-4">{person.role}</Label>}
        {person.remit.trim() && <Markdown source={person.remit} className="text-[15px] mb-5" />}
        {(person.slack.trim() || person.email.trim()) && (
          <div className="mt-auto pt-4 border-t border-line space-y-1.5 text-sm text-steel-base">
            {person.slack.trim() && (
              <div className="flex items-center gap-2">
                <MessageSquare size={14} className="text-rust-base flex-shrink-0" aria-label="Slack" />
                <span className="font-mono">{person.slack}</span>
              </div>
            )}
            {person.email.trim() && (
              <div className="flex items-center gap-2 min-w-0">
                <Mail size={14} className="text-rust-base flex-shrink-0" aria-label="Email" />
                <a href={`mailto:${person.email}`} className="font-mono truncate hover:text-rust-dark">
                  {person.email}
                </a>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
