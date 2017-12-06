"use strict";
/*
==============================================================================================
These configuration settings get called no matter what Node's process.env.NODE_ENV is set to.
==============================================================================================
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultConfig = {
    port: process.env.PORT || 5000,
    host: process.env.HOST || '0.0.0.0'
};
