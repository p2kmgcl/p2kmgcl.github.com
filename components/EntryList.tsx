import { FC } from 'react';
import { Entry } from '../types/Entry';
import { Anchor } from './Anchor';
import { Emoji } from './Emoji';
import { Time } from './Time';
import { useTheme } from '../styles/ThemeContext';
import { Article, Header, Heading, Paragraph } from './HTMLElements';
import { classNames } from '../utils/classNames';

const EntryListItem: FC<{ entry: Entry }> = ({ entry }) => {
  const theme = useTheme();
  const url = `/tesera/entry/${entry.slug}`;

  return (
    <Article className={classNames(theme.entryListItem)}>
      <Header>
        <Heading>
          <Anchor href={url} lang={entry.language}>
            {entry.title}
          </Anchor>
        </Heading>
        <Time dateTime={entry.date} />
      </Header>
      <Paragraph lang={entry.language}>
        {entry.summary}{' '}
        <Anchor href={url} lang="en">
          <Emoji>➡️</Emoji>Continue reading
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
