// Base Bush Lounge staff app: keeps the app shell available so it opens instantly and offline.
// Data always comes live from Supabase (never cached here).
const CACHE = "bbl-staff-v25";
const SHELL = ["./", "./index.html", "./logo.png", "./hero-gate.jpg", "./hero-deck.jpg", "./hero-conference.jpg", "./hero-restaurant.jpg", "./icon-192.png", "./icon-512.png", "./manifest.webmanifest"];
self.addEventListener("install", e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting())); });
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  const url = new URL(e.request.url);
  if (e.request.method !== "GET" || url.origin !== location.origin || !url.pathname.startsWith("/bookings/")) return;
  // Network first so staff always get the latest version; fall back to the cached shell when offline.
  e.respondWith(
    fetch(e.request).then(res => {
      if (res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); }
      return res;
    }).catch(() => caches.match(e.request).then(r => r || caches.match("./index.html")))
  );
});
