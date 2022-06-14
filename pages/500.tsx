import Meta from '../components/Meta';
import { Anchor } from '../components/Anchor';
import { Article, H2, Paragraph } from '../components/HTMLElements';
import { GlobalPageProps } from '../types/GlobalPageProps';
import { getEntryList } from '../utils/getEntryList';
import { getTagList } from '../utils/getTagList';

export default function ServerError() {
  return (
    <Article>
      <Meta title="Server Error" description="Some unknown error ocurred" />

      <H2>Server Error</H2>

      <Paragraph>
        Some unknown error ocurred. Please try again later or get back to the
        home page.
      </Paragraph>

      <Paragraph>
        <Anchor href="/">Go to main site</Anchor>.
      </Paragraph>
    </Article>
  );
}

ServerError.displayName = 'ServerError';

export async function getStaticProps(): Promise<{ props: GlobalPageProps }> {
  return {
    props: {
      tagList: getTagList(getEntryList()),
    },
  };
}
