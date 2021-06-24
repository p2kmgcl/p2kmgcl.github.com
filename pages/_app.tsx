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
import { FC, useEffect } from 'react';

interface AppProps {
  Component: FC;
  pageProps: Record<string, any>;
}

const AppContent: FC<AppProps> = ({ Component, pageProps }) => {
  const theme = useTheme();
  const tagList: string[] = pageProps.tagList || [];

  useKonami(useChangeTheme());

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.requestAnimationFrame(() => {
        document.body.style.opacity = '';
      });
    }
  }, []);

  return (
    <>
      <Head>
        <title>{pkg.author.name}</title>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>

        {[
          { tag: 'all', title: pkg.config.blogName },
          ...tagList.map((tag) => ({
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
        <Anchor href="/">{pkg.name}</Anchor>

        <span className={theme.mainMenuNavigation}>
          <Anchor href={`/${pkg.config.blogSlug}`}>
            <Emoji>📓</Emoji>
            {pkg.config.blogName}
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
        <Heading>{pkg.author.name}</Heading>

        <nav className={theme.footerNavigation}>
          <Anchor href={`mailto:${pkg.author.email}`}>
            <Emoji>📮</Emoji>
            {pkg.author.email}
          </Anchor>
        </nav>

        <nav className={theme.footerNavigation}>
          <Anchor
            href={`${pkg.repository.url}/blob/${pkg.config.mainBranch}/${pkg.config.licensePath}`}
          >
            <Emoji>🤖</Emoji>
            This is all yours, just remember my name
          </Anchor>
        </nav>

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
          <Anchor
            href="https://twitch.tv/p2kmgcl"
            title={`${pkg.author.name}'s Twitch channel`}
          >
            <Emoji>📺</Emoji>Twitch
          </Anchor>
          <Anchor
            href="https://www.youtube.com/p2kmgcl"
            title={`${pkg.author.name}'s YouTube channel`}
          >
            <Emoji>📹</Emoji>YouTube
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
