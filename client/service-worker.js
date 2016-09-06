// Use a cacheName for cache versioning
var cacheName = 'v1:disease-info';
var dataCacheName = 'diseaseData-v1';

if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('/service-worker.js').then(function () {
            console.log("Service Worker Registered");
        }).catch(function (err) {
            // registration failed :(
            console.log('ServiceWorker registration failed: ', err);
        });
}


// During the installation phase, you'll usually want to cache static assets.
self.addEventListener('install', function(e) {
    // Once the service worker is installed, go ahead and fetch the resources to make this work offline.
    e.waitUntil(
        caches.open(cacheName).then(function(cache) {
            return cache.addAll([
                '/',
                '/views/',
                '/views/index.html',
                '/assets/js/jquery-2.1.4.min.js',
                '/assets/js/bootstrap.min.js',
                '/assets/js/angular.min.js',
                '/assets/js/angular.min.js.map',
                '/assets/js/angular-animate.min.js.map',
                '/assets/js/angular-route.min.js',
                '/assets/js/loading-bar.min.js',
                '/assets/js/dirPagination.js',
                '/assets/js/controllers/mainCtrl.js',
                '/assets/js/services/services.js',
                '/assets/js/app.js',
                '/assets/js/string-prototypes.js',
                '/assets/css/bootstrap.min.css',
                '/assets/css/main.css',
                '/assets/css/',
                '/assets/img/particles.png',
                '/assets/fonts/proxima_nova.ttf',
                '/assets/css/loading-bar.min.css',
                '/views/partials/home.html',
                '/views/partials/individualdisease.html',
                'https://disease-info-api.herokuapp.com/diseases/'
            ]).then(function() {
                self.skipWaiting();
            });
        })
    );
});

// when the browser fetches a URL…
/*self.addEventListener('fetch', function(event) {
 // … either respond with the cached object or go ahead and fetch the actual URL
 event.respondWith(
 caches.match(event.request).then(function(response) {
 if (response) {
 // retrieve from cache
 return response;
 }
 // fetch as normal
 return fetch(event.request);
 })
 );
 });*/

/*self.addEventListener('fetch', function(e) {
 console.log('[ServiceWorker] Fetch', e.request.url);
 var dataUrl = 'https://disease-info-api.herokuapp.com/diseases/';
 if (e.request.url.indexOf(dataUrl) === 0) {
 // Put data handler code here
 } else {
 e.respondWith(
 caches.match(e.request).then(function(response) {
 return response || fetch(e.request);
 })
 );
 }
 });*/

self.addEventListener('fetch', function (event) {
    //console.log("Fetch:", event);
    event.respondWith(
        caches.match(event.request)
            .then(function (response) {
                // Cache hit - return response
                if (response) {
                    console.log("Found in Cache: " + event.request.url);
                    return response;
                }

                // IMPORTANT: Clone the request. A request is a stream and
                // can only be consumed once. Since we are consuming this
                // once by cache and once by the browser for fetch, we need
                // to clone the request.
                var fetchRequest = event.request.clone();

                return fetch(fetchRequest).then(
                    function (response) {
                        console.log(response);
                        // Check if we received a valid response
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }

                        // IMPORTANT: Clone the response. A response is a stream
                        // and because we want the browser to consume the response
                        // as well as the cache consuming the response, we need
                        // to clone it so we have 2 stream.
                        var responseToCache = response.clone();

                        caches.open(cacheName)
                            .then(function (cache) {
                                cache.put(event.request, responseToCache);
                            });

                        return response;
                    }
                );
            })
    );
});