import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { renderToString } from 'react-dom/server';
import {
  PREVIEW_COMPONENTS,
  RunContext,
} from '../../../../pages/admin/code-preview-render';
import { Post } from '../../../../types/Entry';
import { Eye } from '../../../icons/Eye';

const MAX_RESIZE_TICKS = 7;
const SUPPORTED_PREVIEW_LANGUAGES = Object.keys(PREVIEW_COMPONENTS);

export function useCodePreview(
  contentRef: MutableRefObject<HTMLDivElement | null>,
  entry: Post,
) {
  let nextIframeIdRef = useRef(0);
  const [runContextMap] = useState<Map<string, RunContext>>(() => new Map());
  const [iframeMap] = useState<Map<string, HTMLIFrameElement>>(() => new Map());

  useEffect(() => {
    if (!globalThis.location || !contentRef.current) {
      return;
    }

    const codeElementList = Array.from(
      document.querySelectorAll('pre > code[class^=language-]'),
    ) as HTMLElement[];

    let resizeTicks = 0;

    function getLanguage(codeElement: HTMLElement) {
      const languageString = Array.from(codeElement.classList.values()).find(
        (className) => className.startsWith('language-'),
      );

      if (languageString) {
        const [, language] = /^language-([^\n]+)$/gi.exec(languageString) || [];
        return language;
      }

      return null;
    }

    const resizeIframe = (iframe: HTMLIFrameElement) => {
      const { contentWindow } = iframe;

      if (contentWindow) {
        const { borderBottomWidth, borderTopWidth } =
          window.getComputedStyle(iframe);

        const height = Math.max(
          200,
          ...Array.from(contentWindow.document.querySelectorAll('*')).map(
            (element) => {
              if (element.getBoundingClientRect) {
                const style = contentWindow.getComputedStyle(element);
                const rect = element.getBoundingClientRect();

                return (
                  rect.height +
                  (parseInt(style.marginTop, 10) || 0) +
                  (parseInt(style.marginBottom, 10) || 0)
                );
              }

              return 0;
            },
          ),
        );

        const heightString =
          height +
          parseInt(borderBottomWidth || '0', 10) +
          parseInt(borderTopWidth || '0', 10) +
          'px';

        iframe
          .animate([{ height: heightString }], {
            duration: 300,
            easing: 'ease-in-out',
            fill: 'forwards',
          })
          .finished.then(() => {
            if (resizeTicks < MAX_RESIZE_TICKS) {
              resizeTicks++;
              setTimeout(() => resizeIframe(iframe), 500 * (resizeTicks + 1));
            }
          });

        iframe.classList.remove('sample-content-hidden');
      }
    };

    const handleMessage = (event: MessageEvent) => {
      let parsedData: null | {
        iframeId: string;
        type: 'sampleContentRendered' | 'sampleContentWaiting';
      } = null;

      try {
        parsedData = JSON.parse(event.data);
      } catch (_) {}

      const iframe = iframeMap.get(parsedData?.iframeId || '');
      if (!iframe) return;

      if (parsedData?.type === 'sampleContentRendered') {
        resizeIframe(iframe);
      } else if (parsedData?.type === 'sampleContentWaiting') {
        const content = runContextMap.get(parsedData?.iframeId);
        if (!content) return;

        iframe.contentWindow?.postMessage(
          JSON.stringify({
            type: 'sampleContent',
            content: content,
          }),
          '*',
        );
      }
    };

    const renderIframe = (
      wrapperElement: HTMLElement,
      preElement: HTMLElement,
      iframeId: string,
      runContext: RunContext,
    ) => {
      const existingIframe = iframeMap.get(iframeId);
      runContextMap.set(iframeId, runContext);

      if (existingIframe) {
        existingIframe.contentWindow?.location.reload();
        existingIframe.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
        return;
      }

      const iframe = document.createElement('iframe');

      iframe.classList.add('sample-content-hidden');
      iframe.src = `/admin/code-preview-render/?iframeId=${iframeId}`;
      iframeMap.set(iframeId, iframe);

      if (preElement.nextElementSibling) {
        wrapperElement.insertBefore(iframe, preElement.nextElementSibling);
      } else {
        wrapperElement.appendChild(iframe);
      }

      iframe.scrollIntoView({
        block: 'center',
        behavior: 'smooth',
      });
    };

    const runContextDependencies: RunContext['dependencies'] = [];

    for (const codeElement of codeElementList) {
      const preElement = codeElement.parentElement as HTMLElement;
      const wrapperElement = preElement.parentElement;

      if (
        wrapperElement &&
        SUPPORTED_PREVIEW_LANGUAGES.some((language) =>
          codeElement.classList.contains(`language-${language}`),
        ) &&
        !preElement.dataset.previewReady
      ) {
        const button = document.createElement('button');
        const iframeId = (nextIframeIdRef.current++).toString();
        preElement.dataset.previewReady = 'true';

        preElement.appendChild(button);
        button.classList.add('data-preview-button');
        button.type = 'button';
        button.setAttribute('aria-label', 'Show preview');
        button.innerHTML = renderToString(<Eye />);

        const currentRunContextDependencies = [...runContextDependencies];

        const language = getLanguage(codeElement) as string;
        let code = codeElement.innerText;

        button.addEventListener('click', () => {
          if (!preElement.dataset.previewLoaded) {
            const textarea = document.createElement('textarea');
            textarea.setAttribute('spellcheck', 'false');
            textarea.value = code.trim();

            textarea.addEventListener('keyup', () => {
              code = textarea.value;
            });

            textarea.addEventListener('keydown', (event) => {
              if (event.key === 'Tab') {
                event.preventDefault();
              }

              textarea.style.height = '';

              requestAnimationFrame(() => {
                textarea.style.height = `${textarea.scrollHeight}px`;
              });
            });

            preElement.replaceChild(textarea, codeElement);

            requestAnimationFrame(() => {
              textarea.style.height = `${textarea.scrollHeight}px`;
            });
          }

          preElement.dataset.previewLoaded = 'true';
          button.setAttribute('aria-label', 'Reload preview');

          renderIframe(wrapperElement, preElement, iframeId, {
            code,
            language,
            dependencies: currentRunContextDependencies,
          });
        });
      }

      if (wrapperElement && codeElement) {
        const language = getLanguage(codeElement);

        if (language) {
          runContextDependencies.push({
            language,
            code: codeElement.innerText,
          });
        }
      }
    }

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [contentRef, entry.content, runContextMap, iframeMap]);
}
