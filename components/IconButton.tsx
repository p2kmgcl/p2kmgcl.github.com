import { FC, MouseEventHandler, PropsWithChildren } from 'react';
import { useTheme } from './ThemeContext';

export const IconButton: FC<
  PropsWithChildren<{
    label: string;
    onClick: MouseEventHandler<HTMLButtonElement>;
  }>
> = ({ children, label, onClick }) => (
  <button
    aria-label={label}
    className={useTheme().iconButton}
    onClick={onClick}
    type="button"
  >
    {children}
  </button>
);
