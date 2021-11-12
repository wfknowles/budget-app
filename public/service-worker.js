const APP_PREFIX = 'BudgetApp-';     
const VERSION = 'version_01';
const CACHE_NAME = APP_PREFIX + VERSION;

const FILES_TO_CACHE = [
    "./index.html",
    "./css/styles.css",
    "./js/index.js",
    "./js/idb.js"
];

// cache resources
self.addEventListener('install', function (e) {
    e.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            return cache.addAll(FILES_TO_CACHE);
        })
    )
  })

// delete outdated caches
self.addEventListener('activate', function(e) {
    e.waitUntil(
        caches.keys().then(function(keyList) {
            let cacheKeeplist = keyList.filter(function(key) {
            return key.indexOf(APP_PREFIX);
            });
            cacheKeeplist.push(CACHE_NAME);
    
            return Promise.all(
            keyList.map(function(key, i) {
                if (cacheKeeplist.indexOf(key) === -1) {
                console.log('deleting cache : ' + keyList[i]);
                return caches.delete(keyList[i]);
                }
            })
            );
        })
    );
});

// intercept fetch requests
self.addEventListener('fetch', function (e) {
    e.respondWith(
        caches.match(e.request).then(function (request) {
            return request || fetch(e.request)
        })
    )
});