/*
==================================================================================
-- Polyfills for webpack ---------------------------------------------------------
==================================================================================
** Some simple polyfills for the development environment                        **
** This file is used by webpack to include the proper polyfills                 **
** The webpack file is located here: GOATstack/config/webpack/webpack.common.js **
==================================================================================
*/

import 'core-js/es6';
import 'core-js/es7/reflect';
require('zone.js/dist/zone');

if (process.env.ENV === 'production') {
  // Production
} else {
  // Development
  Error.stackTraceLimit = Infinity;
}