import Meta from '../../components/Meta';
import { EntryList } from '../../components/EntryList';
import { H2, Header, Section } from '../../components/HTMLElements';
import pkg from '../../package.json';
import type { StaticProps } from '../../utils/getStaticProps';
export { getStaticProps } from '../../utils/getStaticProps';

export default function TeseraIndex({ entryList }: StaticProps) {
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
