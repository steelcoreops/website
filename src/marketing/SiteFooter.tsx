import { Logo } from '../components/Logo';

export const SiteFooter = () => (
  <footer className="bg-steel-dark py-16 text-muted-dark">
    <div className="mx-auto max-w-[1200px] px-6 sm:px-10">
      <div className="grid gap-10 border-b border-line-dark pb-11 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Logo onDark />
          <p className="mt-[18px] max-w-[34ch] text-[0.95rem]">
            Senior delivery across strategy, operations and technology. We work inside your business and own the outcome.
          </p>
        </div>

        <div>
          <h4 className="mb-[18px] font-tech text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-muted-dark">
            Company
          </h4>
          <a className="mb-2.5 block text-[0.98rem] text-cloud transition-colors hover:text-bronze-lift" href="/services/">
            Services
          </a>
          <a className="mb-2.5 block text-[0.98rem] text-cloud transition-colors hover:text-bronze-lift" href="/about/">
            About
          </a>
          <a className="mb-2.5 block text-[0.98rem] text-cloud transition-colors hover:text-bronze-lift" href="/contact/">
            Contact
          </a>
        </div>

        <div>
          <h4 className="mb-[18px] font-tech text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-muted-dark">
            Get in touch
          </h4>
          <a
            className="mb-2.5 block text-[0.98rem] text-cloud transition-colors hover:text-bronze-lift"
            href="mailto:hello@steelcoreoperations.com"
          >
            hello@steelcoreoperations.com
          </a>
          <span className="mb-2.5 block text-[0.98rem] text-cloud">United Kingdom</span>
          <span className="mb-2.5 block text-[0.98rem] text-cloud">United States</span>
        </div>
      </div>

      <div className="flex flex-wrap justify-between gap-3.5 pt-[26px] font-tech text-[0.7rem] uppercase tracking-[0.1em] text-muted-dark">
        <span>Steel Core Operations LLP</span>
        <span>Registered no. OC461243</span>
        <span>&copy; 2026 Steel Core Operations LLP</span>
      </div>
    </div>
  </footer>
);
