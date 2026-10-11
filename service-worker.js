const CACHE_PREFIX = 'tiny-deliveries-';
const CACHE_NAME = "tiny-deliveries-295a8005af2d07bd";
const PRECACHE = ["assets/CanvasRenderer-4RO2uYtA.js","assets/Filter-CoqTkW4x.js","assets/RenderTargetSystem-DCENm8FX.js","assets/WebGLRenderer-CyTV20yR.js","assets/WebGPURenderer-D1lTMge9.js","assets/browserAll-BQothkJV.js","assets/getTexelRangeRects-DssIbzJh.js","assets/index-B9hPptoY.css","assets/index-BJtUsjUl.js","assets/webworkerAll-B-1xGJnc.js","game_wasm.js","game_wasm_bg.wasm","index.html"];
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
