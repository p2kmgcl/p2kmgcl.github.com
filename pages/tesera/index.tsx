import { useTheme } from '../../styles/ThemeContext';
import Meta from '../../components/Meta';
import { getEntryList } from '../../utils/getEntryList';
import { Entry } from '../../types/Entry';
import { getTagList } from '../../utils/getTagList';
import { TagList } from '../../components/TagList';
import { EntryOrLinkList } from '../../components/EntryOrLinkList';
import { H2, Header, Section } from '../../components/HTMLElements';
import pkg from '../../package.json';
import { getLinkList } from '../../utils/getLinkList';
import { Link } from '../../types/Link';

type Props = {
  tagList: string[];
  entryOrLinkList: (Entry | Link)[];
};

export default function Tesera({ tagList, entryOrLinkList }: Props) {
  const theme = useTheme();

  return (
    <Section className={theme.teseraIndexPage}>
      <Meta title={pkg.config.blogName} />
      <Header>
        <H2>{pkg.config.blogName}</H2>
        <TagList tags={tagList} />
      </Header>
      <EntryOrLinkList entryOrLinkList={entryOrLinkList} />
    </Section>
  );
}

export async function getStaticProps(): Promise<{ props: Props }> {
  return {
    props: {
      entryOrLinkList: [...getEntryList(), ...getLinkList()].sort(
        (a, b) => b.date - a.date,
      ),
      tagList: getTagList(),
    },
  };
}
