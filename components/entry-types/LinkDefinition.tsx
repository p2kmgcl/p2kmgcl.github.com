import type { EntryDefinition, Link } from '../../types/Entry';
import { getProperty, getString, getValue } from '../../utils/get';
import { Anchor } from '../Anchor';
import { Emoji } from '../Emoji';
import { Article, H3, Header, Paragraph } from '../HTMLElements';
import { useTheme } from '../ThemeContext';
import { Time } from '../Time';
import { BaseEntryDefinition } from './BaseEntryDefinition';

export const LinkDefinition: EntryDefinition<Link> = {
  parse(slug, data, content) {
    return {
      ...BaseEntryDefinition.parse(slug, data, content),
      type: getProperty(data, 'type', getValue, 'link' as const),
      origin: getProperty(data, 'origin', getString),
      url: getProperty(data, 'origin', getString),
    };
  },

  EntryListItem: ({ entry }) => (
    <Article className={useTheme().entryListItem}>
      <Header>
        <H3>
          <Anchor
            href={entry.origin}
            lang={entry.language}
            rel="noopener noreferrer"
          >
            <Emoji>{entry.emoji}</Emoji> <span>{entry.title}</span>
          </Anchor>
        </H3>
        <Time dateTime={entry.date} />
      </Header>
      <Paragraph lang={entry.language}>{entry.summary}</Paragraph>
    </Article>
  ),
};
