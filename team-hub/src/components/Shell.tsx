import { LogOut } from 'lucide-react';
import type { ReactNode } from 'react';
import { Link, NavLink, Outlet } from 'react-router';
import { useAuth } from '../lib/auth';
import { Logo } from './Logo';
import { Eyebrow, Title } from './ui';

const navClass = ({ isActive }: { isActive: boolean }) =>
  `px-3 py-2 text-[13px] font-bold transition-colors ${
    isActive ? 'text-rust-base' : 'text-white/70 hover:text-white'
  }`;

export function Shell() {
  const { profile, isAdmin, signOut } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-steel-dark text-white sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 min-h-16 flex flex-wrap items-center justify-between gap-x-6 gap-y-1 py-2">
          <Link to="/" className="flex items-center gap-4">
            <Logo tone="light" />
            <span className="hidden sm:inline text-[13px] text-white/50 border-l border-white/20 pl-4">
              Team Hub
            </span>
          </Link>
          <nav className="flex items-center -mx-3 sm:mx-0">
            <NavLink to="/" end className={navClass}>
              Hub
            </NavLink>
            {isAdmin && (
              <>
                <NavLink to="/admin/members" className={navClass}>
                  People
                </NavLink>
                <NavLink to="/admin/spaces" className={navClass}>
                  Spaces
                </NavLink>
                <NavLink to="/admin/sign-offs" className={navClass}>
                  Sign-offs
                </NavLink>
              </>
            )}
            <span className="hidden md:inline text-white/40 text-sm ml-4 mr-1 max-w-[220px] truncate" title={profile?.email}>
              {profile?.full_name || profile?.email}
            </span>
            <button
              type="button"
              onClick={signOut}
              className="ml-1 inline-flex items-center gap-1.5 px-3 py-2 text-[13px] font-bold text-white/70 hover:text-white"
            >
              <LogOut size={14} /> <span className="hidden sm:inline">Sign out</span>
            </button>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

const Footer = () => (
  <footer className="border-t border-line">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 text-xs text-steel-base">
      Steel Core Operations LLP · OC461243 · Confidential, for our team and delivery partners
    </div>
  </footer>
);

/** Full-screen page outside the signed-in shell (login, access removed, setup). */
export function StandalonePage({ eyebrow, title, children }: { eyebrow: string; title: string; children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 w-full max-w-[520px] mx-auto px-4 sm:px-6 py-10">
        <div className="pb-14 pt-4">
          <Logo />
        </div>
        <Eyebrow className="mb-6">{eyebrow}</Eyebrow>
        <Title text={title} className="text-[clamp(34px,8vw,48px)] mb-6" />
        <div className="text-[15.5px] leading-relaxed text-steel-dark">{children}</div>
      </div>
      <Footer />
    </div>
  );
}
