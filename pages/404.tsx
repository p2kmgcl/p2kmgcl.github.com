import { useTheme } from '../styles/ThemeContext';
import Meta from '../components/Meta';
import { Anchor } from '../components/Anchor';
import { Article, H2, Paragraph } from '../components/HTMLElements';

export default function NotFound() {
  const theme = useTheme();

  return (
    <Article className={theme.notFoundPage}>
      <Meta
        title="Page Not Found"
        description="The requested page was not found"
      />

      <H2>Page not found</H2>
      <Paragraph>The requested page was not found.</Paragraph>

      <Paragraph>
        <Anchor href="/">Go to main site</Anchor>.
      </Paragraph>
    </Article>
  );
}
