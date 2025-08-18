self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open("zip-app").then((cache) =>
      cache.addAll(["./", "index.html", "app.js", "manifest.json"])
    )
  );
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => res || fetch(e.request))
  );
});
