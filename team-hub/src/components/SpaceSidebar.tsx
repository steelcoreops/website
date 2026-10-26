import { ChevronDown, Plus, Settings2 } from 'lucide-react';
import { useEffect, useState, type ReactNode } from 'react';
import { Link, NavLink, useLocation } from 'react-router';
import type { TopicGroup } from '../lib/topics';
import type { PageSummary } from '../lib/types';

type Props = {
  spaceName: string;
  spaceHref: string;
  groups: TopicGroup[];
  pageHref: (page: PageSummary) => string;
  /** A small marker after a page title, e.g. draft or needs acknowledging. */
  marker?: (page: PageSummary) => ReactNode;
  adminLinks?: { newPage: string; topics: string };
};

const pageClass = ({ isActive }: { isActive: boolean }) =>
  `flex items-center gap-2 mx-2 px-3 py-2 rounded-sm text-[14.5px] leading-snug transition-colors ${
    isActive ? 'bg-white text-steel-dark font-bold shadow-sm' : 'text-steel-base hover:text-steel-dark hover:bg-white/60'
  }`;

/** Waybook-style contents: topics with their pages. A sidebar on wide screens, a drop-down on phones. */
export function SpaceSidebar({ spaceName, spaceHref, groups, pageHref, marker, adminLinks }: Props) {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  useEffect(() => setOpen(false), [location.pathname]);

  // On phones the space name is already in the bar above, so the list opens with an Overview link instead.
  const contents = (compact: boolean) => (
    <nav aria-label={`${spaceName} contents`} className={compact ? 'py-3' : 'py-5'}>
      {compact ? (
        <NavLink to={spaceHref} end className={pageClass}>
          Overview
        </NavLink>
      ) : (
        <NavLink to={spaceHref} end className={({ isActive }) => `block px-4 pb-4 mb-2 border-b border-line text-[11.5px] font-bold uppercase tracking-[0.1em] ${isActive ? 'text-rust-base' : 'text-rust-dark hover:text-rust-base'}`}>
          {spaceName}
        </NavLink>
      )}
      {groups.map(({ topic, pages }) => (
        <div key={topic?.id ?? 'none'} className={compact ? 'mt-3' : 'mb-4'}>
          <div className="px-4 pt-2 pb-1.5 text-[13px] font-bold text-steel-dark">{topic?.name ?? 'Other pages'}</div>
          {pages.length === 0 && <div className="pl-4 py-1.5 text-sm text-steel-base/70 italic">No pages yet</div>}
          {pages.map((p) => (
            <NavLink key={p.id} to={pageHref(p)} className={pageClass}>
              <span className="flex-1 min-w-0">{p.title}</span>
              {marker?.(p)}
            </NavLink>
          ))}
        </div>
      ))}
      {adminLinks && (
        <div className="mt-6 pt-4 border-t border-line px-4 space-y-2.5">
          <Link to={adminLinks.newPage} className="flex items-center gap-1.5 text-[13px] font-bold text-steel-base hover:text-rust-dark">
            <Plus size={13} /> New page
          </Link>
          <Link to={adminLinks.topics} className="flex items-center gap-1.5 text-[13px] font-bold text-steel-base hover:text-rust-dark">
            <Settings2 size={13} /> Manage topics
          </Link>
        </div>
      )}
    </nav>
  );

  return (
    <>
      <div className="md:hidden bg-white border-b border-line">
        <button type="button" onClick={() => setOpen((v) => !v)} aria-expanded={open} className="w-full flex items-center justify-between gap-3 px-4 py-3">
          <span className="text-[11.5px] font-bold uppercase tracking-[0.1em] text-rust-dark truncate">{spaceName}</span>
          <span className="flex items-center gap-1.5 text-[13px] font-bold text-steel-base flex-shrink-0">
            Contents
            <ChevronDown size={16} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
          </span>
        </button>
        {open && <div className="border-t border-line bg-paper max-h-[70vh] overflow-y-auto">{contents(true)}</div>}
      </div>
      <aside className="hidden md:block w-64 lg:w-72 flex-shrink-0 border-r border-line bg-paper sticky top-16 self-start h-[calc(100vh-4rem)] overflow-y-auto">
        {contents(false)}
      </aside>
    </>
  );
}

export const Dot = ({ title }: { title: string }) => <span className="w-1.5 h-1.5 bg-rust-base rounded-full flex-shrink-0" title={title} aria-label={title} />;
