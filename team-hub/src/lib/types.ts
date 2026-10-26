export type Role = 'admin' | 'member';

export type Profile = {
  id: string;
  email: string;
  full_name: string | null;
  organisation: string | null;
  role: Role;
  active: boolean;
  created_at: string;
};

export type Space = {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  sort: number;
};

export type Topic = {
  id: string;
  space_id: string;
  name: string;
  description: string | null;
  sort: number;
};

export type Panel = { title: string; body: string };
export type ChecklistItem = { label: string; note: string };
export type Person = { name: string; role: string; remit: string; photo: string; slack: string; email: string };
export type ContactRow = { label: string; value: string };
/** path is the key in the hub-files storage bucket: <space id>/<uuid>/<file name>. */
export type StoredFile = { name: string; path: string; size: number };
export type LinkItem = { label: string; url: string; note: string };

export type Block =
  | { id: string; type: 'text'; heading: string; body: string }
  | { id: string; type: 'callout'; label: string; body: string }
  | { id: string; type: 'alert'; label: string; heading: string; body: string }
  | { id: string; type: 'panels'; panels: Panel[] }
  | { id: string; type: 'checklist'; title: string; items: ChecklistItem[] }
  | { id: string; type: 'people'; people: Person[] }
  | { id: string; type: 'contacts'; rows: ContactRow[] }
  | { id: string; type: 'rich'; html: string }
  | { id: string; type: 'files'; title: string; files: StoredFile[] }
  | { id: string; type: 'links'; title: string; links: LinkItem[] }
  | { id: string; type: 'embed'; url: string; caption: string };

export type BlockType = Block['type'];

export type Page = {
  id: string;
  space_id: string;
  topic_id: string | null;
  slug: string;
  title: string;
  eyebrow: string | null;
  summary: string | null;
  blocks: Block[];
  published: boolean;
  requires_ack: boolean;
  version: number;
  sort: number;
  updated_at: string;
};

export type PageSummary = Pick<Page, 'id' | 'topic_id' | 'slug' | 'title' | 'eyebrow' | 'summary' | 'published' | 'requires_ack' | 'version' | 'sort' | 'updated_at'>;

export type Acknowledgement = { page_id: string; user_id: string; version: number; acknowledged_at: string };
