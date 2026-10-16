const CACHE_PREFIX = 'tiny-deliveries:' + self.registration.scope + ':';
const CACHE_NAME = CACHE_PREFIX + "d4209b33e3a4a315";
const PRECACHE = [".nojekyll","app-icon-192.png","app-icon-512.png","app-icon-maskable-512.png","app-icon-maskable.svg","app-icon.svg","apple-touch-icon.png","assets/CanvasRenderer-BgmRLLZD.js","assets/RenderTargetSystem-BZgZLRSe.js","assets/WebGLRenderer-pljhOB--.js","assets/WebGPURenderer-BDU0R2Co.js","assets/browserAll-BZH1BS7X.js","assets/getTexelRangeRects-DzZWH8MG.js","assets/index-BZZsJbcL.css","assets/index-D2tQUHJH.js","assets/robot-burger-bump-C_9_8ARA.svg","assets/robot-burger-happy-Dj5zP3Ps.svg","assets/robot-burger-ready-r50xMb4W.svg","assets/robot-empty-bump-C4ApEZ_D.svg","assets/robot-empty-happy-gnmM2n8i.svg","assets/robot-empty-ready-BKwPpTm4.svg","assets/robot-kebab-bump-CxJG4TPe.svg","assets/robot-kebab-happy-7YCrWn9-.svg","assets/robot-kebab-ready-S9B2fnjv.svg","assets/robot-pizza-bump-DC3zS1I4.svg","assets/robot-pizza-happy-CAfK_LjH.svg","assets/robot-pizza-ready-DGiQaL3H.svg","assets/rubik-latin-CnQIisVs.woff2","assets/webworkerAll-BqmUwP3k.js","favicon.ico","favicon.svg","game_wasm.js","game_wasm_bg.wasm","index.html","share-card.png","share-card.svg","share-robot.svg","site.webmanifest"];
const inScope = (url) => url.origin === self.location.origin && url.href.startsWith(self.registration.scope);
self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE.map((path) => new URL(path, self.registration.scope).href))).then(() => self.skipWaiting()));
});
// Old caches stay until the next navigation: an open page keeps the chunks it was built with.
const pruneOldCaches = () => caches.keys().then((keys) => Promise.all(keys.filter((key) => key.startsWith(CACHE_PREFIX) && key !== CACHE_NAME).map((key) => caches.delete(key))));
self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});
self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET' || !inScope(new URL(request.url))) return;
  if (request.mode === 'navigate') {
    event.waitUntil(pruneOldCaches());
    event.respondWith(fetch(request).then((response) => response.ok ? response : Promise.reject(new Error('Navigation failed'))).catch(async () => (await caches.match(new URL('index.html', self.registration.scope))) ?? Response.error()));
    return;
  }
  event.respondWith(caches.open(CACHE_NAME).then((cache) => cache.match(request)).then((cached) => cached ?? caches.match(request)).then((cached) => cached ?? fetch(request)));
});
