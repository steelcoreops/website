import type { ReactNode } from 'react';

export const Eyebrow = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
  <div className={`inline-block px-4 py-1.5 bg-steel-dark text-white text-xs font-bold uppercase tracking-[0.18em] ${className}`}>
    {children}
  </div>
);
