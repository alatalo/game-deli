const CACHE_PREFIX = 'tiny-deliveries:' + self.registration.scope + ':';
const CACHE_NAME = CACHE_PREFIX + "e7e1a38644e6818d";
const PRECACHE = [".nojekyll","assets/CanvasRenderer-Di6xe4aE.js","assets/Filter-CZQsXNhX.js","assets/RenderTargetSystem-CkLpENdG.js","assets/WebGLRenderer-CQcIc7Bz.js","assets/WebGPURenderer-DGInRQd3.js","assets/browserAll-abyXYA7S.js","assets/getTexelRangeRects-7Ej4bLBI.js","assets/index-B9hPptoY.css","assets/index-DZQHi9Hj.js","assets/webworkerAll-lATY9ioZ.js","game_wasm.js","game_wasm_bg.wasm","index.html"];
const inScope = (url) => url.origin === self.location.origin && url.href.startsWith(self.registration.scope);
self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE.map((path) => new URL(path, self.registration.scope).href))).then(() => self.skipWaiting()));
});
self.addEventListener('activate', (event) => {
  event.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((key) => key.startsWith(CACHE_PREFIX) && key !== CACHE_NAME).map((key) => caches.delete(key)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET' || !inScope(new URL(request.url))) return;
  if (request.mode === 'navigate') {
    event.respondWith(fetch(request).then((response) => response.ok ? response : Promise.reject(new Error('Navigation failed'))).catch(async () => (await caches.match(new URL('index.html', self.registration.scope))) ?? Response.error()));
    return;
  }
  event.respondWith(caches.match(request).then((cached) => cached ?? fetch(request)));
});
