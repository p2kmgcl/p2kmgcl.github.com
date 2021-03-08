import Head from 'next/head';
import {
  ThemeContextProvider,
  useChangeTheme,
  useTheme,
} from '../styles/ThemeContext';
import { Emoji } from '../components/Emoji';
import { Anchor } from '../components/Anchor';
import { Heading } from '../components/HTMLElements';
import { useKonami } from '../utils/useKonami';
import pkg from '../package.json';
import { FC } from 'react';

interface AppProps {
  Component: FC;
  pageProps: Record<string, any>;
}

const AppContent: FC<AppProps> = ({ Component, pageProps }) => {
  const theme = useTheme();
  const tagList: string[] = pageProps.tagList || [];

  useKonami(useChangeTheme());

  return (
    <>
      <Head>
        <title>Pablo Molina</title>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {[
          { tag: 'all', title: 'Tesera' },
          ...tagList.map((tag) => ({
            tag: tag.toLowerCase().split(' ').join('-'),
            title: `Tesera#${tag}`,
          })),
        ].map(({ tag, title }) => (
          <link
            key={tag}
            rel="alternate"
            type="application/rss+xml"
            title={title}
            href={`/feed-${tag}.xml`}
          />
        ))}

        {[32, 192, 512].map((size) => (
          <link
            key={size}
            rel="icon"
            type="image/png"
            sizes={`${size}x${size}`}
            href={`/favicon/favicon-${size}.png`}
          />
        ))}
      </Head>

      <nav className={theme.mainMenu}>
        <Anchor href="/">pablomolina.me</Anchor>

        <span className={theme.mainMenuNavigation}>
          <Anchor href="/tesera">
            <Emoji>📓</Emoji>Tesera
          </Anchor>
          <Anchor href="/links">
            <Emoji>⚓</Emoji>Links
          </Anchor>
        </span>
      </nav>

      <div className={theme.content}>
        <Component {...pageProps} />
      </div>

      <footer className={theme.footer}>
        <Heading>Pablo Molina</Heading>

        <Anchor href={`mailto:${pkg.author.email}`}>
          <Emoji>📮</Emoji>
          {pkg.author.email}
        </Anchor>

        <nav className={theme.footerNavigation}>
          <Anchor
            href="https://github.com/p2kmgcl"
            title={`${pkg.author.name}'s Github profile`}
          >
            <Emoji>🐱</Emoji>Github
          </Anchor>
          <Anchor
            href="https://mobile.twitter.com/p2kmgcl"
            title={`${pkg.author.name}'s Twitter profile`}
          >
            <Emoji>🐦</Emoji>Twitter
          </Anchor>
          <Anchor
            href="https://www.linkedin.com/in/p2kmgcl/"
            title={`${pkg.author.name}'s LinkedIn profile`}
          >
            <Emoji>👔</Emoji>LinkedIn
          </Anchor>
        </nav>
      </footer>
    </>
  );
};

export default function App(props: AppProps) {
  return (
    <ThemeContextProvider>
      <AppContent {...props} />
    </ThemeContextProvider>
  );
}
