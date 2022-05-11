import { FC, useEffect } from 'react';

const wrapperStyle = {
  display: 'grid',
  placeItems: 'center',
  minHeight: '100vh',
} as const;

const srOnlyStyle = {
  position: 'absolute',
  pointerEvents: 'none',
  opacity: 0,
} as const;

const progressStyle = {
  opacity: 0,
};

export const LoadingMask: FC<{ label: string; language: string }> = ({
  label,
  language,
}) => {
  useEffect(() => {
    if (globalThis.document) {
      const style = document.createElement('style');
      style.innerHTML = `[data-suspense-loading-mask] + [data-suspense-loading-mask] { opacity: 0; }`;
      document.head.appendChild(style);
    }
  }, []);

  return (
    <div data-suspense-loading-mask style={wrapperStyle}>
      <label>
        <span style={srOnlyStyle}>
          Loading &quot;{<span lang={language}>{label}</span>}&quot;
        </span>
        <progress style={progressStyle} />
      </label>
    </div>
  );
};
