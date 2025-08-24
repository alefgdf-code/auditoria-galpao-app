// IMPORTANTE: caminho base do GitHub Pages
const BASE = '/auditoria-galpao-app/';
const CACHE = 'auditoria-cache-v1';

const CORE = [
  BASE,
  BASE + 'index.html',
  BASE + 'manifest.json',
  // adicione aqui arquivos locais se tiver (css/js/imagens):
  // BASE + 'app.js',
  // BASE + 'styles.css',
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(CORE)));
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.map((k) => (k !== CACHE ? caches.delete(k) : null)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => res || fetch(e.request))
  );
});
