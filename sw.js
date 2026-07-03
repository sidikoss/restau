const CACHE = 'heros-v1';
const STATIC_FILES = [
  '/',
  '/index.html',
  '/Menu.html',
  '/order.html',
  '/reserve.html',
  '/about.html',
  '/contact.html',
  '/404.html',
  '/mentions-legales.html',
  '/cgu.html',
  '/styles.css',
  '/script.js',
  '/manifest.json',
  '/icon-192.svg',
  '/icon-512.svg',
  '/sitemap.xml',
  '/robots.txt'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(STATIC_FILES))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  const { request } = e;
  const url = new URL(request.url);

  if (url.origin !== location.origin) return;
  if (url.pathname.startsWith('/blog')) {
    e.respondWith(networkFirst(request));
    return;
  }
  if (request.method !== 'GET') return;
  e.respondWith(fromCache(request));
});

async function fromCache(request) {
  const cached = await caches.match(request);
  return cached || fetchAndCache(request);
}

async function networkFirst(request) {
  try {
    return await fetchAndCache(request);
  } catch {
    return await caches.match(request) || new Response('Offline', { status: 503 });
  }
}

async function fetchAndCache(request) {
  const response = await fetch(request);
  if (response.ok) {
    const cache = await caches.open(CACHE);
    cache.put(request, response.clone());
  }
  return response;
}
