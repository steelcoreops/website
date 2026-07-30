import { SiteNav } from '../marketing/SiteNav';
import { SiteFooter } from '../marketing/SiteFooter';
import { Kicker } from '../marketing/Kicker';
import { Wrap, CtaButton } from '../marketing/ui';

const EXPECT = [
  'A straight conversation about the work, not a sales call.',
  'An honest view on whether we are the right team for it.',
  'How we would approach it and what it would take.',
];

export default function Contact() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-cloud font-body text-[17px] leading-[1.6] text-steel-dark selection:bg-rust-base selection:text-white">
      <SiteNav active="contact" />

      <main>
        {/* Page hero */}
        <section className="pb-[clamp(26px,4vw,44px)] pt-[clamp(58px,8vw,104px)]">
          <Wrap>
            <Kicker>Contact</Kicker>
            <h1 className="mt-[22px] font-heading text-[clamp(2rem,5.6vw,4.4rem)] font-extrabold leading-[1.02] tracking-[-0.02em]">
              Let&rsquo;s talk.
            </h1>
            <p className="mt-[26px] max-w-[56ch] text-[1.18rem]">
              Tell us what needs to happen. We will give you a straight view on whether we are the right team for it and
              how we would approach it. No pitch, no obligation.
            </p>
          </Wrap>
        </section>

        <section className="pb-[clamp(72px,8vw,116px)] pt-[clamp(10px,2vw,30px)]">
          <Wrap>
            <div className="grid items-start gap-16 md:grid-cols-[1.1fr_0.9fr]">
              {/* Reach */}
              <div>
                <Kicker>Get in touch</Kicker>
                <a
                  href="mailto:hello@steelcoreoperations.com"
                  className="my-4 block break-words font-heading text-[clamp(1.05rem,2.9vw,2.1rem)] font-bold tracking-[-0.015em] text-steel-dark transition-colors hover:text-rust-base"
                >
                  hello@steelcoreoperations.com
                </a>
                <div className="mb-[30px]">
                  <CtaButton>Book a call</CtaButton>
                </div>
                <p className="mt-[30px] max-w-[44ch] text-steel-base">
                  We work with a small number of clients at a time, so we read every enquiry properly and come back to
                  you ourselves.
                </p>
                <div className="mt-[30px] flex gap-[22px] font-tech text-[0.76rem] uppercase tracking-[0.14em] text-steel-base">
                  <span>United Kingdom</span>
                  <span>United States</span>
                </div>
              </div>

              {/* What to expect */}
              <div>
                <Kicker>What to expect</Kicker>
                <ul className="mt-4 grid gap-[22px]">
                  {EXPECT.map((item) => (
                    <li key={item} className="relative max-w-[44ch] pl-7">
                      <span className="absolute left-0.5 top-[10px] h-2 w-2 rotate-45 bg-rust-base" aria-hidden="true"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Wrap>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
