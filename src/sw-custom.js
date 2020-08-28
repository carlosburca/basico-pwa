if ("function" === typeof importScripts) {
    importScripts(
        "https://storage.googleapis.com/workbox-cdn/releases/3.5.0/workbox-sw.js"
    );

    // Global workbox
    if (workbox) {
        console.log("Workbox is loaded");

        // Disable logging
        workbox.setConfig({ debug: false });

        //`generateSW` and `generateSWString` provide the option
        // to force update an exiting service worker.
        // Since we're using `injectManifest` to build SW,
        // manually overriding the skipWaiting();
        self.addEventListener("install", (event) => {
            self.skipWaiting();
            window.location.reload();
        });

        // Manual injection point for manifest files.
        // All assets under build/ and 5MB sizes are precached.
        workbox.precaching.precacheAndRoute([]);

        // Font caching
        workbox.routing.registerRoute(
            new RegExp("https://fonts.(?:.googlepis|gstatic).com/(.*)"),
            workbox.strategies.cacheFirst({
                cacheName: "googleapis",
                plugins: [
                    new workbox.expiration.Plugin({
                        maxEntries: 30,
                    }),
                ],
            })
        );

        // Image caching
        workbox.routing.registerRoute(
            /\.(?:png|gif|jpg|jpeg|svg)$/,
            workbox.strategies.cacheFirst({
                cacheName: "images",
                plugins: [
                    new workbox.expiration.Plugin({
                        maxEntries: 60,
                        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
                    }),
                ],
            })
        );

        // JS, CSS caching
        workbox.routing.registerRoute(
            /\.(?:js|css)$/,
            workbox.strategies.staleWhileRevalidate({
                cacheName: "static-resources",
                plugins: [
                    new workbox.expiration.Plugin({
                        maxEntries: 60,
                        maxAgeSeconds: 20 * 24 * 60 * 60, // 20 Days
                    }),
                ],
            })
        );

        let deferredPrompt;
        self.addEventListener('beforeinstallprompt', (e) => {
            // Prevent Chrome 67 and earlier from automatically showing the prompt
            e.preventDefault();
            // Stash the event so it can be triggered later.
            deferredPrompt = e;
        });
        // Show the prompt
        deferredPrompt.prompt();
        // Wait for the user to respond to the prompt
        deferredPrompt.userChoice
            .then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                    console.log('User accepted the A2HS prompt');
                } else {
                    console.log('User dismissed the A2HS prompt');
                }
                deferredPrompt = null;
            });


    } else {
        console.error("Workbox could not be loaded. No offline support");
    }
}