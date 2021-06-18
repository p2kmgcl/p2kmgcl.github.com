import { useTheme } from '../../styles/ThemeContext';
import Meta from '../../components/Meta';
import { getEntryList } from '../../utils/getEntryList';
import { Entry } from '../../types/Entry';
import { getTagList } from '../../utils/getTagList';
import { TagList } from '../../components/TagList';
import { EntryList } from '../../components/EntryList';
import { Header, Section } from '../../components/HTMLElements';
import { MainTitle } from '../../components/MainTitle';
import pkg from '../../package.json';

type Props = {
  tagList: string[];
  entryList: Entry[];
};

export default function Tesera({ tagList, entryList }: Props) {
  const theme = useTheme();

  return (
    <Section className={theme.teseraIndexPage}>
      <Meta title={pkg.config.blogName} />
      <Header>
        <MainTitle>{pkg.config.blogName}</MainTitle>
        <TagList tags={tagList} />
      </Header>
      <EntryList entryList={entryList} />
    </Section>
  );
}

export async function getStaticProps(): Promise<{ props: Props }> {
  return {
    props: {
      entryList: getEntryList(),
      tagList: getTagList(),
    },
  };
}
