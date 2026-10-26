// Dev-only preview used when Supabase is not configured: seed content, editable in memory, no sign-in.
import { Pencil } from 'lucide-react';
import { createContext, useContext, useState } from 'react';
import { BrowserRouter, Link, Navigate, Route, Routes, useNavigate, useParams } from 'react-router';
import seedSql from '../supabase/seed.sql?raw';
import { AckPanel } from './components/AckPanel';
import { BlockListEditor } from './components/blocks/BlockEditor';
import { Logo } from './components/Logo';
import { Dot, SpaceSidebar } from './components/SpaceSidebar';
import { PageArticle } from './components/PageArticle';
import { Button, buttonClass, Card, Field, Input, Label, Textarea } from './components/ui';
import { ackStatus, needsAck } from './lib/acks';
import { groupPages } from './lib/topics';
import type { Acknowledgement, Block, PageSummary, Topic } from './lib/types';

type SeedPage = { slug: string; title: string; eyebrow: string; summary: string; blocks: Block[] };

const str = `'((?:[^']|'')*)'`;
const pattern = new RegExp(`select id, ${str}, ${str}, ${str}, ${str}, \\d+, true, \\$blocks\\$([\\s\\S]*?)\\$blocks\\$`, 'g');
const unq = (s: string) => s.replace(/''/g, "'");
const seedPages: SeedPage[] = [...seedSql.matchAll(pattern)].map((m) => ({
  slug: unq(m[1]!),
  title: unq(m[2]!),
  eyebrow: unq(m[3]!),
  summary: unq(m[4]!),
  blocks: JSON.parse(m[5]!) as Block[],
}));

// Mirrors the update at the end of seed.sql.
const ACK_SLUGS = ['getting-started', 'ways-of-working'];

// Preview-only page showing the rich text and links blocks with sample content.
const examplePage: SeedPage = {
  slug: 'example-rich-page',
  title: 'Example: Rich Text Page',
  eyebrow: 'Preview only',
  summary: 'A sample page written with the rich text editor. Open Edit page to try the toolbar.',
  blocks: [
    {
      id: 'ex-1',
      type: 'rich',
      html: '<h2>Before your first client call</h2><p>Write pages the way you would in a document. Use <strong>bold</strong>, <em>italics</em> and <a href="https://steelcoreoperations.com">links to other sites</a>, which open in a new tab.</p><ul><li><p>Bullet lists</p></li><li><p>Numbered lists and quotes</p></li><li><p>Images uploaded straight into the text</p></li></ul><blockquote><p>Quotes stand out with a rust edge.</p></blockquote><h3>Placeholders still work</h3><p>Anything in double braces, like {{the client name}}, shows highlighted until it is filled in.</p>',
    },
    {
      id: 'ex-2',
      type: 'links',
      title: 'Tools we use',
      links: [
        { label: 'Steel Core website', url: 'https://steelcoreoperations.com', note: 'What we tell clients about ourselves.' },
        { label: 'Book a call', url: 'https://calendly.com/steelcoreoperations/consult', note: 'Our consult booking page.' },
      ],
    },
  ],
};

const TOPICS: Topic[] = [
  { id: 'working', space_id: 'demo', name: 'Working with Steel Core', description: null, sort: 1 },
  { id: 'examples', space_id: 'demo', name: 'Examples (preview only)', description: null, sort: 2 },
];

const summaryOf = (p: SeedPage, i: number): PageSummary => ({
  id: p.slug,
  topic_id: p.slug === examplePage.slug ? 'examples' : 'working',
  slug: p.slug,
  title: p.title,
  eyebrow: p.eyebrow,
  summary: p.summary,
  published: true,
  requires_ack: ACK_SLUGS.includes(p.slug),
  version: 1,
  sort: i,
  updated_at: new Date().toISOString(),
});


// Edits and acknowledgements live in memory only, so the editor can be tried without a database. A refresh resets to the seed.
type DemoState = { pages: SeedPage[]; save: (slug: string, page: SeedPage) => void; acks: Acknowledgement[]; acknowledge: (slug: string) => void };
const PagesContext = createContext<DemoState>({ pages: [], save: () => {}, acks: [], acknowledge: () => {} });

