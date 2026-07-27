// Minimal service worker so the app is installable and the shell loads fast.
// The live data (/api/*) is ALWAYS fetched from the network — never cached —
// so you never see stale prices or signals.
const SHELL = "tradingbot-shell-v2";
const ASSETS = ["./", "./index.html", "./manifest.json", "./icon-192.png", "./icon-512.png"];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(SHELL).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== SHELL).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const url = new URL(e.request.url);
  // Never cache API calls — always live.
  if (url.pathname.startsWith("/api/")) return;
  // Cache-first for the static shell, fall back to network.
  e.respondWith(caches.match(e.request).then((hit) => hit || fetch(e.request)));
});
