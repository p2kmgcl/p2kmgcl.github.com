import { FC } from 'react';
import { useTheme } from '../styles/ThemeContext';
import { classNames } from '../utils/classNames';

export const Emoji: FC = ({ children }) => {
  const theme = useTheme();
  return <span className={classNames(theme.emoji)}>{children}</span>;
};
