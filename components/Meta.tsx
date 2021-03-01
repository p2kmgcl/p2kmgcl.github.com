import Head from 'next/head';
import { FC } from 'react';

const Meta: FC<{ title?: string; description?: string }> = ({
  title,
  description,
}) => {
  return (
    <Head>
      <title key="title">Pablo Molina{title ? ` | ${title}` : ''}</title>
      <meta
        name="description"
        content={
          description ||
          "Pablo Molina's website with links to his social network profiles, contact information and projects"
        }
      />
    </Head>
  );
};

export default Meta;
