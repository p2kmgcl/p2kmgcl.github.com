import './app.css';
import './main.css';

function enableJs() {
  const noscript = document.getElementById('noscript');
  document.body.classList.remove('no-js');

  if (noscript && noscript.parentElement) {
    noscript.parentElement.removeChild(noscript);
  }
}

function installServiceWorker() {
  if (process.env.NODE_ENV === 'production') {
    import(/* webpackChunkName: "offline-plugin-runtime" */ 'offline-plugin/runtime').then(
      (offlinePluginModule) => {
        offlinePluginModule.install();
      },
    );
  }
}

async function main() {
  enableJs();

  const appElement = document.getElementById('app');

  if (appElement) {
    const {
      mountApp,
    } = await import(/* webpackChunkName: "mount-app" */ './mount-app');
    mountApp(appElement).then(() => installServiceWorker());
  } else {
    const {
      showSplashScreenMessage,
    } = await import(/* webpackChunkName: "splash-screen" */ './splash-screen');
    showSplashScreenMessage('App element not found');
  }
}

main();
