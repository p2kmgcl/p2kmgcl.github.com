import Head from 'next/head';
import { Anchor } from '../../../components/Anchor';
import { Article, Paragraph } from '../../../components/HTMLElements';
import { Link } from '../../../types/Link';
import { getLink } from '../../../utils/getLink';
import { getLinkList } from '../../../utils/getLinkList';

type Params = {
  params: {
    slug: string;
  };
};

type Props = {
  link: Link;
};

export default function TeseraLink({ link }: Props) {
  return (
    <Article>
      <Head>
        <meta httpEquiv="refresh" content={`0; url=${link.url}`} />
      </Head>

      <Paragraph>
        Redirecting to{' '}
        <Anchor href={link.url} lang={link.language}>
          {link.title}
        </Anchor>
        .
      </Paragraph>

      <Paragraph lang={link.language}>{link.summary}</Paragraph>
    </Article>
  );
}

TeseraLink.rawContent = true;

export async function getStaticPaths(): Promise<{
  paths: Params[];
  fallback: false;
}> {
  return {
    paths: getLinkList().map((teseraLink) => {
      return {
        params: {
          slug: teseraLink.slug,
        },
      };
    }),
    fallback: false,
  };
}

export async function getStaticProps({
  params,
}: Params): Promise<{ props: Props }> {
  return {
    props: {
      link: getLink(params.slug),
    },
  };
}
