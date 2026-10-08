import type { ReactNode } from 'react';
import { ArrowRight, ArrowUpRight, CheckCircle2, Globe, Layers, Linkedin, Mail, Target, TrendingUp, Users, Wallet } from 'lucide-react';
import { Logo } from '../components/Logo';
import { Eyebrow } from '../components/Eyebrow';

const LINKEDIN = 'https://www.linkedin.com/company/119313953';
const DIAGNOSTIC = 'https://app.zenitro.co/r/digital-maturity';
const BOOKING = 'https://calendly.com/steelcoreoperations/consult?utm_source=websummit&utm_medium=qr';
const EMAIL = 'mailto:hello@steelcoreoperations.com?subject=Web%20Summit';

const TEAM = [
  { name: 'Rhiannon', role: 'COO', photo: '/team/rhiannon.jpeg', email: 'rhiannon@steelcoreoperations.com' },
  { name: 'Shari', role: 'CTO', photo: '/team/shari.png', email: 'shari@steelcoreoperations.com' },
];

const LEAKS = [
  { title: 'Contact', icon: Target, text: 'Respond to every enquiry before they ghost.' },
  { title: 'Close', icon: TrendingUp, text: 'Follow up on every proposal until they say yes.' },
  { title: 'Charge', icon: Layers, text: 'Price every engagement for the outcome you deliver.' },
  { title: 'Collect', icon: Wallet, text: 'Get paid on time, every time.' },
  { title: 'Come back', icon: Users, text: 'Turn past clients into recurring work and referrals.' },
];

const newTab = { target: '_blank', rel: 'noopener noreferrer' } as const;

const SectionLabel = ({ children }: { children: ReactNode }) => (
  <div className="flex items-center gap-3 mb-4">
    <span className="w-6 h-0.5 bg-rust-base" />
    <span className="font-mono text-[11px] font-bold tracking-[0.18em] uppercase text-steel-base">{children}</span>
  </div>
);

const IconButton = ({ href, label, children, external }: { href: string; label: string; children: ReactNode; external?: boolean }) => (
  <a
    href={href}
    aria-label={label}
    {...(external ? newTab : {})}
    className="w-12 h-12 flex items-center justify-center bg-white border-2 border-steel-dark text-steel-dark shadow-[3px_3px_0px_0px_var(--color-steel-dark)] transition-all active:translate-x-[2px] active:translate-y-[2px] active:shadow-none hover:bg-steel-dark hover:text-white"
  >
    {children}
  </a>
);

