const CACHE_NAME = "inventory-cache-v1";

const FILES_TO_CACHE = [
    "/",
    "index.html",
    "css/stylesheet.css",
    "app.js",
    "db.js"
];

// INSTALL

self.addEventListener("install", event => {

    console.log("Service Worker Installed");

    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(cache => {
            return cache.addAll(FILES_TO_CACHE);
        })
    )
})

// ACTIVATE

self.addEventListener("activate", () => {
    console.log("Service Worker Active");
});

// FETCH (CACHE FIRST)

self.addEventListener("fetch", event => {
    event.respondWith(

        caches.match(event.request)
        .then(response => {

            if(response){
                return response;
            }
            return fetch(event.request);
        })
    )
})

//cambiar style.ccs -> style_2.css (colores diferentes) - linea 17 - inyectar el otro style para que lo sobreescriba

