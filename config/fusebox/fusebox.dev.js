const { FuseBox, ReplacePlugin, TypeScriptHelpers, JSONPlugin } = require('fuse-box');
const path = require('path');

const fuseBox = FuseBox.init({
    homeDir: `./`,
    outFile: `dist/index.js`,
    plugins: [
        ReplacePlugin({ "process.env.NODE_ENV": JSON.stringify("development") }),
        TypeScriptHelpers(),
        JSONPlugin()
    ]
}).bundle('[server/server.ts]');