function DemoPage() {
  const { pageSlug } = useParams();
  const { pages, acks, acknowledge } = useContext(PagesContext);
  const page = pages.find((p) => p.slug === pageSlug);
  if (!page) return <Navigate to="/s/delivery-partners/ways-of-working" replace />;
  return (
    <div className="max-w-[800px] mx-auto px-4 sm:px-6 py-10 md:py-14 pb-24">
      <div className="flex justify-end mb-6">
        <Link to={`/s/delivery-partners/${page.slug}/edit`} className={buttonClass('secondary')}>
          <Pencil size={14} /> Edit page
        </Link>
      </div>
      <PageArticle {...page} spaceName="Delivery Partners" updatedAt={new Date().toISOString()} published />
      <AckPanel key={page.slug} title={page.title} status={ackStatus(summaryOf(page, 0), acks)} onAcknowledge={async () => acknowledge(page.slug)} />
    </div>
  );
}

function DemoSidebar() {
  const { pages, acks } = useContext(PagesContext);
  return (
    <SpaceSidebar
      spaceName="Delivery Partners"
      spaceHref="/s/delivery-partners/ways-of-working"
      groups={groupPages(TOPICS, pages.map(summaryOf))}
      pageHref={(p) => `/s/delivery-partners/${p.slug}`}
      marker={(p) => (needsAck(ackStatus(p, acks)) ? <Dot title="Needs your acknowledgement" /> : null)}
    />
  );
}

function DemoEditor() {
  const { pageSlug } = useParams();
  const { pages, save } = useContext(PagesContext);
  const navigate = useNavigate();
  const original = pages.find((p) => p.slug === pageSlug);
  const [draft, setDraft] = useState(original);
  const [tab, setTab] = useState<'edit' | 'preview'>('edit');
  if (!original || !draft) return <Navigate to="/s/delivery-partners/ways-of-working" replace />;

  const update = (patch: Partial<SeedPage>) => setDraft({ ...draft, ...patch });
  const done = () => navigate(`/s/delivery-partners/${original.slug}`);

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
            <Button variant="ghost" onClick={done}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                save(original.slug, draft);
                done();
              }}
            >
              Save
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 pt-8">
        {tab === 'preview' ? (
          <div className="max-w-[800px] mx-auto">
            <PageArticle {...draft} spaceName="Delivery Partners" updatedAt={new Date().toISOString()} published />
          </div>
        ) : (
          <div className="space-y-8">
            <Card className="p-5 md:p-6">
              <Label className="text-rust-base mb-5">Page settings</Label>
              <div className="grid md:grid-cols-2 gap-5">
                <Field label="Title">
                  <Input value={draft.title} onChange={(e) => update({ title: e.target.value })} />
                </Field>
                <Field label="Eyebrow" hint="Small label above the title, e.g. “Delivery Partners”.">
                  <Input value={draft.eyebrow} onChange={(e) => update({ eyebrow: e.target.value })} />
                </Field>
                <div className="md:col-span-2">
                  <Field label="Summary" hint="One or two sentences. Shown under the title and on the space's cards.">
                    <Textarea rows={2} value={draft.summary} onChange={(e) => update({ summary: e.target.value })} />
                  </Field>
                </div>
              </div>
            </Card>
            <div>
              <Label className="text-steel-base mb-3">Content</Label>
              <BlockListEditor blocks={draft.blocks} onChange={(blocks) => update({ blocks })} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function DemoApp() {
  const [pages, setPages] = useState([...seedPages, examplePage]);
  const [acks, setAcks] = useState<Acknowledgement[]>([]);
  const save = (slug: string, page: SeedPage) => setPages((all) => all.map((p) => (p.slug === slug ? page : p)));
  const acknowledge = (slug: string) =>
    setAcks((all) => [...all, { page_id: slug, user_id: 'demo', version: 1, acknowledged_at: new Date().toISOString() }]);
  return (
    <PagesContext.Provider value={{ pages, save, acks, acknowledge }}>
    <BrowserRouter>
      <div className="bg-rust-base text-white text-center font-mono text-[11px] font-bold uppercase tracking-[0.14em] py-1.5">
        Local preview · edits are not saved · refresh to reset
      </div>
      <header className="bg-steel-dark text-white sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center">
          <Logo tone="light" />
        </div>
      </header>
      <div className="md:flex max-w-[1400px] mx-auto">
        <DemoSidebar />
        <div className="flex-1 min-w-0">
      <Routes>
        <Route path="/s/delivery-partners/:pageSlug" element={<DemoPage />} />
        <Route path="/s/delivery-partners/:pageSlug/edit" element={<DemoEditor />} />
        <Route path="*" element={<Navigate to="/s/delivery-partners/ways-of-working" replace />} />
      </Routes>
        </div>
      </div>
    </BrowserRouter>
    </PagesContext.Provider>
  );
}
