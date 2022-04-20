import { useEffect, useRef } from 'react';

export default function EntryHTMLRender() {
  const entryContentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const iframeId = new URL(window.location.href).searchParams.get('iframeId');
    if (!iframeId) return;

    const runScripts = () => {
      if (!entryContentRef.current) {
        return;
      }

      const scriptElements = Array.from(
        entryContentRef.current.querySelectorAll('script'),
      ).filter((script) => !script.type || script.type === 'text/javascript');

      const runNextScript = () => {
        if (!scriptElements.length) {
          return;
        }

        const nextScriptElement = document.createElement('script');
        const prevScriptElement = scriptElements.shift();

        if (
          !prevScriptElement ||
          !prevScriptElement.parentNode ||
          !document.body.contains(prevScriptElement)
        ) {
          return;
        }

        nextScriptElement.appendChild(
          document.createTextNode(prevScriptElement.innerHTML),
        );

        prevScriptElement.parentNode.replaceChild(
          nextScriptElement,
          prevScriptElement,
        );

        requestAnimationFrame(runNextScript);
      };

      runNextScript();
    };

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
        entryContentRef.current
      ) {
        entryContentRef.current.innerHTML = parsedData.content;
        requestAnimationFrame(runScripts);

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

  return <div ref={entryContentRef} />;
}

EntryHTMLRender.displayName = 'EntryHTMLRender';
EntryHTMLRender.rawContent = true;
