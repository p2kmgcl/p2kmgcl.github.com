import { getSnippetList } from '../../utils/getSnippetList';
import { Snippet } from '../../types/Snippet';
import pkg from '../../package.json';
import Meta from '../../components/Meta';
import { Header, Section } from '../../components/HTMLElements';
import { MainTitle } from '../../components/MainTitle';
import { useTheme } from '../../styles/ThemeContext';
import { SnippetList } from '../../components/SnippetList';

type Props = {
  snippetList: Snippet[];
};

export default function TeseraEntry({ snippetList }: Props) {
  const theme = useTheme();

  return (
    <Section className={theme.snippetIndexPage}>
      <Meta title={pkg.config.snippetListName} />
      <Header>
        <MainTitle>{pkg.config.snippetListName}</MainTitle>
      </Header>
      <SnippetList snippetList={snippetList} />
    </Section>
  );
}

export async function getStaticProps(): Promise<{ props: Props }> {
  return {
    props: {
      snippetList: getSnippetList(),
    },
  };
}
