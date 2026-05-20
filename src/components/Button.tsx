import React from 'react';

type ButtonProps = {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  className?: string;
  href?: string;
};

export const Button = ({
  children,
  variant = 'primary',
  className = '',
  href = 'https://calendly.com/steelcoreoperations/consult',
}: ButtonProps) => {
  const baseStyles =
    'inline-flex items-center justify-center px-8 py-4 text-sm font-bold uppercase tracking-widest transition-all duration-200 transform active:scale-95';
  const variants = {
    primary:
      'bg-rust-base text-white hover:bg-rust-dark shadow-[3px_3px_0px_0px_var(--color-steel-dark)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]',
    secondary:
      'bg-steel-dark text-white hover:bg-steel-base shadow-[3px_3px_0px_0px_var(--color-rust-base)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]',
    outline:
      'bg-white border-2 border-steel-dark text-steel-dark hover:bg-steel-dark hover:text-white shadow-[3px_3px_0px_0px_var(--color-steel-dark)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]',
  };

  return (
    <a href={href} className={`${baseStyles} ${variants[variant]} ${className}`}>
      {children}
    </a>
  );
};
