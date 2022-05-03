import Head from 'next/head';
import { Article, Paragraph } from '../../components/HTMLElements';
import { StaticProps } from '../../utils/getStaticProps';

export { getStaticProps } from '../../utils/getStaticProps';

const ROUTES = {
  'liferay-fragments':
    'https://github.com/p2kmgcl/testing-fragments/blob/master/docs/react-fragments-and-widgets-slides.pdf',
};

type Paths = {
  params: {
    label: string;
    url: string;
  };
};

export default function Redirect({
  params: { label, url },
}: Paths & StaticProps) {
  return (
    <>
      <Head>
        <meta httpEquiv="refresh" content={`0;URL='${url}'`} />
      </Head>
      <Article>
        <Paragraph>Redirecting to &quot;{label}&quot;...</Paragraph>
      </Article>
    </>
  );
}

export function getStaticPaths(): {
  paths: Paths[];
  fallback: false;
} {
  return {
    paths: Object.entries(ROUTES).map(([label, url]) => ({
      params: { id: label, label, url },
    })),
    fallback: false,
  };
}

Redirect.displayName = 'Redirect';
Redirect.rawContent = true;
