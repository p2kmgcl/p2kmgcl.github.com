import { FC, useMemo } from 'react';
import { useTheme } from './ThemeContext';

export const Time: FC<{ dateTime: number }> = ({ dateTime }) => {
  const date = useMemo(() => new Date(dateTime), [dateTime]);

  return (
    <time className={useTheme().time} dateTime={date.toISOString()}>
      {date.toLocaleDateString('en', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: '2-digit',
      })}
    </time>
  );
};