export const WebSummit = () => {
  return (
    <div className="bg-cloud min-h-screen text-steel-dark overflow-x-hidden">
      <div className="max-w-[480px] mx-auto px-5 pt-6 pb-12">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-10">
          <Logo size="sm" />
          <span className="hidden min-[370px]:inline font-mono text-[10px] font-bold tracking-[0.15em] uppercase text-rust-base whitespace-nowrap">Web Summit 2026</span>
        </div>

        {/* YOU MET */}
        <section className="text-center mb-8">
          <div className="flex justify-center -space-x-4 mb-5">
            {TEAM.map((person, i) => (
              <img
                key={person.name}
                src={person.photo}
                alt={person.name}
                width={96}
                height={96}
                className={`w-24 h-24 object-cover border-4 border-cloud outline-2 outline-steel-dark ${i === 0 ? '-rotate-3' : 'rotate-3'}`}
              />
            ))}
          </div>
          <h1 className="font-display text-[clamp(28px,8.5vw,38px)] leading-[0.95] tracking-tight uppercase mb-3">
            Great to <span className="text-rust-base">meet you.</span>
          </h1>
          <p className="text-[15px] text-steel-base leading-relaxed max-w-[340px] mx-auto">
            Thanks for stopping by. Here's everything you need to keep the conversation going.
          </p>
        </section>

        {/* SOCIAL ROW */}
        <div className="flex justify-center gap-4 mb-12">
          <IconButton href={LINKEDIN} label="Steel Core Operations on LinkedIn" external>
            <Linkedin size={20} />
          </IconButton>
          <IconButton href={EMAIL} label="Email Steel Core Operations">
            <Mail size={20} />
          </IconButton>
          <IconButton href="/" label="Steel Core Operations website">
            <Globe size={20} />
          </IconButton>
        </div>

        {/* FEATURED: DIAGNOSTIC */}
        <section className="relative bg-steel-dark text-white p-6 pt-7 mb-12 shadow-[6px_6px_0px_0px_var(--color-rust-base)]">
          <Eyebrow className="absolute -top-3 left-6 !bg-rust-base !px-3 !py-1 text-[10px]">Start here</Eyebrow>
          <h2 className="font-display text-[26px] leading-[1] uppercase tracking-tight mb-3">
            How mature is your <span className="text-rust-base">revenue engine?</span>
          </h2>
          <p className="text-[15px] text-white/75 leading-relaxed mb-5">
            Take our digital maturity diagnostic and see where your systems are holding growth back.
          </p>

          {/* Maturity meter */}
          <div className="mb-6" aria-hidden="true">
            <div className="flex gap-1.5 mb-2">
              {[1, 2, 3, 4, 5].map((n) => (
                <div key={n} className={`h-2.5 flex-1 ${n <= 2 ? 'bg-rust-base' : 'bg-white/15'}`} />
              ))}
            </div>
            <div className="flex justify-between font-mono text-[10px] tracking-[0.12em] uppercase text-white/50">
              <span>Leaking</span>
              <span>Locked in</span>
            </div>
          </div>

          <a
            href={DIAGNOSTIC}
            {...newTab}
            className="flex items-center justify-between w-full bg-rust-base hover:bg-rust-dark px-5 py-4 font-bold uppercase tracking-widest text-sm transition-colors active:scale-[0.98]"
          >
            Take the diagnostic
            <ArrowRight size={18} />
          </a>
        </section>

        {/* FIVE LEAKS CAROUSEL */}
        <section className="mb-12">
          <SectionLabel>What we do</SectionLabel>
          <h2 className="font-display text-[22px] leading-[1.05] uppercase tracking-tight mb-2">
            Every business leaks revenue at the same <span className="text-rust-base">five points.</span>
          </h2>
          <p className="text-[15px] text-steel-base mb-5">We build and run the systems that close all of them.</p>

          <div className="-mx-5 px-5 flex gap-3 overflow-x-auto snap-x snap-mandatory scroll-px-5 pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {LEAKS.map(({ title, icon: Icon, text }, i) => (
              <div key={title} className="snap-start flex-shrink-0 w-[62%] bg-white border-2 border-steel-dark p-4 flex flex-col">
                <div className="flex items-center justify-between mb-6">
                  <span className="font-display text-3xl text-line leading-none">0{i + 1}</span>
                  <Icon size={20} className="text-rust-base" />
                </div>
                <div className="font-display uppercase text-lg tracking-tight mb-1">{title}</div>
                <p className="text-sm text-steel-base leading-snug">{text}</p>
              </div>
            ))}
            <div className="snap-start flex-shrink-0 w-[62%] bg-rust-base text-white p-4 flex flex-col justify-end">
              <div className="font-mono text-[10px] font-bold tracking-[0.15em] uppercase mb-2 text-white/80">The impact</div>
              <p className="font-display uppercase text-lg leading-tight">
                The average business loses <span className="text-steel-dark">£80–120k</span> a year across these five leaks.
              </p>
            </div>
          </div>
          <div className="font-mono text-[10px] tracking-[0.12em] uppercase text-steel-base/70 mt-1">Swipe →</div>
        </section>

        {/* BOOK A CALL */}
        <section className="bg-white border-2 border-steel-dark p-6 mb-12">
          <SectionLabel>Ready to talk?</SectionLabel>
          <h2 className="font-display text-[22px] leading-[1.05] uppercase tracking-tight mb-4">Book a free call</h2>
          <ul className="space-y-2 mb-5">
            {['From £1,200/month', 'No upfront fees', '12-month partnership'].map((item) => (
              <li key={item} className="flex items-center gap-2.5 text-sm font-bold uppercase tracking-wider text-steel-base">
                <CheckCircle2 size={16} className="text-rust-base flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
          <a
            href={BOOKING}
            {...newTab}
            className="flex items-center justify-between w-full bg-steel-dark text-white hover:bg-steel-base px-5 py-4 font-bold uppercase tracking-widest text-sm shadow-[3px_3px_0px_0px_var(--color-rust-base)] transition-all active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
          >
            Choose a time
            <ArrowRight size={18} />
          </a>
        </section>

        {/* TEAM CONTACTS */}
        <section className="mb-12">
          <SectionLabel>Get in touch directly</SectionLabel>
          <div className="divide-y divide-line border-y border-line">
            {TEAM.map((person) => (
              <a key={person.name} href={`mailto:${person.email}?subject=Web%20Summit`} className="flex items-center gap-4 py-4 group">
                <img src={person.photo} alt="" width={48} height={48} className="w-12 h-12 object-cover flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="font-display uppercase tracking-tight">{person.name}</div>
                  <div className="text-sm text-steel-base truncate">{person.role}</div>
                </div>
                <Mail size={18} className="text-rust-base flex-shrink-0" />
              </a>
            ))}
          </div>
        </section>

        {/* LINKEDIN BANNER */}
        <a
          href={LINKEDIN}
          {...newTab}
          className="flex items-center gap-4 bg-paper border-l-4 border-rust-base px-5 py-4 mb-12 group"
        >
          <Linkedin size={22} className="text-steel-dark flex-shrink-0" />
          <div className="flex-1">
            <div className="font-bold text-[15px]">Follow us on LinkedIn</div>
            <div className="text-sm text-steel-base">Steel Core Operations</div>
          </div>
          <ArrowUpRight size={18} className="text-steel-base transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>

        {/* FOOTER */}
        <footer className="pt-6 border-t-2 border-steel-dark flex justify-between items-center font-mono text-[10px] tracking-[0.12em] uppercase text-steel-base">
          <span>Steel Core Operations</span>
          <a href="/privacy" className="hover:text-rust-base transition-colors">
            Privacy
          </a>
        </footer>
      </div>
    </div>
  );
};
