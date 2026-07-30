/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { SiteNav } from './marketing/SiteNav';
import { SiteFooter } from './marketing/SiteFooter';
import { Kicker } from './marketing/Kicker';
import { Wrap, CtaButton } from './marketing/ui';
import { reveal } from './marketing/reveal';

const SERVICES = [
  {
    label: 'Embedded delivery',
    title: 'We work inside your business and own the outcome.',
    body: 'Our core model. A senior team embeds alongside yours, finds what is slowing you down and fixes it, from systems and process to vendor relationships and governance. We hold the roadmap, keep momentum and stay accountable, so progress never rests on one person.',
  },
  {
    label: 'Specialist resourcing',
    title: 'The right specialist, sourced and managed by us.',
    body: 'You get the depth a piece of work needs without carrying the hire. We source, vet and direct the specialist, keep them on track and stay accountable for what they deliver.',
  },
  {
    label: 'Defined projects',
    title: 'A scoped piece of work, delivered end to end.',
    body: 'When you know exactly what you need. System implementations, platform builds, integrations, migrations and the governance around them. Scoped, owned and finished, with one team accountable from first meeting to sign-off.',
  },
];

const PRINCIPLES = [
  {
    num: '/ 01',
    title: 'Senior by default',
    body: 'The people who scope your work are the people who do it. No layers, no juniors learning on your time.',
  },
  {
    num: '/ 02',
    title: 'Delivery, not decks',
    body: 'We are measured in what ships and what works, not in the number of documents produced.',
  },
  {
    num: '/ 03',
    title: 'A team, not a person',
    body: 'You get a small senior team and the specialists it brings in, so there is no single point of failure.',
  },
  {
    num: '/ 04',
    title: 'Ready for scrutiny',
    body: 'We work to a standard that holds up to due diligence, governed, documented and audit ready, which matters most when the stakes are high.',
  },
];

const CoreFigure = () => (
  <div className="relative mx-auto aspect-square w-full max-w-[300px] md:ml-auto md:max-w-[440px]" aria-hidden="true">
    <svg viewBox="-40 -40 320 320" className="block h-full w-full overflow-visible">
      <line x1="120" y1="-40" x2="120" y2="280" stroke="#D4D8DD" strokeWidth="1" />
      <line x1="-40" y1="120" x2="280" y2="120" stroke="#D4D8DD" strokeWidth="1" />
      <rect x="20" y="20" width="200" height="200" transform="rotate(45 120 120)" fill="none" stroke="#34495E" strokeWidth="1.2" />
      <rect x="46" y="46" width="148" height="148" transform="rotate(45 120 120)" fill="none" stroke="#1A2332" strokeWidth="1.4" />
      <rect x="74" y="74" width="92" height="92" transform="rotate(45 120 120)" fill="none" stroke="#1A2332" strokeWidth="1.6" />
      <rect x="97" y="97" width="46" height="46" transform="rotate(45 120 120)" fill="#E07F3E" />
      <circle cx="120" cy="-24" r="2.4" fill="#E07F3E" />
      <circle cx="120" cy="264" r="2.4" fill="#E07F3E" />
      <text x="128" y="-20" className="fill-steel-base font-tech text-[0.62rem] uppercase tracking-[0.14em]">core</text>
      <text x="-40" y="252" className="fill-steel-base font-tech text-[0.62rem] uppercase tracking-[0.14em]">load-bearing</text>
    </svg>
  </div>
);

