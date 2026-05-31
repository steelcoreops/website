import type { ReactNode } from 'react';
import { Logo } from '../../../components/Logo';
import { Eyebrow } from '../../../components/Eyebrow';

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

const H3 = ({ children }: { children: ReactNode }) => (
  <h3 className="font-display text-base uppercase text-steel-dark mt-7 mb-3 leading-tight tracking-tight">
    {children}
  </h3>
);

const Callout = ({ label, children }: { label: string; children: ReactNode }) => (
  <div className="bg-paper border-l-4 border-rust-base px-6 py-5 my-6 rounded-sm">
    <div className="font-mono text-[11px] tracking-[0.15em] text-rust-base font-bold mb-2 uppercase">{label}</div>
    <div className="text-[15px] leading-relaxed text-steel-dark space-y-2.5">{children}</div>
  </div>
);

const Stat = ({
  label,
  value,
  note,
  last,
}: {
  label: string;
  value: string;
  note: string;
  last?: boolean;
}) => (
  <div
    className={`p-6 bg-paper ${last ? '' : 'sm:border-r-2 border-b-2 sm:border-b-0 border-steel-dark'}`}
  >
    <div className="font-mono text-[11px] text-steel-base tracking-[0.1em] mb-2 font-bold uppercase">{label}</div>
    <div className="font-display text-3xl md:text-4xl text-steel-dark leading-none">{value}</div>
    <div className="text-xs text-steel-base mt-2">{note}</div>
  </div>
);

const StatGrid = ({ children }: { children: ReactNode }) => (
  <div className="grid grid-cols-1 sm:grid-cols-3 border-2 border-steel-dark rounded-sm overflow-hidden my-6">
    {children}
  </div>
);

const BreakdownRow = ({
  label,
  count,
  head,
  school,
}: {
  label: string;
  count: string;
  head?: boolean;
  school?: boolean;
}) => {
  if (head) {
    return (
      <div className="grid grid-cols-[1fr_90px] bg-steel-dark text-white px-6 py-3 font-mono text-[11px] tracking-[0.1em] uppercase font-bold">
        <div>{label}</div>
        <div className="text-right">{count}</div>
      </div>
    );
  }
  return (
    <div
      className={`grid grid-cols-[1fr_90px] px-6 py-3 border-b border-line last:border-b-0 text-[14px] leading-snug ${school ? 'bg-[#f4d9c8]' : ''}`}
    >
      <div>{label}</div>
      <div className="font-display text-right text-steel-dark">{count}</div>
    </div>
  );
};

const Breakdown = ({ children }: { children: ReactNode }) => (
  <div className="bg-paper border-2 border-steel-dark rounded-sm my-5 overflow-hidden">{children}</div>
);

const TimelineBlock = ({
  range,
  title,
  note,
  done,
  isLast,
  mobileBorderBottom,
}: {
  range: string;
  title: string;
  note?: string;
  done?: boolean;
  isLast?: boolean;
  mobileBorderBottom?: boolean;
}) => (
  <div
    className={`p-5 md:p-6 ${done ? 'bg-[#f4d9c8]' : 'bg-paper'} ${isLast ? '' : 'md:border-r-2 md:border-steel-dark'} ${mobileBorderBottom ? 'border-b-2 md:border-b-0 border-steel-dark' : ''}`}
  >
    <div
      className={`font-mono text-[11px] tracking-[0.12em] mb-2 uppercase font-bold ${done ? 'text-steel-dark' : 'text-rust-base'}`}
    >
      {range}
    </div>
    <div className="font-display text-sm md:text-base text-steel-dark leading-tight">{title}</div>
    {note && (
      <div className="font-mono text-[11px] text-steel-base mt-2 tracking-[0.05em]">{note}</div>
    )}
  </div>
);

