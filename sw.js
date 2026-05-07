/*
 * DeenLocator — Service Worker
 * Powered by 2now Technology
 * Enables offline support and faster loading
 */

var CACHE = 'deenlocator-v7';

var FILES = [
  '/deenlocator/',
  '/deenlocator/index.html',
  '/deenlocator/app.js',
  '/deenlocator/share-card.js',
  '/deenlocator/styles.css',
  '/deenlocator/locations.js',
  '/deenlocator/config.js'
];

/* Install — cache core files */
self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(CACHE).then(function(cache) {
      return cache.addAll(FILES);
    })
  );
  self.skipWaiting();
});

/* Activate — clear old caches */
self.addEventListener('activate', function(e) {
  e.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(
        keys.filter(function(k) { return k !== CACHE; })
            .map(function(k) { return caches.delete(k); })
      );
    })
  );
  self.clients.claim();
});

/* Skip waiting message — allows instant activation */
self.addEventListener('message', function(e){
  if(e.data && e.data.type === 'SKIP_WAITING') self.skipWaiting();
});

/* Fetch — serve from cache, fall back to network */
self.addEventListener('fetch', function(e) {
  /* Only handle GET requests */
  if (e.request.method !== 'GET') return;

  /* For map tiles and external resources — network only */
  var url = e.request.url;
  if (url.includes('openstreetmap.org') ||
      url.includes('googleapis.com') ||
      url.includes('cdnjs.cloudflare.com') ||
      url.includes('fonts.gstatic.com')) {
    return;
  }

  e.respondWith(
    caches.match(e.request).then(function(cached) {
      if (cached) return cached;
      return fetch(e.request).then(function(response) {
        /* Cache successful responses */
        if (response && response.status === 200) {
          var copy = response.clone();
          caches.open(CACHE).then(function(cache) {
            cache.put(e.request, copy);
          });
        }
        return response;
      }).catch(function() {
        /* Offline fallback — return cached index */
        return caches.match('/deenlocator/index.html');
      });
    })
  );
});
