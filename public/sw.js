/* Portfolio offline cache. Bump CACHE_VERSION after a deploy to drop old caches. */
const CACHE_VERSION = "portfolio-v1";
const SHELL_CACHE = `${CACHE_VERSION}-shell`;
const STATIC_CACHE = `${CACHE_VERSION}-static`;
const PAGE_CACHE = `${CACHE_VERSION}-pages`;
const IMAGE_CACHE = `${CACHE_VERSION}-images`;
const FONT_CACHE = `${CACHE_VERSION}-fonts`;

const IMAGE_CACHE_LIMIT = 100;
const NAV_TIMEOUT_MS = 3000;

/** App shell fetched while installing. Large media is cached later, on demand. */
const PRECACHE_URLS = ["/", "/offline", "/assets/profile-hover.jpg"];

const NEVER_CACHE = [/\/api\//i, /\.(?:mp4|webm|mov|m4v)(?:$|\?)/i];
const IMAGE_EXTENSION = /\.(?:png|jpe?g|gif|webp|avif|svg|ico)(?:$|\?)/i;
const FONT_HOSTS = new Set(["fonts.googleapis.com", "fonts.gstatic.com"]);

self.addEventListener("install", (event) => {
  event.waitUntil(precacheShell().then(() => self.skipWaiting()));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((key) => !key.startsWith(CACHE_VERSION)).map((key) => caches.delete(key))),
      )
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("message", (event) => {
  if (event.data?.type === "SKIP_WAITING") self.skipWaiting();
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;
  if (request.headers.has("range")) return;

  const url = new URL(request.url);
  if (isNeverCached(url)) return;
  if (!isHandledOrigin(url)) return;

  if (request.mode === "navigate" || isDocumentRequest(request, url)) {
    event.respondWith(networkFirst(request, PAGE_CACHE));
    return;
  }

  if (url.origin === self.location.origin && url.pathname.startsWith("/_next/static/")) {
    event.respondWith(cacheFirst(request, STATIC_CACHE));
    return;
  }

  if (isImageRequest(url)) {
    event.respondWith(staleWhileRevalidate(request, IMAGE_CACHE, IMAGE_CACHE_LIMIT));
    return;
  }

  if (FONT_HOSTS.has(url.hostname)) {
    event.respondWith(staleWhileRevalidate(request, FONT_CACHE, 30));
  }
});

function isNeverCached(url) {
  return NEVER_CACHE.some((pattern) => pattern.test(url.pathname) || pattern.test(url.href));
}

function isHandledOrigin(url) {
  return url.origin === self.location.origin || FONT_HOSTS.has(url.hostname);
}

function isDocumentRequest(request, url) {
  if (url.origin !== self.location.origin) return false;
  if (request.headers.get("RSC") === "1") return true;
  if (url.searchParams.has("_rsc")) return true;
  const accept = request.headers.get("accept") || "";
  return request.destination === "document" || accept.includes("text/html");
}

function isImageRequest(url) {
  if (url.origin !== self.location.origin) return false;
  return url.pathname.startsWith("/_next/image") || IMAGE_EXTENSION.test(url.pathname);
}

async function precacheShell() {
  const cache = await caches.open(SHELL_CACHE);
  await Promise.all(PRECACHE_URLS.map((url) => putSafely(cache, url)));
  const home = await cache.match("/");
  if (!home) return;
  const html = await home.clone().text();
  const staticCache = await caches.open(STATIC_CACHE);
  const assets = new Set();
  const pattern = /(?:src|href)="([^"]+)"/g;
  let match = pattern.exec(html);
  while (match) {
    const asset = match[1];
    if (asset.startsWith("/_next/")) assets.add(asset);
    match = pattern.exec(html);
  }
  await Promise.all([...assets].map((asset) => putSafely(staticCache, asset)));
}

async function putSafely(cache, url) {
  try {
    const response = await fetch(url, { cache: "no-cache" });
    if (response && response.ok && !isVideoResponse(response)) {
      await cache.put(url, response);
    }
  } catch {
    /* A missing shell file should not stop the worker from installing. */
  }
}

function isVideoResponse(response) {
  return (response.headers.get("content-type") || "").startsWith("video/");
}

async function networkFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  try {
    const response = await fetchWithTimeout(request, NAV_TIMEOUT_MS);
    if (response && response.ok && !isVideoResponse(response)) {
      cache.put(request, response.clone()).catch(() => {});
    }
    if (response) return response;
  } catch {
    /* Fall through to the cached page. */
  }
  const cached = (await cache.match(request)) || (await caches.match(request));
  if (cached) return cached;
  const isDocument = request.mode === "navigate" || request.destination === "document";
  if (!isDocument) return new Response("", { status: 503 });
  const shell = await caches.open(SHELL_CACHE);
  const offline = (await shell.match("/offline")) || (await caches.match("/offline"));
  if (offline) return offline;
  return new Response("You're offline", { status: 503, headers: { "Content-Type": "text/plain" } });
}

async function cacheFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  if (cached) return cached;
  try {
    const response = await fetch(request);
    if (response && response.ok && !isVideoResponse(response)) {
      cache.put(request, response.clone()).catch(() => {});
    }
    return response;
  } catch {
    return cached || new Response("", { status: 504 });
  }
}

async function staleWhileRevalidate(request, cacheName, limit) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  const refresh = fetch(request)
    .then(async (response) => {
      if (response && response.ok && !isVideoResponse(response)) {
        await cache.put(request, response.clone()).catch(() => {});
        await trimCache(cache, limit);
      }
      return response;
    })
    .catch(() => null);

  if (cached) {
    refresh.catch(() => {});
    return cached;
  }
  const response = await refresh;
  return response || new Response("", { status: 504 });
}

async function trimCache(cache, limit) {
  const keys = await cache.keys();
  if (keys.length <= limit) return;
  await Promise.all(keys.slice(0, keys.length - limit).map((key) => cache.delete(key)));
}

function fetchWithTimeout(request, timeout) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);
  return fetch(request, { signal: controller.signal }).finally(() => clearTimeout(timer));
}
