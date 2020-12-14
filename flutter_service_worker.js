'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "version.json": "15eef6807af124ce8d74c4b9291a5b71",
"index.html": "32ab1896a43536b5478f6d1005b52f85",
"/": "32ab1896a43536b5478f6d1005b52f85",
"main.dart.js": "8ab9115c348d665370d067167d336600",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"manifest.json": "d9958b977a9e93c8602b2f01d61d2392",
"assets/AssetManifest.json": "97606a236a6571aafb365394cec7acde",
"assets/NOTICES": "076d4aec5ac1cb18fedfb0e8eda22f41",
"assets/FontManifest.json": "450392709425258576dd89b54fe97bbc",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "115e937bb829a890521f72d2e664b632",
"assets/fonts/MaterialIcons-Regular.otf": "1288c9e28052e028aba623321f7826ac",
"assets/assets/locales/lable_english.json": "6088e2ba0bd6ab9339e8534254149f30",
"assets/assets/locales/label_hi.json": "846d8ad80a3480ec3e1007c9f3235909",
"assets/assets/textfieldconfig.json": "447a3b7c7f83700988695219e56eb195",
"assets/assets/data_store_testing_component.json": "a71b6f6dd61cbb8aec7ba8c1bb2d751a",
"assets/assets/images/group_btn.png": "89475ee0395547ab2f95b1c0b220f6ee",
"assets/assets/images/finPay_logo_white.png": "cf96c60574a7f745f5676e1c31f9dab9",
"assets/assets/images/ic_mastercard@2x.png": "c3b773f85ce9c0a9fcfa5516ef62b35c",
"assets/assets/images/visa%2520logo.png": "bcb5dcacd7bdd0a6bbe3d69e35c0a90d",
"assets/assets/images/icon_qr.png": "ed343670b35db5c104afb2025226170c",
"assets/assets/images/Image%252087@2x.png": "be89cf4dc855a8f79ad4fb39cc7b7c83",
"assets/assets/images/icon_pay.png": "a85e3d1dabc651bf0a64898e9a23d4ab",
"assets/assets/images/group_mandiri.png": "573536ae44ad48c4247a28d4bae9d600",
"assets/assets/images/icon_lainnya.png": "9e3e3c8f974555b77b105a566207b33a",
"assets/assets/images/icon_alfamart.png": "470329d30068509383a69b203e84cc37",
"assets/assets/images/placeholder1.png": "95ebd0d403f21aba4a7e0561835c2179",
"assets/assets/images/icon_thunder.png": "7d4f00766d4a2891736865ee7cf95ac1",
"assets/assets/images/notification_bell.png": "dd417f402b6a361e3c1c2f2023f8ad66",
"assets/assets/images/img2.jpg": "4caa2ef9921121a4616d54460e741176",
"assets/assets/images/icon_bpjs.png": "9684e505ee17da7bc068229449debede",
"assets/assets/images/ic_sukses_1@2x.png": "84107ab43dfa4013cbf7c55ba1154024",
"assets/assets/images/img1.jpg": "bdaa358c6a40a3ca97c5afe002d2dfb8",
"assets/assets/images/icon_pulsadata.png": "f9b9f03c8ea35bdc6721fc21faae0346",
"assets/assets/images/icon_indihome.png": "54da5e35efb9eb5ba731a2c40e346855",
"assets/assets/images/group_bni.png": "28e3849d93cd99c6d28af29389b21138",
"assets/assets/images/finPay_logo.png": "cc82e7e1258e12487aa702c6ba7275fd",
"assets/assets/images/Intersection.png": "67bff5f4e3c962550512498276fd88b4",
"assets/assets/images/link_aja_btn.png": "56291610cbd54a71fbc07e7361d56b39",
"assets/assets/images/ic_mastercard.png": "a7cbda2a65ead456e04f330de151af98",
"assets/assets/textfieldpage.json": "6765e68c0c33d2db566fd41311b32766",
"assets/assets/app_level_config.json": "96705fb83bf4d45582345548ca3dfb9c",
"assets/assets/config_metadata.json": "49303a8166eb232f38f054bcc727e06e",
"assets/assets/font/Kiro-Bold.otf": "61150ff0e11d4d8ed7cfd924df3865ec",
"assets/assets/data_store_testing_pages.json": "810a23536eba6a2db4c33167f68dc79d",
"assets/assets/tg_config.json": "b0e4e17185c65f2a7091397619e71f0a",
"assets/assets/lov_config.json": "83708cebed96b5fddd516fdfb93b312e"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "/",
"main.dart.js",
"index.html",
"assets/NOTICES",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value + '?revision=' + RESOURCES[value], {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache.
        return response || fetch(event.request).then((response) => {
          cache.put(event.request, response.clone());
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey in Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
