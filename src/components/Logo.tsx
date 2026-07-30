export const Logo = ({ size = 'md', onDark = false }: { size?: 'sm' | 'md'; onDark?: boolean }) => {
  const markSize = size === 'sm' ? 'w-8 h-8' : 'w-10 h-10';
  const innerSize = size === 'sm' ? 'w-4 h-4' : 'w-6 h-6';
  const textSize = size === 'sm' ? 'text-lg' : 'text-xl';

  // On dark backgrounds the mark inverts (bronze block, light inner) and the
  // wordmark reads light — matching how the wordmark appears in the footer.
  const markBg = onDark ? 'bg-rust-base' : 'bg-steel-dark';
  const innerBorder = onDark ? 'border-white' : 'border-rust-base';
  const textColor = onDark ? 'text-cloud' : 'text-steel-dark';

  return (
    <div className="flex items-center gap-3">
      <div className={`${markSize} ${markBg} flex items-center justify-center flex-shrink-0`}>
        <div className={`${innerSize} border-2 ${innerBorder} rotate-45`}></div>
      </div>
      <span className={`${textSize} font-display tracking-tight uppercase ${textColor} leading-none`}>
        Steel Core <span className="text-rust-base">Ops</span>
      </span>
    </div>
  );
};
