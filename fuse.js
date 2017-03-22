"use strict";

const { FuseBox, ReplacePlugin, TypeScriptHelpers, JSONPlugin, UglifyJSPlugin } = require('fuse-box');
const path = require('path');

const isDevelopment = process.argv.indexOf("--dev") > -1
const isTest = process.argv.indexOf("--test") > -1;
const isProduction = process.argv.indexOf("--prod") > -1;

const env = isDevelopment ? 'development' : isTest ? 'test' :
	isProduction ? 'production' : 'no-env';

const fuseBox = FuseBox.init({
    homeDir: `./`,
    outFile: `dist/index.js`,
    plugins: [
        ReplacePlugin({ "process.env.NODE_ENV": JSON.stringify(env) }),
        TypeScriptHelpers(),
        JSONPlugin(),
        isProduction && UglifyJSPlugin()
    ]
}).bundle('>[server/server.ts]');