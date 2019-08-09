const ASSETS = [
  '/',
  '/manifest.json',
  '/styles/index.css',
  '/favicon/favicon-32.png',
  '/favicon/favicon-192.png',
  '/favicon/favicon-512.png',
];

const CACHE_ID = '1';

self.addEventListener('install', (event) =>
  event.waitUntil(
    caches
      .open(CACHE_ID)
      .then((cache) => Promise.all(ASSETS.map((asset) => cache.add(asset)))),
  ),
);

self.addEventListener('activate', (event) =>
  event.waitUntil(
    caches
      .keys()
      .then((cacheIds) =>
        Promise.all(
          cacheIds
            .filter((cacheId) => cacheId !== CACHE_ID)
            .map((cacheId) => caches.delete(cacheId)),
        ),
      ),
  ),
);

self.addEventListener('fetch', (event) => {
  if (event.request.method === 'GET') {
    event.respondWith(
      (async function() {
        const cache = await caches.open(CACHE_ID);

        try {
          const response = await fetch(event.request);
          console.log('online');
          cache.put(event.request.url, response.clone());
          return response;
        } catch (error) {
          console.log('cache');
          return cache.match(event.request.url);
        }
      })(),
    );
  }
});
