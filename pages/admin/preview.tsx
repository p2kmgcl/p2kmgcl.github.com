import { useEffect, useState } from 'react';
import { Entry } from '../../types/Entry';
import { parseMarkdown } from '../../utils/parseMarkdown';
import TeseraEntry from '../tesera/entry/[slug]';

export default function AdminPreview() {
  const [entry, setEntry] = useState<Entry | null>(null);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const data = JSON.parse(event.data) as Omit<Entry, 'content' | 'tags'> & {
        body?: string;
        tags?: string[];
      };

      setEntry({
        ...data,
        tags: data.tags || [],
        content: parseMarkdown(data.body || ''),
      });
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return entry ? <TeseraEntry entry={entry} /> : null;
}
