import { useEffect, useState } from 'react';
import { useHasMounted } from '../utils/useHasMounted';
import { IconButton } from './IconButton';
import { Shuffle } from './icons/Shuffle';
import { THEME_MANAGER_KEY, useReloadThemeManager } from './ThemeContext';

export const ShuffleThemeButton = () => {
  const hasMounted = useHasMounted();
  const [themeManagerEnabled, setThemeManagerEnabled] = useState(false);
  const reloadThemeManager = useReloadThemeManager();

  useEffect(() => {
    if (globalThis.localStorage.getItem(THEME_MANAGER_KEY)) {
      setThemeManagerEnabled(true);
      return;
    }

    const url = new URL(globalThis.location.href);

    if (url.searchParams.has(THEME_MANAGER_KEY)) {
      localStorage.setItem(THEME_MANAGER_KEY, 'true');
      setThemeManagerEnabled(true);
      url.searchParams.delete(THEME_MANAGER_KEY);
      globalThis.history.replaceState(null, '', url.toString());
      reloadThemeManager();
      return;
    }
  }, [reloadThemeManager]);

  if (!hasMounted || !themeManagerEnabled) {
    return null;
  }

  const handleClick = () => {
    // @ts-ignore
    window.ThemeManager.setRandomTheme();
  };

  return (
    <IconButton label="Shuffle theme" onClick={handleClick}>
      <Shuffle />
    </IconButton>
  );
};