export default function App() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-cloud font-body text-[17px] leading-[1.6] text-steel-dark selection:bg-rust-base selection:text-white">
      <SiteNav active="home" />

      <main>
        {/* Hero */}
        <section className="py-[clamp(70px,9vw,120px)]">
          <Wrap>
            <div className="grid items-center gap-14 md:grid-cols-[1.15fr_0.85fr]">
              <div>
                <Kicker>Operational &amp; systems delivery</Kicker>
                <h1 className="mt-6 font-heading text-[clamp(2.4rem,6.6vw,5.4rem)] font-extrabold leading-[1.02] tracking-[-0.02em]">
                  We make the<br />change hold.
                </h1>
                <p className="mt-[30px] max-w-[46ch] text-[1.18rem]">
                  Steel Core is a senior delivery team that works inside your business. We find what is slowing you down,
                  fix it and bring in the people and systems to keep it that way. Operations, technology and the hard
                  commercial decisions in between.
                </p>
                <div className="mt-10">
                  <CtaButton>Book a call</CtaButton>
                </div>
              </div>
              <CoreFigure />
            </div>
          </Wrap>
        </section>

        {/* What we are */}
        <section className="py-[clamp(72px,8vw,116px)]">
          <Wrap>
            <div className="grid items-start gap-14 md:grid-cols-[0.9fr_1.1fr]">
              <motion.div {...reveal}>
                <Kicker>What we are</Kicker>
                <p className="mt-[22px] max-w-[22ch] font-heading text-[clamp(1.5rem,2.7vw,2.1rem)] font-semibold leading-[1.14] tracking-[-0.015em]">
                  Plenty of firms will tell you what to do. Far fewer will come in and do it.
                </p>
              </motion.div>
              <motion.div {...reveal} className="pt-1.5">
                <p className="max-w-[52ch]">
                  We work inside your business, not from the outside looking in. We spot the gaps, clear the bottlenecks,
                  challenge the vendor deals that no longer stack up and drive a better outcome, put the governance in
                  place that should already be there and bring in specialists we manage and keep on track. Strategy,
                  operations and technology, from the same senior team, owned end to end.
                </p>
                <p className="mt-[22px] max-w-[52ch] text-steel-base">
                  We work alongside the people you already have, not over the top of them. We add senior weight where it
                  is missing and strengthen the team that is there.
                </p>
              </motion.div>
            </div>
          </Wrap>
        </section>

        {/* What we do */}
        <section id="services" className="py-[clamp(72px,8vw,116px)]">
          <Wrap>
            <motion.div {...reveal} className="max-w-[60ch]">
              <Kicker>What we do</Kicker>
              <h2 className="mt-5 font-heading text-[clamp(2rem,3.8vw,3rem)] font-bold leading-[1.02] tracking-[-0.018em]">
                Three ways we work.
              </h2>
            </motion.div>

            <div className="mt-14 border-t border-line">
              {SERVICES.map((s) => (
                <motion.div
                  {...reveal}
                  key={s.label}
                  className="group grid gap-6 border-b border-line py-10 md:grid-cols-[0.34fr_1fr] md:gap-10"
                >
                  <div className="font-tech text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-steel-dark">
                    <span className="mb-4 block h-0.5 w-5 bg-rust-base"></span>
                    {s.label}
                  </div>
                  <div>
                    <h3 className="mb-3 font-heading text-[1.5rem] font-bold tracking-[-0.01em] transition-colors group-hover:text-rust-base">
                      {s.title}
                    </h3>
                    <p className="max-w-[60ch] text-steel-base">{s.body}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </Wrap>
        </section>

        {/* How we work */}
        <section className="bg-steel-dark py-[clamp(72px,8vw,116px)] text-muted-dark">
          <Wrap>
            <motion.div {...reveal} className="max-w-[60ch]">
              <Kicker onDark>How we work</Kicker>
              <h2 className="mt-5 font-heading text-[clamp(2rem,3.8vw,3rem)] font-bold leading-[1.02] tracking-[-0.018em] text-cloud">
                Built to be relied on.
              </h2>
            </motion.div>

            <div className="mt-14 grid gap-px border border-line-dark bg-line-dark md:grid-cols-2">
              {PRINCIPLES.map((p) => (
                <motion.div {...reveal} key={p.num} className="bg-steel-dark px-9 py-[38px]">
                  <div className="mb-5 font-tech text-[0.72rem] tracking-[0.14em] text-bronze-lift">{p.num}</div>
                  <h3 className="mb-3 font-heading text-[1.28rem] font-bold text-cloud">{p.title}</h3>
                  <p className="max-w-[44ch] text-muted-dark">{p.body}</p>
                </motion.div>
              ))}
            </div>
          </Wrap>
        </section>

        {/* Who we work with */}
        <section className="py-[clamp(72px,8vw,116px)]">
          <Wrap>
            <motion.div {...reveal} className="mb-12 max-w-[60ch]">
              <Kicker>Who we work with</Kicker>
            </motion.div>
            <div className="grid items-end gap-14 md:grid-cols-[0.8fr_1.2fr]">
              <motion.p
                {...reveal}
                className="max-w-[34ch] font-heading text-[clamp(1.35rem,2.4vw,1.9rem)] font-semibold leading-[1.22] tracking-[-0.012em]"
              >
                We take on a small number of clients at a time, at a level where the work genuinely matters.
              </motion.p>
              <motion.div {...reveal}>
                <p className="mb-[34px] max-w-[50ch] text-steel-base">
                  That includes private-equity-backed businesses preparing for exit as well as established companies
                  rebuilding how they operate. Serious work, done quietly, when it has to be right.
                </p>
                <div className="border-t border-line pt-[26px]">
                  <div className="font-heading text-[clamp(2rem,3.4vw,2.7rem)] font-extrabold leading-none tracking-[-0.02em]">
                    Embedded, retained or by project
                  </div>
                  <div className="mt-3.5 font-tech text-[0.74rem] uppercase tracking-[0.14em] text-steel-base">
                    Three ways to work with us
                  </div>
                </div>
              </motion.div>
            </div>
          </Wrap>
        </section>

        {/* Close */}
        <section className="bg-steel-dark py-[clamp(72px,8vw,116px)]">
          <Wrap>
            <div className="grid items-end gap-12 md:grid-cols-[1.3fr_0.7fr]">
              <motion.div {...reveal}>
                <Kicker onDark>Start here</Kicker>
                <h2 className="mt-5 font-heading text-[clamp(2.2rem,4.4vw,3.6rem)] font-extrabold leading-[1.02] tracking-[-0.02em] text-cloud">
                  Tell us what needs to happen.
                </h2>
                <p className="mt-[22px] max-w-[44ch] text-muted-dark">
                  A straight conversation about the work, whether we are the right team for it and how we would approach
                  it.
                </p>
              </motion.div>
              <motion.div {...reveal} className="flex md:justify-end">
                <CtaButton onDark>Book a call</CtaButton>
              </motion.div>
            </div>
          </Wrap>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