const ApproachBlock = ({
  label,
  title,
  children,
}: {
  label: string;
  title: string;
  children: ReactNode;
}) => (
  <div className="bg-steel-dark text-white p-7 md:p-8 my-6 rounded-sm">
    <div className="font-mono text-[11px] tracking-[0.15em] text-rust-base font-bold mb-3 uppercase">{label}</div>
    <h3 className="font-display text-base md:text-lg uppercase text-white mb-3 leading-tight tracking-tight">{title}</h3>
    <div className="text-[15px] leading-relaxed text-white/85 space-y-3.5">{children}</div>
  </div>
);

const SplitGrid = ({ children }: { children: ReactNode }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 border-2 border-steel-dark rounded-sm overflow-hidden my-5">
    {children}
  </div>
);

const SplitBlock = ({
  label,
  title,
  children,
  primary,
}: {
  label: string;
  title: string;
  children: ReactNode;
  primary?: boolean;
}) => (
  <div
    className={`p-6 ${primary ? 'bg-[#f4d9c8] border-b-2 md:border-b-0 md:border-r-2 border-steel-dark' : 'bg-paper'}`}
  >
    <div className="font-mono text-[11px] tracking-[0.12em] text-rust-base font-bold mb-2 uppercase">{label}</div>
    <div className="font-display text-base md:text-lg text-steel-dark mb-3 leading-tight tracking-tight">{title}</div>
    <div className="text-sm leading-relaxed text-steel-dark space-y-2.5">{children}</div>
  </div>
);

const ScopeCard = ({
  price,
  title,
  intro,
  items,
}: {
  price: string;
  title: string;
  intro?: string;
  items: string[];
}) => (
  <div className="bg-paper border-2 border-steel-dark rounded-sm p-6 md:p-8 my-5">
    <div className="bg-steel-dark text-white px-5 py-3 font-display text-lg md:text-xl mb-4 inline-block">{price}</div>
    <h3 className="font-display text-base uppercase text-steel-dark mb-3 leading-tight tracking-tight">{title}</h3>
    {intro && <p className="text-[15px] text-steel-dark leading-relaxed mb-3 max-w-[65ch]">{intro}</p>}
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
  </div>
);

const LinkCard = ({
  label,
  title,
  desc,
  href,
  buttonLabel,
  download,
}: {
  label: string;
  title: string;
  desc: string;
  href: string;
  buttonLabel: string;
  download?: boolean;
}) => (
  <div className="bg-paper border-2 border-steel-dark rounded-sm p-6 my-4 flex flex-wrap justify-between items-center gap-5">
    <div className="flex-1 min-w-[220px]">
      <div className="font-mono text-[11px] tracking-[0.12em] text-rust-base font-bold mb-1.5 uppercase">{label}</div>
      <div className="font-display text-base md:text-lg uppercase text-steel-dark mb-1 tracking-tight">{title}</div>
      <p className="text-[13px] text-steel-base m-0">{desc}</p>
    </div>
    <a
      href={href}
      className="bg-steel-dark text-white px-5 py-3.5 font-bold text-xs tracking-[0.12em] uppercase no-underline whitespace-nowrap hover:bg-black transition-colors"
      target={download ? undefined : '_blank'}
      rel={download ? undefined : 'noopener'}
      download={download ? '' : undefined}
    >
      {buttonLabel}
    </a>
  </div>
);

