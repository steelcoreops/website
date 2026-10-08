import type { ReactNode } from 'react';
import { ArrowUpRight, Globe, Linkedin, Mail } from 'lucide-react';
import { Logo } from '../components/Logo';
import { Kicker } from '../marketing/Kicker';
import { CALENDLY_URL } from '../marketing/SiteNav';

const LINKEDIN = 'https://www.linkedin.com/company/119313953';
const DIAGNOSTIC = 'https://app.zenitro.co/r/digital-maturity';
const BOOKING = `${CALENDLY_URL}?utm_source=links&utm_medium=qr`;
const WHATSAPP = 'https://wa.me/351939383660?text=Hi%20Steel%20Core%20Operations';
const EMAIL = 'mailto:hello@steelcoreoperations.com';

const TEAM = [
  { name: 'Toni', role: 'Strategy', photo: '/team/toni-256.jpg' },
  { name: 'Rhiannon', role: 'COO', photo: '/team/rhiannon.jpeg' },
  { name: 'Shari', role: 'CTO', photo: '/team/shari.png' },
];

const WAYS = [
  { label: 'Embedded delivery', title: 'We work inside your business and own the outcome.' },
  { label: 'Specialist resourcing', title: 'The right specialist, sourced and managed by us.' },
  { label: 'Defined projects', title: 'A scoped piece of work, delivered end to end.' },
];

const PRINCIPLES = ['Senior by default', 'Delivery, not decks', 'A team, not a person', 'Ready for scrutiny'];

const WhatsAppIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.39-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.07c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35M12.05 21.5h-.01a9.4 9.4 0 0 1-4.79-1.31l-.34-.2-3.56.93.95-3.47-.22-.36a9.38 9.38 0 0 1-1.44-5.01c0-5.19 4.23-9.42 9.43-9.42a9.37 9.37 0 0 1 6.66 2.76 9.36 9.36 0 0 1 2.76 6.67c0 5.2-4.23 9.42-9.44 9.42m8.03-17.45A11.27 11.27 0 0 0 12.05.72C5.79.72.7 5.81.7 12.07c0 2 .52 3.95 1.52 5.67L.6 23.62l6.02-1.58a11.3 11.3 0 0 0 5.42 1.38h.01c6.25 0 11.34-5.09 11.35-11.35a11.28 11.28 0 0 0-3.32-8.03" />
  </svg>
);

const newTab = { target: '_blank', rel: 'noopener noreferrer' } as const;

const Button = ({ href, children, external }: { href: string; children: ReactNode; external?: boolean }) => (
  <a
    href={href}
    {...(external ? newTab : {})}
    className="group flex w-full items-center justify-between border border-rust-base bg-rust-base px-5 py-4 font-tech text-[0.82rem] font-semibold uppercase tracking-[0.1em] text-white transition-colors hover:border-rust-dark hover:bg-rust-dark active:scale-[0.98]"
  >
    {children}
    <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">
      &rarr;
    </span>
  </a>
);

const IconButton = ({ href, label, children, external }: { href: string; label: string; children: ReactNode; external?: boolean }) => (
  <a
    href={href}
    aria-label={label}
    {...(external ? newTab : {})}
    className="flex h-12 w-12 items-center justify-center border border-steel-dark text-steel-dark transition-colors hover:bg-steel-dark hover:text-cloud"
  >
    {children}
  </a>
);

