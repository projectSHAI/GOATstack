"use strict";
/*
==================================================================================
-- Vendor packages for webpack ---------------------------------------------------
==================================================================================
** This is where all vendor resources will be imported                          **
** This file is used by webpack to include stable vendor packages               **
** The webpack file is located here: GOATstack/config/webpack/webpack.common.js **
==================================================================================
*/
Object.defineProperty(exports, "__esModule", { value: true });
/*
==================================================================================
-- Vendor packages for webpack ---------------------------------------------------
==================================================================================
** This is where all vendor resources will be imported                          **
** This file is used by webpack to include stable vendor packages               **
** The webpack file is located here: GOATstack/config/webpack/webpack.common.js **
==================================================================================
*/
// Angular
require("@angular/platform-browser");
require("@angular/platform-browser-dynamic");
require("@angular/core");
require("@angular/common");
require("@angular/common/http");
require("@angular/router");
require("@angular/material");
require("hammerjs/hammer");
// RxJS
require("rxjs");
require("@angular-redux/store");
require("lodash");
require("ng2-cookies/ng2-cookies");
// Other vendors for example jQuery, Lodash or Bootstrap
// You can import js, ts, css, sass, ...
require('./styles');
