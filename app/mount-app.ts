import App from './app';

async function mountApp(appElement: HTMLElement) {
  new App();
}

export { mountApp };
