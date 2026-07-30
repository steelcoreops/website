import { motion } from 'motion/react';
import { SiteNav } from '../marketing/SiteNav';
import { SiteFooter } from '../marketing/SiteFooter';
import { Kicker } from '../marketing/Kicker';
import { Wrap, CtaButton } from '../marketing/ui';
import { reveal } from '../marketing/reveal';

const MODELS = [
  {
    label: 'Embedded delivery',
    title: 'We work inside your business and own the outcome.',
    body: 'Our core model, the one most clients come to us for. A senior team embeds alongside yours, learns how the business really runs and takes ownership of moving it forward. We hold the roadmap, keep the work on track and stay accountable, so progress never depends on a single person. We work alongside the people you already have, adding senior weight where it is missing rather than over the top of them.',
    examples: [
      'A senior lead in your business a day or two a week',
      'Owning the operational and technology roadmap',
      'Running delivery, holding momentum and keeping vendors to account',
      'Putting governance, reporting and clear ownership in place',
      'Bringing in and managing specialists as the work needs them',
    ],
  },
  {
    label: 'Specialist resourcing',
    title: 'The right specialist, sourced and managed by us.',
    body: 'When a piece of work needs depth you do not have in house, we find the specialist, vet them properly and manage them for you. You get the skill without carrying the hire or the risk. We stay accountable for what they deliver rather than handing you a name then stepping back.',
    examples: [
      'Sourcing a specialist for a defined technical need',
      'Vetting and onboarding so you do not carry that work',
      'Directing them and keeping the work on track against the plan',
      'Scaling the resource up or down as the work changes',
    ],
  },
  {
    label: 'Defined projects',
    title: 'A scoped piece of work, delivered end to end.',
    body: 'When you know exactly what needs to happen, we take it from first meeting to sign-off. One team scopes it, owns it and finishes it, with the governance and handover built in so it holds once we step away.',
    examples: [
      'A CRM or platform implementation',
      'A systems integration or data migration',
      'A reporting, data quality or governance build',
      'A discrete change programme with a clear start and finish',
    ],
  },
];

const STEPS = [
  { n: '01', title: 'Conversation', body: 'A straight call about what needs to happen and whether we are the right team for it. No pitch, no obligation.' },
  { n: '02', title: 'Scope', body: 'We agree the shape of the work, who does what and the terms, so we both know what good looks like before we begin.' },
  { n: '03', title: 'Delivery', body: 'We embed and do the work, with regular check-ins and a single point of contact the whole way through.' },
  { n: '04', title: 'Review', body: 'We step back at agreed points to confirm it is working and decide together what comes next.' },
];

const DOMAINS = [
  { title: 'Operations and process', body: 'Finding the bottlenecks and rebuilding how work actually flows.' },
  { title: 'Systems and platforms', body: 'Implementing, integrating and getting more from the tools you run on.' },
  { title: 'AI and automation', body: 'Putting practical AI and automation to work where it saves real time.' },
  { title: 'Data and reporting', body: 'Turning messy data into numbers the business can trust.' },
  { title: 'Governance and controls', body: 'Putting the structure, ownership and controls in place that scrutiny expects.' },
  { title: 'Vendor and commercial', body: 'Getting on top of the vendor relationships and the deals that no longer stack up.' },
];

const Diamond = () => (
  <span className="absolute left-0.5 top-[9px] h-[7px] w-[7px] rotate-45 bg-rust-base" aria-hidden="true"></span>
);

