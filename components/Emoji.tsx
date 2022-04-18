import type { FC } from 'react';
import { useTheme } from './ThemeContext';

export const Emoji: FC = ({ children }) => (
  <span className={useTheme().emoji}>{children}</span>
);
