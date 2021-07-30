import { FC } from 'react';
import { Entry } from '../types/Entry';
import { Anchor } from './Anchor';
import { Emoji } from './Emoji';
import { Time } from './Time';
import { useTheme } from '../styles/ThemeContext';
import { Article, Header, Paragraph, H3 } from './HTMLElements';
import { classNames } from '../utils/classNames';
import pkg from '../package.json';

const EntryListItem: FC<{ entry: Entry }> = ({ entry }) => {
  const theme = useTheme();
  const url = `/${pkg.config.blogSlug}/${pkg.config.blogEntrySlug}/${entry.slug}`;

  return (
    <Article className={classNames(theme.entryListItem)}>
      <Header>
        <H3>
          <Anchor href={url} lang={entry.language}>
            <Emoji>{entry.emoji}</Emoji>
            <span>{entry.title}</span>
          </Anchor>
        </H3>
        <Time dateTime={entry.date} />
      </Header>
      <Paragraph lang={entry.language}>
        {entry.summary}{' '}
        <Anchor href={url} lang="en">
          <Emoji>➡️</Emoji>Continue reading{' '}
          <span className="sr-only">&quot;{entry.title}&quot;</span>
        </Anchor>
      </Paragraph>
    </Article>
  );
};

export const EntryList: FC<{ entryList: Entry[] }> = ({ entryList }) => {
  const theme = useTheme();

  return (
    <div className={classNames(theme.entryList)}>
      {entryList.map((entry) => (
        <EntryListItem key={entry.slug} entry={entry} />
      ))}
    </div>
  );
};
