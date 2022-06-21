import { useEffect, useState } from 'react';
import { RunContext } from '../../../../pages/admin/code-preview-render';

export function useCodePreviewData() {
  const [data, setData] = useState<RunContext | null>(null);

  useEffect(() => {
    const iframeId = new URL(window.location.href).searchParams.get('iframeId');
    if (!iframeId) return;

    let prevContent: RunContext | null = null;

    const handleMessage = (event: MessageEvent) => {
      let parsedData: null | {
        type: 'sampleContent';
        content: RunContext;
      } = null;

      try {
        parsedData = JSON.parse(event.data);
      } catch (_) {}

      if (
        parsedData &&
        parsedData.type === 'sampleContent' &&
        prevContent?.code !== parsedData.content.code
      ) {
        prevContent = parsedData.content;
        setData(parsedData.content);

        setTimeout(
          () =>
            window.parent?.postMessage(
              JSON.stringify({ iframeId, type: 'sampleContentRendered' }),
              '*',
            ),
          100,
        );
      }
    };

    window.addEventListener('message', handleMessage);

    window.parent?.postMessage(
      JSON.stringify({ iframeId, type: 'sampleContentWaiting' }),
      '*',
    );

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  return data;
}
