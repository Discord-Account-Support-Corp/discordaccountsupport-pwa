self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Don’t cache or intercept login/auth pages
  if (url.pathname.includes('/login') || url.pathname.includes('/auth') || url.pathname.includes('/signin')) {
    event.respondWith(fetch(event.request));
    return;
  }

  // For everything else, try cache first, then network
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      return cachedResponse || fetch(event.request);
    })
  );
});
