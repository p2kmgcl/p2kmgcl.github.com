import type { FC, PropsWithChildren } from 'react';
import { useTheme } from './ThemeContext';

export const Emoji: FC<PropsWithChildren<{}>> = ({ children }) => (
  <span className={useTheme().emoji}>{children}</span>
);
