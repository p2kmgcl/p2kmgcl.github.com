import { useEffect, useRef } from 'react';

export function HTMLPreview({ code }: { code: string }) {
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

    if (code && entryContentRef.current) {
      entryContentRef.current.innerHTML = code;
      requestAnimationFrame(runScripts);
    }
  }, [code]);

  return <div ref={entryContentRef} />;
}
