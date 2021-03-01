import { useTheme } from '../../styles/ThemeContext';
import Meta from '../../components/Meta';
import { getEntryList } from '../../utils/getEntryList';
import { Entry } from '../../types/Entry';
import { getTagList } from '../../utils/getTagList';
import { TagList } from '../../components/TagList';
import { EntryList } from '../../components/EntryList';
import { Header, Section } from '../../components/HTMLElements';
import { MainTitle } from '../../components/MainTitle';

type Props = {
  tagList: string[];
  entryList: Entry[];
};

export default function Tesera({ tagList, entryList }: Props) {
  const theme = useTheme();

  return (
    <Section className={theme.teseraIndexPage}>
      <Meta title="Tesera" />
      <Header>
        <MainTitle>Tesera</MainTitle>
        <TagList tags={tagList} />
      </Header>
      <EntryList entryList={entryList} />
    </Section>
  );
}

export async function getStaticProps({ params }): Promise<{ props: Props }> {
  return {
    props: {
      entryList: getEntryList(),
      tagList: getTagList(),
    },
  };
}
