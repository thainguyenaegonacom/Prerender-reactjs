const prerender = require("prerender");
var server = prerender({
    chromeLocation: "C:/Program Files/Google/Chrome/Application/chrome.exe",
});

server.use(require("prerender-memory-cache"));
// server.use(prerender.sendPrerenderHeader());
// server.use(prerender.browserForceRestart());
// server.use(prerender.blockResources());
// // server.use(prerender.removeScriptTags());
// server.use(prerender.httpHeaders());

server.start();
