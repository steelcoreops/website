import type { ReactNode } from 'react';

/**
 * Small mono uppercase label with a leading dash, used above headings
 * across the marketing pages (the design's `.eyebrow`).
 */
export const Kicker = ({
  children,
  onDark = false,
  className = '',
}: {
  children: ReactNode;
  onDark?: boolean;
  className?: string;
}) => {
  const color = onDark ? 'text-bronze-lift' : 'text-rust-base';
  const dash = onDark ? 'bg-bronze-lift' : 'bg-rust-base';
  return (
    <span
      className={`inline-flex items-center gap-3 font-tech text-[0.72rem] font-semibold uppercase tracking-[0.22em] ${color} ${className}`}
    >
      <span className={`inline-block h-0.5 w-[26px] ${dash}`} aria-hidden="true"></span>
      {children}
    </span>
  );
};
