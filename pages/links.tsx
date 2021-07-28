import { useTheme } from '../styles/ThemeContext';
import { Anchor } from '../components/Anchor';
import { Emoji } from '../components/Emoji';
import Meta from '../components/Meta';
import {
  Article,
  H2,
  H3,
  H4,
  Paragraph,
  Section,
} from '../components/HTMLElements';
import { FC } from 'react';

const Link: FC<{
  emoji: string;
  title: string;
  href: string;
  description: string;
}> = ({ emoji, title, href, description }) => (
  <Article>
    <H4>
      <Anchor href={href}>
        <Emoji>{emoji}</Emoji>
        {title}
      </Anchor>
    </H4>
    <Paragraph>{description}</Paragraph>
  </Article>
);

export default function Links() {
  const theme = useTheme();

  return (
    <Section className={theme.linksPage}>
      <Meta title="Links" />
      <H2>Links</H2>

      <Section>
        <H3>Aside projects</H3>

        <Link
          emoji="🧑‍🏫"
          title="Teach[Tech] (2021-now)"
          href="https://teacht3ch.com/"
          description="Participating in this incredible nonprofit iniciative to teach people how to code using HTML, CSS and JavaScript."
        />

        <Link
          emoji="📺"
          title="Twitch channel (2021-now)"
          href="https://twitch.tv/p2kmgcl"
          description="Videos about software development, mostly about FrontEnd, but also learning new programming languages and other interesting topics."
        />

        <Link
          emoji="🎩"
          title="Seniore (2020-now)"
          href="https://www.npmjs.com/package/seniore"
          description="NodeJS based CLI that manages my regular GitHub and Jira workflow with small and opinionated scripts."
        />

        <Link
          emoji="👋"
          title="Holi (2020-now)"
          href="https://chrome.google.com/webstore/detail/jabgddbkjbekadednbljlbhhabiidndj"
          description="Chrome extension that overrides the new tab page allowing taking notes with some syntax sugar and seeing a minimal bookmark list."
        />
      </Section>

      <Section>
        <H3>Talks</H3>

        <Link
          emoji="🎭"
          title="Empowering Business Users to Create Sites and Pages With Full Autonomy (2019, talk)"
          href="https://www.youtube.com/watch?v=1LFUJH_5PJ0"
          description="Corporate presentation about new features that I was working on during 2019 in Liferay."
        />

        <Link
          emoji="🎞️"
          title="60 Frames of Animations (2019, Spanish talk)"
          href="https://www.youtube.com/watch?v=UqEVy4Sa7WI"
          description="Brief exploration about why animations are important in an application and a live coding of how we can optimize an existing animation with CSS and JS."
        />

        <Link
          emoji="👨‍💻"
          title="Hands-on experience with Modern Site Building (2018, workshop)"
          href="https://www.youtube.com/watch?v=KpiQ5R8KruI"
          description="Corporate workshop speaking about 'Fragments', a new Liferay feature we published on 7.1 release."
        />
      </Section>
    </Section>
  );
}
