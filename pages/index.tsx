import Meta from '../components/Meta';
import {
  Article,
  H2,
  Header,
  Image,
  Paragraph,
  Picture,
  Strong,
} from '../components/HTMLElements';
import { GlobalPageProps } from '../types/GlobalPageProps';
import pkg from '../package.json';
import { getTagList } from '../utils/getTagList';
import { getEntryList } from '../utils/getEntryList';

function flatMap<T, Q>(array: T[], fn: (element: T) => Q[]): Q[] {
  return array.map(fn).reduce((a, b) => a.concat(b), []);
}

const IMAGE_SOURCES = flatMap(['avif', 'webp', 'jpg'], (type) => [
  { type, size: 480, mediaQuery: '(max-width: 480px)' },
  { type, size: 768, mediaQuery: '(min-width: 481px) and (max-width: 768px)' },
  { type, size: 1080, mediaQuery: '(min-width: 769px)' },
]);

export default function Home() {
  return (
    <Article>
      <Meta />

      <Header>
        <H2 aria-label="Home">{pkg.author.name}</H2>
        <Paragraph>{pkg.author.description}</Paragraph>

        <Picture
          style={{
            backgroundSize: 'cover',
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='345' height='448'%3E%3Cpath d='M0 0h346v448H0V0z' fill='%23fbe76c' paint-order='markers fill stroke'/%3E%3Cpath d='M0 196c7-40 14-99 61-109 45-5 53 57 94 56 46 3 48-48 72-73 19-10 41-6 61-12-4 38 0 94 51 89 13 18 4 43 7 64v136c-57 13-119 21-164 61-26 22-54 51-91 40H0V196z' fill='%23060606' fill-opacity='.4'/%3E%3Cpath d='M211 146c48 7 102 19 131 62 9 37-39 48-67 43-39-11-73 25-56 63 17 34 30 79-18 95-23 5-73 65-66 9 1-76-8-153 0-230 7-34 44-52 76-42z' fill='%23cddfe7' fill-opacity='.7' paint-order='markers fill stroke'/%3E%3Cpath d='M214 0l14 62 65-14-10-48h-69z' fill='%23f0db4e'/%3E%3Cpath d='M249 20l6-1 5 22c0 11-14 11-17 6l3-4c5 5 8 2 8-2zM275 22l4-4c-6-7-22 0-15 11 3 3 8 5 10 4 2 0 4 1 5 4 0 4-9 5-11 1l-4 4c8 10 27 0 18-11-3-4-9-3-12-5-6-4 2-9 5-4z'/%3E%3C/svg%3E")`,
          }}
        >
          {IMAGE_SOURCES.map(({ type, size, mediaQuery }) => (
            <source
              key={`${type}-${size}`}
              media={mediaQuery}
              type={`image/${type}`}
              srcSet={`/pablo-molina/pablo-molina-${size}.${
                type === 'jpg' ? type : `jpg.${type}`
              }`}
            />
          ))}

          <Image
            alt="Pablo epically riding a beautiful plastic unicorn while holding the JavaScript logo"
            src="/pablo-molina/pablo-molina-1080.jpg"
            height="1400"
            width="1080"
          />
        </Picture>
      </Header>

      <Paragraph>
        I am a developer who <Strong>loves his job</Strong>, aims for continuous
        learning, and is not afraid of learning from his mistakes. I have
        developed code for native interfaces, mobile interfaces and server-side
        execution but, without the slightest doubt, <Strong>Front-End</Strong>{' '}
        development is my main motivation as professional.
      </Paragraph>

      <Paragraph>
        I am a proficient <Strong>Linux user</Strong>, not only due to the
        comfort it gives to developers but also it&apos;s open and free nature.
        I like to support <Strong>Open Source</Strong> software: I consider it a
        great path for improvement, and a fantastic way to let others grow too.
      </Paragraph>

      <Paragraph>
        Working as part of a team feels the ideal situation for me. Although I
        can evolve fast by my own, I <Strong>prefer to work together</Strong>{' '}
        with great people to learn from, so we can get new skills from each
        other.
      </Paragraph>

      <Paragraph>
        I do <Strong>like clean code</Strong>, well-defined structure, and
        crystal clear documentation. I am <Strong>meticulous</Strong>, and I
        apply this behaviour to my projects: everytime I am able to, I like to
        apply generic solutions, like design patterns, and I put lots of effort
        to make the final product simple, legible and reusable.
      </Paragraph>
    </Article>
  );
}

Home.displayName = 'Home';

export async function getStaticProps(): Promise<{ props: GlobalPageProps }> {
  return {
    props: {
      tagList: getTagList(getEntryList()),
    },
  };
}
