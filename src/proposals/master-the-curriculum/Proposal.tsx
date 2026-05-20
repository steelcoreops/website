import type { ReactNode } from 'react';
import { Logo } from '../../components/Logo';
import { Eyebrow } from '../../components/Eyebrow';

const SectionLabel = ({ children }: { children: ReactNode }) => (
  <div className="inline-block font-mono text-xs text-rust-base tracking-[0.1em] font-bold mb-2 uppercase">
    {children}
  </div>
);

const H2 = ({ children }: { children: ReactNode }) => (
  <h2 className="font-display text-3xl md:text-4xl uppercase tracking-tight text-steel-dark mb-6 pb-4 border-b-2 border-steel-dark leading-none">
    {children}
  </h2>
);

const Phase = ({
  tag,
  title,
  price,
  items,
  note,
}: {
  tag: string;
  title: string;
  price: string;
  items: string[];
  note?: string;
}) => (
  <div className="bg-paper border-2 border-steel-dark rounded-sm p-6 md:p-8 -mb-0.5">
    <div className="flex flex-wrap justify-between items-start gap-6 mb-5">
      <div className="flex-1 min-w-[240px]">
        <div className="font-mono text-[11px] tracking-[0.15em] text-rust-base font-bold mb-1.5 uppercase">{tag}</div>
        <div className="font-display text-2xl uppercase leading-none text-steel-dark tracking-tight">{title}</div>
      </div>
      <div className="bg-steel-dark text-white px-5 py-3 font-display text-lg md:text-xl whitespace-nowrap">{price}</div>
    </div>
    <ul className="list-none p-0">
      {items.map((item, i) => (
        <li
          key={i}
          className="relative pl-7 py-2.5 text-[15px] leading-snug border-b border-line last:border-b-0 before:content-[''] before:absolute before:left-0 before:top-[18px] before:w-3.5 before:h-0.5 before:bg-rust-base"
        >
          {item}
        </li>
      ))}
    </ul>
    {note && (
      <div className="mt-5 px-5 py-4 bg-cloud border-l-4 border-rust-base text-sm leading-relaxed text-steel-dark">
        <div className="font-display uppercase text-xs tracking-wider mb-1.5">Estimated based on current information.</div>
        {note}
      </div>
    )}
  </div>
);

const ApproachItem = ({ num, title, body }: { num: string; title: string; body: string }) => (
  <div className="bg-paper border-2 border-steel-dark rounded-sm p-7 flex gap-5 items-start">
    <div className="font-display text-3xl text-rust-base leading-none flex-shrink-0">{num}</div>
    <div>
      <h3 className="font-display text-base uppercase text-steel-dark mb-2.5 leading-tight tracking-tight">{title}</h3>
      <p className="text-sm leading-relaxed text-steel-dark m-0">{body}</p>
    </div>
  </div>
);

const Option = ({
  letter,
  title,
  body,
  priceLabel,
  price,
}: {
  letter: string;
  title: string;
  body: string;
  priceLabel: string;
  price: string;
}) => (
  <div className="bg-paper border-2 border-steel-dark border-t-0 px-6 md:px-8 py-7 grid md:grid-cols-[80px_1fr_auto] gap-6 items-start">
    <div className="font-display text-5xl md:text-6xl leading-none text-rust-base">{letter}</div>
    <div>
      <h3 className="font-display text-lg uppercase mb-2 leading-tight text-steel-dark tracking-tight">{title}</h3>
      <p className="text-[15px] text-steel-dark m-0 leading-relaxed">{body}</p>
    </div>
    <div className="text-left md:text-right whitespace-nowrap">
      <span className="block text-[11px] text-steel-base font-mono font-normal tracking-[0.1em] mb-1 uppercase">{priceLabel}</span>
      <span className="font-display text-lg text-steel-dark">{price}</span>
    </div>
  </div>
);

