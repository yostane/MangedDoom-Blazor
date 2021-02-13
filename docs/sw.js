var CACHE = "network-or-cache";

self.addEventListener("install", function (evt) {
    console.log("The service worker is being installed.");
    evt.waitUntil(precache());
});

self.addEventListener("fetch", function (evt) {
    console.log("The service worker is serving the asset.");

    evt.respondWith(
        fromNetwork(evt.request, 400).catch(function () {
            return fromCache(evt.request);
        })
    );
});

function precache() {
    return caches.open(CACHE).then(function (cache) {
        return cache.addAll([
            "./css/bootstrap/bootstrap.min.css",
            "./css/bootstrap/bootstrap.min.css.map",
            "./css/open-iconic/font/css/open-iconic-bootstrap.min.css",
            "./css/open-iconic/font/fonts/open-iconic.eot",
            "./css/open-iconic/font/fonts/open-iconic.otf",
            "./css/open-iconic/font/fonts/open-iconic.svg",
            "./css/open-iconic/font/fonts/open-iconic.ttf",
            "./css/open-iconic/font/fonts/open-iconic.woff",
            "./css/open-iconic/FONT-LICENSE",
            "./css/open-iconic/ICON-LICENSE",
            "./css/open-iconic/README.md",
            "./css/app.css",
            "./js/audioutils.js",
            "./js/renderutils.js",
            "./_framework/blazor.boot.json",
            "./_framework/blazor.webassembly.js",
            "./_framework/BlazorDoom.dll",
            "./_framework/dotnet.5.0.3.js",
            "./_framework/dotnet.timezones.blat",
            "./_framework/dotnet.wasm",
            "./_framework/global.json",
            "./_framework/icudt.dat",
            "./_framework/icudt_CJK.dat",
            "./_framework/icudt_EFIGS.dat",
            "./_framework/icudt_no_CJK.dat",
            "./_framework/Microsoft.AspNetCore.Components.dll",
            "./_framework/Microsoft.AspNetCore.Components.Web.dll",
            "./_framework/Microsoft.AspNetCore.Components.WebAssembly.dll",
            "./_framework/Microsoft.Extensions.Configuration.Abstractions.dll",
            "./_framework/Microsoft.Extensions.Configuration.dll",
            "./_framework/Microsoft.Extensions.Configuration.Json.dll",
            "./_framework/Microsoft.Extensions.DependencyInjection.Abstractions.dll",
            "./_framework/Microsoft.Extensions.DependencyInjection.dll",
            "./_framework/Microsoft.Extensions.Logging.Abstractions.dll",
            "./_framework/Microsoft.Extensions.Logging.dll",
            "./_framework/Microsoft.Extensions.Options.dll",
            "./_framework/Microsoft.Extensions.Primitives.dll",
            "./_framework/Microsoft.JSInterop.dll",
            "./_framework/Microsoft.JSInterop.WebAssembly.dll",
            "./_framework/System.Collections.Concurrent.dll",
            "./_framework/System.Collections.dll",
            "./_framework/System.Collections.Immutable.dll",
            "./_framework/System.Collections.NonGeneric.dll",
            "./_framework/System.Collections.Specialized.dll",
            "./_framework/System.ComponentModel.dll",
            "./_framework/System.ComponentModel.Primitives.dll",
            "./_framework/System.ComponentModel.TypeConverter.dll",
            "./_framework/System.Console.dll",
            "./_framework/System.IO.FileSystem.dll",
            "./_framework/System.IO.Pipelines.dll",
            "./_framework/System.Linq.dll",
            "./_framework/System.Memory.dll",
            "./_framework/System.Net.Http.dll",
            "./_framework/System.Net.Primitives.dll",
            "./_framework/System.ObjectModel.dll",
            "./_framework/System.Private.CoreLib.dll",
            "./_framework/System.Private.Runtime.InteropServices.JavaScript.dll",
            "./_framework/System.Private.Uri.dll",
            "./_framework/System.Runtime.CompilerServices.Unsafe.dll",
            "./_framework/System.Runtime.InteropServices.RuntimeInformation.dll",
            "./_framework/System.Text.Encodings.Web.dll",
            "./_framework/System.Text.Json.dll",
            "./404.html",
            "./android-icon-144x144.png",
            "./android-icon-192x192.png",
            "./android-icon-36x36.png",
            "./android-icon-48x48.png",
            "./android-icon-72x72.png",
            "./android-icon-96x96.png",
            "./apple-icon-114x114.png",
            "./apple-icon-120x120.png",
            "./apple-icon-144x144.png",
            "./apple-icon-152x152.png",
            "./apple-icon-180x180.png",
            "./apple-icon-57x57.png",
            "./apple-icon-60x60.png",
            "./apple-icon-72x72.png",
            "./apple-icon-76x76.png",
            "./apple-icon-precomposed.png",
            "./apple-icon.png",
            "./browserconfig.xml",
            "./doom1.wad",
            "./favicon-16x16.png",
            "./favicon-32x32.png",
            "./favicon-96x96.png",
            "./favicon.ico",
            "./index.html",
            "./manifest.json",
            "./ms-icon-144x144.png",
            "./ms-icon-150x150.png",
            "./ms-icon-310x310.png",
            "./ms-icon-70x70.png",
            "./sw.js",
        ]);
    });
}

function fromNetwork(request, timeout) {
    return new Promise(function (fulfill, reject) {
        var timeoutId = setTimeout(reject, timeout);

        fetch(request).then(function (response) {
            clearTimeout(timeoutId);
            fulfill(response);
        }, reject);
    });
}

function fromCache(request) {
    return caches.open(CACHE).then(function (cache) {
        return cache.match(request).then(function (matching) {
            return matching || Promise.reject("no-match");
        });
    });
}
