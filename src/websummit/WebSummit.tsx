import type { ReactNode } from 'react';
import { ArrowUpRight, CalendarCheck, Gauge, Globe, Linkedin, Mail } from 'lucide-react';
import { Logo } from '../components/Logo';
import { Eyebrow } from '../components/Eyebrow';

type LinkItem = {
  href: string;
  label: string;
  detail: string;
  icon: ReactNode;
  featured?: boolean;
};

const LINKS: LinkItem[] = [
  {
    href: 'https://app.zenitro.co/r/digital-maturity',
    label: 'Take the diagnostic',
    detail: 'Find where your business is leaking revenue',
    icon: <Gauge size={22} />,
    featured: true,
  },
  {
    href: 'https://calendly.com/steelcoreoperations/consult?utm_source=websummit&utm_medium=qr',
    label: 'Book a free call',
    detail: 'Pick up where we left off',
    icon: <CalendarCheck size={22} />,
  },
  {
    href: 'https://www.linkedin.com/company/119313953',
    label: 'Follow us on LinkedIn',
    detail: 'Steel Core Operations',
    icon: <Linkedin size={22} />,
  },
  {
    href: 'mailto:hello@steelcoreoperations.com?subject=Web%20Summit',
    label: 'Email us',
    detail: 'hello@steelcoreoperations.com',
    icon: <Mail size={22} />,
  },
  {
    href: '/',
    label: 'Visit our website',
    detail: 'How we close the five revenue leaks',
    icon: <Globe size={22} />,
  },
];

const LinkCard = ({ href, label, detail, icon, featured }: LinkItem & { key?: string }) => {
  const external = href.startsWith('http');
  const tone = featured
    ? 'bg-rust-base text-white border-steel-dark shadow-[4px_4px_0px_0px_var(--color-steel-dark)]'
    : 'bg-white text-steel-dark border-steel-dark shadow-[3px_3px_0px_0px_var(--color-steel-dark)]';

  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className={`group flex items-center gap-4 border-2 px-5 py-4 transition-all duration-200 hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] active:scale-[0.98] ${tone}`}
    >
      <div
        className={`w-11 h-11 flex items-center justify-center flex-shrink-0 ${
          featured ? 'bg-steel-dark text-white' : 'bg-cloud text-rust-base'
        }`}
      >
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-display uppercase tracking-tight text-[17px] leading-tight">{label}</div>
        <div className={`text-sm mt-0.5 truncate ${featured ? 'text-white/85' : 'text-steel-base'}`}>{detail}</div>
      </div>
      <ArrowUpRight size={20} className="flex-shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
    </a>
  );
};

export const WebSummit = () => {
  return (
    <div className="bg-cloud min-h-screen text-steel-dark">
      <div className="max-w-[480px] mx-auto px-5 py-8 pb-16">
        {/* HEADER */}
        <div className="flex justify-center pt-4 pb-10">
          <Logo />
        </div>

        {/* INTRO */}
        <div className="text-center mb-10">
          <Eyebrow className="mb-6">Web Summit 2026</Eyebrow>
          <h1 className="font-display text-[clamp(30px,9vw,40px)] leading-[0.95] tracking-tight uppercase mb-5">
            Great to <span className="text-rust-base">meet you.</span>
          </h1>
          <p className="text-base text-steel-base leading-relaxed">
            We build and run the revenue engine inside coaching, consulting and agency businesses. Every one leaks revenue at the same
            five points. We close all of them.
          </p>
        </div>

        {/* LINKS */}
        <div className="flex flex-col gap-4">
          {LINKS.map((link) => (
            <LinkCard key={link.label} {...link} />
          ))}
        </div>

        {/* FOOTER */}
        <div className="mt-14 pt-6 border-t border-line text-center font-mono text-[11px] tracking-[0.1em] text-steel-base uppercase">
          <div>Steel Core Operations</div>
          <a href="/privacy" className="inline-block mt-2 hover:text-rust-base transition-colors">
            Privacy Policy
          </a>
        </div>
      </div>
    </div>
  );
};
