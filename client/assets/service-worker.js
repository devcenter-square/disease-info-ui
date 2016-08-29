// Use a cacheName for cache versioning
var cacheName = 'v1:disease-info';

// During the installation phase, you'll usually want to cache static assets.
self.addEventListener('install', function(e) {
    // Once the service worker is installed, go ahead and fetch the resources to make this work offline.
    e.waitUntil(
        caches.open(cacheName).then(function(cache) {
            return cache.addAll([
                './views/',
                './views/partials/home.html',
                './views/partials/individualdisease.html',
                '/css/bootstrap.min.css',
                '/css/main.css',
                '/css/loading-bar.min.css',
                '/js/angular.min.js',
                '/js/angular-route.min.js',
                '/js/loading-bar.min.js',
                '/js/dirPagination.js',
                '/js/controllers/mainCtrl.js',
                '/js/services/services.js',
                '/js/app.js'
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