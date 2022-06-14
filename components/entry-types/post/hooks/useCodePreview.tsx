import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { renderToString } from 'react-dom/server';
import { Post } from '../../../../types/Entry';
import { Eye } from '../../../icons/Eye';

const MAX_RESIZE_TICKS = 7;
const SUPPORTED_PREVIEW_LANGUAGES = ['html', 'js', 'javascript'];

export function useCodePreview(
  contentRef: MutableRefObject<HTMLDivElement | null>,
  entry: Post,
) {
  let nextIframeIdRef = useRef(0);
  const [contentMap] = useState<Map<string, string>>(() => new Map());
  const [iframeMap] = useState<Map<string, HTMLIFrameElement>>(() => new Map());

  useEffect(() => {
    if (!globalThis.location || !contentRef.current) {
      return;
    }

    const codeElementList = Array.from(
      document.querySelectorAll('pre > code[class^=language-]'),
    ) as HTMLElement[];

    let resizeTicks = 0;

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
        const content = contentMap.get(parsedData?.iframeId);
        if (!content) return;

        iframe.contentWindow?.postMessage(
          JSON.stringify({ type: 'sampleContent', content }),
          '*',
        );
      }
    };

    const renderIframe = (
      wrapperElement: HTMLElement,
      preElement: HTMLElement,
      codeElement: HTMLElement,
      iframeId: string,
    ) => {
      const existingIframe = iframeMap.get(iframeId);

      if (existingIframe) {
        existingIframe.contentWindow?.location.reload();
        existingIframe.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
        return;
      }

      const language = SUPPORTED_PREVIEW_LANGUAGES.find((language) =>
        codeElement.classList.contains(`language-${language}`),
      );

      const iframe = document.createElement('iframe');

      iframe.classList.add('sample-content-hidden');
      iframe.src = `/admin/code-preview-render/?iframeId=${iframeId}&language=${language}`;

      contentMap.set(iframeId, codeElement.innerText);
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

        button.addEventListener('click', () => {
          preElement.dataset.previewLoaded = 'true';
          button.setAttribute('aria-label', 'Reload preview');
          renderIframe(wrapperElement, preElement, codeElement, iframeId);
        });
      }
    }

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [contentRef, entry.content, contentMap, iframeMap]);
}
