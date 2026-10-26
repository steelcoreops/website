import type { ButtonHTMLAttributes, InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from 'react';

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';

const variants: Record<Variant, string> = {
  primary:
    'bg-rust-base text-white hover:bg-rust-dark shadow-sm',
  secondary:
    'bg-steel-dark text-white hover:bg-steel-base shadow-sm',
  outline: 'bg-white border border-line text-steel-dark hover:border-steel-base hover:bg-paper',
  ghost: 'text-steel-base hover:text-steel-dark hover:bg-paper',
  danger: 'bg-white border-2 border-danger text-danger hover:bg-danger hover:text-white',
};

export const buttonClass = (variant: Variant = 'primary', extra = '') =>
  `inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all duration-150 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none ${variants[variant]} ${extra}`;

export function Button({
  variant = 'primary',
  className = '',
  type = 'button',
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return <button type={type} className={buttonClass(variant, className)} {...rest} />;
}

export function IconButton({ label, className = '', ...rest }: ButtonHTMLAttributes<HTMLButtonElement> & { label: string }) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className={`inline-flex items-center justify-center w-8 h-8 text-steel-base hover:text-steel-dark hover:bg-paper disabled:opacity-30 disabled:pointer-events-none ${className}`}
      {...rest}
    />
  );
}

export const Eyebrow = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
  <div className={`inline-block px-3.5 py-1 rounded-full bg-rust-base/10 text-rust-dark text-xs font-bold uppercase tracking-[0.12em] ${className}`}>
    {children}
  </div>
);

export const Label = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
  <div className={`text-[11.5px] font-bold uppercase tracking-[0.1em] ${className}`}>{children}</div>
);

/** Page title in sentence case, with the last word in rust as on the marketing site. */
export function Title({ text, className = '' }: { text: string; className?: string }) {
  const words = text.trim().split(/\s+/);
  const last = words.pop();
  return (
    <h1 className={`font-bold leading-[1.05] tracking-[-0.025em] text-steel-dark text-balance ${className}`}>
      {words.join(' ')}
      {words.length > 0 && ' '}
      <span className="text-rust-base">{last}</span>
    </h1>
  );
}

export const inputClass =
  'w-full bg-white border border-line focus:border-steel-base focus:ring-2 focus:ring-rust-base/15 outline-none px-3 py-2.5 text-[15px] text-steel-dark placeholder:text-steel-base/50 rounded-sm transition-colors';

export function Field({ label, hint, children }: { label: string; hint?: ReactNode; children: ReactNode }) {
  return (
    <label className="block">
      <Label className="text-steel-base mb-1.5">{label}</Label>
      {children}
      {hint && <span className="block text-xs text-steel-base mt-1.5 leading-snug">{hint}</span>}
    </label>
  );
}

export const Input = (props: InputHTMLAttributes<HTMLInputElement>) => <input {...props} className={`${inputClass} ${props.className ?? ''}`} />;

export const Textarea = (props: TextareaHTMLAttributes<HTMLTextAreaElement>) => (
  <textarea {...props} className={`${inputClass} leading-relaxed resize-y ${props.className ?? ''}`} />
);

export const Select = (props: SelectHTMLAttributes<HTMLSelectElement>) => (
  <select {...props} className={`${inputClass} ${props.className ?? ''}`} />
);

export function Checkbox({ checked, onChange, label, disabled }: { checked: boolean; onChange: (v: boolean) => void; label: ReactNode; disabled?: boolean }) {
  return (
    <label className={`inline-flex items-center gap-2.5 text-sm select-none ${disabled ? 'opacity-50' : 'cursor-pointer'}`}>
      <input type="checkbox" className="w-4 h-4 accent-rust-base" checked={checked} disabled={disabled} onChange={(e) => onChange(e.target.checked)} />
      {label}
    </label>
  );
}

const badgeTones = {
  neutral: 'bg-paper text-steel-base border-line',
  rust: 'bg-rust-base/10 text-rust-dark border-rust-base/40',
  dark: 'bg-steel-dark text-white border-steel-dark',
  ok: 'bg-ok/10 text-ok border-ok/30',
  danger: 'bg-danger/10 text-danger border-danger/30',
};

export const Badge = ({ children, tone = 'neutral' }: { children: ReactNode; tone?: keyof typeof badgeTones }) => (
  <span className={`inline-flex items-center px-2 py-0.5 border font-mono text-[10.5px] font-bold uppercase tracking-[0.1em] whitespace-nowrap ${badgeTones[tone]}`}>
    {children}
  </span>
);

export function Notice({ tone = 'info', children }: { tone?: 'info' | 'error' | 'ok'; children: ReactNode }) {
  const tones = {
    info: 'border-steel-dark bg-paper',
    error: 'border-danger bg-danger/5 text-danger',
    ok: 'border-ok bg-ok/5 text-ok',
  };
  return <div className={`border-l-4 px-4 py-3 text-sm leading-relaxed ${tones[tone]}`}>{children}</div>;
}

export const Spinner = ({ label = 'Loading' }: { label?: string }) => (
  <div className="flex items-center justify-center gap-3 py-24 font-mono text-xs uppercase tracking-[0.15em] text-steel-base" role="status">
    <span className="w-3 h-3 border-2 border-rust-base rotate-45 animate-spin" />
    {label}
  </div>
);

export const Card = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
  <div className={`bg-white border border-line rounded-sm ${className}`}>{children}</div>
);
