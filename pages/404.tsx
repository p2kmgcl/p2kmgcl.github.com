import Meta from '../components/Meta';
import { Anchor } from '../components/Anchor';
import { Article, H2, Paragraph } from '../components/HTMLElements';
import { getEntryList } from '../utils/getEntryList';
import { getTagList } from '../utils/getTagList';
import { GlobalPageProps } from '../types/GlobalPageProps';

export default function NotFound() {
  return (
    <Article>
      <Meta
        title="Page Not Found"
        description="The requested page was not found"
      />

      <H2>Page not found</H2>
      <Paragraph>The requested page was not found.</Paragraph>

      <Paragraph>
        <Anchor href="/">Go to main site</Anchor>.
      </Paragraph>
    </Article>
  );
}

NotFound.displayName = 'NotFound';

export async function getStaticProps(): Promise<{ props: GlobalPageProps }> {
  return {
    props: {
      tagList: getTagList(getEntryList()),
    },
  };
}
