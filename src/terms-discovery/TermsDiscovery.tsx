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

export const TermsDiscovery = () => {
  return (
    <div className="bg-cloud min-h-screen text-steel-dark">
      <div className="max-w-[760px] mx-auto px-6 py-8 md:py-10 pb-24">
        {/* HEADER */}
        <div className="flex items-center gap-4 pt-5 pb-12">
          <Logo />
        </div>

        {/* EYEBROW + TITLE */}
        <Eyebrow className="mb-7 py-3 px-6 text-[13px] tracking-[0.18em]">Discovery Phase</Eyebrow>
        <h1 className="font-display text-[clamp(32px,6vw,48px)] leading-none tracking-tight text-steel-dark uppercase mb-6">
          Terms &amp; <span className="text-rust-base">Conditions</span>
        </h1>

        {/* INTRO */}
        <div className="text-base text-steel-dark py-6 border-t-2 border-b-2 border-steel-dark mb-4 leading-relaxed">
          These terms govern the Discovery and Site Audit phase only. By making payment for the Discovery phase, you confirm that you have
          read, understood and agree to these terms.
        </div>

        {/* META ROW */}
        <div className="flex flex-wrap gap-8 py-4 pb-12 font-mono text-xs text-steel-base tracking-[0.05em]">
          <div>
            <strong className="block text-steel-dark mb-0.5 font-bold">PROVIDER</strong>Steel Core Operations
          </div>
          <div>
            <strong className="block text-steel-dark mb-0.5 font-bold">SCOPE</strong>Discovery &amp; Site Audit phase
          </div>
          <div>
            <strong className="block text-steel-dark mb-0.5 font-bold">FEE</strong>As set out in your proposal
          </div>
        </div>

        <Clause num="01" title="What these terms cover">
          <p>
            These terms apply to the Discovery and Site Audit phase of work described in the proposal provided to you. They do not cover
            the subsequent build phase, which is subject to a separate written contract as set out in clause 7.
          </p>
          <p>In these terms, "we", "us" and "our" refer to Steel Core Operations. "You" and "your" refer to the client commissioning the work.</p>
        </Clause>

        <Clause num="02" title="Scope of the Discovery phase">
          <p>
            The Discovery phase is a fixed-price engagement. The fee and the specific activities for your project are set out in the
            proposal provided to you. In general, the Discovery phase involves:
          </p>
          <ul className="list-none p-0 mb-3">
            <Bullet>Reviewing the existing systems, setup and configuration relevant to the proposed work</Bullet>
            <Bullet>Assessing technical considerations, constraints and any risks that affect how the work should be approached</Bullet>
            <Bullet>Identifying and reviewing the data, accounts or content relevant to the project</Bullet>
            <Bullet>Confirming the environment in which the work will be carried out, including any staging requirements</Bullet>
            <Bullet>Producing a written specification and a confirmed fixed quote for the build phase</Bullet>
          </ul>
          <p>
            The deliverable of this phase is a written build specification and a confirmed fixed quote for the build phase, along with any
            supporting documents identified in your proposal. Any work beyond the activities set out in your proposal is outside the scope
            of this phase.
          </p>
        </Clause>

        <Clause num="03" title="Payment">
          <p>
            The Discovery fee set out in your proposal is payable in full before work begins. Work will be scheduled once payment has been
            received and any access required under clause 5 has been provided.
          </p>
          <p>
            The fee is exclusive of any third-party costs. Where third-party costs are required for the Discovery phase, we will discuss
            these with you before incurring them.
          </p>
        </Clause>

        <Clause num="04" title="No obligation to proceed to build">
          <p>
            Payment for the Discovery phase commits you to the Discovery phase only. It does not commit you to the build phase, and it does
            not commit you to the estimated build figure shown in the proposal.
          </p>
          <p>
            At the end of Discovery, you will receive a confirmed fixed quote for the build. You are free to accept that quote, decline it,
            or take the build specification elsewhere. Equally, we are not obliged to proceed to the build phase, though we will always
            tell you promptly if that is the case.
          </p>
        </Clause>

        {/* CALLOUT */}
        <div className="border-l-4 border-rust-base bg-paper px-6 py-5 mb-9">
          <div className="font-mono text-[11px] tracking-[0.15em] text-rust-base font-bold uppercase mb-2">In plain terms</div>
          <p className="text-[15px] leading-relaxed m-0">
            Paying for Discovery buys you a clear picture of the work and a firm price. It is not a commitment to the full project. The
            decision to proceed sits with you once you have that information.
          </p>
        </div>

        <Clause num="05" title="Your responsibilities">
          <p>
            To carry out the Discovery phase we will need timely access to the relevant systems. Depending on your project this may include
            administrator access to your website or application, and where applicable hosting, database, backup or third-party service
            access.
          </p>
          <p>
            You confirm that you are authorised to grant this access. Delays in providing access may delay the work and the delivery of the
            build specification.
          </p>
        </Clause>

        <Clause num="06" title="Confidentiality and data">
          <p>
            Any non-public information we access during the Discovery phase, including business or customer data, will be treated as
            confidential and used only for the purpose of carrying out this work.
          </p>
          <p>
            We will handle any personal data we encounter in accordance with applicable UK data protection law. We will not copy, retain or
            transfer data beyond what is necessary to deliver the Discovery phase, and any working copies will be removed once the phase is
            complete.
          </p>
        </Clause>

        <Clause num="07" title="The build phase">
          <p>
            The build phase is a separate engagement. If you choose to proceed after Discovery, the build will be governed by a separate
            written contract, signed by both parties, setting out the confirmed scope, the confirmed fixed price, deliverables, timeline
            and payment schedule.
          </p>
          <p>No build work will begin until that contract is signed.</p>
        </Clause>

        <Clause num="08" title="Deliverable and intellectual property">
          <p>
            Once the Discovery fee has been paid in full, the build specification and any supporting documents produced as the deliverable
            of this phase are yours to keep and use as you see fit.
          </p>
          <p>Any general methods, know-how or non-client-specific tools we use to carry out the work remain ours.</p>
        </Clause>

        <Clause num="09" title="Liability">
          <p>
            The Discovery phase is an audit and assessment exercise. It does not involve changes to your live systems, and we will not
            modify any live or production environment during this phase without your explicit prior agreement.
          </p>
          <p>
            We will carry out the work with reasonable skill and care. To the extent permitted by law, our total liability in connection
            with the Discovery phase is limited to the Discovery fee paid. Nothing in these terms limits liability for anything that cannot
            lawfully be limited.
          </p>
        </Clause>

        <Clause num="10" title="Cancellation">
          <p>
            If you wish to cancel the Discovery phase before work has begun, contact us as soon as possible and we will refund the fee in
            full.
          </p>
          <p>If work has already begun, we will refund the fee in proportion to the work not yet carried out, at our reasonable assessment.</p>
        </Clause>

        <Clause num="11" title="Governing law">
          <p>
            These terms are governed by the law of England and Wales, and the courts of England and Wales have exclusive jurisdiction over
            any dispute arising from them.
          </p>
        </Clause>

        {/* ACCEPTANCE */}
        <div className="bg-steel-dark text-white p-8 md:p-9 mt-12 rounded-sm">
          <div className="font-mono text-[11px] tracking-[0.15em] text-rust-base font-bold uppercase mb-3.5">Acceptance</div>
          <h2 className="font-display text-2xl uppercase mb-3.5 tracking-tight leading-none">Agreeing to these terms</h2>
          <p className="text-white/85 text-[15px] mb-3 leading-relaxed">
            By completing payment for the Discovery and Site Audit phase, you confirm that you have read and agree to these terms and
            conditions on behalf of your organisation.
          </p>
          <p className="text-white/85 text-[15px] leading-relaxed">
            If anything here is unclear or you would like to discuss it before proceeding, please get in touch before making payment and we
            will be glad to talk it through.
          </p>
        </div>

        {/* FOOTER */}
        <div className="mt-12 pt-7 border-t-2 border-steel-dark flex flex-wrap justify-between items-center gap-3 font-mono text-xs text-steel-base tracking-[0.05em] uppercase">
          <div>Steel Core Operations</div>
          <div>Discovery Phase Terms · V1</div>
        </div>
      </div>
    </div>
  );
};
