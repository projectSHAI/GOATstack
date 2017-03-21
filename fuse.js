const { FuseBox, SassPlugin, CSSPlugin, TypeScriptHelpers, JSONPlugin, HTMLPlugin, ImageBase64Plugin } = require('fuse-box');

const path = require('path');
const express = require('express');

const fuseBox = FuseBox.init({
    homeDir: `client`,
    sourcemaps: true,
    outFile: `dist/app.js`,
    plugins: [
        [
            SassPlugin({ outputStyle: 'compressed' }),
            CSSPlugin()
        ],
        TypeScriptHelpers(),
        JSONPlugin(),
        HTMLPlugin({ useDefault: false })
    ]
});

const server = fuseBox.devServer('>app.ts', {
    port: 1701
});

//exposes the client and node_modules folders to the client for file serving when client queries "/"
server.httpServer.app.use('/node_modules', express.static('node_modules'));
server.httpServer.app.use(express.static('dist'));
server.httpServer.app.use('/public', express.static('public'));

//exposes the client and node_modules folders to the client for file serving when client queries anything, * is a wildcard
server.httpServer.app.use('*', express.static('node_modules'));
server.httpServer.app.use('*', express.static('dist'));
server.httpServer.app.use('*', express.static('public'));

// starts a get function when any directory is queried (* is a wildcard) by the client, 
// sends back the index.html as a response. Angular then does the proper routing on client side
// server.httpServer.app.get('*', function(req, res) {
// 	res.sendFile(path.join(process.cwd(), '/dist/index.html'));
// });