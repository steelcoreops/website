export const Logo = ({ tone = 'dark' }: { tone?: 'dark' | 'light' }) => (
  <div className="flex items-center gap-3">
    <div className={`w-9 h-9 flex items-center justify-center flex-shrink-0 ${tone === 'light' ? 'bg-white/10' : 'bg-steel-dark'}`}>
      <div className="w-5 h-5 border-2 border-rust-base rotate-45" />
    </div>
    <span className={`text-lg font-display tracking-tight uppercase leading-none ${tone === 'light' ? 'text-white' : 'text-steel-dark'}`}>
      Steel Core <span className="text-rust-base">Ops</span>
    </span>
  </div>
);
