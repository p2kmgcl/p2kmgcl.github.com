import {
  createContext,
  Dispatch,
  FC,
  PropsWithChildren,
  useCallback,
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
  reloadThemeManager: () => void;
}>({
  themeId: DEFAULT_THEME_ID,
  setThemeId: () => {},
  theme: DEFAULT_THEME as unknown as Theme,
  setTheme: () => {},
  reloadThemeManager: () => {},
});

export const THEME_MANAGER_KEY = 'theme-manager';

export const ThemeContextProvider: FC<PropsWithChildren<{}>> = ({
  children,
}) => {
  const [themeId, setThemeId] = useState<ThemeId>(DEFAULT_THEME_ID);
  const [theme, setTheme] = useState(DEFAULT_THEME as unknown as Theme);
  const [reloadFlag, setReloadFlag] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(THEME_MANAGER_KEY)) {
      return;
    }

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
  }, [themeId, setThemeId, reloadFlag]);

  const reloadThemeManager = useCallback(() => {
    setReloadFlag((prevFlag) => !prevFlag);
  }, [setReloadFlag]);

  return (
    <ThemeContext.Provider
      value={{ themeId, setThemeId, theme, setTheme, reloadThemeManager }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export function useTheme() {
  return useContext(ThemeContext).theme;
}

export function useReloadThemeManager() {
  return useContext(ThemeContext).reloadThemeManager;
}
