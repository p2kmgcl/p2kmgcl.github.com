import { FC } from 'react';
import { Anchor } from './Anchor';
import { useTheme } from '../styles/ThemeContext';
import { classNames } from '../utils/classNames';
import pkg from '../package.json';
import { Snippet } from '../types/Snippet';

export const SnippetList: FC<{ snippetList: Snippet[] }> = ({
  snippetList,
}) => {
  const theme = useTheme();

  return (
    <nav className={classNames(theme.snippetList)}>
      {snippetList.map((snippet) => {
        const path = snippet.path.join('/');

        return (
          <Anchor
            key={path}
            href={`/${pkg.config.snippetListSlug}/${pkg.config.snippetEntrySlug}/${path}`}
          >
            {path}
          </Anchor>
        );
      })}
    </nav>
  );
};
