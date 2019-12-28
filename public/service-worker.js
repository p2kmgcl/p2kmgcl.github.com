self.addEventListener('activate', (event) =>
  event.waitUntil(
    caches
      .keys()
      .then((cacheIds) =>
        Promise.all(cacheIds.map((cacheId) => caches.delete(cacheId))),
      ),
  ),
);
