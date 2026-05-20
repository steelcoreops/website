import type { ReactNode } from 'react';
import { Logo } from '../components/Logo';
import { Eyebrow } from '../components/Eyebrow';

const Clause = ({ num, title, children }: { num: string; title: string; children: ReactNode }) => (
  <div className="mb-9">
    <div className="flex items-baseline gap-3.5 mb-3.5 pb-3 border-b border-line">
      <div className="font-display text-base text-rust-base flex-shrink-0">{num}</div>
      <div className="font-display text-lg uppercase text-steel-dark tracking-tight">{title}</div>
    </div>
    <div className="space-y-3 text-[15px] leading-relaxed">{children}</div>
  </div>
);

const Bullet = ({ children }: { children: ReactNode }) => (
  <li className="relative pl-7 py-2 text-[15px] leading-snug border-b border-line last:border-b-0 before:content-[''] before:absolute before:left-0 before:top-[14px] before:w-3 before:h-0.5 before:bg-rust-base">
    {children}
  </li>
);

export const Privacy = () => {
  return (
    <div className="bg-cloud min-h-screen text-steel-dark">
      <div className="max-w-[760px] mx-auto px-6 py-8 md:py-10 pb-24">
        {/* HEADER */}
        <div className="flex items-center gap-4 pt-5 pb-12">
          <Logo />
        </div>

        {/* EYEBROW + TITLE */}
        <Eyebrow className="mb-7 py-3 px-6 text-[13px] tracking-[0.18em]">Privacy Policy</Eyebrow>
        <h1 className="font-display text-[clamp(32px,6vw,48px)] leading-none tracking-tight text-steel-dark uppercase mb-6">
          How we handle <span className="text-rust-base">your data</span>
        </h1>

        {/* INTRO */}
        <div className="text-base text-steel-dark py-6 border-t-2 border-b-2 border-steel-dark mb-4 leading-relaxed">
          This policy explains what personal data Steel Core Operations collects, how we use it, and the rights you have over it. We aim
          to be straightforward, not exhaustive. If anything is unclear, get in touch and we will explain.
        </div>

        {/* META ROW */}
        <div className="flex flex-wrap gap-8 py-4 pb-12 font-mono text-xs text-steel-base tracking-[0.05em]">
          <div>
            <strong className="block text-steel-dark mb-0.5 font-bold">CONTROLLER</strong>Steel Core Operations
          </div>
          <div>
            <strong className="block text-steel-dark mb-0.5 font-bold">CONTACT</strong>hello@steelcoreoperations.com
          </div>
          <div>
            <strong className="block text-steel-dark mb-0.5 font-bold">JURISDICTION</strong>England &amp; Wales (UK GDPR)
          </div>
        </div>

        <Clause num="01" title="Who we are">
          <p>
            Steel Core Operations ("we", "us", "our") is a UK-based business that builds and runs revenue infrastructure for coaches,
            consultants and agencies.
          </p>
          <p>
            For the purposes of UK data protection law, we are the data controller for the personal data we collect about visitors to this
            website, people who contact us, and our clients and their representatives.
          </p>
        </Clause>

        <Clause num="02" title="When we act as a processor">
          <p>
            When we deliver services to a client, we often handle personal data that belongs to the client's own customers (for example,
            inside a CRM or automation we build for them). In those cases, the client is the data controller and we are a data processor
            acting on their instructions.
          </p>
          <p>
            That activity is governed by a separate written agreement with the client, not by this policy. This policy covers our own role
            as a controller of data we collect directly.
          </p>
        </Clause>

        {/* CALLOUT */}
        <div className="border-l-4 border-rust-base bg-paper px-6 py-5 mb-9">
          <div className="font-mono text-[11px] tracking-[0.15em] text-rust-base font-bold uppercase mb-2">In plain terms</div>
          <p className="text-[15px] leading-relaxed m-0">
            If you visit the site, email us, or work with us as a client, this policy applies. If you're an end-customer of one of our
            clients, the policy that applies is theirs — speak to them.
          </p>
        </div>

        <Clause num="03" title="The information we collect">
          <p>The personal data we collect depends on how you interact with us:</p>
          <ul className="list-none p-0 mb-3">
            <Bullet>
              <strong>Website visitors.</strong> Our hosting provider records standard server log information (IP address, browser, pages
              requested) for short periods, used to operate and secure the site. We do not run analytics or advertising tracking on the
              site at this time.
            </Bullet>
            <Bullet>
              <strong>People who contact us.</strong> If you email us, book a call via Calendly, or otherwise reach out, we collect the
              information you provide: your name, email address, business details and the content of your message.
            </Bullet>
            <Bullet>
              <strong>Clients and their representatives.</strong> To deliver our services we collect business contact details, project
              information, and the access credentials needed to do the work (which are revoked when the engagement ends).
            </Bullet>
            <Bullet>
              <strong>Billing.</strong> We collect the information needed to invoice you and to comply with tax and accounting obligations.
            </Bullet>
          </ul>
        </Clause>

        <Clause num="04" title="How we use it">
          <p>We use personal data to:</p>
          <ul className="list-none p-0 mb-3">
            <Bullet>Respond to enquiries and arrange calls</Bullet>
            <Bullet>Deliver, manage and improve the services we provide to our clients</Bullet>
            <Bullet>Send service-related communications (project updates, scheduling, invoices)</Bullet>
            <Bullet>Comply with our legal, tax and accounting obligations</Bullet>
            <Bullet>Operate and secure our website and systems</Bullet>
          </ul>
          <p>We do not use your personal data for automated decision-making or profiling.</p>
        </Clause>

        <Clause num="05" title="Legal basis for processing">
          <p>Under UK GDPR we rely on the following legal bases:</p>
          <ul className="list-none p-0 mb-3">
            <Bullet>
              <strong>Contract.</strong> To take steps before entering a contract with you (such as preparing a proposal) and to perform a
              contract once it's in place.
            </Bullet>
            <Bullet>
              <strong>Legitimate interests.</strong> To respond to enquiries, manage relationships with clients and prospects, and operate
              and secure our website.
            </Bullet>
            <Bullet>
              <strong>Legal obligation.</strong> To keep records required by tax and accounting law and to respond to lawful requests.
            </Bullet>
            <Bullet>
              <strong>Consent.</strong> Where we send marketing communications to someone who is not already a client, we rely on consent
              and you can withdraw it at any time.
            </Bullet>
          </ul>
        </Clause>

        <Clause num="06" title="Cookies and tracking">
          <p>
            This website does not set analytics or advertising cookies. Strictly necessary technical state may be stored in your browser
            to make the site work.
          </p>
          <p>
            The site loads fonts from Google Fonts, which means your IP address is transmitted to Google when you load a page. Google
            states it does not log IPs requested via its Fonts CSS API and does not use that data for advertising. If we add analytics or
            other tracking in the future, we will update this policy and, where required, ask for your consent first.
          </p>
        </Clause>

        <Clause num="07" title="Who we share information with">
          <p>We do not sell personal data. We share it only with:</p>
          <ul className="list-none p-0 mb-3">
            <Bullet>
              <strong>Service providers</strong> that help us operate the business — for example, our hosting provider, email provider,
              calendar/booking tool, and accounting software. These providers process data on our instructions under contract.
            </Bullet>
            <Bullet>
              <strong>Professional advisers</strong> such as accountants and lawyers where there is a legitimate need.
            </Bullet>
            <Bullet>
              <strong>Regulators and authorities</strong> where we are required to disclose information by law.
            </Bullet>
          </ul>
          <p>If you'd like a list of our current service providers, contact us and we'll share it.</p>
        </Clause>

        <Clause num="08" title="International transfers">
          <p>
            Some of the service providers we use are based outside the United Kingdom, including in the United States. Where personal data
            is transferred outside the UK, we rely on transfer mechanisms recognised under UK GDPR (such as UK adequacy regulations, the
            UK addendum to the EU Standard Contractual Clauses, or equivalent safeguards) to ensure your data remains protected.
          </p>
        </Clause>

        <Clause num="09" title="How long we keep it">
          <p>
            We keep personal data only as long as we need it for the purpose we collected it, after which we delete or anonymise it.
            Specifically:
          </p>
          <ul className="list-none p-0 mb-3">
            <Bullet>Enquiries that do not lead to a contract: deleted within 12 months unless you ask us to keep in touch.</Bullet>
            <Bullet>Client records: retained for the duration of the engagement and for 6 years afterwards to meet tax and accounting requirements.</Bullet>
            <Bullet>Access credentials we are given for a project: removed at the end of the engagement.</Bullet>
            <Bullet>Server logs: retained for short periods by our hosting provider, in line with their standard policy.</Bullet>
          </ul>
        </Clause>

        <Clause num="10" title="Your rights">
          <p>Under UK GDPR you have the right to:</p>
          <ul className="list-none p-0 mb-3">
            <Bullet>Ask for a copy of the personal data we hold about you</Bullet>
            <Bullet>Ask us to correct information that is inaccurate or incomplete</Bullet>
            <Bullet>Ask us to delete your personal data, where applicable</Bullet>
            <Bullet>Ask us to restrict or object to certain processing</Bullet>
            <Bullet>Ask for your data in a portable format, where applicable</Bullet>
            <Bullet>Withdraw consent at any time, where we rely on consent</Bullet>
          </ul>
          <p>
            To exercise any of these rights, email us at hello@steelcoreoperations.com. We will respond within one month and will not
            charge you for a reasonable request.
          </p>
        </Clause>

        <Clause num="11" title="Security">
          <p>
            We take reasonable technical and organisational measures to protect personal data we hold, including using reputable providers
            for hosting and email, limiting access to information on a need-to-know basis, and removing client access credentials at the
            end of an engagement.
          </p>
          <p>No system is perfectly secure. If you become aware of a security concern, please contact us so we can investigate.</p>
        </Clause>

        <Clause num="12" title="Complaints">
          <p>
            If you have a concern about how we handle your personal data, please contact us first at hello@steelcoreoperations.com and we
            will do our best to put it right.
          </p>
          <p>
            You also have the right to complain to the Information Commissioner's Office (ICO), the UK's data protection regulator, at{' '}
            <a className="text-rust-base underline" href="https://ico.org.uk" target="_blank" rel="noopener noreferrer">
              ico.org.uk
            </a>
            .
          </p>
        </Clause>

        <Clause num="13" title="Changes to this policy">
          <p>
            We may update this policy from time to time. The "last updated" date below reflects the most recent version. If we make a
            change that materially affects how we use your data, we will let affected clients know directly.
          </p>
        </Clause>

        {/* FOOTER */}
        <div className="mt-12 pt-7 border-t-2 border-steel-dark flex flex-wrap justify-between items-center gap-3 font-mono text-xs text-steel-base tracking-[0.05em] uppercase">
          <div>Steel Core Operations</div>
          <div>Last updated May 2026</div>
        </div>
      </div>
    </div>
  );
};
