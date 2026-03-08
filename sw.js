// Minimal service worker — enables PWA installability only.
// No caching: all requests go to the network to keep submissions live.

self.addEventListener("install", function(e) {
  self.skipWaiting();
});

self.addEventListener("activate", function(e) {
  e.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", function(e) {
  // Pass all requests straight through to the network
  e.respondWith(fetch(e.request));
});
