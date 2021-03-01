import { useTheme } from '../styles/ThemeContext';
import Meta from '../components/Meta';
import { Anchor } from '../components/Anchor';
import { Article, Heading, Paragraph } from '../components/HTMLElements';
import { MainTitle } from '../components/MainTitle';

export default function NotFound() {
  const theme = useTheme();

  return (
    <Article className={theme.notFoundPage}>
      <Meta
        title="Page Not Found"
        description="The requested page was not found"
      />

      <MainTitle>Page not found</MainTitle>
      <Paragraph>The requested page was not found.</Paragraph>

      <Paragraph>
        <Anchor href="/">Go to main site</Anchor>.
      </Paragraph>
    </Article>
  );
}
