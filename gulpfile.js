'use strict';

eval(require("typescript")  // jshint ignore:line
  .transpile(require("fs")
  .readFileSync("./config/gulp/gulpclass.ts")
  .toString()));
