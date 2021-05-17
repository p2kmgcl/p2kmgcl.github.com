import { useTheme } from '../styles/ThemeContext';
import { Anchor } from '../components/Anchor';
import { Emoji } from '../components/Emoji';
import Meta from '../components/Meta';
import {
  Article,
  Heading,
  Paragraph,
  Section,
} from '../components/HTMLElements';
import { FC } from 'react';
import { MainTitle } from '../components/MainTitle';

const Link: FC<{
  emoji: string;
  title: string;
  href: string;
  description: string;
}> = ({ emoji, title, href, description }) => (
  <Article>
    <Heading>
      <Anchor href={href}>
        <Emoji>{emoji}</Emoji>
        {title}
      </Anchor>
    </Heading>
    <Paragraph>{description}</Paragraph>
  </Article>
);

export default function Links() {
  const theme = useTheme();

  return (
    <Section className={theme.linksPage}>
      <Meta title="Links" />

      <Section>
        <MainTitle>Aside projects</MainTitle>

        <Link
          emoji="📺"
          title="Twitch channel"
          href="https://twitch.tv/p2kmgcl"
          description="Videos about software development, mostly about FrontEnd, but also learning new programming languages and other interesting topics."
        />

        <Link
          emoji="🎩"
          title="Seniore"
          href="https://www.npmjs.com/package/seniore"
          description="NodeJS based CLI that manages my regular GitHub and Jira workflow with small and opinionated scripts."
        />

        <Link
          emoji="👋"
          title="Holi"
          href="https://chrome.google.com/webstore/detail/jabgddbkjbekadednbljlbhhabiidndj"
          description="Chrome extension that overrides the new tab page allowing taking notes with some syntax sugar and seeing a minimal bookmark list."
        />
      </Section>

      <Section>
        <MainTitle>Talks</MainTitle>

        <Link
          emoji="🎭"
          title="Empowering Business Users to Create Sites and Pages With Full Autonomy"
          href="https://www.youtube.com/watch?v=1LFUJH_5PJ0"
          description="Corporate presentation about new features that I was working on during 2019 in Liferay."
        />

        <Link
          emoji="🎞️"
          title="60 Frames of Animations (Spanish talk)"
          href="https://www.youtube.com/watch?v=UqEVy4Sa7WI"
          description="Brief exploration about why animations are important in an application and a live coding of how we can optimize an existing animation with CSS and JS."
        />

        <Link
          emoji="👨‍💻"
          title="Hands-on experience with Modern Site Building (workshop)"
          href="https://www.youtube.com/watch?v=KpiQ5R8KruI"
          description="Corporate workshop speaking about 'Fragments', a new Liferay feature we published on 7.1 release."
        />
      </Section>
    </Section>
  );
}
