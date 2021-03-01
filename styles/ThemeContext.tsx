import {
  createContext,
  Dispatch,
  FC,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Theme } from '../types/Theme';
import { DEFAULT_THEME, DEFAULT_THEME_NAME } from './DEFAULT_THEME';
import { THEMES } from './THEMES';

interface Context {
  theme: Theme | null;
  themeName: string;
}

const ThemeContext = createContext<Context>({
  theme: null,
  themeName: '',
});

const SetThemeContext = createContext<Dispatch<SetStateAction<Context>>>(
  () => {},
);

export const ThemeContextProvider: FC = ({ children }) => {
  const [context, setContext] = useState<Context>({
    theme: DEFAULT_THEME,
    themeName: DEFAULT_THEME_NAME,
  });

  useEffect(() => {
    document.documentElement.className = context.theme.html || '';
    document.body.className = context.theme.body || '';

    const wrapper = document.getElementById('__next');

    if (wrapper) {
      wrapper.className = context.theme.wrapper || '';
    }
  }, [context]);

  return (
    <SetThemeContext.Provider value={setContext}>
      <ThemeContext.Provider value={context}>{children}</ThemeContext.Provider>
    </SetThemeContext.Provider>
  );
};

export function useTheme(): Theme {
  const context = useContext(ThemeContext);

  if (!context.theme) {
    throw new Error('Cannot use theme outside ThemeContextProvider');
  }

  return context.theme;
}

export function useChangeTheme() {
  const context = useContext(ThemeContext);
  const setContext = useContext(SetThemeContext);

  return useCallback(async () => {
    const themeList = Object.entries(THEMES);

    const currentThemeIndex = themeList.findIndex(
      ([key]) => key === context.themeName,
    );

    const [nextName, loadNextTheme] = themeList[
      (currentThemeIndex + 1) % themeList.length
    ];

    const wrapper = document.documentElement;

    const waitForFrame = () =>
      new Promise<void>((resolve) => {
        requestAnimationFrame(() => {
          resolve();
        });
      });

    const waitForTransitionEnd = () =>
      new Promise<void>((resolve) => {
        const handleEvent = () => {
          wrapper.removeEventListener('transitionend', handleEvent);
          resolve();
        };

        wrapper.addEventListener('transitionend', handleEvent);
      });

    try {
      await waitForFrame();
      wrapper.style.transition = 'opacity ease 0.5s';
      await waitForFrame();
      wrapper.style.opacity = '0';
      await waitForTransitionEnd();

      await loadNextTheme().then(({ default: nextTheme }) => {
        setContext({ themeName: nextName, theme: nextTheme });
      });

      wrapper.style.opacity = '';
      await waitForTransitionEnd();
    } catch (error) {
      console.error(error);
    } finally {
      wrapper.style.opacity = '';
      wrapper.style.transition = '';
    }
  }, [setContext, context]);
}
