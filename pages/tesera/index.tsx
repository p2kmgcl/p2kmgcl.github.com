import Meta from '../../components/Meta';
import { TagList } from '../../components/TagList';
import { EntryList } from '../../components/EntryList';
import { H2, Header, Section } from '../../components/HTMLElements';
import pkg from '../../package.json';
import type { StaticProps } from '../../utils/getStaticProps';
import { useTheme } from '../../components/ThemeContext';
export { getStaticProps } from '../../utils/getStaticProps';

export default function Tesera({ tagList, entryList }: StaticProps) {
  return (
    <Section className={useTheme().teseraIndexPage}>
      <Meta title={pkg.config.blogName} />
      <Header>
        <H2>{pkg.config.blogName}</H2>
        <TagList tags={tagList} />
      </Header>
      <EntryList entryList={entryList} />
    </Section>
  );
}
