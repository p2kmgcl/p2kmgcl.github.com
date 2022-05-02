import { CheatSheet } from '../../../types/Entry';
import { classNames } from '../../../utils/classNames';
import { Article, H2, Header } from '../../HTMLElements';
import { useTheme } from '../../ThemeContext';

export default function CheatSheetEntry({ entry }: { entry: CheatSheet }) {
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
}
