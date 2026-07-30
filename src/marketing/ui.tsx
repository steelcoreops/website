import type { ReactNode } from 'react';
import { CALENDLY_URL } from './SiteNav';

/** Centered max-width container matching the design's `.wrap`. */
export const Wrap = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
  <div className={`mx-auto max-w-[1200px] px-6 sm:px-10 ${className}`}>{children}</div>
);

/**
 * Primary "Book a call" style CTA (the design's `.btn`), with the sliding
 * arrow. Points at Calendly by default to match the live booking flow.
 */
export const CtaButton = ({
  children,
  href = CALENDLY_URL,
  onDark = false,
  className = '',
}: {
  children: ReactNode;
  href?: string;
  onDark?: boolean;
  className?: string;
}) => (
  <a
    href={href}
    className={`group inline-flex items-center gap-3 border border-rust-base bg-rust-base px-[26px] py-4 font-tech text-[0.82rem] font-semibold uppercase tracking-[0.1em] ${
      onDark ? 'text-white' : 'text-cloud'
    } transition-colors hover:border-rust-dark hover:bg-rust-dark hover:text-white ${className}`}
  >
    {children}
    <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">
      &rarr;
    </span>
  </a>
);
