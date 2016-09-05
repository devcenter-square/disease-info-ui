// Use a cacheName for cache versioning
var cacheName = 'v1:disease-info';
var dataCacheName = 'diseaseData-v1';

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
self.addEventListener('fetch', function(event) {
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
});
self.addEventListener('fetch', function(e) {
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
});