import { useEffect, useState } from 'react';
import { Entry } from '../../types/Entry';
import { parseMarkdown } from '../../utils/parseMarkdown';
import TeseraEntry from '../tesera/entry/[slug]';

export default function AdminPreviewTesera() {
  const [entry, setEntry] = useState<Entry | null>(null);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      let parsedData:
        | null
        | (Omit<Entry, 'content' | 'tags'> & {
            type: 'entry';
            body?: string;
            tags?: string[];
          }) = null;

      try {
        parsedData = JSON.parse(event.data);
      } catch (_) {}

      if (parsedData && parsedData.type === 'entry') {
        setEntry({
          ...parsedData,
          tags: parsedData.tags || [],
          content: parseMarkdown(parsedData.body || ''),
        });
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return entry ? <TeseraEntry entry={entry} /> : null;
}

AdminPreviewTesera.rawContent = true;