export default function Services() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-cloud font-body text-[17px] leading-[1.6] text-steel-dark selection:bg-rust-base selection:text-white">
      <SiteNav active="services" />

      <main>
        {/* Page hero */}
        <section className="pb-[clamp(26px,4vw,44px)] pt-[clamp(58px,8vw,104px)]">
          <Wrap>
            <Kicker>Services</Kicker>
            <h1 className="mt-[22px] font-heading text-[clamp(2rem,5.6vw,4.4rem)] font-extrabold leading-[1.02] tracking-[-0.02em]">
              How we work with you.
            </h1>
            <p className="mt-[26px] max-w-[56ch] text-[1.18rem]">
              Three ways in, one team behind all of them. We embed and own the outcome, bring in a specialist we manage
              or deliver a defined piece of work. Whichever it is, you get senior people accountable from the first
              conversation to the result.
            </p>
            <div className="mt-[38px]">
              <CtaButton>Book a call</CtaButton>
            </div>
          </Wrap>
        </section>

        {/* Models */}
        <section className="pb-[clamp(72px,8vw,116px)] pt-[clamp(20px,3vw,40px)]">
          <Wrap>
            <div className="border-t border-line">
              {MODELS.map((m) => (
                <motion.div
                  {...reveal}
                  key={m.label}
                  className="grid gap-5 border-b border-line py-[54px] md:grid-cols-[0.32fr_1fr] md:gap-11"
                >
                  <div className="font-tech text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-steel-dark">
                    <span className="mb-4 block h-0.5 w-5 bg-rust-base"></span>
                    {m.label}
                  </div>
                  <div>
                    <h3 className="mb-4 font-heading text-[clamp(1.45rem,2.5vw,1.85rem)] font-bold tracking-[-0.012em]">
                      {m.title}
                    </h3>
                    <p className="mb-[26px] max-w-[62ch]">{m.body}</p>
                    <div className="mb-4 font-tech text-[0.7rem] uppercase tracking-[0.16em] text-steel-base">
                      What this looks like
                    </div>
                    <ul className="grid max-w-[62ch] gap-[11px]">
                      {m.examples.map((ex) => (
                        <li key={ex} className="relative pl-6 text-steel-base">
                          <Diamond />
                          {ex}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </Wrap>
        </section>

        {/* How an engagement works */}
        <section className="bg-steel-dark py-[clamp(72px,8vw,116px)] text-muted-dark">
          <Wrap>
            <motion.div {...reveal} className="max-w-[60ch]">
              <Kicker onDark>How an engagement works</Kicker>
              <h2 className="mt-5 font-heading text-[clamp(2rem,3.8vw,3rem)] font-bold leading-[1.02] tracking-[-0.018em] text-cloud">
                Simple to start. Clear throughout.
              </h2>
            </motion.div>
            <div className="mt-14 grid gap-px border border-line-dark bg-line-dark md:grid-cols-2">
              {STEPS.map((s) => (
                <motion.div {...reveal} key={s.n} className="bg-steel-dark px-9 py-[38px]">
                  <div className="mb-4 font-heading text-[1.5rem] font-extrabold tracking-[-0.02em] text-bronze-lift">{s.n}</div>
                  <h3 className="mb-3 font-heading text-[1.26rem] font-bold text-cloud">{s.title}</h3>
                  <p className="max-w-[46ch] text-muted-dark">{s.body}</p>
                </motion.div>
              ))}
            </div>
          </Wrap>
        </section>

        {/* What we work on */}
        <section className="py-[clamp(72px,8vw,116px)]">
          <Wrap>
            <motion.div {...reveal} className="max-w-[60ch]">
              <Kicker>What we work on</Kicker>
              <h2 className="mt-5 font-heading text-[clamp(2rem,3.8vw,3rem)] font-bold leading-[1.02] tracking-[-0.018em]">
                The ground we cover.
              </h2>
              <p className="mt-[22px] max-w-[60ch] text-steel-base">
                Steel Core brings strategy, operations and technology in one team. That range is what lets us fix the
                actual problem rather than the part that happens to fit a single discipline.
              </p>
            </motion.div>
            <div className="mt-12 grid gap-px border border-line bg-line md:grid-cols-3">
              {DOMAINS.map((d) => (
                <motion.div {...reveal} key={d.title} className="bg-paper px-[30px] py-8">
                  <span className="mb-[18px] block h-0.5 w-[18px] bg-rust-base"></span>
                  <h3 className="mb-2.5 font-heading text-[1.14rem] font-bold tracking-[-0.01em]">{d.title}</h3>
                  <p className="max-w-[34ch] text-[0.97rem] text-steel-base">{d.body}</p>
                </motion.div>
              ))}
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
