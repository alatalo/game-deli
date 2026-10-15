const CACHE_PREFIX = 'tiny-deliveries:' + self.registration.scope + ':';
const CACHE_NAME = CACHE_PREFIX + "6150d5063e6bae6f";
const PRECACHE = [".nojekyll","assets/CanvasRenderer-DAd5nlxr.js","assets/Filter-Bqs44PUH.js","assets/RenderTargetSystem-DVSwo2kI.js","assets/WebGLRenderer-Dnp1SmOu.js","assets/WebGPURenderer-BoIlFMB1.js","assets/browserAll-C4LccnMg.js","assets/getTexelRangeRects-Dpw6XFhj.js","assets/index-Dgeo3U2i.css","assets/index-DzaSJmuG.js","assets/robot-burger-bump-C_9_8ARA.svg","assets/robot-burger-happy-Dj5zP3Ps.svg","assets/robot-burger-ready-r50xMb4W.svg","assets/robot-empty-bump-C4ApEZ_D.svg","assets/robot-empty-happy-gnmM2n8i.svg","assets/robot-empty-ready-BKwPpTm4.svg","assets/robot-kebab-bump-CxJG4TPe.svg","assets/robot-kebab-happy-7YCrWn9-.svg","assets/robot-kebab-ready-S9B2fnjv.svg","assets/robot-pizza-bump-DC3zS1I4.svg","assets/robot-pizza-happy-CAfK_LjH.svg","assets/robot-pizza-ready-DGiQaL3H.svg","assets/rubik-latin-CnQIisVs.woff2","assets/webworkerAll-BhKdW3Cn.js","game_wasm.js","game_wasm_bg.wasm","index.html"];
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
