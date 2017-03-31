/**
 * Check out https://googlechrome.github.io/sw-toolbox/docs/master/index.html for
 * more info on how to use sw-toolbox to custom configure your service worker.
 */

"use strict"

importScripts("./sw-toolbox.js")

self.toolbox.options.cache = {
    name: "yiimobile-cache"
}

// pre-cache our key assets
self.toolbox.precache(
    [
        // "./views/index.html",
        "./sw-toolbox.js"
    ]
)

// dynamically cache any other local assets
self.toolbox.router.any("/*", self.toolbox.cacheFirst)

// for any other requests go to the network, cache,
// and then only use that cached resource if your user goes offline
self.toolbox.router.default = self.toolbox.networkFirst

module.exports = self
