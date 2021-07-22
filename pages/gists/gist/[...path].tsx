import { getSnippetList } from '../../../utils/getSnippetList';
import { Snippet } from '../../../types/Snippet';
import { readFileSync } from 'fs';
import pkg from '../../../package.json';
import Meta from '../../../components/Meta';
import { Article, Header } from '../../../components/HTMLElements';
import { MainTitle } from '../../../components/MainTitle';
import { useEffect, useMemo, useRef } from 'react';
import { useTheme } from '../../../styles/ThemeContext';
import { classNames } from '../../../utils/classNames';
import { loadPrism } from '../../../utils/loadPrism';
import { extname } from 'path';

type Params = {
  params: {
    path: string[];
  };
};

type Props = {
  snippet: Snippet;
  extension: string;
};

export default function SnippetEntry({ snippet, extension }: Props) {
  const contentRef = useRef<HTMLPreElement | null>(null);
  const path = useMemo(() => snippet.path.join('/'), [snippet.path]);
  const theme = useTheme();

  useEffect(() => {
    if (process.browser && contentRef.current) {
      loadPrism().then((prismModule) => {
        prismModule.default.highlightElement(contentRef.current);
      });
    }
  }, []);

  return (
    <Article className={classNames(theme.snippetEntryPage)}>
      <Header>
        <Meta title={path} />
        <MainTitle>{path}</MainTitle>
      </Header>

      <div className={classNames(theme.snippetContent)}>
        <pre className={`language-${extension}`} ref={contentRef}>
          <code>{snippet.content}</code>
        </pre>
      </div>
    </Article>
  );
}

export async function getStaticPaths(): Promise<{
  paths: Params[];
  fallback: false;
}> {
  return {
    paths: getSnippetList().map((snippet) => {
      return {
        params: {
          path: snippet.path,
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
      snippet: {
        path: params.path,
        content: readFileSync(
          `./public/${pkg.config.snippetListSlug}/${params.path.join('/')}`,
          'utf-8',
        ),
      },
      extension: extname(params.path.join('\n')).substr(1),
    },
  };
}
