// Service Worker — WA Life Insurance Exam Prep
// Bump CACHE whenever the asset version strings below change.
const CACHE = 'wa-life-exam-v7';
const VER = '20260907a';
const ASSETS = [
  './',
  './index.html',
  './css/style.css?v=' + VER,
  './js/storage.js?v=' + VER,
  './js/questions.js?v=' + VER,
  './js/questions-supplement.js?v=' + VER,
  './js/areas.js?v=' + VER,
  './js/app.js?v=' + VER,
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(cache =>
      Promise.all(
        ASSETS.map(url =>
          cache.add(url).catch(err => console.warn('SW: failed to cache', url, err))
        )
      )
    )
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    // 1. Exact cache hit — the normal offline path.
    caches.match(e.request).then(cached => {
      if (cached) return cached;
      // 2. Same file, different ?v= string. Serving a slightly stale copy beats
      //    a blank app when the version was bumped but the network is gone.
      return caches.match(e.request, { ignoreSearch: true }).then(loose => {
        if (loose) return loose;
        // 3. Not cached at all — go to the network and cache what comes back.
        return fetch(e.request).then(res => {
          if (res && res.status === 200) {
            const clone = res.clone();
            caches.open(CACHE).then(c => c.put(e.request, clone));
          }
          return res;
        }).catch(() => {
          // Offline and uncached: navigations still get the app shell.
          if (e.request.mode === 'navigate') return caches.match('./index.html');
          return Response.error();
        });
      });
    })
  );
});