export const DiscoveryReport = () => {
  return (
    <div className="bg-cloud min-h-screen text-steel-dark">
      <div className="max-w-[880px] mx-auto px-6 py-8 md:py-10 pb-24">
        {/* HEADER */}
        <div className="flex items-center gap-4 pt-5 pb-12">
          <Logo />
        </div>

        {/* HERO */}
        <div className="mb-16">
          <Eyebrow className="mb-8 py-3 px-6 text-[13px] tracking-[0.18em]">Discovery Report</Eyebrow>
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

        {/* 01 EXECUTIVE SUMMARY */}
        <div className="mb-16">
          <SectionLabel>01 · Executive Summary</SectionLabel>
          <H2>Where we are</H2>
          <p className="text-[17px] text-steel-dark mb-4 max-w-[65ch]">
            Discovery is complete. The site is in better shape than the surface picture suggested. Your data is clean, the new system
            can be built without disrupting your existing customers and the build can be live well before September.
          </p>
          <p className="mb-4 max-w-[65ch]">
            You currently have 2,446 active paid subscriptions. Of those, 282 are likely schools based on price. The remaining accounts
            are individual teachers. Schools have been set up inconsistently over time, with only 18 of them sitting on a dedicated
            school membership plan. The other 264 are mixed into individual plans, which is the root cause of the inconsistency you have
            been managing manually.
          </p>
          <p className="mb-4 max-w-[65ch]">
            The build will give every school a proper admin account with seat based access for their teachers. The existing security
            will then work as intended. Existing schools will be migrated across in a single controlled operation, with renewal dates,
            billing and payment methods preserved exactly as they are today.
          </p>
        </div>

        {/* 02 TIMELINE */}
        <div className="mb-16">
          <SectionLabel>02 · Timeline</SectionLabel>
          <H2>When this happens</H2>
          <p className="mb-6 max-w-[65ch]">Roughly 7 to 9 weeks end to end, with a buffer before your busiest month kicks in.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 border-2 border-steel-dark rounded-sm overflow-hidden">
            <TimelineBlock range="Weeks 1-2" title="Discovery & site audit" note="Complete" done mobileBorderBottom />
            <TimelineBlock range="Weeks 3-8" title="Build & configure on staging" mobileBorderBottom />
            <TimelineBlock range="Final Week" title="Testing, handover, go live" mobileBorderBottom />
            <TimelineBlock range="September" title="Live and ready for peak" isLast />
          </div>

          <p className="mt-6 max-w-[65ch]">
            Build kicks off as soon as the contract is signed and the kick off invoice is paid. From that date we are looking at six to
            seven weeks of work, with the new system live and your schools migrated comfortably before September renewals begin.
          </p>
        </div>

        {/* 03 WHAT WE LOOKED AT */}
        <div className="mb-16">
          <SectionLabel>03 · What We Looked At</SectionLabel>
          <H2>The scope of discovery</H2>
          <p className="mb-4 max-w-[65ch]">Discovery covered the parts of the site that affect how the build needs to be designed. Specifically:</p>
          <ul className="list-none p-0 mt-4 bg-paper border-2 border-steel-dark rounded-sm">
            {[
              'A full review of active subscriptions and the prices that distinguish schools from individuals',
              'Reconciling the subscriptions data against the memberships data to confirm the records agree',
              'Mapping how schools sit across the existing 23 membership plans',
              'Confirming renewal date coverage so the migration can preserve them exactly',
              'Confirming payment method and renewal type for every school subscription',
              'A site performance baseline taken from two geographic locations',
              'Reviewing the plugin and theme setup that the build will need to integrate with',
              'Reading the developer documentation for Teams for WooCommerce Memberships to confirm the migration approach',
            ].map((item, i) => (
              <li
                key={i}
                className="relative pl-10 pr-6 py-3 text-[15px] leading-snug border-b border-line last:border-b-0 before:content-[''] before:absolute before:left-6 before:top-[22px] before:w-3.5 before:h-0.5 before:bg-rust-base"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* 04 WHAT WE FOUND */}
        <div className="mb-16">
          <SectionLabel>04 · What We Found</SectionLabel>
          <H2>Findings</H2>

          <H3>The active customer base</H3>
          <p className="mb-4 max-w-[65ch]">After confirming the classification rules with you, the active subscriber base breaks down as follows.</p>

          <StatGrid>
            <Stat label="Schools" value="282" note="priced above the individual range" />
            <Stat label="Individuals" value="2,117" note="at confirmed individual prices" />
            <Stat label="For Review" value="47" note="non-standard prices, for your audit" last />
          </StatGrid>

          <p className="mb-4 max-w-[65ch]">
            The full classified list of subscriptions is in the data audit spreadsheet linked at the end of this report. Each row is
            tagged School, Individual or Review, with the membership plan it currently sits on, so your team has a working reference.
          </p>

          <H3>The data reconciles</H3>
          <p className="mb-4 max-w-[65ch]">
            We cross checked the active subscriptions against the active memberships using the linked subscription IDs in the membership
            records. 2,425 of the 2,446 active subscriptions (99 per cent) match cleanly to a membership. The 21 that did not match are
            isolated edge cases rather than a systemic issue. This is reassuring. The data is internally consistent, which means the
            migration can rely on the existing links between subscriptions and memberships when it converts schools across.
          </p>

          <H3>Renewal dates are populated and will be preserved</H3>
          <p className="mb-4 max-w-[65ch]">
            Every active school subscription has a recorded next renewal date. School renewals are spread across the year, with a
            pronounced peak through September to November (122 schools, around 43 per cent of the total) and a quieter spring.
          </p>
          <p className="mb-4 max-w-[65ch]">
            The migration approach is built around preserving these renewal dates exactly. Each school will continue to renew on the
            date and at the price it does today. Billing, payment methods, payment history and the renewal cycle itself are untouched.
            What changes is only the structure of access on top of the subscription.
          </p>

          <H3>How your schools pay</H3>
          <p className="mb-4 max-w-[65ch]">
            We extracted the payment method and renewal type for every school subscription. This is important because it determines how
            each school can be safely migrated.
          </p>

          <Breakdown>
            <BreakdownRow label="How the school renews today" count="Count" head />
            <BreakdownRow label="Invoice paid (no payment method stored, manual renewal)" count="156" school />
            <BreakdownRow label="Hybrid (Stripe details on record but manual renewal)" count="17" school />
            <BreakdownRow label="Stripe automatic renewal" count="108" />
            <BreakdownRow label="Other or anomalous" count="1" />
          </Breakdown>

          <p className="mb-4 max-w-[65ch]">
            173 of your schools (61 per cent) renew via invoice with no live payment authorisation tied to the subscription. These are
            the safest to migrate because there is no live card to preserve. The 108 schools on automatic Stripe renewal need additional
            care during the migration, which we have planned for.
          </p>

          <H3>The key finding: schools are on the wrong plans</H3>
          <Callout label="Finding">
            <p className="m-0">
              Only 18 of your 282 schools sit on a dedicated school membership plan. The other 264 are mixed into individual plans,
              mostly Full Access Annual and Early Years Annual.
            </p>
          </Callout>

          <p className="mb-4 max-w-[65ch]">The breakdown across membership plans looks like this.</p>

          <Breakdown>
            <BreakdownRow label="Membership plan the school sits on" count="Schools" head />
            <BreakdownRow label="Full Access Annual Membership" count="173" />
            <BreakdownRow label="Early Years Annual Membership" count="63" />
            <BreakdownRow label="Year One, Two, Three or Five Annual" count="23" />
            <BreakdownRow label="KS1 School Access (dedicated school plan)" count="13" school />
            <BreakdownRow label="Full Access (Small school NO EY)" count="4" school />
            <BreakdownRow label="KS2 School Access" count="1" school />
            <BreakdownRow label="No linked membership" count="5" />
          </Breakdown>

          <p className="mb-4 max-w-[65ch]">
            This is the concrete evidence of the inconsistency you have been describing. The dedicated school plans exist but have been
            used for fewer than 1 in 15 schools. The rest of the time, schools were set up on the same plans as individual customers.
            That is why your existing security cannot tell the difference between a school sharing a login and an individual abusing
            their account. There is no field in the data that flags a record as a school. The build resolves this by creating a clean
            school structure that every migrated school will sit on.
          </p>

          <H3>The Early Years dimension</H3>
          <p className="mb-4 max-w-[65ch]">
            63 of your schools, just over a fifth, specifically need Early Years access. The build accounts for this. Schools will be
            set up with the ability to include Early Years access or not, in line with how you currently price the school plans. Schools
            migrated across retain whatever access they currently have.
          </p>

          <H3>Site performance and hosting</H3>
          <p className="mb-4 max-w-[65ch]">
            We ran speed tests from two locations to baseline site performance before any work begins. The results show a meaningful
            difference depending on where the user is.
          </p>

          <StatGrid>
            <Stat label="From London" value="2.1s" note="fully loaded, grade A" />
            <Stat label="From Seattle" value="5.2s" note="fully loaded, grade C" />
            <Stat label="Backend" value="12x" note="slower for non-UK users" last />
          </StatGrid>

          <p className="mb-4 max-w-[65ch]">
            The site responds quickly to UK visitors but is several times slower to international visitors. The cause is that the site
            is hosted in the UK without a content delivery network handling full page caching for users elsewhere. Your international
            schools will be experiencing the slower of these two performance profiles.
          </p>
          <p className="mb-4 max-w-[65ch]">
            This is not something the build will fix or break. We are flagging it so you have a baseline on record before any migration
            work begins, and so the issue does not get attributed to the migration later. If you want to address it as a separate piece
            of work, we are happy to scope that conversation when you are ready. The full test reports are linked at the end of this
            document.
          </p>
        </div>

        {/* 05 OUR APPROACH */}
        <div className="mb-16">
          <SectionLabel>05 · Our Approach to the Build</SectionLabel>
          <H2>How we deliver this</H2>
          <p className="mb-4 max-w-[65ch]">
            The original proposal set out the technical approach. Discovery has confirmed it is the right one, and the developer
            documentation for Teams for WooCommerce Memberships shows that the plugin provides clean public APIs specifically designed
            for the kind of bulk migration we need to do.
          </p>

          <ApproachBlock label="Principle One" title="Two test environments, not one">
            <p>
              All development happens on a BlogVault staging environment running independently of your live site. The migration script
              is built, iterated and dry run there. Once it is behaving correctly on staging, we create a small number of test
              subscriptions on your production site, run the script against those only and verify the outcome end to end before any of
              your real schools are touched.
            </p>
            <p>
              This is the standard discipline for any work that touches live customer billing data, and it is included in the price.
            </p>
          </ApproachBlock>

          <ApproachBlock label="Principle Two" title="Bulk migration, with a protective fallback">
            <p>
              Our plan is to migrate all 282 schools in a single controlled bulk operation. The split below shows how we have thought
              about the safety of each group.
            </p>
          </ApproachBlock>

          <SplitGrid>
            <SplitBlock label="Primary path" title="Bulk Migration (282 schools)" primary>
              <p>
                All 282 schools converted to the new team structure in a single controlled operation. Renewal dates, billing and payment
                methods preserved.
              </p>
              <p>
                Of these, 173 are very low risk because they renew by invoice with no live payment authorisation tied to the
                subscription. The remaining 108 use automatic Stripe renewal and are migrated using the same approach with additional
                verification.
              </p>
            </SplitBlock>
            <SplitBlock label="Protective fallback" title="Per-School Playbook">
              <p>
                If testing reveals that the 108 Stripe schools need additional care that the bulk script cannot cleanly handle, those
                schools fall back to a documented per-school process used by your team at each renewal.
              </p>
              <p>The playbook is delivered as a standard deliverable regardless of whether the fallback is triggered.</p>
            </SplitBlock>
          </SplitGrid>

          <p className="mb-4 max-w-[65ch]">
            The fallback is a safety net, not the expected path. We are confident the bulk migration handles all 282 schools, but if
            anything in testing tells us otherwise we have a clean alternative ready to go for the 108 schools that need it.
          </p>

          <H3>What the playbook is, in practical terms</H3>
          <p className="mb-4 max-w-[65ch]">
            The playbook is a written, screenshot illustrated guide that walks your team through converting a single school manually
            using the WooCommerce admin. It covers the exact clicks, the fields to fill in, how to link the new team to the school
            owner, how to verify the conversion is correct and what to email the school owner. Roughly six to eight pages, taken from
            the actual built system so your team is looking at exactly what they will see.
          </p>
          <p className="mb-4 max-w-[65ch]">
            To make sure your team is confident using it, we run a walkthrough call (60 to 90 minutes) at handover. You, the people who
            will be doing the work and us. We share screen, walk through the playbook live, do one or two test conversions together,
            answer questions. After that your team handles any per-school conversions independently.
          </p>

          <Callout label="When the playbook gets used">
            <p className="m-0">
              Your team uses the playbook for any school that needs converting outside the bulk operation. That may include the 108
              Stripe schools if the fallback is triggered. It also covers any of the 47 review cases that turn out to be schools during
              your holiday audit, plus any future edge cases. The playbook is your reference for school conversion from handover
              onwards.
            </p>
          </Callout>

          <ApproachBlock label="Principle Three" title="Renewal dates and billing are preserved">
            <p>
              The migration uses the plugin's documented public APIs to create teams against existing user accounts and existing orders.
              We are not replacing subscriptions or breaking the billing relationship. Each school keeps its renewal date, its payment
              method (where one exists) and its billing history. From the school's billing point of view, nothing changes. What changes
              is the structure of access on top of the subscription.
            </p>
            <p>
              The dry run output shows the renewal date for each school before and after the migration, so we can visually verify zero
              change before any live data is written.
            </p>
          </ApproachBlock>
        </div>

        {/* 06 CONFIRMED BUILD */}
        <div className="mb-16">
          <SectionLabel>06 · Confirmed Build Scope and Price</SectionLabel>
          <H2>What you are committing to</H2>
          <p className="mb-4 max-w-[65ch]">Discovery has confirmed the scope and the price. The original total holds.</p>

          <ScopeCard
            price="£4,500"
            title="The build, end to end"
            intro="Everything required to take you from where you are today to a working new system with your 282 existing schools migrated across."
            items={[
              'Install and configure Teams for WooCommerce Memberships on staging',
              'Design and build a clean school membership plan structure that schools will be migrated onto',
              'Set up seat tiers that match your form entry model, with optional Early Years access',
              'Create the school admin role and link it to the new membership rules',
              'Preserve the existing per teacher download experience',
              'Configure the new subscription products and pricing for new schools signing up',
              'Build and test the full flow on staging: school signup, admin invites teacher, teacher logs in, downloads work correctly',
              "Write the migration script using the plugin's documented public APIs, with dry run mode and full logging",
              'Validate the script against test subscriptions on production before any school is touched',
              'Run the bulk migration of all 282 schools in a single controlled operation, preserving renewal dates and billing',
              'Written playbook for per-school conversions, delivered as a standard part of the project',
              'Walkthrough call to hand the new system over to your team and train them on the playbook',
            ]}
          />

          <div className="bg-steel-dark text-white p-8 md:p-10 my-6 rounded-sm">
            <div className="font-mono text-[11px] tracking-[0.2em] text-rust-base mb-4 font-bold uppercase">Confirmed Total</div>
            <div className="font-display text-4xl md:text-5xl text-white leading-none mb-3">£4,500</div>
            <div className="text-sm text-white/70 mt-4 pt-4 border-t border-white/15">
              Plus Teams for WooCommerce Memberships plugin licence (approximately £150 per year) passed through at cost.
            </div>
          </div>
        </div>

        {/* 07 PAYMENT TERMS */}
        <div className="mb-16">
          <SectionLabel>07 · Payment Terms</SectionLabel>
          <H2>How it is paid</H2>
          <p className="mb-4 max-w-[65ch]">
            The build phase is invoiced in two stages. Both are payable via the invoice link in the proceed section below.
          </p>

          <ScopeCard
            price="£2,250"
            title="On build kick off"
            items={[
              '50 per cent of the build phase total, invoiced on the day work begins',
              'Payable within 7 days of invoice date',
              'Work commences once payment is received and the contract is signed',
            ]}
          />

          <ScopeCard
            price="£2,250"
            title="On completion and sign off"
            items={[
              '50 per cent of the build phase total, invoiced on completion of the migration and handover',
              'Payable within 7 days of invoice date',
              'Plugin licence cost (approximately £150) passed through on this invoice at cost',
            ]}
          />
        </div>

        {/* 08 ASSUMPTIONS */}
        <div className="mb-16">
          <SectionLabel>08 · Documented Assumptions</SectionLabel>
          <H2>What we are taking as given</H2>
          <p className="mb-4 max-w-[65ch]">
            These are the assumptions discovery has surfaced and you have confirmed. They are recorded here so the basis of the build is
            unambiguous.
          </p>

          <Callout label="Assumption One">
            <p className="m-0">
              <strong>Individual price rule.</strong> Any subscription at one of the confirmed individual prices (£47, £55, £68 or £77
              per year, or £7 or £10 per month) is treated as an individual, regardless of how it was created or whether a school email
              or company name appears on the account. Schools are identified by a recurring price above the individual range.
            </p>
          </Callout>

          <Callout label="Assumption Two">
            <p className="m-0">
              <strong>Schools historically sold at an individual price.</strong> A small number of schools were historically sold
              subscriptions at an individual price and paid by invoice. At your instruction, these are treated as individuals and are
              out of scope for the bulk migration. Your internal holiday audit will identify any that require manual conversion, which
              your team will handle using the playbook.
            </p>
          </Callout>

          <Callout label="Assumption Three">
            <p className="m-0">
              <strong>The 47 review cases.</strong> 47 subscriptions sit at non standard prices that fit neither the individual nor
              school profile cleanly. These are not blocking and will be covered by your internal audit. Any that turn out to be schools
              can be converted by your team using the playbook. The full list is in the data audit spreadsheet.
            </p>
          </Callout>

          <Callout label="Assumption Four">
            <p className="m-0">
              <strong>Plugin compatibility.</strong> The build assumes the site is on current versions of WooCommerce, WooCommerce
              Memberships and WooCommerce Subscriptions. We have verified that all required minimum versions are met by a comfortable
              margin. We will confirm exact version compatibility against Teams for WooCommerce Memberships at build kick off, before
              purchasing the plugin licence.
            </p>
          </Callout>

          <Callout label="Assumption Five">
            <p className="m-0">
              <strong>Existing download experience.</strong> We have verified that downloads currently track per user via the native
              WooCommerce My Account page. Individual teachers added to the new school structure will inherit the same standard per-user
              tracking automatically. Existing historical download records remain attached to the existing user accounts and are not
              affected by the migration.
            </p>
          </Callout>
        </div>

        {/* 09 OUT OF SCOPE */}
        <div className="mb-16">
          <SectionLabel>09 · Not In Scope</SectionLabel>
          <H2>What we are not doing</H2>
          <p className="mb-4 max-w-[65ch]">
            Being clear on what is in scope protects against confusion later. The following are deliberately out of scope for the build.
          </p>

          <ul className="list-none p-0 mt-4 bg-paper border-2 border-steel-dark rounded-sm">
            {[
              'Site performance improvements or CDN setup. The performance baseline is captured for reference and can be quoted separately if you want to address it',
              'Any work on the existing 23 membership plans beyond the new school plan structure. We are not rationalising or removing the existing individual plans, which continue to operate as they do today',
              'Resolution of the 47 review cases. These are handed back to your internal audit, and any that turn out to be schools are converted by your team using the playbook',
              'Manual migration of schools historically sold at an individual price. These are also handed back to your internal audit',
              'Customer comms to schools about the migration. We will provide a clear set of facts and a suggested message for your team to draft from, but the comms go out from MTC under your branding and voice',
              'Ongoing support, training or maintenance beyond the handover walkthrough call. These can be scoped separately if needed',
            ].map((item, i) => (
              <li
                key={i}
                className="relative pl-10 pr-6 py-3 text-[15px] leading-snug border-b border-line last:border-b-0 before:content-[''] before:absolute before:left-6 before:top-[22px] before:w-3.5 before:h-0.5 before:bg-rust-base"
              >
                {item}
              </li>
            ))}
          </ul>

          <Callout label="A note on managed comms">
            <p>
              The original quote offered a fully managed migration including running the customer comms on your behalf. Discovery has
              changed the picture. Because we can now do a single controlled migration that preserves renewal dates, payment methods
              and billing exactly as they are, the customer facing change is much smaller than originally anticipated. Your schools see
              "you can now invite individual teacher logins under your account", not "your subscription is changing".
            </p>
            <p>
              On that basis we no longer think managed comms is a necessary cost. The message your team needs to send is short, factual
              and best delivered under your own branding and voice. If you would still prefer us to handle it, we can scope it as a
              separate piece of work, but our honest recommendation is to keep it in house.
            </p>
          </Callout>
        </div>

        {/* 10 DELIVERABLES */}
        <div className="mb-16">
          <SectionLabel>10 · Supporting Documents</SectionLabel>
          <H2>The data and reports behind this</H2>
          <p className="mb-6 max-w-[65ch]">
            The full classified subscriptions list, with every active record tagged as School, Individual or Review and joined to its
            current membership plan, is provided as a working spreadsheet. The site performance baseline reports from GTmetrix are also
            linked here.
          </p>

          <LinkCard
            label="Access"
            title="Subscriptions Data Audit"
            desc="Google Sheet: summary, schools, review list and individuals. 2,446 rows."
            href="https://docs.google.com/spreadsheets/d/17G26ut3FfDKkgc7laCcjomX71rA24iBf/edit?usp=sharing&ouid=102606530763806790802&rtpof=true&sd=true"
            buttonLabel="Access sheet"
          />

          <LinkCard
            label="View"
            title="Performance Report: From London"
            desc="GTmetrix full report. UK test server, grade A."
            href="https://drive.google.com/file/d/1LDtJU89FwhSBfEHmqnL4m_DdhAPDjGuJ/view?usp=sharing"
            buttonLabel="View PDF"
          />

          <LinkCard
            label="View"
            title="Performance Report: From Seattle"
            desc="GTmetrix full report. US test server, grade C."
            href="https://drive.google.com/file/d/12rVzyNi6hQ_8GsvB4MXV0khhppYtt7UO/view?usp=sharing"
            buttonLabel="View PDF"
          />
        </div>

        {/* CTA */}
        <div className="bg-rust-base p-10 md:p-12 relative mt-8 rounded-sm">
          <div className="absolute inset-2 border-2 border-steel-dark pointer-events-none rounded-sm"></div>
          <div className="relative z-10">
            <h2 className="font-display text-2xl md:text-3xl uppercase text-steel-dark mb-3 tracking-tight leading-none">Ready to proceed?</h2>
            <p className="text-steel-dark text-base max-w-[56ch] mb-6">
              If the scope, price and payment terms work for you, the next step is reviewing and signing the build phase contract, then
              paying the kick off invoice. Both are linked below. Work begins once both are complete.
            </p>
            <div className="flex flex-wrap gap-3 mt-2">
              <a
                href="https://portal.steelcoreoperations.com/public/form/view/6a1cc238c87f7bfb8639945e"
                className="inline-block bg-steel-dark text-white px-9 py-4 font-bold text-[13px] tracking-[0.14em] uppercase no-underline hover:bg-black transition-colors"
                target="_blank"
                rel="noopener"
              >
                Review &amp; sign contract
              </a>
              <a
                href="https://buy.stripe.com/8x2dR20aU5h54kx2bOaEE02"
                className="inline-block bg-transparent text-steel-dark border-2 border-steel-dark px-8 py-[14px] font-bold text-[13px] tracking-[0.14em] uppercase no-underline hover:bg-steel-dark hover:text-white transition-colors"
                target="_blank"
                rel="noopener"
              >
                View &amp; pay invoice
              </a>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="mt-16 pt-8 border-t-2 border-steel-dark flex flex-wrap justify-between items-center gap-4 font-mono text-xs text-steel-base tracking-[0.05em] uppercase">
          <div>Steel Core Operations</div>
          <div>Discovery Report · MTC · 31 May 2026</div>
        </div>
      </div>
    </div>
  );
};
