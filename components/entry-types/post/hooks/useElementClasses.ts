import { MutableRefObject, useEffect } from 'react';
import { Post } from '../../../../types/Entry';
import { useTheme } from '../../../ThemeContext';

export function useElementClasses(
  contentRef: MutableRefObject<HTMLDivElement | null>,
  entry: Post,
) {
  const theme = useTheme();

  useEffect(() => {
    const contentElement = contentRef.current;

    if (globalThis.location && contentElement) {
      [
        ['a', theme.anchor],
        ['h3', theme.h3],
        ['img', theme.image],
        ['li', theme.li],
        ['p', theme.paragraph],
        ['picture', theme.picture],
        ['strong', theme.strong],
        ['time', theme.time],
        ['ul', theme.ul],
      ].forEach(([query, className]) => {
        contentElement.querySelectorAll(query).forEach((element) => {
          element.classList.add(className);
        });
      });
    }
  }, [contentRef, entry.content, theme]);
}
