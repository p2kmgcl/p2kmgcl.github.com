import { createContext, Dispatch, FC, useContext, useState } from 'react';
import { Theme } from '../types/Theme';

import DEFAULT_THEME from '../styles/simplicity/simplicity.module.scss';
const DEFAULT_THEME_ID: ThemeId = 'simplicity';

const THEME_MAP = {
  simplicity: () => import('../styles/simplicity/simplicity.module.scss'),
  comic: () => import('../styles/comic/comic.module.scss'),
  nothing: () => import('../styles/nothing/nothing.module.scss'),
};

type ThemeId = keyof typeof THEME_MAP;

const ThemeContext = createContext<{
  themeId: ThemeId;
  setThemeId: Dispatch<ThemeId>;
  theme: Theme;
  setTheme: Dispatch<Theme>;
}>({
  themeId: DEFAULT_THEME_ID,
  setThemeId: () => {},
  theme: DEFAULT_THEME as unknown as Theme,
  setTheme: () => {},
});

export const ThemeContextProvider: FC = ({ children }) => {
  const [themeId, setThemeId] = useState<ThemeId>(DEFAULT_THEME_ID);
  const [theme, setTheme] = useState(DEFAULT_THEME as unknown as Theme);

  return (
    <ThemeContext.Provider value={{ themeId, setThemeId, theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export function useTheme() {
  return useContext(ThemeContext).theme;
}
