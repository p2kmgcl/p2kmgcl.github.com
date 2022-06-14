/* eslint-disable @next/next/no-sync-scripts */

import { useEffect, useRef } from 'react';
import { useHasMounted } from '../../../../utils/useHasMounted';

const INIT_SCRIPT = `
  mocha.setup("bdd");
  mocha.checkLeaks();
  expect = chai.expect;
`;

const RUN_SCRIPT = `
  mocha.run();
`;

export function JavaScriptPreview({ code }: { code: string }) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const hasMounted = useHasMounted();

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!hasMounted || !wrapper) return;

    (async function () {
      const mochaStyles = document.createElement('style');
      mochaStyles.appendChild(
        document.createTextNode(
          await fetch('https://unpkg.com/mocha/mocha.css').then((r) =>
            r.text(),
          ),
        ),
      );

      const mochaDiv = document.createElement('div');
      mochaDiv.id = 'mocha';

      const chaiScript = document.createElement('script');
      chaiScript.appendChild(
        document.createTextNode(
          await fetch('https://unpkg.com/chai/chai.js').then((r) => r.text()),
        ),
      );

      const mochaScript = document.createElement('script');
      mochaScript.appendChild(
        document.createTextNode(
          await fetch('https://unpkg.com/mocha/mocha.js').then((r) => r.text()),
        ),
      );

      const mochaInitScript = document.createElement('script');
      mochaInitScript.appendChild(document.createTextNode(INIT_SCRIPT));

      const testScript = document.createElement('script');
      testScript.setAttribute('type', 'module');
      testScript.appendChild(document.createTextNode(code));

      const mochaRunScript = document.createElement('script');
      mochaRunScript.appendChild(document.createTextNode(RUN_SCRIPT));

      document.head.appendChild(mochaStyles);
      wrapper.appendChild(mochaDiv);
      wrapper.appendChild(chaiScript);
      wrapper.appendChild(mochaScript);
      wrapper.appendChild(mochaInitScript);
      wrapper.appendChild(testScript);
      wrapper.appendChild(mochaRunScript);
    })();
  }, [code, hasMounted]);

  return <div ref={wrapperRef} />;
}
