import { useEffect, useRef, useState, type ReactNode } from 'react';
import { ArrowUpRight, Globe, Linkedin, Mail, SendHorizontal, X } from 'lucide-react';
import { Logo } from '../components/Logo';
import { Kicker } from '../marketing/Kicker';
import { CALENDLY_URL } from '../marketing/SiteNav';

const LINKEDIN = 'https://www.linkedin.com/company/119313953';
const DIAGNOSTIC = 'https://app.zenitro.co/r/digital-maturity';
const BOOKING = `${CALENDLY_URL}?utm_source=links&utm_medium=qr`;
const WHATSAPP_NUMBER = '351939383660';
const WHATSAPP_GREETING = 'Hi Steel Core Operations';
const whatsappUrl = (text: string) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
const WHATSAPP = whatsappUrl(WHATSAPP_GREETING);
const EMAIL = 'mailto:hello@steelcoreoperations.com';

const TEAM = [
  { name: 'Rhiannon', role: 'COO', photo: '/team/rhiannon.jpeg' },
  { name: 'Shari', role: 'CTO', photo: '/team/shari.png' },
  { name: 'Toni', role: 'CSO', photo: '/team/toni-256.jpg' },
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

const WhatsAppChat = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const send = () => {
    window.open(whatsappUrl(message.trim() || WHATSAPP_GREETING), '_blank', 'noopener,noreferrer');
    setMessage('');
    setOpen(false);
  };

  return (
    <div className="fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-5 z-50 flex flex-col items-end gap-3">
      {open && (
        <div
          role="dialog"
          aria-label="Chat with Steel Core Operations on WhatsApp"
          className="w-[min(340px,calc(100vw-2.5rem))] overflow-hidden bg-white shadow-[0_12px_40px_rgba(26,35,50,0.25)]"
        >
          {/* Panel header */}
          <div className="flex items-center gap-3 bg-steel-dark px-4 py-3.5 text-cloud">
            <div className="flex -space-x-2">
              {TEAM.map((person) => (
                <img
                  key={person.name}
                  src={person.photo}
                  alt=""
                  width={32}
                  height={32}
                  className="h-8 w-8 rounded-full border-2 border-steel-dark object-cover"
                />
              ))}
            </div>
            <div className="min-w-0 flex-1">
              <div className="font-heading text-[0.95rem] font-bold leading-tight">Steel Core Operations</div>
              <div className="mt-0.5 flex items-center gap-1.5 whitespace-nowrap text-[0.74rem] text-muted-dark">
                <span className="h-1.5 w-1.5 rounded-full bg-[#25D366]" aria-hidden="true" />
                We reply on WhatsApp
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="flex h-8 w-8 items-center justify-center text-muted-dark transition-colors hover:text-cloud"
            >
              <X size={18} />
            </button>
          </div>

          {/* Conversation */}
          <div className="bg-paper px-4 py-5">
            <div className="max-w-[85%] rounded-[2px_14px_14px_14px] bg-white px-3.5 py-2.5 text-[0.92rem] leading-snug shadow-[0_1px_2px_rgba(26,35,50,0.08)]">
              Hi 👋 Thanks for stopping by. What can we help you with?
            </div>
          </div>

          {/* Composer */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send();
            }}
            className="flex items-end gap-2 border-t border-line p-3"
          >
            <textarea
              ref={inputRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  send();
                }
              }}
              rows={2}
              placeholder="Type your message…"
              aria-label="Your message"
              className="max-h-32 min-h-[44px] flex-1 resize-none border border-line bg-white px-3 py-2 text-[16px] leading-snug outline-none focus:border-steel-dark"
            />
            <button
              type="submit"
              aria-label="Send on WhatsApp"
              className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-[#25D366] text-white transition-transform hover:scale-105 active:scale-95"
            >
              <SendHorizontal size={20} />
            </button>
          </form>
          <div className="px-3 pb-3 text-center font-tech text-[0.62rem] uppercase tracking-[0.12em] text-steel-base">
            Opens WhatsApp to send
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? 'Close WhatsApp chat' : 'Chat with Steel Core Operations on WhatsApp'}
        aria-expanded={open}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_6px_20px_rgba(26,35,50,0.3)] transition-transform hover:scale-105 active:scale-95"
      >
        {open ? <X size={26} /> : <WhatsAppIcon size={28} />}
      </button>
    </div>
  );
};

export const Links = () => {
  return (
    <div className="min-h-screen overflow-x-hidden bg-cloud font-body text-[16px] leading-[1.6] text-steel-dark selection:bg-rust-base selection:text-white">
      <div className="mx-auto max-w-[480px] px-5 pb-24 pt-6">
        {/* HEADER */}
        <div className="mb-10 flex items-center justify-center">
          <Logo size="sm" />
        </div>

        {/* INTRO */}
        <section className="mb-8 pt-4 text-center">
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

        {/* TEAM */}
        <section className="mb-14">
          <Kicker>The team</Kicker>
          <h2 className="mb-5 mt-4 font-heading text-[1.75rem] font-bold leading-[1.05] tracking-[-0.018em]">
            The people you'll work with.
          </h2>
          <div className="grid grid-cols-3 gap-3">
            {TEAM.map((person) => (
              <div key={person.name}>
                <img
                  src={person.photo}
                  alt={person.name}
                  width={160}
                  height={160}
                  loading="lazy"
                  className="mb-3 aspect-square w-full border border-steel-dark object-cover"
                />
                <div className="font-heading font-bold leading-tight">{person.name}</div>
                <div className="mt-0.5 font-tech text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-rust-base">{person.role}</div>
              </div>
            ))}
          </div>
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

      <WhatsAppChat />
    </div>
  );
};
