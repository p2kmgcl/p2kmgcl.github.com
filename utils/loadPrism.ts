export const loadPrism = () =>
  new Promise<{ default: any }>((resolve) => {
    if (!window.Prism?.highlightElement) {
      // @ts-ignore
      window.Prism = { manual: true };

      import('prismjs').then((PrismModule) =>
        Promise.all([
          // @ts-ignore
          import('prismjs/components/prism-typescript'),
        ]).then(() => {
          resolve(PrismModule);
        }),
      );
    } else {
      resolve({ default: window.Prism });
    }
  });
