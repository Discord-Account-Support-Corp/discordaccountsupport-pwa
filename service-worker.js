self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Only handle fetches for your slab domain
  if (url.origin === 'https://discordaccountsupportcorporation.slab.com') {
    if (url.pathname.includes('/login') || url.pathname.includes('/auth') || url.pathname.includes('/signin')) {
      event.respondWith(fetch(event.request));
      return;
    }

    event.respondWith(
      caches.match(event.request).then(cachedResponse => {
        return cachedResponse || fetch(event.request);
      })
    );
  }
});
