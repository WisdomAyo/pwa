const CACHE_NAME = "version1";
const urlsToCache = [ 'index.html', 'offline.html' ];

const self = this;

//install SW
self.addEventListener('install', (event) => {
event.waitUntil(
    caches.open(CACHE_NAME)
        .then((cache) => {
            console.log('Opened Cache');

            return cache.addAll(urlsToCache);
        })
)
});

//Listen For Request
self.addEventListener('fetch', (event) => {
event.respondWith(
    caches.match(event.request)
    .then(() => {
        return fetch(event.request)
        .catch(() => caches.match('offline.html'))
    })
)
});

//Activate The SW
self.addEventListener('activate', (event) => {
    const cachesWhiteList = [];
    cachesWhiteList.push(CACHE_NAME);

    event.waitUntil(
        caches.keys().then((cacheNames) => Promise.all(
           cacheNames.map((cacheName) => {
                if (!cachesWhiteList.includes(cacheName)) {
                    return caches.delete(cacheName); 
                
                }
           })
           ))
    )
});
