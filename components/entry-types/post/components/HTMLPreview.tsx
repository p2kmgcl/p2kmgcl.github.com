import { useEffect, useRef } from 'react';
import { RunContext } from '../../../../pages/admin/code-preview-render';

export function HTMLPreview({ code, dependencies }: RunContext) {
  const entryContentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (entryContentRef.current?.children.length) return;

    const runScripts = () => {
      if (!entryContentRef.current) {
        return;
      }

      const mainScript = Array.from(
        entryContentRef.current.querySelectorAll('script'),
      )
        .filter(
          (script) =>
            script.parentNode &&
            (!script.type ||
              script.type === 'module' ||
              script.type === 'text/javascript'),
        )
        .map((script) => {
          script.parentNode?.removeChild(script);
          return script.innerHTML;
        })
        .join('\n;\n');

      const mainScriptElement = document.createElement('script');
      mainScriptElement.type = 'module';
      mainScriptElement.appendChild(document.createTextNode(mainScript));
      document.body.appendChild(mainScriptElement);
    };

    if (code && entryContentRef.current) {
      entryContentRef.current.innerHTML = [
        ...dependencies
          .map((dependency) => {
            switch (dependency.language) {
              case 'css':
                return `<style>${dependency.code}</style>`;
              case 'js':
              case 'javascript':
                return `<script>${dependency.code}</script>`;
              default:
                return '';
            }
          })
          .filter((dependency) => dependency),
        code,
      ].join('\n');

      requestAnimationFrame(runScripts);
    }
  }, [code, dependencies]);

  return <div ref={entryContentRef} />;
}
