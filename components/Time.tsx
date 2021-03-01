import { FC } from 'react';
import { useTheme } from '../styles/ThemeContext';
import { classNames } from '../utils/classNames';

export const Time: FC<{ dateTime: number }> = ({ dateTime }) => {
  const date = new Date(dateTime);
  const theme = useTheme();

  return (
    <time className={classNames(theme.time)} dateTime={date.toISOString()}>
      {date.toLocaleDateString('en', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: '2-digit',
      })}
    </time>
  );
};
