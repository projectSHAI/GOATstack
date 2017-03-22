const { FuseBox, ReplacePlugin, TypeScriptHelpers, JSONPlugin, UglifyJSPlugin } = require('fuse-box');
const path = require('path');

const fuseBox = FuseBox.init({
    homeDir: `./`,
    outFile: `dist/index.js`,
    plugins: [
        ReplacePlugin({ "process.env.NODE_ENV": JSON.stringify("production") }),
        TypeScriptHelpers(),
        JSONPlugin(),
        UglifyJSPlugin()
    ]
}).bundle('[server/server.ts]');