import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Logo } from '../components/Logo';

export const CALENDLY_URL = 'https://calendly.com/steelcoreoperations/consult';

type PageKey = 'home' | 'services' | 'about' | 'contact';

const LINKS: { key: PageKey; label: string; href: string }[] = [
  { key: 'services', label: 'Services', href: '/services/' },
  { key: 'about', label: 'About', href: '/about/' },
  { key: 'contact', label: 'Contact', href: '/contact/' },
];

export const SiteNav = ({ active }: { active?: PageKey }) => {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-cloud/80 backdrop-blur-md">
      <div className="mx-auto flex h-[74px] max-w-[1200px] items-center justify-between px-6 sm:px-10">
        <a href="/" aria-label="Steel Core Operations home">
          <Logo />
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-9 md:flex" aria-label="Primary">
          {LINKS.map((l) => (
            <a
              key={l.key}
              href={l.href}
              className={`font-tech text-[0.78rem] uppercase tracking-[0.12em] transition-colors hover:text-steel-dark ${
                active === l.key ? 'text-steel-dark' : 'text-steel-base'
              }`}
            >
              {l.label}
            </a>
          ))}
          <a
            href={CALENDLY_URL}
            className="border border-steel-dark px-5 py-[11px] font-tech text-[0.78rem] uppercase tracking-[0.12em] text-steel-dark transition-colors hover:bg-steel-dark hover:text-cloud"
          >
            Book a call
          </a>
        </nav>

        {/* Mobile toggle */}
        <button
          className="text-steel-dark md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav className="border-t border-line bg-cloud px-6 py-6 md:hidden" aria-label="Primary mobile">
          <div className="flex flex-col gap-5">
            {LINKS.map((l) => (
              <a
                key={l.key}
                href={l.href}
                className={`font-tech text-sm uppercase tracking-[0.12em] ${
                  active === l.key ? 'text-steel-dark' : 'text-steel-base'
                }`}
              >
                {l.label}
              </a>
            ))}
            <a
              href={CALENDLY_URL}
              className="inline-flex w-fit border border-steel-dark px-5 py-3 font-tech text-sm uppercase tracking-[0.12em] text-steel-dark"
            >
              Book a call
            </a>
          </div>
        </nav>
      )}
    </header>
  );
};
