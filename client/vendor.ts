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
import '@angular/platform-browser';
import '@angular/platform-browser-dynamic';
import '@angular/core';
import '@angular/common';
import '@angular/http';
import '@angular/router';

import '@angular/material';
import 'hammerjs/hammer';

// RxJS
import 'rxjs';

import '@angular-redux/store';
import 'lodash';
import 'ng2-cookies/ng2-cookies';

// Other vendors for example jQuery, Lodash or Bootstrap
// You can import js, ts, css, sass, ...

require('./styles');
require('./loader');