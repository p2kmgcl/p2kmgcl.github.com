import { Link } from '../../../types/Entry';
import { Anchor } from '../../Anchor';
import { Emoji } from '../../Emoji';
import { Article, H3, Header, Paragraph } from '../../HTMLElements';
import { useTheme } from '../../ThemeContext';
import { Time } from '../../Time';

export default function LinkEntryListItem({ entry }: { entry: Link }) {
  return (
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
  );
}
