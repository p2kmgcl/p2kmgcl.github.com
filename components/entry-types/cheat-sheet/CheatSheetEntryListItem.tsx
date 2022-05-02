import { CheatSheet } from '../../../types/Entry';
import { Anchor } from '../../Anchor';
import { Emoji } from '../../Emoji';
import { Article, H3, Header } from '../../HTMLElements';
import { useTheme } from '../../ThemeContext';
import { Time } from '../../Time';

export default function CheatSheetEntryListItem({
  entry,
}: {
  entry: CheatSheet;
}) {
  return (
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
  );
}