export const Links = () => {
  return (
    <div className="min-h-screen overflow-x-hidden bg-cloud font-body text-[16px] leading-[1.6] text-steel-dark selection:bg-rust-base selection:text-white">
      <div className="mx-auto max-w-[480px] px-5 pb-12 pt-6">
        {/* HEADER */}
        <div className="mb-10 flex items-center justify-center">
          <Logo size="sm" />
        </div>

        {/* YOU MET */}
        <section className="mb-8 text-center">
          <div className="mb-6 flex justify-center -space-x-4">
            {TEAM.map((person, i) => (
              <img
                key={person.name}
                src={person.photo}
                alt={person.name}
                width={88}
                height={88}
                className={`h-[88px] w-[88px] border-4 border-cloud object-cover outline outline-1 outline-steel-dark ${['-rotate-6', 'relative z-10 -translate-y-1', 'rotate-6'][i]}`}
              />
            ))}
          </div>
          <h1 className="mb-3 font-heading text-[clamp(2.1rem,10vw,2.6rem)] font-extrabold leading-[1.02] tracking-[-0.02em]">
            Great to meet you<span className="text-rust-base">.</span>
          </h1>
          <p className="mx-auto max-w-[36ch] text-steel-base">
            Steel Core Operations is a senior delivery team across strategy, operations and technology. Here's how to start, or continue, the conversation.
          </p>
        </section>

        {/* SOCIAL ROW */}
        <div className="mb-12 flex justify-center gap-3">
          <IconButton href={LINKEDIN} label="Steel Core Operations on LinkedIn" external>
            <Linkedin size={20} />
          </IconButton>
          <IconButton href={WHATSAPP} label="Message Steel Core Operations on WhatsApp" external>
            <WhatsAppIcon />
          </IconButton>
          <IconButton href={EMAIL} label="Email Steel Core Operations">
            <Mail size={20} />
          </IconButton>
          <IconButton href="/" label="Steel Core Operations website">
            <Globe size={20} />
          </IconButton>
        </div>

        {/* FEATURED: DIAGNOSTIC */}
        <section className="relative mb-14 border-t-4 border-rust-base bg-steel-dark px-6 pb-6 pt-7 text-cloud">
          <Kicker onDark>Start here</Kicker>
          <h2 className="mb-3 mt-4 font-heading text-[1.75rem] font-extrabold leading-[1.05] tracking-[-0.018em]">
            How digitally mature is your business?
          </h2>
          <p className="mb-6 text-muted-dark">
            Take our digital maturity diagnostic and see where your systems and processes are holding you back.
          </p>

          {/* Maturity meter */}
          <div className="mb-6" aria-hidden="true">
            <div className="mb-2 flex gap-1.5">
              {[1, 2, 3, 4, 5].map((n) => (
                <div key={n} className={`h-2 flex-1 ${n <= 2 ? 'bg-rust-base' : 'bg-line-dark'}`} />
              ))}
            </div>
            <div className="flex justify-between font-tech text-[0.66rem] uppercase tracking-[0.14em] text-muted-dark">
              <span>Getting started</span>
              <span>Fully optimised</span>
            </div>
          </div>

          <Button href={DIAGNOSTIC} external>
            Take the diagnostic
          </Button>
        </section>

        {/* THREE WAYS CAROUSEL */}
        <section className="mb-14">
          <Kicker>What we do</Kicker>
          <h2 className="mb-5 mt-4 font-heading text-[1.75rem] font-bold leading-[1.05] tracking-[-0.018em]">Three ways we work.</h2>

          <div className="-mx-5 flex snap-x snap-mandatory scroll-px-5 gap-3 overflow-x-auto px-5 pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {WAYS.map((way, i) => (
              <div key={way.label} className="flex w-[68%] flex-shrink-0 snap-start flex-col border border-line bg-white p-5">
                <span className="mb-8 font-tech text-[0.72rem] font-semibold tracking-[0.18em] text-rust-base">/ 0{i + 1}</span>
                <span className="mb-4 block h-0.5 w-5 bg-rust-base" />
                <div className="mb-2 font-tech text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-steel-base">{way.label}</div>
                <p className="font-heading text-[1.15rem] font-bold leading-[1.2]">{way.title}</p>
              </div>
            ))}
            <div className="flex w-[68%] flex-shrink-0 snap-start flex-col bg-steel-dark p-5 text-cloud">
              <span className="mb-5 font-tech text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-bronze-lift">How we work</span>
              <p className="mb-4 font-heading text-[1.15rem] font-bold leading-[1.2]">Built to be relied on.</p>
              <ul className="space-y-2 text-[0.92rem] text-muted-dark">
                {PRINCIPLES.map((p) => (
                  <li key={p} className="flex items-center gap-2.5">
                    <span className="h-1.5 w-1.5 flex-shrink-0 rotate-45 bg-rust-base" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-1 font-tech text-[0.66rem] uppercase tracking-[0.14em] text-steel-base/70">Swipe &rarr;</div>
        </section>

        {/* BOOK A CALL */}
        <section className="mb-14 border border-steel-dark bg-white p-6">
          <Kicker>Ready to talk?</Kicker>
          <h2 className="mb-3 mt-4 font-heading text-[1.75rem] font-extrabold leading-[1.05] tracking-[-0.018em]">
            Tell us what needs to happen.
          </h2>
          <p className="mb-6 text-steel-base">
            A straight conversation about the work, whether we are the right team for it and how we would approach it.
          </p>
          <Button href={BOOKING} external>
            Book a call
          </Button>
        </section>

        {/* WHATSAPP BANNER */}
        <a href={WHATSAPP} {...newTab} className="group mb-3 flex items-center gap-4 border-l-4 border-rust-base bg-paper px-5 py-4">
          <span className="flex-shrink-0 text-steel-dark">
            <WhatsAppIcon size={22} />
          </span>
          <div className="flex-1">
            <div className="font-heading font-bold">Message us on WhatsApp</div>
            <div className="text-sm text-steel-base">+351 939 383 660</div>
          </div>
          <ArrowUpRight size={18} className="text-steel-base transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>

        {/* LINKEDIN BANNER */}
        <a href={LINKEDIN} {...newTab} className="group mb-12 flex items-center gap-4 border-l-4 border-rust-base bg-paper px-5 py-4">
          <Linkedin size={22} className="flex-shrink-0 text-steel-dark" />
          <div className="flex-1">
            <div className="font-heading font-bold">Follow us on LinkedIn</div>
            <div className="text-sm text-steel-base">Steel Core Operations</div>
          </div>
          <ArrowUpRight size={18} className="text-steel-base transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>

        {/* FOOTER */}
        <footer className="flex items-center justify-between border-t border-steel-dark pt-6 font-tech text-[0.66rem] uppercase tracking-[0.14em] text-steel-base">
          <span>Steel Core Operations</span>
          <a href="/privacy" className="transition-colors hover:text-rust-base">
            Privacy
          </a>
        </footer>
      </div>
    </div>
  );
};
