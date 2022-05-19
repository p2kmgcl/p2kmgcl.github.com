import Head from 'next/head';
import { Anchor } from '../../components/Anchor';
import { Article, Paragraph } from '../../components/HTMLElements';
import { StaticProps } from '../../utils/getStaticProps';

export { getStaticProps } from '../../utils/getStaticProps';

const ROUTES = {
  'liferay-fragments':
    'https://github.com/p2kmgcl/testing-fragments/blob/master/docs/react-fragments-and-widgets-slides.pdf',
} as const;

type Id = keyof typeof ROUTES;

type Paths = {
  params: {
    id: Id;
  };
};

export default function Redirect({ params: { id } }: Paths & StaticProps) {
  return (
    <>
      <Head>
        <meta httpEquiv="refresh" content={`0;URL='${ROUTES[id]}'`} />
      </Head>
      <Article>
        <Paragraph>
          Redirecting to <Anchor href={ROUTES[id]}>{id}</Anchor>...
        </Paragraph>
      </Article>
    </>
  );
}

export function getStaticPaths(): {
  paths: Paths[];
  fallback: false;
} {
  return {
    paths: (Object.keys(ROUTES) as Id[]).map((id) => ({
      params: { id },
    })),
    fallback: false,
  };
}

Redirect.displayName = 'Redirect';
Redirect.rawContent = true;