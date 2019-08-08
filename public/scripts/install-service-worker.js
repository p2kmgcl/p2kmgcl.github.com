let registration;

export const installServiceWorker = async () => {
  try {
    registration = await navigator.serviceWorker.register('/service-worker.js');
  } catch (error) {
    console.error(error);
  }
};