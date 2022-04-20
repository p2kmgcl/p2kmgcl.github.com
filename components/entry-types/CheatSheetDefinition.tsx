import type { CheatSheet, EntryDefinition } from '../../types/Entry';
import { getProperty, getString, getValue } from '../../utils/get';
import { Anchor } from '../Anchor';
import { Emoji } from '../Emoji';
import { Article, H2, H3, Header } from '../HTMLElements';
import { BaseEntryDefinition } from './BaseEntryDefinition';
import marked from 'marked';
import { useTheme } from '../ThemeContext';
import { classNames } from '../../utils/classNames';
import { Time } from '../Time';

export const CheatSheetDefinition: EntryDefinition<CheatSheet> = {
  parse(slug, data, content) {
    return {
      ...BaseEntryDefinition.parse(slug, data, content),
      content: marked(getString(content), { gfm: true }),
      type: getProperty(data, 'type', getValue, 'cheat-sheet' as const),
    };
  },

  EntryListItem: ({ entry }) => (
    <Article className={useTheme().entryListItem}>
      <Header>
        <H3>
          <Anchor href={entry.url} lang={entry.language}>
            <Emoji>{entry.emoji}</Emoji> <span>{entry.title}</span>
          </Anchor>
        </H3>
        <Time dateTime={entry.date} />
      </Header>
    </Article>
  ),

  Entry: ({ entry }) => {
    const theme = useTheme();

    return (
      <Article>
        <Header>
          <H2 lang={entry.language}>{entry.title}</H2>
        </Header>

        <div
          lang={entry.language}
          className={classNames('tesera-entry-content', theme.entryContent)}
          dangerouslySetInnerHTML={{ __html: entry.content }}
        />
      </Article>
    );
  },
};