const TimelineStep = ({
  range,
  activity,
  isLast,
  mobileBorderBottom,
}: {
  range: string;
  activity: string;
  isLast?: boolean;
  mobileBorderBottom?: boolean;
}) => (
  <div
    className={`p-5 md:p-6 ${isLast ? '' : 'md:border-r-2 md:border-steel-dark'} ${mobileBorderBottom ? 'border-b-2 md:border-b-0 border-steel-dark' : ''}`}
  >
    <div className="font-display text-sm text-rust-base tracking-[0.1em] mb-2 uppercase">{range}</div>
    <div className="text-sm text-steel-dark font-semibold leading-snug">{activity}</div>
  </div>
);

export const Proposal = () => {
  return (
    <div className="bg-cloud min-h-screen text-steel-dark">
      <div className="max-w-[880px] mx-auto px-6 py-8 md:py-10 pb-24">
        {/* HEADER */}
        <div className="flex items-center gap-4 pt-5 pb-12">
          <Logo />
        </div>

        {/* HERO */}
        <div className="mb-16">
          <Eyebrow className="mb-8 py-3 px-6 text-[13px] tracking-[0.18em]">Proposal · May 2026</Eyebrow>
          <h1 className="font-display text-[clamp(38px,7vw,64px)] leading-[0.95] tracking-tight text-steel-dark uppercase mb-8">
            School Subscriptions
            <span className="block text-rust-base">Restructure.</span>
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8 pt-8 border-t-2 border-steel-dark">
            <div>
              <div className="text-[11px] tracking-[0.15em] font-bold text-steel-base uppercase mb-1.5">Prepared for</div>
              <div className="font-display text-lg text-steel-dark">Master The Curriculum</div>
            </div>
            <div>
              <div className="text-[11px] tracking-[0.15em] font-bold text-steel-base uppercase mb-1.5">Live before</div>
              <div className="font-display text-lg text-steel-dark">September 2026</div>
            </div>
          </div>
        </div>

        {/* THE PROBLEM */}
        <div className="mb-16">
          <SectionLabel>01 · The Problem</SectionLabel>
          <H2>What we're solving</H2>
          <p className="text-[17px] text-steel-dark mb-4 max-w-[65ch]">
            Schools share a single login across multiple teachers. That works against your own security, which rightly flags multiple
            devices on the same credentials and locks the account. The fix isn't loosening security. It's giving every teacher their own
            login under a school admin who manages their seats.
          </p>
          <p className="mb-4 max-w-[65ch]">
            Once each teacher has their own account, your existing security works the way it was designed to. No more accidental lockouts.
            No more emails asking you to reset things manually. No more shared passwords floating around school staff rooms.
          </p>
        </div>

        {/* OUR APPROACH */}
        <div className="mb-16">
          <SectionLabel>02 · Our Approach</SectionLabel>
          <H2>Why this isn't just a plugin install</H2>
          <p className="text-[17px] text-steel-dark mb-4 max-w-[65ch]">
            There's a shorter version of this project — install the plugin, configure some seats, hand it over. You may well see quotes
            structured that way, and we want to be upfront about why ours isn't.
          </p>
          <p className="mb-4 max-w-[65ch]">
            This isn't a fresh build. It's a restructure of a live business with around 2,000 active memberships, a manual setup process
            that's been inconsistent for years, no clean way to tell schools and individuals apart in the data, and a peak revenue month in
            September where any bug becomes a customer service crisis.
          </p>
          <p className="mb-4 max-w-[65ch]">Four things shape how we've scoped this:</p>

          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <ApproachItem
              num="01"
              title="Discovery before the build"
              body="We won't quote a fixed build price until we've looked under the bonnet. A site running 56 plugins, with custom membership rules and no consistent way to identify schools, has unknowns that need surfacing first. Discovery is paid because it's real work, and it protects you from a fixed price that gets revised halfway through delivery."
            />
            <ApproachItem
              num="02"
              title="Independent staging environment"
              body="WooCommerce Subscriptions has a known issue on some host-level staging environments where it fails to detect staging mode and double-charges real customers. We use BlogVault staging on independent infrastructure, which sidesteps that risk entirely. Your live site is never exposed during testing."
            />
            <ApproachItem
              num="03"
              title="Safe migration of live data"
              body="Where any migration touches live customer data, it runs in a dry-run mode first, logs exactly what it would do, and only commits changes once we've reviewed the output. Every action is logged so if anything needs rolling back, we know exactly what state we're in. Critical when you're working with hundreds of school accounts."
            />
            <ApproachItem
              num="04"
              title="Honest re-scoping if needed"
              body="Discovery exists to surface the unknowns. If it reveals something that materially changes the build, we'll have that conversation with you before any further commitment. We'd rather re-scope openly than absorb scope creep silently and end up cutting corners on delivery."
            />
          </div>
        </div>

        {/* WHAT WE'RE BUILDING */}
        <div className="mb-16">
          <SectionLabel>03 · What We're Building</SectionLabel>
          <H2>The Build</H2>

          <div className="flex flex-col">
            <Phase
              tag="Phase 01 · Paid Upfront"
              title="Discovery & Site Audit"
              price="£950"
              items={[
                'Run a price-based query to pull a probable-school list, then manual review of edge cases (Early Years subs, anomalies, anything outside the four individual price points)',
                'Review the existing site setup: plugins, theme, performance, any conflicts that might cause issues when adding the Teams plugin',
                'Check how the existing membership rules are configured and whether they need restructuring',
                "Confirm whether there's a usable staging environment or whether one needs building",
                'Produce a tagged customer list and a confirmed build spec',
              ]}
            />
            <Phase
              tag="Phase 02 · Core Build · Estimated"
              title="Build, Configure & Handover"
              price="£3,500"
              items={[
                'Install and configure Teams for WooCommerce Memberships',
                'Set up seat tiers to match your form-entry model, or custom seats per school (confirmed in discovery)',
                'Create the school admin role and link it to the existing membership rules',
                'Ensure individual teacher accounts track their own download history',
                'Build and test the end-to-end flow on staging: school signup, admin invites teacher, teacher logs in, downloads work correctly',
                'Configure the new subscription products and pricing',
                'Written playbook and a walkthrough call to hand over to your team',
              ]}
              note="This figure reflects what we know today. Discovery exists to confirm the full scope before this price is fixed. If discovery surfaces something material, we'll come back to you with a revised figure before any commitment to the build."
            />
          </div>
        </div>

        {/* MIGRATION OPTIONS */}
        <div className="mb-16">
          <SectionLabel>04 · Migrating Existing Schools</SectionLabel>
          <H2>Three routes. You pick.</H2>

          <div className="bg-steel-dark text-white p-7 md:p-8 mb-0 rounded-t-sm">
            <p className="text-white/85 m-0 text-base max-w-[60ch]">
              You mentioned migrating schools across yourselves at renewal because it felt like the only option. There are actually three
              routes, so pick whichever fits how hands-on you want to be.
            </p>
          </div>

          <Option
            letter="A"
            title="You handle it at renewal"
            body="As each school comes up for renewal, your team converts them across using the new system. Slowest overall but spreads the work over 12 months and keeps customer comms entirely with you."
            priceLabel="Included"
            price="£0"
          />
          <Option
            letter="B"
            title="Scripted batch migration"
            body="We write a migration script that converts schools in batches once you've identified them. Your team handles teacher onboarding emails. Faster, less ongoing admin for your team."
            priceLabel="Add"
            price="+£1,000"
          />
          <Option
            letter="C"
            title="Fully managed migration"
            body="We handle the technical conversion and the customer comms (drafting emails, fielding queries, onboarding teachers). Hands-off for you."
            priceLabel="Add"
            price="+£3,250"
          />
        </div>

        {/* TOTALS */}
        <div className="bg-steel-dark text-white p-8 md:p-10 mb-16 rounded-sm">
          <div className="font-mono text-[11px] tracking-[0.2em] text-rust-base mb-6 font-bold">TOTAL INVESTMENT · ESTIMATED</div>
          <div className="grid grid-cols-1 md:grid-cols-3 border-t border-white/15">
            {[
              { name: 'OPTION A', amount: '£4,450' },
              { name: 'OPTION B', amount: '£5,450' },
              { name: 'OPTION C', amount: '£7,700' },
            ].map((t, i) => (
              <div
                key={t.name}
                className={`py-6 md:py-6 md:pr-4 ${i > 0 ? 'md:pl-6 md:border-l border-white/15' : ''} ${i < 2 ? 'border-b md:border-b-0 border-white/15' : ''}`}
              >
                <div className="font-mono text-xs text-white/60 tracking-[0.1em] mb-2">{t.name}</div>
                <div className="font-display text-4xl text-white leading-none">{t.amount}</div>
              </div>
            ))}
          </div>
          <div className="text-sm text-white/70 mt-6 pt-6 border-t border-white/15">
            Discovery (£950) is fixed. The build phase figure is estimated based on current information and confirmed at the end of
            discovery. Teams for WooCommerce Memberships plugin licence (approximately £150/year) passed through at cost.
          </div>
        </div>

        {/* PAYMENT TERMS */}
        <div className="mb-16">
          <SectionLabel>05 · Payment Terms</SectionLabel>
          <H2>How it's paid</H2>
          <div className="flex flex-col">
            <Phase
              tag="Discovery"
              title="Paid Upfront"
              price="£950"
              items={[
                'Invoiced on contract signature, payable before discovery begins',
                'Deliverable is a confirmed build spec and tagged customer list',
                "If discovery reveals the build needs re-scoping, we'll discuss before any further commitment",
              ]}
            />
            <Phase
              tag="Build"
              title="Split 50 / 50"
              price="£3,500"
              items={[
                '50% invoiced on build kick-off (£1,750)',
                '50% invoiced on completion and sign-off (£1,750)',
                'Migration option (if selected) invoiced alongside the build completion payment',
              ]}
            />
          </div>
        </div>

        {/* TIMELINE */}
        <div className="mb-16">
          <SectionLabel>06 · Timeline</SectionLabel>
          <H2>Ahead of September</H2>
          <p className="mb-6 max-w-[65ch]">Roughly 7 to 9 weeks end to end, with a buffer before your busiest month kicks in.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 bg-paper border-2 border-steel-dark rounded-sm">
            <TimelineStep range="Weeks 1 – 2" activity="Discovery & site audit" mobileBorderBottom />
            <TimelineStep range="Weeks 3 – 8" activity="Build & configure on staging" mobileBorderBottom />
            <TimelineStep range="Final Week" activity="Testing, handover, go live" mobileBorderBottom />
            <TimelineStep range="September" activity="Live and ready for peak" isLast />
          </div>
        </div>

        {/* CTA */}
        <div className="bg-rust-base p-10 md:p-12 relative mt-8 rounded-sm">
          <div className="absolute inset-2 border-2 border-steel-dark pointer-events-none rounded-sm"></div>
          <div className="relative z-10">
            <h2 className="font-display text-2xl md:text-3xl uppercase text-steel-dark mb-3 tracking-tight leading-none">Ready to move?</h2>
            <p className="text-steel-dark text-base max-w-[50ch]">
              Pick an option and let us know via email. We'll get a contract over for the discovery phase. If anything needs talking
              through first, we're happy to jump on a call.
            </p>
          </div>
        </div>

        {/* FOOTER */}
        <div className="mt-16 pt-8 border-t-2 border-steel-dark flex flex-wrap justify-between items-center gap-4 font-mono text-xs text-steel-base tracking-[0.05em] uppercase">
          <div>Steel Core Operations</div>
          <div>Proposal valid 30 days</div>
        </div>
      </div>
    </div>
  );
};
