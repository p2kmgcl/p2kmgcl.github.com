import {
  createContext,
  Dispatch,
  FC,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Theme } from '../types/Theme';

import DEFAULT_THEME from '../styles/simplicity/simplicity.module.scss';
const DEFAULT_THEME_ID: ThemeId = 'simplicity';

const THEME_MAP = {
  simplicity: () => import('../styles/simplicity/simplicity.module.scss'),
  // comic: () => import('../styles/comic/comic.module.scss'),
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

  useEffect(() => {
    // @ts-ignore
    if (!window.ThemeManager) {
      console.log(
        'Hey there!\nMaybe you want to check the ThemeManager\nJust use "window.ThemeManager" methods :3',
      );
    }

    function getCurrentTheme() {
      return themeId;
    }

    async function setCurrentTheme(nextThemeId: string) {
      if (nextThemeId in THEME_MAP) {
        const loadTheme = THEME_MAP[nextThemeId as ThemeId];
        const theme = await loadTheme();

        setThemeId(nextThemeId as ThemeId);
        setTheme(theme as unknown as Theme);
      }
    }

    async function setRandomTheme() {
      const filteredThemeList = Object.keys(THEME_MAP).filter(
        (id) => id !== themeId,
      );

      const nextThemeId =
        filteredThemeList[Math.floor(Math.random() * filteredThemeList.length)];

      await setCurrentTheme(nextThemeId);
    }

    function getThemeList() {
      return Object.keys(THEME_MAP);
    }

    // @ts-ignore
    window.ThemeManager = {
      getCurrentTheme,
      setCurrentTheme,
      setRandomTheme,
      getThemeList,
    };
  }, [themeId, setThemeId]);

  return (
    <ThemeContext.Provider value={{ themeId, setThemeId, theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export function useTheme() {
  return useContext(ThemeContext).theme;
}
