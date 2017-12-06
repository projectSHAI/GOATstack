"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
var default_1 = require("./env/default");
var development_1 = require("./env/development");
var production_1 = require("./env/production");
var test_1 = require("./env/test");
function mergeConfig() {
    // Depending on the environment we will merge
    // the default assets and config to corresponding
    // environment files
    var environmentConfig = process.env.NODE_ENV === 'development' ? development_1.devEnv :
        process.env.NODE_ENV === 'test' ? test_1.testEnv : production_1.prodEnv;
    // Merge config files
    return _.merge(default_1.defaultConfig, environmentConfig);
}
;
var config = mergeConfig();
exports.default = config;
