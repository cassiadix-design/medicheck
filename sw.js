// MediCheck Service Worker
const CACHE_NAME = 'medicheck-v8';
const STATIC_ASSETS = [
  '/manifest.json',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  '/favicon.png'
];
const DATA_CACHE = 'medicheck-data-v8';

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

  // mc-interacoes-data-v3.js: sempre buscar da rede (cache-busting via ?v=timestamp)
  if (url.pathname === '/mc-interacoes-data-v3.js') {
    event.respondWith(
      fetch(event.request).catch(() => caches.match('/mc-interacoes-data-v3.js'))
    );
    return;
  }

  // medicamentos.json: network-first, fallback para cache sem query string
  if (url.pathname === '/medicamentos.json') {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          if (response.ok) {
            const clone = response.clone();
            // Armazena sem query string para reutilizar como fallback offline
            caches.open(DATA_CACHE).then(cache =>
              cache.put(new Request('/medicamentos.json'), clone)
            );
          }
          return response;
        })
        .catch(() => caches.match('/medicamentos.json'))
    );
    return;
  }

  // Arquivos estáticos: cache-first (sem cache para URLs com query string)
  if (
    event.request.method === 'GET' &&
    !url.search &&
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
