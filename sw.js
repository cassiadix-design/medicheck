// MediCheck Service Worker
const CACHE_NAME = 'medicheck-v2';
const STATIC_ASSETS = [
  '/index.html',
  '/manifest.json',
  '/medicamentos/index.html',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  '/favicon.png'
];
const DATA_CACHE = 'medicheck-data-v2';

// Instala e faz cache dos arquivos estáticos (resiliente: falha individual não cancela install)
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache =>
      Promise.allSettled(STATIC_ASSETS.map(url => cache.add(url)))
    )
  );
  self.skipWaiting();
});

// Limpa caches antigos na ativação
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(k => k !== CACHE_NAME && k !== DATA_CACHE)
          .map(k => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

// Estratégia de fetch
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // medicamentos.json: cache-first com fallback de rede
  if (url.pathname === '/medicamentos.json') {
    event.respondWith(
      caches.open(DATA_CACHE).then(async cache => {
        const cached = await cache.match(event.request);
        if (cached) {
          // Atualiza em background sem bloquear
          fetch(event.request)
            .then(res => { if (res.ok) cache.put(event.request, res); })
            .catch(() => {});
          return cached;
        }
        const response = await fetch(event.request);
        if (response.ok) cache.put(event.request, response.clone());
        return response;
      })
    );
    return;
  }

  // Arquivos estáticos: cache-first
  if (
    event.request.method === 'GET' &&
    (url.origin === location.origin || url.pathname.startsWith('/icons/'))
  ) {
    event.respondWith(
      caches.match(event.request).then(cached => {
        if (cached) return cached;
        return fetch(event.request).then(response => {
          if (!response || !response.ok || response.type === 'opaque') return response;
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
          return response;
        }).catch(() => {
          // Fallback offline: retorna index.html para navegação
          if (event.request.mode === 'navigate') {
            return caches.match('/index.html');
          }
        });
      })
    );
  }
});
