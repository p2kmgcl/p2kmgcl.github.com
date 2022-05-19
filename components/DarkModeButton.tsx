import { FC, useEffect, useMemo, useState } from 'react';
import { useHasMounted } from '../utils/useHasMounted';
import { IconButton } from './IconButton';
import { Moon } from './icons/Moon';
import { Sun } from './icons/Sun';

type DarkModeStatus = 'dark' | 'light' | 'auto';

// @ts-ignore
const DARK_MODE_KEY = globalThis.DARK_MODE_KEY;

// @ts-ignore
const DARK_MODE_QUERY = globalThis.DARK_MODE_QUERY;

// @ts-ignore
const DARK_MODE_STATUS: Record<string, DarkModeStatus> = {
  dark: 'dark',
  light: 'light',
  auto: 'auto',
};

export const APPLY_DARK_MODE_SCRIPT = `
  (function() {
    globalThis.DARK_MODE_KEY = 'dark-mode';
    globalThis.DARK_MODE_QUERY = '(prefers-color-scheme: dark)';
    globalThis.DARK_MODE_STATUS = {dark: 'dark', light: 'light', auto: 'auto'};
    const preference = globalThis.localStorage?.getItem(DARK_MODE_KEY) || DARK_MODE_STATUS.auto;
    const queryValue = globalThis.matchMedia?.(DARK_MODE_QUERY).matches || false;
    const isDark = preference === DARK_MODE_STATUS.dark || queryValue;
    document.documentElement.dataset.colorScheme = isDark ? 'dark' : 'light';
    document.documentElement.style.backgroundColor = isDark ? '#1e1e1e' : '#fafafa';
  })();
`;

export const DarkModeButton: FC<{}> = () => {
  const hasMounted = useHasMounted();

  const [preference, setPreference] = useState<DarkModeStatus>(
    () =>
      (globalThis.localStorage?.getItem(
        DARK_MODE_KEY,
      ) as DarkModeStatus | null) || DARK_MODE_STATUS.auto,
  );

  const [queryValue, setQueryValue] = useState<boolean>(
    () => globalThis.matchMedia?.(DARK_MODE_QUERY).matches || false,
  );

  const isDark = useMemo(
    () => preference === DARK_MODE_STATUS.dark || queryValue,
    [preference, queryValue],
  );

  useEffect(() => {
    const queryListener = globalThis.matchMedia?.(DARK_MODE_QUERY);
    const handleChange = () => setQueryValue(queryListener.matches);
    queryListener.addEventListener('change', handleChange);
    return () => queryListener.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.colorScheme = isDark ? 'dark' : 'light';
  }, [isDark]);

  const handleClick = () => {
    setPreference((prevDarkMode) => {
      let nextDarkMode = DARK_MODE_STATUS.auto;

      if (prevDarkMode === DARK_MODE_STATUS.auto) {
        return queryValue ? DARK_MODE_STATUS.light : DARK_MODE_STATUS.dark;
      } else if (prevDarkMode === DARK_MODE_STATUS.dark) {
        nextDarkMode = DARK_MODE_STATUS.light;
      } else {
        nextDarkMode = DARK_MODE_STATUS.dark;
      }

      localStorage.setItem(DARK_MODE_KEY, nextDarkMode);
      return nextDarkMode;
    });
  };

  return (
    <IconButton label="Toggle dark mode" onClick={handleClick}>
      {hasMounted ? isDark ? <Moon /> : <Sun /> : null}
    </IconButton>
  );
};
