import { useEffect, useRef } from 'react';

export default function AdminEntryHTMLRender() {
  const entryContentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
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
        id: string;
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
              JSON.stringify({
                id: parsedData?.id,
                type: 'sampleContentRendered',
              }),
              '*',
            ),
          100,
        );
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return <div ref={entryContentRef} />;
}

AdminEntryHTMLRender.rawContent = true;
