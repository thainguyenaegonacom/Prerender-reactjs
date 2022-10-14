const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

// Create Express Server
const app = express();

// Configuration
const PORT = 3001;
const HOST = "localhost";
const API_SERVICE_URL = `http://localhost:3000/https://sundora.com.bd/`;

// Proxy Logic :  Proxy endpoints
app.use(
    "/",
    createProxyMiddleware({
        target: API_SERVICE_URL,
        changeOrigin: true,
        pathRewrite: {
            "^/": "",
        },
    })
);

// Starting our Proxy server
app.listen(PORT, HOST, () => {
    console.log(`Starting Proxy at ${HOST}:${PORT}`);
});
