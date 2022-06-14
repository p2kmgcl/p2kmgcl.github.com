import Meta from '../../components/Meta';
import { EntryList } from '../../components/EntryList';
import { H2, Header, Section } from '../../components/HTMLElements';
import pkg from '../../package.json';
import { GlobalPageProps } from '../../types/GlobalPageProps';
import { getTagList } from '../../utils/getTagList';
import { Entry } from '../../types/Entry';
import { getEntryList } from '../../utils/getEntryList';

interface PageProps {
  entryList: Entry[];
}

export default function TeseraIndex({ entryList }: PageProps) {
  return (
    <Section>
      <Meta title={pkg.config.blogName} />
      <Header>
        <H2>{pkg.config.blogName}</H2>
      </Header>
      <EntryList entryList={entryList} />
    </Section>
  );
}

TeseraIndex.displayName = 'TeseraIndex';

export async function getStaticProps(): Promise<{
  props: GlobalPageProps & PageProps;
}> {
  return {
    props: {
      entryList: getEntryList().map((entry) => ({ ...entry, content: '' })),
      tagList: getTagList(getEntryList()),
    },
  };
}
