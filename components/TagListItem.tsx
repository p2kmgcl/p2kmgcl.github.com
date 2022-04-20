import type { FC } from 'react';
import { Anchor } from './Anchor';
import pkg from '../package.json';
import { useTheme } from './ThemeContext';
import { Emoji } from './Emoji';

const tags: Record<string, { emoji: string; label: string }> = {
  post: {
    emoji: '📘',
    label: 'Posts',
  },
  snippet: {
    emoji: '🧑‍💻',
    label: 'Snippets',
  },
  project: {
    emoji: '🧑‍🎓',
    label: 'Projects',
  },
  talk: {
    emoji: '🎙️',
    label: 'Talks',
  },
};

export const TagListItem: FC<{ tag: string; renderAsLink?: boolean }> = ({
  tag,
  renderAsLink = true,
}) => {
  const { label, emoji } = tags[tag] || { label: tag, emoji: '' };
  const theme = useTheme();

  return renderAsLink ? (
    <Anchor
      aria-label={`Entries with ${pkg.config.blogTagSeparator}${tag} tag`}
      className={theme.tagListItem}
      href={`/${pkg.config.blogSlug}/${pkg.config.blogTagSlug}/${tag}`}
    >
      {emoji ? <Emoji>{emoji}</Emoji> : null}
      {label}
    </Anchor>
  ) : (
    <span className={theme.tagListItem}>
      {emoji ? <Emoji>{emoji}</Emoji> : null}
      {label}
    </span>
  );
};
