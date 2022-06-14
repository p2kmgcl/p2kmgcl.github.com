import { useEffect, useState } from 'react';

export function useCodePreviewData() {
  const [language, setLanguage] = useState<string | null>(null);
  const [code, setCode] = useState<string | null>(null);

  useEffect(() => {
    const iframeId = new URL(window.location.href).searchParams.get('iframeId');
    if (!iframeId) return;
    setLanguage(new URL(window.location.href).searchParams.get('language'));

    let prevContent = '';

    const handleMessage = (event: MessageEvent) => {
      let parsedData: null | {
        type: 'sampleContent';
        content: string;
      } = null;

      try {
        parsedData = JSON.parse(event.data);
      } catch (_) {}

      if (
        parsedData &&
        parsedData.type === 'sampleContent' &&
        prevContent !== parsedData.content
      ) {
        prevContent = parsedData.content;
        setCode(prevContent);

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

  return { language, code } as const;
}
