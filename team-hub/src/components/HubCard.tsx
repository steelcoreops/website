import type { ReactNode } from 'react';
import { Link } from 'react-router';

export const HubCard = ({ to, label, title, summary, badge }: { to: string; label: string; title: string; summary?: string | null; badge?: ReactNode }) => (
  <Link
    to={to}
    className="group block bg-white border border-line rounded-sm p-6 transition-all duration-150 shadow-sm hover:shadow-md hover:border-rust-base/50 hover:-translate-y-0.5"
  >
    <div className="flex items-center justify-between gap-3">
      <span className="font-mono text-xs font-bold text-rust-base">{label}</span>
      {badge}
    </div>
    <h3 className="font-bold tracking-[-0.01em] text-xl leading-snug mt-3 mb-2 group-hover:text-rust-dark transition-colors">{title}</h3>
    {summary && <p className="text-[14.5px] text-steel-base leading-snug">{summary}</p>}
  </Link>
);
