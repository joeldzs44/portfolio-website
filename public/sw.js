// Minimal service worker that does nothing but prevent 404 errors
self.addEventListener('install', function(e) {
self.skipWaiting();
});

self.addEventListener('activate', function(e) {
e.waitUntil(clients.claim());
});