import type { ReactNode } from 'react';
import { Link } from 'react-router';

export const HubCard = ({ to, label, title, summary, badge }: { to: string; label: string; title: string; summary?: string | null; badge?: ReactNode }) => (
  <Link
    to={to}
    className="group block bg-white border-2 border-steel-dark rounded-sm p-6 transition-all duration-150 shadow-[4px_4px_0_0_var(--color-steel-dark)] hover:shadow-[4px_4px_0_0_var(--color-rust-base)] hover:-translate-y-0.5"
  >
    <div className="flex items-center justify-between gap-3">
      <span className="font-display text-sm text-rust-base">{label}</span>
      {badge}
    </div>
    <h3 className="font-display text-xl uppercase tracking-tight leading-tight mt-3 mb-2.5 group-hover:text-rust-dark transition-colors">{title}</h3>
    {summary && <p className="text-[14.5px] text-steel-base leading-snug">{summary}</p>}
  </Link>
);
