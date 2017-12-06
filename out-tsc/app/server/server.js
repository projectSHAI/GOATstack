"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// These are important and needed before anything else
require("zone.js/dist/zone-node");
require("reflect-metadata");
var core_1 = require("@angular/core");
var path_1 = require("path");
var express = require("express");
var chalk = require("chalk");
var fs = require("graceful-fs");
var http = require("http");
var https = require("https");
var config_1 = require("../config");
var express_1 = require("./express");
// Faster server renders w/ Prod mode (dev mode never needed)
// Faster server renders w/ Prod mode (dev mode never needed)
core_1.enableProdMode();
// Initialize express
var app = express();
var DIST_FOLDER = ('/dist');
function init() {
    // Initialize http server
    var server = http.createServer(app);
    express_1.default(app);
    server.listen(config_1.default.port, config_1.default.host, function () {
        var host = server.address().address;
        var port = server.address().port;
        if (process.env.NODE_ENV !== 'test') {
            console.log(chalk.default.bold.cyan("\n\tEnvironment:\t\t\t " + (process.env.NODE_ENV || 'production')));
            if (!process.env.NODE_ENV)
                console.log(chalk.default.bold.magenta("\tHTTP Server") +
                    chalk.default.bold.gray("\n\tServer Address:\t\t\t http://localhost:" + port + "\n"));
        }
    });
}
;
init();
// export express app for testing
exports.default = app;
