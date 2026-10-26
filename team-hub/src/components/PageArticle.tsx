import { formatDate } from '../lib/format';
import type { Block } from '../lib/types';
import { Blocks } from './blocks/BlockView';
import { Badge, Eyebrow, Title } from './ui';

type Props = {
  title: string;
  eyebrow: string | null;
  summary: string | null;
  blocks: Block[];
  spaceName: string;
  updatedAt?: string;
  published: boolean;
};

/** A page laid out like the Discovery terms: eyebrow, rust-tailed title, ruled intro, meta row, numbered sections. */
export function PageArticle({ title, eyebrow, summary, blocks, spaceName, updatedAt, published }: Props) {
  return (
    <article>
      <div className="flex items-center gap-3 mb-7">
        {eyebrow?.trim() && <Eyebrow>{eyebrow}</Eyebrow>}
        {!published && <Badge tone="rust">Draft, only the Steel Core team can see this</Badge>}
      </div>
      <Title text={title || 'Untitled'} className="text-[clamp(32px,6vw,48px)] mb-6" />

      {summary?.trim() && (
        <div className="text-base md:text-[17px] text-steel-base pb-6 border-b border-line leading-relaxed">{summary}</div>
      )}

      <div className={`flex flex-wrap gap-8 py-4 pb-10 text-[13px] text-steel-base ${summary?.trim() ? '' : 'border-t border-line'}`}>
        <div>
          <strong className="block text-steel-dark font-bold mb-0.5">For</strong>
          {spaceName}
        </div>
        {updatedAt && (
          <div>
            <strong className="block text-steel-dark font-bold mb-0.5">Last updated</strong>
            {formatDate(updatedAt)}
          </div>
        )}
        <div>
          <strong className="block text-steel-dark font-bold mb-0.5">From</strong>
          Steel Core Operations LLP
        </div>
      </div>

      <Blocks blocks={blocks} />
    </article>
  );
}
