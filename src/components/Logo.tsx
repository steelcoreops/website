export const Logo = ({ size = 'md' }: { size?: 'sm' | 'md' }) => {
  const markSize = size === 'sm' ? 'w-8 h-8' : 'w-10 h-10';
  const innerSize = size === 'sm' ? 'w-4 h-4' : 'w-6 h-6';
  const textSize = size === 'sm' ? 'text-lg' : 'text-xl';

  return (
    <div className="flex items-center gap-3">
      <div className={`${markSize} bg-steel-dark flex items-center justify-center flex-shrink-0`}>
        <div className={`${innerSize} border-2 border-rust-base rotate-45`}></div>
      </div>
      <span className={`${textSize} font-display tracking-tight uppercase text-steel-dark leading-none`}>
        Steel Core <span className="text-rust-base">Ops</span>
      </span>
    </div>
  );
};
