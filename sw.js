// Minimal service worker — enables PWA installability only.
// No caching: all requests bypass HTTP cache to keep the app always fresh.
self.addEventListener("install", function(e) {
  self.skipWaiting();
});
self.addEventListener("activate", function(e) {
  // Clear any existing caches from previous versions
  e.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(keys.map(function(key) { return caches.delete(key); }));
    }).then(function() { return self.clients.claim(); })
  );
});
self.addEventListener("fetch", function(e) {
  // Bypass HTTP cache entirely — always fetch fresh from network
  e.respondWith(
    fetch(e.request, { cache: "no-store" }).catch(function() {
      // If offline, just let the browser handle it naturally
      return fetch(e.request);
    })
  );
});
