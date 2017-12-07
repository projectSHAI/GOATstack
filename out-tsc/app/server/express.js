"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// importing modules the es6 way
var config_1 = require("../config");
var path = require("path");
var express = require("express");
var fs = require("graceful-fs");
var chalk = require("chalk");
var morgan = require("morgan");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var cookieParser = require("cookie-parser");
// Express Engine
var express_engine_1 = require("@nguniversal/express-engine");
// Import module map for lazy loading
var module_map_ngfactory_loader_1 = require("@nguniversal/module-map-ngfactory-loader");
// function to initialize the express app
function expressInit(app) {
    // * NOTE :: leave this as require() since this file is built Dynamically from webpack
    var _a = require('dist/server/index.js'), AppServerModuleNgFactory = _a.AppServerModuleNgFactory, LAZY_MODULE_MAP = _a.LAZY_MODULE_MAP;
    app.engine('html', express_engine_1.ngExpressEngine({
        bootstrap: AppServerModuleNgFactory,
        providers: [
            module_map_ngfactory_loader_1.provideModuleMap(LAZY_MODULE_MAP)
        ]
    }));
    //aditional app Initializations
    app.use(bodyParser.urlencoded({
        extended: false
    }));
    app.use(bodyParser.json());
    app.use(methodOverride());
    app.use(cookieParser());
    //initialize morgan express logger
    // NOTE: all node and custom module requests
    if (process.env.NODE_ENV !== 'test') {
        app.use(morgan('dev', {
            skip: function (req, res) { return res.statusCode < 400; }
        }));
    }
    var dist = fs.existsSync('dist');
    //exposes the client and node_modules folders to the client for file serving when client queries "/"
    app.use('/node_modules', express.static('node_modules'));
    app.use(express.static("" + (dist ? 'dist/client' : 'client')));
    app.use('/public', express.static('public'));
    //exposes the client and node_modules folders to the client for file serving when client queries anything, * is a wildcard
    app.use('*', express.static('node_modules'));
    app.use('*', express.static("" + (dist ? 'dist/client' : 'client')));
    app.use('*', express.static('public'));
    // starts a get function when any directory is queried (* is a wildcard) by the client,
    // sends back the index.html as a response. Angular then does the proper routing on client side
    if (process.env.NODE_ENV !== 'development')
        app.get('*', function (req, res) {
            res.sendFile(path.join(process.cwd(), "/" + (dist ? 'dist/client' : 'client') + "/index.html"));
        });
    return app;
}
;
exports.default = expressInit;
