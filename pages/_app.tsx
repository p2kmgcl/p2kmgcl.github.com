import '../styles/reset.scss';
import '../styles/entry-content.scss';
import Head from 'next/head';
import { Emoji } from '../components/Emoji';
import { Anchor } from '../components/Anchor';
import {
  Footer,
  H1,
  H2,
  Header,
  Nav,
  Section,
  Ul,
  Li,
} from '../components/HTMLElements';
import pkg from '../package.json';
import { FC } from 'react';
import { Entry } from '../types/Entry';
import { Router } from 'next/router';
import { ThemeContextProvider, useTheme } from '../components/ThemeContext';
import { TagListItem } from '../components/TagListItem';
import TeseraEntry from './tesera/entry/[slug]';
import {
  APPLY_DARK_MODE_SCRIPT,
  DarkModeButton,
} from '../components/DarkModeButton';
import { ShuffleThemeButton } from '../components/ShuffleThemeButton';

interface AppProps {
  Component: FC<{
    entryList: Entry[];
    tagList: string[];
    params: Record<string, string>;
  }> & {
    rawContent?: boolean;
  };
  pageProps: {
    entryList: Entry[];
    tagList: string[];
  };
  router: Router;
}

const AppContent: FC<AppProps> = ({ Component, pageProps, router }) => {
  const rawContent = Boolean(Component.rawContent);
  const theme = useTheme();

  let mainWrapperProps: Record<string, any> = {
    className: theme.mainWrapper,
    'data-component': Component.displayName,

    ...Object.fromEntries(
      Object.entries(router.query).map(([key, value]) => [
        `data-query-${key}`,
        value,
      ]),
    ),
  };

  const entry =
    Component === TeseraEntry
      ? pageProps.entryList.find((entry) => entry.slug === router.query.slug)
      : null;

  if (entry) {
    mainWrapperProps = {
      ...mainWrapperProps,
      'data-entry-type': entry.type,
      ...Object.fromEntries(
        entry.tags
          .filter((tag) => tag !== entry.type)
          .map((tag) => [`data-entry-tag-${tag}`, '']),
      ),
    };
  }

  return (
    <div {...(rawContent ? {} : mainWrapperProps)}>
      <Head>
        {rawContent ? null : (
          <title>
            {entry ? `${entry.title} - ` : ''}
            {pkg.author.name}
          </title>
        )}

        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:site_name" content={pkg.author.name} />

        {!rawContent
          ? [
              { tag: 'all', title: pkg.config.blogName },
              ...(pageProps.tagList || []).map((tag) => ({
                tag: tag.toLowerCase().split(' ').join('-'),
                title: `${pkg.config.blogName}${pkg.config.blogTagSeparator}${tag}`,
              })),
            ].map(({ tag, title }) => (
              <link
                key={tag}
                rel="alternate"
                type="application/rss+xml"
                title={title}
                href={`/${pkg.config.feedPrefix}${tag}.xml`}
              />
            ))
          : null}

        {[32, 192, 512].map((size) => (
          <link
            key={size}
            rel="icon"
            type="image/png"
            sizes={`${size}x${size}`}
            href={`/favicon/favicon-${size}.png`}
          />
        ))}

        {!rawContent ? (
          <script
            dangerouslySetInnerHTML={{ __html: APPLY_DARK_MODE_SCRIPT }}
          />
        ) : null}
      </Head>

      {!rawContent ? (
        <Header className={theme.mainHeader}>
          <H1>{pkg.author.name}</H1>

          <Nav aria-label="Main menu">
            <Ul>
              <Li aria-label="Home">
                <Anchor href="/">
                  <Emoji>🏠</Emoji> {pkg.name}
                </Anchor>
              </Li>
              {pageProps.tagList?.length ? (
                pageProps.tagList.map((tag) => (
                  <Li key={tag}>
                    <TagListItem tag={tag} />
                  </Li>
                ))
              ) : (
                <Li>
                  <Anchor href={`/${pkg.config.blogSlug}`}>
                    <Emoji>📓</Emoji> {pkg.config.blogName}
                  </Anchor>
                </Li>
              )}
            </Ul>
          </Nav>

          <Section aria-label="Settings menu" role="group">
            <DarkModeButton />
            <ShuffleThemeButton />
          </Section>
        </Header>
      ) : null}

      <div className={rawContent ? '' : theme.mainContent}>
        <Component params={router.query as any} {...pageProps} />
      </div>

      {!rawContent ? (
        <Footer className={theme.mainFooter}>
          <H2 aria-label="Related links and social media">{pkg.author.name}</H2>

          <Nav>
            <Ul>
              <Li aria-label="Email">
                <Anchor href={`mailto:${pkg.author.email}`}>
                  <Emoji>📮</Emoji> {pkg.author.email}
                </Anchor>
              </Li>

              <Li aria-label="License">
                <Anchor
                  href={`${pkg.repository.url}/blob/${pkg.config.mainBranch}/${pkg.config.licensePath}`}
                >
                  <Emoji>🤖</Emoji> This is all yours, just remember my name
                </Anchor>
              </Li>

              <Li>
                <Anchor
                  href="https://github.com/p2kmgcl"
                  title={`${pkg.author.name}'s Github profile`}
                >
                  <Emoji>🐱</Emoji> Github
                </Anchor>
              </Li>
              <Li>
                <Anchor
                  href="https://mobile.twitter.com/p2kmgcl"
                  title={`${pkg.author.name}'s Twitter profile`}
                >
                  <Emoji>🐦</Emoji> Twitter
                </Anchor>
              </Li>
              <Li>
                <Anchor
                  href="https://www.linkedin.com/in/p2kmgcl/"
                  title={`${pkg.author.name}'s LinkedIn profile`}
                >
                  <Emoji>👔</Emoji> LinkedIn
                </Anchor>
              </Li>
              <Li>
                <Anchor
                  href="https://twitch.tv/p2kmgcl"
                  title={`${pkg.author.name}'s Twitch channel`}
                >
                  <Emoji>📺</Emoji> Twitch
                </Anchor>
              </Li>
              <Li>
                <Anchor
                  href="https://www.youtube.com/p2kmgcl"
                  title={`${pkg.author.name}'s YouTube channel`}
                >
                  <Emoji>📹</Emoji> YouTube
                </Anchor>
              </Li>
            </Ul>
          </Nav>
        </Footer>
      ) : null}
    </div>
  );
};

export default function App(props: AppProps) {
  return (
    <ThemeContextProvider>
      <AppContent {...props} />
    </ThemeContextProvider>
  );
}
