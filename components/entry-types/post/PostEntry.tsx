import { useRef } from 'react';
import { Anchor } from '../../Anchor';
import { Emoji } from '../../Emoji';
import {
  Article,
  Footer,
  H2,
  Header,
  Nav,
  Paragraph,
  Section,
} from '../../HTMLElements';
import { Time } from '../../Time';
import Meta from '../../Meta';
import Head from 'next/head';
import { TagList } from '../../TagList';
import { useTheme } from '../../ThemeContext';
import { classNames } from '../../../utils/classNames';
import { Post } from '../../../types/Entry';
import { useElementClasses } from './hooks/useElementClasses';
import { useMetadata } from './hooks/useMetadata';
import { useCover } from './hooks/useCover';
import { useFooterLinks } from './hooks/useFooterLinks';
import { useCodeHighlight } from './hooks/useCodeHighlight';
import { useCodePreview } from './hooks/useCodePreview';

export default function PostEntry({ entry }: { entry: Post }) {
  const contentRef = useRef<HTMLDivElement | null>(null);
  const theme = useTheme();

  const cover = useCover(entry);
  const [metaTags, metaScript] = useMetadata(entry);
  const { twitterLink, linkedInLink, githubLink } = useFooterLinks(entry);

  useElementClasses(contentRef, entry);
  useCodeHighlight(contentRef);
  useCodePreview(contentRef, entry);

  return (
    <Article>
      <Meta title={entry.title} description={entry.summary || ''} />

      <Head>
        {metaTags.map(([property, content]) => (
          <meta
            key={`${property}-${content}`}
            property={property}
            content={content}
          />
        ))}

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: metaScript }}
        />

        <link rel="canonical" href={entry.url} />
      </Head>

      <Header>
        <H2 lang={entry.language}>{entry.title}</H2>

        <Time dateTime={entry.date} />

        <Section aria-label="Mood" className={theme.entryMood}>
          <Paragraph lang={entry.language}>
            <Emoji>{entry.emoji}</Emoji> <span>{entry.mood}</span>
          </Paragraph>
        </Section>

        <TagList tags={entry.tags} />

        {entry.summary ? (
          <Section aria-label="Summary" className={theme.entrySummary}>
            <Paragraph lang={entry.language}>{entry.summary}</Paragraph>
          </Section>
        ) : null}

        {cover}
      </Header>

      <div
        ref={contentRef}
        lang={entry.language}
        className={classNames('tesera-entry-content', theme.entryContent)}
        dangerouslySetInnerHTML={{ __html: entry.content }}
      />

      <Footer>
        <Nav data-entry-title={entry.title} data-entry-emoji={entry.emoji}>
          <Anchor href={twitterLink} target="_blank">
            <Emoji>🕊️</Emoji> <span>Share on Twitter</span>
          </Anchor>
          <Anchor href={linkedInLink} target="_blank">
            <Emoji>🎩</Emoji> <span>Share on LinkedIn</span>
          </Anchor>
          <Anchor href={githubLink} target="_blank">
            <Emoji>👾</Emoji> <span>View on GitHub</span>
          </Anchor>
        </Nav>
      </Footer>
    </Article>
  );
}
