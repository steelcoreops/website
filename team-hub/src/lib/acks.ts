import type { Acknowledgement, Page } from './types';

export type AckStatus =
  | { state: 'none' }
  | { state: 'pending' }
  | { state: 'outdated'; at: string }
  | { state: 'done'; at: string };

type AckPage = Pick<Page, 'id' | 'requires_ack' | 'version' | 'published'>;

export const PAGE_SUMMARY_COLUMNS = 'id, topic_id, slug, title, eyebrow, summary, published, requires_ack, version, sort, updated_at';

/** Where one person stands on one page. Only published pages that ask for it can be acknowledged. */
export function ackStatus(page: AckPage, acks: Acknowledgement[], userId?: string): AckStatus {
  if (!page.requires_ack || !page.published) return { state: 'none' };
  const mine = acks.filter((a) => a.page_id === page.id && (!userId || a.user_id === userId));
  const current = mine.find((a) => a.version === page.version);
  if (current) return { state: 'done', at: current.acknowledged_at };
  const latest = mine.sort((a, b) => b.version - a.version)[0];
  return latest ? { state: 'outdated', at: latest.acknowledged_at } : { state: 'pending' };
}

export const needsAck = (s: AckStatus) => s.state === 'pending' || s.state === 'outdated';
