import type { PageSummary, Topic } from './types';

export type TopicGroup = { topic: Topic | null; pages: PageSummary[] };

/** Pages grouped under their topics in topic order. Pages with no topic come last, under a null topic. */
export function groupPages(topics: Topic[], pages: PageSummary[]): TopicGroup[] {
  const known = new Set(topics.map((t) => t.id));
  const groups: TopicGroup[] = topics.map((topic) => ({ topic, pages: pages.filter((p) => p.topic_id === topic.id) }));
  const loose = pages.filter((p) => !p.topic_id || !known.has(p.topic_id));
  if (loose.length) groups.push({ topic: null, pages: loose });
  return groups;
}

export const sortTopics = (topics: Topic[]) => [...topics].sort((a, b) => a.sort - b.sort || a.name.localeCompare(b.name));
