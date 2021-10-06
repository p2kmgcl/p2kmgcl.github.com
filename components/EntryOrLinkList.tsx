import { FC } from 'react';
import { Entry } from '../types/Entry';
import { Anchor } from './Anchor';
import { Emoji } from './Emoji';
import { Time } from './Time';
import { useTheme } from '../styles/ThemeContext';
import { Article, Header, Paragraph, H3 } from './HTMLElements';
import { classNames } from '../utils/classNames';
import pkg from '../package.json';
import { Link } from '../types/Link';

const EntryOrLinkListItem: FC<{ entryOrLink: Entry | Link }> = ({
  entryOrLink,
}) => {
  const theme = useTheme();

  const url = `/${pkg.config.blogSlug}/${
    'content' in entryOrLink
      ? pkg.config.blogEntrySlug
      : pkg.config.blogLinkSlug
  }/${entryOrLink.slug}`;

  return (
    <Article className={classNames(theme.entryListItem)}>
      <Header>
        <H3>
          <Anchor href={url} lang={entryOrLink.language}>
            <Emoji>{entryOrLink.emoji}</Emoji>
            <span>{entryOrLink.title}</span>
          </Anchor>
        </H3>
        <Time dateTime={entryOrLink.date} />
      </Header>
      <Paragraph lang={entryOrLink.language}>
        {entryOrLink.summary || ''}{' '}
        <Anchor href={url} lang="en">
          <Emoji>➡️</Emoji>Continue reading{' '}
          <span className="sr-only">&quot;{entryOrLink.title}&quot;</span>
        </Anchor>
      </Paragraph>
    </Article>
  );
};

export const EntryOrLinkList: FC<{ entryOrLinkList: (Entry | Link)[] }> = ({
  entryOrLinkList,
}) => {
  const theme = useTheme();

  return (
    <div className={classNames(theme.entryList)}>
      {entryOrLinkList.map((entryOrLink) => (
        <EntryOrLinkListItem key={entryOrLink.slug} entryOrLink={entryOrLink} />
      ))}
    </div>
  );
};
